import UserModel from "../models/user.model.js";
import UserRepository from "../respository/user.repository.js";

const userRepository=new UserRepository();
export default class UserController{
    //methods
    getRegisterView(req,res){
        res.render('register');
    }

    getLoginView(req,res){
        res.render('login',{errorMessage:null});
    }

    async postRegister(req,res){
        //controller will update the model
        const{name,email,password}=req.body;
        const newUser=new UserModel(name,email,password);  //Creating document/object
        await  userRepository.add(newUser);
        res.redirect('/login');
    }

    async postLogin(req,res){
        const {email,password}=req.body;
        const user=await userRepository.isValidUser(email,password);
        if(!user){
           return  res.render('login',{errorMessage:"Invalid Email and Password"});
        }
        //Login Successful
        req.session.userEmail=email;  //creating session id on server side
        req.session.name=user.name;
        res.redirect('/jobs');
    }

    logout(req,res){
        //on logout destroy session
        req.session.destroy((err)=>{
            if(err){
                console.log(err);
            }else{
                res.redirect('/login');
            }
        })
    
    }
}
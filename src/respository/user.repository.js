import { getDB } from "../config/mongodb.js";

export default class UserRepository{
    constructor(){
        this.collection='user';
    }
    
    //Methods
    async add(newUser){
        try{
        //Get the Database
        const db=getDB();
        //Get the collection
        const collection=db.collection(this.collection);
        //inser the new user
        await collection.insertOne(newUser);
        }catch(err){
            console.log("Something Went wrong");
        }
    }

    async isValidUser(email,password){
        try{
        //Get the database
        const db=getDB();
        //Get the collection
        const collection=db.collection(this.collection);
        //Find the document
        return await collection.findOne({email:email,password:password});
        }catch(err){
            console.log(err);
            return undefined;
        }
    }
}
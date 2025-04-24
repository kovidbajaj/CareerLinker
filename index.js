// IMPORTING LIBRARIES/MODULES
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import path from "path";
import ejsLayouts from "express-ejs-layouts";
import JobController from "./src/controllers/job.controller.js";
import  validateData  from "./src/middlewares/validation.middleware.js";
import { uploadFile } from "./src/middlewares/file-upload.middleware.js";
import sendMail from "./src/middlewares/mailer.middleware.js";
import UserController from "./src/controllers/user.controller.js";
import session from "express-session";
import auth from "./src/middlewares/session.middleware.js";
import { connectToMongoDB } from "./src/config/mongodb.js";

// Creating an instance of JobController class.
const jobController=new JobController();

// Creating an instance of UserController class.
const userController=new UserController();

// Creating server.
const app=express();
app.use(express.urlencoded({extended:true}));

// Making public folder directly accessible.
app.use(express.static(path.resolve('public')));

// Setting the ejs view engine.
app.set('view engine','ejs');
app.set('views',path.resolve('src','views'));

// Setting up express-ejs-layouts
app.use(ejsLayouts)

// Configure session on server
app.use(session({
    secret:'SecretKey',
    resave:false,
    saveUninitialized:true,
    cookie:{secure:false}
}));

// Routes
app.get('/',jobController.getIndexView);
app.get('/jobs',jobController.getJobsView);
app.get('/job/:id',jobController.getJobViewById);
app.get('/postjob',auth,jobController.getAddJobForm);   //Secure
app.post('/postjob',auth,validateData,jobController.addNewJob);  //Secure
app.post('/search',jobController.getJobsBySearch);
app.get('/applynow/:id',jobController.getJobApplyView);
app.post('/applynow/:id',uploadFile.single('fileURL'),sendMail,jobController.postJobApply);
app.get('/job/update/:id',auth,jobController.getUpdateJobForm);  //Secure
app.post('/job/update/:id',auth,jobController.updateJob); //Secure
app.get('/job/delete/:id',auth,jobController.deleteJob); //Secure
app.get('/job/applicants/:id',auth,jobController.getJobApplicantsView); //Secure
app.get('/register',userController.getRegisterView);
app.get('/login',userController.getLoginView);
app.post('/register',userController.postRegister);
app.post('/login',userController.postLogin);
app.get('/logout',userController.logout);

// Listening to server
app.listen(3200,()=>{
    console.log("Server is listening on port 3200");
    connectToMongoDB();
})
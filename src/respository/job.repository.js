import { ObjectId } from "mongodb";
import { getDB } from "../config/mongodb.js";

export default class JobRepository{
    constructor(){
        this.collection='job';
    }

    //Methods
    async getAllJobs(){
        try{
        //Get the Database
        const db=getDB();
        //Get the collection
        const collection=db.collection(this.collection);
        //Get all jobs
        return await collection.find().toArray();
        }catch(err){
            console.log(err);
        }
    }

    async getJobById(id){
        try{
            //Get the Database
            const db=getDB();
            //Get the collection
            const collection=db.collection(this.collection);
            //Get a job by id
            return await collection.findOne({_id: new ObjectId(id)});
            }catch(err){
                console.log(err);
                throw new Error("Something went wrong");
            }
    }

    async add(jobObj){
        try{
            //Get the Database
            const db=getDB();
            //Get the collection
            const collection=db.collection(this.collection);
            //insert a job
            return await collection.insertOne(jobObj);
            }catch(err){
                console.log(err);
            }
    }

    async getJobsBySearch(name){
        try{
            //Get the Database
            const db=getDB();
            //Get the collection
            const collection=db.collection(this.collection);
            //Get all jobs
            return await collection.find({name:name}).toArray();
            }catch(err){
                console.log(err);
            }
    }

    async updateApplicants(id){
        try{
            //Get the Database
            const db=getDB();
            //Get the collection
            const collection=db.collection(this.collection);
            //Update applicants of a particular job
            return await collection.updateOne({_id:new ObjectId(id)},{$inc:{applicants:1}})
            }catch(err){
                console.log(err);
            }
    }

    async getCompanyNameById(id){
        try{
            //Get the Database
            const db=getDB();
            //Get the collection
            const collection=db.collection(this.collection);
            //get
            const job= await collection.findOne({_id:new ObjectId(id)});
            return job.name;
            }catch(err){
                console.log(err);
            }
    }

    async update(id,job){
        try{
            //Get the Database
            const db=getDB();
            //Get the collection
            const collection=db.collection(this.collection);
            //update
            const{category,designation,location,name,salary,positions,applyBy,skills}=job;
            await collection.updateOne({_id:new ObjectId(id)},{$set:{category:category,designation:designation,location:location,name:name,salary:salary,positions:positions,applyBy:applyBy,skills:skills}})
            }catch(err){
                console.log(err);
            }
    }
    

    async delete(id){
        try{
            //Get the Database
            const db=getDB();
            //Get the collection
            const collection=db.collection(this.collection);
            //get
            await collection.deleteOne({_id:new ObjectId(id)});
            }catch(err){
                console.log(err);
            }
    }

    async updateJobSeekerProperties(name,email,number,fileURL,jobId){
        try{
            //Get the Database
            const db=getDB();
            //Get the collection
            const collection=db.collection(this.collection);
            //get
            await collection.updateOne({_id:new ObjectId(jobId)},{$push:{jobSeekersName:name,jobSeekersEmail:email,jobSeekersNumber:number,jobSeekersFileURL:fileURL}})
            }catch(err){
                console.log(err);
            }
        
    }
}

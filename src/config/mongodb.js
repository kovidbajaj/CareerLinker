import { MongoClient } from "mongodb";

let client;

export function connectToMongoDB(){
    MongoClient.connect(process.env.DB_URL)
     .then(clientInstance=>{
        client=clientInstance;
        console.log("Mongo DB is connected");
     })
     .catch(err=>{
        console.log(err);
     })
}

export function getDB(){
    return client.db();
}
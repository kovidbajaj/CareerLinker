import JobModel from "../models/job.model.js";
import JobRepository from "../respository/job.repository.js";

const jobRepository=new JobRepository();
export default class JobController{
    getIndexView(req,res){
        res.render('index',{userEmail:req.session.userEmail,name:req.session.name});
    }

    async getJobsView(req,res){
        const jobs=await jobRepository.getAllJobs();
        res.render('jobs',{jobs:jobs,userEmail:req.session.userEmail,name:req.session.name});
    }

    async getJobViewById(req,res){
        const id=req.params.id;
        const job=await jobRepository.getJobById(id);
        if(!job){
            return res.send("Internal Server Error");
        }else{
            return res.render('job',{
                job:job,userEmail:req.session.userEmail,name:req.session.name
            });
        }
    }

    getAddJobForm(req,res){
        res.render('new-job',{errorMessage:null,
            userEmail:req.session.userEmail,name:req.session.name
        });
    }

    async addNewJob(req,res){
        const{category,designation,location,name,salary,positions,applyBy,skills}=req.body;
        const newJobObj=new JobModel(category,designation,location,name,salary,positions,0,new Date().toLocaleString(),applyBy,...skills);
        await jobRepository.add(newJobObj);
        const jobs=await jobRepository.getAllJobs();
        res.redirect('/jobs');
    }

    async getJobsBySearch(req,res){
        const {name}=req.body; 
        const jobs=await jobRepository.getJobsBySearch(name);
        if(jobs.length==0){
            return res.render('no-job');
        }
        res.render('jobs',{jobs:jobs});
    }

    async getJobApplyView(req,res){
        const id=req.params.id;
        const job=await jobRepository.getJobById(id);
        if(job){
            res.render('job-apply',{job:job,userEmail:req.session.userEmail,name:req.session.name});
        }else{
            res.send("Internal Server Errror");
        }
    }

    async postJobApply(req,res){
        const{name,email,number}=req.body;
        const fileURL='pdfs/'+req.file.filename;
        const id=req.params.id;
        await jobRepository.updateApplicants(id);
        await jobRepository.updateJobSeekerProperties(name,email,number,fileURL,id);
        res.redirect('/jobs');
    }

    async getUpdateJobForm(req,res){
        const id=req.params.id;
        const job=await jobRepository.getJobById(id);
        if(!job){
            return res.send('Internal Server Error');
        }
        res.render('update-job',{job:job,userEmail:req.session.userEmail,name:req.session.name});
    }

    async updateJob(req,res){
        const id=req.params.id;
        await jobRepository.update(id,req.body);
        const job=await jobRepository.getJobById(id);
        res.render('job',{job:job});
    }

    async deleteJob(req,res){
        const id=req.params.id;
        const job=await jobRepository.getJobById(id);
        if(!job){
            return res.send('Invalid Job ID');
        }
        await jobRepository.delete(id);
        res.redirect('/jobs');
    }

    async getJobApplicantsView(req,res){
        const id=req.params.id;
        const job=await jobRepository.getJobById(id);
        if(!job){
            return res.send("Internal Server Error");
        }
        res.render('job-seekers',{jobSeekersName:job.jobSeekersName,
            jobSeekersEmail:job.jobSeekersEmail,
            jobSeekersNumber:job.jobSeekersNumber,
            jobSeekersfileURL:job.jobSeekersFileURL,
        });
    }

    getRegisterView(req,res){
        res.render('register');
    }
};
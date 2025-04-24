export default class JobModel{
    constructor(category,designation,location,name,salary,positions,applicants,postedOn,applyBy,...skills){
        this.category=category;
        this.designation=designation;
        this.location=location;
        this.name=name;
        this.salary=salary;
        this.positions=positions;
        this.applicants=applicants;
        this.postedOn=postedOn;
        this.applyBy=applyBy;
        this.skills=skills;
    }
};
import {body,validationResult} from 'express-validator';

 const validateData=async(req,res,next)=>{
   // 1 setup rules
   const rules=[
    body('salary').isFloat({gt:0}).withMessage("Salary should be a positive value"),
    body('positions').isFloat({gt:0}).withMessage("Total Number of opening should be a positive value"),
];

//2. run those rules
 await Promise.all(rules.map((rule)=>rule.run(req)));

 //3. check if there are any errors
 const errors=validationResult(req);
 if(!errors.isEmpty()){
    return res.render('new-job',{errorMessage:errors.array()[0].msg});
 }else{
    next();
 }
}
export default validateData;
 

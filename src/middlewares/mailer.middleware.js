import nodemailer from "nodemailer";
import JobModel from "../models/job.model.js";
import JobRepository from "../respository/job.repository.js";
const jobRepository=new JobRepository();
const sendMail=async(req,res,next)=>{
    const {name,email}=req.body;
    const id=req.params.id;
    const companyName=await jobRepository.getCompanyNameById(id);
    const transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'iamkovidbajaj327@gmail.com',
            pass:'mycbmsrihzifczbj',
        },
    });
    const htmlContent = `
  <div style="font-family: 'Segoe UI', sans-serif; padding: 20px; background-color: #f9f9f9; border-radius: 10px; border: 1px solid #e0e0e0; max-width: 600px; margin: auto;">
    <h2 style="color: #4CAF50;">🎉 Application Submitted Successfully!</h2>
    <p style="font-size: 16px; color: #333;">Dear ${name},</p>
    <p style="font-size: 16px; color: #333;">
      We’re excited to let you know that you have <strong>successfully applied</strong> to the ${companyName}.
    </p>
    <p style="font-size: 16px; color: #333;">
      Our team will review your application and get back to you soon. Thank you for taking the time to apply!
    </p>
    <div style="margin: 20px 0;">
      <a href="/jobs" style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-size: 16px;">View More Jobs</a>
    </div>
    <p style="font-size: 14px; color: #777;">If you have any questions, feel free to contact us.</p>
    <p style="font-size: 14px; color: #777;">Best regards,<br>Your Job Portal Team</p>
    <p style="font-size: 14px; color: #777;">Kovid Bajaj</p>
    <p style="font-size: 14px; color: #777;">+91-9350048989</p>
  </div>
`;
    const mailOptions={
        from:'iamkovidbajaj327@gmail.com',
        to:email,
        subject:"Success",
        html:htmlContent,
    };
    await transporter.sendMail(mailOptions);
    next();
}
export default sendMail;

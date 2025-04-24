const auth=(req,res,next)=>{
    if(req.session.userEmail==undefined){
        //No login
        return res.render('error');
    }else{
        next();
    }
}

export default auth;
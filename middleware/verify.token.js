const jwt = require('jsonwebtoken');

//method to verify user token
module.exports.verifyUser = (req,res,next)=>{
    //get token
    const token = req.header('auth-token');
    // console.log(token);
    if(!token) return res.status(400).send({message: 'Access Denied'});

    try{
        const verified = jwt.verify(token,process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }
    catch(err){
        // console.log(err);
        res.status(400).send({message: `Access Denied`});
    }
};

//method to verify admin token
module.exports.verifyAdmin = (req,res,next)=>{
    //get token
    const token = req.header('auth-token');
    // console.log(token);
    if(!token) return res.status(400).send({message: 'Access Denied'});

    try{
        const verified = jwt.verify(token,process.env.ADMIN_SECRET_TOKEN);
        req.user = verified;
        next();
    }
    catch(err){
        // console.log(err);
        res.status(400).send({message: `Access Denied`});
    }
};

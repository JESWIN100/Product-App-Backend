
var jwt = require('jsonwebtoken');
const secretKey=process.env.jwtSecretKey

const jwtToken = async(user,password)=>{

  const userData={user,password}
  const options={
    expiresIn:'1hr',
    issuer:'entri',
    audience:'entri-user'
  }

    let token = await jwt.sign(userData,secretKey,options)
    return token
}

const verifyToken=async(req,res,next)=>{
  try {

    if(!req.headers['authorization']) throw new Error
      let token=req.headers['authorization'].split(' ')[1]
  
  if(!token) throw new Error
  
     jwt.verify(token,secretKey,(err,payload)=>{
      if(err) throw new Error
        next()
     })
    
  } catch (error) {
    //  console.log(error);
    res.status(401).send({err:'unauthorized'})
    
  }
  
   

}

  module.exports={jwtToken,verifyToken} 
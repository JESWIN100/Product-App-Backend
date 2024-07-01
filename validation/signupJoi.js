const Joi =require('joi');
const SignupJoi=Joi.object(
    {
        email:Joi.string()
             .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
             .required(),


             password:Joi.string()
             .required(),
             

             confirm_Password: Joi.ref('password')
              
 
 
 

    }
   


)
module.exports=SignupJoi;  


const UserModel = require("../models/users");
const { jwtToken } = require("../utils/jwtToken");
const SignupJoi = require("../validation/signupJoi");
const bcrypt = require('bcrypt');




const Signup =async(req,res)=>{

    const data = req.body
    console.log(data);
    await SignupJoi.validateAsync(data)
    console.log(data.password);

     // Hash the password before saving
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(data.password, salt);
     data.password = hashedPassword;

    const toSave = new UserModel(data)
    await toSave.save()
    res.status(203).send('Added Scuessfully!!')

}


const Login = async (req, res) => {
    try {
        const data = req.body;

        // Validate data
        await SignupJoi.validateAsync(data);

        // Find user by email
        const user = await UserModel.findOne({ email: data.email });
        if (!user) {
            return res.status(404).send({ status: false, message: 'User not found' });
        }

        // Compare passwords
        const validPassword = await bcrypt.compare(data.password, user.password);
        if (!validPassword) {
            return res.status(401).send({ status: false, message: 'Invalid password' });
        }

        // Generate token
        const token = await jwtToken(user.email, user.password);
        console.log(token);
        res.status(200).send({ status: true, message: 'Success', token: token });

    } catch (error) {
        console.error(error);
        res.status(500).send({ status: false, message: error.message });
    }
};

module.exports = { Signup, Login };

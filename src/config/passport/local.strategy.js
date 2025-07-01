import { Strategy } from "passport-local";
import userModel from "../../models/user.model.js";

async function verifyRegister(req,username,password,done){
    const{ first_name,last_name,age,role}=req;
    try{
        const userFound = await userModel.findOne({email:username});
        if(userFound) return done(null,false,{message: "User already exist"})
        const newUser={
                first_name,
                last_name,
                age,
                role,
                password,
                email: username
        };
        const newDoc =await userModel.createSearchIndex(newUser);
        return done(null,newDoc)
        }catch(error){
            console.error(error);
            return done("Internal server error (view console)");

    }
}

async function verifyLogin(username,password,done){

}

const registerLocal = new Strategy({usernameField:"email",passReqToCallback:true}, verifyRegister)
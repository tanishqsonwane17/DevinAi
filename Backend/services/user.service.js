import usermodel from '../models/user.model.js';


export const createUser = async({
    email, password,username
})=>{
    if(!email || !password || !username){ {
        throw new Error('Email, password and username are required');
    }
    }
    const hashedPassword = await usermodel.hashPassword(password);
    const user = await usermodel.create({
        email,
        password : hashedPassword,
        username
    });
    return user;
}
export const getAllUsers = async({userId})=>{
    const users = await usermodel.find({
        _id:{$ne:userId}
    });
    
    return users
}
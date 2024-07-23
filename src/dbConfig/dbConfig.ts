import mongoose from 'mongoose';
export async function connectToDB(){
    try {
        mongoose.connect(process.env.MONGODB_URI!).then(()=>console.log("MongoDB connected successfully"));
    } catch (error:any) {
        console.log("error in connecting to DataBase: ",error.message);
        throw new Error("Couldn't connect to DataBase");
    }
}
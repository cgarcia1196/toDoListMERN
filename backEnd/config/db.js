import mongoose from "mongoose"

export const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("mongodb connected sucessfully")
    }catch(error){
        console.error("Could not connect to mongoose database")
        process.exit(1)// 1 = exit with failure
    }
}
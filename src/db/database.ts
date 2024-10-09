import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config()

const connectDB = async () =>{
   try{
      await mongoose.connect(process.env.MONGODB_URL || '') 
      console.log("Banco conectado com sucesso!");
   }catch(error){
      console.log(`Error: ${error}`);
   }
}

export default connectDB;
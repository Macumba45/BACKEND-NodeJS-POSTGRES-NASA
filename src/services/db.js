import mongoose from 'mongoose';
mongoose.set("strictQuery", false);


export const connectToDb = async () => {

    // await mongoose.connect('mongodb://localhost:27017/nasa_dbd', {})
    // console.log("Connected to MongoDB");

    await mongoose.connect(`${process.env.MONGODB}://${process.env.HOST}:${process.env.PORTHOST}/${process.env.DBNAME}`, {})
    console.log("Connected to MongoDB");

}

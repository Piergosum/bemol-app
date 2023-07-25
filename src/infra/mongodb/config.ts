import mongoose, { Mongoose } from 'mongoose';

let db1: Mongoose;

async function connectToDatabase(): Promise<boolean> {
    try {
        db1 = await mongoose.connect( 
            `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.golcum1.mongodb.net/?retryWrites=true&w=majority`,
            { dbName: 'crud-user' }
        );
        return true;
    } catch (error) {
        console.log(error)
        return false;
    }
}

export { db1, connectToDatabase };
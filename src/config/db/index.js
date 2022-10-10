import mongoose from 'mongoose';

async function connectToDb() {
    try {
        await mongoose.connect(
            'mongodb+srv://nos_26:hongson2003@cluster0.k9peejr.mongodb.net/nos_videoroom_cloud?retryWrites=true&w=majority',
        );

        console.log('CONNET DATABASE SUCCESSFULLY');
    } catch (error) {
        console.log(error);
    }
}

export default connectToDb;

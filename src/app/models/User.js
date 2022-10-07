import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';
import mongooseSequence from 'mongoose-sequence';
const AutoIncrement = mongooseSequence(mongoose);

const Scheme = mongoose.Schema;

const User = new Scheme(
    {
        _id: { type: Number },
        username: { type: String, require: true, unique: true },
        password: { type: String, require: true },
        name: { type: String, require: true },
        avatar: { type: String },
        permission: { type: String, require: true },
    },
    {
        _id: false,
        timestamps: true,
    },
);

// Plugin
User.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt: true });
User.plugin(AutoIncrement, { id: 'users' });

export default mongoose.model('User', User);

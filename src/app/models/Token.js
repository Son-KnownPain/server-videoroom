import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';
import mongooseSequence from 'mongoose-sequence';
const AutoIncrement = mongooseSequence(mongoose);

const Scheme = mongoose.Schema;

const Token = new Scheme(
    {
        _id: { type: Number },
        token_username: { type: String, require: true },
        refresh_token: { type: String, require: true },
    },
    {
        _id: false,
        timestamps: true,
    },
);

// Plugin
Token.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt: true });
Token.plugin(AutoIncrement, { id: 'tokens' });

export default mongoose.model('Token', Token);

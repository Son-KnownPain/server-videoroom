import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';
import mongooseSequence from 'mongoose-sequence';
const AutoIncrement = mongooseSequence(mongoose);

const Scheme = mongoose.Schema;

const Video = new Scheme(
    {
        _id: { type: Number },
        title: { type: String },
        is_new: { type: Boolean },
        part: { type: String },
        description: { type: String },
        video_code: { type: String },
        session_name: { type: String },
    },
    {
        _id: false,
        timestamps: true,
    },
);

// Plugin
Video.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt: true });
Video.plugin(AutoIncrement);

export default mongoose.model('Video', Video);

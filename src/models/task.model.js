import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    dueDate: {type: Date, required: true},
    status: {type: String, required: true},
    userId: {type: Schema.Types.ObjectId, required: true}
}, {timestamps: true});

export default mongoose.model('tasks', taskSchema);

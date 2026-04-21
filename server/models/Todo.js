import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  task_name: { type: String, required: [true, '할 일을 입력해주세요.'] },
  category: { type: String, default: 'General' },
  priority: { type: String, default: 'Medium', enum: ['High', 'Medium', 'Low'] },
  is_completed: { type: Boolean, default: false },
  due_date: { type: Date },
  createdAt: { type: Date, default: Date.now }
}, { collection: 'task' });

export default mongoose.model('Task', taskSchema);

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  task_name: { type: String, required: true },
  category: { type: String, default: 'General' },
  priority: { 
    type: String, 
    enum: ['High', 'Medium', 'Low'], 
    default: 'Medium' 
  },
  is_completed: { type: Boolean, default: false },
  due_date: { type: Date, required: true }
}, { versionKey: false, timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
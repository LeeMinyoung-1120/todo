import 'dotenv/config.js';
import express from 'express';
import cors from 'cors';
import connectDB from './models/dbconnect.js';
import Task from './models/Todo.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB 연결
await connectDB();

app.get('/', (req, res) => {
  res.json({ ok: true });
});

// API Endpoints 예시용
// [GET] 모든 할 일 가져오기 (마감일 순 정렬)
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ due_date: 1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// [POST] 새로운 할 일 추가
app.post('/api/tasks', async (req, res) => {
  try {
    const newTask = new Task({
      task_name: req.body.task_name,
      category: req.body.category,
      priority: req.body.priority,
      due_date: req.body.due_date,
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// [PATCH] 완료 상태 변경
app.patch('/api/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    task.is_completed = !task.is_completed;
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// [DELETE] 할 일 삭제
app.delete('/api/tasks/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: '삭제 완료' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} [${process.env.NODE_ENV}]`);
});
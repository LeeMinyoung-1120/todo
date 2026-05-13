require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = 3001;

// 미들웨어 설정 (주석 해제 필수!)
app.use(cors({ origin: 'http://localhost:3001', credentials: true }));
app.use(express.json()); // JSON 데이터를 파싱하기 위해 꼭 필요합니다.
app.use('/static', express.static(path.join(__dirname, 'public')));

// DB 연결
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected...'))
  .catch((err) => {
    console.error("❌ DB Connection Error:", err.message);
  });

// 1. 임시 모델 정의 (컬렉션 이름을 'todos'로 명시)
// 세 번째 인자인 'todos'가 실제 MongoDB Atlas에 생성될 컬렉션 이름입니다.
const Todo = mongoose.model('Todo', new mongoose.Schema({
  task_name: String,
  category: String,
  priority: String,
  is_completed: Boolean,
  due_date: Date
}), 'todos');

// 2. 테스트용 SET (데이터 저장)
app.post('/set', async (req, res) => {
  try {
    const testData = new Todo({
      task_name: "핫스팟 테스트 데이터",
      category: "테스트",
      priority: "High",
      is_completed: false,
      due_date: new Date()
    });

    const result = await testData.save();
    res.json({ success: true, message: "DB 저장 성공!", data: result });
    console.log("success data set");
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
    console.log("err data set");
  }
});

// 3. 테스트용 GET (데이터 조회)
app.get('/get', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ _id: -1 }).limit(5); // 최신 데이터 5개
    res.json(todos);
    console.log(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("err data get");
  }
});

app.get('/', (req, res) => res.send('Todo API Server is Running!'));

app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
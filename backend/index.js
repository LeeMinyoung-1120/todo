const express = require('express');
const cors = require('cors');
const path = require('path');

const createRoutes = require('./routes/create');
const deleteRoutes = require('./routes/delete');
const modifyRoutes = require('./routes/modify');

const app = express();
const PORT = 3001;

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.send('Hello Express!'));

// 라우터 연결
app.use('/api/create', createRoutes);   // 추가
app.use('/api/delete', deleteRoutes);   // 삭제
app.use('/api/modify', modifyRoutes);   // 수정

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

app.get('/', (req, res) => {
  res.send('Hello World! Express 서버가 잘 작동합니다.');
});

app.listen(port, () => {
  console.log(`start`);
});
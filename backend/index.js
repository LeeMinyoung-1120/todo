const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const createRoutes = require('./routes/create');
const deleteRoutes = require('./routes/delete');
const modifyRoutes = require('./routes/modify');
const readRoutes = require('./routes/read');

const app = express();
const PORT = 3001;

// DB 연결 (TodoProject)
mongoose.connect('mongodb://xx.xx.xx.xx:24/TodoProject')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ DB Error:', err));

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use('/static', express.static(path.join(__dirname, 'public')));

// 라우터 연결
app.use('/api/create', createRoutes);
app.use('/api/delete', deleteRoutes);
app.use('/api/modify', modifyRoutes);
app.use('/api/read', readRoutes); // 조회용

app.get('/', (req, res) => res.send('Todo API Server is Running!'));

app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
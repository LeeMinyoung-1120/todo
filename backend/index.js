const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World! Express 서버가 잘 작동합니다.');
});

app.listen(port, () => {
  console.log(`start`);
});
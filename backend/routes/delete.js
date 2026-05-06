const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

router.delete('/:id', async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) return res.status(404).json({ message: "삭제할 대상을 찾지 못했습니다." });
    res.json({ message: "삭제 완료", id: req.params.id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
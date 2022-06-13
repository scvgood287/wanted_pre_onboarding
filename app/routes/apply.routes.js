const express = require('express');
const router = express.Router();
const applyController = require('../controllers/apply.controllers');

// 채용공고 지원
router.post('/', applyController.applyPost);

module.exports = router;
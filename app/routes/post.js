const express = require('express');
const router = express.Router();

// 채용공고 등록
router.post('/', (req, res) => {});

// 채용공고 수정
router.patch('/:postId', (req, res) => {});
// router.put('/:postId', (req, res) => {});

// 채용공고 삭제
router.delete('/:postId', (req, res) => {});

// 채용공고 목록 및 검색
router.get('/', (req, res) => {});

// 채용공고 상세
router.get('/:postId', (req, res) => {});

// 채용공고 지원
router.post('/apply', (req, res) => {});


module.exports = router;
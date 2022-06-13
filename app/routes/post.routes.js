const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controllers');

// 채용공고 등록
router.post('/', postController.createPost);

// 채용공고 수정
router.patch('/:postId', postController.updatePost);

// 채용공고 삭제
router.delete('/:postId', postController.deletePost);

// 채용공고 목록 및 검색
router.get('/', postController.getPosts);

// 채용공고 상세
router.get('/:postId', postController.getPostDetail);

module.exports = router;
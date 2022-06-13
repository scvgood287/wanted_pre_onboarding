const models = require('../../db/models');

const { Posts, Companies } = models;

// 채용공고 등록
const createPost = async (req, res) => {
  const { body, } = req;

  const createdPost = await Posts.create(body);

  res.send(createdPost);
};

// 채용공고 수정
const updatePost = async (req, res) => {
  const { body, params: { postId }, } = req;

  const updatedPost = await Posts.update(body, {
    where: {
      id: postId,
    },
  });

  res.send(updatedPost);
};

// 채용공고 삭제
const deletePost = async (req, res) => {
  const { params: { postId }, } = req;

  const deletedPost = await Posts.destroy({
    where: {
      id: postId,
    },
  });

  res.send(deletedPost);
};

// 채용공고 목록 및 검색
const getPosts = async (req, res) => {
  const { query: { search }, } = req;

  let posts = await Posts.findAll({
    attributes: {
      exclude: ["details", "company_id", "createAt", "updatedAt", "deletedAt"],
    },
    include: [Companies],
  });

  posts = posts.dataValues.map(({ Companies, ...postInfo }) => {
    const { id, ...companyInfo } = Companies;
    
    return {
      ...companyInfo,
      ...postInfo,
    };
  });

  if (search) {
    posts = posts.filter(post => Object.values(post).some(value => String(value).includes(search)));
  };

  res.send(posts);
};

// 채용공고 상세
const getPostDetail = async (req, res) => {
  const { params: { postId }, } = req;

  const { dataValues: { Companies, ...postInfo } } = await Posts.findByPk(postId, {
    attributes: {
      exclude: ["company_id", "createAt", "updatedAt", "deletedAt"],
    },
    include: [Companies],
  });

  const { id: companyId, ...companyInfo } = Companies;

  const otherPosts = await Posts.findAll({
    where: {
      company_id: companyId,
    },
    attributes: {
      include: ["id"],
    },
  });

  res.send({
    ...companyInfo,
    ...postInfo,
    otherPosts: otherPosts.dataValues.map(({ id }) => id).filter(id => id !== postId),
  });
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  getPosts,
  getPostDetail,
};
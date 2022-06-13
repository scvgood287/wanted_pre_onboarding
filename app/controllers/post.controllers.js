const models = require('../../db/models');

const { Posts, Companies } = models;

// 채용공고 등록
const createPost = async (req, res) => {
  const { body, } = req;

  await Posts.create(body);

  res.status(201);
};

// 채용공고 수정
const updatePost = async (req, res) => {
  const { body, params: { postId }, } = req;

  if (body.hasOwnProperty('id') || body.hasOwnProperty('company_id')) {
    res.status(403).json({ message: "You can't change id or company_id" });
  } else {
    await Posts.update(body, {
      where: {
        id: postId,
      },
    });
  
    res.status(204);
  };
};

// 채용공고 삭제
const deletePost = async (req, res) => {
  const { params: { postId }, } = req;

  await Posts.destroy({
    where: {
      id: postId,
    },
  });

  res.status(204);
};

// 채용공고 목록 및 검색
const getPosts = async (req, res) => {
  const { query: { search }, } = req;

  const posts = await Posts.findAll({
    attributes: {
      exclude: ["details", "company_id", "createdAt", "updatedAt", "deletedAt"],
    },
    include: [Companies],
  });

  let postsInfo = posts.map(({ dataValues: { Company, ...postInfo } }) => {
    const { id, createdAt, updatedAt, deletedAt, ...companyInfo } = Company.dataValues;
    
    return {
      ...companyInfo,
      ...postInfo,
    };
  });

  if (search) {
    postsInfo = postsInfo.filter(post => Object.values(post).some(value => String(value).includes(search)));
  };

  res.json(postsInfo);
};

// 채용공고 상세
const getPostDetail = async (req, res) => {
  let { params: { postId }, } = req;
  postId = Number(postId);

  const { dataValues: { Company, ...postInfo } } = await Posts.findByPk(postId, {
    attributes: {
      exclude: ["company_id", "createdAt", "updatedAt", "deletedAt"],
    },
    include: [Companies],
  });

  const { id: companyId, createdAt, updatedAt, deletedAt, ...companyInfo } = Company.dataValues;

  const otherPosts = await Posts.findAll({
    where: {
      company_id: companyId,
    },
    attributes: ["id"],
  });

  res.json({
    ...companyInfo,
    ...postInfo,
    otherPosts: otherPosts.map(({ dataValues: { id }}) => id).filter(id => id !== postId),
  });
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  getPosts,
  getPostDetail,
};
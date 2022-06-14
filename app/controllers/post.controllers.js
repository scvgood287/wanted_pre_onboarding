const { Companies } = require('../../db/models');
const { postServices, applyServices } = require('../services');

// 채용공고 등록
const createPost = async (req, res) => {
  const { body, } = req;

  const post = await postServices.create(body);

  res.status(201).json(post);
};

// 채용공고 수정
const updatePost = async (req, res) => {
  const { body, params: { postId }, } = req;

  if (body.hasOwnProperty('id') || body.hasOwnProperty('company_id')) {
    res.status(403).json({ message: "You can't change id or company_id" });
  } else {
    await postServices.update(body, {
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

  await postServices.destroy({
    where: {
      id: postId,
    },
  });

  res.status(204);
};

// 채용공고 목록 및 검색
const getPosts = async (req, res) => {
  const { query: { search }, } = req;

  const posts = await postServices.findAll({
    attributes: {
      exclude: ["details", "company_id", "createdAt", "updatedAt", "deletedAt"],
    },
    include: [Companies],
  });

  const postsInfo = posts.map(({ dataValues: { Company, ...postInfo } }) => {
    const { id, createdAt, updatedAt, deletedAt, ...companyInfo } = Company.dataValues;
    
    return {
      ...companyInfo,
      ...postInfo,
    };
  });

  res.status(200).json(search ? postsInfo.filter(post => Object.values(post).some(value => String(value).includes(search))) : postsInfo);
};

// 채용공고 상세
const getPostDetail = async (req, res) => {
  let { params: { postId }, } = req;
  postId = Number(postId);

  const { dataValues: { Company, ...postInfo } } = await postServices.findByPk(postId, {
    attributes: {
      exclude: ["company_id", "createdAt", "updatedAt", "deletedAt"],
    },
    include: [Companies],
  });

  const { id: companyId, createdAt, updatedAt, deletedAt, ...companyInfo } = Company.dataValues;

  const otherPosts = await postServices.findAll({
    where: {
      company_id: companyId,
    },
    attributes: ["id"],
  });

  res.status(200).json({
    ...companyInfo,
    ...postInfo,
    otherPosts: otherPosts.map(({ dataValues: { id }}) => id).filter(id => id !== postId),
  });
};

// 채용공고 지원
const applyPost = async (req, res) => {
  const { body } = req;

  const apply = await applyServices.findOne({
    where: {
      user_id: body.user_id
    },
  });

  if (apply === null) {
    const apply = await applyServices.create(body);

    res.status(201).json(apply);
  } else {
    res.status(400).json({ message: "You Already Applied" });
  };
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  getPosts,
  getPostDetail,
  applyPost,
};
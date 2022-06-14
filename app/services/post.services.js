const { Posts } = require('../../db/models');

const create = async (values, options) => {
  try {
    await Posts.create(values, options);
  } catch (err) {
    console.error(err);
  };
};

const findAll = async (options) => {
  try {
    const posts = await Posts.findAll(options);

    return posts;
  } catch (err) {
    console.error(err);
  };
};

const findByPk = async (pk, options) => {
  try {
    const post = await Posts.findByPk(pk, options);

    return post;
  } catch (err) {
    console.error(err);
  };
};

const update = async (values, options) => {
  try {
    await Posts.update(values, options);
  } catch (err) {
    console.error(err);
  };
};

const destroy = async (options) => {
  try {
    await Posts.destroy(options);
  } catch (err) {
    console.error(err);
  };
};

module.exports = {
  create,
  findAll,
  findByPk,
  update,
  destroy,
};
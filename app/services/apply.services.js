const { Applies } = require('../../db/models');

const findOne = async (options) => {
  try {
    const apply = await Applies.findOne(options);

    return apply;
  } catch (err) {
    console.error(err);
  };
};

const create = async (values, options) => {
  try {
    await Applies.create(values, options);
  } catch (err) {
    console.error(err);
  };
};

module.exports = {
  findOne,
  create,
};
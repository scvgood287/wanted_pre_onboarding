const models = require('../../db/models');

const { Applies } = models;

// 채용공고 지원
const applyPost = async (req, res) => {
  const { body } = req;

  const apply = await Applies.findOne({
    where: {
      user_id: body.user_id
    },
  });

  if (apply === null) {
    const createdApply = await Applies.create(body);

    res.send(createdApply);
  } else {
    res.send("You Already Applied");
  };
};

module.exports = {
  applyPost,
};
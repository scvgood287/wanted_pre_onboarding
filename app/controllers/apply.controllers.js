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
    await Applies.create(body);

    res.status(201);
  } else {
    res.status(400).json({ message: "You Already Applied" });
  };
};

module.exports = {
  applyPost,
};
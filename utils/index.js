const models = require('../db/models');

const createInitialData = async () => {
  const { Companies, Users } = models;

  await Companies.bulkCreate([
    {
      name: "원티드랩",
      country: "한국",
      region: "서울",
    },
    {
      name: "원티드코리아",
      country: "한국",
      region: "부산",
    },
    {
      name: "네이버",
      country: "한국",
      region: "판교",
    },
    {
      name: "카카오",
      country: "한국",
      region: "판교",
    },
  ]);

  await Users.bulkCreate([
    {
      name: "김지유",
      email: "kgeeeu@gmail.com"
    },
    {
      name: "정규상",
      email: "q3@tart.team"
    },
    {
      name: "강훈",
      email: "hunni-devteam@gmail.com"
    },
  ]);
};

module.exports = {
  createInitialData
};
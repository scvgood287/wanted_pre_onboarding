module.exports = (sequelize, DataTypes) => {
  const Applies = sequelize.define("Applies", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      comment: "지원내역 id",
    }
  }, {
    charset: "utf8", // 한국어 설정
    collate: "utf8_general_ci", // 한국어 설정
    tableName: "Applies", // 테이블 이름 정의
    timestamps: true, // createAt, updateAt 활성화
    paranoid: true, // deleteAt 옵션
  });

  Applies.associate = (models) => {
    const { Posts, Users, } = models;

    Applies.belongsTo(Posts, {
      foreignKey: "post_id",
      sourceKey: "id",
    });

    Applies.belongsTo(Users, {
      foreignKey: "user_id",
      sourceKey: "id",
    });
  };
  
  return Applies;
};
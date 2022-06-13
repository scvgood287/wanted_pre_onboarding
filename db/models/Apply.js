module.exports = (sequelize, DataTypes) => {
  const Applies = sequelize.define("Applies", {
    _id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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
    Applies.belongsTo(models.Posts, {
      foreignKey: "post_id",
      sourceKey: "_id",
    });

    Applies.belongsTo(models.Users, {
      foreignKey: "user_id",
      sourceKey: "_id",
    });
  };
  
  return Applies;
};
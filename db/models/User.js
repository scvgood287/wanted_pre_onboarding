module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    _id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      comment: "사용자 id",
    }
  }, {
    charset: "utf8", // 한국어 설정
    collate: "utf8_general_ci", // 한국어 설정
    tableName: "Users", // 테이블 이름 정의
    timestamps: true, // createAt, updateAt 활성화
    paranoid: true, // deleteAt 옵션
  });

  Users.associate = (models) => {
    Users.hasOne(models.Applies, {
      foreignKey: "user_id",
      sourceKey: "_id",
    });
  };
  
  return Users;
};
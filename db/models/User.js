module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      comment: "사용자 id",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "사용자명",
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
      comment: "사용자 이메일",
    },
  }, {
    charset: "utf8", // 한국어 설정
    collate: "utf8_general_ci", // 한국어 설정
    tableName: "Users", // 테이블 이름 정의
    timestamps: true, // createAt, updateAt 활성화
    paranoid: true, // deleteAt 옵션
  });

  Users.associate = (models) => {
    const { Applies, } = models;

    Users.hasOne(Applies, {
      foreignKey: "user_id",
      sourceKey: "id",
    });
  };
  
  return Users;
};
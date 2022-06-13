module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define("Posts", {
    _id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      comment: "채용공고 id",
    },
  }, {
    charset: "utf8", // 한국어 설정
    collate: "utf8_general_ci", // 한국어 설정
    tableName: "Posts", // 테이블 이름 정의
    timestamps: true, // createAt, updateAt 활성화
    paranoid: true, // deleteAt 옵션
  });

  Posts.associate = (models) => {
    Posts.belongsTo(models.Companies, {
      foreignKey: "company_id",
      sourceKey: "_id",
    });

    Posts.hasMany(models.Applies, {
      foreignKey: "post_id",
      sourceKey: "_id",
    });
  };
  
  return Posts;
};
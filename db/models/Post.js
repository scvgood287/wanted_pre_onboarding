module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define("Posts", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      comment: "채용공고 id",
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "채용포지션",
    },
    signingBonus: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "채용보상금",
    },
    details: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "채용내용",
    },
    stack: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "사용기술",
    },
  }, {
    charset: "utf8", // 한국어 설정
    collate: "utf8_general_ci", // 한국어 설정
    tableName: "Posts", // 테이블 이름 정의
    timestamps: true, // createAt, updateAt 활성화
    paranoid: true, // deleteAt 옵션
  });

  Posts.associate = (models) => {
    const { Companies, Applies, } = models;

    Posts.belongsTo(Companies, {
      foreignKey: "company_id",
      sourceKey: "id",
    });

    Posts.hasMany(Applies, {
      foreignKey: "post_id",
      sourceKey: "id",
    });
  };
  
  return Posts;
};
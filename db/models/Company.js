module.exports = (sequelize, DataTypes) => {
  const Companies = sequelize.define("Companies", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      comment: "회사 id",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "회사명",
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "국가",
    },
    region: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "지역",
    },
  }, {
    charset: "utf8", // 한국어 설정
    collate: "utf8_general_ci", // 한국어 설정
    tableName: "Companies", // 테이블 이름 정의
    timestamps: true, // createAt, updateAt 활성화
    paranoid: true, // deleteAt 옵션
  });

  Companies.associate = (models) => {
    const { Posts, } = models;

    Companies.hasMany(Posts, {
      foreignKey: "company_id",
      sourceKey: "id",
    });
  };
  
  return Companies;
};
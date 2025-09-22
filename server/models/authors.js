export function AuthorModel(sequelize, DataTypes) {
  return sequelize.define("Author", {
    author_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    royalties: DataTypes.DECIMAL(10, 2),
    birth_date: DataTypes.DATE,
    awards_count: DataTypes.INTEGER,
  }, {
    tableName: "authors",
    timestamps: false,
  });
}

export function BookModel(sequelize, DataTypes) {
  return sequelize.define("Book", {
    book_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    author_id: { type: DataTypes.INTEGER, allowNull: false },
    avg_rating: DataTypes.DECIMAL(2, 1),
    name: { type: DataTypes.STRING(100), allowNull: false },
    created_at: DataTypes.DATE,
    page_count: DataTypes.INTEGER,
  }, {
    tableName: "books",
    timestamps: false,
  });
}

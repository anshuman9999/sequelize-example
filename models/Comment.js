module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define("comment", {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        message: DataTypes.TEXT,
    })

    return Comment;
}
module.exports = (sequelize, DataTypes) => {
    const Favorite = sequelize.define("favorite", {
        post_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'posts',
                key: 'id',
            },
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            },
            primaryKey: true
        }
    })

    return Favorite;
}
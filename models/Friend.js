module.exports = (sequelize, DataTypes) => {
    const Friend = sequelize.define("friend", {
        user1_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id',
            },
            primaryKey: true
        },
        user2_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            },
            primaryKey: true
        }
    })

    return Friend;
}
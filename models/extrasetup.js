const applyExtraSetup = (sequelize) => {
    const { user, post, comment, favorite, friend } = sequelize.models

    user.hasMany(post, {
        foreignKey: {
            name: "creator_id",
            allowNull: false
        }
    })

    user.hasMany(comment, {
        foreignKey: {
            name: "user_id",
            allowNull: false
        }
    })

    post.hasMany(comment, {
        foreignKey: {
            name: "post_id",
            allowNull: false
        }
    })

    user.belongsToMany(post, { through: favorite, foreignKey: { name: "user_id", allowNull: false } });
    post.belongsToMany(user, { through: favorite, foreignKey: { name: "post_id", allowNull: false } });

    user.belongsToMany(user, { through: friend, as: "friend1", uniqueKey: false, foreignKey: { name: "user1_id", allowNull: false } })
    user.belongsToMany(user, { through: friend, as: "friend2", uniqueKey: false, foreignKey: { name: "user2_id", allowNull: false } })

}

module.exports = applyExtraSetup;
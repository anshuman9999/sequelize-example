const applyExtraSetup = (sequelize) => {
    const { user, post, comment, favorite, friend } = sequelize.models

    user.hasMany(post, {
        foreignKey: "creator_id"
    })

    user.hasMany(comment, {
        foreignKey: "user_id"
    })

    post.hasMany(comment, {
        foreignKey: "post_id"
    })

    user.belongsToMany(post, { through: favorite, foreignKey: "user_id" });
    post.belongsToMany(user, { through: favorite, foreignKey: "post_id" });

    user.belongsToMany(user, { through: friend, as: "friend1", uniqueKey: false, foreignKey: "user1_id" })
    user.belongsToMany(user, { through: friend, as: "friend2", uniqueKey: false, foreignKey: "user2_id" })

}

module.exports = applyExtraSetup;
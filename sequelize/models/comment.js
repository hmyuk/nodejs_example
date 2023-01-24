const Sequelize = require('sequelize');
console.log("comment.js");
module.exports = class Comment2 extends Sequelize.Model {
    static initiate(sequelize){
        super.init({
            comment : {
                type : Sequelize.STRING(100),
                allowNull: false
            },
            created_at : {
                type : Sequelize.DATE,
                allowNull: true,
                defaultValue: Sequelize.NOW
            }
        },{
            sequelize,
            timestamps : false,
            modelName: 'Comment',
            tableName : 'cmments',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        })
    }

    static associate(db){
        db.Comment2.belongsTo(db.User, { foreignKey : 'commenter', targetKey : 'id'});
    }
};
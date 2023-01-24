const Sequelize = require('sequelize');
console.log("user.js");
module.exports = class User extends Sequelize.Model {
    static initiate(sequelize){
        super.init({
            // 컬럼 인수 정의 
            name : {
                type : Sequelize.STRING(20),
                allowNull: false,
                unique: true   
            },
            age: {
                type : Sequelize.INTEGER.UNSIGNED,
                allowNull : true
            },
            married: {
                type : Sequelize.BOOLEAN,
                allowNull : false
            },
            comment : {
                type : Sequelize.TEXT,
                allowNull: true
            },
            create_at:{
                type: Sequelize.DATE,
                allowNull : false ,
                defaultValue: Sequelize.NOW
            } // createAt . updateAt
        },{ // 모델에 대한 설정
            sequelize,
            timestamps : false,
            underscored: false,
            modelName: 'User',
            tableName: 'Users',
            paranoid : false,
            charset : 'utf8', //mb4 는 이모티콘도 사용 할 수 있다.
            collate : 'utf8_general_ci' 
        });    
    }

    static associate(db){
        db.User.hasMany(db.Comment2, { foreignKey : 'commenter', souceKey: 'id'});
    }
}
//importando sequelize
const Sequelize = require("sequelize");
//fazendo conexão com banco de dados
const connection = new Sequelize('perguntas','root','flamengo15',{
    host:'localhost',
    dialect:'mysql'
});

module.exports=connection;
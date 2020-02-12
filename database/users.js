const Sequelize = require("sequelize");
const connection = require("./database");

//fazendo a conexão com o arwuivo onde tem a conexão com database.
const users = connection.define("users", {
users:{
    type:Sequelize.STRING, 
},
  senha: {
    type: Sequelize.STRING,
  },
  repetirSenha: {
    type: Sequelize.STRING,
  }
});
//caso não senha uma tabela com titulo e descricao, esse comando vai fazer com que crie, mas se tiver o "force:false" não vai
//forçar quando tiver as tabelas.
users.sync({ force: false }).then(() => {
});
module.exports = users;

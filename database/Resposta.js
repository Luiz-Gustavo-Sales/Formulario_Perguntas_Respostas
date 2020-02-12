const Sequelize = require("sequelize");
const connection = require("./database");

const Respostas = connection.define("respostas", {
  Resposta: {
    type: Sequelize.TEXT,
    alloNull: false
  },
  //fica o ID da resposta, para poder mostrar as respostas
  perguntaID: {
    type: Sequelize.INTEGER,
    //não pode ser vazio 
    alloNull: false
  }
});
//caso não senha uma tabela com titulo e descricao, esse comando vai fazer com que crie, mas se tiver o "force:false" não vai
//forçar quando tiver as tabelas.
Respostas.sync({force:false});
module.exports=Respostas;
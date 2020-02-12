const Sequelize = require("sequelize");
const connection = require("./database");

//fazendo a conexão com o arwuivo onde tem a conexão com database.
const Pergunta = connection.define("perguntas", {
  //DEFININDO OS CAMPOS DA TABELA
  titulo: {
    //tipo tem que tá em maisculo
    type: Sequelize.STRING,
    //não pode ficar em branco esse campo
    
  },
  descricao: {
    //Sequilize.Text
    //titulo tem que tá maiscúlo
    type: Sequelize.TEXT,
    
  }
});
//caso não senha uma tabela com titulo e descricao, esse comando vai fazer com que crie, mas se tiver o "force:false" não vai
//forçar quando tiver as tabelas.
Pergunta.sync({ force: false }).then(() => {
  console.log("Tabela Criada!!");
});

module.exports = Pergunta;

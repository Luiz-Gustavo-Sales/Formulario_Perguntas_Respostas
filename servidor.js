//importando express
const express = require("express");

const app = express();
/*
npm install body-parser --save (comando para instalar)
importando o baody parser
*/
const bodyParser = require("body-parser");
//importando a conexao
const connection = require("./database/database");
const perguntaModel = require("./database/Perguntas_banco");
//immportando o model do banco de dados dos usuarios
const usersModel=require("./database/users");
//importando as respostas das perguntas.
const perguntas_respondidas=require("./database/Resposta");
connection
  .authenticate()
  .then(() => {
    console.log("conexão feita com banco de dados");
  })
  .catch(msgErro => {
    console.log(msgErro);
  });

//estou dizendo para o express usar o ejs para executar o redenrizador de HTML
app.set("view engine", "ejs");
//INFORMANDO PARA O EXPRESS QUE VOU UTILIZAR ARQUIVOS STATICOS NA PASTA 'PUBLIC',PADRÃO DE MERCADO
app.use(express.static("public"));
//está imformando que vai traduzir os dados enviados para js
app.use(bodyParser.urlencoded({ extended: false }));
//vai usar so quando tuilizar API
app.use(bodyParser.json());

//==============================INDEX IMPRESSÃO DAS PERGUNTAS===================================

app.get("/", (req, res) => {
  //mesma coisa que SELEC FROM * NO SQL
  //raw=true só vai pegar todos elementos que cadastrei
  //quando feito a lista de pergunta é mandado para variavel do the("perguntas")
  perguntaModel.findAll({raw:true,order:[
    //para organizar as perguntas mais recentes, usa se dentro do JSON 
    /*{raw:true,order[criando um array
    
      dentro do array coloca em outr
    ]}
    
    */
    ['id','DESC']
  ]}).then(perguntas =>{
    res.render("index",{
      //jogando as perguntas para variavel eprguntas_do_banco
      perguntas_do_banco:perguntas
    });
  })
  
});

//==============================FIM INDEX IMPRESSÃO DAS PERGUNTA===================================


//==============================CADASTROS===================================
app.get("/cadastrar", (req, res) => {
  res.render("cadastrar");
});
app.post("/salvarcadastro",(req,res)=>{
var users= req.body.user;
var senha = req.body.senha;
var confirmaSenha=req.body.repetirSenha;

  usersModel.create({
    users:users,
    senha:senha

  }).then(()=>{
    res.redirect("/login");
  }).catch((msnErro)=>{

    console.log("Não cadastrado");
  })
})
//============================== FIM CADASTROS===================================

//==============================LOGIN===================================
app.get("/login", (req, res) => {
  res.render("login");
});
//===============================alterando aqui
app.post("/loginUsuario",(req,res)=>{
  const usuario=req.body.user;
  const senha= req.body.senha;
 usersModel.findOne({
   where:{
    users:usuario,
     senha:senha
  } 

 }).then( usuarios =>{
   //quando login for verdadeiro direciona direto para pagina Pergunta
   if(usuarios!= undefined){
     
    res.render("perguntar",{

    
      
    });
//caso seja o contrario direcionar para o login novamente, para digitar usuario correto
   }else{
    res.redirect("login");
   }
   }).catch(err =>{
   
   })

  
  })

//============================== FIM LOGIN===================================

//==============================PERGUNTAS===================================
app.get("/perguntar", (req, res) => {
  res.render("perguntar");
});

//rota para onde o formulario vai enviar seus dados, em metodo POST
app.post("/salvarpergunta", (req, res) => {
  var descricao = req.body.descricao;
  var titulo = req.body.titulo;
  //create mesmo que INSERT NO SQL atribuir dados na tabelas
  perguntaModel
    .create({
      titulo:titulo,
      descricao:descricao
    })
    .then(() => {
      res.redirect('/');
    })
    .catch(msgErro => {
      console.log("Erro, não cadastrado");
    });
});
//==============================FIM LOGIN===================================


//buscando perguntas no banco pelo ID

app.get("/pergunta/:id",(resq,res)=>{
  var id= resq.params.id;
  perguntaModel.findOne({
  //where=onde  
    where:{id:id}
  }).then(pergunta_encontrada =>{
    //quando for encontrada
    if(pergunta_encontrada!= undefined){

      perguntas_respondidas.findAll({
        where:{
          perguntaID:pergunta_encontrada.id
        },
        //ordendo as respostas mais recentes
        order:[['id','DESC']]
      }).then(respostas =>{
        res.render("pergunta_encontrada",{
          //criando variavel para o html
          pergunta:pergunta_encontrada,
          respostas:respostas
        });
      })
      //caso não seja encontrada
    }else{
      res.redirect("/");
    }
  })
})
//rota para perguntas respondidas
app.post("/responder",(req,res)=>{
  //pegando a resposta da pergunta
  var recebe_resposta = req.body.corpo_da_resposta;
  //pegando id da pergunta
  var perguntaID= req.body.pergunta
  //inserindo perguntas no banco de dados.
  perguntas_respondidas.create({
    //CAMPO Rsposta do mysql vai receber as respostas das perguntas
    Resposta:recebe_resposta,
    //ID da pergunta será salvo
    perguntaID:perguntaID
  }).then(()=>{
    //vai direcionar pra pergunta a qual respondeu, a varivel perguntaID pega o ID da pergunta.
    res.redirect("/pergunta/"+perguntaID)
  })
})

app.listen(3000, () => {
  console.log("App rodando!!");
});

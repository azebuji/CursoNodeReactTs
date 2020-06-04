import express from 'express';

//A variavel app vai receber todas as funcionalidades do gerenciador de rotas "express" para dentro da variavel, claro que só depois que tiver dado os tipos para ela com o "npm install @type/express -D"
// o -D significa apenas que vou usar essa notação em ambiente de desenvolvimento, pois estou usando o modo TypeScript que logo se transforma em javascript
const app = express();


//esse comando é para passar a rota do navegador e o que ele deve fazer como função
//no segundo parâmetro " a função" ele tem dois parâmetros o request e o response
//Request é usado para obter dados sobre a requisição ou seja obter os dados
//Respose server para devolver uma resposta para qualquer aplicação que esteja usando a aplicação
app.get('/user', (request, response) => {
    console.log("Listagem de usuários");
    //response.send("Hello World");

    //para retorno json eu troco send por json

    //O json pode retornar dois tipos de dados arrays ([]) ou objetos ({})
    response.json([
        'Anderson',
        'Maira',
        'Jinx',
        'Sona',
        'Matilda'
    ]);
})

//Aqui eu defino qual é a porta que ele vai escutar
app.listen(3333);

//Porêm esse código só vai funcionar se eu colocar uma dependência que faça a decodificação de ts para js o ts-node

//então devo instalar:
    // "npm install ts-node -D" e o typeScript "npm install typescript -D"

//logo preciso criar o arquivo de configuração do type script passando o comando:
    // "npx tsc --init"

//depois disso eu executo o comando npx, quesão os binários dentro da pasta node_modules e o caminho do arquivo que eu quero executar:
    // "npx ts-node src/server.ts"
    //obs isso quando não tiver ainda instalando o pacote ts-node-dev

//1* Outra coisa que é interessante é instalar um pacote para desenvolvedor que fica observando se houveram alterações no código para assim executar denovo, 
//assim não preciso ficar parando a aplicação e iniciando ela denovo
    // "npm install ts-node-dev -D"

//2* Após instalar o pacote posso dar o comando npx ts-node-dev [caminho do arquivo que quero que execute]
//posso também colocar o caminho do arquivo no package.json na chave script  e executar com o comando abaixo:
    //npm run [nome que foi dado na parte de scripts]
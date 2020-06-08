//Essa é conexão do banco de dados
import knex from 'knex';
import path from 'path'; // Library para resolver os caminhos

//a função resolve ela retorna o caminho conforme o OS 
// __dirname ela vai retornar o diretório do arquivo que estiver sendo executado 

const connection = knex({
    client: 'sqlite3', 
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite'),
    },
    useNullAsDefault: true,
});

export default connection;
import express from 'express';
import PointsController from './controllers/pointsController';
import ItemsController from './controllers/itemsController';
//Isso torna possível eu pegar qualquer rota de qualquer arquivo
const routes = express.Router();
const pointsController = new PointsController();
const itemsController = new ItemsController();

//Os padrões de criação de metodos são: 
// index para listagem de dados
// show para um único dado
// create para salvar novos dados
// update para quando for atualizar
// delete para quando for deletar dados

//Sempre que for usado uma querye pro banco eu preciso colocar await e a função deve ser async
routes.get('/items', itemsController.index);

//para receber os dados da tela
routes.post('/points', pointsController.create);
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);


//Para que seja possível importar esse arquivo em outros
export default routes;
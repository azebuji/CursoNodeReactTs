import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {
    async index(request: Request, response: Response) {
        // Quando se trata de filtrar algo eu uso o Query params
        // cidade, uf, items (Query params) 
        const {city, uf, items} = request.query;

        const parsedItems = String(items)
        .split(',')
        .map(item=>Number(item.trim()));

        const points = await knex('points')
        .join('point_items', 'points.id', '=', 'point_items.point_id')
        .whereIn('point_items.item_id',parsedItems)
        .where('city', String(city))
        .where('uf', String(uf))
        .distinct()
        .select('points.*')

        return response.json(points);
    }

    async show(request: Request, response: Response) {
        //const id = request.params.id isso é a mesma coisa do de baixo
        const { id } = request.params;

        const point = await knex('points').where('id', id).first();

        if(!point){
            return response.status(400).json({message: "Ponto não achado."});
        }

        const items = await knex('items')
        .join('point_items', 'items.id', '=', 'point_items.item_id')
        .where('point_items.point_id', id)
        .select('title');

        return response.json({point, items});
    }

    async create(request: Request, response: Response) {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body //se eu ja souber o que vem dentro do body faço dessa forma

        //Para que cada insert execute um após o outro e se der erro nenhum é executado
        const trx = await knex.transaction();

        //logo após eu insiro os dados na tabela points
        //Sendo que após inserir ele só vai retornar um registro que é o id gerado
        const point = {
            image: 'https://images.unsplash.com/photo-1556767576-5ec41e3239ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
        };

        const insertedIds = await trx('points').insert(point);

        const point_id = insertedIds[0];
        const pointitems = items.map((item_id: number) => {
            return {
                item_id,
                point_id: point_id,
            };
        });

        await trx('point_items').insert(pointitems);
        
        //Ao final de todas as inserções no banco de dados é preciso dar o commit
        await trx.commit();

        return response.json({
            id: point_id,
            point
        });
    }
}

export default PointsController;
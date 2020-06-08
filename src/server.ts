//Este arquivo é o que vai chamar o routes, que a partir do routes
//vai chamar os metodos e tudo mais

import express from 'express';
import path from 'path';
import cors from 'cors';
import routes from './routes';

const app = express();


app.use(cors());
app.use(express.json());
app.use(routes);

//para mostrar arquivos que vão ser acessados de forma direta
//eu uso a função static do express
//servem para uma pasta específica
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.listen(3333);
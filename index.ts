import express from 'express';
const dotenv = require('dotenv');


const UserRouter =  require ('./src/routes/user.route');
const RoleRouter =  require ('./src/routes/role.route');
const FoodItemRouter =  require ('./src/routes/foodItem.route');
const categoryRouter =  require ('./src/routes/category.route');
const permisisonRouter =  require ('./src/routes/permission.route');
const swaggerDocument = require('./src/utils/swagger.json');
const app = express();
const cors = require('cors');

app.use(cors({
  origin: '*'
}));

import './config/db';
// import {swaggerDocs}  from './src/utils/swagger';
import  swaggerUi  from 'swagger-ui-express';
import transporter from './src/config/email';
import path from 'path';

dotenv.config();
app.set('views', path.join(__dirname, 'views'));
 app.set('view engine', 'ejs');

app.use(express.static('public'))
app.get('/', (req: any, res: any) => {
    res.send('Welcome to Nodejs Page');
})

const port = process.env.PORT || 4000;
app.listen(port,async () => {
    console.log('The application is listening on port'+ port);
    // swaggerDocs(app, 3000);
})

app.use(express.urlencoded({ extended: true , limit: '50mb'}));
app.use(express.json({limit: '50mb'}));

app.use(
    '/api-docs',
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument)
  );

/**
 * Grouping Route
 */

const routePrefix = '/api/v1/';
app.use(`${routePrefix}user`, UserRouter);
app.use(`${routePrefix}role`, RoleRouter);
app.use(`${routePrefix}foodItem`, FoodItemRouter);
app.use(`${routePrefix}category`, categoryRouter);
app.use(`${routePrefix}permission`, permisisonRouter);
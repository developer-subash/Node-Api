import express from 'express';
const dotenv = require('dotenv');


const UserRouter =  require ('./src/routes/user.route');
const RoleRouter =  require ('./src/routes/role.route');
const BannerRouter =  require ('./src/routes/banner.route');
const categoryRouter =  require ('./src/routes/category.route');
const swaggerDocument = require('./src/utils/swagger.json');
import './config/db';
// import {swaggerDocs}  from './src/utils/swagger';
import  swaggerUi  from 'swagger-ui-express';
const app = express();

dotenv.config();


app.use(express.static('public'))
app.get('/', (req: any, res: any) => {
    res.send('Welcome to Nodejs Page');
})

const port = process.env.PORT || 3000;
app.listen(port,async () => {
    console.log('The application is listening on port 3000!');
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
app.use(`${routePrefix}banner`, BannerRouter);
app.use(`${routePrefix}category`, categoryRouter);
import express from 'express';
const dotenv = require('dotenv');


const UserRouter =  require ('./src/routes/user.route');
const RoleRouter =  require ('./src/routes/role.route');
const BannerRouter =  require ('./src/routes/banner.route');
const categoryRouter =  require ('./src/routes/category.route');
import './config/db';
const app = express();

dotenv.config();

app.get('/', (req: any, res: any) => {
    res.send('Welcome to Nodejs Page');
})

app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
})

app.use(express.urlencoded({ extended: true , limit: '50mb'}));
app.use(express.json({limit: '50mb'}));

/**
 * Grouping Route
 */

const routePrefix = '/api/v1/';
app.use(`${routePrefix}user`, UserRouter);
app.use(`${routePrefix}role`, RoleRouter);
app.use(`${routePrefix}banner`, BannerRouter);
app.use(`${routePrefix}category`, categoryRouter);
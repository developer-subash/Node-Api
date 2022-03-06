import express from 'express';
import path from 'path';
import './config/db';

const UserRouter =  require ('./src/routes/user.route');
const RoleRouter =  require ('./src/routes/role.route');
const app = express();

app.get('/', (req: any, res: any) => {
    res.send('Welcome to Nodejs Page');
})

app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/**
 * Grouping Route
 */

const routePrefix = '/api/v1/';
app.use(`${routePrefix}user`, UserRouter);
app.use(`${routePrefix}role`, RoleRouter);
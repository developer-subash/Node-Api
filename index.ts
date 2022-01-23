import express from 'express';
import path from 'path';
import './config/db';

const app = express();
app.get('/', (req: any, res: any) => {
    res.send('Welcome to Nodejs Page');
})

app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
})
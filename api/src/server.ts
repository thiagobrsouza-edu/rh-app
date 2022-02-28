import * as cors from 'cors';
import * as express from 'express';
import * as logger from 'morgan';
import "reflect-metadata";
import { connectToDatabase } from './config/database';

export const app = express();

app.use(cors());

app.use(express.json());

app.use(logger('dev'));

connectToDatabase();

const port = 3001;
const server = app.listen(port, () => console.log(`Application running on port ${port}`));

/**
 * server configuration
 */
process.on('SIGINT', () => {
    server.close();
    console.log('Application closed.');
});
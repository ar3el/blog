import 'dotenv/config';
import express, { Express } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './router';
import errorMiddlewares from './middlewares/errors';

const PORT = process.env.PORT || 3001;

const app: Express = express();
app.use('/static', express.static(__dirname + '/image'));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.use('/api', router);
app.use(errorMiddlewares);

async function start() {
    try {
        app.listen(PORT, () => console.log(`server is running on the port=${PORT}`))
    } catch (error) {
        console.error(error);
    }
}
start();
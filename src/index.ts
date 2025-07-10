import express from 'express';
import { PORT } from './config/server.config';
import userProfileRouter from './routes/user.route';
import errorHandlerMiddleware from './utils/errorHandler';
const app=express();

app.use(express.json());
app.use('/',userProfileRouter);
app.use(errorHandlerMiddleware);

app.listen(PORT,()=>{console.log(`Server is running on port ${PORT}`)});
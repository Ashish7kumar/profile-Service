import express from 'express';
import { PORT } from './config/server.config';
const app=express();
app.use(express.json());

app.listen(PORT,()=>{console.log(`Server is running on port ${PORT}`)});
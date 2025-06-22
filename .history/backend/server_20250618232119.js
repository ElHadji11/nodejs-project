import express from 'express';
import dotenv from 'dotenv';
import connectMongoDB from './db/connectMongoDB.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use('/api/smartphones', smartphoneRoutes);
app.use(express.json());

console.log('Environment Variables:', process.env.PORT);

app.listen(PORT, () => {
    console.log('Server is running on PORT', PORT);
    connectMongoDB();
})
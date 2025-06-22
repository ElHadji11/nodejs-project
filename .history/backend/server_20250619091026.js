import express from 'express';
import dotenv from 'dotenv';
import connectMongoDB from './db/connectMongoDB.js';
import smartphoneRoutes from './routes/smartphone.route.js';

dotenv.config();
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use('/api/smartphones', smartphoneRoutes);

console.log('Environment Variables:', process.env.PORT);

app.listen(PORT, () => {
    console.log('Server is running on PORT', PORT);
    connectMongoDB();
})
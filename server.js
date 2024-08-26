import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import morgan from 'morgan';
import authRoutes from './routes/authRoute.js'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

const app = express()
const port = process.env.PORT || 8080;

// ESM equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


//middlewares
app.use(cors());
app.use(express.json())
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));


//routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

main().then(()=>console.log('db connected')).catch(err => console.log(err));

async function main() {
    const url = process.env.MONGO_URL
    const password = process.env.MONGO_PASSWORD
    const urlwithpassword = url.replace('<password>',password)
  await mongoose.connect(urlwithpassword);
}
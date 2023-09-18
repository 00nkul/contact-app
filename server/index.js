//basic node 
import express from 'express';
import contactsRouter from './router/contactsRouter.js';
import cors from 'cors';

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/contacts', contactsRouter);

app.get('/health', (req, res) => {
    res.send('Server is healthy');
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
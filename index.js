require('dotenv').config();
const express = require('express');
const usersRoutes = require('./api/routes/userRoutes');
const productsRoutes = require('./api/routes/productRoute');
const cartsRouter = require('./api/routes/cartsRoutes');
const {login} = require('./api/controllers/userController');
const picturesRoutes = require('./api/routes/picturesRoutes');
const app = express();
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const cors = require('cors');
app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());



//RUTAS
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/products', productsRoutes);
app.use('/api/v1/carts', cartsRouter);
app.use('/api/v1/pictures', picturesRoutes);



//ALIAS:
app.post('/api/v1/login', login);




app.get('/*', (req,res)=>{
    res.status(400).json({ Mensaje: 'Bad Request.'})
})

app.put('/*', (req,res)=>{
    res.status(400).json({ Mensaje: 'Bad Request.'})
})

app.post('/*', (req,res)=>{
    res.status(400).json({ Mensaje: 'Bad Request.'})
})
app.delete('/*', (req,res)=>{
    res.status(400).json({ Mensaje: 'Bad Request.'})
})


app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
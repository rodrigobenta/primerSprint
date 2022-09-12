require('dotenv').config();
const express = require('express');
const usersRoutes = require('./api/routes/userRoutes');
const productsRoutes = require('./api/routes/productRoute');
//const cartsRouter = require('./api/routes/cartsRoutes');
const {login} = require('./api/controllers/userController')
const picturesRoutes = require('./api/routes/picturesRoutes');
const app = express();

app.use(express.json());
//RUTAS
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/products', productsRoutes);
//app.use('api/v1/carts', cartsRouter);
app.use('/api/v1/pictures', picturesRoutes);

//ALIAS:
app.post('/api/v1/login', login);

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
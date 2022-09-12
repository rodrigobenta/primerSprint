require('dotenv').config();
const express = require('express');
const usersRoutes = require('./api/routes/usersRoutes');
const productsRoutes = require('./api/routes/productsRoutes');
const cartsRouter = require('./api/routes/cartsRoutes');
const login = require('./api/controllers/userController')

// const swaggerUi = require('swagger-ui-express');
// const YAML = require('yamljs');
// const swaggerDocument = YAML.load('./swagger.yaml');
// const cors = require('cors');

const app = express();

app.use(express.json());
//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//app.use(cors());

//RUTAS A MODIFICAR.......
app.use('api/v1/users', usersRoutes);
app.use('api/v1/products', productsRoutes);
app.use('api/v1/carts', cartsRouter);


app.post('api/v1/login', login);

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
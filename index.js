require('dotenv').config();
const express = require('express');
const usersRoutes = require('./api/routes/userRoutes');
const productsRoutes = require('./api/routes/productRoute.js');

// const swaggerUi = require('swagger-ui-express');
// const YAML = require('yamljs');
// const swaggerDocument = YAML.load('./swagger.yaml');
// const cors = require('cors');

const app = express();

app.use(express.json());
//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//app.use(cors());

//RUTAS A MODIFICAR.......
app.use('/users', usersRoutes);
app.use('/products', productsRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
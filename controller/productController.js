const fs = require('fs');
const jwt = require('../helpers/generateJWT')


const show = (req,res) => {
    
}
const create = (req,res) => {
    let data = fs.readFileSync(process.env.RUTA_DB_PRODUCT, 'utf-8');
    let dataParsed = JSON.parse(data);

    const userLogin = dataParsed.find(dataParsed => dataParsed.email == req.body.email && dataParsed.password == req.body.password);
}
const edit = (req,res) => {
    let data = fs.readFileSync(process.env.RUTA_DB_PRODUCT, 'utf-8');
    let dataParsed = JSON.parse(data);

    const userLogin = dataParsed.find(dataParsed => dataParsed.email == req.body.email && dataParsed.password == req.body.password);
}
const deleteP = (req,res) => {
    let data = fs.readFileSync(process.env.RUTA_DB_PRODUCT, 'utf-8');
    let dataParsed = JSON.parse(data);

    const userLogin = dataParsed.find(dataParsed => dataParsed.email == req.body.email && dataParsed.password == req.body.password);
}

module.exports = {show,create,edit,deleteP};
const fs = require('fs');
const jwt = require('../helpers/generateJWT')


const login = (req,res) => {
    
}

const show = (req,res) => {
    
}
const create = (req,res) => {
    let data = fs.readFileSync(process.env.RUTA_DB_USER, 'utf-8');
    let dataParsed = JSON.parse(data);

    const userLogin = dataParsed.find(dataParsed => dataParsed.email == req.body.email && dataParsed.password == req.body.password);
}
const edit = (req,res) => {
    let data = fs.readFileSync(process.env.RUTA_DB_USER, 'utf-8');
    let dataParsed = JSON.parse(data);

    const userLogin = dataParsed.find(dataParsed => dataParsed.email == req.body.email && dataParsed.password == req.body.password);
}
const deleteU = (req,res) => {
    let data = fs.readFileSync(process.env.RUTA_DB_USER, 'utf-8');
    let dataParsed = JSON.parse(data);

    const userLogin = dataParsed.find(dataParsed => dataParsed.email == req.body.email && dataParsed.password == req.body.password);
}

module.exports = {login,show,create,edit,deleteU};
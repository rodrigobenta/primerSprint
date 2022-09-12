const fs = require('fs');
const jwt = require('../../helpers/generateJWT')


const login = async (req,res) => {
    try {
        let data = fs.readFileSync(process.env.RUTA_DB_USER, 'utf-8');
        data = JSON.parse(data);
        const userLogin = data.find(data => data.username == req.body.username && data.password == req.body.password);

        if(!userLogin) res.status(500).json({
            msg: "Server error"
        })
        else {
            const token = await jwt(userLogin);
            userLogin.password = '';
                res.status(200).json({
                success: true,
                message: 'Authorized',
                user: {
                    iduser: userLogin.id,
                    username: userLogin.username,
                    },
                token
                })
        }
    } catch (error) {
        res.status(404).json({
            msg: "Error interno"
        })
    }
}

const show = (req,res) => {
    
}
const create = (req,res) => {
    

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
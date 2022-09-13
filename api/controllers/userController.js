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
            console.log(userLogin)
            const token = await jwt(userLogin);
            console.log("login")
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

const listUsers = (req,res) => {

    try {
        let dbUser = fs.readFileSync(process.env.RUTA_DB_USER, 'utf-8');
        let users = JSON.parse(dbUser);
        res.status(200).json({
            listaProducts: users
        });
    } catch (error) {
        res.status(500).json({ Mensaje: 'Server error.' });
    }

}

const listUserById = (req,res) => {

    try {
        let dbUser = fs.readFileSync(process.env.RUTA_DB_USER, 'utf-8');
        let users = JSON.parse(dbUser);
        users.forEach(el => {
            if(el.id === Number(req.params.id))
                return res.status(200).json({
                    listaProducts: el
                });
        });
        return res.status(404).json({ Mensaje: 'Id: ' + req.params.id + ', user not found ' });
    } catch (error) {
        res.status(500).json({ Mensaje: 'Server error.' });
    }

}

const createUser = (req,res) => {
    
    const { id, email, username, password, firstname, lastname, role} = req.body;
    const newUser = {id, email, username, password, firstname, lastname, role};

    if(req.profilepic){
        let profilepic = req.body.profilepic;
        newUser = {id, email, username, password, firstname, lastname, profilepic, role};
    }
    try {
        let dbUser = fs.readFileSync(process.env.RUTA_DB_USER, 'utf-8');
        let users = JSON.parse(dbUser);
        users.push(newUser);
        fs.writeFileSync(process.env.RUTA_DB_USER, JSON.stringify(users));
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ Mensaje: 'Server error.' });
    }
}

const editUserById = (req,res) => {
    try{
        let {...propiedades} = req.body;
        let id = Number(req.params.id);

        let newEl;
        let dbUser = fs.readFileSync(process.env.RUTA_DB_USER, 'utf-8');
        let users = JSON.parse(dbUser);

        let userEdited = users.find(el => el.id === id);

        if(userEdited) {
            const usersUpdate = users.map(elem => {
                    if (Number(elem.id) == id){
                        newEl = {id, ...propiedades};
                        return newEl;
                    }
                    else return elem;
                    })

            fs.writeFileSync(process.env.RUTA_DB_USER, JSON.stringify(usersUpdate));
            res.status(200).json(newEl);
        }else{
            return res.status(404).json({ Mensaje: 'El usuario no existe.'})
        }

    } catch(error){
        res.status(500).json({ Mensaje: 'Server error.' });
    }
}

const deleteUserById = (req,res) => {
    let id = Number(req.params.id);

    try {
        let dbUser = fs.readFileSync(process.env.RUTA_DB_USER, 'utf-8');
        let users = JSON.parse(dbUser);

        let userDeleted = users.filter(el => el.id === Number(id));
        
        if (userDeleted.length > 0){
            let newUsers = users.filter(el => el.id !== Number(id));
            fs.writeFileSync(process.env.RUTA_DB_USER, JSON.stringify(newUsers));
            res.status(200).json({userDeleted})
        }else{
            return res.status(404).json({ Mensaje: 'El usuario no existe.'})
        }
    } catch (error) {
        res.status(500).json({ Mensaje: 'Server error.' });
    }
    
}

module.exports = {
    login,
    listUsers,
    listUserById,
    createUser,
    editUserById,
    deleteUserById
};
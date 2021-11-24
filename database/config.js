const mongoose = require('mongoose');

const dbConnection = async () => {
    await mongoose.connect(process.env.MONGOURL)
        .then(() => console.log("Instancia DB OKEY") )
        .catch(err => {
            console.log(`Error de coneccion a la DB ${err}`);
            throw new Error('No se puede conectar a la base de datos');
        });
}

module.exports = {
    dbConnection
}
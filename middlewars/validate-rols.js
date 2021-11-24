const isAdmin = (req, res, next) => {
    if(!req.user){
        return res.status(500).json({
            msg: "Se requiere validar el token"
        })
    }

    const {  name, rol } = req.user;

    if(rol !== 'Admin'){
        return res.status(401).json({
            msg: `${name} no tiene los permisos suficientes`
        })
    }

    next();
}

const isRol = (...rols) => {
    return (req, res, next) => {
        if(!req.user){
            return res.status(500).json({
                msg: "Se requiere validar el token"
            })
        }

        if(!rols.includes(req.user.rol)){
            return res.status(401).json({
                msg: `El rol ${req.user.name} cuenta con los permisos necesarios`
            })
        }

        next();
    }
}

module.exports = {
    isAdmin,
    isRol
}
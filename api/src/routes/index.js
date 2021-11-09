const { Router } = require('express');
const getAllUsersRoute = require('./getAllUsersRoute');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/', getAllUsersRoute);

module.exports = router;

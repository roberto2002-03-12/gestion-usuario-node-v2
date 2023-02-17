require('./config/s3.bucket');
const express = require('express');
const cors = require('cors');
const routerApi = require('./routes/index');
const { config } = require('./config/config');

const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');

const app = express();

app.use(express.json());

app.use(cors());

require('./utils/auth/index');

routerApi(app);

//middlewares de manejo de errores
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(config.port, () => {
    console.log(`Corriendo en puerto ${config.port}`);
});
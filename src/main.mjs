import express from 'express';
import helloRouter from './routes/hello.mjs';
import temperatureRouter from './routes/temperature.mjs';
import getConfig from './config/configCondition.mjs';
import Temperature from './models/temperature/temperature.mjs';

// Create table if not exists
Temperature.sequelize.sync({logging: false}).then(() => {
  console.log('Tabela de temperatura criada com sucesso.');
})

const config = getConfig().main

const app = express()

// Hello Endpoint
app.use('/hello', helloRouter)

// Temperature Endpoint
app.use('/temperature', temperatureRouter)

app.listen(config.port, () => {
  console.log(`Servidor iniciado em http://localhost:${config.port}`)
})
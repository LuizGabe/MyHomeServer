import express from 'express';
import helloRouter from './routes/hello.mjs';
import weatherRouter from './routes/weather.mjs';
import getConfig from './config/configCondition.mjs';

const config = getConfig().main

const app = express()

// Hello Endpoint
app.use('/hello', helloRouter)

// Weather Endpoint
app.use('/weather', weatherRouter)

app.listen(config.port, () => {
  console.log(`Servidor iniciado em http://localhost:${config.port}`)
})
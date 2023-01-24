import express from 'express';
import helloRouter from './routes/hello.mjs';
import temperatureRouter from './routes/temperature.mjs';

const app = express()

// configuração
const config = {
  port: 5000,
}

// Hello Endpoint
app.use('/hello', helloRouter)

// Temperature Endpoint
app.use('/temperature', temperatureRouter)

app.listen(config.port, () => {
  console.log(`Servidor iniciado em http://localhost:${config.port}`)
})
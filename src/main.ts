import express from 'express';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import TemperatureData from './interfaces/temperatureData';

const app = express()
let count: number = 0
let temperatureData: TemperatureData[] = []

// configuração
const config = {
  ip: 'localhost',
  port: 5000,
  temperatureFile: 'temperatureData.json',
  helloEndpoint: '/hello',
  temperatureEndpoint: '/temperature'
}

app.get(config.helloEndpoint, (req, res) => {
  res.statusCode = 200
  res.send(`Hello World! ${count++}`)
})

app.get(`${config.temperatureEndpoint}/latest`, (req, res) => {
  if (existsSync(config.temperatureFile)) {
    temperatureData = JSON.parse(readFileSync(config.temperatureFile).toString()) as TemperatureData[];
    temperatureData.sort((a, b) => new Date(b.dateHour).valueOf() - new Date(a.dateHour).valueOf());
    res.json(temperatureData[0]);
  } else {
    res.send("Temperature data not found.");
  }
});

const router = express.Router();

router.get(`/retornaTodos`, (req, res) => {
  if (existsSync(config.temperatureFile)) {
    temperatureData = JSON.parse(readFileSync(config.temperatureFile).toString());
    res.statusCode = 200
    res.json(temperatureData);
  } else {
    res.statusCode = 501;
    res.send('Dados de temperatura não encontrados.');
  }
});

router.get(`/:number`, (req, res) => {
  let number = parseInt(req.params.number);
  if (isNaN(number)) {
    number = 10; // valor padrão caso não seja passado um número como parâmetro
  }
  if (existsSync(config.temperatureFile)) {
    temperatureData = JSON.parse(readFileSync(config.temperatureFile).toString());
    res.statusCode = 200
    res.json(temperatureData.slice(0, number));
  } else {
    res.statusCode = 501;
    res.send('Dados de temperatura não encontrados.');
  }
});




router.post(``, (req, res) => {
  req.on('data', (data) => {
    // parseando os dados JSON de entrada
    const incomingData: any = JSON.parse(data)
    // adicionando o DateHour aos dados de entrada
    const date = new Date()
    incomingData.dateHour = new Date(date.setUTCHours(date.getUTCHours() - 3)).toISOString()

    // carregando os dados existentes do arquivo
    if (existsSync(config.temperatureFile)) {
      temperatureData = JSON.parse(readFileSync(config.temperatureFile).toString());
    }
    // adicionando os dados de entrada aos dados existentes
    temperatureData.push(incomingData)
    // salvando os dados de volta para o arquivo
    writeFileSync(config.temperatureFile, JSON.stringify(temperatureData, null, 2))
    res.statusCode = 200
    res.send('Dados de temperatura recebidos e salvos no arquivo.')
  })
})

app.use(config.temperatureEndpoint, router);

app.listen(config.port, () => {
  console.log(`Servidor iniciado em http://localhost:${config.port}`)
})

import axios from 'axios';
import { expect } from 'chai';
import baseUrl from './pathRoutes.mjs';

const temperatureUrl = `${baseUrl}/temperature`

describe('Temperature API Routes', () => {

  //Test for getting latest data
  it('should get latest data', async () => {
    const response = await axios.get(`${temperatureUrl}/latest`)
    expect(response.status).equal(200)
    expect(response.data).to.have.property('temperature')
  })

  //Test for getting all data
  it('should get all data', async () => {
    const response = await axios.get(`${temperatureUrl}/all`)
    expect(response.status).equal(200)
    expect(response.data).to.be.instanceOf(Array)
  })

  //Test for getting data by id
  it('should get data by id', async () => {
    const response = await axios.get(`${temperatureUrl}/id/1`)
    expect(response.status).equal(200)
    expect(response.data).to.have.property('temperature')
  })

  //Test for getting limited data
  it('should get limited data', async () => {
    const response = await axios.get(`${temperatureUrl}?start=1&limit=10`)
    expect(response.status).equal(200)
    if(response.status === 200) {
      expect(response.data).to.be.instanceOf(Array)
      expect(response.data.length).equal(10)
    } else {
      expect(response.data.length).equal(1)
    }
  })

  //Test for creating data
  it('should create data', async () => {
    const data = {"humidity": 63, "temperature": 28.2}
    const response = await axios.post(`${temperatureUrl}`, data)
    expect(response.status).equal(200)
    expect(response.data[0]).to.equal('Dados Inseridos com Sucesso!')
    expect(response.data[1]).to.have.deep.property('temperature')
    expect(response.data[1]).to.have.deep.property('humidity')
  })
})
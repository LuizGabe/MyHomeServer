import axios from 'axios';
import { expect } from 'chai';
import baseUrl from './pathRoutes.mjs';

const weatherUrl = `${baseUrl}/weather`

describe('Weather API Routes', () => {

  //Test for getting latest data
  it('should get latest data', async () => {
    console.time('getLatest')
    const response = await axios.get(`${weatherUrl}/latest`)
    console.timeEnd('getLatest')
    expect(response.status).equal(200)
    expect(response.data).to.have.property('temperature')
  })

  //Test for getting all data
  it('should get all data', async () => {
    console.time('getAll')
    const response = await axios.get(`${weatherUrl}/all`)
    console.timeEnd('getAll')
    expect(response.status).equal(200)
    expect(response.data).to.be.instanceOf(Array)
  })

  //Test for getting data by id
  it('should get data by id', async () => {
    console.time('getById')
    const response = await axios.get(`${weatherUrl}/id/1`)
    console.timeEnd('getById')
    expect(response.status).equal(200)
    expect(response.data).to.have.property('temperature')
  })

  //Test for getting limited data
  it('should get limited data', async () => {
    console.time('getStartLimit')
    const response = await axios.get(`${weatherUrl}?start=1&limit=10`)
    console.timeEnd('getStartLimit')
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
    console.time('createNoCache')
    const response = await axios.post(`${weatherUrl}`, data)
    console.timeEnd('createNoCache')
    expect(response.status).equal(200)
    console.log(response.data)
    expect(response.data).to.have.deep.property('temperature')
    expect(response.data).to.have.deep.property('humidity')
  })
})
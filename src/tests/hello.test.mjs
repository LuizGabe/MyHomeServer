import axios from 'axios';
import { expect } from 'chai';
import baseUrl from './pathRoutes.mjs';

const helloUrl = `${baseUrl}/hello`

describe('Hello API Routes', () => {
  it('should get Hello World', async () => {
    const response = await axios.get(helloUrl);
    expect(response.data).to.contain(`Hello World!`);
    
  });
});

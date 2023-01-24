import express from 'express';

const router = express.Router()

let count = 0

router.get('/', (req, res) => {
  res.statusCode = 200
  res.send(`Hello World! ${count++}`)
})

export default router
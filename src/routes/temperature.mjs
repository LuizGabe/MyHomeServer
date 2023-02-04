import { getLatestData, createData, getAll, getById, getLimitData } from "../controllers/temperatureController.mjs";
import express from "express";

const router = express.Router();

router.get('/latest', getLatestData);

router.get('/all', getAll);

router.get('/id/:number', getById);

router.get('/', getLimitData);

router.post('', createData);

export default router
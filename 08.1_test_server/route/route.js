import express from "express";

import getObj from "../model/obj.js";

const router = express.Router();


router.get("/", async (req, res, next) => {
    try {
        const result = await getObj();
        console.log(result)
    res.json(result);
    } catch (error) {
    console.log('erorr router')
    next(error);
  }
});

export default router
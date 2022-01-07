const express = require("express");
const router = express.Router();
const authRouter = require("./auth");
const categoriesRouter = require("./categories");
const operationRouter = require("./operation");

router.use("/auth", authRouter);
router.use("/categories", categoriesRouter);
router.use("/operation", operationRouter);

module.exports = router;

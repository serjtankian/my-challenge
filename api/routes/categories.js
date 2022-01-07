const express = require("express");
const router = express.Router();
const { Categories, Operation } = require("../models");

router.get("/", (req, res, next) => {
  Categories.findAll({
    include: {
      model: Operation,
      attributes: ["concept", "amount", "type"],
    },
  })
    .then((category) => {
      res.status(200).send(category);
    })
    .catch(next);
});
router.get("/:id", (req, res, next) => {
  Categories.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      model: Operation,
      attributes: ["concept", "amount", "type"],
    },
    attributes: ["id", "name"],
  })
    .then((oneCategory) => {
      console.log(oneCategory);
      res.status(200).send(oneCategory);
    })
    .catch(next);
});

module.exports = router;

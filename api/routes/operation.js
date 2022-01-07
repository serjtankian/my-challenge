const express = require("express");
const router = express.Router();
const { Operation, Categories } = require("../models");
const { destroy } = require("../models/operation");

router.get("/", (req, res, next) => {
  Operation.findAll({
    include: {
      model: Categories,
      attributes: ["id", "name"],
    },
  })
    .then((allOp) => {
      res.status(200).send(allOp);
    })
    .catch(next);
});

router.get("/:id", (req, res, next) => {
  Operation.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((oneOp) => {
      res.send(oneOp).status(200);
    })
    .catch(next);
});

router.post("/new", (req, res, next) => {
  const { concept, amount, type } = req.body;
  Operation.create({ concept, amount, type })
    .then((op) => {
      Categories.findOrCreate({
        where: {
          name: req.body.categories,
        },
      }).then((category) => {
        console.log("esta es la categoria", category);
        op.setCategory(category[0]);
        res.send(op).status(201);
      });
    })
    .catch((error) => console.log(error));
});

router.delete("/:id", (req, res, next) => {
  Operation.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.send(`id ${req.params.id} deleted`).status(202);
    })
    .catch(next);
});

router.put("/edit/:id", (req, res, next) => {
  Operation.update(req.body, {
    where: {
      id: req.params.id,
    },
    returning: true,
  }).then(([n, opUpdated]) => {
    Categories.findOrCreate({
      where: {
        name: req.body.categories,
      },
    })
      .then((category) => {
        opUpdated[0].getCategory();
        opUpdated[0].setCategory(category[0]);
        console.log("este es el objeto", opUpdated[0]);
        res.send(opUpdated[0]);
      })
      .catch(next);
  });
});

module.exports = router;

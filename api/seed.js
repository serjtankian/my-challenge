const { Operation, Categories } = require("./models");

const op = [
  {
    concept: "one",
    amount: 10,
    type: "ingreso",
    categories: "financial service",
  },
  {
    concept: "two",
    amount: 100,
    type: "ingreso",
    categories: "financial service",
  },
  {
    concept: "three",
    amount: 200,
    type: "ingreso",
    categories: "financial service",
  },
  {
    concept: "four",
    amount: 300,
    type: "ingreso",
    categories: "lost",
  },
  {
    concept: "five",
    amount: 44,
    type: "egreso",
    categories: "financial service",
  },
  {
    concept: "six",
    amount: 660,
    type: "egreso",
    categories: "digital service",
  },
  {
    concept: "seven",
    amount: 500,
    type: "egreso",
    categories: "tax",
  },
  {
    concept: "eight",
    amount: 2020,
    type: "ingreso",
    categories: "lost",
  },
  {
    concept: "nine",
    amount: 33,
    type: "ingreso",
    categories: "digital service",
  },
  {
    concept: "ten",
    amount: 176,
    type: "ingreso",
    categories: "digital service",
  },
  {
    concept: "eleven",
    amount: 369,
    type: "egreso",
    categories: "tax",
  },
  {
    concept: "fourteen",
    amount: 7,
    type: "egreso",
    categories: "tax",
  },
  {
    concept: "twelve",
    amount: 400,
    type: "ingreso",
    categories: "tax",
  },
  {
    concept: "thirteen",
    amount: 633,
    type: "ingreso",
    categories: "tax",
  },
  {
    concept: "fiveteen",
    amount: 444,
    type: "ingreso",
    categories: "tax",
  },
  {
    concept: "sixteen",
    amount: 900,
    type: "ingreso",
    categories: "pending",
  },
  {
    concept: "nineteen",
    amount: 1500,
    type: "egreso",
    categories: "pending",
  },
  {
    concept: "twenty",
    amount: 333,
    type: "egreso",
    categories: "lost",
  },
  {
    concept: "twenty one",
    amount: 880,
    type: "ingreso",
    categories: "digital service",
  },
  {
    concept: "twenty two",
    amount: 456,
    type: "egreso",
    categories: "tax",
  },
  {
    concept: "twenty three",
    amount: 695,
    type: "ingreso",
    categories: "digital service",
  },
];

let categories = [
  "financial service",
  "digital service",
  "tax",
  "pending",
  "lost",
];

categories.forEach((category) => {
  Categories.create({ name: category });
});

op.forEach(async (operation) => {
  let { concept, amount, type, categories } = operation;

  Operation.create({ concept, amount, type })
    .then((op) => {
      Categories.findOne({
        where: {
          name: categories,
        },
      }).then((cate) => {
        op.setCategory(cate);
      });
    })
    .catch((error) => console.log(error));
});

const { Operation, Categories } = require("./models");

const op = [
  {
    concept: "one",
    amount: 10,
    type: "input",
    categories: "financial service",
  },
  {
    concept: "two",
    amount: 100,
    type: "input",
    categories: "financial service",
  },
  {
    concept: "three",
    amount: 200,
    type: "input",
    categories: "financial service",
  },
  {
    concept: "four",
    amount: 300,
    type: "input",
    categories: "lost",
  },
  {
    concept: "five",
    amount: 44,
    type: "output",
    categories: "financial service",
  },
  {
    concept: "six",
    amount: 660,
    type: "output",
    categories: "digital service",
  },
  {
    concept: "seven",
    amount: 500,
    type: "output",
    categories: "tax",
  },
  {
    concept: "eight",
    amount: 2020,
    type: "input",
    categories: "lost",
  },
  {
    concept: "nine",
    amount: 33,
    type: "input",
    categories: "digital service",
  },
  {
    concept: "ten",
    amount: 176,
    type: "input",
    categories: "digital service",
  },
  {
    concept: "eleven",
    amount: 369,
    type: "output",
    categories: "tax",
  },
  {
    concept: "fourteen",
    amount: 7,
    type: "output",
    categories: "tax",
  },
  {
    concept: "twelve",
    amount: 400,
    type: "input",
    categories: "tax",
  },
  {
    concept: "thirteen",
    amount: 633,
    type: "input",
    categories: "tax",
  },
  {
    concept: "fiveteen",
    amount: 444,
    type: "input",
    categories: "tax",
  },
  {
    concept: "sixteen",
    amount: 900,
    type: "input",
    categories: "pending",
  },
  {
    concept: "nineteen",
    amount: 1500,
    type: "output",
    categories: "pending",
  },
  {
    concept: "twenty",
    amount: 333,
    type: "output",
    categories: "lost",
  },
  {
    concept: "twenty one",
    amount: 880,
    type: "input",
    categories: "digital service",
  },
  {
    concept: "twenty two",
    amount: 456,
    type: "output",
    categories: "tax",
  },
  {
    concept: "twenty three",
    amount: 695,
    type: "input",
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

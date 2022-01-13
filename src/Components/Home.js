import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";

function Home() {
  // el home hara un axios y tomara el array operation sumando el amount.

  const [amount, setamount] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/operation/").then((op) => {
      return setamount(op.data);
    });
  }, []);

  const resultInput = amount
    .filter((element) => element.type === "ingreso")
    .reduce((acum, element) => acum + element.amount, 0);
  const resultOutput = amount
    .filter((element) => element.type === "egreso")
    .reduce((acum, element) => acum + element.amount, 0);

  const lastTen = amount
    .sort((a, b) => a.id - b.id)
    .reverse()
    .slice(0, 10);
  console.log("ingreso", resultInput);
  console.log("egreso", resultOutput);
  console.log("ultimos 10", lastTen);

  return (
    <div>
      <h1> ingreso:{resultInput} </h1>
      <h1> egreso:{resultOutput} </h1>
      <section>
        <ul>
          <li>
            {lastTen.map((element) => {
              return (
                <div>
                  {element.concept} <br></br>
                  {element.amount}
                  <br></br>
                  {element.type}
                  <br></br>
                  {element.category.name}
                </div>
              );
            })}
          </li>
        </ul>
      </section>
    </div>
  );
}

export default Home;

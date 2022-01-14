import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";

import "../index.css";

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
    <div className="table">
      <section>
        <TableContainer id="aparte2">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Ingreso</TableCell>
                <TableCell>Egreso</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <h1>$ {resultInput}</h1>
                </TableCell>
                <TableCell>
                  <h1>$ {resultOutput}</h1>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </section>{" "}
      <br></br>
      <section>
        {/*  <h1>Ultimos 10 registros de operaciones</h1> */}
        <TableContainer id="aparte">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>
                    <h1>Concept</h1>
                  </strong>
                </TableCell>
                <TableCell>
                  <strong>
                    <h1> Amount</h1>
                  </strong>
                </TableCell>
                <TableCell>
                  <strong>
                    <h1> Type</h1>
                  </strong>
                </TableCell>
                <TableCell>
                  <strong>
                    <h1>Category</h1>
                  </strong>{" "}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lastTen.map((cell) => {
                return (
                  <TableRow key={cell.id}>
                    <TableCell>{cell.concept}</TableCell>
                    <TableCell>{cell.amount}</TableCell>
                    <TableCell>{cell.type}</TableCell>
                    <TableCell>{cell.category.name}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </section>
    </div>
  );
}

export default Home;

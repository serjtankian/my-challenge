import React from "react";
/* import { useState, useEffect } from "react";
import Axios from "axios"; */
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
  const list = localStorage.getItem("list");
  const amount = JSON.parse(list);

  const resultInput = amount
    .filter((element) => element.type === "input")
    .reduce((acum, element) => acum + element.amount, 0);
  const resultOutput = amount
    .filter((element) => element.type === "output")
    .reduce((acum, element) => acum + element.amount, 0);
  const totalResult = resultInput - resultOutput;

  //Tomo los ultimos 10 de la lista
  const lastTen = amount
    .sort((a, b) => a.id - b.id)
    .reverse()
    .slice(0, 10);

  console.table(lastTen);

  return (
    <div className="table">
      <section>
        <TableContainer id="aparte2">
          <h1>Current balance</h1>
          <hr></hr>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Input</TableCell>
                <TableCell>Output</TableCell>
                <TableCell>Total</TableCell>
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
                <TableCell>
                  {resultInput < resultOutput ? (
                    <h1 style={{ color: "red" }}>$ {totalResult}</h1>
                  ) : (
                    <h1>$ {totalResult}</h1>
                  )}
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
          <h1>Last 10 operations</h1>
          <hr></hr>
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
                <TableCell>
                  <strong>
                    <h1>CreateAt</h1>
                  </strong>
                </TableCell>
                <TableCell>
                  <strong>
                    <h1>UpdateAt</h1>
                  </strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lastTen.map((cell) => {
                return (
                  <TableRow key={cell.id}>
                    <TableCell>{cell.concept}</TableCell>
                    <TableCell>$ {cell.amount}</TableCell>
                    <TableCell>{cell.type}</TableCell>
                    <TableCell>{cell.category.name}</TableCell>
                    <TableCell>{cell.createdAt}</TableCell>
                    <TableCell>{cell.updatedAt}</TableCell>
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

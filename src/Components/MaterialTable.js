import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { IconButton, Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
    border: "2px solid #ffca28 ",
    backgroundColor: "#43e9fd",
  },
}));

function MaterialTable({ dataFilter, itemSelected }) {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="medium" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Concept</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">CreateAt</TableCell>
            <TableCell align="right">UpdateAt</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataFilter.map((row, i) => {
            return (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.concept}
                </TableCell>
                <TableCell align="right">{row.amount}</TableCell>
                <TableCell align="right">{row.type}</TableCell>
                <TableCell align="right">{row.category.name}</TableCell>
                <TableCell align="right">{row.createdAt}</TableCell>
                <TableCell align="right">{row.updatedAt}</TableCell>
                <TableCell align="right">
                  <Tooltip
                    title="Edit"
                    size="medium"
                    onClick={() => itemSelected(row, "Edit")}
                  >
                    <IconButton aria-label="edit">
                      <EditIcon color="primary" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip
                    title="Delete"
                    onClick={() => itemSelected(row, "Delete")}
                  >
                    <IconButton aria-label="delete">
                      <DeleteIcon color="secondary" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default MaterialTable;

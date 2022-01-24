import React from "react";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { FormControl, Tooltip } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import "../index.css";
import axios from "axios";
import { Modal, TextField, Button } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  modal: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "10%",
    left: "35%",
    transform: "traslate(-50%,-50%)",
  },
  icon: {
    cursor: "pointer",
  },
  inputMaterial: {
    width: "100%",
  },
}));

const baseUrl = "http://localhost:3001/api/operation/";

function OperationForm() {
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [insertModal, setInsertModal] = useState(false);
  const [operationPost, setOperationPost] = useState({
    concept: "",
    amount: "",
    type: "",
    categories: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOperationPost({ ...operationPost, [name]: value });
  };
  console.log(operationPost);

  const getApi = async () => {
    await axios.get(baseUrl).then((response) => {
      setData(response.data);
    });
  };

  const postApi = async () => {
    await axios.post(baseUrl + "new", operationPost).then((response) => {
      console.log(response.data);
      openCloseModal();
    });
  };

  const openCloseModal = () => {
    setInsertModal(!insertModal);
  };

  useEffect(() => {
    getApi();
  }, []);

  const bodyInsert = (
    <div className={classes.modal}>
      <h1>Add new operation</h1>
      <FormControl>
        <TextField
          className={classes.inputMaterial}
          label="Concept"
          name="concept"
          onChange={handleChange}
        />
        <TextField
          className={classes.inputMaterial}
          label="Amount"
          name="amount"
          type="number"
          onChange={handleChange}
        />
        <TextField
          id="select"
          className={classes.inputMaterial}
          label="Type"
          name="type"
          defaultValue="none"
          onChange={handleChange}
          select
        >
          <MenuItem value="ingreso">ingreso</MenuItem>
          <MenuItem value="egreso">egreso</MenuItem>
        </TextField>

        <TextField
          id="select"
          className={classes.inputMaterial}
          label="Categories"
          name="categories"
          onChange={handleChange}
          defaultValue="none"
          select
        >
          <MenuItem value="tax">tax</MenuItem>
          <MenuItem value="digital service">digital service</MenuItem>
          <MenuItem value="pending">pending</MenuItem>
          <MenuItem value="financial service">financial service</MenuItem>
          <MenuItem value="lost">lost</MenuItem>
        </TextField>
      </FormControl>
      <br />
      <br />
      <div align="right">
        <Button color="primary" onClick={() => postApi()}>
          Insert
        </Button>
        <Button onClick={() => openCloseModal()}>Cancell</Button>
      </div>
    </div>
  );

  return (
    <div>
      <h1>ABM Operations List</h1>
      <br />
      <Button variant="contained" onClick={() => openCloseModal()}>
        Insert Operation
      </Button>
      <br />
      <br />
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="medium"
          aria-label="a dense table"
        >
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
            {data &&
              data.map((row, i) => {
                return (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.concept}
                    </TableCell>
                    <TableCell align="right">{row.amount}</TableCell>
                    <TableCell align="right">{row.type}</TableCell>
                    <TableCell align="right">{row.category.name}</TableCell>
                    <TableCell align="right">{row.amount}</TableCell>
                    <TableCell align="right">{row.amount}</TableCell>
                    <TableCell align="right">
                      <Tooltip title="Edit" size="medium">
                        <IconButton aria-label="edit">
                          <EditIcon color="primary" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete" size="medium">
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
      <Modal open={insertModal} onClose={openCloseModal}>
        {bodyInsert}
      </Modal>
    </div>
  );
}

export default OperationForm;

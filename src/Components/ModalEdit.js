import React from "react";
import { TextField, FormControl, MenuItem, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
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

function ModalEdit({ putApi, selected, handleChangeEdit, openCloseModaEdit }) {
  const classes = useStyles();
  return (
    <div className={classes.modal}>
      <h1>Edit operation</h1>
      <FormControl>
        <TextField
          className={classes.inputMaterial}
          label="Concept"
          name="concept"
          onChange={handleChangeEdit}
          defaultValue={selected && selected.concept}
        />
        <TextField
          className={classes.inputMaterial}
          label="Amount"
          name="amount"
          type="number"
          onChange={handleChangeEdit}
          defaultValue={selected && selected.amount}
        />
        <TextField
          id="select"
          className={classes.inputMaterial}
          label="Type not editable"
          name="type"
          defaultValue={selected.type}
          onChange={handleChangeEdit}
          disabled
          select
        >
          <MenuItem value="input">input</MenuItem>
          <MenuItem value="output">output</MenuItem>
        </TextField>

        <TextField
          id="select"
          className={classes.inputMaterial}
          label="Categories"
          name="categories"
          defaultValue={selected && selected.category.name}
          onChange={handleChangeEdit}
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
        <Button color="primary" onClick={() => putApi()}>
          Edit
        </Button>
        <Button onClick={() => openCloseModaEdit()}>Cancell</Button>
      </div>
    </div>
  );
}

export default ModalEdit;

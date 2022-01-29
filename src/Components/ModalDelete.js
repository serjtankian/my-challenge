import React from "react";
import { Button } from "@material-ui/core";
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
}));

function ModalDelete({ deleteApi, openCloseModaDelete, selected }) {
  const classes = useStyles();
  return (
    <div className={classes.modal}>
      <p>
        Are you sure do you want to delete the operation{" "}
        <b>{selected && selected.concept}</b>?
      </p>
      <div align="right">
        <Button color="secondary" onClick={() => deleteApi()}>
          si
        </Button>
        <Button onClick={() => openCloseModaDelete()}>no</Button>
      </div>
    </div>
  );
}

export default ModalDelete;

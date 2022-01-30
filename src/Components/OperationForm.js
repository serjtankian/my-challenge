import React from "react";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../index.css";
import axios from "axios";
import { Modal, Button, AppBar, Container } from "@material-ui/core";

import Filter from "./Filter";
import ModalEdit from "./ModalEdit";
import ModalDelete from "./ModalDelete";
import Modalpost from "./Modalpost";

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

  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
    padding: theme.spacing(2, 5, 3),
    top: "10%",
    left: "50%",
    alignItems: "center",
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
    minWidth: 200,
  },
  button: {
    padding: theme.spacing(2, 10, 3),
  },
  groupBy: {
    display: "flex",
    padding: theme.spacing(2, 5, 3),
    border: "2px solid #ffca28 ",
  },
}));

const baseUrl = "http://localhost:3001/api/operation/";

function OperationForm() {
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [insertModal, setInsertModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [operationPost, setOperationPost] = useState({
    concept: "",
    amount: "",
    type: "",
    categories: "",
  });

  const [selected, setSelected] = useState({
    concept: "",
    amount: "",
    type: "",
    category: { name: "" },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOperationPost({ ...operationPost, [name]: value });
  };

  const handleChangeEdit = (e) => {
    const { name, value } = e.target;
    setSelected({ ...selected, [name]: value });
  };

  const getApi = async () => {
    await axios.get(baseUrl).then((response) => {
      setData(response.data);
    });
  };

  const postApi = async () => {
    await axios.post(baseUrl + "new", operationPost).then((response) => {
      console.log(response.data);
      openCloseModalPost();
    });
  };
  const putApi = async () => {
    await axios
      .put(baseUrl + "edit/" + selected.id, selected)
      .then((response) => {
        console.log(response.data);
        openCloseModaEdit();
      });
  };

  const deleteApi = async () => {
    await axios.delete(baseUrl + "delete/" + selected.id).then((response) => {
      setData(data.filter((operation) => operation.id !== selected.id));
      openCloseModaDelete();
    });
  };

  const openCloseModalPost = () => {
    setInsertModal(!insertModal);
  };

  const openCloseModaEdit = () => {
    setEditModal(!editModal);
  };
  const openCloseModaDelete = () => {
    setDeleteModal(!deleteModal);
  };

  const operationSelected = (selected, typeCase) => {
    setSelected(selected);
    typeCase === "Edit" ? openCloseModaEdit() : openCloseModaDelete();
  };

  //Guardamos los ultimos 10 objetos en localStorage para reutilizarlos en Home.

  localStorage.setItem("Completelist", JSON.stringify(data));

  useEffect(() => {
    getApi();
  }, []);

  return (
    <Container>
      <h1>ABM Operations List</h1>
      <br />
      <AppBar position="static" className={classes.groupBy}>
        <Button
          className={classes.button}
          variant="contained"
          onClick={() => openCloseModalPost()}
        >
          Insert Operation
        </Button>
      </AppBar>
      <Filter data={data} itemSelected={operationSelected} />

      <Modal open={insertModal} onClose={openCloseModalPost}>
        <Modalpost
          handleChange={handleChange}
          postApi={postApi}
          openCloseModalPost={openCloseModalPost}
        />
      </Modal>
      <Modal open={editModal} onClose={openCloseModaEdit}>
        <ModalEdit
          putApi={putApi}
          selected={selected}
          handleChangeEdit={handleChangeEdit}
          openCloseModaEdit={openCloseModaEdit}
        />
      </Modal>
      <Modal open={deleteModal} onClose={openCloseModaDelete}>
        <ModalDelete
          deleteApi={deleteApi}
          selected={selected}
          openCloseModaDelete={openCloseModaDelete}
        />
      </Modal>
    </Container>
  );
}

export default OperationForm;

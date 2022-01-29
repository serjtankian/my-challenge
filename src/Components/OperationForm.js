import React from "react";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../index.css";
import axios from "axios";
import { Modal, Button } from "@material-ui/core";

import Filter from "./Filter";
import ModalEdit from "./ModalEdit";
import ModalDelete from "./ModalDelete";
import Modalpost from "./Modalpost";
/* 
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
    left: "20%",
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
    minWidth: 200,
  },
})); */

const baseUrl = "http://localhost:3001/api/operation/";

function OperationForm() {
  const [data, setData] = useState([]);
  const [insertModal, setInsertModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  /*  const [filterByCat, setFilterByCat] = useState([]);
  const [filterByType, setFilterByType] = useState([]); */
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

  useEffect(() => {
    getApi();
  }, []);

  return (
    <div>
      <h1>ABM Operations List</h1>
      <br />

      <Button variant="contained" onClick={() => openCloseModalPost()}>
        Insert Operation
      </Button>
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
    </div>
  );
}

export default OperationForm;

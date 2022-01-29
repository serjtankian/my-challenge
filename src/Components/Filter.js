import React from "react";
import { useState } from "react";
import { TextField, FormControl, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "./MaterialTable";

const useStyles = makeStyles((theme) => ({
  formControl: {
    display: "flex",
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
}));

function Filter({ data, itemSelected }) {
  const classes = useStyles();
  const [filterByCat, setFilterByCat] = useState([]);
  const [filterByType, setFilterByType] = useState([]);

  const dataFilter =
    filterByType.type && filterByType.type !== "all"
      ? data.filter((element) => {
          return element.type === filterByType.type;
        })
      : data;

  const dataFilterByCat =
    filterByCat.categories && filterByCat.categories !== "all"
      ? dataFilter.filter((element) => {
          return element.category.name === filterByCat.categories;
        })
      : dataFilter;

  const handleChangeFilter = (e) => {
    const { name, value } = e.target;
    setFilterByType({ ...filterByType, [name]: value });
    setFilterByCat({ ...filterByCat, [name]: value });
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <TextField
          id="select"
          className={classes.selectEmpty}
          label="Filter by Type"
          name="type"
          defaultValue=""
          onChange={handleChangeFilter}
          select
        >
          <MenuItem value="all">all</MenuItem>
          <MenuItem value="ingreso">ingreso</MenuItem>
          <MenuItem value="egreso">egreso</MenuItem>
        </TextField>

        <TextField
          id="select"
          label="Filter by Categories"
          name="categories"
          className={classes.selectEmpty}
          onChange={handleChangeFilter}
          defaultValue=""
          select
        >
          <MenuItem value="all">all</MenuItem>
          <MenuItem value="tax">tax</MenuItem>
          <MenuItem value="digital service">digital service</MenuItem>
          <MenuItem value="pending">pending</MenuItem>
          <MenuItem value="financial service">financial service</MenuItem>
          <MenuItem value="lost">lost</MenuItem>
        </TextField>
      </FormControl>
      <MaterialTable dataFilter={dataFilterByCat} itemSelected={itemSelected} />
    </div>
  );
}

export default Filter;

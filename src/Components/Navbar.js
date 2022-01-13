import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "black",
  },
  navlinks: {
    marginLeft: theme.spacing(10),
    display: "flex",
  },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
    color: "#ffca28",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: theme.spacing(20),
    "&:hover": {
      color: "yellow",
      borderBottom: "1px solid white",
    },
  },
}));

function Navbar() {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.root}>
      <CssBaseline />
      <Toolbar>
        <Typography variant="h4" className={classes.logo}>
          ABM
        </Typography>
        <div className={classes.navlinks}>
          <Link to="/" className={classes.link}>
            Home
          </Link>
          <Link to="/operation_list" className={classes.link}>
            Operations List
          </Link>
          <Link to="/operation_form" className={classes.link}>
            Operations Form
          </Link>
          <Link to="/login" className={classes.link}>
            Login
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;

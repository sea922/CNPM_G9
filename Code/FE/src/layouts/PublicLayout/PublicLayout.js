import React from "react";
import { makeStyles } from "@material-ui/core";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    color: theme.palette.common.white,
    height: "100%",
  },
}));

function PublicLayout(props) {
  const classes = useStyles(props);
  const { children, withFooter = true } = props;
  return (
    <div className={classes.root}>
      <Navbar />
      {children}
      {withFooter && <Footer />}
    </div>
  );
}

export default PublicLayout;

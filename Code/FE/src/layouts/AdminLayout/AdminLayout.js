import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Drawer, withStyles } from "@material-ui/core";

import styles from "./styles";
import classnames from "classnames";
import Topbar from "./components/Topbar/Topbar";
import Sidebar from "./components/Sidebar/Sidebar";
AdminLayout.propTypes = {
  children: PropTypes.node,
  isSidebarOpen: PropTypes.bool,
  title: PropTypes.string,
};
AdminLayout.defaultProps = {
  isSidebarOpen: false,
};
function AdminLayout(props) {
  const [isOpen, setisOpen] = useState(false);
  const { classes, history } = props;
  const handleToggleOpen = () => {
    setisOpen(!isOpen);
  };
  const handleClose = () => {
    setisOpen(false);
  };
  return (
    <Fragment>
      <Topbar
        title={"ABC"}
        ToolbarClasses={classes.topbar}
        isSidebarOpen={isOpen}
        onToggleSidebar={handleToggleOpen}
        history={history}
      />
      <Drawer
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
        open={isOpen}
        onClose={handleClose}
        variant="persistent"
      >
        <Sidebar className={classes.sidebar} />
      </Drawer>
      <main
        className={classnames({
          [classes.contentShift]: isOpen,
          [classes.content]: true,
        })}
      >
        {props.children}
      </main>
    </Fragment>
  );
}

export default withStyles(styles)(AdminLayout);

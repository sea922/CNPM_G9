import { Badge, Button, IconButton, Toolbar } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import InputIcon from "@material-ui/icons/Input";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useEffect } from "react";
import styles from "./styles";
import { connect, useDispatch } from "react-redux";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";

import { NavLink, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { logout } from "../../../../redux/actions/auth";
Topbar.propTypes = {};

function Topbar(props) {
  const {
    classes,
    ToolbarClasses,
    children,
    isSidebarOpen,
    onToggleSidebar,
    history,
    isAuthenticated,
  } = props;
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    changeLanguage("en");
  }, []);
  const handleLogout =()=>{
    if(window.confirm("Logout ?")){
      dispatch(logout())
    }
  }
  useEffect(() => {
    if (!isAuthenticated) {
      return history.push("/");
    }
  }, [isAuthenticated]);
  return (
    <div className={`${classes.root} , ${ToolbarClasses}`}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.brandWrapper}>
          <div className={classes.logo}>G9 Cinema </div>
          <IconButton
            className={classes.menuButton}
            aria-label="Menu"
            onClick={onToggleSidebar}
          >
            {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </div>

        {/* <NavLink className={classes.title} to="/">
          Cinema App
        </NavLink> */}

        {/* <IconButton
          className={classes.notificationsButton}
          onClick={() => console.log("Notification")}
        >
          <Badge badgeContent={4} color="primary" variant="dot">
            <NotificationsIcon />
          </Badge>
        </IconButton> */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div>
            <Button onClick={() => changeLanguage("vi")}>VIE</Button>
            <Button onClick={() => changeLanguage("en")}>ENG</Button>
          </div>
          <IconButton className={classes.signOutButton}>
            <InputIcon onClick={handleLogout} />
          </IconButton>
        </div>
      </Toolbar>
      {children}
    </div>
  );
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.authState.isAuthenticated,
});

export default connect(mapStateToProps, {
  logout,
})(withStyles(styles)(Topbar));

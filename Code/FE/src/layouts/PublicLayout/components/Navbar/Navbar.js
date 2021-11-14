import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../../../redux/actions/auth";
import classnames from "classnames";
import {
  withStyles,
  Typography,
  List,
  ListItem,
  Button,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";

// Component styles
import styles from "./styles";
import UserPopover from "./components/UserPopover/UserPopover";

const Navbar = ({ classes, isAuth, user, logout }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [scrollPos, setScrollPos] = useState(window.pageYOffset);
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    setScrollPos(window.pageYOffset);
  };
  return (
    <Fragment>
      <nav
        className={classnames({
          [classes.navbar]: true,
          [classes.navbarColor]: scrollPos > 30,
        })}
      >
        <Link className={classes.logoLink} to="/">
          <Typography className={classes.logo} variant="h2">
            G9 Cinema 
          </Typography>
        </Link>
        <div className={classes.navLinks}>
          <Link className={classes.navLink} to="/">
            {t("public.navbar.home")}
          </Link>
          <Link className={classes.navLink} to="/movie/category/nowShowing">
            {t("public.navbar.showing")}
          </Link>
          <Link className={classes.navLink} to="/movie/category/comingSoon">
            {t("public.navbar.coming")}
          </Link>
          <Link className={classes.navLink} to="/cinemas">
            {t("public.navbar.cinemas")}
          </Link>
          <Link className={classes.navLink} to="/promotions">
            {t("public.navbar.promotions")}
          </Link>
          <Link className={classes.navLink} to="/contact">
            {t("public.navbar.contact")}
          </Link>
        </div>

        <div className={classes.navAccount}>
          <Button className={classes.btn_language} onClick={() => changeLanguage("vi")}>VIE</Button>
          <Button className={classes.btn_language} onClick={() => changeLanguage("en")}>ENG</Button>
          <UserPopover logout={logout}>
            <List component="nav">
              {user && (
                <ListItem>
                  <Link
                    className={classes.navLink}
                    to={
                      user.role !== "guest"
                        ? "/admin/dashboard"
                        : "/mydashboard"
                    }
                  >
                    {t("public.navbar.dashboard")}
                  </Link>
                </ListItem>
              )}

              {isAuth ? (
                <ListItem>
                  <Link className={classes.navLink} onClick={logout} to="/">
                    {t("public.navbar.logout")}
                  </Link>
                </ListItem>
              ) : (
                <ListItem>
                  <Link className={classes.navLink} to="/login">
                    {t("public.navbar.login")}
                  </Link>
                </ListItem>
              )}
            </List>
          </UserPopover>
        </div>

        <div className={classes.navMobile}>
          <div
            className={classes.navIcon}
            onClick={() => setShowMenu(!showMenu)}
          >
            <div
              className={classnames(
                classes.navIconLine,
                classes.navIconLine__left
              )}
            />
            <div className={classes.navIconLine} />
            <div
              className={classnames(
                classes.navIconLine,
                classes.navIconLine__right
              )}
            />
          </div>
        </div>
      </nav>
      <div
        className={classnames({
          [classes.navActive]: showMenu,
          [classes.nav]: true,
        })}
      >
        <div className={classes.navContent}>
          <div className={classes.currentPageShadow}>Movies</div>
          <ul
            className={classes.innerNav}
            onClick={() => setShowMenu(!showMenu)}
          >
            <li className={classes.innerNavListItem}>
              <Link className={classes.innerNavLink} to="/">
                {t("public.navbar.home")}
              </Link>
            </li>
            <li className={classes.innerNavListItem}>
              <Link
                className={classes.innerNavLink}
                to="/movie/category/nowShowing"
              >
                {t("public.navbar.showing")}
              </Link>
            </li>
            <li className={classes.innerNavListItem}>
              <Link
                className={classes.innerNavLink}
                to="/movie/category/comingSoon"
              >
                {t("public.navbar.coming")}
              </Link>
            </li>
            <li className={classes.innerNavListItem}>
              <Link className={classes.innerNavLink} to="/cinemas">
                {t("public.navbar.cinemas")}
              </Link>
            </li>
            <li className={classes.innerNavListItem}>
              <Link className={classes.innerNavLink} to="/promotions">
                {t("public.navbar.promotions")}
              </Link>
            </li>
            <li className={classes.innerNavListItem}>
              <Link className={classes.innerNavLink} to="/contact">
                {t("public.navbar.contact")}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.authState.isAuthenticated,
  user: state.authState.user,
});

export default connect(mapStateToProps, {
  logout,
})(withStyles(styles)(Navbar));

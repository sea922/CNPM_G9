import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  withStyles,
} from "@material-ui/core";
import AccountBoxIcon from "@material-ui/icons/AccountBoxOutlined";
import DashboardIcon from "@material-ui/icons/DashboardOutlined";
import InfoIcon from "@material-ui/icons/InfoOutlined";
import PeopleIcon from "@material-ui/icons/PeopleOutlined";
import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import styles from "./styles";
Sidebar.propTypes = {};

function Sidebar(props) {
  const { classes } = props;
  const { t } = useTranslation();
  return (
    <section className={classes.root}>
      <List component="div" disablePadding>
        <ListItem
          activeClassName={classes.activeListItem}
          className={classes.listItem}
          component={NavLink}
          to="/admin/dashboard"
        >
          <ListItemIcon className={classes.listItemIcon}>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            //  primary={t("admin.sidebar.dashboard")}
          >
            {t("admin.sidebar.dashboard")}
          </ListItemText>
        </ListItem>
        <ListItem
          activeClassName={classes.activeListItem}
          className={classes.listItem}
          component={NavLink}
          to="/admin/movies"
        >
          <ListItemIcon className={classes.listItemIcon}>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary={t("admin.sidebar.movies")}
          />
        </ListItem>
        <ListItem
          activeClassName={classes.activeListItem}
          className={classes.listItem}
          component={NavLink}
          to="/admin/cinemas"
        >
          <ListItemIcon className={classes.listItemIcon}>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary={t("admin.sidebar.cinemas")}
          />
        </ListItem>
        <ListItem
          activeClassName={classes.activeListItem}
          className={classes.listItem}
          component={NavLink}
          to="/admin/showtimes"
        >
          <ListItemIcon className={classes.listItemIcon}>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary={t("admin.sidebar.showtimes")}
          />
        </ListItem>
        <ListItem
          activeClassName={classes.activeListItem}
          className={classes.listItem}
          component={NavLink}
          to="/admin/promotions"
        >
          <ListItemIcon className={classes.listItemIcon}>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary={t("admin.sidebar.promotions")}
          />
        </ListItem>
        <ListItem
          activeClassName={classes.activeListItem}
          className={classes.listItem}
          component={NavLink}
          to="/admin/contacts"
        >
          <ListItemIcon className={classes.listItemIcon}>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary={t("admin.sidebar.contacts")}
          />
        </ListItem>
        <ListItem
          activeClassName={classes.activeListItem}
          className={classes.listItem}
          component={NavLink}
          to="/admin/reservations"
        >
          <ListItemIcon className={classes.listItemIcon}>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary={t("admin.sidebar.reservations")}
          />
        </ListItem>
        {/* {user && user.role === 'superadmin' && ( */}
        <ListItem
          activeClassName={classes.activeListItem}
          className={classes.listItem}
          component={NavLink}
          to="/admin/users"
        >
          <ListItemIcon className={classes.listItemIcon}>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary={t("admin.sidebar.users")}
          />
        </ListItem>
        {/* )} */}
        <ListItem
          activeClassName={classes.activeListItem}
          className={classes.listItem}
          component={NavLink}
          to="/admin/account"
        >
          <ListItemIcon className={classes.listItemIcon}>
            <AccountBoxIcon />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary={t("admin.sidebar.account")}
          />
        </ListItem>
      </List>
      <Divider className={classes.listDivider} />
    </section>
  );
}

export default withStyles(styles)(Sidebar);

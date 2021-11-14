import React, { Component, Fragment, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core";
import { Button } from "@material-ui/core";
import styles from "./styles";
import ResponsiveDialog from "../../../../../components/ReponsiveDialog/ReponsiveDialog";
import SearchInput from "../../../../../components/SearchInput/SearchInput";
import AddCinema from "../AddCinema/AddCinema";
import { useTranslation } from "react-i18next";



const CinemaToolbar = (props) => {
  const [openAddDialog, setopenAddDialog] = useState(false);
  const { classes, className, search, onChangeSearch } = props;
  const {t} = useTranslation();
  const OpenAddDialog = () => {
    setopenAddDialog(true);
  };

  const CloseAddDialog = () => {
    setopenAddDialog(false);
  };
  const rootClassName = classNames(classes.root, className);

  return (
    <Fragment>
      <div className={rootClassName}>
        <div className={classes.row}>
          <SearchInput
            className={classes.searchInput}
            placeholder={t("admin.cinemas.search")}
            value={search}
            onChange={onChangeSearch}
          />
          <Button
            onClick={() => OpenAddDialog()}
            color="primary"
            size="small"
            variant="outlined"
          >
            {t("admin.cinemas.add")}
          </Button>
        </div>
      </div>
      <ResponsiveDialog
        id="Add-cinema"
        open={openAddDialog}
        handleClose={() => CloseAddDialog()}
      >
       <AddCinema></AddCinema>
      </ResponsiveDialog>
    </Fragment>
  );
};

CinemaToolbar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CinemaToolbar);

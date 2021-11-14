import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Button, withStyles } from "@material-ui/core";
import SearchInput from "../../../../../components/SearchInput/SearchInput";
import styles from "./styles";
import ResponsiveDialog from "../../../../../components/ReponsiveDialog/ReponsiveDialog";
import AddMovie from "../AddMovie/AddMovie";
import { useTranslation } from "react-i18next";
MovieToolbar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

function MovieToolbar(props) {
  const { t } = useTranslation();
  const [openAddDialog, setOpenDialog] = useState(false);
  const { classes, className, search, onChangeSearch } = props;
  const OpenAddDialog = () => {
    setOpenDialog(true);
  };
  const CloseAddDialog = () => {
    setOpenDialog(false);
  };
  return (
    <Fragment>
      <div className={classes.root}>
        <div className={classes.row}>
          <SearchInput
            className={classes.searchInput}
            placeholder={t("admin.movies.search")}
            value={search}
            onChange={onChangeSearch}
          />
          <Button
            onClick={() => OpenAddDialog()}
            color="primary"
            size="small"
            variant="outlined"
          >
            {t("admin.movies.add")}
          </Button>
        </div>
      </div>
      <ResponsiveDialog
        id="Add-movie"
        open={openAddDialog}
        handleClose={() => CloseAddDialog()}
      >
        <AddMovie />
      </ResponsiveDialog>
    </Fragment>
  );
}

export default withStyles(styles)(MovieToolbar);

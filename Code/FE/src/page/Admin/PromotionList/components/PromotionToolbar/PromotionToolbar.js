import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Button, withStyles } from "@material-ui/core";
import styles from "./styles";

import { useTranslation } from "react-i18next";
import SearchInput from "../../../../../components/SearchInput/SearchInput";
import ResponsiveDialog from "../../../../../components/ReponsiveDialog/ReponsiveDialog";
import Addpromotion from "../AddPromotion/Addpromotion";
PromotionToolbar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

function PromotionToolbar(props) {
  const { t } = useTranslation();
  const [openAddDialog, setOpenDialog] = useState(false);
  const { classes, className, search, handleSearch } = props;
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
            placeholder={t("admin.promotion.search")}
            value={search}
            onChange={handleSearch}
          />
          <Button
            onClick={() => OpenAddDialog()}
            color="primary"
            size="small"
            variant="outlined"
          >
            {t("admin.promotion.add")}
          </Button>
        </div>
      </div>
      <ResponsiveDialog
        id="Add-movie"
        open={openAddDialog}
        handleClose={() => CloseAddDialog()}
      >
        <Addpromotion></Addpromotion>
      </ResponsiveDialog>
    </Fragment>
  );
}

export default withStyles(styles)(PromotionToolbar);

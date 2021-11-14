import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, withStyles } from "@material-ui/core";
import ResponsiveDialog from "../../../../../components/ReponsiveDialog/ReponsiveDialog";
import AddShowtime from "../AddShowtime/AddShowtime";
import styles from "./styles";
import { useTranslation } from "react-i18next";
ShowtimeToolbar.propTypes = {};

function ShowtimeToolbar(props) {
  const { classes } = props;
  const [openAddDialog, setopenAddDialog] = useState(false);
  const { t } = useTranslation();
  const OpenAddDialog = () => {
    setopenAddDialog(true);
  };

  const CloseAddDialog = () => {
    setopenAddDialog(false);
  };
  return (
    <div>
      <div className={classes.row}>
        <div>
          <Button
            onClick={OpenAddDialog}
            color="primary"
            size="small"
            variant="outlined"
          >
            {t("admin.showtimes.add")}
          </Button>
        </div>
        <ResponsiveDialog
          id="Add-cinema"
          open={openAddDialog}
          handleClose={() => CloseAddDialog()}
        >
          <AddShowtime></AddShowtime>
        </ResponsiveDialog>
      </div>
    </div>
  );
}

export default withStyles(styles)(ShowtimeToolbar);

import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function ModalRequiredLogin(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { open, handleClose } = props;
  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation();
  const params = useParams();
  const handleRedirect = () => {
    history.push("/login", {
      from: {
        pathname: location.pathname.replace("movie", "movie/booking"),
      },
    });
    handleClose();
  };
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {t("moviedetail.requiredLogin")}
        </DialogTitle>

        <DialogActions
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <Button autoFocus onClick={handleRedirect}>
            {t("moviedetail.accept")}
          </Button>
          <Button onClick={handleClose} autoFocus>
            {t("moviedetail.cancel")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

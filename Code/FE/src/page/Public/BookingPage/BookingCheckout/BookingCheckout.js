import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Box, Grid, Typography, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import Payment from "../Payment/Payment";
import { SET_PROMOTION } from "../../../../redux/types/checkout";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  bannerTitle: {
    fontSize: theme.spacing(1.4),
    textTransform: "uppercase",
    color: "rgb(93, 93, 97)",
    marginBottom: theme.spacing(1),
  },
  bannerContent: {
    fontSize: theme.spacing(2),
    textTransform: "capitalize",
    color: theme.palette.common.white,
  },
  [theme.breakpoints.down("sm")]: {
    hideOnSmall: {
      display: "none",
    },
  },
}));

export default function BookingCheckout(props) {
  const { t } = useTranslation();
  const classes = useStyles(props);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authState.user);
  const selectedSeats = useSelector(
    (state) => state.checkoutState.selectedSeats
  );
  const { ticketPrice } = useSelector(
    (state) => state.checkoutState.selectedCinema
  );
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    dispatch({ type: SET_PROMOTION, payload: [] });
  };
  return (
    <>
      <Payment open={open} handleClose={handleClose}></Payment>
      <Box marginTop={2} bgcolor="rgb(18, 20, 24)">
        <Grid container>
          <Grid item xs={8} md={10}>
            <Grid container spacing={3} style={{ padding: 20 }}>
              {user && user.name && (
                <Grid item className={classes.hideOnSmall}>
                  <Typography className={classes.bannerTitle}>
                    {t("booking.name")}
                  </Typography>
                  <Typography className={classes.bannerContent}>
                    {user.name}
                  </Typography>
                </Grid>
              )}
              <Grid item>
                <Typography className={classes.bannerTitle}>
                  {t("booking.tickets")}
                </Typography>
                {selectedSeats.length > 0 ? (
                  <Typography className={classes.bannerContent}>
                    {selectedSeats.length} 
                  </Typography>
                ) : (
                  <Typography className={classes.bannerContent}>0</Typography>
                )}
              </Grid>
              <Grid item>
                <Typography className={classes.bannerTitle}>
                  {t("booking.price")}
                </Typography>
                <Typography className={classes.bannerContent}>
                  {ticketPrice * selectedSeats.length} &euro;
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={4}
            md={2}
            style={{
              color: "rgb(120, 205, 4)",
              background: "black",
              display: "flex",
            }}
          >
            <Button
              color="inherit"
              fullWidth
              disabled={selectedSeats.length == 0}
              //onClick={() => onBookSeats()}
              onClick={handleOpen}
            >
              {t("booking.payment")}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

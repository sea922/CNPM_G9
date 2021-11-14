import { Button, Grid, TextField, Typography } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Modal from "@material-ui/core/Modal";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Find_promotion,
  Make_reservation,
  showInvitationForm,
  mailConfirm,
} from "../../../../redux/actions/checkout";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "50%",
    [theme.breakpoints.down("sm")]:{
      width: "100%"
    }
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

function Payment(props) {
  const { t } = useTranslation();
  const classes = useStyles();
  const { open, handleClose } = props;
  const dispatch = useDispatch();
  const selectedCinema = useSelector(
    (state) => state.checkoutState.selectedCinema
  );
  const selectedSeats = useSelector(
    (state) => state.checkoutState.selectedSeats
  );
  const { ticketPrice } = useSelector(
    (state) => state.checkoutState.selectedCinema
  );
  const params = useParams();
  const selectedTime = useSelector((state) => state.checkoutState.selectedTime);
  const selectedDate = useSelector((state) => state.checkoutState.selectedDate);
  const currentReservation = useSelector(
    (state) => state.checkoutState.currentReservation
  );
  const userId = useSelector((state) => state.authState.user._id);
  const promotion = useSelector((state) => state.checkoutState.promotion);
  const [value, setValue] = React.useState("counter");
  const [promotionCode, setPromotionCode] = useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleChangeCode = (event) => {
    setPromotionCode(event.target.value);
  };
  const checkCode = () => {
    dispatch(
      Find_promotion({ code: promotionCode, cinemaId: selectedCinema._id })
    );
  };
  const confirm = () => {
    let total = promotion.length
      ? (
          selectedSeats.length *
          ticketPrice *
          (1 - promotion[0].discount / 100)
        ).toFixed(2)
      : selectedSeats.length * ticketPrice;
    const reservation = {
      startAt: selectedTime,
      userId: userId,
      movieId: params.id,
      cinemaId: selectedCinema._id,
      paymentMethod: value,
      total: total,
      seats: selectedSeats,
      date: selectedDate,
    };
    dispatch(Make_reservation(reservation, params.id));
   // dispatch(mailConfirm(currentReservation));
    dispatch(showInvitationForm());
    handleClose();
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div className={classes.paper}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  {t("booking.paymentmethod")}
                </FormLabel>
                <RadioGroup
                  aria-label="gender"
                  value={value}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="visa"
                    control={<Radio />}
                    label="VISA"
                  />
                  <FormControlLabel
                    value="momo"
                    control={<Radio />}
                    label="MOMO"
                  />
                  <FormControlLabel
                    value="airpay"
                    control={<Radio />}
                    label="AIRPAY"
                  />
                  <FormControlLabel
                    value="counter"
                    control={<Radio />}
                    label="COUNTER"
                  ></FormControlLabel>
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField
                  fullWidth
                  size="small"
                  id="outlined-error-helper-text"
                  label={t("booking.typecode")}
                  variant="outlined"
                  onChange={handleChangeCode}
                />

                <Button
                  style={{ marginTop: "8px" }}
                  variant="contained"
                  color="primary"
                  onClick={checkCode}
                >
                  {t("booking.check")}
                </Button>
              </FormControl>
              {promotion.length ? (
                <Typography style={{ marginTop: "5px" }}>
                  {t("booking.discount")} : {promotion[0].discount} %
                </Typography>
              ) : (
                <Typography style={{ marginTop: "5px" }}>
                  {t("booking.discount")} : 0%
                </Typography>
              )}
              <Typography style={{ marginTop: "5px" }} variant="h4">
                {t("booking.total")} :{" "}
                {promotion.length
                  ? (
                      selectedSeats.length *
                      ticketPrice *
                      (1 - promotion[0].discount / 100)
                    ).toFixed(2)
                  : selectedSeats.length * ticketPrice}{" "}
                $
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button onClick={confirm} fullWidth variant="contained">
                {t("booking.confirm")}
              </Button>
            </Grid>
          </Grid>
        </div>
      </Modal>
    </div>
  );
}

export default Payment;

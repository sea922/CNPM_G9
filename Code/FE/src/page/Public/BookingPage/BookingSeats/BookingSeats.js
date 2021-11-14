import React, { Fragment, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Box, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedSeats } from "../../../../redux/actions/checkout";
import { useTranslation } from "react-i18next";
const useStyles = makeStyles((theme) => ({
  row: {
    display: "flex",
    justifyContent: "center",
    flexWrap:"wrap",
    width: "100%",
  },
  box: {
    width: "100%",
  },
  button_seat:{
    [theme.breakpoints.down('sm')]:{
      padding: "0px !important"
    }
  },
  seat: {
    cursor: "pointer",
    color: "rgba(255,255,255,0.7)",
    borderRadius: 2,
    
    margin: theme.spacing(0.5),
    fontWeight: 600,
    "&:hover": {
      background: "rgb(120, 205, 4)",
    },
    [theme.breakpoints.down('sm')]:{
      padding: "3px 8px !important",
      width:"auto",
      minWidth: "auto",
      margin: "2px !important",
    }
  },
  seatInfoContainer: {
    width: "50%",
    margin: "auto",
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    color: "#eee",
  },

  seatInfo: { marginRight: theme.spacing(2) },

  seatInfoLabel: {
    marginRight: theme.spacing(1),
    display: "inline-block",
    width: 10,
    height: 10,
  },

  [theme.breakpoints.down("sm")]: {
    seat: { padding: theme.spacing(1.2), margin: theme.spacing(0.5) },
    seatInfoContainer: { width: "100%", display: "block" },
    seatInfo: { marginTop: theme.spacing(2) },
  },
}));

export default function BookingSeats(props) {
  const { t } = useTranslation();
  const classes = useStyles(props);
  const [seats, setSeats] = useState([]);
  // const { seats, onSelectSeat } = props;
  const dispatch = useDispatch();
  const selectedCinema = useSelector(
    (state) => state.checkoutState.selectedCinema
  );

  const reservations = useSelector((state) => state.checkoutState.reservations);
  useEffect(() => {
    if (selectedCinema) {
      let seatsCinema = JSON.stringify(selectedCinema.seats);
      seatsCinema = JSON.parse(seatsCinema); // tranh tham thieu tren redux
      if (reservations.length) {
        for (let i = 0; i < reservations.length; i++) {
          const seatsReservation = reservations[i].seats;
          for (let j = 0; j < seatsReservation.length; j++) {
            let row = seatsReservation[j][0];
            let column = seatsReservation[j][1];
            seatsCinema[row][column] = 1;
            //  console.log(row,column)
          }
        }
      }
      // console.log(seatsCinema);
      setSeats(seatsCinema);
    }
  }, [reservations]);
  useEffect(() => {
    let temp = [];
    if (seats.length) {
      for (let i = 0; i < seats.length; i++) {
        for (let j = 0; j < seats[i].length; j++) {
          if (seats[i][j] == 2) {
            let seat = [i, j];
            temp.push(seat);
          }
        }
      }
      dispatch(setSelectedSeats(temp));
    }
  }, [seats]);
  useEffect(() => {
    return () => {
      dispatch(setSelectedSeats([]));
    };
  }, []);
  const onSelectSeat = (row, column) => {
    const temp = [...seats];

    if (temp[row][column] == 0) {
      temp[row][column] = 2;
    } else {
      temp[row][column] = 0;
    }
    setSeats(temp);
  };
  return (
    <Fragment>
      <Box  className={classes.box} pt={8}>
        {seats.length > 0 &&
          seats.map((seatRows, indexRow) => (
            <div key={indexRow} className={classes.row}>
              {seatRows.map((seat, index) => (
                <Button
                  disabled={seat == 1}
                  key={`seat-${index}`}
                  onClick={() => onSelectSeat(indexRow, index)}
                  className={classes.seat}
                  //   bgcolor={
                  //     seat === 1
                  //       ? "rgb(65, 66, 70)"
                  //       : seat === 2
                  //       ? "rgb(120, 205, 4)"
                  //       : seat === 3
                  //       ? "rgb(14, 151, 218)"
                  //       : "rgb(96, 93, 169)"
                  //   }
                  style={
                    seat == 1
                      ? { background: "rgb(65, 66, 70)" }
                      : seat == 2
                      ? { background: "rgb(120, 205, 4)" }
                      : { background: "rgb(96, 93, 169)" }
                  }
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          ))}
      </Box>
      <Box width={1} mt={10}>
        <div className={classes.seatInfoContainer}>
          <div className={classes.seatInfo}>
            <div
              className={classes.seatInfoLabel}
              style={{ background: "rgb(96, 93, 169)" }}
            ></div>
            {t("booking.seatsAvailable")}
          </div>
          <div className={classes.seatInfo}>
            <div
              className={classes.seatInfoLabel}
              style={{ background: "rgb(65, 66, 70)" }}
            ></div>
            {t("booking.reservedSeats")}
          </div>
          <div className={classes.seatInfo}>
            <div
              className={classes.seatInfoLabel}
              style={{ background: "rgb(120, 205, 4)" }}
            ></div>
            {t("booking.selectedSeats")}
          </div>
        </div>
      </Box>
    </Fragment>
  );
}

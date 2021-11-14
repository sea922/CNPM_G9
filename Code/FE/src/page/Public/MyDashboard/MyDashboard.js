import React, { useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles, Grid, Typography, Container } from "@material-ui/core";
import { getMyReservations } from "../../../redux/actions/reservation";
import ReservationTable from "./components/MyReservationTable";
import Account from "../../Admin/Account/Account";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: "3rem",
    lineHeight: "3rem",
    textAlign: "center",
    textTransform: "capitalize",
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(3),
  },
  [theme.breakpoints.down("sm")]: {
    fullWidth: { width: "100%" },
  },
}));

function MyDashboard(props) {
  const { t, i18n } = useTranslation();
  const { user, reservations } = props;
  const classes = useStyles(props);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyReservations(user._id));
  }, [reservations.length]);
  return (
    <Container>
      <Grid container spacing={2}>
        {!!reservations.length && (
          <>
            <Grid item xs={12}>
              <Typography
                className={classes.title}
                variant="h2"
                color="inherit"
              >
                {t("dashboard.reservations")}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <ReservationTable reservations={reservations} />
            </Grid>
          </>
        )}
        <Grid item xs={12}>
          <Typography className={classes.title} variant="h2" color="inherit">
            {t("dashboard.account")}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Account />
        </Grid>
      </Grid>
    </Container>
  );
}

const mapStateToProps = ({ authState, reservationState }) => ({
  user: authState.user,
  reservations: reservationState.myReservations,
});
export default connect(mapStateToProps)(MyDashboard);

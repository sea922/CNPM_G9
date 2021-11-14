import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Get_checkin_reservation, Get_uncheck_reservation } from "../../../redux/actions/reservation";
import ReservationTable from "./ReservationTable/ReservationTable";
import { useTranslation } from "react-i18next";

Reservation.propTypes = {};

function Reservation(props) {
  const reservationUncheck = useSelector(
    (state) => state.reservationState.reservationUncheck
  );
  const reservationChecked = useSelector(
    (state) => state.reservationState.reservationChecked
  );
  const dispatch = useDispatch();
  const {t}= useTranslation();
  useEffect(() => {
    dispatch(Get_uncheck_reservation());
    dispatch(Get_checkin_reservation())
  }, []);
  return (
    <div>
      <div style={{ marginTop: "10px" }}>
        <ReservationTable title={t("admin.reservation.listuncheck")} reservations={reservationUncheck}></ReservationTable>
      </div>
      <div style={{ marginTop: "30px" }}>
        <ReservationTable title={t("admin.reservation.listchecked")} reservations={reservationChecked}></ReservationTable>
      </div>
    </div>
  );
}

export default Reservation;

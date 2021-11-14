import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import MaterialTable from "material-table";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import CloseIcon from "@material-ui/icons/Close";
import PaymentIcon from "@material-ui/icons/Payment";
import DeleteIcon from "@material-ui/icons/Delete";
import moment from "moment";
import {
  Change_status_reservation,
  Checkin_reservation,
  Delete_reservation,
} from "../../../../redux/actions/reservation";
function ReservationTable(props) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { reservations, title } = props;
  const handleData = () => {
    if (reservations.length) {
      let temp = reservations.map((reservation, index) => {
        return {
          ...reservation,
          username: reservation.userId.username,
          moviename: reservation.movieId.title,
          cinemaname: reservation.cinemaId.name,
          status: reservation.status,
          date: moment(reservation.date).format("DD-MM-YYYY"),
          seats: JSON.stringify(reservation.seats),
        };
      });
      return temp;
    }
  };
  return (
    <div>
      <MaterialTable
        title={title}
        columns={[
          {
            title: `${t("admin.reservation.name")}`,
            field: "username",
          },
          {
            title: `${t("admin.reservation.movie")}`,
            field: "moviename",
          },
          {
            title: `${t("admin.reservation.cinema")}`,
            field: "cinemaname",
          },
          {
            title: `${t("admin.reservation.status")}`,
            field: "status",
          },
          {
            title: `${t("admin.reservation.paymentmethod")}`,
            field: "paymentMethod",
          },
          {
            title: `${t("admin.reservation.date")}`,
            field: "date",
          },
          {
            title: `${t("admin.reservation.time")}`,
            field: "startAt",
          },
          {
            title: `${t("admin.reservation.total")}`,
            field: "total",
          },
          {
            title: `${t("admin.reservation.seats")}`,
            field: "seats",
          },
        ]}
        data={handleData()}
        actions={[
          (rowData) => ({
            icon: () => {
              if (rowData.checkin)
                return (
                  <DoneOutlineIcon style={{ color: "green" }}></DoneOutlineIcon>
                );
              else return <CloseIcon style={{ color: "red" }}></CloseIcon>;
            },
            tooltip: "Checkin",
            onClick: (e, rowData) => {
              if (window.confirm(`${t("admin.reservation.confirmCheckin")}`)) {
                dispatch(Checkin_reservation(rowData._id));
              }
            },
          }),
          (rowData) => ({
            icon: () => {
              if (rowData.status == "paid")
                return <PaymentIcon style={{ color: "green" }}></PaymentIcon>;
              else return <PaymentIcon style={{ color: "red" }}></PaymentIcon>;
            },
            tooltip: "Pay",
            onClick: (e, rowData) => {
              if (window.confirm(`${t("admin.reservation.confirmPay")}`)) {
                dispatch(Change_status_reservation(rowData._id));
              }
            },
          }),
          (rowData) => ({
            icon: () => {
              return <DeleteIcon style={{ color: "red" }}></DeleteIcon>;
            },
            tooltip: "Delete",
            onClick: (e, rowData) => {
              if (window.confirm(`${t("admin.reservation.confirmDelete")}`)) {
                dispatch(Delete_reservation(rowData._id));
              }
            },
          }),
        ]}
        options={{
          actionsColumnIndex: -1,
          search: true,
        }}
      ></MaterialTable>
    
    
    </div>
  );
}

export default ReservationTable;

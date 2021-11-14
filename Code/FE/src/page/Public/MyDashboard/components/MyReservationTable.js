import { withStyles } from "@material-ui/core";
import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Portlet from "../../../../components/Portlet/Portlet";
import PortletContent from "../../../../components/PortletContent/PortletContent";
import styles from "./styles";
import moment from "moment";
import MaterialTable from "material-table";
const ReservationsTable = ({ classes, className, reservations }) => {
  const { t, i18n } = useTranslation();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const handleChangePage = (event, page) => {
    setPage(page);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
  };
  const rootClassName = classNames(classes.root, className);
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
    <Portlet className={rootClassName}>
      <PortletContent noPadding>
        <MaterialTable
          title={"My reservations"}
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
          options={{
            actionsColumnIndex: -1,
            search: true,
          }}
        ></MaterialTable>
      </PortletContent>
    </Portlet>
  );
};
ReservationsTable.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  reservations: PropTypes.array.isRequired,
};

ReservationsTable.defaultProps = {
  reservations: [],
};

export default withStyles(styles)(ReservationsTable);

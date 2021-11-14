import React, { useEffect } from "react";
import PropTypes from "prop-types";
import MaterialTable from "material-table";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useTranslation } from "react-i18next";
import {
  deleteShowtime,
  getShowtimes,
  onSelectShowtime,
} from "../../../../../redux/actions/showtime";
import EditIcon from "@material-ui/icons/Edit";
ShowtimeTable.propTypes = {};

function ShowtimeTable(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const showtimes = useSelector((state) => state.showtimeState.showtimes);
  const handleData = () => {
    if (showtimes.length) {
      let temp = showtimes.map((showtime) => {
        return {
          ...showtime,
          movie: showtime.movieId.title,
          cinema: showtime.cinemaId.name,
          startTime: moment(showtime.startDate).format("DD-MM-YYYY"),
          endTime: moment(showtime.endDate).format("DD-MM-YYYY"),
        };
      });
      return temp;
    } else return [];
  };
  useEffect(() => {
    dispatch(getShowtimes());
  }, []);
  return (
    <div>
      <MaterialTable
        title={t("admin.showtimes.tableName")}
        columns={[
          { title: t("admin.showtimes.time"), field: "startAt" },
          { title: t("admin.showtimes.movie"), field: "movie" },
          { title: t("admin.showtimes.cinema"), field: "cinema" },
          {
            title: t("admin.showtimes.startDate"),
            field: "startTime",
          },
          {
            title: t("admin.showtimes.endDate"),
            field: "endTime",
          },
        ]}
        data={handleData()}
        actions={[
          {
            icon: () => <EditIcon></EditIcon>,
            onClick: (event, rowData) => dispatch(onSelectShowtime(rowData)),
          },
          (rowData) => ({
            icon: "delete",
            tooltip: `${t("admin.showtimes.delete")}`,
            onClick: (event, rowData) => {
              if (window.confirm(`${t("admin.showtimes.delete")} ?`)) {
                dispatch(deleteShowtime(rowData._id));
              }
            },
          }),
        ]}
        options={{
          actionsColumnIndex: -1,
          search: true,
          paging: true,
          pageSize: 10, // make initial page size
          emptyRowsWhenPaging: true,
        }}
      />
    </div>
  );
}

export default ShowtimeTable;

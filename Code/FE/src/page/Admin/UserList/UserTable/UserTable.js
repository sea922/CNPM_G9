import React from "react";
import MaterialTable from "material-table";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, onSelectUser } from "../../../../redux/actions/user";
import { useTranslation } from "react-i18next";
import EditIcon from "@material-ui/icons/Edit";
function UserTable(props) {
  const users = useSelector((state) => state.userState.users);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const handleData = () => {
    if (users.length) {
      let temp = users.map((user) => {
        return {
          ...user,
        };
      });
      return temp;
    } else {
      return [];
    }
  };
  return (
    <div>
      <MaterialTable
        title={t("admin.users.tableName")}
        columns={[
          { title: t("admin.users.name"), field: "name" },
          { title: t("admin.users.email"), field: "email" },
          { title: t("admin.users.username"), field: "username" },
          {
            title: t("admin.users.phone"),
            field: "phone",
          },
        ]}
        data={handleData()}
        actions={[
          {
            icon: () => <EditIcon></EditIcon>,
            onClick: (event, rowData) => dispatch(onSelectUser(rowData)),
          },
          (rowData) => ({
            icon: "delete",
            tooltip: `${t("admin.users.delete")}`,
            onClick: (event, rowData) => {
              if (window.confirm(`${t("admin.users.delete")} ?`)) {
                dispatch(deleteUser(rowData._id));
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

export default UserTable;

import React from "react";
import PropTypes from "prop-types";
import MaterialTable from "material-table";
import { useTranslation } from "react-i18next";

ContactTable.propTypes = {};

function ContactTable(props) {
  const { contacts } = props;
  const { t } = useTranslation();
  const handleData = () => {
    if (contacts.length) {
      let temp = contacts.map((contact) => {
        return {
          ...contact,
        };
      });
      return temp;
    }
  };
  return (
    <div>
      <MaterialTable
        title={"abc"}
        columns={[
          { title: t("admin.contacts.name"), field: "name" },
          { title: t("admin.contacts.email"), field: "email" },
          { title: t("admin.contacts.phone"), field: "phone" },
          {
            title: t("admin.contacts.message"),
            field: "message",
          },
        ]}
        data={handleData()}
        // actions={[
        //   {
        //     icon: () => <EditIcon></EditIcon>,
        //     onClick: (event, rowData) => dispatch(onSelectUser(rowData)),
        //   },
        //   (rowData) => ({
        //     icon: "delete",
        //     tooltip: `${t("admin.users.delete")}`,
        //     onClick: (event, rowData) => {
        //       if (window.confirm(`${t("admin.users.delete")} ?`)) {
        //         dispatch(deleteUser(rowData._id));
        //       }
        //     },
        //   }),
        // ]}
        // options={{
        //   actionsColumnIndex: -1,
        //   search: true,
        // }}
        options={{
            paging:true,
            pageSize:10,       // make initial page size
            emptyRowsWhenPaging: true,   //to make page size fix in case of less data rows
          
          }}
      />
    </div>
  );
}

export default ContactTable;

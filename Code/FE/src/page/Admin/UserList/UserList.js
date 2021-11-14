import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, onSelectUser } from "../../../redux/actions/user";
import ResponsiveDialog from "../../../components/ReponsiveDialog/ReponsiveDialog";
import UserTable from "./UserTable/UserTable";
import EditUser from "./EditUser/EditUser";

UserList.propTypes = {};

function UserList(props) {
  const dispatch = useDispatch();
  const selectedUser = useSelector((state) => state.userState.selectedUser);
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  return (
    <div>
      <UserTable></UserTable>
      <ResponsiveDialog
        open={Boolean(selectedUser)}
        handleClose={() => dispatch(onSelectUser(null))}
      >
        <EditUser></EditUser>
      </ResponsiveDialog>
    </div>
  );
}

export default UserList;

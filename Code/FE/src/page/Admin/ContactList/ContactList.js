import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getAllContact } from "../../../redux/actions/contactAdmin";
import ContactTable from "./ContactTable/ContactTable";

ContactList.propTypes = {};

function ContactList(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllContact());
  }, []);
  const contacts = useSelector((state) => state.contactAdminState.contacts);
  return (
    <div>
      <ContactTable contacts={contacts}></ContactTable>
    </div>
  );
}

export default ContactList;

import React from "react";
import { TextField } from "@material-ui/core";
import { useField } from "formik";
const CustomField = (props) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      {...props}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};
export default CustomField;

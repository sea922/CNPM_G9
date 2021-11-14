import React from "react";
import { Checkbox } from "@material-ui/core";
import { useField } from "formik";
const CustomCheckbox = (props) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <Checkbox
      {...props}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};
export default CustomCheckbox;

import React from "react";
import FileUpload from "../FileUpload/FileUpload";
import { useField } from "formik";
const CustomUpLoad = (props) => {
  const [field, meta] = useField(props);
  return (
    <FileUpload
      {...props}
      name="image"
      file={field.value}
      onUpload={(e) => {
        const event = {
          target: {
            name: field.name,
            value: e.target.files[0],
          },
        };
        field.onChange(event);
      }}
    />
  );
};
export default CustomUpLoad;

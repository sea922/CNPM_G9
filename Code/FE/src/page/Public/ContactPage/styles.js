export default (theme) => ({
  logoImage: {
    marginLeft: theme.spacing(4),
  },
  form: {
    marginTop: theme.spacing(2),
    width: "60%",
    paddingLeft: "100px",
    paddingRight: "100px",
    paddingBottom: "125px",
    flexBasis: "700px",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      width: "90%",
    },
  },
  title: {
    fontSize: "3rem",
    lineHeight: "3rem",
    textAlign: "center",
    textTransform: "capitalize",
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(3),
  },
  subtitle: {
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(0.5),
    textAlign: "center",
  },
  fields: {
    marginTop: theme.spacing(5),
  },
  textField: {
    width: "100%",
    "& + & ": {
      marginTop: theme.spacing(2),
    },
  },
  textArea: {
    width: "100%",
    marginTop: theme.spacing(2),
    backgroundColor: "inherit",
    color: "inherit",
  },

  upload: {
    width: "100%",
    marginTop: theme.spacing(2),
  },
  progress: {
    display: "block",
    marginTop: theme.spacing(2),
    marginLeft: "auto",
    marginRight: "auto",
  },
  registerButton: {
    marginTop: theme.spacing(2),
    width: "100%",
  },
  fieldError: {
    color: theme.palette.danger.main,
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(1),
  },
  submitError: {
    color: theme.palette.danger.main,
    alignText: "center",
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
});

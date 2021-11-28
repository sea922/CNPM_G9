export default (theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    backgroundImage:"url(https://i.imgur.com/0PPaRPt.jpeg)",
    height: "100vh",
  },
  grid: {
    height: "100%",
  },
  bgWrapper: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  bg: {
    //backgroundColor: theme.palette.common.neutral,
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    //backgroundImage:"url(https://images.unsplash.com/photo-1627133805103-ce2d34ccdd37?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)",

    //backgroundImage: "url(https://source.unsplash.com/featured/?cinema)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    opacity: 0.5,
  },
  content: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  contentHeader: {
    display: "flex",
    alignItems: "center",
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },

  contentBody: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      justifyContent: "center",
    },
  },
});

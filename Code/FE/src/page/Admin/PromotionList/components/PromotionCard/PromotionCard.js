import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { makeStyles, Paper } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { AccessTime as AccessTimeIcon } from "@material-ui/icons";
import { useTranslation } from "react-i18next";
import moment from "moment";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    marginTop: theme.spacing(2),
  },
  imageWrapper: {
    height: "300px",
    margin: "0 auto",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    "object-fit": "cover",
  },
  details: { padding: theme.spacing(3) },
  title: {
    fontSize: "18px",
    lineHeight: "21px",
    marginTop: theme.spacing(2),
    textTransform: "capitalize",
  },
  description: {
    lineHeight: "16px",
    height: theme.spacing(4),
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(1),
  },
  stats: {
    display: "flex",
    alignItems: "center",
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(3),
  },
  updateIcon: {
    color: theme.palette.text.secondary,
  },
  updateText: {
    color: theme.palette.text.secondary,
  },
}));

function PromotionCard(props) {
  const { t } = useTranslation();
  const classes = useStyles(props);
  const { className, promotion } = props;
  const [src, setSrc] = useState("");
  useEffect(() => {
    setSrc(props.promotion.imageurl);
  }, [props.promotion]);
  const rootClassName = classNames(classes.root, className);
  const image =
    src && promotion.imageurl
      ? promotion.imageurl
      : "https://source.unsplash.com/featured/?cinema";
  return (
    <Paper className={rootClassName}>
      <div className={classes.imageWrapper}>
        <img alt="movie" className={classes.image} src={image} />
      </div>
      <div className={classes.details}>
        <Typography className={classes.title} variant="h4">
          {promotion.title}
        </Typography>
        <Typography className={classes.description} variant="body1">
          {promotion.description}
        </Typography>
        <Typography className={classes.updateText} variant="body2">
          {t("admin.promotion.discount")} : {promotion.discount}%
        </Typography>
        <Typography className={classes.updateText} variant="body2">
          {t("admin.promotion.code")} : {promotion.code}
        </Typography>
        <Typography className={classes.updateText} variant="body2">
          {t("admin.promotion.startDate")} :{" "}
          {moment(promotion.startDate).format("DD-MM-YYYY")}
        </Typography>
        <Typography className={classes.updateText} variant="body2">
          {t("admin.promotion.endDate")} :{" "}
          {moment(promotion.endDate).format("DD-MM-YYYY")}
        </Typography>
      </div>
    </Paper>
  );
}

export default PromotionCard;

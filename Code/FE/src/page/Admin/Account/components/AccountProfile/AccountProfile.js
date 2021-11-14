import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  withStyles,
} from "@material-ui/core";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles";
import { uploadImageProfile } from "../../../../../redux/actions/account";
import { useTranslation } from "react-i18next";
AccountProfile.propTypes = {};

function AccountProfile(props) {
  const { classes } = props;
  const profile = useSelector((state) => state.profileState.profile);
  const [file, setFile] = useState("");
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleUpload = () => {
    dispatch(uploadImageProfile(profile._id, file));
    setFile("");
  };
  return (
    <Card>
      <CardContent>
        <div className={classes.details}>
          <div className={classes.info}>
            <Typography variant="h2">{profile.name}</Typography>
            <Typography className={classes.emailText} variant="body1">
              {profile.email}
            </Typography>
            <Typography className={classes.dateText} variant="body1">
              {t("admin.account.joinAt")}: {moment(profile.createdAt).format("DD/MM/YYYY")}
            </Typography>
          </div>
          <Avatar
            className={classes.avatar}
            src={profile.imageurl ? profile.imageurl : "https://i.pravatar.cc/"}
          />
        </div>
        <Divider></Divider>
      </CardContent>
      <CardActions>
        <input
          accept="image/*"
          className={classes.input}
          id="icon-button-file"
          type="file"
          onChange={(event) => {
            const file = event.target.files[0];
            setFile(file);
          }}
        />
        <label htmlFor="icon-button-file">
          <Button
            className={classes.uploadButton}
            component="span"
            color="primary"
            variant="contained"
          >
          {t("btn.upload")}
          </Button>
        </label>
        <span>{file && file.name}</span>

        {file ? (
          <Button variant="contained" color="secondary" onClick={handleUpload}>
            {t("admin.account.save")}
          </Button>
        ) : (
          ""
        )}
      </CardActions>
    </Card>
  );
}

export default withStyles(styles)(AccountProfile);

import React, { useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles, Grid, Typography, Container } from "@material-ui/core";
import { getPromotions } from "../../../redux/actions/promotion";
import PromotionCard from "../../Admin/PromotionList/components/PromotionCard/PromotionCard";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: "3rem",
    lineHeight: "3rem",
    textAlign: "center",
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(3),
  },
}));

function CinemasPage(props) {
  const { t, i18n } = useTranslation();
  const classes = useStyles(props);
  const { promotions, getPromotions } = props;
  useEffect(() => {
    if (!promotions.length) getPromotions();
  }, [promotions, getPromotions]);

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography className={classes.title} variant="h2" color="inherit">
            {t("promotions.title")}
          </Typography>
        </Grid>
        <Grid
          container
          item
          xs={12}
          alignItems="center"
          justify="flex-start"
          spacing={2}
        >
          {promotions.map((promotions) => (
            <Grid key={promotions._id} item xs={12} md={4} lg={3}>
              <PromotionCard promotion={promotions} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
}

const mapStateToProps = ({ promotionState }) => ({
  promotions: promotionState.promotions,
});

export default connect(mapStateToProps, { getPromotions })(CinemasPage);

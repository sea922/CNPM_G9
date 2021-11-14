import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import PromotionToolbar from "./components/PromotionToolbar/PromotionToolbar";
import { useDispatch, useSelector } from "react-redux";
import { getCinemas } from "../../../redux/actions/cinemas";
import {
  getPromotions,
  onSelectPromotion,
  Search_full_promotion,
} from "../../../redux/actions/promotion";
import promotion from "../../../redux/promotion";
import { CircularProgress, Grid } from "@material-ui/core";
import PromotionCard from "./components/PromotionCard/PromotionCard";
import ResponsiveDialog from "../../../components/ReponsiveDialog/ReponsiveDialog";
import Addpromotion from "./components/AddPromotion/Addpromotion";
PromotionList.propTypes = {};

function PromotionList(props) {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  useEffect(() => {
    dispatch(getCinemas());
    dispatch(getPromotions());
  }, []);
  useEffect(() => {
    if (search === "") {
      dispatch(getPromotions());
    } else {
      dispatch(Search_full_promotion(search));
    }
  }, [search]);
  const promotions = useSelector((state) => state.promotionState.promotions);
  const selectedPromotion = useSelector(
    (state) => state.promotionState.selectedPromotion
  );
  return (
    <div>
      <PromotionToolbar
        search={search}
        handleSearch={(e) => setSearch(e.target.value)}
      ></PromotionToolbar>
      <div>
        {promotions.length === 0 ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </div>
        ) : (
          <Grid container spacing={3}>
            {promotions.map((promotion) => (
              <Grid
                item
                key={promotion._id}
                lg={3}
                md={6}
                xs={12}
                onClick={() => dispatch(onSelectPromotion(promotion))}
              >
                <PromotionCard promotion={promotion} />
              </Grid>
            ))}
          </Grid>
        )}
      </div>
      <ResponsiveDialog
        open={Boolean(selectedPromotion)}
        handleClose={() => dispatch(onSelectPromotion(null))}
      >
        <Addpromotion></Addpromotion>
      </ResponsiveDialog>
    </div>
  );
}

export default PromotionList;

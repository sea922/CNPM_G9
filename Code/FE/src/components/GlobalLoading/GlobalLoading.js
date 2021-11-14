import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import "./GlobalLoading.scss";

function GlobalLoading(props) {
  const loadingState = useSelector((state) => state.loadingState.showLoading);
  return (
    <Fragment>
      {loadingState ? (
        <div className="global-loading">
          <div className="dashed-loading"></div>
        </div>
      ) : (
        <div></div>
      )}
    </Fragment>
  );
}

export default GlobalLoading;
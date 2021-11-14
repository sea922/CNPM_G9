import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles, Box, Grid } from "@material-ui/core";
import { getMovies, getMovieSuggestion } from "../../../redux/actions/movies";
import { getShowtimes } from "../../../redux/actions/showtime";
import MovieCarousel from "../components/MovieCarousel/MovieCarousel";
import MovieBanner from "../components/MovieBanner/MovieBanner";
import styles from "./styles";
import { useTranslation } from "react-i18next";

const HomePage = ({
  movies,
  showtimes,
  suggested,
  getMovies,
  getShowtimes,
  getMovieSuggestion,
  user,
  classes,
  randomMovie,
  comingSoon,
  nowShowing,
}) => {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    if (!movies.length) getMovies();
    if (!showtimes.length) getShowtimes();
    if (user) {
      if (!suggested.length) getMovieSuggestion(user.username);
    }
  }, []);
  return (
    <Fragment>
      <MovieBanner movie={randomMovie} height="85vh" />
      <Box height={60} />
      <MovieCarousel
        carouselClass={classes.carousel}
        title={t("public.navbar.suggest")}
        movies={suggested}
      />
      <MovieCarousel
        carouselClass={classes.carousel}
        title={t("public.navbar.showing")}
        to="/movie/category/nowShowing"
        movies={nowShowing}
      />
      <MovieCarousel
        carouselClass={classes.carousel}
        title={t("public.navbar.coming")}
        to="/movie/category/comingSoon"
        movies={comingSoon}
      />
      {false && (
        <Grid container style={{ height: 500 }}>
          <Grid item xs={7} style={{ background: "#131334" }}></Grid>
          <Grid item xs={5} style={{ background: "#010025" }}></Grid>
        </Grid>
      )}
    </Fragment>
  );
};

HomePage.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  movies: PropTypes.array.isRequired,
  latestMovies: PropTypes.array.isRequired,
};

const mapStateToProps = ({ movieState, showtimeState, authState }) => ({
  movies: movieState.movies,
  randomMovie: movieState.randomMovie,
  latestMovies: movieState.latestMovies,
  comingSoon: movieState.comingSoon,
  nowShowing: movieState.nowShowing,
  showtimes: showtimeState.showtimes,
  suggested: movieState.suggested,
  user: authState.user,
});

const mapDispatchToProps = { getMovies, getShowtimes, getMovieSuggestion };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(HomePage));

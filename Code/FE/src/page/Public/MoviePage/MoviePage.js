import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MovieBanner from "../components/MovieBanner/MovieBanner";
import { getMovie, onSelectMovie } from "../../../redux/actions/movies";

const MoviePage = ({ movie, getMovie, onSelectMovie, match }) => {
  useEffect(() => {
    getMovie(match.params.id);
  }, []);

  return <>{movie && <MovieBanner movie={movie} fullDescription />}</>;
};

MoviePage.propTypes = {
  className: PropTypes.string,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = ({ movieState }) => ({
  movie: movieState.selectedMovie,
});

const mapDispatchToProps = { getMovie, onSelectMovie };

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);

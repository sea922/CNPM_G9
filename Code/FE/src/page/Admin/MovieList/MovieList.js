import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { CircularProgress, Grid, withStyles } from "@material-ui/core";
import MovieToolbar from "./components/MovieToolbar/MovieToolbar";
import { useSelector, useDispatch } from "react-redux";
import ResponsiveDialog from "../../../components/ReponsiveDialog/ReponsiveDialog";
import {
  getMovies,
  onSelectMovie,
  searchFullTextMovie,
} from "../../../redux/actions/movies";
import styles from "./style";
import AddMovie from "./components/AddMovie/AddMovie";
import MovieCard from "./components/MovieCard/MovieCard";
MovieList.propTypes = {};

function MovieList(props) {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const selectedMovie = useSelector((state) => state.movieState.selectedMovie);
  const movies = useSelector((state) => state.movieState.movies);
  const { classes } = props;
  useEffect(() => {
    if (search === "") dispatch(getMovies());
    else {
      dispatch(searchFullTextMovie(search));
    }
  }, [search]);
  console.log("search", search);
  const renderMovies = () => {
    if (!movies.length) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress />
        </div>
      );
    }
    return (
      <Grid container spacing={3}>
        {movies.map((movie) => (
          <Grid
            item
            key={movie._id}
            lg={4}
            md={6}
            xs={12}
            onClick={() => dispatch(onSelectMovie(movie))}
          >
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    );
  };
  return (
    <div className={classes.root}>
      <MovieToolbar
        search={search}
        onChangeSearch={(e) => setSearch(e.target.value)}
      />
      <div className={classes.content}>{renderMovies()}</div>
      <ResponsiveDialog
        id="Edit-movie"
        open={Boolean(selectedMovie)}
        handleClose={() => dispatch(onSelectMovie(null))}
      >
        <AddMovie edit={selectedMovie} />
      </ResponsiveDialog>
    </div>
  );
}

export default withStyles(styles)(MovieList);

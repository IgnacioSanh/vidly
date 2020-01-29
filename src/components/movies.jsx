import React, { Component } from "react";
import Pagination from "./common/pagination";
import paginate from "./utils/paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/fakeGenreService.js";
import { getMovies, deleteMovie } from "../services/fakeMovieService.js";
import Table from "./common/table";
import _ from "lodash";
import MoviesTable from "./moviesTable";

class Movie extends Component {
  state = {
    movies: [],
    moviesPerPage: 4,
    currentPage: 1,
    genres: [],
    currentGenre: undefined,
    sortColumn: { path: "title", order: "asc" }
  };

  componentDidMount() {
    const genres = [{ name: "All movies" }, ...getGenres()];
    this.setState({
      movies: getMovies(),
      genres
    });
  }

  getFilteredMovies = () => {
    const {
      movies: totalMovies,
      moviesPerPage,
      currentPage,
      currentGenre,
      sortColumn
    } = this.state;

    const filteredMovies = currentGenre
      ? totalMovies.filter(movie => movie.genre._id === currentGenre)
      : totalMovies;
    const orderedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );
    const movies = paginate(orderedMovies, currentPage, moviesPerPage);
    const totalPages = Math.ceil(filteredMovies.length / moviesPerPage) + 1;

    return { movies, totalPages };
  };

  render() {
    const {
      currentPage,
      genres: allGenres,
      currentGenre,
      sortColumn
    } = this.state;

    const { movies, totalPages } = this.getFilteredMovies();

    return (
      <div className="row" style={{ marginTop: "20px" }}>
        <div className="col-3">
          <ListGroup
            items={allGenres}
            selectedItem={currentGenre}
            onSelectItem={this.handleGenre}
          ></ListGroup>
        </div>
        <div className="col">
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onChangePage={this.handlePageChange}
          ></Pagination>
        </div>
      </div>
    );
  }

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].like = !movies[index].like;
    this.setState({ movies });
  };

  handlePageChange = page => {
    if (page !== this.state.currentPage) {
      this.setState({ currentPage: page });
    }
  };

  handleGenre = genre => {
    this.setState({ currentGenre: genre._id, currentPage: 1 });
  };

  showingMoviesTitle() {
    if (this.state.movies.length === 0) {
      return <p>No movies to show</p>;
    }
    return <p>Showing {this.state.movies.length} movies</p>;
  }

  handleDelete = id => {
    deleteMovie(id);
    this.setState({ movies: getMovies() });
  };
}

export default Movie;

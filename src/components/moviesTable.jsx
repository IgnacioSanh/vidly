import React, { Component } from "react";
import LikeButton from "./common/likeButton";
import Table from "./common/table";

class MoviesTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "Like",
      content: movie => (
        <LikeButton
          movieLiked={movie.like}
          like={() => this.props.onLike(movie)}
        ></LikeButton>
      )
    },
    {
      key: "Delete",
      content: movie => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => this.props.onDelete(movie._id)}
        >
          Delete
        </button>
      )
    }
  ];

  render() {
    const { movies, onSort, sortColumn } = this.props;

    return (
      <Table
        sortColumn={sortColumn}
        data={movies}
        columns={this.columns}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;

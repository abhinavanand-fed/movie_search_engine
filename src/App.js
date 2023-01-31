import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, CardImg, CardBody, CardTitle } from "reactstrap";

const API_KEY = "e79fe65e";
const API_URL = `http://www.omdbapi.com/?apikey=${API_KEY}`;

function MovieSearchEngine() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchTerm) return;
    setLoading(true);
    fetch(`${API_URL}&s=${searchTerm}`)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.Search || []);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  }, [searchTerm]);

  return (
    <div className="container">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for a movie..."
        className="form-control mb-3"
      />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="row">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="col-md-3 mb-3">
            <Card>
              <CardImg
                top
                src={movie.Poster}
                alt={`Poster of ${movie.Title}`}
              />
              <CardBody>
                <CardTitle>Name: {movie.Title}</CardTitle>
                <CardTitle>Year: {movie.Year}</CardTitle>
              </CardBody>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}


export default MovieSearchEngine;

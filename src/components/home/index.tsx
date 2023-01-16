import React, { useState } from 'react';
import { useAxios } from '@/hooks/useAxios';
import { Movie } from '@/common/types';
import { MovieCard } from '@/components/movie_card';
import SearchIcon from '@/assets/search.svg';
import { DialogModal } from '@/components/modal/Dialog';
import './style.css';

const API_KEY = import.meta.env.VITE_API_KEY;

export const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { data } = useAxios(`?apikey=${API_KEY}&s=${searchTerm}`);
  const [duplicatedMovieModal, setDuplicatedMovieModal] =
    useState<boolean>(false);
  const [addedFavoritesModal, setAddedFavoritesModal] =
    useState<boolean>(false);

  const fetchMovies = () => {
    setMovies(data.Search);
  };

  const storeMovie = (movie: Movie) => {
    const storedMovies = !localStorage.getItem('movies')
      ? []
      : JSON.parse(localStorage.getItem('movies') || '');

    const isRepeated = storedMovies.find(
      (e: Movie) => e.imdbID === movie.imdbID
    );

    if (!storedMovies) {
      localStorage.setItem('movies', JSON.stringify([movie]));
    } else if (isRepeated == undefined) {
      localStorage.setItem('movies', JSON.stringify([...storedMovies, movie]));
      setAddedFavoritesModal(true);
    } else {
      setDuplicatedMovieModal(true);
    }
  };

  return (
    <>
      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => {
            fetchMovies();
          }}
        />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies?.map((movie, index) => (
            <div key={index}>
              <MovieCard
                onClick={() => storeMovie(movie)}
                key={index}
                imdbID={movie.imdbID}
                Poster={movie.Poster}
                Year={movie.Year}
                Type={movie.Type}
                Title={movie.Title}
              />
              <h5 className="dialog-favorite">Click to ADD to favorites ✅</h5>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}

      <DialogModal
        show={duplicatedMovieModal}
        onHide={() => setDuplicatedMovieModal(false)}
        title="Fail ❌"
        text="This movie is already in favorites"
      />

      <DialogModal
        show={addedFavoritesModal}
        onHide={() => setAddedFavoritesModal(false)}
        title="Success ✅"
        text="Added to favorites"
      />
    </>
  );
};

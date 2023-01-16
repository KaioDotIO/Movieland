import React, { useEffect, useState } from 'react';
import { Movie } from '@/common/types';
import { MovieCard } from '@/components/movie_card';
import { DialogModal } from '@/components/modal/Dialog';

export const Favorites = () => {
  const [favoritesMovies, setFavoritesMovies] = useState<Movie[]>([]);
  const [removedMovieModal, setRemovedMovieModal] = useState<boolean>(false);

  useEffect(() => {
    if (!localStorage.getItem('movies')) return;
    const items = JSON.parse(localStorage.getItem('movies') || '');
    setFavoritesMovies(items);
  }, []);

  const removeMovie = (movie: Movie) => {
    const filteredMovieList = favoritesMovies.filter(
      (favoriteMovie) => favoriteMovie !== movie
    );
    setFavoritesMovies(filteredMovieList);
    localStorage.setItem('movies', JSON.stringify([...filteredMovieList]));
    setRemovedMovieModal(true);
  };

  return (
    <>
      {favoritesMovies?.length > 0 ? (
        <div className="container">
          {favoritesMovies?.map((movie, index) => (
            <div key={index}>
              <MovieCard
                onClick={() => removeMovie(movie)}
                key={index}
                imdbID={movie.imdbID}
                Poster={movie.Poster}
                Year={movie.Year}
                Type={movie.Type}
                Title={movie.Title}
              />
              <h5 className="dialog-favorite">
                Click to REMOVE from favorites ❌
              </h5>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>Your favorites list is empty </h2>
        </div>
      )}

      <DialogModal
        show={removedMovieModal}
        onHide={() => setRemovedMovieModal(false)}
        title="Success ✅"
        text="Removed from favorites"
      />
    </>
  );
};

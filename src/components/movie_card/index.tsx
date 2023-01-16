import React from 'react';
import { Movie } from '@/common/types';

export const MovieCard: React.FC<Movie> = ({
  imdbID,
  Year,
  Poster,
  Title,
  Type,
  onClick
}) => {
  return (
    <div onClick={onClick} className="movie" key={imdbID}>
      <div>
        <p>{Year}</p>
      </div>

      <div>
        <img
          src={Poster !== 'N/A' ? Poster : 'https://via.placeholder.com/400'}
          alt={Title}
        />
      </div>

      <div>
        <span>{Type}</span>
        <h3>{Title}</h3>
      </div>
    </div>
  );
};

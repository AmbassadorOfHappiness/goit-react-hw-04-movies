import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';

import { fetchTrendingMovies } from '../../services/API';
import style from '../HomeView/HomeView.module.css';

export default function HomeView() {
  const location = useLocation();
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    fetchTrendingMovies().then(setMovies);
  }, []);

  return (
    <>
      <h2 className={style.title}>Trending today</h2>
      <div className={style.container}>
        <ul className={style.cardSet}>
          {movies &&
            movies.map(movie => (
              <li key={movie.id} className={style.item}>
                <article className={style.card}>
                  <Link
                    to={{
                      pathname: `/movies/${movie.id}`,
                      state: { from: location },
                    }}
                  >
                    <div className={style.cardThumb}>
                      <img
                        className={style.img}
                        src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                        alt={movie.title}
                      />
                    </div>
                    <h2 className={style.cardHeading}>{movie.title}</h2>
                  </Link>
                </article>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}
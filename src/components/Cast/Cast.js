import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import { fetchMovieCredits } from '../../services/API';

import style from '../Cast/Cast.module.css';

export default function Cast() {
  const { slug } = useParams();
  const [cast, setCast] = useState([]);
  const movieId = slug.match(/[a-z0-9]+$/)[0];
  
  // console.log(movieId);

  useEffect(() => {
      fetchMovieCredits(movieId).then(data => setCast(data.cast));
  }, [movieId]);
  
  return (  
    <div className={style.container}>
      <ul className={style.cardSet}>
        {cast &&
          cast.map(actor => (
            <li key={actor.id} className={style.item}>
              <article className={style.card}>
                {actor.profile_path && (
                  <div className={style.cardThumb}>
                    <img
                      className={style.img}
                      src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
                      alt={actor.name}
                    />
                  </div>
                )}
                <p className={style.cardHeading}>{actor.name}</p>
                <p className={style.cardHeading}>{actor.character}</p>
              </article>
            </li>
          ))}
      </ul>
    </div>
  );
}
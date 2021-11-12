import { useState, useEffect, lazy, Suspense } from "react";
import { useParams, Route, useRouteMatch, NavLink, useLocation, useHistory } from 'react-router-dom';
import {fetchMovieDetails} from '../../services/API';
import PageLoader from '../../components/Loader/Loader';

import style from './MovieDetailsView.module.css';
// import Cast from '../components/Cast/Cast';
// import Reviews from '../components/Reviews/Reviews';

const Cast = lazy(() => import('../../components/Cast/Cast.js' /* webpackChunkName: 'cast' */));
const Reviews = lazy(() => import('../../components/Reviews/Reviews.js' /* webpackChunkName: 'reviews' */));

export default function MovieDetailsView() {
    const history = useHistory();
    const { slug } = useParams();
    const location = useLocation();
    const { url, path } = useRouteMatch();
    const [movie, setMovie] = useState([]);
    const movieId = slug.match(/[a-z0-9]+$/)[0];
    
    useEffect(() => {
        fetchMovieDetails(movieId).then(setMovie);
    }, [movieId]);

    const onGoBack = () => {
        history.push(location?.state?.from?.location ?? '/');
    };
    
    // console.log(slug.match(/[a-z0-9]+$/)[0]);
    // console.log(slug);
    // console.log('movieId',movieId);

    return (
            <div className={style.movieDetailsPage}> 
            <button type='button' onClick={onGoBack} className={style.button}>
                {location?.state?.from?.label ?? 'Back'}
            </button>
            {movie && (
              <div className={style.container}>
                {movie.poster_path ? (

                    <img
                        className={style.imgMovie}
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                        alt={movie.title} />
                ) : (
                    <img
                         className={style.imgMovie}
                        src={`https://st3.depositphotos.com/1322515/35964/v/380/depositphotos_359648638-stock-illustration-image-available-icon.jpg`}
                        alt={movie.title}
                    />
                )
                }
                <div className={style.movieDetails}>
                    <h1 className={style.title}>{movie.title} ({(movie.release_date??'date').slice(0, 4)})</h1>
                    <p>User Score: {movie.vote_average * 10}%</p>

                    <h2 className={style.title}>Overview</h2>
                    <p>{movie.overview}</p>

                    {/* <h2>Genres</h2> */}
                    {/* <p>{movie.genres}</p> */}
                {/* <ul>
                  Genres:
                  {movie.genres.map(el => {
                    return (
                      <li key={el.id}>
                        {el.name}
                      </li>
                    );
                  })}
                </ul> */}
                    {/* <p>{movie.genres.map(genre => `${genre.name} `)}</p> */}
                </div>
                </div>
            )}
            <h3>Additional information</h3>
            <ul>
                <li>
                    <NavLink to={`${url}/cast`}>Cast</NavLink>
                </li>
                <li>
                    <NavLink to={`${url}/reviews`}>Reviews</NavLink>
                </li>
            </ul>
            <Suspense fallback={<PageLoader />}>
                <Route path={`${path}/cast`}>
                    <Cast />
                </Route>
                
                <Route path={`${path}/reviews`}>
                    <Reviews />
                </Route>
            </Suspense>
        </div>
    );
}

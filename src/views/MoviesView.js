import { useState, useEffect } from "react";
import { Link, useRouteMatch, useLocation, useHistory } from 'react-router-dom';

import slugify from 'slugify';

import { fetchSearchMovies } from '../services/API';
import style from './HomeView/HomeView.module.css';
import SearchForm from '../components/SearchForm/SearchForm';

const makeSlug = string => slugify(string, { lover: true });

export default function MoviesView() {
    const [movies, setMovies] = useState(null);
    const {url} = useRouteMatch();
    const location = useLocation();
    const [error, setError] = useState(null);
    const history = useHistory();
    const queryMovies = new URLSearchParams(location.search).get('queryBy');
    const [query, setQuery] = useState(queryMovies ?? '');
    
    useEffect(() => {
        if (!query) {
        return;
        }
        fetchSearchMovies(query).then(setMovies);
    }, [query]);


    const onChangeQuery = query => {
        setQuery(query);
        history.push({
        ...location,
        search: `queryBy=${query}`,
        });
        setMovies(null);
        setError(null);
    };
    
    return (
        <>
            <SearchForm onSubmit={onChangeQuery} />
            {error && <p>Sorry! Please? try again!</p>}
            <div className={style.container}>
                {movies && (<ul className={style.cardSet}>
                    {movies.map(movie => (
                        <li key={movie.id} className={style.item}>
                          <article className={style.card}>   
                            <Link to={{
                                pathname: `${url}/${makeSlug(`${movie.title} ${movie.id}`)}`,
                                state: {
                                    from: {
                                        location,
                                        label: 'Back to movies',}
                                },
                                }}>
                                <div className={style.cardThumb}>
                                    {movie.poster_path ? (
                                        <img
                                                className={style.imgMovie}
                                                src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} 
                                                alt={movie.title} />
                                        ) : (
                                            <img
                                                className={style.imgMovie}
                                                src={`https://st3.depositphotos.com/1322515/35964/v/380/depositphotos_359648638-stock-illustration-image-available-icon.jpg`}
                                                alt={movie.title}
                                                width="200"
                                                height="300"
                                            />
                                        )
                                        }
                                </div> 
                                <h2 className={style.cardHeading}>{movie.title}</h2>
                                </Link>
                            {/* {slugify(movie.title)} */}
                          </article>
                        </li>
                    ))}
                    </ul>
                )}
            </div>
        </>
    );
}

import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import AppBar from './components/AppBar/AppBar';

import PageLoader from './components/Loader/Loader';
import Container from './components/Container/Container';

const HomeView = lazy(() => import('./views/HomeView/HomeView.js' /* webpackChunkName: 'HomeView' */));
const MoviesView = lazy(() => import('./views/MoviesView.js' /* webpackChunkName: 'MoviesView' */));
const MovieDetailsView = lazy(() => import('./views/MovieDetailsView/MovieDetailsView.js' /* webpackChunkName: 'MovieDetailsView' */));
const NotFoundView = lazy(() => import('./views/NotFoundView.js' /* webpackChunkName: 'NotFoundView' */));

export default function App() {
    return (
        <>
        <Container>
            <AppBar />
        <Suspense fallback={<PageLoader />}>    
            <Switch>
                <Route path="/" exact>
                    <HomeView />
                </Route>
                        
                <Route path="/movies" exact>
                    <MoviesView />
                </Route>
                        
                <Route path="/movies/:slug">
                    <MovieDetailsView />
                </Route>
                        
                <Route>
                    <NotFoundView />
                </Route>
                        
            </Switch>
        </Suspense>
        </Container> 
        </>
    );
}
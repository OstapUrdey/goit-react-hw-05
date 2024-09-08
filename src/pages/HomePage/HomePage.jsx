// import css from './HomePage.module.css';

import { useState, useEffect, useCallback } from 'react';

import axios from 'axios';

import MovieList from '../../components/MovieList/MovieList.jsx'

export default function HomePage () {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_KEY = "dfbdaa10e6641e35135522619deadcb1";
    const URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;

    const fetchMovies = useCallback(async () => {
        try {
            const response = await axios.get(URL);
            setMovies(response.data.results);
        } catch (error) {
            setError('Failed to fetch movies');
        } finally {
            setLoading(false);
        }
    }, [URL]);

    useEffect(() => {
        fetchMovies();
    }, [fetchMovies]);

    return (
        <div>
            <h1>Popular Movies</h1>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {movies && <MovieList movies={movies} />}
            {!loading && !error && movies.length === 0 && <p>No movies found.</p>}
        </div>
    )
}
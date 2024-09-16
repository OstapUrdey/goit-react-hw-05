// import css from './MovieList.module.css';

import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

export default function MovieList({ movies }) {
    const location = useLocation();

    return (
        <ul>
            {movies.map(movie => (
                <li key={movie.id}>
                    <Link 
                        to={`/movies/${movie.id}`} 
                        state={{ from: location }}
                    >
                        <img 
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                        />
                        <h2>{movie.title}</h2>
                    </Link>
                </li>
            ))}
        </ul>
    );
}

MovieList.propTypes = {
    movies: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            poster_path: PropTypes.string,
        })
    ).isRequired,
};

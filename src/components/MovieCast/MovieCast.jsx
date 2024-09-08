// import css from './MovieCast.module.css';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';

export default function MovieCast() {
    const {movieId} = useParams();
    const [cast, setCast] =useState([]);

    const API_KEY = "dfbdaa10e6641e35135522619deadcb1";
    const URL = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`;

    useEffect(() => {
        const fetchCast = async () =>{
            const response = await axios.get(URL);
            setCast(response.data.cast);
        };
        fetchCast();
    }, [movieId]);

    return (
        <ul>
            {cast.map(actor =>(
                <li key={actor.cast_id}>
                    <img
                        src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                        alt={actor.name}
                    />
                    <p>{actor.name}</p>
                </li>
            ))}
        </ul>
    );
};
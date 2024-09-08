import css from './Navigation.module.css';

import { NavLink } from 'react-router-dom';

const buildLinkClass = ({ isActive }) => {
    return isActive ? css.active : css.link;
};

export default function Navigation() {
    return (
        <nav>
            <NavLink to="/" className={buildLinkClass}>Home</NavLink>
            <NavLink to="/movies" className={buildLinkClass}>Movies</NavLink>
        </nav>
    )
}
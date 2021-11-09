import { NavLink } from 'react-router-dom';
import style from './Navigation.module.css';

const Navigator = () => (
    <nav>
        <NavLink exact to='/' className={style.link} activeClassName={style.activeLink}>Home</NavLink>
        <NavLink to='/movies' className={style.link} activeClassName={style.activeLink}>Movies</NavLink>
    </nav>
)

export default Navigator;
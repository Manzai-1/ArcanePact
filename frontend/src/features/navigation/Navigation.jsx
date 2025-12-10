import styles from './navigation.module.css';
import { menu } from "./navigation.config";
import { NavLink } from 'react-router';

export default function Navigation() {
  return (
    <nav>
      <ul className={styles.pixelNav}>
        {menu.map(item => (
            <li key={item.id} className={styles.navLink}>
                <NavLink
                    to={item.path}>
                    {item.name}
                </NavLink>
            </li>
        ))}
      </ul>
    </nav>
  );
}
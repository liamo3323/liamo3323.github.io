import Link from 'next/link';
import styles from '@styles/navbar.module.css';

const Navbar = () => (
  <nav className={styles.navbar}>
    <Link href="/">Home</Link>
    <Link href="/dashboard">Dashboard</Link>
  </nav>
);

export default Navbar;

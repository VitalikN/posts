import Link from "next/link";
import styles from "../sass/layouts/header.module.scss";
import { FaHome } from "react-icons/fa";

const Header = () => {
  return (
    <header className={styles.header__section}>
      <div className={styles.container}>
        <nav className={styles.header__nav}>
          <Link className={`${styles.header__icon} `} href="/">
            <FaHome />
          </Link>

          <Link className={styles.header__link} href="/login">
            Sign in
          </Link>
        </nav>
      </div>
    </header>
  );
};
export default Header;

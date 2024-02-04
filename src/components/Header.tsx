"use client";
import Link from "next/link";
import styles from "../sass/layouts/header.module.scss";
import { FaHome } from "react-icons/fa";
import { useSelector } from "react-redux";
import authSelector from "@/redux/auth/authSelector";
import { LuLogOut } from "react-icons/lu";

const Header = () => {
  const jwt = useSelector(authSelector.selectJwt);

  const name = useSelector(authSelector.getName);
  return (
    <header className={styles.header__section}>
      <div className={styles.container}>
        <nav className={styles.header__nav}>
          <Link className={`${styles.header__icon} `} href="/">
            <FaHome />
          </Link>
          {jwt ? (
            <h3>{name}</h3>
          ) : (
            <Link className={styles.header__link} href="/login">
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};
export default Header;

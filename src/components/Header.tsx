"use client";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import authSelector from "@/redux/auth/authSelector";
import { clearjwt } from "@/redux/auth/authApiSlice";
import { useRouter } from "next/navigation";
import { CiLogin } from "react-icons/ci";
import { MdAssignmentAdd } from "react-icons/md";

import styles from "../sass/layouts/header.module.scss";

const Header = () => {
  const jwt = useSelector(authSelector.selectJwt);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(clearjwt());
    router.push("/");
  };

  const name = useSelector(authSelector.getName);
  return (
    <header className={styles.header__section}>
      <div className={styles.container}>
        <nav className={styles.header__nav}>
          <Link className={`${styles.header__link} `} href="/">
            <FaHome className={styles.header__icon} />
          </Link>
          <Link className={`${styles.header__link} `} href="/add_post">
            <MdAssignmentAdd className={styles.header__icon} />
          </Link>

          {jwt ? (
            <div className={styles.box}>
              <h3>{name}</h3>
              <CiLogin
                onClick={() => handleLogout()}
                className={styles.header__icon}
              />
            </div>
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

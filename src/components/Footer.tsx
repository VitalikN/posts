"use client";

import Link from "next/link";
import styles from "../sass/layouts/footer.module.scss";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer__section}>
      <div className={`${styles.footer__container} ${styles.container}`}>
        <p className={`${styles.footer__text} `}>
          Developer:
          <Link
            className={styles.footer__link}
            href="https://github.com/VitalikN"
            target="_blank"
          >
            Vitalii Nozhenko
          </Link>
        </p>
      </div>
    </footer>
  );
};
export default Footer;

import styles from './footer.module.css';

const Footer = ({
  termsUrl = "/terms",
  privacyUrl = "/privacy",
  githubUrl = "https://github.com/Manzai-1/ArcanePact",
  etherscanUrl = "https://sepolia.etherscan.io/address/0xA78146FEd62Db4C10Db46eCd2c69396C9Ab45d0d",
}) => {
  return (
    <div className={styles.footer}>
      <nav className={styles.nav}>
        <a href={termsUrl} className={styles.link}>
          Terms of Use
        </a>

        <span className={styles.separator}>·</span>

        <a href={privacyUrl} className={styles.link}>
          Privacy Notice
        </a>

        {githubUrl && (
          <>
            <span className={styles.separator}>·</span>
            <a
              href={githubUrl}
              className={styles.link}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </>
        )}

        {etherscanUrl && (
          <>
            <span className={styles.separator}>·</span>
            <a
              href={etherscanUrl}
              className={styles.link}
              target="_blank"
              rel="noreferrer"
            >
              Contract (Etherscan)
            </a>
          </>
        )}
      </nav>

      <div className={styles.disclaimer}>
        Educational, non-commercial project
      </div>
    </div>
  );
};

export default Footer;

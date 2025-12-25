import styles from "./legalPages.module.css";

export default function TermsOfUse({
    lastUpdated = "2025-12-25",
    contactUrl = "https://github.com/Manzai-1/ArcanePact",
    contactLabel = "GitHub repository"
}) {
    return (
        <main className={styles.page}>
            <article className={styles.card}>
                <header className={styles.header}>
                    <h1 className={styles.title}>Terms of Use</h1>
                    <p className={styles.meta}>
                        <span className={styles.metaLabel}>Last updated:</span>{" "}
                        <span>{lastUpdated}</span>
                    </p>
                </header>

                <section className={styles.section}>
                    <h2 className={styles.h2}>1. Purpose of the Application</h2>
                    <p className={styles.p}>
                        This application is provided for <strong>educational and experimental purposes only</strong> as part
                        of an academic project. It is not intended for commercial use and does not constitute financial,
                        legal, or investment advice.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.h2}>2. Eligibility</h2>
                    <p className={styles.p}>
                        By accessing or using this application, you confirm that you are <strong>at least 18 years old</strong>{" "}
                        and legally capable of entering into agreements under applicable law.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.h2}>3. Non-Custodial Nature</h2>
                    <p className={styles.p}>
                        This application is <strong>non-custodial</strong>. You retain full control over your cryptocurrency
                        wallet and private keys at all times. The application does not store, manage, or recover private keys
                        or funds on your behalf.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.h2}>4. Smart Contracts and Risk</h2>
                    <p className={styles.p}>
                        Interactions with this application involve <strong>smart contracts deployed on the Ethereum Sepolia testnet</strong>.
                        These smart contracts:
                    </p>
                    <ul className={styles.ul}>
                        <li>Have not been professionally audited</li>
                        <li>May contain errors or vulnerabilities</li>
                        <li>Execute transactions that are irreversible</li>
                    </ul>
                    <p className={styles.p}>
                        You acknowledge and accept all risks associated with interacting with smart contracts, including
                        potential loss of funds.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.h2}>5. Testnet Disclaimer</h2>
                    <p className={styles.p}>
                        This application operates exclusively on the <strong>Ethereum Sepolia testnet</strong>. Any tokens or
                        assets used within the application have <strong>no real-world monetary value</strong>.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.h2}>6. User Responsibility</h2>
                    <p className={styles.p}>You are solely responsible for:</p>
                    <ul className={styles.ul}>
                        <li>Verifying transaction details before signing</li>
                        <li>Ensuring you understand how the application functions</li>
                        <li>Any outcomes resulting from your interactions with the smart contracts</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.h2}>7. No Warranties</h2>
                    <p className={styles.p}>
                        The application is provided <strong>“as is” and “as available”</strong>, without warranties of any kind,
                        express or implied, including but not limited to fitness for a particular purpose or non-infringement.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.h2}>8. Limitation of Liability</h2>
                    <p className={styles.p}>
                        To the maximum extent permitted by law, the developer(s) shall not be liable for any direct or indirect
                        damages, including loss of funds, data, or access, arising from the use or inability to use the application.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.h2}>9. Changes to These Terms</h2>
                    <p className={styles.p}>
                        These Terms of Use may be updated at any time. Continued use of the application constitutes acceptance
                        of the updated terms.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.h2}>10. Contact</h2>
                    <p className={styles.p}>
                        For questions regarding these Terms, please visit:{" "}
                        <a className={styles.a} href={contactUrl} target="_blank" rel="noreferrer">
                            {contactLabel}
                        </a>
                    </p>
                </section>
            </article>
        </main>
    );
}

import styles from "./legalPages.module.css";

export default function PrivacyNotice({
    lastUpdated = "2025-12-25",
    contactUrl = "https://github.com/Manzai-1/ArcanePact",
    contactLabel = "GitHub repository"
}) {
    return (
        <main className={styles.page}>
            <article className={styles.card}>
                <header className={styles.header}>
                    <h1 className={styles.title}>Privacy Notice</h1>
                    <p className={styles.meta}>
                        <span className={styles.metaLabel}>Last updated:</span>{" "}
                        <span>{lastUpdated}</span>
                    </p>
                </header>

                <section className={styles.section}>
                    <h2 className={styles.h2}>1. Overview</h2>
                    <p className={styles.p}>
                        This Privacy Notice explains how personal data is processed when using this application. The application
                        is designed to minimize data collection and operates primarily through public blockchain infrastructure.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.h2}>2. Data Collected</h2>
                    <p className={styles.p}>The application processes the following data:</p>
                    <ul className={styles.ul}>
                        <li><strong>Wallet addresses</strong></li>
                        <li><strong>User-provided display names</strong> (optional)</li>
                        <li><strong>Campaign participation data</strong> (on-chain and indexed off-chain)</li>
                    </ul>
                    <p className={styles.p}>
                        Wallet addresses may be considered <strong>personal data</strong> under the General Data Protection Regulation (GDPR)
                        when they can be linked to an individual.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.h2}>3. Purpose of Processing</h2>
                    <p className={styles.p}>Data is processed solely to:</p>
                    <ul className={styles.ul}>
                        <li>Enable campaign creation and participation</li>
                        <li>Display user-selected names associated with wallet addresses</li>
                        <li>Support application functionality via blockchain indexing services</li>
                    </ul>
                    <p className={styles.p}>
                        No data is used for marketing, profiling, or advertising purposes.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.h2}>4. Blockchain Data</h2>
                    <p className={styles.p}>
                        Transactions and data recorded on the blockchain are <strong>public and immutable</strong>. Once recorded,
                        this data <strong>cannot be modified or deleted</strong>, even upon user request.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.h2}>5. Off-Chain Data</h2>
                    <p className={styles.p}>
                        Limited off-chain data may be indexed using third-party services (e.g., blockchain indexing providers)
                        strictly to support application functionality. No additional personal data is collected beyond what is
                        required for operation.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.h2}>6. Data Retention</h2>
                    <p className={styles.p}>
                        On-chain data is retained permanently due to the nature of blockchain technology. Off-chain indexed data
                        is retained only as long as necessary for the application to function.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.h2}>7. User Rights</h2>
                    <p className={styles.p}>
                        Under GDPR, you may have rights to access information about how your data is processed and to object to
                        processing by discontinuing use of the application. Please note that the <strong>right to erasure does not
                            apply to immutable blockchain data</strong>.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.h2}>8. Cookies and Tracking</h2>
                    <p className={styles.p}>
                        This application does <strong>not</strong> use cookies, tracking technologies, or analytics. Limited use of
                        <strong> localStorage</strong> is strictly for essential functionality, such as remembering whether a user has
                        acknowledged required legal notices.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.h2}>9. Data Sharing</h2>
                    <p className={styles.p}>
                        Personal data is not sold or shared with third parties, except where required to operate the application
                        (e.g., blockchain infrastructure and indexing providers).
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.h2}>10. Changes to This Notice</h2>
                    <p className={styles.p}>
                        This Privacy Notice may be updated periodically. Changes will be reflected on this page.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.h2}>11. Contact</h2>
                    <p className={styles.p}>
                        For privacy-related questions, please use:{" "}
                        <a className={styles.a} href={contactUrl} target="_blank" rel="noreferrer">
                            {contactLabel}
                        </a>
                    </p>
                </section>
            </article>
        </main>
    );
}

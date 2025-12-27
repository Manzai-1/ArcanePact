import { useNavigate } from "react-router";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "./homePageHero.module.css";
import { ActionButton } from "../../components/buttons/ActionButton";

export const HomePageHero = () => {
    const { isConnected } = useAccount();

    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <section className={styles.root}>
                <div className={styles.content}>
                    <h1 className={styles.title}>
                        Play Together. Decide Together.
                    </h1>

                    <p className={styles.subtitle}>
                        A decentralized platform where adventurers form parties,
                        vote on campaigns, and build reputations that matter.
                        <br />
                        <span className={styles.walletNote}>
                            Sign in using a secure digital account — no email or password required.
                        </span>
                    </p>

                    {!isConnected && <div className={styles.connect}>
                        <ConnectButton />
                    </div>}

                    <div className={styles.actions}>
                        <ActionButton
                            label="Edit Profile"
                            handleClick={() => navigate("/profile")}
                        />
                        <ActionButton
                            label="Explore Campaigns"
                            handleClick={() => navigate("/campaigns")}
                        />
                        <ActionButton
                            label="Find Adventurers"
                            handleClick={() => navigate("/adventurers")}
                        />
                    </div>
                </div>

                <div className={styles.features}>
                    <div className={styles.feature}>
                        <span className={styles.featureTitle}>Made for Tabletop Play</span>
                        <span className={styles.featureText}>
                            Arcane Pact doesn’t replace the table or the role-play. It supports groups by making agreements
                            visible, fair, and dependable — so players can commit their time with confidence.
                        </span>
                    </div>

                    <div className={styles.feature}>
                        <span className={styles.featureTitle}>Trust Before You Commit</span>
                        <span className={styles.featureText}>
                            Player profiles reflect real campaign history and reputation, helping groups find reliable
                            participants and avoid bad matches before a long-running campaign begins.
                        </span>
                    </div>

                    <div className={styles.feature}>
                        <span className={styles.featureTitle}>Clear Agreements, Shared Decisions</span>
                        <span className={styles.featureText}>
                            Campaigns start and end by group agreement. Terms like fees, collateral, and expectations are
                            set up front and enforced automatically — no surprises later.
                        </span>
                    </div>

                    <div className={styles.feature}>
                        <span className={styles.featureTitle}>Simple, Self-Owned Login</span>
                        <span className={styles.featureText}>
                            Sign in using a self-custodial digital wallet you control. No emails or passwords — your wallet
                            securely identifies you across sessions and devices.
                        </span>
                    </div>
                </div>
            </section>
        </div>
    );
};
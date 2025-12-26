import { useState } from "react";
import { useAccount } from "wagmi";
import { useNavigate } from 'react-router';
import styles from "./homePageMap.module.css";
import imgConnected from "../../assets/Base_Town_Connected.webp";
import imgDisconnected from "../../assets/Base_Town_Disconnected.webp";
import imgAdventurers from "../../assets/Town_Adventurers.webp";
import imgCampaigns from "../../assets/Town_Campaigns.webp";
import imgProfile from "../../assets/Town_Profile.webp";

const images = [
    imgConnected,
    imgDisconnected,
    imgAdventurers,
    imgCampaigns,
    imgProfile
];

export default function HomePageMap() {
    const { address } = useAccount();
    const [hoverZone, setHoverZone] = useState(null);
    let navigate = useNavigate();

    const index =
        hoverZone === "left" ? 2 :
            hoverZone === "middle" ? 3 :
                hoverZone === "right" ? 4 :
                    (address ? 0 : 1);

    return (
        <div className={styles.backdrop}>
            <div
                className={styles.wrapper}
                onMouseLeave={() => setHoverZone(null)}
                aria-label="Homepage map"
            >
                <img className={styles.image} src={images[index]} alt="Homepage map" />

                <div className={styles.zones} aria-hidden="true">
                    <div
                        className={styles.zone}
                        onMouseEnter={() => setHoverZone("left")}
                        onClick={() => { navigate('/adventurers') }}
                    />
                    <div
                        className={styles.zone}
                        onMouseEnter={() => setHoverZone("middle")}
                        onClick={() => { navigate('/campaigns') }}
                    />
                    <div className={styles.zone} onMouseEnter={() => setHoverZone("right")}
                        onClick={() => { navigate('/profile') }}
                    />
                </div>
            </div>
        </div>
    );
}
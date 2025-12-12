import { useState } from "react";
import styles from "./newCampaign.module.css";

export const NewCampaign = ({ onSubmit }) => {
    const [form, setForm] = useState({
        title: "",
        description: "",
        inviteOnly: false,
        gamemasterFee: 0,
        collateral: 0
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            ...form,
            gamemasterFee: Number(form.gamemasterFee),
            collateral: Number(form.collateral),
        };

        if (onSubmit) onSubmit(payload);
    };

    return (
        <div className={styles.wrapper}>
            <form className={styles.formContainer} onSubmit={handleSubmit}>

                {/* Title */}
                <div className={styles.fieldGroup}>
                    <label className={styles.label}>Title</label>
                    <input
                        type="text"
                        className={styles.input}
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Description */}
                <div className={styles.fieldGroup}>
                    <label className={styles.label}>Description</label>
                    <textarea
                        className={styles.textarea}
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Invite Only */}
                <div className={styles.fieldGroup}>
                    <label className={styles.label}>Invite Only</label>
                    <div className={styles.checkboxRow}>
                        <input
                            type="checkbox"
                            name="inviteOnly"
                            checked={form.inviteOnly}
                            onChange={handleChange}
                        />
                        <span>Only invited players may join</span>
                    </div>
                </div>

                {/* Gamemaster Fee */}
                <div className={styles.fieldGroup}>
                    <label className={styles.label}>Gamemaster Fee</label>
                    <input
                        type="number"
                        className={styles.input}
                        name="gamemasterFee"
                        min="0"
                        value={form.gamemasterFee}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Collateral */}
                <div className={styles.fieldGroup}>
                    <label className={styles.label}>Collateral</label>
                    <input
                        type="number"
                        className={styles.input}
                        name="collateral"
                        min="0"
                        value={form.collateral}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Create Button */}
                <button type="submit" className={styles.button}>
                    Create Campaign
                </button>

            </form>
        </div>
    );
}
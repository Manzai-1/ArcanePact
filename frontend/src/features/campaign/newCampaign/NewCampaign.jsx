import { useContext, useState } from "react";
import styles from "./newCampaign.module.css";
import { parseEther } from "ethers";
import { TxContext } from "../../../providers/TxProvider";
import { useNewCampaign } from "./useNewCampaign";
import { InputField } from "../../../components/inputField/InputField";

export const NewCampaign = ({ onSubmit }) => {
    const model = useNewCampaign();

    return (
        <div className={styles.wrapper}>
            <form className={styles.formContainer} onSubmit={model.handleSubmit}>

                {model.inputFields.map(item => (
                    <InputField 
                        label={item.label}
                        value={item.value}
                        placeholder={item.placeholder}
                        onChange={item.onChange}
                        error={item.error}
                    />
                ))}

                <div className={styles.fieldGroup}>
                    <div className={styles.checkboxRow}>
                        <input
                            type="checkbox"
                            name="inviteOnly"
                            checked={model.inviteOnly}
                            onChange={model.inviteOnlyOnChange}
                        />
                        <span>Invite Only</span>
                    </div>
                </div>

                <button type="submit" className={styles.button}>
                    Create Campaign
                </button>
            </form>
        </div>
    );
}

// export const NewCampaign = ({ onSubmit }) => {
//     const { sendTx } = useContext(TxContext);
//     const formDefaultValues = {
//         title: "",
//         description: "",
//         inviteOnly: false,
//         gamemasterFee: 0,
//         collateral: 0
//     };

//     const [form, setForm] = useState(formDefaultValues);

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;

//         setForm((prev) => ({
//             ...prev,
//             [name]: type === "checkbox" ? checked : value
//         }));
//     };

//     const resetForm = () => {
//         setForm(formDefaultValues);
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const newCampaign = {
//             ...form,
//             gamemasterFee: parseEther(form.gamemasterFee),
//             collateral: parseEther(form.collateral),
//         };
        
//         sendTx('newCampaign', [newCampaign]);
//         resetForm();
//     };

//     return (
//         <div className={styles.wrapper}>
//             <form className={styles.formContainer} onSubmit={handleSubmit}>

//                 <div className={styles.fieldGroup}>
//                     <label className={styles.label}>Title</label>
//                     <input
//                         type="text"
//                         className={styles.input}
//                         name="title"
//                         value={form.title}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>

//                 <div className={styles.fieldGroup}>
//                     <label className={styles.label}>Description</label>
//                     <textarea
//                         className={styles.textarea}
//                         name="description"
//                         value={form.description}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>

//                 <div className={styles.fieldGroup}>
//                     <label className={styles.label}>Invite Only</label>
//                     <div className={styles.checkboxRow}>
//                         <input
//                             type="checkbox"
//                             name="inviteOnly"
//                             checked={form.inviteOnly}
//                             onChange={handleChange}
//                         />
//                         <span>Only invited players may join</span>
//                     </div>
//                 </div>

//                 <div className={styles.fieldGroup}>
//                     <label className={styles.label}>Gamemaster Fee</label>
//                     <input
//                         type="text"
//                         className={styles.input}
//                         name="gamemasterFee"
//                         min="0"
//                         value={form.gamemasterFee}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>

//                 <div className={styles.fieldGroup}>
//                     <label className={styles.label}>Collateral ETH</label>
//                     <input
//                         type="text"
//                         className={styles.input}
//                         name="collateral"
//                         min="0"
//                         value={form.collateral}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>

//                 <button type="submit" className={styles.button}>
//                     Create Campaign
//                 </button>

//             </form>
//         </div>
//     );
// }
import styles from "./newCampaign.module.css";
import { useNewCampaign } from "./useNewCampaign";
import { SubmitButton } from "../../../components/buttons/SubmitButton";
import { InputFieldWithTitle } from "../../../components/inputField/InputFieldWithTitle";

export const NewCampaign = () => {
    const model = useNewCampaign();

    return (
        <div className={styles.wrapper}>
            <form className={styles.formContainer} onSubmit={model.handleSubmit}>

                {model.inputFields.map(item => (
                    <InputFieldWithTitle 
                        title={item.title}
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
                <SubmitButton label={'Create New Campaign'}/>
            </form>
        </div>
    );
}
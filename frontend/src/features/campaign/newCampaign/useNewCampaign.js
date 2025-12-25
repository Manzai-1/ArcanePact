import { useContext, useState } from "react";
import { TxContext } from "../../../providers/TxProvider";
import { parseEther } from "viem";


export const useNewCampaign = () => {
    const { sendTx } = useContext(TxContext);
    if(!sendTx) return null;

    const formDefaultValues = {
        title: {value: '', error: 'TEsting'},
        description: {value: '', error: ''},
        inviteOnly: false,
        fee: {value: '', error: ''},
        collateral: {value: '', error: ''}
    };

    const [form, setForm] = useState(formDefaultValues);

    const resetForm = () => {
        setForm(formDefaultValues);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        const newCampaign = {
            title: form.title.value,
            description: form.description.value,
            inviteOnly: form.inviteOnly,
            gamemasterFee: parseEther(form.fee.value),
            collateral: parseEther(form.collateral.value),
        };
        
        sendTx('newCampaign', [newCampaign]);
        resetForm();
    };

    const titleOnChange = (value) => {
        setForm((prev) => ({
            ...prev,
            title: {...prev.title, value},
        }));
    };

    const descriptionOnChange = (value) => {
        setForm((prev) => ({
            ...prev,
            description: {...prev.description, value},
        }));
    };

    const feeOnChange = (value) => {
        setForm((prev) => ({
            ...prev,
            fee: {...prev.fee, value},
        }));
    };

    const collateralOnChange = (value) => {
        setForm((prev) => ({
            ...prev,
            collateral: {...prev.collateral, value},
        }));
    };
    
    const inputFields = [
        {
            title: 'Title', 
            type: 'text', 
            value: form.title.value, 
            error: form.title.error,
            placeholder: '', 
            onChange: titleOnChange,
        },
        {
            title: 'Description', 
            type: 'text', 
            value: form.description.value, 
            error: form.description.error,
            placeholder: '', 
            onChange: descriptionOnChange,
        },
        {
            title: 'Gamemaster Fee', 
            type: 'text', 
            value: form.fee.value, 
            error: form.fee.error,
            placeholder: '', 
            onChange: feeOnChange,
        },
        {
            title: 'Collateral', 
            type: 'text', 
            value: form.collateral.value, 
            error: form.collateral.error,
            placeholder: '', 
            onChange: collateralOnChange,
        }
    ]

    const inviteOnlyOnChange = (e) => setForm((prev) => ({...prev, inviteOnly: e.target.checked }));

    return {
        resetForm,
        handleSubmit,
        inputFields,
        inviteOnly: form.inviteOnly,
        inviteOnlyOnChange
    }
}
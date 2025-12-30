import { useContext, useState } from "react";
import { TxContext } from "../../../providers/TxProvider";
import { parseEther } from "viem";


export const useNewCampaign = () => {
    const { sendTx } = useContext(TxContext);
    if(!sendTx) return null;

    const formDefaultValues = {
        title: {value: '', error: ''},
        description: {value: '', error: ''},
        inviteOnly: false,
        fee: {value: '0.001', error: ''},
        collateral: {value: '0.001', error: ''},
        durationBlocks: {value: '216000', error: ''}
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
            durationBlocks: parseEther(form.durationBlocks.value),
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

    const durationBlocksOnChange = (value) => {
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
        },
        {
            title: 'Duration', 
            type: 'text', 
            value: form.durationBlocks.value, 
            error: form.durationBlocks.error,
            placeholder: '', 
            onChange: durationBlocksOnChange,
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
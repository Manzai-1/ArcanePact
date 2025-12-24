import { useContext, useState } from "react";
import { TxContext } from "../../../providers/TxProvider";
import { TableSection } from "../../../components/tableSection/TableSection";
import { InputField } from "../../../components/inputField/InputField";
import { ActionButton } from "../../../components/buttons/ActionButton";
import { TableSectionWithHeader } from "../../../components/tableSection/TableSectionWithHeader";


export const ChangeName = () => {
    const { sendTx } = useContext(TxContext);
    if(!sendTx) return (<></>);

    const [name, setName] = useState("");

    const handleSubmit = () => {
        sendTx("ChangePlayerName", [name]);
        setName("");
    };

    return (
        <TableSectionWithHeader header={'Register Name'} aria={'Profile Actions'}>
            <InputField
                value={name}
                placeholder="New Name..."
                onChange={setName}
                error=""
            />
            <ActionButton
                label="Submit"
                disabled={!name}
                handleClick={handleSubmit}
            />
        </TableSectionWithHeader>
    )
}
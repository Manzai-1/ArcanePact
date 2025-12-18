import { useState } from "react";
import { ActionButton } from "../../../components/actionButton/ActionButton";
import Table from "../../../components/table/Table";
import { UseGraph } from "../../../data/graph/useGraph";
import styles from './playerList.module.css';
import { ApplicationDecision, ClientState, PlayerState } from "../../../models/IArcanePact";
import { reviewApplication } from "../../../services/arcanePactServices";

export const PlayerList = ({campaign}) => {
    const [selectedRow, setSelectedRow] = useState(null);

    const players = campaign.players;
    const headers = [
        {name: 'stateText', value: 'State'},
        {name: 'id', value: 'Player Address'},
        {name: 'likes', value: '⬆'},
        {name: 'dislikes', value: '⬇'}
    ];

    const hasSelectedRow = selectedRow !== null;
    const isOwner = campaign.clientState === ClientState.Owner;

    const isApplicant = hasSelectedRow ? 
        players[selectedRow].state === PlayerState.Applied : false;

    const handleSelectRow = (index) => {
        setSelectedRow(selectedRow === index ? null : index);
    }

    return (
        <div className={styles.root}>
            <Table 
                headers={headers} 
                rows={players} 
                action={handleSelectRow} 
                selectedRow={selectedRow}
            />
            <div>
                {hasSelectedRow &&<ActionButton
                    label={'View Player'}
                    handleClick={()=>{console.log('Clicked')}}
                />}
                {(isOwner && isApplicant) &&<ActionButton
                    label={'Approve Application'}
                    handleClick={()=>{reviewApplication(
                        campaign.id,
                        players[selectedRow].id.toLowerCase(),
                        ApplicationDecision.Approved
                    )}}
                />}
                {(isOwner && isApplicant) &&<ActionButton
                    label={'Reject Application'}
                    handleClick={()=>{reviewApplication(
                        campaign.id, 
                        [{
                            applicant: players[selectedRow].id.toLowerCase(),
                            decision: ApplicationDecision.Rejected
                        }]
                    )}}
                />}
            </div>
        </div>
    );
}
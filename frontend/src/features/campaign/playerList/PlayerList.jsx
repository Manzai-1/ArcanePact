import { ActionButton } from "../../../components/actionButton/ActionButton";
import Table from "../../../components/table/Table";
import styles from './playerList.module.css';
import { usePlayerList } from "./usePlayerList";

export const PlayerList = ({campaign}) => {
    const model = usePlayerList(campaign);

    return (
        <div className={styles.root}>
            <Table 
                headers={model.headers} 
                rows={campaign.players} 
                action={model.setSelectedPlayer} 
                selectedRow={model.selectedPlayer}
            />
            <div>
                {model.selectedPlayer &&<ActionButton
                    label={'View Player'}
                    handleClick={()=>{console.log('Clicked')}}
                />}
                {(model.canReviewApplication) &&<ActionButton
                    label={'Approve Application'}
                    handleClick={model.approveApplication}
                />}
                {(model.canReviewApplication) &&<ActionButton
                    label={'Reject Application'}
                    handleClick={model.rejectApplication}
                />}
            </div>
        </div>
    );
}
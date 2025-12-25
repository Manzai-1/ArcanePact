import { ActionButton } from "../../../components/buttons/ActionButton";
import Table from "../../../components/table/Table";
import { usePlayerList } from "./usePlayerList";

export const PlayerList = ({campaign, handleViewPlayer}) => {
    const model = usePlayerList(campaign);
    if(!model) return (<></>);
    
    return (
        <>
            <Table 
                headers={model.headers} 
                rows={campaign.players} 
                action={model.setSelectedPlayer} 
                selectedRow={model.selectedPlayer}
            />
            <div>
                {model.selectedPlayer &&<ActionButton
                    label={'View Player'}
                    handleClick={()=>{
                        handleViewPlayer(model.selectedPlayer);
                    }}
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
        </>
    );
}
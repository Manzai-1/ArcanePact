import { ActionButton } from "../../../components/buttons/ActionButton";
import Table from "../../../components/table/Table";
import { usePlayerList } from "./usePlayerList";

export const PlayerList = ({campaignId, handleViewPlayer}) => {
    const model = usePlayerList(campaignId);

    return (
        <>
            <Table 
                headers={model.headers} 
                rows={model.players} 
                action={model.setSelectedPlayerId} 
                selectedRowId={model.selectedPlayerId}
            />
            <div>
                {model.selectedPlayerId &&<ActionButton
                    label={'View Player'}
                    handleClick={()=>{
                        handleViewPlayer(model.selectedPlayerId);
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
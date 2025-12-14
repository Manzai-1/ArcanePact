import Table from "../../../components/table/Table";
import { UseGraph } from "../../../data/graph/useGraph";

export const PlayerList = ({campaign}) => {
    const { playersByCampaignId, isLoading, error } = UseGraph();
    const players = playersByCampaignId.get(campaign.id);
    const headers = [
        {name: 'state', value: 'State'},
        {name: 'playerId', value: 'Player Address'},
    ]
    return (
        <Table headers={headers} rows={players} action={()=>{console.log("action")}}/>
    );
}
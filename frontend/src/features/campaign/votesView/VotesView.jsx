import { ActionButton } from "../../../components/buttons/ActionButton";
import Table from "../../../components/table/Table";
import { TableSectionWithHeader } from "../../../components/tableSection/TableSectionWithHeader";
import { useVotesView } from "./useVotesView"


export const VotesView = ({campaign}) => {
    const model = useVotesView(campaign);
    if(!model) return (<></>);

    return (
        <TableSectionWithHeader header={'Votes'} aria={'Votes Section'}>
            <Table headers={model.headers} rows={model.rows}/>
            {(model.canVote) &&<ActionButton
                label={'Vote Start'}
                handleClick={model.voteStartCampaign}
            />}
            {(model.canVote) &&<ActionButton
                label={'Vote Stop'}
                handleClick={model.voteStopCampaign}
            />}
        </TableSectionWithHeader>
    )
}
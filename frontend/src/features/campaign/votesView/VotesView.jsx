import { ActionButton } from "../../../components/buttons/ActionButton";
import Table from "../../../components/table/Table";
import { TableSectionWithHeader } from "../../../components/tableSection/TableSectionWithHeader";
import { useVotesView } from "./useVotesView"
import styles from './votesView.module.css';

export const VotesView = ({campaign}) => {
    const model = useVotesView(campaign);
    if(!model) return (<></>);

    return (
        <TableSectionWithHeader header={'Votes'} aria={'Votes Section'}>
            <Table headers={model.headers} rows={model.rows}/>
            <div className={styles.actionDiv}>
            {model.canVote &&model.actions.map((action, i) => (<ActionButton
                key={i}
                label={action.label}
                handleClick={action.handleClick}
                disabled={action.disabled}
            />))}
            </div>
        </TableSectionWithHeader>
    )
}
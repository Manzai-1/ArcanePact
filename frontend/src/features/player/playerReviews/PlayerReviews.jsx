import Table from "../../../components/table/Table";
import { UseGraph } from "../../../data/graph/useGraph";
import { ReviewScore } from "../../../models/IArcanePact";


export const PlayerReviews = ({playerId}) => {
    const { players, isLoading, error } = UseGraph();
    if(isLoading || error || !players) return (<div>Error</div>);

    const player = players.find(p => p.id === playerId);
    const headers = [{name: 'score', value: 'Score'}, {name: 'comment', value: 'Comment'}];
    const rows = (player?.reviews ?? []).map((r,i)=> ({
        ...r,
        id: i,
        score: ReviewScore[r.score]
    }));

    return (
        <>
            {rows &&<Table headers={headers} rows={rows}/>}
            {!rows &&<>No reviews available..</>}
        </>
    )
}
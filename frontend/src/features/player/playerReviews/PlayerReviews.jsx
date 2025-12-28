import Table from "../../../components/table/Table";
import { ReviewScore } from "../../../models/IArcanePact";


export const PlayerReviews = ({player}) => {
    const headers = [{name: 'score', value: 'Score'}, {name: 'comment', value: 'Comment'}];
    const rows = (player?.reviews ?? []).map((r,i)=> ({
        ...r,
        id: i,
        score: ReviewScore[r.score]
    }));

    return (
        <>
            {(rows && rows.length > 0) &&<Table headers={headers} rows={rows}/>}
            {(!rows || rows.length === 0) &&<span>No reviews available..</span>}
        </>
    )
}
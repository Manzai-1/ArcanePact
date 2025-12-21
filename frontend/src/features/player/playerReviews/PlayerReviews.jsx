import Table from "../../../components/table/Table";
import { ReviewScore } from "../../../models/IArcanePact";


export const PlayerReviews = ({player}) => {
    const headers = [{name: 'score', value: 'Score'}, {name: 'comment', value: 'Comment'}];
    const rows = (player?.reviews ?? []).map(r => ({
        ...r,
        score: ReviewScore[r.score]
    }));

    return (
        <>
            {rows &&<Table headers={headers} rows={rows}/>}
            {!rows &&<>No reviews available..</>}
        </>
    )
}
import PopupModal from "../../../components/popupModal/PopupModal"
import { TableSectionWithHeader } from "../../../components/tableSection/TableSectionWithHeader"
import { UseGraph } from "../../../data/graph/useGraph"
import { PlayerInfoSection } from "../playerInfoSection/PlayerInfoSection"
import { PlayerReviews } from "../playerReviews/PlayerReviews"


export const PlayerModal = ({playerId, handleCloseModal}) => {
    const { players, isLoading, error } = UseGraph();
    if(isLoading || error || !players) return (<div>Error</div>);

    const player = players.find(p => p.id === playerId);
    
    return (
        <>
            <PopupModal onClose={handleCloseModal}>
                <PlayerInfoSection playerId={playerId}/>
                {player.reviews &&<TableSectionWithHeader header={'Reviews'} aria={'Review section'}>
                    <PlayerReviews playerId={playerId}/>
                </TableSectionWithHeader>}
            </PopupModal>
        </>
    )
}
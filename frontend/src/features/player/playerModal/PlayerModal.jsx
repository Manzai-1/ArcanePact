import PopupModal from "../../../components/popupModal/PopupModal"
import { TableSectionWithHeader } from "../../../components/tableSection/TableSectionWithHeader"
import { PlayerInfoSection } from "../playerInfoSection/PlayerInfoSection"
import { PlayerReviews } from "../playerReviews/PlayerReviews"


export const PlayerModal = ({player, handleCloseModal}) => {

    return (
        <>
            <PopupModal onClose={handleCloseModal}>
                <PlayerInfoSection player={player}/>
                {player.reviews &&<TableSectionWithHeader header={'Reviews'} aria={'Review section'}>
                    <PlayerReviews player={player}/>
                </TableSectionWithHeader>}
            </PopupModal>
        </>
    )
}
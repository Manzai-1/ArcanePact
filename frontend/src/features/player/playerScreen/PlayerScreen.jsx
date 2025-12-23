import styles from './playerScreen.module.css';
import Table from "../../../components/table/Table";
import { usePlayerScreen } from './usePlayerScreen';
import { PlayerModal } from '../playerModal/PlayerModal';


export const PlayerScreen = () => {
    const model = usePlayerScreen();
    if(!model) return (<div>Error</div>);

    return (
        <>
            {model.selectedPlayerId && (
                <PlayerModal playerId={model.selectedPlayerId} handleCloseModal={model.closeModal} />
            )}
            <div className={styles.container}>
                <Table headers={model.headers} rows={model.players} action={model.setSelectedPlayerId} />
            </div>
        </>
    );
};

import styles from './playerScreen.module.css';
import Table from "../../../components/table/Table";
import { usePlayerScreen } from './usePlayerScreen';
import { PlayerModal } from '../playerModal/PlayerModal';


export const PlayerScreen = () => {
    const model = usePlayerScreen();

    if (model.isLoading) return <div>Loading…</div>;
    if (model.error) return <pre>{String(error)}</pre>;

    return (
        <>
            {model.selectedPlayer && (
                <PlayerModal player={model.selectedPlayer} handleCloseModal={model.closeModal} />
            )}
            <div className={styles.container}>
                <Table headers={model.headers} rows={model.players} action={model.setSelectedPlayer} />
            </div>
        </>
    );
};

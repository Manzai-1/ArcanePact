import { useAccount } from "wagmi";
import { PlayerInfoSection } from "../player/playerInfoSection/PlayerInfoSection";
import styles from './profileScreen.module.css';
import { PlayerReviews } from "../player/playerReviews/PlayerReviews";
import { TableSectionWithHeader } from "../../components/tableSection/TableSectionWithHeader";


export const ProfileScreen = () => {
  const { address } = useAccount();

  if (!address) return <>Connect your wallet to view your profile.</>;

  const clientAdr = address.toLowerCase();

  return (
    <div className={styles.root}>
      <PlayerInfoSection playerId={clientAdr} />
      {clientAdr &&
        <TableSectionWithHeader header={'Reviews'} aria={'Review section'}>
            <PlayerReviews playerId={clientAdr} />
        </TableSectionWithHeader>
      }
    </div>
  );
};
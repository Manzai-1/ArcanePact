import { useAccount } from "wagmi";
import { UseGraph } from "../../data/graph/useGraph";
import { PlayerInfoSection } from "../player/playerInfoSection/PlayerInfoSection";
import styles from './profileScreen.module.css';
import { PlayerReviews } from "../player/playerReviews/PlayerReviews";
import { TableSectionWithHeader } from "../../components/tableSection/TableSectionWithHeader";
import { TableSection } from "../../components/tableSection/TableSection";
import { ChangeName } from "../player/changeName/ChangeName";


export const ProfileScreen = () => {
  const { players, isLoading, error } = UseGraph();
  const { address } = useAccount();

  if (isLoading) return (<>Loading...</>);
  if (error) return (<>Error: {error}</>);
  if (!address) return <TableSection aria={'Profile info section'}><h2>
      Connect your wallet to view your profile.
    </h2></TableSection>;

  const clientAdr = address.toLowerCase();
  const client = (players ?? []).find(player => player.id.toLowerCase() === clientAdr);

  return (
    <div className={styles.root}>
      <PlayerInfoSection player={client} />
      <ChangeName/>
      {client &&
        <TableSectionWithHeader header={'Reviews'} aria={'Review section'}>
            <PlayerReviews player={client} />
        </TableSectionWithHeader>
      }
    </div>
  );
};
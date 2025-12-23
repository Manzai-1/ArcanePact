import profileDefault from '../../../assets/default_profile.jpg';
import { InfoSection } from '../../../components/infoSection/InfoSection';
import { UseGraph } from '../../../data/graph/useGraph';

export const PlayerInfoSection = ({playerId}) => {
    const { players, isLoading, error } = UseGraph();
    if(isLoading || error || !players) return (<div>Error</div>);

    console.log('PlayerId InfoSection: ', playerId);
    const player = players.find(p => p.id === playerId);
    if(!player) return (<div>Error</div>);

    const items = [
        {label: 'Likes', value: player.likes},
        {label: 'Dislikes', value: player.dislikes},
        {label: 'Completed', value: '?'},
        {label: 'Running', value: '?'}
    ]

    const footer = {
        label: 'Address',
        value: player.id
    }

    return (
        <InfoSection 
            img={profileDefault} 
            title={player.name}
            items={items}
            footer={footer}
        />
    )
}
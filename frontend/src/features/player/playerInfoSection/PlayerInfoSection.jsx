import profileDefault from '../../../assets/default_profile.jpg';
import { InfoSection } from '../../../components/infoSection/InfoSection';

export const PlayerInfoSection = ({player}) => {
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
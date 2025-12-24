import profileDefault from '../../../assets/default_profile.jpg';
import { InfoSection } from '../../../components/infoSection/InfoSection';

export const PlayerInfoSection = ({player}) => {
    const items = [
        {label: 'Likes', value: player?.likes ?? 'N/A'},
        {label: 'Dislikes', value: player?.dislikes ?? 'N/A'},
        {label: 'Completed', value: '?'},
        {label: 'Running', value: '?'}
    ]

    const footer = player ? { label: 'Address', value: player.id } :
        {label: 'No Data', value: 'You have not interracted with this contract yet.'}

    return (
        <>
            <InfoSection 
                img={profileDefault} 
                title={player?.name ?? 'N/A'}
                items={items}
                footer={footer}
            />
        </>
    )
}
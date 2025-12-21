import styles from './playerInfoSection.module.css';
import profileDefault from '../../../assets/default_profile.jpg';

export const PlayerInfoSection = ({player}) => {
    console.log(player);
    return (
        <div className={styles.root}>
            <div className={styles.image}>
                <img src={profileDefault}/>
            </div>
            <div className='styles.text'>
                <h2>{player.name}</h2>
                <h3>{player.likes}  Likes</h3>
                <h3>{player.dislikes}  Dislikes</h3>
                <h3>? Completed</h3>
                <h3>? Running</h3>
            </div>
        </div>
    )
}
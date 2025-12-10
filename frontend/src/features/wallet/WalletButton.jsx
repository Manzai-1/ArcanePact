import useWallet from "./useWallet";
import styles from "./walletButton.module.css";

export default function WalletButton() {

  const { buttonText, handleConnectWallet } = useWallet();

  return (
    <button 
      className={styles.walletButton} 
      onClick={handleConnectWallet}
    >
        {buttonText}
    </button>
  );
}
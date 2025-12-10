export const connectWallet = async () => {
  if (!window.ethereum) {
    throw new Error(
      'MetaMask is not installed. Please install it to connect your wallet.'
    );
  }

  try {
    const addresses = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    if (addresses.length > 0) return addresses[0];

    throw new Error('No addresses found when connecting wallet.');
  } catch (error) {
    throw new Error('Error connecting wallet:', error);
  }
};

export const getConnectedAddress = async () => {
  try {
    const addresses = await window.ethereum.request({
      method: 'eth_accounts',
    });
    if (addresses.length > 0) return addresses[0];
    return null;
  } catch (e) {
    console.log('Could not retrieve wallet address: ', e);
    return null;
  }
};

export const disconnectWallet = async () => {
  try {
    await window.ethereum.request({
      method: 'wallet_revokePermissions',
      params: [{ eth_accounts: {} }],
    });
    return true;
  } catch (error) {
    console.error('Error disconnecting wallet:', error);
    alert(
      'Failed to disconnect wallet. You may need to disconnect manually in Wallet.'
    );
    return false;
  }
};
import { expect } from 'chai';
import { network } from 'hardhat';

const { ethers } = await network.connect();

async function contractFixture() {
    const account = await ethers.getSigners();
    const ArcanePact = await ethers.getContractFactory('ArcanePact');
    const arcanePact = await ArcanePact.deploy();

    return { arcanePact, account };
}

describe('New Campaign', () => {
    it('should create a new campaign and emit the correct data', async () => {
        const { arcanePact, account } = await contractFixture();

        await arcanePact.newCampaign(1, 'test', 'smart contract', true);
    })
})
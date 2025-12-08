import { expect } from 'chai';
import { network } from 'hardhat';

const { ethers } = await network.connect();

const campaignConfig = {
    title: 'Test campaign',
    description: 'Dumnmy campaign for testing',
    inviteOnly: true,
    gamemasterFee: 0n,
    collateral: 0n
}

async function contractFixture() {
    const account = await ethers.getSigners();
    const ArcanePact = await ethers.getContractFactory('ArcanePact');
    const arcanePact = await ArcanePact.deploy();

    return { arcanePact, account };
}

describe('New Campaign', () => {
    it('should create a new campaign and emit the correct data', async () => {
        const { arcanePact, account } = await contractFixture();

        await expect(arcanePact.newCampaign(campaignConfig))
            .to.emit(arcanePact, "NewCampaignCreated")
            .withArgs(
                (id: any) => { 
                    expect(id).to.be.a("bigint"); 
                    return true; 
                },
                (owner: any) => {
                    expect(owner).to.equal(account[0]);
                    return true;
                },
                (emittedConfig: any) => {
                    expect(emittedConfig.title).to.equal(campaignConfig.title);
                    expect(emittedConfig.description).to.equal(campaignConfig.description);
                    expect(emittedConfig.inviteOnly).to.equal(campaignConfig.inviteOnly);
                    return true;
                }
            )
    });

})
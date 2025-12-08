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

describe('Create a new Campaign', () => {
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
                    expect(owner).to.equal(account[0].address);
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

describe('Add players to Campaign', () => {
    it('should take a (campignId, address[]) and emit a invitation to the campaign for each address when one address', async () => {
        const { arcanePact, account } = await contractFixture();
        const players = [account[1].address];

        await arcanePact.newCampaign(campaignConfig);
        await expect(arcanePact.invitePlayers(1, players))
            .to.emit(arcanePact, "NewInvitationAdded")
            .withArgs(1, account[1].address);
    });

    it('should take a (campignId, address[]) and emit a invitation to the campaign for each address when multiple addresses', async () => {
        const { arcanePact, account } = await contractFixture();
        const players = [
            account[1].address, 
            account[2].address
        ];

        await arcanePact.newCampaign(campaignConfig);
        await expect(arcanePact.invitePlayers(1, players))
            .to.emit(arcanePact, "NewInvitationAdded").withArgs(1, account[1].address)
            .and.to.emit(arcanePact, "NewInvitationAdded").withArgs(1, account[1].address);
    });

    it('should throw a NotOwner error if caller is not owner of the contract', async () => {
        const { arcanePact, account } = await contractFixture();
        const players = [account[1].address];

        await arcanePact.newCampaign(campaignConfig);
        await expect(arcanePact.connect(account[1]).invitePlayers(1, players))
            .to.be.revertedWithCustomError(arcanePact, "NotOwner")
            .withArgs(account[1].address);
    });

    it('should throw a CampaignClosedForInvites error if the campaign is not in state initialized', async () => {
        const { arcanePact, account } = await contractFixture();
        const players = [account[1].address];

        await arcanePact.newCampaign(campaignConfig);
        await expect(arcanePact.invitePlayers(1, players))
            .to.be.revertedWithCustomError(arcanePact, "CampaignClosedForInvites")
            .withArgs(1);
    });

    it('should throw a CampaignDoesNotExist error if the campaign does not exist', async () => {
        const { arcanePact, account } = await contractFixture();
        const players = [account[1].address];

        await arcanePact.newCampaign(campaignConfig);
        await expect(arcanePact.invitePlayers(2, players))
            .to.be.revertedWithCustomError(arcanePact, "CampaignDoesNotExist")
            .withArgs(2);
    });

    it('should throw a PlayerAlreadyExists error if an invited address already exists in relation to the campaign', async () => {
        const { arcanePact, account } = await contractFixture();
        const players = [
            account[1].address,
            account[1].address
        ];

        await arcanePact.newCampaign(campaignConfig);
        await expect(arcanePact.invitePlayers(1, players))
            .to.be.revertedWithCustomError(arcanePact, "PlayerAlreadyExists")
            .withArgs(1, account[1].address);
    });
})
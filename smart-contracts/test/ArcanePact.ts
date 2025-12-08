import { expect } from 'chai';
import { network } from 'hardhat';

const { ethers } = await network.connect();

const campaignConfig = {
    title: 'Test campaign',
    description: 'Dumnmy campaign for testing',
    inviteOnly: false,
    gamemasterFee: 0n,
    collateral: 0n
}

async function contractFixture() {
    const account = await ethers.getSigners();
    const ArcanePact = await ethers.getContractFactory('ArcanePact');
    const arcanePact = await ArcanePact.deploy();

    return { arcanePact, account };
}

describe('Campaign lifecycle', () => {
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

describe('Campaign participation', () => {

    describe('Invite Players', () => {

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

        it.skip('should throw a CampaignClosedForInvites error if the campaign is not in state initialized', async () => {
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

        it('should throw a PlayerExistsInCampaign error if an invited address already exists in relation to the campaign', async () => {
            const { arcanePact, account } = await contractFixture();
            const players = [
                account[1].address,
                account[1].address
            ];

            await arcanePact.newCampaign(campaignConfig);
            await expect(arcanePact.invitePlayers(1, players))
                .to.be.revertedWithCustomError(arcanePact, "PlayerExistsInCampaign")
                .withArgs(1, account[1].address);
        });
    });

    describe('Applications', () => {
        
        describe('Player applies', () => {
            it('should add player to campaign and emit an NewApplicationAdded event', async () => {
                const { arcanePact, account } = await contractFixture();

                await arcanePact.newCampaign(campaignConfig);
                await expect(arcanePact.connect(account[1]).campaignApplication(1))
                    .to.emit(arcanePact, "NewApplicationAdded").withArgs(1, account[1].address);
            })

            it('should throw CampaignDoesNotExist error if campaign does not exist', async () => {
                const { arcanePact, account } = await contractFixture();

                await arcanePact.newCampaign(campaignConfig);
                await expect(arcanePact.connect(account[1]).campaignApplication(2))
                    .to.revertedWithCustomError(arcanePact, "CampaignDoesNotExist");
            })

            it.skip('should throw custom error if campaign is not in state initialized', async () => {
                
            })

            it('should throw a PlayerExistsInCampaign error if an applying address already exists in relation to the campaign', async () => {
            const { arcanePact, account } = await contractFixture();


            await arcanePact.newCampaign(campaignConfig);
            await arcanePact.connect(account[1]).campaignApplication(1);

            await expect(arcanePact.connect(account[1]).campaignApplication(1))
                .to.be.revertedWithCustomError(arcanePact, "PlayerExistsInCampaign")
                .withArgs(1, account[1].address);
        });

            it('should throw CampaignIsInviteOnly error if campaign is invite only', async () => {
                const { arcanePact, account } = await contractFixture();

                await arcanePact.newCampaign({...campaignConfig, inviteOnly: true});
                await expect(arcanePact.connect(account[1]).campaignApplication(1))
                    .to.revertedWithCustomError(arcanePact, "CampaignIsInviteOnly");
            })
        })

        describe('Gamemaster application management', () => {
            it.skip('should set player state as PendingSignature when application aproved', async () => {

            })

            it.skip('should revert with custom error if player does not exist', async () => {

            })

            it.skip('should revert with custom error if player state is not Applied', async () => {

            })

            it.skip('should revert with custom error if sender is not owner of campaign', async () => {

            })

            it.skip('should revert with custom error if campaign does not exist', async () => {

            })

            it.skip('should revert with custom error if campaign is not in state Initialized', async () => {

            })
        })
    });

    describe('Player Signing', () => {
        it.skip('should add player to campaign with state Applied and emit a event', async () => {

        })
    });

});
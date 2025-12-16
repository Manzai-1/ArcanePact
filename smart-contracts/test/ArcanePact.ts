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

const enum PlayerState {
    None,
    Applied,
    Rejected,
    AwaitingSignature,
    Signed,
    InSession
}

const enum CampaignState {
    Initialized,
    Running,
    Completed
}

enum ApplicationDecision {
    Approved,
    Rejected
}

enum VoteType {
    StartCampaign,
    StopCampaign
}

type ApplicationReview = {
    applicant: string,
    decision: number
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
            .to.emit(arcanePact, "CampaignCreated")
            .withArgs(
                (id: any) => { 
                    expect(id).to.be.a("bigint"); 
                    return true; 
                },
                (owner: any) => {
                    expect(owner).to.equal(account[0].address);
                    return true;
                },
                (campaignState: any) => {
                    expect(campaignState).to.equal(CampaignState.Initialized);
                    return true;
                },
                (participantCount: any) => {
                    expect(participantCount).to.equal(1);
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

    it('Should Start Campaign upon majority participant vote', async () => {
        const { arcanePact, account } = await contractFixture();
        const val1 = ethers.parseEther("1");
        const val2 = ethers.parseEther("2");

        await arcanePact.newCampaign({
            ...campaignConfig, 
            gamemasterFee: val1, 
            collateral: val1
        });

        await arcanePact.invitePlayers(1, [account[1].address]);
        await arcanePact.invitePlayers(1, [account[2].address]);

        await arcanePact.connect(account[1]).SignCampaign(1, {value: val2});
        await arcanePact.connect(account[2]).SignCampaign(1, {value: val2});

        await arcanePact.connect(account[1]).AddVote(1, VoteType.StartCampaign);

        await expect(arcanePact.AddVote(1, VoteType.StartCampaign))
            .to.emit(arcanePact, "CampaignStarted").withArgs(
                1, 
                CampaignState.Running
            );
    })

    it('Should stop Campaign upon majority participant vote', async () => {
        const { arcanePact, account } = await contractFixture();
        const val1 = ethers.parseEther("1");
        const val2 = ethers.parseEther("2");

        await arcanePact.newCampaign({
            ...campaignConfig, 
            gamemasterFee: val1, 
            collateral: val1
        });

        await arcanePact.invitePlayers(1, [account[1].address]);
        await arcanePact.invitePlayers(1, [account[2].address]);

        await arcanePact.connect(account[1]).SignCampaign(1, {value: val2});
        await arcanePact.connect(account[2]).SignCampaign(1, {value: val2});

        await arcanePact.connect(account[1]).AddVote(1, VoteType.StopCampaign);

        await expect(arcanePact.AddVote(1, VoteType.StopCampaign))
            .to.emit(arcanePact, "CampaignStopped").withArgs(
                1, 
                CampaignState.Completed
            );
    })
})

describe('Campaign participation', () => {

    describe('Invite Players', () => {

        it('should take a (campignId, address[]) and emit a invitation to the campaign for each address when one address', async () => {
            const { arcanePact, account } = await contractFixture();
            const players = [account[1].address];

            await arcanePact.newCampaign(campaignConfig);
            await expect(arcanePact.invitePlayers(1, players))
                .to.emit(arcanePact, "InvitationAdded")
                .withArgs(1, account[1].address, PlayerState.AwaitingSignature)
        });

        it('should take a (campignId, address[]) and emit a invitation to the campaign for each address when multiple addresses', async () => {
            const { arcanePact, account } = await contractFixture();
            const players = [
                account[1].address, 
                account[2].address
            ];

            await arcanePact.newCampaign(campaignConfig);
            await expect(arcanePact.invitePlayers(1, players))
                .to.emit(arcanePact, "InvitationAdded").withArgs(1, account[1].address, PlayerState.AwaitingSignature)
                .and.to.emit(arcanePact, "InvitationAdded").withArgs(1, account[1].address, PlayerState.AwaitingSignature);
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
                .to.be.revertedWithCustomError(arcanePact, "CampaignLocked")
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
                    .to.emit(arcanePact, "ApplicationAdded").withArgs(1, account[1].address, PlayerState.Applied);
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
            it('should emit an ApplicationAproved event when one application is aproved', async () => {
                const { arcanePact, account } = await contractFixture();
                const reviews: ApplicationReview[] = [
                    {
                        applicant: account[1].address, 
                        decision: ApplicationDecision.Approved
                    }
                ];

                await arcanePact.newCampaign(campaignConfig);
                await arcanePact.connect(account[1]).campaignApplication(1);

                await expect(arcanePact.connect(account[0]).ReviewApplications(1, reviews))
                    .to.emit(arcanePact, "ApplicationAproved").withArgs(
                        1, 
                        account[1].address, 
                        PlayerState.AwaitingSignature
                    );
            })

            it('should emit an ApplicationRejected event when one application is rejected', async () => {
                const { arcanePact, account } = await contractFixture();
                const reviews: ApplicationReview[] = [
                    {
                        applicant: account[1].address, 
                        decision: ApplicationDecision.Rejected
                    }
                ];

                await arcanePact.newCampaign(campaignConfig);
                await arcanePact.connect(account[1]).campaignApplication(1);

                await expect(arcanePact.connect(account[0]).ReviewApplications(1, reviews))
                    .to.emit(arcanePact, "ApplicationRejected").withArgs(
                        1, 
                        account[1].address, 
                        PlayerState.Rejected
                    );
            })

            it('should emit correct events when multiple applications reviewed', async () => {
                const { arcanePact, account } = await contractFixture();
                const reviews: ApplicationReview[] = [
                    {
                        applicant: account[1].address, 
                        decision: ApplicationDecision.Rejected
                    },
                    {
                        applicant: account[2].address, 
                        decision: ApplicationDecision.Approved
                    },
                    {
                        applicant: account[3].address, 
                        decision: ApplicationDecision.Rejected
                    },
                    {
                        applicant: account[4].address, 
                        decision: ApplicationDecision.Approved
                    },
                ];

                await arcanePact.newCampaign(campaignConfig);
                await arcanePact.connect(account[1]).campaignApplication(1);
                await arcanePact.connect(account[2]).campaignApplication(1);
                await arcanePact.connect(account[3]).campaignApplication(1);
                await arcanePact.connect(account[4]).campaignApplication(1);

                await expect(arcanePact.connect(account[0]).ReviewApplications(1, reviews))
                    .to.emit(arcanePact, "ApplicationRejected").withArgs(
                        1, 
                        account[1].address,
                        PlayerState.Rejected
                    ).and.to.emit(arcanePact, "ApplicationAproved").withArgs(
                        1, 
                        account[2].address,
                        PlayerState.AwaitingSignature
                    ).and.to.emit(arcanePact, "ApplicationRejected").withArgs(
                        1, 
                        account[3].address,
                        PlayerState.Rejected
                    ).and.to.emit(arcanePact, "ApplicationAproved").withArgs(
                        1, 
                        account[4].address,
                        PlayerState.AwaitingSignature
                    );
            })

            it('should emit ApplicationAproved if previously rejected player is Aproved', async () => {
                const { arcanePact, account } = await contractFixture();
                const reviews: ApplicationReview[] = [
                    {
                        applicant: account[1].address, 
                        decision: ApplicationDecision.Rejected
                    },
                    {
                        applicant: account[1].address, 
                        decision: ApplicationDecision.Approved
                    }
                ];

                await arcanePact.newCampaign(campaignConfig);
                await arcanePact.connect(account[1]).campaignApplication(1);

                await expect(arcanePact.connect(account[0]).ReviewApplications(1, reviews))
                    .to.emit(arcanePact, "ApplicationRejected").withArgs(
                        1, 
                        account[1].address,
                        PlayerState.Rejected
                    ).and.to.emit(arcanePact, "ApplicationAproved").withArgs(
                        1, 
                        account[1].address,
                        PlayerState.AwaitingSignature
                    );
            })

            it('should revert with CampaignDoesNotExist error if campaign does not exist', async () => {
                const { arcanePact, account } = await contractFixture();
                const reviews: ApplicationReview[] = [
                    {
                        applicant: account[1].address, 
                        decision: ApplicationDecision.Rejected
                    }
                ];

                await expect(arcanePact.ReviewApplications(1, reviews))
                    .to.be.revertedWithCustomError(arcanePact, "CampaignDoesNotExist")
                    .withArgs(1);
            })

            it('should revert with NotOwner error if sender is not owner of campaign', async () => {
                const { arcanePact, account } = await contractFixture();
                const reviews: ApplicationReview[] = [
                    {
                        applicant: account[1].address, 
                        decision: ApplicationDecision.Approved
                    }
                ];

                await arcanePact.newCampaign(campaignConfig);
                await arcanePact.connect(account[1]).campaignApplication(1);

                await expect(arcanePact.connect(account[1]).ReviewApplications(1, reviews))
                    .to.be.revertedWithCustomError(arcanePact, "NotOwner")
                    .withArgs(account[1].address);
            })

            it.skip('should revert with custom error if campaign is not in state Initialized', async () => {
                const { arcanePact, account } = await contractFixture();
                const reviews: ApplicationReview[] = [
                    {
                        applicant: account[1].address, 
                        decision: ApplicationDecision.Approved
                    }
                ];

                await arcanePact.newCampaign(campaignConfig);
                await arcanePact.connect(account[1]).campaignApplication(1);

                await expect(arcanePact.connect(account[0]).ReviewApplications(1, reviews))
                    .to.be.revertedWithCustomError(arcanePact, "CampaignLocked")
                    .withArgs(1);
            })

            it('should revert with ApplicantDoesNotExist error if applicant does not exist', async () => {
                const { arcanePact, account } = await contractFixture();
                const reviews: ApplicationReview[] = [
                    {
                        applicant: account[1].address, 
                        decision: ApplicationDecision.Approved
                    }
                ];

                await arcanePact.newCampaign(campaignConfig);

                await expect(arcanePact.ReviewApplications(1, reviews))
                    .to.be.revertedWithCustomError(arcanePact, "ApplicantDoesNotExist")
                    .withArgs(1, account[1].address);
            })

            it.skip('should revert with custom error if rejected player is already Signed', async () => {

            })

            it('should revert with ApplicantAlreadyRejected error if rejected player is already Rejected', async () => {
                const { arcanePact, account } = await contractFixture();
                const reviews: ApplicationReview[] = [
                    {
                        applicant: account[1].address, 
                        decision: ApplicationDecision.Rejected
                    },{
                        applicant: account[1].address, 
                        decision: ApplicationDecision.Rejected
                    }
                ];

                await arcanePact.newCampaign(campaignConfig);
                await arcanePact.connect(account[1]).campaignApplication(1);

                await expect(arcanePact.connect(account[0]).ReviewApplications(1, reviews))
                    .to.be.revertedWithCustomError(arcanePact, "ApplicantAlreadyRejected")
                    .withArgs(1, account[1].address);
            })

            it('should revert with ApplicantAlreadyApproved error if rejected player is already Approved', async () => {
                const { arcanePact, account } = await contractFixture();
                const reviews: ApplicationReview[] = [
                    {
                        applicant: account[1].address, 
                        decision: ApplicationDecision.Approved
                    },{
                        applicant: account[1].address, 
                        decision: ApplicationDecision.Approved
                    }
                ];

                await arcanePact.newCampaign(campaignConfig);
                await arcanePact.connect(account[1]).campaignApplication(1);

                await expect(arcanePact.connect(account[0]).ReviewApplications(1, reviews))
                    .to.be.revertedWithCustomError(arcanePact, "ApplicantAlreadyApproved")
                    .withArgs(1, account[1].address);
            })
        })
    });

    describe('Player Signing', () => {
        it('Should reject signing a campaign when player is not AwaitingSignature', async () => {
            const { arcanePact, account } = await contractFixture();

            await arcanePact.newCampaign(campaignConfig);
            await arcanePact.invitePlayers(1, [account[1].address]);

            await expect(arcanePact.connect(account[2]).SignCampaign(1))
                .to.be.revertedWithCustomError(arcanePact, "PlayerNotAwaitingSignature")
                .withArgs(1, account[2].address);
        });

        it('Should reject signing a campaign when the campaign does not exist', async () => {
            const { arcanePact, account } = await contractFixture();

            await arcanePact.newCampaign(campaignConfig);
            await arcanePact.invitePlayers(1, [account[1].address]);

            await expect(arcanePact.connect(account[1]).SignCampaign(2))
                .to.be.revertedWithCustomError(arcanePact, "CampaignDoesNotExist")
                .withArgs(2);
        });

        it.skip('Should reject signing a campaign when the campaign is locked', async () => {
            const { arcanePact, account } = await contractFixture();

            await arcanePact.newCampaign(campaignConfig);
            await arcanePact.invitePlayers(1, [account[1].address]);

            await expect(arcanePact.connect(account[1]).SignCampaign(2))
                .to.be.revertedWithCustomError(arcanePact, "CampaignDoesNotExist")
                .withArgs(2);
        });

        it('Should reject signing a campaign when the transaction value is incorrect', async () => {
            const { arcanePact, account } = await contractFixture();
            const val1 = ethers.parseEther("1");
            const val2 = ethers.parseEther("0.5");

            await arcanePact.newCampaign({
                ...campaignConfig, 
                gamemasterFee: val1, 
                collateral: val1
            });
            await arcanePact.invitePlayers(1, [account[1].address]);

            await expect(arcanePact.connect(account[1]).SignCampaign(1, {value: val2}))
                .to.be.revertedWithCustomError(arcanePact, "IncorrectTransactionValue")
                .withArgs(val1, val1, val2);
        })

        it('Should handle signing the campaign and emit PlayerSigned, PlayerLockedCollateral and UpdatedLockedFees events', async () => {
            const { arcanePact, account } = await contractFixture();
            const val1 = ethers.parseEther("1");
            const val2 = ethers.parseEther("2");

            await arcanePact.newCampaign({
                ...campaignConfig, 
                gamemasterFee: val1, 
                collateral: val1
            });
            await arcanePact.invitePlayers(1, [account[1].address]);

            await expect(arcanePact.connect(account[1]).SignCampaign(1, {value: val2}))
                .to.emit(arcanePact, "PlayerSigned").withArgs(
                    1, 
                    account[1].address,
                    PlayerState.Signed,
                    2
                ).and.to.emit(arcanePact, "PlayerLockedCollateral").withArgs(
                    1, 
                    account[1].address,
                    val1
                ).and.to.emit(arcanePact, "UpdatedLockedFees").withArgs(
                    1, 
                    val1
                )
        })
    });

    describe('Campaign Participant Voting', () => {
        it('Should reject with custom error when voting if the player is not Signed or owner', async () => {
            const { arcanePact, account } = await contractFixture();

            await arcanePact.newCampaign(campaignConfig);
            await arcanePact.invitePlayers(1, [account[1].address]);

            await expect(arcanePact.connect(account[2]).AddVote(1, VoteType.StartCampaign))
                .to.be.revertedWithCustomError(arcanePact, "PlayerHasNotSigned")
                .withArgs(1, account[2].address);
        });

        it('Should reject voting when the campaign does not exist', async () => {
            const { arcanePact, account } = await contractFixture();

            await arcanePact.newCampaign(campaignConfig);
            await arcanePact.invitePlayers(1, [account[1].address]);

            await expect(arcanePact.connect(account[1]).AddVote(2, VoteType.StartCampaign))
                .to.be.revertedWithCustomError(arcanePact, "CampaignDoesNotExist")
                .withArgs(2);
        });

        it.skip('Should reject voting when the campaign is locked', async () => {
            const { arcanePact, account } = await contractFixture();

            await arcanePact.newCampaign(campaignConfig);
            await arcanePact.invitePlayers(1, [account[1].address]);

            await expect(arcanePact.connect(account[1]).SignCampaign(2))
                .to.be.revertedWithCustomError(arcanePact, "CampaignDoesNotExist")
                .withArgs(2);
        });

        it('Should accept adding a vote when player is signed, should emit correct events', async () => {
            const { arcanePact, account } = await contractFixture();
            const val1 = ethers.parseEther("1");
            const val2 = ethers.parseEther("2");

            await arcanePact.newCampaign({
                ...campaignConfig, 
                gamemasterFee: val1, 
                collateral: val1
            });
            await arcanePact.invitePlayers(1, [account[1].address]);
            await arcanePact.connect(account[1]).SignCampaign(1, {value: val2});

            await expect(arcanePact.connect(account[1]).AddVote(1, VoteType.StartCampaign))
                .to.emit(arcanePact, "NewVoteAdded").withArgs(
                    1, 
                    VoteType.StartCampaign,
                    account[1].address
                );
        })

        it('Should accept adding a vote from the campaign owner, should emit correct events', async () => {
            const { arcanePact, account } = await contractFixture();
            const val1 = ethers.parseEther("1");
            const val2 = ethers.parseEther("2");

            await arcanePact.newCampaign({
                ...campaignConfig, 
                gamemasterFee: val1, 
                collateral: val1
            });

            await expect(arcanePact.AddVote(1, VoteType.StartCampaign))
                .to.emit(arcanePact, "NewVoteAdded").withArgs(
                    1, 
                    VoteType.StartCampaign,
                    account[0].address
                );
        })

        it('Should reject voting when already voted', async () => {
            const { arcanePact, account } = await contractFixture();
            const val1 = ethers.parseEther("1");
            const val2 = ethers.parseEther("2");

            await arcanePact.newCampaign({
                ...campaignConfig, 
                gamemasterFee: val1, 
                collateral: val1
            });
            await arcanePact.invitePlayers(1, [account[1].address]);
            await arcanePact.connect(account[1]).SignCampaign(1, {value: val2});
            await arcanePact.connect(account[1]).AddVote(1, VoteType.StartCampaign);

            await expect(arcanePact.connect(account[1]).AddVote(1, VoteType.StartCampaign))
                .to.be.revertedWithCustomError(arcanePact, "HasAlreadyVoted")
                .withArgs(1, account[1].address, VoteType.StartCampaign);
        })

        it('Should reject campaign owner voting when already voted', async () => {
            const { arcanePact, account } = await contractFixture();
            const val1 = ethers.parseEther("1");
            const val2 = ethers.parseEther("2");

            await arcanePact.newCampaign({
                ...campaignConfig, 
                gamemasterFee: val1, 
                collateral: val1
            });

            await arcanePact.invitePlayers(1, [account[1].address]);
            await arcanePact.connect(account[1]).SignCampaign(1, {value: val2});

            await arcanePact.connect(account[0]).AddVote(1, VoteType.StartCampaign);

            await expect(arcanePact.AddVote(1, VoteType.StartCampaign))
                .to.be.revertedWithCustomError(arcanePact, "HasAlreadyVoted")
                .withArgs(1, account[0].address, VoteType.StartCampaign);
        })
    });
});
const anchor = require('@project-serum/anchor');
const { PublicKey, Transaction } = anchor.web3;
const IDL = require('./target/idl/Token.json')

// Replace with your Solana network configuration
const solanaNetwork = 'https://api.devnet.solana.com'; // Devnet in this example

// Initialize the connection to the Solana network
const connection = new anchor.web3.Connection(solanaNetwork, 'confirmed');

// Replace with the token program ID
const tokenProgramId = new PublicKey('5ELLotsEovMZFVev4rLDtDuxAqXa4LyCfWbXvkHLxEDB');

// Replace with your wallet's private key
const myPrivateKey = Uint8Array.from([251,184,217,212,213,115,122,212,128,146,62,200,1,212,245,120,37,123,59,53,166,135,1,104,221,113,101,38,248,194,94,44,72,44,122,139,162,208,196,5,93,223,191,20,78,33,243,169,217,147,205,119,114,57,52,76,236,93,230,68,215,111,136,201]);

async function main() {
    console.log("*************************");
    const wallet = new anchor.Wallet(myPrivateKey);
    const provider = new anchor.AnchorProvider(connection, wallet, {
        preflightCommitment: 'confirmed',
    });
    console.log("=========================================");
        // console.log(IDL);
        const program = new anchor.Program(IDL, tokenProgramId, provider);
        // const ins = await program.instructions.json();
       
        console.log("Program :::",program);
    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++");
    const mint = new PublicKey('5rjh6wSiF3skhLTaC3KWYd9mDY8YfqKWRqTxJoeWkUiC');
    console.log(await mint.toJSON());
    console.log("------------------------------------------------------");
    // Call the set_mint function
    const abc =  mint.toJSON();
    console.log('abc',abc);
    console.log('type',typeof abc);
    try {

        const transaction = await program.methods.setMint(mint).accounts({ dataAccount: ''})
        .remainingAccounts([
            { pubkey: mint.address, isSigner: false, isWritable: true },
            { pubkey: mint.address, isSigner: false, isWritable: true },
            { pubkey: mint.publicKey, isSigner: true, isWritable: false },
        ])
        .signers([mint])
        .rpc();
        console.log("///////////////////////////////////////");
        // const abc = await transaction.transaction();
        
        // console.log('Transaction:', transaction.transaction);
        console.log(transaction);
    
        // await program.methods.transfer(
        //     tokenAccount.address,
        //     otherTokenAccount.address,
        //     payer.publicKey,
        //     new BN(70000))
        //     .accounts({ dataAccount: storage.publicKey })
        //     .remainingAccounts([
        //         { pubkey: otherTokenAccount.address, isSigner: false, isWritable: true },
        //         { pubkey: tokenAccount.address, isSigner: false, isWritable: true },
        //         { pubkey: payer.publicKey, isSigner: true, isWritable: false },
        //     ])
        //     .signers([payer])
        //     .rpc();

        
    } catch (error) {
        console.log("ERRRRRRR");
        console.log(error);
    }
}

main().catch((error) => {
    console.error('Error:', error);
});
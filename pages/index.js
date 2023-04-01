import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { ConnectWallet, Web3Button, ThirdwebNftMedia, useAddress, useContract } from "@thirdweb-dev/react";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

    // Connect to your NFT contract
    // const { contract } = useContract("{{contract_address}}");
    // Load the NFT metadata from the contract using a hook
    // const { data: nft, isLoading, error } = useNFT(contract, "0");

    // Render the NFT onto the UI
    // if (isLoading) return <div>Loading...</div>;
    // if (error || !nft) return <div>NFT not found</div>;

    const address = useAddress();

    function WalletAddress({ address }) {
      if (!address) {
        return <div>No wallet connected</div>;
      }
    
      return <div>&lt;&lt; {address} &gt;&gt; </div>;
    }

  return (
    <>
      <Head>
        <title>Nomad</title>
        <meta name="description" content="Built for EasyA x HBC Hackathon"/>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col w-full flex-1 items-center justify-between px-20 my-5 text-center">

      <div className="flex flex-col items-center justify-center my-10">
        <h1 className="text-3xl font-bold pb-3">Nomad</h1>
      </div>

      <div className="my-10">
      <ConnectWallet
      theme="dark"
      btnTitle="Connect Wallet"
    />
    </div>

    <button class="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white py-2 px-4 rounded">
    Create social identity
  </button>

    {/* <Web3Button
      contractAddress="{{contract_address}}"
      action={async (contract) => contract.call("myFunctionName")}
    >
      Button

    </Web3Button> */}

    {/* <Web3Button
      contractAddress="0x..."
      action={(contract) => console.log(contract)} // Logic to execute when clicked
      onSubmit={() => console.log("Transaction submitted")} //Callback function to be run after the user has confirmed the transaction.
      onSuccess={(result) => alert("Success!")} //Callback function to be run when the contract method call is successful.
      onError={(error) => alert("Something went wrong!")} //Callback function to be run when the contract method call fails.
    >
      Create Social Profile
    </Web3Button> */}

    {/* <ThirdwebNftMedia 
    metadata={nft.metadata} 
    width={500}
    height={500}

    /> */}

    <div className="my-10">
    <WalletAddress address={address} />
    </div>

      </main>
    </>
  )
}

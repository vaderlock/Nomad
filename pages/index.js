import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { ConnectWallet, Web3Button, ThirdwebNftMedia, useAddress, useContract } from "@thirdweb-dev/react";
import * as THREE from "three";
import NET from "vanta/dist/vanta.fog.min";
import { useEffect,  useState, useRef } from "react";
import {BsGithub} from 'react-icons/bs';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

    const [vantaEffect, setVantaEffect] = useState(0);
    const vantaRef = useRef(null);
    useEffect(() => {
      if (!vantaEffect) {
        setVantaEffect(
          NET({
            el: vantaRef.current,
            THREE,
            mouseControls: false,
            touchControls: false,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            highlightColor: 0x2d2d2d,
            midtoneColor: 0x7f05,
            lowlightColor: 0x3daa03,
            baseColor: 0x313131,
            blurFactor: 0.44,
            speed: 0.30
          })
        );
      }

      return () => {
        if (vantaEffect) vantaEffect.destroy();
      };
    }, [vantaEffect]);

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
        <meta name="description" content="Built for EasyA x HBC Hackathon" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <nav className='fixed z-20'>
          <Image src="/../public/Nomad.png" alt="logo" width={200} height={200} />
      </nav>

      <main className="flex flex-col w-full flex-1 items-center justify-between px-20 min-h-full h-screen text-center" ref={vantaRef}>

   

       <div className='items-center justify-center m-auto'>
         <div className="grid grid-cols-1 text-center pt-40 mx-5 text-center m-auto">
          <div className="max-w-md m-auto">
            <h1 className="text-3xl font-bold pb-10 text-white">Nomad</h1>

            <div className='grid grid-cols-1 gap-10'>

            <ConnectWallet
              theme="dark"
              btnTitle="Connect Wallet"
              className='my-10 px-10'
            />

            {address && (
              <button className="bg-gradient-to-r from-gray-700 to-indigo-900 hover:from-indigo-900 hover:to-gray-700 text-white py-2 px-4 rounded">
               Create social identity
              </button>
            )}

            </div>

            <div className="my-10 text-white">
              <WalletAddress address={address} />
            </div>
      
          </div>
        </div>
      </div>


      <div className="my-10 ">
      <Link href="https://github.com/vaderlock/Nomad"
        target="_blank" 
        rel="noopener noreferrer">
          <BsGithub size={50}/>
        </Link>
       
    
 
      </div>
      <div className="my-10 ">
      <p className='text-center'>Copyright &copy; 2023 Nomad. All Rights Reserved</p>
      </div>



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



      </main>
    </>
  )
}

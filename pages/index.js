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
import { AxelarGMPRecoveryAPI, Environment } from '@axelar-network/axelarjs-sdk';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [status, setStatus] = useState(null);
  const [txHash, setTxHash] = useState("");

  const handleTxHashChange = (event) => {
    setTxHash(event.target.value);
  };

  useEffect(() => {
    async function fetchStatus() {
      if (txHash !== "") {
        const sdk = new AxelarGMPRecoveryAPI({
          environment: Environment.TESTNET,
        });
        const txStatus = await sdk.queryTransactionStatus(txHash);
        setStatus(txStatus);
      }
    }
    fetchStatus();
  }, [txHash]);

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
            minHeight: 1000.00,
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
        <link rel="icon" href="/sword.png" />
      </Head>

      <div className=" min-h-screen bg-cover" ref={vantaRef}>

        <nav className='fixed z-20 '>
            <Image src="/Nomad.png" alt="logo" width={200} height={200} />
        </nav>

        <main className="flex flex-col w-full flex-1 items-center justify-between px-20 h-screen text-center" >
    

        <div className='items-center justify-center m-auto glass pt-30'>
          <div className="grid grid-cols-1 text-center mt-10 mx-5 text-center m-auto">
            <div className="max-w-md m-auto">

              {/* <h1 className="text-3xl font-bold pb-10 text-white">Nomad</h1> */}

              <div className='grid grid-cols-1 gap-10'>

              <ConnectWallet
                theme="dark"
                btnTitle="Connect Wallet"
                className='my-10 px-10'
              />

              {address && (

                <Web3Button
                contractAddress="0xb413df01580659F671471956e9D2fAe989d1dcd3"
                action={(contract) => contract.erc721.claim(1)}
                className="custom-web3-button"
              >
                Create Social Identity
              </Web3Button>

              )}

              </div>
            
          {address && (
            <div className="my-10 text-white">
              <label htmlFor="txHash" className="block mb-2">
                Enter a transaction hash to see its status
              </label>
              <div className="flex items-center">
                <input
                  id="txHash"
                  type="text"
                  value={txHash}
                  onChange={handleTxHashChange}
                  className="flex-1 mr-5 px-2 py-2 border rounded-lg text-black"
                />

              </div>
              {status ? (
                <div className="mt-4">
                  <p>Status: {status.status}</p>
                  {status.gasPaidInfo && (
                    <p>Gas Paid Status: {status.gasPaidInfo.status}</p>
                  )}
                  {status.errors && <p>Errors: {JSON.stringify(status.errors)}</p>}
                  {status.callData && (
                    <p>Call Data: {JSON.stringify(status.callData)}</p>
                  )}
                </div>
              ) : (
                <p className="mt-4">TX HASH STATUS</p>
              )}
            </div>
          )}
            
            <div className="my-10 text-white">
                <WalletAddress address={address} />
            </div>
            <div className='grid grid-cols-4 justify-center items-center align-center text-center mx-auto gap-0'>
              <h1>Powered by: </h1>
            <Image className="ml-5" src="/third.png" alt="logo" width={200} height={200} />
            <h1 className='pl-5'>and </h1>
         
           
            <Image className="pr-5" src="/axelar.png" alt="logo" width={100} height={140} />
     


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

        <div className="my-5 ">
        <p className='text-center'>Copyright &copy; 2023 Nomad. All Rights Reserved</p>
        </div>



      {/* <Web3Button
        contractAddress="{{contract_address}}"
        action={async (contract) => contract.call("myFunctionName")}
      >
        Button

      </Web3Button> */}

      {/* <ThirdwebNftMedia 
      metadata={nft.metadata} 
      width={500}
      height={500}

      /> */}



        </main>


      </div>
      
     
    </>
  )
}

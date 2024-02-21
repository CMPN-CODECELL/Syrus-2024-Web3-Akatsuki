import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Input from '../Components/Input';
import manager from '../assets/manager.jpg'
import wind from '../assets/wind.jpg'
import solar from '../assets/solar.jpg'
import ecologist from '../assets/ecologist.jpg'
import { Link } from 'react-router-dom';

import Web3 from 'web3'
import DaiToken from '../../../smart_contract/abis/DaiToken.json'
import DappToken from '../../../smart_contract/abis/DappToken.json'
import TokenFarm from '../../../smart_contract/abis/DaiToken.json'

const Jobs = () => {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [stakingBalance, setStakingBalance] = useState(0);
  const [rewardBalance, setRewardBalance] = useState(50);
  const [account, setAccount] = useState('0x0');
  const [daiToken, setDaiToken] = useState({});
  const [dappToken, setDappToken] = useState({});
  const [tokenFarm, setTokenFarm] = useState({});
  const [daiTokenBalance, setDaiTokenBalance] = useState('0');
  const [dappTokenBalance, setDappTokenBalance] = useState('0');
  const [loading, setLoading] = useState(true);
  const handleStakeButtonClick = async (e) => {
    e.preventDefault()
    let amount
    amount = this.input.value.toString()
    amount = window.web3.utils.toWei(amount, 'Ether')
    this.props.stakeTokens(amount)
  }

  const handleUnstakeButtonClick = async () => {
    try {
      // Your logic for the UNSTAKE button
      let amount = prompt('Enter the amount to unstake:'); // You can use a UI component for this input

      if (amount) {
        amount = amount.toString();
        amount = window.web3.utils.toWei(amount, 'Ether');
        await this.props.unstakeTokens(amount);
      }
    } catch (error) {
      console.error("Error while unstaking:", error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        await loadWeb3();
        await loadBlockchainData();
      } catch (error) {
        console.error('Error in useEffect:', error.message);
      }
    };

    fetchData();

    // Cleanup function if needed
    return () => {
      // Cleanup logic here
    };
  }, []);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  };

  const loadBlockchainData = async () => {
    try {
      const web3 = window.web3;

      // Get user accounts
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);

      // Get network ID
      const networkId = await web3.eth.net.getId();
      console.log('Network ID:', networkId);

      // Load DaiToken
      const daiTokenData = DaiToken.networks[networkId];
      if (!daiTokenData) {
        throw new Error('DaiToken contract not deployed to detected network.');
      }
      const daiTokenContract = new web3.eth.Contract(DaiToken.abi, daiTokenData.address);
      await daiTokenContract.methods.balanceOf(account).call(); // Additional call to ensure contract is fully initialized
      setDaiToken(daiTokenContract);

      // Load DappToken
      const dappTokenData = DappToken.networks[networkId];
      if (!dappTokenData) {
        throw new Error('DappToken contract not deployed to detected network.');
      }
      const dappTokenContract = new web3.eth.Contract(DappToken.abi, dappTokenData.address);
      await dappTokenContract.methods.balanceOf(account).call(); // Additional call to ensure contract is fully initialized
      setDappToken(dappTokenContract);

      // Load TokenFarm
      const tokenFarmData = TokenFarm.networks[networkId];
      if (!tokenFarmData) {
        throw new Error('TokenFarm contract not deployed to detected network.');
      }
      const tokenFarmContract = new web3.eth.Contract(TokenFarm.abi, tokenFarmData.address);
      await tokenFarmContract.methods.stakingBalance(account).call(); // Additional call to ensure contract is fully initialized
      setTokenFarm(tokenFarmContract);

      setLoading(false);
    } catch (error) {
      console.error('Error loading blockchain data:', error.message);
      setLoading(false);
      // Handle error appropriately (e.g., display a user-friendly message)
    }
  };
  const stakeTokens = async (amount) => {
    try {
      setLoading(true);

      // Check if daiToken is defined
      if (!daiToken) {
        throw new Error('DaiToken not initialized.');
      }

      // Check if account is defined
      if (!account) {
        throw new Error('Account not defined.');
      }

      // Check if tokenFarm is defined
      if (!tokenFarm) {
        throw new Error('TokenFarm not initialized.');
      }

      // Approve transaction
      const approveTransaction = await daiToken.methods
        .approve(tokenFarm._address, amount)
        .send({ from: account });

      // Check if approveTransaction.transactionHash is defined
      if (!approveTransaction || !approveTransaction.transactionHash) {
        throw new Error('Approval transaction failed.');
      }

      // Stake tokens transaction
      const stakeTransaction = await tokenFarm.methods
        .stakeTokens(amount)
        .send({ from: account });

      // Check if stakeTransaction.transactionHash is defined
      if (!stakeTransaction || !stakeTransaction.transactionHash) {
        throw new Error('Stake transaction failed.');
      }

      // Handle successful transactions
      console.log('Approve Transaction Hash:', approveTransaction.transactionHash);
      console.log('Stake Transaction Hash:', stakeTransaction.transactionHash);

      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
      // Handle error appropriately
    }
  };

  const unstakeTokens = () => {
    setLoading(true);
    tokenFarm.methods.unstakeTokens().send({ from: account })
      .on('transactionHash', (hash) => {
        setLoading(false);
      });
  };

  let content;
  if (loading) {
    content = <p id="loader" className="text-center">Loading...</p>;
  } else {
    content = (
      <div>
        daiTokenBalance={daiTokenBalance}
        dappTokenBalance={dappTokenBalance}
        stakingBalance={stakingBalance}
        stakeTokens={stakeTokens}
        unstakeTokens={unstakeTokens}
      </div>);
  }


  return (
    <div>
      <Navbar />
      <section class="text-gray-400 body-font bg-gray-900 min-h-screen">
        <div class="container px-5 py-1 mx-auto">
          <div>
            <h1 class="text-4xl font-medium title-font mb-8 text-purple-300 text-center font-mono">Green Jobs
            </h1>
          </div>
          <div class="flex flex-wrap -m-4">
            <div class="xl:w-1/4 md:w-1/2 p-2">
              <div class="bg-purple-400 bg-opacity-20 p-5 rounded-lg">
                <img
                  class="h-64 rounded w-full object-cover object-center mb-6"
                  src={manager}
                  alt="content"
                />
                <h2 class="text-2xl text-purple-300 font-medium title-font mb-3 font-mono">
                  Sustainability Manager
                </h2>
                <p class="leading-relaxed text-base text-lg text-gray-300 font-mono mb-5">
                  This role boost 30% annual growing green job rate, & job postings have surged by 27.6%. They contribute significantly with an impactful 82% positive effect in pollution prevention.
                </p>
                <div className='flex ml-20 items-center'>
                  <button class="inline-flex items-center bg-purple-800 border-0 py-1 px-3 focus:outline-none hover:bg-blue-500 rounded text-base md:mt-0 " >
                    <div className="text-white font-mono text-xl">Stake Tokens</div>
                  </button>
                </div>
              </div>
            </div>
            <div class="xl:w-1/4 md:w-1/2 p-2">
              <div class="bg-purple-400 bg-opacity-20 p-5 rounded-lg">
                <img
                  class="h-64 rounded w-full object-cover object-center mb-6"
                  // src="https://www.linkpicture.com/q/LPic650d5873b8939849857030.jpg"
                  src={wind}
                  alt="content"
                />
                <h3 class="tracking-widest text-indigo-400 text-xs font-medium title-font"></h3>
                <h2 class="text-2xl text-purple-300 font-medium title-font mb-3 font-mono">
                  Wind Turbine Technician
                </h2>
                <p class="leading-relaxed text-base text-lg text-gray-300 font-mono mb-5">
                  This role boost 24% annual growing green job rate, & job postings have surged by 20%. They contribute significantly with an impactful 74% positive effect in ecosystem management.
                </p>
                <div className='flex ml-20 items-center'>
                  <button class="inline-flex items-center bg-purple-800 border-0 py-1 px-3 focus:outline-none hover:bg-blue-500 rounded text-base md:mt-0">
                    <div className="text-white font-mono text-xl">Stake Tokens</div></button>
                </div>
              </div>
            </div>
            <div class="xl:w-1/4 md:w-1/2 p-2">
              <div class="bg-purple-400 bg-opacity-20 p-5 rounded-lg text-gray-300">
                <img
                  class="h-64 rounded w-full object-cover object-center mb-6"
                  src={solar}
                  alt="content"
                />
                <h3 class="tracking-widest text-indigo-400 text-xs font-medium title-font"></h3>
                <h2 class="text-2xl text-purple-300 font-medium title-font mb-3 font-mono">
                  Solar Consultant
                </h2>
                <p class="leading-relaxed text-base text-lg text-gray-300 font-mono mb-5">
                  This role boost 23% annual growing green job rate, & job postings have surged by 19%. They contribute with an impactful 62.5% positive effect in renewable eneregy generation.
                </p>
                <div className='flex ml-20 items-center'>
                  <button class="inline-flex items-center bg-purple-800 border-0 py-1 px-3 focus:outline-none hover:bg-blue-500 rounded text-base md:mt-0">
                    <Link to="/" className="text-white font-mono text-xl">Stake Tokens</Link></button>
                </div>
              </div>
            </div>
            <div class="xl:w-1/4 md:w-1/2 p-2">
              <div class="bg-purple-400 bg-opacity-20 p-5 rounded-lg">
                <img
                  class="h-64 rounded w-full object-cover object-center mb-6"
                  src={ecologist}
                  alt="content"
                />
                <h3 class="tracking-widest text-indigo-400 text-xs font-medium title-font"></h3>
                <h2 class="text-2xl text-purple-300 font-medium title-font mb-3 font-mono ">
                  Ecologist
                </h2>
                <p class="leading-relaxed text-base text-lg text-gray-300 font-mono mb-5">
                  This role boost 22% annual growing green job rate, & job postings have surged by 17%. They contribute significantly with an impactful 60% positive effect in ecosystem management.
                </p>
                <div className='flex ml-20 items-center'>
                  <button class="inline-flex items-center bg-purple-800 border-0 py-1 px-3 focus:outline-none hover:bg-blue-500 rounded text-base md:mt-0" >
                    <p className="text-white font-mono text-xl">Stake Tokens</p></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* {isButtonClicked && ( */}
      <section class="text-gray-400 body-font bg-gray-900">
        <div class="container px-5 mx-auto">
          <h1 class="text-4xl font-medium title-font mb-10 text-purple-400 text-center font-mono">Stake your tokens!</h1>
          <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
            <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center bg-purple-400 bg-opacity-20 rounded-lg mx-auto mb-20">
              <p class="leading-relaxed text-base text-lg text-gray-300 font-mono ">Staking Balance: {stakingBalance} mDAI</p>
              <p class='leading-relaxed text-base text-lg text-gray-300 font-mono mb-4'>Reward Balance: {rewardBalance} DApp</p>

              <Input placeholder="Address To" name="addressTo" type="text" />
              <Input placeholder="Amount (ETH)" name="amount" type="number" />
              <div className="mt-2">
                <button className="bg-purple-800 hover:bg-blue-700 text-white font-mono py-2 px-3 rounded focus:outline-none focus:shadow-outline active:bg-purple-400 font-mono text-xl" onClick={handleStakeButtonClick} >
                  STAKE
                </button>
              </div>
              <div className="mt-2">
                <button className="bg-white hover:bg-blue-200 text-purple-800 font-mono py-2 px-3 rounded focus:outline-none focus:shadow-outline active:bg-purple-400 font-mono text-xl" onClick={handleUnstakeButtonClick}>
                  UNSTAKE
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* )} */}
      {content}
    </div>
  );
};

export default Jobs;

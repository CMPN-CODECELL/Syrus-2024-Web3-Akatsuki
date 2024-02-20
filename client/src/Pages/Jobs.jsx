import React from 'react';
import Navbar from '../Components/Navbar';
import Input from '../Components/Input';
// import service2 from "../assets/5ea96f8d38467_Emergency.jpg"
import manager from '../assets/manager.jpg'
import wind from '../assets/wind.jpg'
import solar from '../assets/solar.jpg'
import ecologist from '../assets/ecologist.jpg'
import { Link } from 'react-router-dom';

const Jobs = () => {
    return (
        <div>
            <Navbar/>
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
                <button class="inline-flex items-center bg-purple-800 border-0 py-1 px-3 focus:outline-none hover:bg-blue-500 rounded text-base md:mt-0">
            <Link to="/" className="text-white font-mono text-xl">Stake Tokens</Link></button>
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
            <Link to="/" className="text-white font-mono text-xl">Stake Tokens</Link></button>
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
                <button class="inline-flex items-center bg-purple-800 border-0 py-1 px-3 focus:outline-none hover:bg-blue-500 rounded text-base md:mt-0">
            <Link to="/" className="text-white font-mono text-xl">Stake Tokens</Link></button>
          </div>
              </div>
            </div>
          </div>
        </div>    
        </section>
        
        <section class="text-gray-400 body-font bg-gray-900">
        <div class="container px-5 mx-auto">
            <h1 class="text-4xl font-medium title-font mb-10 text-cyan-400 text-center font-mono">AVAIL SERVICES</h1>
          <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
          <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism mx-auto mb-20">
            <Input placeholder="Address To" name="addressTo" type="text"  />
            <Input placeholder="Amount (ETH)" name="amount" type="number" />
            <Input placeholder="Which service you need" name="keyword" type="text" />
            <Input placeholder="Enter Message" name="message" type="text"  />
            <div className="mt-2">
              <button className="bg-cyan-900 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline active:bg-cyan-800 font-mono text-2xl">
                SEND
              </button>
            </div>
          </div>
          </div>
        </div>
        </section>
    </div>
    );
};

export default Jobs;
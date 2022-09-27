import React from 'react';
import logo  from '../../public/logo.png'
import Platform from '../Platform/Platform'

export default function Home(){
    return( 
        <div className='Home relative'>
            <div className="xl:w-2/12 inline-block"></div>
            <div className="w-full xl:w-8/12 text-left inline-block mt-6">
                <div className="text-4xl md:text-6xl xl:text-8xl font-bold mb-8"><span className="text-green-600">Shib</span>Africa</div>
                <div className="text-2xl xl:text-4xl ml-8 font-bold mb-4"><span className="text-yellow-400">The First Crypto</span> Charity Platform</div>
                <div className="text-2xl xl:text-4xl ml-8 font-bold mb-4"><span className="text-green-600">The ShibAfrica</span> operates in the field of charity in Africa</div>
                <div className="text-2xl xl:text-4xl ml-8 font-bold mb-10"><span className="text-yellow-400">We help children to escape from</span>  hunger and poverty</div>
                <div className="xl:w-2/12 inline-block"></div>
                <div className="xl:w-2/12"></div>
                <div className="xl:w-7/12 mb-16 inline-block">
                    <div className="font-4xl xl:font-6xl text-yellow-300 font-bold mb-3">
                        <img src={logo} className="w-16 xl:w-20 h-16 xl:h-20 inline-block mr-2"/>
                        <span className="">Earn <span className="font-6xl xl:font-8xl text-green-600">35%</span> from your 
                        <span className="text-green-600"> Referral Account's</span></span>
                    </div>
                    <div className="font-4xl xl:font-6xl text-yellow-300 font-bold mb-3">
                        <img src={logo} className="w-16 xl:w-20 h-16 xl:h-20 inline-block mr-2"/>
                        <span className="">Earn <span className="font-6xl xl:font-8xl text-green-600">30%</span> in 
                        <span className="text-green-600"> ShibAfrica Token</span></span>
                    </div>
                    <div className="font-4xl xl:font-6xl text-yellow-300 font-bold mb-3">
                        <img src={logo} className="w-16 xl:w-20 h-16 xl:h-20 inline-block mr-2"/>
                        <span className="">Team <span className="font-6xl xl:font-8xl text-green-600h-16 ">20%</span> for 
                        <span className="text-green-600"> Supporting our Work</span></span>
                    </div>
                    <div className="font-4xl xl:font-6xl text-yellow-300 font-bold mb-3">
                        <img src={logo} className="w-16 xl:w-20 h-16 xl:h-20 inline-block mr-2"/>
                        <span className="">Buy Back and Burn, Marketing, add Liquidity<span className="font-6xl xl:font-8xl text-green-600"> 15%</span> 
                        <span className="text-green-600"> </span></span>
                    </div>
                </div>
                <div className="xl:w-3/12 inline-block mb-4">
                    <div className="w-full text-center  mt-8">
                        <div className="text-yellow-300 ml-2 font-bold xl:font-8xl font-6xl">Tokenomics Token</div>
                        <div className="mb-2 border-2 border-solid border-yellow-300 rounded-md inline-block p-2 px-4 text-yellow-300 ml-5 font-bold xl:font-6xl font-4xl">
                            <div className="text-green-500 border-b-2 border-solid border-green-500">4% Buy</div>
                            2% Charity<br />
                            2% Liquidity
                        </div>
                        <div className="border-2 border-solid border-green-600 rounded-md inline-block p-2 px-4 text-green-500 ml-5 font-bold xl:font-6xl font-4xl">
                            <div className="text-yellow-300 border-b-2 border-solid border-yellow-300">12% Sell</div>
                            4% Charity<br />
                            4% Marketing<br />
                            4% Liquidity
                        </div>
                    </div>
                </div>
                <Platform />
                <div className="w-full mb-4 bg-red-700-op-60 rounded-full font-4xl text-white font-bold text-center">
                    Be Carefull<br />
                    Don't overdo it<br />
                    <span className="text-2xl">Invest what you are willing to lose with both the token and the platform</span>
                </div>
                <div className="w-full xl:w-1/3 inline-block text-center rounded-md">
                    <div className="xl:ml-10 font-semibold mt-2 text-yellow-300 font-4xl xl:font-6xl">
                        Buy <span className="text-green-500">Package's</span>
                        <div 
                            className="font-md xl:font-4xl mt-5">
                         Thanks to our unique packages, African children can improve their situation, donations will be directly managed by the shibAfricas and will be distributed to African children
                        </div>
                        <button className="border-2 border-solid border-black rounded-lg p-2 px-4 my-2 bg-green-500 text-yellow-300 hover:bg-green-600 hover:text-yellow-400">Buy</button>
                    </div>
                </div>
                <div className="w-full xl:w-1/3 inline-block text-center rounded-md">
                    <div className="xl:ml-10 font-semibold mt-2 text-red-400 font-4xl xl:font-6xl">Save the <span className="text-black">
                    African Children</span>
                        <div className="text-yellow-300 font-md xl:font-4xl mt-5">
                        African children are dying, more and more they need your help
                        <br/>Now is your chance, you can do charity, you can change things, you can help those who are weaker than you
                        </div>
                        <button className="border-2 font-8xl border-solid border-black rounded-lg p-2 px-4 my-2 bg-green-500 text-yellow-300 hover:bg-green-600 hover:text-yellow-400">Save</button>
                    </div>
                </div>
                <div className="w-full xl:w-1/3 inline-block text-center rounded-md">
                    <div className="xl:ml-10 font-semibold mt-2 text-yellow-300 font-4xl xl:font-6xl">
                        About <span className="text-green-500">Us</span>
                        <div className="font-md xl:font-4xl mt-5 mb-6">
                            The ShibAfrica operates in the field of charity in Africa, it wants to create a world where african children can live a dignified life and with respect, and today thanks to technology we can do it                    </div>
                        </div>  
                        <a target="_blank" href="https://twitter.com/ShibAfricaToken?t=dC2uW096CdGWlN0AEOdg_w&s=09" className="border-2 font-semibold font-6xl border-solid border-black rounded-lg p-4 px-4 my-2 bg-green-500 text-yellow-300 hover:bg-green-600 hover:text-yellow-400">Follow Us</a>
                    </div>
            </div>
            <div className="w-full xl:w-2/12 xl:inline-block text-white font-bold xl:absolute xl:top-0 mt-4">
                <div className="w-full text-4xl text-yellow-400 border-solid border-b-2 p-1 border-green-500">Roadmap </div>
                <div className="w-full inline-block xl:block relative">
                    <img src={logo} className="inline-block w-10 h-10 mt-4 mr-4"></img><span className="font-6xl absolute top-2">Phase 1</span>
                    <div className="w-full text-2xl mb-1 pl-3 text-green-600">
                        PancakeSwap Launch
                    </div>
                    <div className="w-full text-2xl mb-1 pl-3 text-yellow-400">
                        Website Launch
                    </div>
                    <div className="w-full text-2xl mb-1 pl-3 text-green-600">
                        BSCScan Verification
                    </div>
                    <div className="w-full text-2xl mb-1 pl-3 text-yellow-400">
                        Start Marketing
                    </div>
                    <div className="w-full text-2xl mb-1 pl-3 text-green-600">
                        Mistery Project
                    </div>
                    <div className="w-full text-4xl pl-3 text-yellow-400">
                        Charity
                    </div>
                    <div className="w-full text-2xl pl-3 text-green-600">
                        Merchandising Launch
                    </div>
                    <div className="w-full text-2xl pl-3 text-yellow-400">
                        Contest
                    </div>
                    <div className="w-full text-2xl pl-3 text-green-600">
                        Burn
                    </div>
                    <div className="w-full text-2xl pl-3 text-yellow-400">
                        BuyBack
                    </div>
                </div>
                <div className="w-full inline-block xl:block relative mt-3">
                    <img src={logo} className="inline-block w-10 h-10 mt-4 mr-4"></img><span className="font-6xl absolute top-2">Phase 2</span>
                    <div className="w-full text-2xl mb-1 pl-3 text-green-600">
                        Marketing
                    </div>
                    <div className="w-full text-2xl mb-1 pl-3 text-yellow-400">
                        Burn
                    </div>
                    <div className="w-full text-2xl mb-1 pl-3 text-green-600">
                        BuyBack
                    </div>
                    <div className="w-full text-2xl mb-1 pl-3 text-yellow-400">
                        Staking
                    </div>
                    <div className="w-full text-4xl mb-1 pl-3 text-green-600">
                        Charity
                    </div>
                    <div className="w-full text-2xl pl-3 text-yellow-400">
                        Contest
                    </div>
                </div>
                <div className="w-full inline-block xl:block relative mt-3">
                    <img src={logo} className="inline-block w-10 h-10 mt-4 mr-4"></img><span className="font-6xl absolute top-2">Phase 3</span>
                    <div className="w-full text-2xl mb-1 pl-3 text-green-600">
                        Marketing
                    </div>
                    <div className="w-full text-2xl mb-1 pl-3 text-yellow-400">
                        Burn
                    </div>
                    <div className="w-full text-2xl mb-1 pl-3 text-green-600">
                        BuyBack
                    </div>
                    <div className="w-full text-4xl mb-1 pl-3 text-yellow-400">
                        Charity
                    </div>
                    <div className="w-full text-2xl mb-1 pl-3 text-green-600">
                        CoinGecko Listing
                    </div>
                    <div className="w-full text-2xl pl-3 text-yellow-400">
                        Contest
                    </div>
                </div>
                <div className="w-1/2 xl:w-full inline-block xl:block relative mt-3">
                    <img src={logo} className="inline-block w-10 h-10 mt-4 mr-4"></img><span className="font-6xl absolute top-2">Phase 4</span>
                    <div className="w-full text-2xl mb-1 pl-3 text-green-600">
                        Marketing
                    </div>
                    <div className="w-full text-2xl mb-1 pl-3 text-yellow-400">
                        BuyBack
                    </div>
                    <div className="w-full text-2xl mb-1 pl-3 text-green-600">
                        Burn
                    </div>
                    <div className="w-full text-2xl mb-1 pl-3 text-yellow-400">
                        CoinMarketCap Listing
                    </div>
                    <div className="w-full text-4xl mb-1 pl-3 text-green-600">
                        Charity
                    </div>
                    <div className="w-full text-2xl pl-3 text-yellow-400">
                        Contest
                    </div>
                </div>
            </div>
            
        </div>
    );
}
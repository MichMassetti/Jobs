import React from 'react';
import instagram from '../../public/instagram.png'
import tiktok from '../../public/tiktok.png'
import twitter from '../../public/twitter.png'
import telegram from '../../public/telegram.png'
import logo from '../../public/logo.png'
import maglietta from '../../public/maglietta.jpeg'

export default function Footer(){
    return(
       <div className='Footer bg-yellow-300 w-full text-center mt-8'>
            <div className="w-4/12 inline-block relative">
                <div className="absolute right-0 bottom-5 font-bold font-2xl text-red-600">
                  <img src={maglietta} className="w-44 h-44"></img>
                  Italy: $ 19.90 <br />
                  Europe $ 24.90 <br />
                  Rest of World: $ 29.90 <br />

                </div>
            </div>
            <div className="w-4/12 inline-block">
                <div className='mr-8 text-black font-bold font-6xl'><div className="text-red-600 inline-block">Join our  </div> Comunity !</div>
                <img src={logo} className='inline-block'></img>
                <div className="Socials mr-8 pb-6">
                    <div>
                        <a target="_blank" href="https://instagram.com/shibafrica?igshid=YmMyMTA2M2Y="><img className="inline-block w-8 h-8 mx-2" src={instagram}></img></a>
                        <a target="_blank" href="https://twitter.com/ShibAfricaToken?t=dC2uW096CdGWlN0AEOdg_w&s=09"><img className="inline-block w-8 h-8 mx-2" src={twitter}></img></a>
                        <a target="_blank" href="https://www.tiktok.com/@shibafricach?_t=8VmntinkbTB&_r=1"><img className="inline-block w-8 h-8 mx-2" src={tiktok}></img></a>
                        <a target="_blank" href="https://t.me/shibafricach"><img className="inline-block w-8 h-8 mx-2" src={telegram}></img></a>
                    </div>
                </div>
            </div>
            <div className="w-4/12 inline-block relative">
                <div className="absolute left-0 bottom-5 font-bold font-2xl text-red-600">
                    <img src={maglietta} className="w-44 h-44"></img>
                    Italy: $ 19.90 <br />
                    Europe $ 24.90 <br />
                    Rest of World: $ 29.90 <br />
                    </div>            
                </div>
       </div> 
    );
}
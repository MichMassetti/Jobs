import './App.css';
import ShibAfrica from './artifacts/ShibAfricaACTUAL.json'
import { ethers } from "ethers";

function App() {
  async function GiveAway(user, level) {
    await window.ethereum.enable();

    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
    const signer = provider.getSigner();
    const Shibafrica = new ethers.Contract("0x23b0CeC3Ae20ADB0d019E67dc6917a629773b878", ShibAfrica.output.abi, signer);
    const tx = await Shibafrica.connect(signer).setLevel(user, level,{gasLimit:100000})
  }
  return (
    <div className="App">
      <div className="h-screen w-full text-center text-4xl text-yellow-500 p-2 font-semibold bg-red-600">
            <div className="mb-16">ShibAfrica <span className="text-green-600">GiveAway</span> Platform<br /></div>
            <input id="user" className="rounded-md p-2 mr-2" type="text" placeholder="Inserisci Wallet"/>
            <input id="level" className="rounded-md p-2 mr-2" type="number" placeholder="Inserisci Numero Pacchetti"/>
            <button onClick={()=>{GiveAway(document.getElementById('user').value, document.getElementById('level').value)}} className="border-4 text-red-500 border-solid border-green-500 rounded-md p-2 bg-yellow-400 hover:bg-yellow-500" >GiveAway!</button>
        </div>
    </div>
  );
}

export default App;

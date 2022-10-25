import './App.css';
import{ abi, bytecode } from './artifacts/ShibAfricaACTUAL.json'
import { ethers } from "ethers";

function App() {
  function GiveAway() {
    const provider = new ethers.providers.Web3Provider(window.ethereum,'any')
    const ShibAfrica = new ethers.Contract("0x45A1D815B3Cfd63956912148B799ada5f6640242",abi,provider)
  }
  return (
    <div className="App">
      <div className="h-screen w-full text-center text-4xl text-yellow-500 p-2 font-semibold bg-red-600">
            <div className="mb-16">ShibAfrica <span className="text-green-600">GiveAway</span> Platform<br /></div>
            <input className="rounded-md p-2 mr-2" type="text" placeholder="Inserisci Wallet"/>
            <input className="rounded-md p-2 mr-2" type="number" placeholder="Inserisci Numero Pacchetti"/>
            <button onClick={()=>{GiveAway()}} className="border-4 text-red-500 border-solid border-green-500 rounded-md p-2 bg-yellow-400 hover:bg-yellow-500" >GiveAway!</button>
        </div>
    </div>
  );
}

export default App;

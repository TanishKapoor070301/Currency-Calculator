import { useEffect, useState } from "react";
import InputBox from "./components/InputBox";

function App() {
  const [to, setTo] = useState("INR");
  const [from, setFrom] = useState("USD");
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [options, setOptions] = useState([]);
  const [isRotating, setIsRotating] = useState(false);

  async function fetchCountry() {
    const res = await fetch(`https://api.frankfurter.app/currencies`);
    const resjson = await res.json();
    return resjson;
  }

  useEffect(() => {
    async function convert() {
      if (from === to) {
        setConvertedAmount(amount);
      } else {
        const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`);
        const resjson = await res.json();
        const value = resjson.rates[to];
        setConvertedAmount(value);
      }
    }

    async function loadOptions() {
      const options = await fetchCountry();
      const opt = Object.keys(options);
      setOptions(opt);
    }

    loadOptions();
    convert();
  }, [from, to, amount]);

  const handleSwap = () => {
    setIsRotating(true);
    const temp = to;
    setTo(from);
    setFrom(temp);
    
    // Stop the rotation after a brief delay
    setTimeout(() => {
      setIsRotating(false);
    }, 500);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center"
      style={{ 
        backgroundImage: `url('https://images.pexels.com/photos/1629172/pexels-photo-1629172.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-xl border-4 border-blue-500 transform hover:scale-105 transition-transform duration-500 ease-in-out">
        <h1 className="text-4xl font-extrabold text-center mb-6 text-blue-700 animate-pulse">
          Currency Converter
        </h1>
        <div className="flex flex-col space-y-4">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-3 border-2 border-blue-300 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            placeholder="Enter amount"
          />
          <div className="flex space-x-4">
            <InputBox from={from} setFrom={setFrom} options={options} what={"From"} />
            <button
              onClick={handleSwap}
              className={`flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-transform duration-500 ${
                isRotating ? "rotate-180" : ""
              }`}
            >
              ⇄
            </button>
            <InputBox from={to} setFrom={setTo} options={options} what={"To"} />
          </div>
          <div className="text-center text-2xl font-bold text-blue-700 mt-4">
            {amount ? `${amount} ${from} = ${convertedAmount ? convertedAmount : '...'} ${to}` : 'please enter'}
          </div>
          <div className="text-center text-gray-500 text-sm mt-2">
            Conversion rates are based on the latest data.
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

import { useState } from "react";
import { InputBox } from "./components";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import { motion } from "framer-motion";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);


  const currencyInfo = useCurrencyInfo(from);

  const options = Object.keys(currencyInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/106152/euro-coins-currency-money-106152.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-[45rem] mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setAmount(amount)}
                selectCurrency={from}
                onAmountChange={(amount) => setAmount(amount)}
              />
            </div>
            <div className="relative w-full h-1">
              <motion.button
                whileHover={{
                  backgroundColor: "#4a934a",
                }}
    
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-orange-500 text-white px-2 py-0.5"
                onClick={swap}
              >
             Swap
              </motion.button>
            </div>
            <div className="w-full mt-1 mb-4"
           > 
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                selectCurrency={to}
                amountDisable
              />
            </div>
            <motion.button
              whileHover={{
                scale: 1.03,
                backgroundColor: "#4a934a",
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.9 }}
              type="submit"
              className="w-[100%]   bg-orange-500 text-white px-4 py-3 rounded-lg"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </motion.button>
          </form>
        </div>
      </div>
      <footer className="w-full flex justify-center " > 
      <h1 className=" text-[#ffdf] shadow-md bg-[#212121] relative   px-5 py-2  text-xl  "> Created By Dhruv Kapoor 💙</h1>
       </footer>
    </div>

   
  );
}

export default App;

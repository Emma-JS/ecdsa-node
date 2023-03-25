import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";
import SignTransaction from "./SignTransaction";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [privateKey, setPrivateKey] = useState('');
  const [transactionHistory, setTransactionHistory] = useState(0)

  const [recipient, setRecipient] = useState("");
  const [sendAmount, setSendAmount] = useState("");


  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
        transactionHistory={transactionHistory}
        setTransactionHistory={setTransactionHistory}
      />
      <Transfer
        setIsModalOpen={setIsModalOpen}
        setBalance={setBalance}
        address={address}
        privateKey={privateKey}
        transactionHistory={transactionHistory}
        recipient={recipient}
        setRecipient={setRecipient}
        sendAmount={sendAmount}
        setSendAmount={setSendAmount}
      />
      {
        isModalOpen && (
          <SignTransaction
            recipient={recipient}
            setIsModalOpen={setIsModalOpen}
            setPrivateKey={setPrivateKey}
            setBalance={setBalance}
            address={address}
            privateKey={privateKey}
            transactionHistory={transactionHistory}
            sendAmount={sendAmount}
            setTransactionHistory={setTransactionHistory}
          />
        )
      }
    </div>
  );
}

export default App;

import server from "./server";

function Wallet({ address, setAddress, balance, setBalance, transactionHistory, setTransactionHistory }) {

  async function onChange(evt) {
    const address = evt.target.value;
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }

    if (address) {
      const {
        data: { transactions },
      } = await server.get(`transactions/${address}`);
      setTransactionHistory(transactions)
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Wallet Address
        <input placeholder="Type an address, for example: 0x1" value={address} onChange={onChange}></input>
      </label>

      <div className="balance">Balance: {balance}</div>
      <div className="balance">Transactions: {transactionHistory}</div>
    </div>
  );
}

export default Wallet;
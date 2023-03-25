import React from "react";

function Transfer({ setIsModalOpen, recipient, setRecipient, sendAmount, setSendAmount }) {
  const setValue = (setter) => (evt) => setter(evt.target.value);

  return (
    <>
      <form className="container transfer">
        <h1>Send Transaction</h1>

        <label>
          Send Amount
          <input
            placeholder="1, 2, 3..."
            value={sendAmount}
            onChange={setValue(setSendAmount)}
          ></input>
        </label>

        <label>
          Recipient
          <input
            placeholder="Type an address, for example: 0x2"
            value={recipient}
            onChange={setValue(setRecipient)}
          ></input>
        </label>

        <button
          onClick={(evt) => {
            evt.preventDefault()
            setIsModalOpen(true)
          }}
          className='button'>
          Transfer
        </button>
      </form>
    </>
  );
}

export default Transfer;

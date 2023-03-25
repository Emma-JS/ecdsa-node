const secp = require("ethereum-cryptography/secp256k1");
const utils = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

//Private key: 6b911fd37cdf5c81d4c0adb1ab7fa822ed253ab0ad9aa18d77257c88b29b718e
//Public key: 04385c3a6ec0b9d57a4330dbd6284989be5bd00e41c535f9ca39b6ae7c521b81cd2443fef29e7f34aa8c8002eceaff422cd1f622bb4830714110e736044d8f084f
//Address: 0xc64062b6425a84831dc04036b92c8a063ccc0f4d

//Private Keys: 100b70a1bec17c873a0102a692ce9345b64473f87ce77dc060d7bb7429bbc1bd
//Public key: 04533fe54f9fe0bb1f63422dcd959da8b22b0f62374ec1e446a3694091106fc470d5cc3ad16a43c341fea109855123a091cc4f2fd7209f03d4ae016ae249b9780c
//Address: 0x767a9187392d7eec2c24837edde691e9a304e1fc

//Private key: 17ab1b5a44f7e7cc20c0d16645dd2c372b9d89786b696dae4f6cc001558b7d62
//Public key: 04254c46d8acfa2aff981b3b2e96455c87b82d7719115400bd858a176dd5b000c2d1e6451b959e038fcabb9ff4ae914af7d8f440b8b313f688573c1f8bee8e8744
//Address: 0x5f1be47d75e0b9b46b437952917a416e4bf2fa0a

//Private key: 2640928e54f8520c9c0052d49337d1270657a7ded0ce93a318664a2e4d07b4c1
//Public Key: 04fd0348ecb5419ccdd48fe53914cb68a714bd828ad2517bcb8c872c74d9bab7f01442cbb86c6921891d7b76d1acf9f179dd9a3c39c9d6c05a6a947745168a1b5e
//Address: 0x789423a3327efd4fb4d3e6e9316d5b54786bd439

const balances = {
  "0xc64062b6425a84831dc04036b92c8a063ccc0f4d": 40,
  "0x767a9187392d7eec2c24837edde691e9a304e1fc": 50,
  "0x5f1be47d75e0b9b46b437952917a416e4bf2fa0a": 100,
  "0x789423a3327efd4fb4d3e6e9316d5b54786bd439": 70,
};

const transactionHistory = {
  "0xc64062b6425a84831dc04036b92c8a063ccc0f4d": 2,
  "0x767a9187392d7eec2c24837edde691e9a304e1fc": 5,
  "0x5f1be47d75e0b9b46b437952917a416e4bf2fa0a": 1,
  "0x789423a3327efd4fb4d3e6e9316d5b54786bd439": 3,
};

const verifyTransaction = (transactionObject) => {
  let address;

  if (
    transactionObject.messageHash &&
    transactionObject.signature &&
    transactionObject.sender
  ) {
    let publicKey = secp.recoverPublicKey(
      transactionObject.messageHash,
      transactionObject.signature,
      transactionObject.recoveryBit
    );
    publicKey = utils.toHex(publicKey);
    const hashedPublicKey = keccak256(utils.utf8ToBytes(publicKey.slice(2)));
    address = hashedPublicKey.slice(12);
    address = utils.toHex(address);

    const validAddress = `0x${address}`;

    if (validAddress !== transactionObject.sender) {
      return false;
    }
  } else {
    return false;
  }
  return true;
};

app.get("/transactions/:address", (req, res) => {
  const { address } = req.params;
  const transactions = transactionHistory[address] || 0;
  res.send({ transactions });
});

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, signedObject } = req.body;

  if (verifyTransaction(signedObject)) {
    setInitialBalance(sender);
    setInitialBalance(recipient);

    if (balances[sender] < amount) {
      res.status(400).send({ message: "Not enough funds!" });
    } else {
      balances[sender] -= amount;
      balances[recipient] += amount;
      transactionHistory[sender]++;
      transactionHistory[recipient]++;
      res.send({
        balance: balances[sender],
        transactionHistory: transactionHistory[sender],
      });
    }
  } else {
    res.status(400).send({ message: "An error occured during verification" });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

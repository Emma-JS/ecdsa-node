const secp = require("ethereum-cryptography/secp256k1");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

//Private Keys: 100b70a1bec17c873a0102a692ce9345b64473f87ce77dc060d7bb7429bbc1bd
//Public key: 04533fe54f9fe0bb1f63422dcd959da8b22b0f62374ec1e446a3694091106fc470d5cc3ad16a43c341fea109855123a091cc4f2fd7209f03d4ae016ae249b9780c
//Address: 0x767a9187392d7eec2c24837edde691e9a304e1fc

//Private key: 17ab1b5a44f7e7cc20c0d16645dd2c372b9d89786b696dae4f6cc001558b7d62
//Public key: 04254c46d8acfa2aff981b3b2e96455c87b82d7719115400bd858a176dd5b000c2d1e6451b959e038fcabb9ff4ae914af7d8f440b8b313f688573c1f8bee8e8744
//Address: 0x5f1be47d75e0b9b46b437952917a416e4bf2fa0a

//Private key: 2640928e54f8520c9c0052d49337d1270657a7ded0ce93a318664a2e4d07b4c1
//Public Key: 04fd0348ecb5419ccdd48fe53914cb68a714bd828ad2517bcb8c872c74d9bab7f01442cbb86c6921891d7b76d1acf9f179dd9a3c39c9d6c05a6a947745168a1b5e
//Address: 0x789423a3327efd4fb4d3e6e9316d5b54786bd439

const priv = generatePrivateKey();

function generatePrivateKey() {
  let key = secp.utils.randomPrivateKey();
  return toHex(key);
}

function generatePublicKey(privateKey) {
  const key = secp.getPublicKey(privateKey);
  return toHex(key);
}

function generateAddress(publicKey) {
  let address = publicKey.slice(2);
  address = keccak256(utf8ToBytes(address));
  address = toHex(address.slice(12));
  return `0x${address}`;
}

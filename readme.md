## SOLUTION TO ECDSA PROJECT

Use the following test keys and address

1. Private key: 6b911fd37cdf5c81d4c0adb1ab7fa822ed253ab0ad9aa18d77257c88b29b718e
2. Public key: 04385c3a6ec0b9d57a4330dbd6284989be5bd00e41c535f9ca39b6ae7c521b81cd2443fef29e7f34aa8c8002eceaff422cd1f622bb4830714110e736044d8f084f
3. Address: 0xc64062b6425a84831dc04036b92c8a063ccc0f4d

===================

1. Private_Key: 100b70a1bec17c873a0102a692ce9345b64473f87ce77dc060d7bb7429bbc1bd
2. Publickey: 04533fe54f9fe0bb1f63422dcd959da8b22b0f62374ec1e446a3694091106fc470d5cc3ad16a43c341fea109855123a091cc4f2fd7209f03d4ae016ae249b9780c
3. Address: 0x767a9187392d7eec2c24837edde691e9a304e1fc

=====================

1. Private key: 17ab1b5a44f7e7cc20c0d16645dd2c372b9d89786b696dae4f6cc001558b7d62
2. Public key: 04254c46d8acfa2aff981b3b2e96455c87b82d7719115400bd858a176dd5b000c2d1e6451b959e038fcabb9ff4ae914af7d8f440b8b313f688573c1f8bee8e8744
3. Address: 0x5f1be47d75e0b9b46b437952917a416e4bf2fa0a

=====================

1. Private key: 2640928e54f8520c9c0052d49337d1270657a7ded0ce93a318664a2e4d07b4c1
2. Public Key: 04fd0348ecb5419ccdd48fe53914cb68a714bd828ad2517bcb8c872c74d9bab7f01442cbb86c6921891d7b76d1acf9f179dd9a3c39c9d6c05a6a947745168a1b5e
3. Address: 0x789423a3327efd4fb4d3e6e9316d5b54786bd439

## ECDSA Node

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.

However, something that we would like to incoporate is Public Key Cryptography. By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

### Video instructions

For an overview of this project as well as getting started instructions, check out the following video:

https://www.loom.com/share/0d3c74890b8e44a5918c4cacb3f646c4

### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder
2. Run `npm install` to install all the depedencies
3. Run `node index` to start the server

The application should connect to the default server port (3042) automatically!

_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.

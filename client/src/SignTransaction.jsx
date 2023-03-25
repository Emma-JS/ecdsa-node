import React from 'react'
import { utf8ToBytes, toHex } from 'ethereum-cryptography/utils';
import { keccak256 } from 'ethereum-cryptography/keccak';
import * as secp from 'ethereum-cryptography/secp256k1'
import server from './server';


const SignTransaction = ({ setIsModalOpen, setPrivateKey, privateKey, transactionHistory, recipient, sendAmount, address, setBalance, setTransactionHistory }) => {

    let signedObject;

    const messageObject = {
        recipient,
        amount: sendAmount,
        id: transactionHistory + 1
    }

    function hashMessage(message) {
        message = utf8ToBytes(message);
        return keccak256(message);
    }

    async function signHash() {
        const messageHash = hashMessage(JSON.stringify(messageObject));

        if (recipient && sendAmount && transactionHistory) {
            try {
                const signature = await secp.sign(messageHash, privateKey, { recovered: true })
                return {
                    messageHash: toHex(messageHash),
                    signature: toHex(signature[0]),
                    recoveryBit: signature[1],
                    sender: address,
                }

            }
            catch (ex) {
                alert('Invalid Private Key')
            }
        }

    }

    const handleSign = async () => {
        if (!recipient || !sendAmount || !transactionHistory || !privateKey) {
            alert('Please complete all the fields');
            setIsModalOpen(false)
            return false
        }
        signedObject = await signHash()
        setIsModalOpen(false)

        if (signedObject) {
            try {
                const {
                    data: { balance, transactionHistory },
                } = await server.post(`send`, {
                    sender: address,
                    amount: parseInt(sendAmount),
                    recipient,
                    signedObject
                });

                setBalance(balance);
                setTransactionHistory(transactionHistory);
            } catch (ex) {
                alert(ex.response.data.message);
            }
        }

    }


    return (
        <div className='sign-transaction-modal' onClick={(evt) => { setIsModalOpen(false) }}>
            <form className='sign_form' onClick={(evt) => { evt.stopPropagation() }}>
                <legend className='form_header'>Sign Transaction</legend>
                <label className='form-label'>
                    Private Key
                    <input
                        type="password"
                        placeholder='Enter you private key'
                        onChange={(event) => setPrivateKey(event.target.value)}
                    />
                </label>

                <input onClick={() => handleSign()} className='sign-button' type="button" value="Sign transaction" />
            </form>
        </div>
    )
}

export default SignTransaction


import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractAbi, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();
const { ethereum } = window;

const getEthereumContract = async () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionsContract = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
    );

    return transactionsContract;
};

export const TransactionProvider = ({ children }) => {
    const [connectedWallet, setConnectedWallet] = useState("");
    const [formData, setFormData] = useState({
        addressTo: "",
        amount: "",
        keyword: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(
        localStorage.getItem("transactionCount")
    );
    const [transactions, setTransactions] = useState([]);
    // refresh page as soon as metamask is logged out

    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfTransactionsExist();
    }, []);
    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) {
                alert("Make sure you have metamask!");
                return;
            }
            const accounts = await ethereum.request({ method: "eth_accounts" });
            if (accounts.length !== 0) {
                const account = accounts[0];
                console.log("Found an authorized account:", account);
                setConnectedWallet(account);
                await getAllTransactions();
            } else {
                console.log("No authorized account found");
            }
        } catch (error) {
            console.log(error);
        }
    };
    const checkIfTransactionsExist = async () => {
        try {
            const transactionsContract = await getEthereumContract();
            const transactionsCount =
                await transactionsContract.getTransactionCount();
            setTransactionCount(transactionsCount.toNumber());
            window.localStorage.setItem(
                "transactionCount",
                transactionsCount.toNumber()
            );
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object");
        }
    };
    const connectWallet = async () => {
        try {
            if (!ethereum) {
                alert("Get metamask!");
                return;
            }
            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });
            console.log("Connected", accounts[0]);
            setConnectedWallet(accounts[0]);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };
    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    };
    const getAllTransactions = async () => {
        try {
            if (!ethereum) {
                alert("Get metamask!");
                return;
            }
            const transactionsContract = await getEthereumContract();
            const availableTransactions =
                await transactionsContract.getTransactions();
            const structuredTransactions = availableTransactions.map(
                (transaction) => ({
                    addressTo: transaction.receiver,
                    addressFrom: transaction.sender,
                    timestamp: new Date(
                        transaction.timestamp.toNumber() * 1000
                    ).toLocaleString(),
                    keyword: transaction.keyward,
                    message: transaction.message,
                    amount: ethers.utils.formatEther(transaction.amount),
                })
            );
            console.log(structuredTransactions);
            setTransactions(structuredTransactions);
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object");
        }
    };
    const sendTransaction = async () => {
        try {
            if (ethereum) {
                const { addressTo, amount, keyword, message } = formData;
                const transactionsContract = await getEthereumContract();
                const parsedAmount = ethers.utils.parseEther(amount);
                setLoading(true);
                await ethereum.request({
                    method: "eth_sendTransaction",
                    params: [
                        {
                            from: connectedWallet,
                            to: addressTo,
                            gas: "0x5208",
                            value: parsedAmount._hex,
                        },
                    ],
                });

                const transactionHash =
                    await transactionsContract.addTransaction(
                        addressTo,
                        message,
                        keyword,
                        parsedAmount
                    );
                console.log(`Loading - ${transactionHash.hash}`);
                await transactionHash.wait();
                console.log(`Success - ${transactionHash.hash}`);
                setLoading(false);

                const transactionsCount =
                    await transactionsContract.getTransactionCount();

                setTransactionCount(transactionsCount.toNumber());
                window.location.reload();
            } else {
                console.log("No ethereum object");
            }
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object");
        }
    };
    return (
        <TransactionContext.Provider
            value={{
                connectWallet,
                connectedWallet,
                formData,
                handleChange,
                sendTransaction,
                loading,
                transactions,
            }}
        >
            {children}
        </TransactionContext.Provider>
    );
};

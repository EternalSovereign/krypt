import { AiFillAlipayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import React, { useContext, useEffect, useState } from "react";

import { Loader } from "./";
import { TransactionContext } from "../context/TransactionContext";

const commonStyles =
    "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Input = ({ placeholder, name, type, value, handleChange }) => (
    <input
        placeholder={placeholder}
        type={type}
        step="0.0001"
        value={value}
        onChange={(e) => handleChange(e, name)}
        className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
    />
);

const Welcome = () => {
    //const [loading, setLoading] = useState(false);
    const {
        connectWallet,
        connectedWallet,
        formData,
        handleChange,
        sendTransaction,
        loading,
    } = useContext(TransactionContext);
    const handleSubmit = async (e) => {
        const { addressTo, amount, keyword, message } = formData;
        e.preventDefault();
        if (!addressTo || !amount || !keyword || !message) {
            alert("Please fill all fields");
            return;
        }
        await sendTransaction();
        setLoading(false);
    };
    useEffect(() => {}, [connectedWallet]);
    return (
        <div className="flex w-full justify-center items-center">
            <div className="flex mf:flex-row flex-col items-start justify-between md:p-30 py-12 px-4">
                <div className="flex flex-1 justify-start flex-col mf:mr-10">
                    <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
                        Send crypto
                        <br />
                        accross the world
                    </h1>
                    <p className="text-left text-white mt-5 font-light md:w-9/12 w-11/12 text-base">
                        Explore the crypto world with ease. Send and receive
                        currencies easily with Krypto.
                    </p>
                    {!connectedWallet && (
                        <button
                            type="button"
                            onClick={connectWallet}
                            className=" flex flex-row items-center justify-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
                        >
                            <p className="text-white text-base font-semibold">
                                Connect wallet
                            </p>
                        </button>
                    )}
                    <div className=" grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
                        <div className={`rounded-tl-2xl ${commonStyles}`}>
                            Reliability
                        </div>
                        <div
                            className={`rounded-tr-2xl ${commonStyles} sm:rounded-none`}
                        >
                            Low fees
                        </div>
                        <div
                            className={`sm:rounded-tr-2xl ${commonStyles} rounded-none`}
                        >
                            Security
                        </div>
                        <div
                            className={`sm:rounded-bl-2xl ${commonStyles} rounded-none`}
                        >
                            Ethereum
                        </div>
                        <div
                            className={`sm:rounded-none ${commonStyles} rounded-bl-2xl`}
                        >
                            Web 3.0
                        </div>
                        <div className={`rounded-br-2xl ${commonStyles}`}>
                            Blockchain
                        </div>
                    </div>
                </div>
                <div className="flex flex-1 flex-col items-center justify-start w-full mf:mt-0 mt-10">
                    <div className="p-3 justify-end items-start flex-col rounded-xl h-40 w-72 eth-card white-glassmorphism">
                        <div className="flex flex-col w-full justify-between h-full">
                            <div className="flex justify-between items-start">
                                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                                    <SiEthereum fontSize={21} color="#fff" />
                                </div>
                                <BsInfoCircle fontSize={17} color="#fff" />
                            </div>
                            <div>
                                <p className=" text-white text-sm font-light">
                                    {(connectedWallet &&
                                        `${connectedWallet.slice(
                                            0,
                                            6
                                        )}...${connectedWallet.slice(-5)}`) ||
                                        "Address"}
                                </p>
                                <p className=" text-white text-lg mt-1 font-semibold">
                                    Ethereum
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism mt-8">
                        <Input
                            placeholder="Address To"
                            name="addressTo"
                            type="text"
                            handleChange={handleChange}
                        />
                        <Input
                            placeholder="Amount (ETH)"
                            name="amount"
                            type="number"
                            handleChange={handleChange}
                        />
                        <Input
                            placeholder="Keyword (Gif)"
                            name="keyword"
                            type="text"
                            handleChange={handleChange}
                        />
                        <Input
                            placeholder="Enter Message"
                            name="message"
                            type="text"
                            handleChange={handleChange}
                        />
                        <div className="h-[1px] w-full bg-gray-400 my-2" />
                        {loading ? (
                            <Loader />
                        ) : (
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="text-white mt-2 w-full border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer"
                            >
                                Send now
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Welcome;

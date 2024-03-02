// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.24;

contract Transactions {
    uint transactionCount;

    event createTransaction(address sender, address receiver, uint amount, string message, string keyward, uint timestamp);

    struct Transaction {
        address sender;
        address payable receiver;
        uint amount;
        string message;
        string keyward;
        uint timestamp;
    }

    Transaction[] tarnsactions;

    function addTransaction(address payable receiver, string memory message, string memory keyword, uint amount) public {
        transactionCount++;
        tarnsactions.push(Transaction(msg.sender , receiver,amount,message,keyword,block.timestamp));
        
        emit createTransaction(msg.sender, receiver, amount, message, keyword, block.timestamp);
    }

    function getTransactionCount() public view returns(uint) {
        return transactionCount;
    }

    function getTransactions() public view returns(Transaction[] memory){
        return tarnsactions;
    }
    
}
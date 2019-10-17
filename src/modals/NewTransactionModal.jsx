import React, { Component } from 'react';
// import styled from 'styled-components';

import css from './NewTransactionModal.scss';

import RecurrencyContext from './../context/RecurrencyContext.jsx';

class NewTransactionModal extends Component {
    static contextType = RecurrencyContext;

    constructor(props) {
        super(props);
    }

    createNewTransaction = () => {
        if(this.transactionTitle.value != "" && this.transactionAmount.value != "")
            if(/^(\d+(?:[\.\,]\d{0,5})?)$/.test(this.transactionAmount.value))
                this.context.createTransaction(this.transactionTitle.value, Math.round(this.transactionAmount.value.replace(',', '.') * 100) / 100);
    }

    render() {
        return (
            <div className="new_transaction_wrapper">
                <div className="container">
                    <header className="header_modal">
                        <h1>Create a transaction</h1>
                        <a onClick={this.context.toggleNewTransactionModal} className="close"><i className="fas fa-times"></i></a>
                    </header>

                    <p>Title</p>
                    <input type="text" ref={(transactionTitle) => { this.transactionTitle = transactionTitle }}/>
                    <p>Amount (in Euro)</p>
                    <input type="text" ref={(transactionAmount) => { this.transactionAmount = transactionAmount }}/>

                    <a onClick={this.createNewTransaction} className="button">Create transaction</a>
                </div>
            </div>
        );
    }
}

export default NewTransactionModal;
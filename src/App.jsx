import React, { Component } from 'react';
// import styled from 'styled-components';

import css from './App.scss';
import script from './fontawesome.js';

import RecurrencyContext from './context/RecurrencyContext.jsx';

import Header from './components/Header.jsx';

import CurrencyRate from './components/CurrencyRate.jsx';
import TransactionsTop from './components/TransactionsTop.jsx';
import TransactionsSummary from './components/TransactionsSummary.jsx';

import NewTransactionModal from './modals/NewTransactionModal.jsx';

import TransactionsList from './components/TransactionsList.jsx';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            eurToPlnRate: 4.29,
            topTransactionTitle: "",
            topTransactionToEur: 0,
            topTransactionToPln: 0,
            sumOfTransactions: 0,
            transactions: [
                // {
                //     title: "TEST 1",
                //     amountEur: 90
                // },
                // {
                //     title: "TEST 2",
                //     amountEur: 440
                // },
                // {
                //     title: "TEST 3",
                //     amountEur: 126
                // }
            ],
            isNewTransactionModalOpened: false
        }
    }

    componentDidMount() {
        this.updateState({});
    }

    updateState(props) {
        let summary = 0;
        let topTitle = (this.state.transactions.length > 0 ? (this.state.transactions.reduce((prev, current) => (prev.amountEur > current.amountEur) ? prev : current).title) : "");
        let topToEur = (this.state.transactions.length > 0 ? (this.state.transactions.reduce((prev, current) => (prev.amountEur > current.amountEur) ? prev : current).amountEur) : 0);
        let topToPln = Math.round(topToEur * (props.eurToPlnRate ? props.eurToPlnRate : this.state.eurToPlnRate) * 100) / 100;

        if(this.state.transactions.length > 0) {
            this.state.transactions.map(transaction => {
                summary += transaction.amountEur
            });
        }

        var newState = {
            sumOfTransactions: summary,
            topTransactionTitle: topTitle,
            topTransactionToEur: topToEur,
            topTransactionToPln: topToPln
        }

        this.setState(Object.assign(
            props,
            newState
        ));
    }

    changeCurrencyRatio = newRatio => {        
        this.updateState({
            eurToPlnRate: newRatio
        });
    }

    toggleNewTransactionModal = () => {
        this.updateState({
            isNewTransactionModalOpened: !this.state.isNewTransactionModalOpened
        })
    }

    createTransaction = (title, amount) => {
        let modifiedTransactions = this.state.transactions;
        modifiedTransactions.push({title: title, amountEur: amount});

        this.updateState({
            transactions: modifiedTransactions,
            isNewTransactionModalOpened: false
        });
    }

    deleteTransaction = transactionId => {
        let modifiedTransactions = this.state.transactions;
        modifiedTransactions.splice(transactionId, 1);

        this.updateState({
            transactions: modifiedTransactions
        });
    }

    render() {
        return (
            <RecurrencyContext.Provider
                value={{
                    eurToPlnRate: this.state.eurToPlnRate,
                    topTransactionTitle: this.state.topTransactionTitle,
                    topTransactionToEur: this.state.topTransactionToEur,
                    topTransactionToPln: this.state.topTransactionToPln,
                    sumOfTransactions: this.state.sumOfTransactions,
                    transactions: this.state.transactions,
                    isNewTransactionModalOpened: this.state.isNewTransactionModalOpened,
                    changeCurrencyRatio: this.changeCurrencyRatio,
                    toggleNewTransactionModal: this.toggleNewTransactionModal,
                    createTransaction: this.createTransaction,
                    deleteTransaction: this.deleteTransaction
                }}
            >
                <Header />

                <div className="summary_wrapper">
                    <div className="container">
                        <CurrencyRate />
                        <TransactionsTop />
                        <TransactionsSummary />
                    </div>
                </div>

                <TransactionsList />

                {this.state.isNewTransactionModalOpened ? <NewTransactionModal /> : null}
            </RecurrencyContext.Provider>
        );
    }
}

export default App;
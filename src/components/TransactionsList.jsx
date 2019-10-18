import React, { Component } from 'react';
// import styled from 'styled-components';

import css from './TransactionsList.scss';

import RecurrencyContext from './../context/RecurrencyContext.jsx';

class TransactionsList extends Component {
    render() {
        return (
            <RecurrencyContext.Consumer>
                {context => (
                    <section className="transactions_wrapper">
                        <div className="container">
                            <h1>Last transactions:</h1>
        
                            {context.transactions.length > 0 ? context.transactions.map((transaction, id) => (
                                <div className="transaction_item" key={id}>
                                    <div className="description">
                                        <i className="fas fa-exchange-alt"></i>
                                        <h2 title={transaction.title}>{transaction.title}</h2>
                                    </div>
                                    
                                    <div className="currencies">
                                        <p>{transaction.amountEur} EUR</p>
                                        <i className="fas fa-long-arrow-alt-right"></i>
                                        <p>{Math.round(transaction.amountEur*context.eurToPlnRate * 100) / 100} PLN</p>
                                    </div>
        
                                    <a onClick={() => context.deleteTransaction(id)} className="delete"><i className="fas fa-trash"></i></a>
                                </div>
                            )) : (
                                <div className="quote_wrapper">
                                    <p>Uhh... nothing here I guess...</p>
                                </div>
                            )}
                        </div>
                    </section>
                )}
            </RecurrencyContext.Consumer>
        );
    }
}

export default TransactionsList;
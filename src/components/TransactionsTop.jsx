import React, { Component } from 'react';
// import styled from 'styled-components';

import css from './TransactionsTop.scss';

import RecurrencyContext from '../context/RecurrencyContext.jsx';

class TransactionsTop extends Component {
    render() {
        return (
            <RecurrencyContext.Consumer>
                {context => (
                    <div className="top_transaction_wrapper">
                        <p>Top transaction</p>
                        <h1 title={context.topTransactionTitle}>{context.topTransactionTitle}</h1>
                        <h2>{context.topTransactionToEur} EUR <i className="fas fa-long-arrow-alt-right"></i> {context.topTransactionToPln} PLN</h2>
                    </div>
                )}
            </RecurrencyContext.Consumer>
        );
    }
}

export default TransactionsTop;
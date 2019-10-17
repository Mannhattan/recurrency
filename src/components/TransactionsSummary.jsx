import React, { Component } from 'react';
// import styled from 'styled-components';

import css from './TransactionsSummary.scss';

import RecurrencyContext from './../context/RecurrencyContext.jsx';

class TransactionsSummary extends Component {
    render() {
        return (
            <RecurrencyContext.Consumer>
                {context => (
                    <div className="transactions_summary_wrapper">
                        <p>Transactions value summary</p>
                        <h1>{context.sumOfTransactions} <i className="fas fa-euro-sign"></i></h1>
                        <h1 className="small">{Math.round(context.sumOfTransactions * context.eurToPlnRate * 100) / 100} PLN</h1>
                    </div>
                )}
            </RecurrencyContext.Consumer>
        );
    }
}

export default TransactionsSummary;
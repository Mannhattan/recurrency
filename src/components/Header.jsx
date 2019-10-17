import React, { Component } from 'react';
// import styled from 'styled-components';

import css from './Header.scss';

import RecurrencyContext from './../context/RecurrencyContext.jsx';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            
        }
    }
    
    render() {
        return (
            <RecurrencyContext.Consumer>
                {context => (
                    <header className="main_header">
                        <div className="container">
                            <a href="/" className="header_logo">Recurrency</a>

                            <a onClick={context.toggleNewTransactionModal} className="button">New transaction</a>
                        </div>
                    </header>
                )}
            </RecurrencyContext.Consumer>
        );
    }
}

export default Header;
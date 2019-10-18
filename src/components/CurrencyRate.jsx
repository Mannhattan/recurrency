import React, { Component } from 'react';
// import styled from 'styled-components';

import css from './CurrencyRate.scss';

import RecurrencyContext from './../context/RecurrencyContext.jsx';

class CurrencyRate extends Component {
    static contextType = RecurrencyContext;
    
    constructor(props) {
        super(props);

        this.state = {
            isEditing: false,
            isError: false
        }
    }

    saveCurrencyRate = () => {
        if(/^[0-9]{1,5}([,.][0-9]{1,2})?$/.test(this.rateInput.value.replace(/ /g,''))) {
            this.context.changeCurrencyRatio(this.rateInput.value.replace(',','.').replace(/ /g,'').replace(/^0+/, '0'));
            this.setState({isEditing: false,
            isError: false});
        }
        else {
            this.setState({
                isError: true
            })
        }
    }
    
    render() {
        return (
            <div className="currency_rate_wrapper">
                <p>Currency rate</p>
                <p className="rate">
                    1 EUR
                    <i className="fas fa-exchange-alt"></i>
                    {this.state.isEditing ? <input type="text" className={this.state.isError ? "error" : null} defaultValue={this.context.eurToPlnRate} ref={(rateInput) => { this.rateInput = rateInput }}/> : this.context.eurToPlnRate+" "}
                    PLN
                </p>

                {this.state.isEditing ? <a onClick={this.saveCurrencyRate} className="button">Save</a> : <a onClick={() => this.setState({isEditing: true})} className="button">Change</a>}
            </div>
        );
    }
}

export default CurrencyRate;
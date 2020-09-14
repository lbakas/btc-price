import React, { Component } from 'react';
import Input from './Input';
import Field from './Field';

class App extends Component {
  state = {
    input: '',
    fields: [
      { currency: 'eur', symbol: '€', price: 0, visible: true },
      { currency: 'gdp', symbol: '£', price: 0, visible: true },
      { currency: 'usd', symbol: '$', price: 0, visible: true }
    ]
  };

  render() {
    return (
      <div className="container">
        <Input fields={this.state.fields} input={this.state.input} handleInput={this.handleInput} addCurrency={this.addCurrency} />
        <div className="mt-5">
          {this.state.fields.map(field => {
            if (field.visible) {
              return <Field key={field.currency} field={field} input={this.state.input} removeCurrency={this.removeCurrency} />
            } else {
              return null;
            }
          })}
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.fetchPrices();
    setInterval(this.fetchPrices, 60000);
  }

  fetchPrices = () => {
    fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
        .then(response => response.json())
        .then(data => {
          let updatedFields = this.state.fields;
          updatedFields = [
            { ...updatedFields[0], price: Number(data.bpi.EUR.rate.replace(/,/g, '')) },
            { ...updatedFields[1], price: Number(data.bpi.GBP.rate.replace(/,/g, '')) },
            { ...updatedFields[2], price: Number(data.bpi.USD.rate.replace(/,/g, '')) }
          ];
          this.updateFields(updatedFields);
        });
  }

  handleInput = (event) => {
    const validNumber = new RegExp(/^\d*\.?\d*$/);
    if (validNumber.test(event.target.value)) {
      this.setState({
        ...this.state,
        input: event.target.value
      });
    }
  }

  removeCurrency = currency => {
    const updatedFields = this.state.fields;
    updatedFields.forEach(field => {
      if (field.currency === currency) field.visible = false;
    })
    this.updateFields(updatedFields);
  };

  addCurrency = currency => {
    const updatedFields = this.state.fields;
    updatedFields.forEach(field => {
      if (field.currency === currency) field.visible = true;
    })
    this.updateFields(updatedFields);
  }

  updateFields = updatedFields => {
    this.setState({
      ...this.state,
      fields: [...updatedFields]
    });
  }
}

export default App;

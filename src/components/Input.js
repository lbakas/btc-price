import React from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';

const Input = props => {
  return (
    <div className="row justify-content-md-center mt-5">
      <div className="col col-lg-6">
        <p>Enter amount in BTC:</p>
        <div className="input-group">
          <input type="text" className="form-control" onChange={props.handleInput} value={props.input} />
          <DropdownButton className="input-group-append" variant="outline-secondary" title="Add currency" disabled={props.fields.filter(field => !field.visible).length === 0}>
            {props.fields.filter(field => !field.visible).map(field => {
              return <Dropdown.Item key={field.currency} onClick={() => props.addCurrency(field.currency)}>{field.currency.toUpperCase()}</Dropdown.Item>;
            })}
          </DropdownButton>
        </div>
      </div>
    </div>
  );
}

export default Input;

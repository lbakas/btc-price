import React from 'react';

const Field = props => {
  return (
    <div className="row justify-content-md-center">
      <div className="col col-lg-6">
        <div className="input-group mb-3">
          <input type="text" className="form-control" readOnly value={props.field.symbol + (props.input * props.field.price).toFixed(2)} disabled />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button" onClick={() => props.removeCurrency(props.field.currency)}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Field;

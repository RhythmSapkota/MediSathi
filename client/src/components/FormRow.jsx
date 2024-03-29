import React from 'react'

const FormRow = ({type, name, labelText,defaultValue,placeholder, onChange, hidden}) => {
  return (<>
   <div className="form-row">
   { !hidden && <label htmlFor={name} className="form-label">
     {labelText || name}
    </label>}
    <input type={type} id={name} name={name} className='form-input' style={hidden?{display:'none'}:{display:'block'}} defaultValue={defaultValue || ""} placeholder={placeholder || ""} onChange={onChange} required />
  </div>
  </>
  )
}

export default FormRow
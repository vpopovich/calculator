import React from 'react';
import './Button.css';

 export const Button = props => (
     <div className={'btn-wrapper'}>
         {props.children}
     </div>
 )

 export default Button; 
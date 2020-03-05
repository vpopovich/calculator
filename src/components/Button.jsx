import React from 'react';
import './Button.css';

 export const Button = props => (
     <div className={'btn-wrapper'} onClick={()=>props.handleClick(props.children)}>
         {props.children}
     </div>
 )

 export default Button; 
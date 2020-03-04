import React from 'react';
import './ClearButton.css'

 export const ClearButton = props => (
     <div className={'clear-btn'}>
         {props.children}
     </div>
 )

 export default ClearButton; 
import React from 'react'
import './Footer.css';
import { inject, observer } from 'mobx-react';
import Stores from '../../Stores/StoreIdentifier';
function Footer() {
    return (
        <div className="footer">
           <p className="sticky">Sticky Footer</p>            
        </div>
    )
}

export default inject(Stores.AuthStore)(observer(Footer));

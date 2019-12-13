import React from 'react';
import Aux from '../../hoc/auxt';
import './layout.css';

const layout = (props)=>(
    <Aux>
        <div>ToolBar, SideDrawer, BackDrawer</div>
        <main className='content'>
            {props.children}
        </main>
    </Aux>
);
export default layout;
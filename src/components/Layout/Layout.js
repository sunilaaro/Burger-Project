import React from 'react';
import Aux from '../../hoc/auxt';
import './layout.css';
import ToolBar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const layout = (props)=>(
    <Aux>
        <ToolBar />
        <SideDrawer />
        <main className='content'>
            {props.children}
        </main>
    </Aux>
);
export default layout;
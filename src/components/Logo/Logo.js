import React from 'react';
import './Logo.css';
import LogoImg from '../../assets/images/burger-logo.png';

const logo = (props)=>(
    <div className="Logo" style={{height:props.height, marginBottom:32}}>
        <img src={LogoImg} alt="myLogo"/>
    </div>
);
export default logo;
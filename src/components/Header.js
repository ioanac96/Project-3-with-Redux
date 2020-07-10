import React from 'react';
import {
    Link
  } from "react-router-dom";

class Header extends React.Component {
    render() {
        const isON = this.props.path; 
        console.log(this.props.path)
        return(
            <div className="header">
                <div className="header-title">In love with food</div>
                <div className="links-header">
                    <Link to="/my-profile" className={(isON === "/my-profile")? "header-link active" : "header-link"}>My Profile</Link>
                    <Link to="/home" className={(isON === "/home")? "header-link active" : "header-link"}>Home</Link>
                    <Link to="/upload" className={(isON === "/upload")? "header-link active" : "header-link"}>Upload</Link>
                </div>
                
            </div>
        )
    }
}

export default Header;
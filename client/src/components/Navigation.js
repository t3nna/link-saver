import React from 'react';
import {Outlet} from "react-router-dom";

function Navigation(props) {
    return (
        <>
            <h1>This is navigation</h1>
            <Outlet/>
        </>
    );
}

export default Navigation;
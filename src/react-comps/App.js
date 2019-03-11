import * as React from 'react';
import useTopState from '../lib/top-state-hook';
import Welcome from "./Welcome";

export default props => {
    useTopState("user" , {});

    console.log("app render");
    return <Welcome />;
};
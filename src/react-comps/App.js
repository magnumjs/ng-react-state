import * as React from 'react';
import useTopState from '../lib/top-state-hook';
import Welcome from "./Welcome";

export default props => {
    console.log("app render", props);
    return <Welcome />;
};
import * as React from 'react';
import Welcome from "./Welcome";

export default props => {
    console.log("app render", props);
    return <Welcome />;
};
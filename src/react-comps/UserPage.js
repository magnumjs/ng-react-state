import * as React from 'react';
import useTopState from '../lib/top-state-hook';
import User from "./User";

export default props => {
    const [userInfo] =useTopState("user");


    console.log("userpage render");
    return <><b>{userInfo.name}'s</b><User /></>;
};
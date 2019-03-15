import * as React from 'react';
import {useSharedState} from 'shared-state-hook';
import User from "./User";

export default props => {
    const [userInfo] =useSharedState("user");


    console.log("userpage render");
    return <><b>{userInfo.name}'s</b><User /></>;
};
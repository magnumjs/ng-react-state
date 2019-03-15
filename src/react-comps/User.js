import * as React from 'react';
import {useSharedState} from 'shared-state-hook';

export default props => {
    const [user, setUser] = useSharedState("user");

    const { name, guid, token } = user;

    console.log("user render");
    return (
        <div>
            <b>User Page: </b>
            Name: {name} Id: {guid}
            <button onClick={() => setUser({ token: Math.random() })}>Change</button>
            {token}
        </div>
    );
};

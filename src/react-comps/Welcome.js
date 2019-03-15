import * as React from 'react';
import {useSharedState} from 'shared-state-hook';

export default props => {
    const [user, setUser] = useSharedState("user");

    const { name, guid, token } = user;

    console.log("welcome render");
    return (
        <div>
            <b>Welcome Page: </b>
            {name} {guid}
            <button onClick={() => setUser({ token: Math.random() })}>Change</button>
            {token}
        </div>
    );
};

import * as React from 'react';
import useTopState from '../lib/top-state-hook';

export default props => {
    const [user, setUser] = useTopState("user");

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

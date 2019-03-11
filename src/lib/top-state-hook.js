import { useState } from 'react';

/* Forked from: /github.com/mvolkmann/top-state-hook */

function isObject(value) {
    const type = typeof value
    return value != null && (type == 'object' || type == 'function')
}

const stateMap = {};

export default function useTopState(name, initialValue) {
    // Get a function that can be called later
    // to re-render the calling component.
    const [, setState] = useState();

    let state = stateMap[name];

    if (!state) {
        const setValue = value => {
            if (isObject(value)){
                state.value = {...state.value, ...value};
            } else {
                state.value = value;
            }
            state.updaters.forEach(fn => fn(value));
        };

        state = { name, setValue, updaters: new Set(), value: initialValue };
        stateMap[name] = state;
    }

    state.updaters.add(setState);
    return [state.value, state.setValue];
}
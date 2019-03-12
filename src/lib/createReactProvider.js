import * as React from 'react';
import * as ReactDOM from 'react-dom';
import useSharedState from './top-state-hook';
import angular from 'angular';

const createReactProvider = (ProviderName, InitialVals, Element) => {

    const vElement = {nodeType:1, tagName: 'b', childNodes: [], style: {}}

    const Component = props => {

        const [state, setState] = useSharedState(ProviderName, InitialVals)

        React.useEffect(() => {

            props.updater(user => {
                setState(angular.copy(user))
            });
        }, [])

        return null
    }

    let callback;
    const providerProps = {
        updater: cb => {
            callback = cb;
        }
    };



    ReactDOM.render(React.createElement(Component, providerProps), Element?Element:vElement);

    return (data) => {
        callback(data)
    }
}

export default createReactProvider;
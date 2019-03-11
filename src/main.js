import * as React from 'react';
import * as ReactDOM from 'react-dom';
import useSharedState from './lib/top-state-hook';
import angular from 'angular';

const createReactProvider = (ProviderName, InitialVals, Element) => {

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

    ReactDOM.render(React.createElement(Component, providerProps), Element);

    return (data) => {
        callback(data)
    }
}


const reactComponent = function() {
    return {
        restrict: 'E',
        replace: true,
        link: function(scope, elem, attrs) {

            scope[attrs.updater] = createReactProvider(attrs.name, scope[attrs.props], elem[0])

            // cleanup when scope is destroyed
            scope.$on('$destroy', function() {
                if (!attrs.onScopeDestroy) {
                    ReactDOM.unmountComponentAtNode(elem[0]);
                } else {
                    scope.$eval(attrs.onScopeDestroy, {
                        unmountComponent: ReactDOM.unmountComponentAtNode.bind(this, elem[0])
                    });
                }
            });
        }
    }
}

export {reactComponent, createReactProvider, useSharedState}

const ngReactState = angular.module("react-state", [])
    .directive('reactState', reactComponent)
    .factory('reactState', () => createReactProvider)

export default ngReactState;
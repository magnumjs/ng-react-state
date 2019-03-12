import * as React from 'react';
import * as ReactDOM from 'react-dom';
import createReactProvider from './createReactProvider'


const reactState = function() {

    return {
        restrict: 'E',
        replace: true,
        link: function(scope, elem, attrs) {


            const updater = createReactProvider(attrs.name, scope[attrs.props], elem[0])

            if(scope[attrs.updater] ){
                scope[attrs.updater] = updater
            } else {
                scope.$watch(attrs.props, function(newVal, oldVal){
                    if(newVal !== oldVal){
                        updater(newVal)
                    }
                }, true)
            }

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

export default reactState;
import * as ReactDOM from 'react-dom';
import createReactProvider from './reactProvider'


const reactState = function() {

    return {
        restrict: 'E',
        replace: true,
        link: function(scope, elem, attrs) {

            const vname = attrs.props?attrs.props:scope[attrs.name]?attrs.name:{}

            const onUpdate = updates => {
                scope[vname] = {
                    ...scope[vname], ...updates
                }
                if(!scope.$$phase) {
                    scope.$apply()
                }
            }

            const updater = createReactProvider(attrs.name, scope[vname], onUpdate)

            if(scope[attrs.updater] ){
                scope[attrs.updater] = updater
            } else {
                scope.$watch(vname, function(newVal, oldVal){
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
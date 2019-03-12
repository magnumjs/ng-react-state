import * as React from 'react';
import * as ReactDOM from 'react-dom';
import angular from 'angular';

/* fork from ngReact */

const getReactComponent = (name, $injector) => {

    if (angular.isFunction(name)) {
        return name;
    }

    // ensure the specified React component is accessible, and fail fast if it's not
    let reactComponent;
    try {
        reactComponent = $injector.get(name);
    } catch(e){}

    if (!reactComponent) {

        reactComponent = name.split('.').reduce(function (current, namePart) {
            return current[namePart];
        }, window);
    }


    return reactComponent
}

function applyFunctions(obj, scope, propsConfig) {
    return Object.keys(obj || {}).reduce(function (prev, key) {
        const value = obj[key];
        const config = (propsConfig || {})[key] || {};
        /**
         * wrap functions in a function that ensures they are scope.$applied
         * ensures that when function is called from a React component
         * the Angular digest cycle is run
         */
        prev[key] = angular.isFunction(value) && config.wrapApply !== false
            ? applied(value, scope)
            : value;

        return prev;
    }, {});
}

const reactComponent = function ($injector) {
    return {
        restrict: 'E',
        replace: true,
        link: function (scope, elem, attrs) {

            const ComponentName = attrs.name
            const props = scope[attrs.props]
            const Element = elem[0]

            const reactComponent = getReactComponent(attrs.name, $injector);

            console.log("COM", reactComponent, elem[0])
            const renderMyComponent = function () {
                let scopeProps = scope.$eval(attrs.props);
                const props = applyFunctions(scopeProps, scope);

                ReactDOM.render(React.createElement(reactComponent, props), elem[0]);
            }

            scope.$watch(attrs.props, renderMyComponent, true);

            renderMyComponent()
        }

    }
}

export default reactComponent;
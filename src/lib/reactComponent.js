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



const reactComponent = function ($injector) {
    return {
        restrict: 'E',
        replace: true,
        link: function (scope, elem, attrs) {

            const reactComponent = getReactComponent(attrs.name, $injector);

            const renderMyComponent = function () {
                const props = scope.$eval(attrs.props);

                ReactDOM.render(React.createElement(reactComponent, props), elem[0]);
            }

            scope.$watch(attrs.props, renderMyComponent, true);

            renderMyComponent()
        }

    }
}

export default reactComponent;
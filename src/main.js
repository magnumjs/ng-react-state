import angular from 'angular';
import useSharedState from './lib/top-state-hook';
import reactComponent from './lib/reactComponent'
import createReactProvider from './lib/createReactProvider'
import reactState from './lib/reactState'


/**
 * @name ng-react-state
 * @license MIT
 * @author Michael Glazer <https://github.com/magnumjs>
 * @link https://github.com/magnumjs/ng-react-state
 * @description Shared React State Provider in Angular 1
 */

export {reactState, createReactProvider, reactComponent, useSharedState}

const ngReactState = angular.module("react-state", [])
    .directive('reactComponent', ['$injector', reactComponent])
    .directive('reactState', reactState)
    .factory('reactState', () => createReactProvider)

export default ngReactState;
import angular from 'angular';
import reactComponent from './lib/reactComponent'
import createReactProvider from './lib/createReactProvider'
import reactState from './lib/reactState'

export {reactState, createReactProvider, reactComponent}

const ngReactState = angular.module("react-state", [])
    .directive('reactComponent', ['$injector', reactComponent])
    .directive('reactState', reactState)
    .factory('reactState', () => createReactProvider)

export default ngReactState;
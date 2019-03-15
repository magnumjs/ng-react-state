import angular from 'angular';
import {useSharedState} from 'shared-state-hook';
import reactComponent from './lib/reactComponent'
import createReactProvider from './lib/createReactProvider'
import reactState from './lib/reactState'

export {reactState, createReactProvider, reactComponent, useSharedState}

const ngReactState = angular.module("react-state", [])
    .directive('reactComponent', ['$injector', reactComponent])
    .directive('reactState', reactState)
    .factory('reactState', () => createReactProvider)

export default ngReactState;
import './main'
import angular from 'angular'
import * as React from 'react';
import { render } from "react-dom";
import useTopState from './lib/top-state-hook';
import App from './react-comps/App'

angular.module('app', ['react-state'])
.controller('helloController', function($scope, reactState) {

    render(<App />, document.getElementById("app"));


    $scope.user = {
        name: "Joe",
        guid: 123455,
        token: Math.random()
    }

    $scope.updater = reactState('user', $scope.user, document.getElementById('user-provider'))

    setInterval(function() {

        $scope.user.token = Math.random()
        // Notify subscribers.
        $scope.updater($scope.user)
    }, 3000)

})
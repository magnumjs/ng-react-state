import './main'
import angular from 'angular'
import * as React from 'react';
import { render } from "react-dom";
import WelcomePage from './react-comps/App'
import UserPage from './react-comps/UserPage'


const welcomePageEL = document.getElementById("welcomePage");
const userPageEL = document.getElementById("userPage");

const user = {
    name: "Mike",
    guid: 123455,
    token: Math.random()
}

angular.module('app', ['react-state'])

.value("WelcomePage", WelcomePage)
.value("UserPage", UserPage)

.controller('helloController2', function($scope, reactState) {
    $scope.user =  user

    const update = reactState("user", $scope.user)

    setInterval(() => {
        $scope.user.token = Math.random()
        // Notify scope
        update($scope.user)
        $scope.$apply()
    }, 3000)

})


.controller('helloController4', function($scope, reactState) {
    $scope.user =  user

    reactState("user", $scope.user)
    render(<UserPage/>, userPageEL)

    setInterval(() => {
        $scope.user.token = Math.random()
        // Notify scope
        $scope.$apply()
    }, 3000)

})
.controller('helloController3', function($scope, reactState) {

    $scope.user =  user

    $scope.test={fun: ()=>$scope.user.name="DUDE!"}


    $scope.updateToken = () => {
        $scope.loading=true
        setTimeout(() => {
            $scope.user.token = Math.random()
            $scope.loading=false
            // Notify scope
            $scope.$apply()
        }, 3000)
    }

})
.controller('helloController1', function($scope, reactState) {

    $scope.user =  user

    const updater = reactState('user')

    render(<WelcomePage/>, welcomePageEL)
    render(<UserPage />, userPageEL)

    setInterval(() => {
        $scope.user.token = Math.random()
        // Notify subscribers.
        updater($scope.user)
        // Notify scope
        $scope.$apply()
    }, 3000)

})
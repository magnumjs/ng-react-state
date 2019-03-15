import angular from 'angular'
import * as React from 'react';
import { render } from "react-dom";
import WelcomePage from '../react-comps/App'
import UserPage from '../react-comps/UserPage'
import {useSharedState, useHooksOutside} from 'shared-state-hook'


const welcomePageEL = document.getElementById("welcomePage");
const userPageEL = document.getElementById("userPage");

const user = {
    name: "Mike",
    guid: 123455,
    token: Math.random()
}

const module =  angular.module('timer', ['react-state'])
    .value("WelcomePage", WelcomePage)
    .value("UserPage", UserPage)
    .controller('helloController', function($scope, reactState) {

        $scope.user= user

        // useHooksOutside(()=>useSharedState("user", $scope.user))
       // var ret= reactState('user', $scope.user)
        // console.log(ret)

        setInterval(()=>{
            $scope.user.token= Math.random()
            $scope.$apply()
        }, 3000)


    });

export default module

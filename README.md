# ng-react-state

[![npm (scoped)](https://img.shields.io/npm/v/@magnumjs/ng-react-state.svg)](https://github.com/magnumjs/ng-react-state)
[![npm bundle size (minified)](https://img.shields.io/github/size/magnumjs/ng-react-state/dist/ng-react-state.min.js.svg)](https://github.com/magnumjs/ng-react-state)

Shared React State Hooks in Angular 1


## Install

```
$ npm install @magnumjs/ng-react-state
```

## Usage

```
$ npm run start
//=> "http://localhost:3000"
```

With [ngReact]() you can set React components into Angular1.
But what about sharing state across all React Components?
With [top-state-hook]() and [ngReactState]() we can now access and change the same state that will auto re-render.

## React shared State Component Angular1 Factory


```html
<div ng-controller="helloController">
    <div id="user-provider"></div>
</div>
```

```js
angular.module('app', ['react', 'react-state'])
.controller('helloController', function($scope, reactState) {

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
//=> "!"
```


## React shared State Component Angular1 Directive


```html
<div ng-controller="helloController">
    <react-state name="user" props="user" updater="updater"></react-state>
</div>
```

```js
angular.module('app', ['react', 'react-state'])
.controller('helloController', function($scope) {

  $scope.user = {
    name: "Mike",
    guid: 123455,
    token: Math.random()
  }

  setInterval(function() {

    $scope.user.token = Math.random()
      // Notify subscribers.
    $scope.updater($scope.user)
  }, 3000)

})
//=> "!"
```
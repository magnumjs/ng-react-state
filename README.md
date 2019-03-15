# ng-react-state

[![npm (scoped)](https://img.shields.io/npm/v/ng-react-state.svg)](https://www.npmjs.com/package/ng-react-state)
[![npm bundle size (minified)](https://img.shields.io/github/size/magnumjs/ng-react-state/dist/ng-react-state.min.js.svg)](https://unpkg.com/ng-react-state)

<i>Shared React State Hooks in Angular 1</i>

  [Angular 1](https://code.angularjs.org/1.6.7/docs/guide/introduction) Directives and factory with [React Hooks](https://reactjs.org/docs/hooks-intro.html) 
    to share and auto re-render state across [React Components](https://reactjs.org/docs/react-component.html)
    without props passing or parent hierarchies


## Install

```
$ npm install ng-react-state
```

## Usage

```
$ npm run start
//=> "http://localhost:3000"
```

With [ngReact](https://github.com/ngReact/ngReact) you can set React components into Angular1.
But what about sharing state across all React Components?
With [shared-state-hook](https://github.com/magnumjs/shared-state-hook) 
and [ngReactState](https://github.com/magnumjs/ng-react-state) 
we can now access and change the same state that will auto re-render those components without passing props.

## Browser install
```html
<script src="//unpkg.com/ng-react-state"></script>
```

[https://unpkg.com/ng-react-state](https://unpkg.com/ng-react-state)

# Examples

[Try it on JSBin](https://jsbin.com/tehakaxalo/edit?html,js,output)

## React shared State Component Angular1 Directive

```jsx harmony
const WelcomePage= props => {
    const [user, setUser] = useSharedState("user");

    const { name, guid, token } = user;

    return (
        <>
            <b>Welcome Page: </b>
            {name} {guid}
            <button onClick={() => setUser({ token: Math.random() })}>Change</button>
            {token}
        </>
    );
};
```

```html
<div ng-controller="helloController">
    <react-state name="user"></react-state>
    <react-component name="WelcomePage"></react-component>
</div>
```

```js
angular.module('app', ['react-state'])
.controller('helloController', function($scope) {

  $scope.user = {
    name: "Mike",
    guid: 123455,
    token: Math.random()
  }

  setInterval(function() {
    $scope.user.token = Math.random()
      // Notify subscribers.
    $scope.$apply()
  }, 3000)

})
//=> "!"
```


## React shared State Component Angular1 Factory

```html
<div ng-controller="helloController">
    <div id="welcomePage"></div>
</div>
```

```js
angular.module('app', ['react-state'])
.controller('helloController', function($scope, reactState) {

  $scope.user = {
    name: "Joe",
    guid: 123455,
    token: Math.random()
  }

  reactState('user', $scope.user)
  render(<WelcomePage />, document.getElementById("welcomePage"));

  setInterval(function() {
    $scope.user.token = Math.random()
      // Notify subscribers.
    $scope.$apply()
  }, 3000)

})
//=> "!"
```


# Api

The angular module attaches itself to angular as "react-state" and can be injected as such:

```js
angular.module("app", ["react-state"])
```

It also exposes 4 objects to the global or window `ngReactState`

```export {reactState, createReactProvider, reactComponent}```

1. reactState - directive

```<react-state name="ScopeNameObject" [Optional Scope name Object: props=""] [Optional Scope name update Function: updater=""]></react-state>```

2. reactComponent - directive

```<react-component name="ComponentName" props="Optional scope Object"></react-component>```

3. createReactProvider - factory alias "reactState"

```returns Updater Function = reactState(Name: String, [Optional InitialValue: Props: Object], [Optional onUpdate: Function])```

`Name` is the name of the `useSharedState` provider


# ng-react-state

[![npm (scoped)](https://img.shields.io/npm/v/@magnumjs/ng-react-state.svg)](https://www.npmjs.com/package/@magnumjs/ng-react-state)
[![npm bundle size (minified)](https://img.shields.io/github/size/magnumjs/ng-react-state/dist/ng-react-state.min.js.svg)](https://unpkg.com/@magnumjs/ng-react-state)

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

With [ngReact](https://github.com/ngReact/ngReact) you can set React components into Angular1.
But what about sharing state across all React Components?
With [top-state-hook](https://github.com/mvolkmann/top-state-hook) 
and [ngReactState](https://github.com/magnumjs/ng-react-state) 
we can now access and change the same state that will auto re-render those components without passing props.

## Browser install
```html
  <script src="//unpkg.com/@magnumjs/ng-react-state"></script>
```

# Examples

[JSBIN - directives](unpkg.com/@magnumjs/ng-react-state)

## React shared State Component Angular1 Factory

```jsx harmony
const WelcomePage= props => {
    const [user, setUser] = useTopState("user");

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


## React shared State Component Angular1 Directive


```html
<div ng-controller="helloController">
    <react-state name="user" props="user"></react-state>
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

# Api

The angular module attaches itself to angular as "react-state" and can be injected as such:

```js
angular.module("app", ["react-state"])
```

It also exposes 4 objects to the global or window `ngReactState`

```export {reactState, createReactProvider, reactComponent, useSharedState}```

1. reactState - directive
2. reactComponent - directive
3. createReactProvider - factory alias "reactState"
4. useSharedState - React Hook


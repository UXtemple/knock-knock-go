# knock-knock-go

knock-knock-go is React a helper to simplify the process of loading asynchronous components by
dealing with the logic around when to render the component, an error or a loading message.

How to use it:

```js
// my-knock-knock-go.es6
import createKnockKnockGo from 'knock-knock-go';
import React from 'react';

const MyLoader = props => <div>My custom loader</div>;
const MyError = props => <div>My nice error handler</div>;
const myKnockKnockGo = createKnockKnockGo(MyLoader, MyError);

// my-component.es6
import myKnockKnockGo from './my-knock-knock-go';
import React from 'react';

const MyComponent = props => <div>do some good stuff</div>;
const KnockKnockGoMyComponent = myKnockKnockGo(
  // check if we should be loading
  props => typeof props.isLoading === 'undefined' || props.isLoading,
  // check if we should show an error
  props => props.error,
  // all going well, render this thing
  MyComponent
);
```

Most times your asynchronously loaded component would need to try to get some data so that it can
actually render anything. You can do it in many ways, here's one with `redux` and `react-redux`:

```js
// my-other-component.es6
import { connect } from 'react-redux';
// these are your actions
import { fetchIfNeeded } from './actions';
import myKnockKnockGo from './my-knock-knock-go';
import React from 'react';

const MyOtherComponent = props => <div>do some good stuff</div>;
const KnockKnockGoMyOtherComponent = myKnockKnockGo(
  // check if we should be loading
  props => typeof props.isLoading === 'undefined' || props.isLoading,
  // check if we should show an error
  props => props.error,
  // all going well, render this thing
  MyOtherComponent,
  // ...and, before load run this thing because I really need whatever it has to work
  component => component.props.dispatch(fetchIfNeeded())
);

function mapStateToProps(state, props) {
  // state.myThing would contain isLoading, isReady, error, etc. and all the needed things for your
  // final component to work
  return state.myThing;
}

export default connect(mapStateToProps)(KnockKnockGoMyOtherComponent);
```

License MIT.

with <3 by [UXtemple](https://uxtemple.com).

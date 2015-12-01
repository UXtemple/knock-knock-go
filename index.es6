import compose from 'recompose/compose';
import errorKnocker from './error-knocker';
import lifecycle from 'recompose/lifecycle';
import loadKnocker from './load-knocker';
import React from 'react';

export default function createKnockKnockGo(LoadingComponent, ErrorComponent, WrapperComponent='div') {
  return function knockKnockGo(isLoading, hasErrors, BaseComponent, beforeLoad) {
    let beforeKnocker;
    if (typeof beforeLoad === 'function') {
      beforeKnocker = lifecycle(
        beforeLoad,
        _ => _
      );
    }

    const knocker = loadKnocker(
      isLoading,

      errorKnocker(
        hasErrors,
        BaseComponent,
        ErrorComponent
      ),

      LoadingComponent
    );

    const composedComponent = typeof beforeKnocker === 'undefined' ?
      compose(knocker) :
      compose(
        beforeKnocker,
        knocker
      );

    return composedComponent(WrapperComponent);
  };
}

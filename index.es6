import compose from 'recompose/compose';
import doOnReceiveProps from 'recompose/doOnReceiveProps';
import React from 'react';
import setDisplayName from 'recompose/setDisplayName';

const DefaultError = () => <div>error...</div>;
const DefaultLoading = () => <div>loading...</div>;

export default function createKnockKnockGo(LoadingComponent=DefaultLoading, ErrorComponent=DefaultError) {
  return function knockKnockGo(isLoading, hasErrors, BaseComponent, beforeLoad) {
    let beforeKnock;
    if (typeof beforeLoad === 'function') {
      beforeKnock = doOnReceiveProps(beforeLoad);
    }

    const KnockKnockGo = props => {
      if (isLoading(props)) {
        return <LoadingComponent {...props} />;
      } else if (hasErrors(props)) {
        return <ErrorComponent {...props} />;
      } else {
        return <BaseComponent {...props} />;
      }
    };

    return typeof beforeKnock === 'undefined' ?
      KnockKnockGo :
      setDisplayName('KnockKnockGo')(beforeKnock(KnockKnockGo));
  };
}

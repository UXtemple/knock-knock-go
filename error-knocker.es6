import branch from 'recompose/branch';
import React from 'react';

export const DefaultError = () => <div>error...</div>;

export default function errorKnocker(hasErrors, BaseComponent, ErrorComponent = DefaultError) {
  return branch(
    hasErrors,
    () => ErrorComponent,
    () => BaseComponent
  );
}

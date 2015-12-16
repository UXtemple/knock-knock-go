import branch from 'recompose/branch';
import React from 'react';

export const DefaultLoading = () => <div>loading...</div>;

export default function loadKnocker(isLoading, BaseComponent, LoadingComponent = DefaultLoading) {
  return branch(
    isLoading,
    () => LoadingComponent,
    BaseComponent
  );
}

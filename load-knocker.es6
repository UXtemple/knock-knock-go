import branch from 'recompose/branch';

export const DefaultLoading = () => <div>loading...</div>;

export default function loadKnocker(isLoading, BaseComponent, LoadingComponent = DefaultLoading) {
  return branch(
    isLoading,
    () => LoadingComponent,
    BaseComponent
  );
}

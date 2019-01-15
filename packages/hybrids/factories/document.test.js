import { expect } from '@open-wc/testing';
import { documentFactory } from './document.js';
import { spy } from 'sinon';
import gql from 'graphql-tag';

describe('documentFactory', function() {
  const onSetSpy = spy();
  it('should call onSet', function() {
    const descriptor = documentFactory({ onSet: onSetSpy })();
    descriptor.set(null, gql`query { foo }`);
    expect(onSetSpy).to.have.been.called;
    onSetSpy.resetHistory();
  });

  it('should perform noop when onSet is undefined', function() {
    const descriptor = documentFactory({})();
    descriptor.set(null, gql`query { foo }`);
    expect(onSetSpy).to.not.have.been.called;
  });
});

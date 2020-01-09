/**
 * Deduping Mixin
 * @type {WeakMap}
 * @license MIT
 * Copyright (c) 2019 ING Bank NV Amsterdam
 * See https://github.com/ing-bank/lion
 */

import { expect } from '@open-wc/testing';

import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin';
import { dedupeMixin } from './dedupe-mixin';

describe('dedupeMixin', () => {
  function createMixin(name) {
    return superClass =>
      class MixinClass extends superClass {
        getMixinNames() {
          const superName = super.getMixinNames ? ` ${super.getMixinNames()}` : '';
          return `${name}${superName}`;
        }
      };
  }

  function createMixins(...names) {
    return names.map(name => createMixin(name));
  }

  it('dedupes mixins', () => {
    const [Mixin1, Mixin2, Mixin3] = createMixins('Mixin1', 'Mixin2', 'Mixin3');
    const DedupingMixin3 = dedupeMixin(Mixin3);
    class BaseClass {}
    class MixedClass1 extends DedupingMixin3(Mixin1(Mixin2(DedupingMixin3(BaseClass)))) {}
    const MixedClass2 = DedupingMixin3(Mixin1(Mixin2(DedupingMixin3(BaseClass))));
    const myObj1 = new MixedClass1();
    const myObj2 = new MixedClass2();
    expect(myObj1.getMixinNames()).to.equal('Mixin1 Mixin2 Mixin3');
    expect(myObj2.getMixinNames()).to.equal('Mixin1 Mixin2 Mixin3');
  });

  it('dedupes mixins only explicitely', () => {
    const [Mixin1, Mixin2, Mixin3] = createMixins('Mixin1', 'Mixin2', 'Mixin3');
    const DedupingMixin3 = dedupeMixin(Mixin3);
    class BaseClass {}
    class MixedClass1 extends Mixin3(Mixin1(Mixin2(DedupingMixin3(BaseClass)))) {}
    class MixedClass2 extends DedupingMixin3(Mixin1(Mixin2(Mixin3(BaseClass)))) {}
    const myObj1 = new MixedClass1();
    const myObj2 = new MixedClass2();
    expect(myObj1.getMixinNames()).to.equal('Mixin3 Mixin1 Mixin2 Mixin3');
    expect(myObj2.getMixinNames()).to.equal('Mixin3 Mixin1 Mixin2 Mixin3');
  });

  it('dedupes mixins applied on inherited base classes', () => {
    const [Mixin1, Mixin2, Mixin3] = createMixins('Mixin1', 'Mixin2', 'Mixin3');
    const DedupingMixin3 = dedupeMixin(Mixin3);
    class BaseClass {}
    class BaseMixedClass extends Mixin1(Mixin2(DedupingMixin3(BaseClass))) {}
    class ExtendedMixedClass extends DedupingMixin3(BaseMixedClass) {}
    const myObj = new ExtendedMixedClass();
    expect(myObj.getMixinNames()).to.equal('Mixin1 Mixin2 Mixin3');
  });

  it('dedupes mixins applied via other mixins', () => {
    const [Mixin1, Mixin2, Mixin3] = createMixins('Mixin1', 'Mixin2', 'Mixin3');
    const DedupingMixin1 = dedupeMixin(Mixin1);
    const DedupingMixin2 = dedupeMixin(Mixin2);
    const DedupingMixin3 = dedupeMixin(Mixin3);
    const Mixin123 = superClass => DedupingMixin1(DedupingMixin2(DedupingMixin3(superClass)));
    const Mixin312 = superClass => DedupingMixin3(DedupingMixin1(DedupingMixin2(superClass)));
    class BaseClass {}
    class MixedClass extends Mixin312(Mixin123(BaseClass)) {}
    const myObj = new MixedClass();
    expect(myObj.getMixinNames()).to.equal('Mixin1 Mixin2 Mixin3');
  });

  it('works with mixins deduped by Polymer', () => {
    const [Mixin1, Mixin2] = createMixins('Mixin1', 'Mixin2');
    const DedMixin1 = dedupeMixin(Mixin1);
    const PolMixin2 = dedupingMixin(Mixin2);
    class BaseClass {}
    class MixedClass extends DedMixin1(PolMixin2(DedMixin1(PolMixin2(BaseClass)))) {}
    const myObj = new MixedClass();
    expect(myObj.getMixinNames()).to.equal('Mixin1 Mixin2');
  });
});

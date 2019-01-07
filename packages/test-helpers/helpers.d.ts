import { TemplateResult } from 'lit-html';

interface IGetElementArgs<TBase> {
  getClass: (() => TBase);
  getTemplate: (() => TemplateResult);
}

export function getElementWithLitTemplate<TBase>(args: IGetElementArgs<TBase>): (...args: any[]) => TBase;

export function isSubscription(x: any): Boolean;

export function hasGetterSetter(obj: any, prop: String): Boolean;

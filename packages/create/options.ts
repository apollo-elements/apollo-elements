export interface BaseOptions {
  pkgManager: 'npm' | 'yarn';
  silent: boolean;
  schemaPath?: string;
  codegen: boolean;
  overwrite: boolean;
  directory: string;
}

export interface AppOptions extends BaseOptions {
  packageDefaults: boolean;
  install: boolean;
  start: boolean;
  uri: string;
}

export type Operation = 'query' | 'mutation' | 'subscription';

export interface ComponentOptions extends BaseOptions {
  name: string;
  operationName: string;
  operation?: string;
  edit?: boolean;
  subdir?: string;
  type: Operation;
  sharedCssPath?: string;
  fields?: string;
  variables?: string;
}

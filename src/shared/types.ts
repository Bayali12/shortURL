import { ReactElement } from 'react';

export type UserCredentials = {
  username: string;
  password: string;
};

export type Link = {
  id: number;
  short: string;
  target: string;
  counter: number;
};

export type ColumnProps<T> = {
  key: keyof T;
  title: string | ReactElement;
  render?: (column: ColumnProps<T>, item: T) => ReactElement;
  sortable?: boolean;
};

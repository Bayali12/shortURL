import classNames from 'classnames';

import { ColumnProps } from '../../shared/types';

import styles from './styles.module.scss';

type Props<T> = {
  columns: Array<ColumnProps<T>>;
  data?: T[];
  sortField?: keyof T | null;
  sortOrder?: 'asc' | 'desc' | null;
  handleSort?: (sortField: keyof T) => void;
};

const Table = <T,>({
  data,
  columns,
  sortField,
  sortOrder,
  handleSort,
}: Props<T>) => {
  const headers = columns.map((column, index) => {
    return (
      <th key={`headCell-${index}`}>
        <div className={styles.headCellWrapper}>
          {column.title}
          {column.sortable && (
            <button
              onClick={() => handleSort?.(column.key)}
              className={classNames(styles.sortButton, {
                [styles.active]: sortField === column.key,
                [styles.desc]: sortOrder === 'desc',
              })}>
              ▲
            </button>
          )}
        </div>
      </th>
    );
  });

  const rows = !data?.length ? (
    <tr>
      <td colSpan={columns.length}>No data</td>
    </tr>
  ) : (
    data?.map((row, index) => {
      return (
        <tr key={`row-${index}`}>
          {columns.map((column, index2) => {
            const value = column.render
              ? column.render(column, row as T)
              : (row[column.key as keyof typeof row] as string);

            return <td key={`cell-${index2}`}>{value}</td>;
          })}
        </tr>
      );
    })
  );

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>{headers}</tr>
        </thead>

        <tbody>{rows}</tbody>
      </table>
    </div>
  );
};

export default Table;

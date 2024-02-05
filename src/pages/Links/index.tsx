import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  fetchAllLinks,
  setCurrentPage,
  setSortField,
  setSortOrder,
} from '../../redux/slices/links';
import Table from '../../components/Table';
import { columns } from './TableColums/columns';
import Pagination from '../../components/Pagination';
import { Link } from '../../shared/types';

import styles from './styles.module.scss';

export const Links = () => {
  const data = useAppSelector((state) => state.links.links);
  const { total, page, sortField, sortOrder } = useAppSelector(
    (state) => state.links,
  );
  const dispatch = useAppDispatch();

  const handleSort = (field: keyof Link) => {
    const newOrder =
      sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    dispatch(setSortField(field));
    dispatch(setSortOrder(newOrder));
  };

  useEffect(() => {
    dispatch(fetchAllLinks({ page, sortField, sortOrder }));
  }, [page, sortField, sortOrder]);

  return (
    <div className={styles.linksWrapper}>
      {data && (
        <>
          <Table
            data={data}
            columns={columns}
            sortField={sortField}
            sortOrder={sortOrder}
            handleSort={handleSort}
          />
        </>
      )}
      <Pagination
        siblingCount={1}
        className={styles.paginationBar}
        currentPage={page + 1}
        totalCount={total}
        pageSize={10}
        onPageChange={(page) => dispatch(setCurrentPage(page - 1))}
      />
    </div>
  );
};

import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectFilteredCampers,
  selectCampersStatus,
  selectCampersIsLoadingMore,
  selectCampersError,
  selectCampersFilters,
  setCampersFilters,
  selectCampersPage,
  selectCampersHasMore,
  incrementPage,
  resetCampers,
} from '../../redux/campersSlice';
import { fetchCampers } from '../../redux/operations';
import CamperFilters from '../../components/CamperFilters/CamperFilters';
import CampersList from '../../components/CampersList/CampersList';
import styles from './CampersPage.module.css';

const LIMIT = 10;

const CampersPage = () => {
  const dispatch = useDispatch();
  const campers = useSelector(selectFilteredCampers);
  const status = useSelector(selectCampersStatus);
  const isLoadingMore = useSelector(selectCampersIsLoadingMore);
  const error = useSelector(selectCampersError);
  const filters = useSelector(selectCampersFilters);
  const page = useSelector(selectCampersPage);
  const hasMore = useSelector(selectCampersHasMore);

  // Track previous filters to reset only when filters change
  const prevFilters = useRef(filters);

  useEffect(() => {
    // If filters changed, reset campers and fetch first page
    if (prevFilters.current !== filters) {
      dispatch(resetCampers());
      dispatch(fetchCampers({ page: 1, limit: LIMIT }));
      prevFilters.current = filters;
    } else {
      dispatch(fetchCampers({ page, limit: LIMIT }));
    }
    // eslint-disable-next-line
  }, [dispatch, page, filters]);

  const handleSetFilters = (newFilters) => {
    dispatch(setCampersFilters(newFilters));
    // No need to resetCampers or fetch here, handled in useEffect
  };

  const handleLoadMore = () => {
    dispatch(incrementPage());
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.filtersCol}>
        <CamperFilters filters={filters} setFilters={handleSetFilters} />
      </div>
      <div className={styles.cardsCol}>
        {error && <p>Error: {error}</p>}
        <CampersList campers={campers} status={status} />
        {hasMore && (
          <div style={{ textAlign: 'center', margin: '1rem 0' }}>
            <button
              className="load-more-btn"
              onClick={handleLoadMore}
              disabled={isLoadingMore}
            >
              {isLoadingMore ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CampersPage;
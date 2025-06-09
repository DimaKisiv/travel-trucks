import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
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
} from "../../redux/campersSlice";
import { fetchCampers } from "../../redux/operations";
import CamperFilters from "../../components/CamperFilters/CamperFilters";
import CampersList from "../../components/CampersList/CampersList";
import Loader from "../../components/Loader/Loader";
import styles from "./CampersPage.module.css";

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

  const prevFilters = useRef(filters);

  useEffect(() => {
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
  };

  const handleLoadMore = () => {
    dispatch(incrementPage());
  };

  return (
    <main className="main">
      <CamperFilters filters={filters} setFilters={handleSetFilters} />
      <section className={styles.results}>
        {status === "loading" && <Loader />}
        {error && <p>Error: {error}</p>}
        <CampersList campers={campers} status={status} />
        {hasMore && (
          <button
            className={styles.loadMore}
            onClick={handleLoadMore}
            disabled={isLoadingMore}
          >
            {isLoadingMore ? <Loader /> : "Load More"}
          </button>
        )}
      </section>
    </main>
  );
};

export default CampersPage;

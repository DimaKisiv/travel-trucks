import React, { useEffect, useRef, useState } from "react";
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
import CamperFilters from "../../components/CampersPage/CamperFilters/CamperFilters";
import CampersList from "../../components/CampersPage/CampersList/CampersList";
import Loader from "../../components/Shared/Loader/Loader";
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

  const [localFilters, setLocalFilters] = useState(filters);

  const prevFilters = useRef(filters);

  useEffect(() => {
    if (prevFilters.current !== filters) {
      dispatch(resetCampers());
      dispatch(fetchCampers({ page: 1, limit: LIMIT }));
      prevFilters.current = filters;
    } else {
      dispatch(fetchCampers({ page, limit: LIMIT }));
    }
  }, [dispatch, page, filters]);

  const handleLocalFiltersChange = (newFilters) => {
    setLocalFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleSearch = () => {
    dispatch(setCampersFilters(localFilters));
  };

  const handleLoadMore = () => {
    dispatch(incrementPage());
  };

  return (
    <main className="main campers-page">
      <CamperFilters
        filters={localFilters}
        setFilters={handleLocalFiltersChange}
        onSearch={handleSearch}
      />
      <section className={styles.results}>
        {status === "loading" && <Loader />}
        {error && <p>Error: {error}</p>}
        <CampersList campers={campers} status={status} />
        {hasMore && campers.length > 0 && (
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

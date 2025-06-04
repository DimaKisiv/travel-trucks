import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCamperById } from '../../redux/operations';
import { selectCamper, selectCamperStatus, selectCamperError } from '../../redux/camperSlice';

const CamperPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const camper = useSelector(selectCamper);
  const status = useSelector(selectCamperStatus);
  const error = useSelector(selectCamperError);

  useEffect(() => {
    if (id) {
      dispatch(fetchCamperById(id));
    }
  }, [dispatch, id]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!camper) {
    return <div>No camper found.</div>;
  }

  return (
    <div>
      <h2>{camper.name}</h2>
      <p>{camper.description}</p>
      <img
        src={camper.gallery?.[0]?.original || 'https://via.placeholder.com/400x240?text=No+Image'}
        alt={camper.name}
        style={{ width: '300px', borderRadius: '8px', marginBottom: '1rem' }}
      />
      <ul>
        <li><strong>Location:</strong> {camper.location}</li>
        <li><strong>Price:</strong> {camper.price}</li>
        <li><strong>Rating:</strong> {camper.rating}</li>
        <li><strong>Type:</strong> {camper.form}</li>
        <li><strong>Length:</strong> {camper.length}</li>
        <li><strong>Width:</strong> {camper.width}</li>
        <li><strong>Height:</strong> {camper.height}</li>
        <li><strong>Tank:</strong> {camper.tank}</li>
        <li><strong>Consumption:</strong> {camper.consumption}</li>
        <li><strong>Transmission:</strong> {camper.transmission}</li>
        <li><strong>Engine:</strong> {camper.engine}</li>
        <li><strong>AC:</strong> {camper.AC ? 'Yes' : 'No'}</li>
        <li><strong>Bathroom:</strong> {camper.bathroom ? 'Yes' : 'No'}</li>
        <li><strong>Kitchen:</strong> {camper.kitchen ? 'Yes' : 'No'}</li>
        <li><strong>TV:</strong> {camper.TV ? 'Yes' : 'No'}</li>
      </ul>
      <h3>Reviews</h3>
      <ul>
        {camper.reviews?.map((review, idx) => (
          <li key={idx}>
            <strong>{review.reviewer_name}</strong> ({review.reviewer_rating}/5): {review.comment}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CamperPage;
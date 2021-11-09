import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../services/API';

export default function Reviews() {
  const [reviews, setReviews] = useState(null);
  const { slug } = useParams();
  const movieId = slug.match(/[a-z0-9]+$/)[0];

  // console.log(movieId);
  
  useEffect(() => {
    fetchMovieReviews(movieId).then(data => setReviews(data.results));
  }, [movieId]);

  if (reviews && reviews.length > 0) {
    return (
      <ul>
        {reviews.map(review => (
          <li key={review.id}>
            <h3>{review.author}</h3>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    );
  }

  return <p>We don't have any reviews for this movie</p>;
}
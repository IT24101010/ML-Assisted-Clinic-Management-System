import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

/**
 * Reusable Star Rating Component
 * @param {number} rating - Current star rating (1-5)
 * @param {function} setRating - function to update the rating (for input mode)
 * @param {boolean} editable - whether the user can click to change rating
 */
const StarRating = ({ rating, setRating, editable = false }) => {
    const [hover, setHover] = useState(null);

    return (
        <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, index) => {
                const currentRating = index + 1;

                return (
                    <label key={currentRating}>
                        {editable && (
                            <input
                                type="radio"
                                name="rating"
                                className="hidden"
                                value={currentRating}
                                onClick={() => setRating(currentRating)}
                            />
                        )}
                        <FaStar
                            className={`transition-colors duration-200 ${editable ? 'cursor-pointer' : 'cursor-default'
                                }`}
                            size={28}
                            color={currentRating <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                            onMouseEnter={() => editable && setHover(currentRating)}
                            onMouseLeave={() => editable && setHover(null)}
                        />
                    </label>
                );
            })}
        </div>
    );
};

export default StarRating;

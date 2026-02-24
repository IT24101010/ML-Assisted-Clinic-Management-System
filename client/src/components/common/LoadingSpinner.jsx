import { FiLoader } from 'react-icons/fi';

const LoadingSpinner = () => {
    return (
        <div className="flex flex-col items-center justify-center py-12">
            <FiLoader className="animate-spin text-4xl text-primary mb-2" />
            <p className="text-textSecondary">Loading...</p>
        </div>
    );
};

export default LoadingSpinner;

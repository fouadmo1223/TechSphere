import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div 
      className="w-full flex flex-col items-center justify-center bg-gray-50 p-4 text-center"
      style={{ height: 'calc(100vh - 82px)' }}
    >
      <div className="max-w-md w-full">
        {/* SVG Illustration */}
        <div className="mb-8 w-full">
          <svg 
            width="100%" 
            viewBox="0 0 500 300" 
            className="mx-auto text-gray-300"
            aria-hidden="true"
          >
            <path 
              d="M100,150 C150,50 350,50 400,150" 
              stroke="currentColor" 
              strokeWidth="2" 
              fill="none"
            />
            <circle cx="100" cy="150" r="8" fill="currentColor" />
            <circle cx="400" cy="150" r="8" fill="currentColor" />
            <g transform="translate(250, 130)">
              <rect x="-60" y="0" width="120" height="80" rx="10" fill="white" stroke="currentColor" strokeWidth="2" />
              <text 
                x="0" 
                y="45" 
                textAnchor="middle" 
                fill="currentColor" 
                fontSize="40" 
                fontWeight="bold"
              >
                404
              </text>
              <path 
                d="M-40,80 L40,80 M-20,80 L-20,100 M20,80 L20,100" 
                stroke="currentColor" 
                strokeWidth="3"
              />
            </g>
            <path 
              d="M180,200 L200,180 L220,200 L240,180 L260,200 L280,180 L300,200 L320,180" 
              stroke="currentColor" 
              strokeWidth="2" 
              fill="none"
            />
          </svg>
        </div>

        {/* Message */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
        <p className="text-gray-500 mb-6">
          The content you're looking for has disappeared into the digital void.
        </p>

        {/* Action Button */}
        <Link href="/">
          <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-lg font-medium">
            Return to Safety
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
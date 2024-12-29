import React, { useEffect, useState } from 'react';

const SplashScreen = ({ onComplete }) => {
  const [show, setShow] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      if (onComplete) onComplete();
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [onComplete]);
  
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900">
      <div className="text-center">
        <div className="rounded-full bg-gray-800 p-8 border-4 border-green-400  shadow-lg shadow-green-400/20 mb-4">
          <div className="flex flex-col items-center gap-2">
            <div className="text-green-400 text-4xl">
              {'</>'}
            </div>
            <div className="text-white text-5xl font-bold tracking-wider">
              SOCO
            </div>
            <div className="text-green-400 text-xl font-light">
              Source Code
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
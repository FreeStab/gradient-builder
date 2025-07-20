import React, { useState, useEffect } from 'react';
import { Icon } from "@iconify/react";
import { setupOfflineListener } from '../utils/serviceWorker';
import './OfflineIndicator.css';

const OfflineIndicator = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [showIndicator, setShowIndicator] = useState(false);

  useEffect(() => {
    const cleanup = setupOfflineListener((offline) => {
      setIsOffline(offline);
      setShowIndicator(true);
      
      // Hide indicator after 3 seconds when back online
      if (!offline) {
        setTimeout(() => setShowIndicator(false), 3000);
      }
    });

    // Show indicator if already offline
    if (isOffline) {
      setShowIndicator(true);
    }

    return cleanup;
  }, [isOffline]);

  if (!showIndicator) return null;

  return (
    <div className={`offline-indicator ${isOffline ? 'offline' : 'online'}`}>
      <Icon 
        icon={isOffline ? "mdi:wifi-off" : "mdi:wifi"} 
        width={16} 
        height={16} 
      />
      <span>
        {isOffline 
          ? "You're offline - but the app still works!" 
          : "You're back online!"
        }
      </span>
    </div>
  );
};

export default OfflineIndicator;

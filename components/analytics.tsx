'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AnalyticsTracker() {
  const [userCountry, setUserCountry] = useState('Unknown');
 
  useEffect(() => {
    const fetchGeoData = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        const userIP = data.ip;

        const countryResponse = await fetch(
          `https://ipapi.co/${userIP}/country/`
        );
        const country = await countryResponse.text();

        setUserCountry(country);
      } catch (error) {
        console.error('Error fetching user country:', error);
      }
    };

    fetchGeoData();
  }, []);

  useEffect(() => {
    const trackPageView = async () => {
      try {
        const response = await axios.post('/api/analytics', {
          page: window.location.pathname,
          referrer: document.referrer,
          userAgent: navigator.userAgent,
          country: userCountry,
        });
        console.log('Analytics tracked:', response.data);
      } catch (error) {
        console.error('Error tracking analytics:', error);
      }
    };

    if (userCountry !== 'Unknown') {
      trackPageView();
    }
  }, [userCountry]);

  return <></>; // This component doesn't render anything
}

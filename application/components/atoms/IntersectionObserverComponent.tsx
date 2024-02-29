import React from 'react';
import { useRef, useEffect } from 'react';

type AppProps = {
  onIntersect: () => void;
};
const IntersectionObserverComponent = ({ onIntersect }:AppProps) => {
    const intersectionRef = useRef(null);
  
    useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log('Intersecting');
            onIntersect(); // Trigger the function when intersecting
          }
        });
      }, { threshold: 1.0 }); // Fully visible
  
      if (intersectionRef.current) {
        observer.observe(intersectionRef.current);
      }
  
      return () => {
        if (intersectionRef.current) {
          observer.unobserve(intersectionRef.current);
        }
      };
    }, [onIntersect]);
  
    return <div ref={intersectionRef} style={{ minHeight: '100px' }} />;
  };
  
  export default IntersectionObserverComponent;

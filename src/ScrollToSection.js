import React, { useEffect } from 'react';

function  ScrollToSection () {
  
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const startPosition = window.pageYOffset;
      const targetPosition = section.offsetTop;
      const distance = targetPosition - startPosition;
      const duration = 1000; // Set the scroll duration in milliseconds
      let startTime = null;

      const scroll = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime; 
        const run = easeInOut(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) {
          requestAnimationFrame(scroll); // Continue the scroll animation
        }
      };

      const easeInOut = (t, b, c, d) => {
        // Easing function for smooth acceleration/deceleration
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
      };

      requestAnimationFrame(scroll); // Start the scroll animation

      // Update the URL hash (ID) in the browser
      window.location.hash = sectionId;
    }
  };

  useEffect(() => {
    // Ensure that there is no hash in the URL when the page loads
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname); // Remove the hash from URL
    }
  }, []);

  return (
    <div>
      <nav>
        <div className="sticky-buttons">
          {/* Buttons that stay at the top while scrolling */}
          <button onClick={() => scrollToSection('section1')}>Go to Section 1</button> | 
          <button onClick={() => scrollToSection('section2')}>Go to Section 2</button>
        </div>
      </nav>

      <div style={{ height: '100vh', backgroundColor: '#f0f0f0' }}>
        <h2>Header or Some Content</h2>
      </div>

      <div id="section1" style={{ height: '100vh', backgroundColor: '#c0f0c0' }}>
        <h2>This is Section 1</h2>
      </div>

      <div id="section2" style={{ height: '100vh', backgroundColor: '#f0c0f0' }}>
        <h2>This is Section 2</h2>
      </div>
    </div>
  );
};

export default ScrollToSection;

import React, { Suspense, useEffect, useState } from 'react';
import Caption from '../components/ui/Caption';
import '../styles/Welcome.css';
import Loader from '../components/ui/Loader';

//Modal Lazy Load
const CreateModal = React.lazy(() => import("../components/modal/loginModal"));
const showStatus = () => alert("Currently in Work-In-Progress state");

function WelcomePage() {
  //preFetching Modal

  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const preLoadTimer = setTimeout(() => {
      import("../components/modal/loginModal");
    }, 800);

    //show loader if takes prefetching is long/fails

    const loaderTimer = setTimeout(() => {
      setShowLoader(true);
    }, 1000);

    return () => {
      clearTimeout(preLoadTimer);
      clearTimeout(loaderTimer);
    }
  }, []);


  return (
    <main className="hero-wrapper">
      {/* Background image */}
      <img
        src="/bg.webp"
        alt="Hero illustration"
        className="background-image"
        aria-hidden="true"
        loading="lazy"
        decoding="async"
      />

      {/* Top-right container for button and modal */}
      <section className="top-right-container" aria-label="Authentication area">
        <Caption />
        <Suspense fallback={showLoader ? <Loader text="Loading login..." /> : null}>
          <CreateModal />
        </Suspense>
        <div className="top-right-buttons">
          <button className="top-right-button" onClick={showStatus} aria-label="Feature in progress">
            Create Account
          </button>
        </div>

      </section>

      {/* Left side : Logo */}
      <section className="left-side-text" aria-label="Brand logo section">
        <img
          src="/runWayCartLogo.png"
          alt="RunwayCart Logo"
          className="logo"
          loading="lazy"
          decoding="async" />
      </section>
    </main>
  );
}

export default WelcomePage;

import CreateModal from '../components/modal/loginModal';
import Caption from '../components/ui/Caption';
import '../styles/Welcome.css';
function WelcomePage() {

  const showStatus = () => alert("Currently in Work-In-Progress state");

  return (
    <main className="hero-wrapper">
      {/* Background image */}
      <img
        src="/bg.png"
        alt="Hero illustration"
        className="background-image"
        aria-hidden="true"
      />

      {/* Top-right container for button and modal */}
      <div className="top-right-container">
        <Caption />
        <CreateModal />
        <div className="top-right-buttons">
          <button className="top-right-button" onClick={showStatus} aria-label="Feature in progress">
            Create Account
          </button>
        </div>

      </div>

      {/* Left side : Logo */}
      <div className="left-side-text">
        <img src="/runWayCartLogo.png" alt="RunwayCart Logo" className="logo" />
      </div>
    </main>
  );
}

export default WelcomePage;

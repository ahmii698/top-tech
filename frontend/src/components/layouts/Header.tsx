import { Menu, Search, Facebook, Twitter, Instagram, Linkedin, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Header.css';

interface Props {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ darkMode, setDarkMode, setSidebarOpen }: Props) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header className={`header ${darkMode ? 'dark' : ''} ${scrolled ? 'scrolled' : ''}`}>
      {/* DESKTOP LAYOUT */}
      {!isMobile && (
        <div className="header-container desktop-container">
          {/* Left Section */}
          <div className="header-left">
            <button className="menu-toggle" onClick={() => setSidebarOpen(prev => !prev)}>
              <Menu size={24} />
            </button>
            <Link to="/" className="logo-link">
              <h2 className="logo">Top<span>Tech</span></h2>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="nav-menu">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/services" className="nav-link">Services</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
            <Link to="/blog" className="nav-link">Blog</Link>
          </nav>

          {/* Right Section */}
          <div className="header-right">
            <div className="social-icons">
              <a href="#" className="social-icon"><Facebook size={18} /></a>
              <a href="#" className="social-icon"><Twitter size={18} /></a>
              <a href="#" className="social-icon"><Instagram size={18} /></a>
              <a href="#" className="social-icon"><Linkedin size={18} /></a>
            </div>

            <div className="search-container">
              <button className="search-toggle" onClick={() => setSearchOpen(!searchOpen)}>
                <Search size={20} />
              </button>
              
              {searchOpen && (
                <div className="search-bar">
                  <input type="text" placeholder="Search..." className="search-input" autoFocus />
                  <button className="search-submit">Search</button>
                  <button className="search-close" onClick={() => setSearchOpen(false)}>
                    <X size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MOBILE LAYOUT */}
      {isMobile && (
        <div className="header-container mobile-container">
          {/* Top Row */}
          <div className="mobile-top-row">
            <div className="header-left">
              <button className="menu-toggle" onClick={() => setSidebarOpen(prev => !prev)}>
                <Menu size={24} />
              </button>
              <Link to="/" className="logo-link">
                <h2 className="logo">Top<span>Tech</span></h2>
              </Link>
            </div>

            <div className="search-container">
              <button className="search-toggle mobile-search" onClick={() => setSearchOpen(!searchOpen)}>
                <Search size={16} />
              </button>
              
              {searchOpen && (
                <div className="search-bar mobile-search-bar">
                  <input type="text" placeholder="Search..." className="search-input" autoFocus />
                  <button className="search-submit">Search</button>
                  <button className="search-close" onClick={() => setSearchOpen(false)}>
                    <X size={12} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="mobile-nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/services" className="nav-link">Services</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
            <Link to="/blog" className="nav-link">Blog</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
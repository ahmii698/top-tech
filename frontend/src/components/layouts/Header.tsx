import { Moon, Sun, Menu, Search, Facebook, Twitter, Instagram, Linkedin, X } from 'lucide-react';
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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`header ${darkMode ? 'dark' : ''} ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        {/* Left Section - Menu + Logo */}
        <div className="header-left">
          <button 
            className="menu-toggle" 
            onClick={() => {
              console.log('Menu clicked');
              setSidebarOpen(prev => !prev);
            }}
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>
          
          <Link to="/" className="logo-link">
            <h2 className="logo">
              Top<span>Tech</span>
            </h2>
          </Link>
        </div>

        {/* Center Section - Navigation Links */}
        {!isMobile && (
          <nav className="nav-menu">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/services" className="nav-link">Services</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
            <Link to="/blog" className="nav-link">Blog</Link>
          </nav>
        )}

        {/* Right Section */}
        <div className="header-right">
          {/* Social Icons */}
          {!isMobile && (
            <div className="social-icons">
              <a href="#" className="social-icon" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#" className="social-icon" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="#" className="social-icon" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className="social-icon" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
            </div>
          )}

          {/* Search Button */}
          <div className="search-container">
            <button 
              className="search-toggle"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            
            {searchOpen && (
              <div className="search-bar">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="search-input"
                  autoFocus
                />
                <button className="search-submit">Search</button>
                <button className="search-close" onClick={() => setSearchOpen(false)}>
                  <X size={16} />
                </button>
              </div>
            )}
          </div>

         
        </div>
      </div>
    </header>
  );
};

export default Header;
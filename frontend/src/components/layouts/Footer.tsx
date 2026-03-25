import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';  // 👈 YEH IMPORT MISSING THA

interface Props {
  darkMode: boolean;
}

const Footer = ({ darkMode }: Props) => {
  return (
    <footer className={`footer ${darkMode ? 'dark' : ''}`}>
      <div className="footer-container">
        <div className="footer-grid">
          {/* About Section */}
          <div className="footer-section">
            <h3 className="footer-title">Top<span>Tech</span></h3>
            <p className="footer-description">
              Monotonectally synergize granular markets and front markets. 
              Collaboratively visualize strategic infomediaries after multimedia 
              based models.
            </p>
            <div className="social-links">
              <a href="#" aria-label="Facebook"><Facebook size={18} /></a>
              <a href="#" aria-label="Twitter"><Twitter size={18} /></a>
              <a href="#" aria-label="Instagram"><Instagram size={18} /></a>
              <a href="#" aria-label="LinkedIn"><Linkedin size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-section">
            <h3 className="footer-title">Our Services</h3>
            <ul className="footer-links">
              <li><Link to="/services/web">Web Development</Link></li>
              <li><Link to="/services/mobile">Mobile Apps</Link></li>
              <li><Link to="/services/cloud">Cloud Solutions</Link></li>
              <li><Link to="/services/security">Cyber Security</Link></li>
              <li><Link to="/services/consulting">IT Consulting</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h3 className="footer-title">Contact Info</h3>
            <ul className="contact-info">
              <li>
                <MapPin size={18} />
                <span>R870 block17</span>
              </li>
              <li>
                <Phone size={18} />
                <span>03322751363</span>
              </li>
              <li>
                <Mail size={18} />
                <span>xahmedmalik30600@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>© 2026 TopTech. All Rights Reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/terms">Terms</Link>
            <Link to="/privacy">Privacy</Link>
            <Link to="/cookies">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
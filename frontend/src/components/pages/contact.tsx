// pages/Contact.tsx
import { useEffect, useState } from 'react';
import { 
  MapPin, Phone, Mail, Send, Check, Facebook, Twitter, 
  Instagram, Linkedin, Clock, MessageCircle, Users, Globe,
  ArrowRight, Copy, CheckCircle, AlertCircle
} from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    // Set page title
    document.title = 'Contact Us - TopTech | IT Solutions Provider';
    window.scrollTo(0, 0);
  }, []);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      
      // Reset success message after 3 seconds
      setTimeout(() => setFormStatus(''), 3000);
    }, 1500);
  };

  // Copy to clipboard
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  // Contact information
  const contactInfo = [
    {
      id: 1,
      icon: <MapPin size={24} />,
      title: "Visit Us",
      details: ["123 Tech Street", "Silicon Valley, CA 94025", "United States"],
      action: "Get Directions",
      link: "https://maps.google.com"
    },
    {
      id: 2,
      icon: <Phone size={24} />,
      title: "Call Us",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
      action: "Call Now",
      link: "tel:+15551234567"
    },
    {
      id: 3,
      icon: <Mail size={24} />,
      title: "Email Us",
      details: ["info@toptech.com", "support@toptech.com"],
      action: "Send Email",
      link: "mailto:info@toptech.com"
    },
    {
      id: 4,
      icon: <Clock size={24} />,
      title: "Working Hours",
      details: ["Monday - Friday: 9:00 - 18:00", "Saturday: 10:00 - 14:00", "Sunday: Closed"],
      action: "Schedule Meeting",
      link: "#"
    }
  ];

  // FAQ Data
  const faqs = [
    {
      id: 1,
      question: "How quickly can you start my project?",
      answer: "We can typically start within 1-2 weeks after initial consultation and agreement."
    },
    {
      id: 2,
      question: "Do you offer ongoing support?",
      answer: "Yes, we provide 24/7 support and maintenance packages for all our projects."
    },
    {
      id: 3,
      question: "What is your pricing model?",
      answer: "We offer flexible pricing: fixed price, hourly, or monthly retainer based on project needs."
    },
    {
      id: 4,
      question: "Can I see examples of your work?",
      answer: "Absolutely! Check our portfolio or contact us for case studies in your industry."
    }
  ];

  return (
    <div className="contact-container">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="hero-particles"></div>
        <div className="container">
          <div className="contact-hero-content">
            <span className="hero-subtitle">Get In Touch</span>
            <h1 className="hero-title">
              Let's <span className="golden-text">Connect</span> & Create Something Amazing
            </h1>
            <p className="hero-description">
              Have a project in mind? We'd love to hear about it. 
              Our team is ready to help you bring your ideas to life.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="info-cards-section">
        <div className="container">
          <div className="info-cards-grid">
            {contactInfo.map((info) => (
              <div key={info.id} className="info-card">
                <div className="info-icon">{info.icon}</div>
                <h3>{info.title}</h3>
                <div className="info-details">
                  {info.details.map((detail, index) => (
                    <p key={index}>{detail}</p>
                  ))}
                </div>
                <a href={info.link} className="info-action">
                  {info.action} <ArrowRight size={16} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="form-map-section">
        <div className="container">
          <div className="form-map-grid">
            {/* Contact Form */}
            <div className="contact-form-container">
              <div className="form-header">
                <span className="form-subtitle">Send Message</span>
                <h2 className="form-title">Get in <span className="golden-text">Touch</span></h2>
                <p className="form-description">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Full Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Your Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="btn-primary submit-btn"
                  disabled={formStatus === 'sending'}
                >
                  {formStatus === 'sending' ? (
                    'Sending...'
                  ) : formStatus === 'success' ? (
                    <>
                      <Check size={20} />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </button>

                {formStatus === 'success' && (
                  <div className="success-message">
                    <CheckCircle size={20} />
                    <span>Thank you! Your message has been sent successfully.</span>
                  </div>
                )}
              </form>
            </div>

            {/* Map & Additional Info */}
            <div className="map-info-container">
              {/* Map */}
              <div className="map-container">
                <iframe
                  title="office-location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.636256472517!2d-122.088654484685!3d37.422408979825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fba5b3c4c0f0d%3A0x8c3c5f5f5f5f5f5f!2sGoogleplex!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
               
                />
              </div>

              {/* Quick Contact */}
              <div className="quick-contact">
                <h3>Quick Contact</h3>
                <div className="quick-contact-item">
                  <div className="quick-contact-icon">
                    <Mail size={18} />
                  </div>
                  <div className="quick-contact-info">
                    <span>info@toptech.com</span>
                    <button 
                      className="copy-btn"
                      onClick={() => copyToClipboard('info@toptech.com', 'email')}
                    >
                      {copied === 'email' ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>
                <div className="quick-contact-item">
                  <div className="quick-contact-icon">
                    <Phone size={18} />
                  </div>
                  <div className="quick-contact-info">
                    <span>+1 (555) 123-4567</span>
                    <button 
                      className="copy-btn"
                      onClick={() => copyToClipboard('+15551234567', 'phone')}
                    >
                      {copied === 'phone' ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>

                <div className="social-links">
                  <h4>Follow Us</h4>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">FAQ</span>
            <h2 className="section-title">Frequently Asked <span className="golden-text">Questions</span></h2>
            <p className="section-description">
              Find answers to common questions about our services and process
            </p>
          </div>

          <div className="faq-grid">
            {faqs.map((faq) => (
              <div key={faq.id} className="faq-card">
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Project?</h2>
            <p>Let's discuss how we can help bring your ideas to life</p>
            <div className="cta-buttons">
              <button className="btn-primary">
                Schedule a Call <MessageCircle size={18} />
              </button>
              <button className="btn-outline">
                View Portfolio <Globe size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
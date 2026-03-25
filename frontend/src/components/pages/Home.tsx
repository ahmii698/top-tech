import { useEffect, useState, useRef } from 'react';
import API from '../../services/api';

import { 
  ChevronLeft, ChevronRight, Star, MapPin, Phone, 
  Mail, Send, Check, Facebook, Twitter, Instagram, Linkedin,
  ArrowRight, Code, Smartphone, Cloud, Shield, Database, 
  ShoppingCart, PenTool, Headphones, Globe, Palette, 
  Cpu, Rocket, Users, Clock, TrendingUp, Zap, Award,
  Coffee, Heart, Briefcase, Target, BarChart, Layers,
  Play, Pause, Volume2, VolumeX, ExternalLink, Download, X,
  Calendar, Clock as ClockIcon, Trophy, Award as AwardIcon, Briefcase as BriefcaseIcon, Users as UsersIcon,
  Activity, PieChart, Layers as LayersIcon, Sparkles
} from 'lucide-react';

import Hero3D from '../common/HeroCube';
import './Home.css';

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // 👇 STATES FOR PLAN FORM
  const [planFormData, setPlanFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [planFormStatus, setPlanFormStatus] = useState('');
  
  // 👇👇👇 NEW: APPOINTMENT BOOKING FORM STATES
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [appointmentFormData, setAppointmentFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    message: ''
  });
  const [appointmentFormStatus, setAppointmentFormStatus] = useState('');
  
  // 👇 NEWSLETTER STATES
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('');
  const [newsletterErrorMsg, setNewsletterErrorMsg] = useState('');
  
  // 👇 DYNAMIC DATA STATES
  const [services, setServices] = useState([]);
  const [team, setTeam] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [pricing, setPricing] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [banners, setBanners] = useState([]);
  const [features, setFeatures] = useState([]);
  const [processSteps, setProcessSteps] = useState([]);
  const [statistics, setStatistics] = useState([]);
  const [companyInfo, setCompanyInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [counts, setCounts] = useState({
    years: 0,
    clients: 0,
    projects: 0,
    satisfaction: 0,
    experts: 0,
    awards: 0
  });

  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // 👇 REMOVED: scroll to top button handler completely
  
  useEffect(() => {
    const elements = document.querySelectorAll(
      ".services-section, .features-section, .stats-section, .process-section, .banner-section, .testimonials-section, .contact-section, .cta-section, .service-card, .feature-card, .stat-card, .process-card, .testimonial-card, .contact-form-container, .contact-info-card, .map-container, .section-header, .portfolio-item, .team-card, .pricing-card, .blog-card, .faq-item"
    );

    elements.forEach(el => {
      el.classList.add("hidden-element");
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible-element");
            
            if (entry.target.classList.contains('services-grid') || 
                entry.target.classList.contains('features-grid') ||
                entry.target.classList.contains('portfolio-grid')) {
              const children = entry.target.children;
              Array.from(children).forEach((child, index) => {
                setTimeout(() => {
                  (child as HTMLElement).style.opacity = '1';
                  (child as HTMLElement).style.transform = 'translateY(0)';
                }, index * 100);
              });
            }
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: "0px"
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // ===== DYNAMIC DATA FETCHING =====
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        console.log('Fetching data from API...');
        
        const [
          servicesRes,
          teamRes,
          testimonialsRes,
          portfolioRes,
          pricingRes,
          faqsRes,
          bannersRes,
          featuresRes,
          processStepsRes,
          statisticsRes,
          companyInfoRes
        ] = await Promise.all([
          API.get('/services'),
          API.get('/team'),
          API.get('/testimonials'),
          API.get('/portfolio'),
          API.get('/pricing'),
          API.get('/faqs'),
          API.get('/banners'),
          API.get('/features'),
          API.get('/process-steps'),
          API.get('/statistics'),
          API.get('/company-info')
        ]);
        
        console.log('Services data:', servicesRes.data);
        
        setServices(servicesRes.data.data || []);
        setTeam(teamRes.data.data || []);
        setTestimonials(testimonialsRes.data.data || []);
        setPortfolio(portfolioRes.data.data || []);
        setPricing(pricingRes.data.data || []);
        setFaqs(faqsRes.data.data || []);
        setBanners(bannersRes.data.data || []);
        setFeatures(featuresRes.data.data || []);
        setProcessSteps(processStepsRes.data.data || []);
        setStatistics(statisticsRes.data.data || []);
        setCompanyInfo(companyInfoRes.data.data || null);
        
        // Statistics se counts update kar
        if (statisticsRes.data.data) {
          const stats = statisticsRes.data.data;
          const newCounts = { ...counts };
          stats.forEach((stat) => {
            if (stat.label.includes('Years')) newCounts.years = stat.value;
            if (stat.label.includes('Clients')) newCounts.clients = stat.value;
            if (stat.label.includes('Projects')) newCounts.projects = stat.value;
            if (stat.label.includes('Satisfaction')) newCounts.satisfaction = stat.value;
            if (stat.label.includes('Experts')) newCounts.experts = stat.value;
            if (stat.label.includes('Awards')) newCounts.awards = stat.value;
          });
          setCounts(newCounts);
        }
        
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAllData();
  }, []);

  // Auto-slide testimonials
  useEffect(() => {
    if (testimonials.length > 0) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    
    try {
      await API.post('/contact', formData);
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus(''), 3000);
    } catch (error) {
      console.error('Error:', error);
      setFormStatus('error');
      setTimeout(() => setFormStatus(''), 3000);
    }
  };
  
  // 👇 NEWSLETTER SUBMIT HANDLER
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterStatus('sending');
    setNewsletterErrorMsg('');
    
    try {
      const response = await API.post('/newsletter', { email: newsletterEmail });
      
      if (response.data.success) {
        setNewsletterStatus('success');
        setNewsletterEmail('');
        setTimeout(() => setNewsletterStatus(''), 3000);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error: any) {
      console.error('Newsletter error:', error);
      setNewsletterStatus('error');
      setNewsletterErrorMsg(error.response?.data?.message || 'Email already subscribed or invalid');
      setTimeout(() => setNewsletterStatus(''), 3000);
    }
  };
  
  // Plan click handler
  const handlePlanClick = (plan: any) => {
    setSelectedPlan(plan);
    setShowPlanModal(true);
    setPlanFormData({ name: '', email: '', phone: '', message: '' });
    setPlanFormStatus('');
  };

  // Modal close handler
  const closeModal = () => {
    setShowPlanModal(false);
    setSelectedPlan(null);
  };

  // Handle plan form submit
  const handlePlanSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPlanFormStatus('sending');
    
    if (!planFormData.name || !planFormData.email || !planFormData.phone) {
      alert('Please fill all required fields');
      setPlanFormStatus('');
      return;
    }
    
    const purchaseData = {
      plan_id: selectedPlan.id.toString(),
      plan_name: selectedPlan.name,
      price: selectedPlan.price,
      period: selectedPlan.period,
      customer_name: planFormData.name,
      customer_email: planFormData.email,
      customer_phone: planFormData.phone,
      message: planFormData.message,
      status: 'pending'
    };
    
    try {
      const response = await API.post('/plan-purchase', purchaseData);
      
      if (response.data.success) {
        setPlanFormStatus('success');
        alert('✅ Request submitted successfully! We will contact you soon.');
        setPlanFormData({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => {
          closeModal();
          setPlanFormStatus('');
        }, 1500);
      } else {
        throw new Error(response.data.message || 'Something went wrong');
      }
      
    } catch (error: any) {
      console.error('Error submitting plan:', error);
      setPlanFormStatus('error');
      alert('❌ Error: ' + (error.response?.data?.message || error.message || 'Failed to submit'));
    }
  };


  

  // 👇👇👇 NEW: APPOINTMENT BOOKING HANDLERS
  const handleAppointmentClick = () => {
    setShowAppointmentModal(true);
    setAppointmentFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      message: ''
    });
    setAppointmentFormStatus('');
  };

  const closeAppointmentModal = () => {
    setShowAppointmentModal(false);
  };
  
  const handleAppointmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAppointmentFormStatus('sending');

    if (!appointmentFormData.name || !appointmentFormData.email || !appointmentFormData.phone || !appointmentFormData.date || !appointmentFormData.time) {
      alert('Please fill all required fields including date and time');
      setAppointmentFormStatus('');
      return;
    }

    const appointmentData = {
      full_name: appointmentFormData.name,
      email: appointmentFormData.email,
      phone: appointmentFormData.phone,
      appointment_date: appointmentFormData.date,
      appointment_time: appointmentFormData.time,
      message: appointmentFormData.message
    };

    try {
      const response = await API.post('/appointments', appointmentData);

      setAppointmentFormStatus('success');
      alert('✅ Appointment booked successfully!');

      // Reset form
      setAppointmentFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        message: ''
      });

      // Close modal if open
      if (showAppointmentModal) {
        closeAppointmentModal();
      }

    } catch (error: any) {
      console.error('Error booking appointment:', error);
      setAppointmentFormStatus('error');
      alert('❌ Error: ' + (error.response?.data?.message || error.message));
    }
  };


  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const filteredPortfolio = activeFilter === 'all' 
    ? portfolio 
    : portfolio.filter(item => item.category === activeFilter);

  useEffect(() => {
    document.title = 'Home - TopTech | Premium IT Solutions Provider';
    window.scrollTo(0, 0);
  }, []);

  // Helper function to render icons
  const renderIcon = (iconName: string, size: number = 48) => {
    switch(iconName) {
      case 'Globe': return <Globe size={size} />;
      case 'Palette': return <Palette size={size} />;
      case 'Smartphone': return <Smartphone size={size} />;
      case 'Database': return <Database size={size} />;
      case 'Code': return <Code size={size} />;
      case 'PenTool': return <PenTool size={size} />;
      case 'Cpu': return <Cpu size={size} />;
      case 'TrendingUp': return <TrendingUp size={size} />;
      case 'Shield': return <Shield size={size} />;
      case 'Zap': return <Zap size={size} />;
      case 'Users': return <Users size={size} />;
      case 'Rocket': return <Rocket size={size} />;
      case 'Clock': return <ClockIcon size={size} />;
      case 'Target': return <Target size={size} />;
      default: return <Code size={size} />;
    }
  };

  // Helper function to render stat icons - Different icons for variety
  const statIcons = [
    <Trophy size={48} color="#FFD700" />,
    <UsersIcon size={48} color="#FFD700" />,
    <Rocket size={48} color="#FFD700" />,
    <AwardIcon size={48} color="#FFD700" />,
    <Target size={48} color="#FFD700" />,
    <BarChart size={48} color="#FFD700" />,
    <Sparkles size={48} color="#FFD700" />,
    <Activity size={48} color="#FFD700" />
  ];

  const renderStatIcon = (index: number) => {
    return statIcons[index % statIcons.length];
  };

  // Loading Screen
  if (isPageLoading || loading) {
    return (
      <div className="loading-screen">
        <div className="loader">
          <div className="loader-golden">
            <div className="loader-inner"></div>
          </div>
          <div className="loader-text">
            <h2>TopTech Solutions</h2>
            <p>Crafting Digital Excellence...</p>
            <div className="loader-progress">
              <div className="loader-progress-bar"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container" style={{ overflowX: 'hidden' }}>
      {/* Floating Appointment Button */}
      <button
        onClick={handleAppointmentClick}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: '56px',
          height: '56px',
          borderRadius: '16px',
          background: 'linear-gradient(145deg, #FFD700, #FFA500)',
          border: 'none',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999,
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05) translateY(-5px)';
          e.currentTarget.style.boxShadow = '0 12px 28px rgba(255, 215, 0, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1) translateY(0)';
          e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3)';
        }}
        title="Book Appointment"
      >
        <Calendar size={26} color="#000000" />
      </button>

      {/* Hero Section with 3D */}
      <section className="hero-section">
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <Hero3D />
        </div>
        
        <div className="hero-content">
          <span className="hero-subtitle">Welcome to TopTech</span>
          <h1 className="hero-title">
            Innovative <span className="golden-text">IT Solutions</span> For Your Business
          </h1>
          <p className="hero-description">
            We deliver cutting-edge technology solutions that drive growth, 
            enhance security, and transform your digital presence.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary pulse-animation">Get Started</button>
          </div>
        </div>
        
        <div className="hero-stats">
          <div className="hero-stat">
            <div className="hero-stat-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="#FFD700" strokeWidth="1.5"/>
                <path d="M12 6V12L16 14" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="hero-stat-number">{counts.years}+</span>
            <span className="hero-stat-label">Years Experience</span>
          </div>
          
          <div className="hero-stat">
            <div className="hero-stat-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="9" cy="8" r="4" stroke="#FFD700" strokeWidth="1.5"/>
                <circle cx="15" cy="8" r="4" stroke="#FFD700" strokeWidth="1.5"/>
                <path d="M3 16C3 14 5 12 9 12C13 12 15 14 15 16M9 20C13 20 15 18 15 16" stroke="#FFD700" strokeWidth="1.5"/>
              </svg>
            </div>
            <span className="hero-stat-number">{counts.clients}+</span>
            <span className="hero-stat-label">Happy Clients</span>
          </div>
          
          <div className="hero-stat">
            <div className="hero-stat-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="4" width="16" height="16" rx="2" stroke="#FFD700" strokeWidth="1.5"/>
                <path d="M8 8H16M8 12H16M8 16H12" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="hero-stat-number">{counts.projects}+</span>
            <span className="hero-stat-label">Projects Done</span>
          </div>
          
          <div className="hero-stat">
            <div className="hero-stat-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="8" r="4" stroke="#FFD700" strokeWidth="1.5"/>
                <path d="M5 20V19C5 15 8 13 12 13C16 13 19 15 19 19V20" stroke="#FFD700" strokeWidth="1.5"/>
              </svg>
            </div>
            <span className="hero-stat-number">{counts.experts}+</span>
            <span className="hero-stat-label">Expert Team</span>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Our Services</span>
            <h2 className="section-title">What <span className="golden-text">We Offer</span></h2>
            <p className="section-description">
              Comprehensive IT solutions tailored to your business needs
            </p>
          </div>

          <div className="services-grid">
            {services.map((service: any) => (
              <div key={service.id} className="service-card">
                <div className="service-icon">
                  {renderIcon(service.icon_name, 48)}
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                
                <div className="service-features">
                  {service.features?.map((feature: any, idx: number) => (
                    <span key={idx} className="service-feature-tag">{feature.feature || feature}</span>
                  ))}
                </div>
                
                <a href={service.link || '#'} className="service-link">
                  Learn More <ArrowRight size={16} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="portfolio-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Our Work</span>
            <h2 className="section-title">Featured <span className="golden-text">Projects</span></h2>
          </div>

          <div className="portfolio-filters">
            <button 
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'development' ? 'active' : ''}`}
              onClick={() => setActiveFilter('development')}
            >
              Development
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'design' ? 'active' : ''}`}
              onClick={() => setActiveFilter('design')}
            >
              Design
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'ai' ? 'active' : ''}`}
              onClick={() => setActiveFilter('ai')}
            >
              AI/ML
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'marketing' ? 'active' : ''}`}
              onClick={() => setActiveFilter('marketing')}
            >
              Marketing
            </button>
          </div>

          <div className="portfolio-grid">
            {filteredPortfolio.map((item: any) => (
              <div key={item.id} className="portfolio-item">
                <div className="portfolio-image">
                  <img src={item.image} alt={item.title} />
                  <div className="portfolio-overlay">
                    <h4>{item.title}</h4>
                    <p>{item.client_name || item.client} • {item.project_year || item.year}</p>
                    <button className="portfolio-link">
                      <ExternalLink size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Why Choose Us</span>
            <h2 className="section-title">We Deliver <span className="golden-text">Excellence</span></h2>
            <p className="section-description">
              Combining technical expertise with creative innovation
            </p>
          </div>
          
          <div className="features-grid">
            {features.map((feature: any) => (
              <div key={feature.id} className="feature-card">
                <div className="feature-icon">
                  {renderIcon(feature.icon_name, 32)}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <div className="feature-stats">{feature.stats}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section with Unique Icons */}
      <section className="stats-section" style={{ background: '#0A0A0A' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Our Achievements</span>
            <h2 className="section-title">Company <span className="golden-text">Statistics</span></h2>
          </div>
          
          <div className="statistics-slider-container">
            <div className="statistics-slider">
              <div className="slider-track" style={{ 
                display: 'flex',
                animation: 'scrollStats 30s linear infinite'
              }}>
                {[...statistics, ...statistics].map((stat: any, index: number) => (
                  <div key={`${stat.id}-${index}`} className="stat-slide">
                    <div className="stat-card slider-stat-card">
                      <div className="stat-icon-wrapper" style={{ color: '#FFD700' }}>
                        {renderStatIcon(index)}
                      </div>
                      <h2>{stat.value}{stat.suffix}</h2>
                      <p>{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">How We Work</span>
            <h2 className="section-title">Our <span className="golden-text">Process</span></h2>
          </div>
          
          <div className="process-grid">
            {processSteps.map((item: any) => (
              <div key={item.id} className="process-card">
                <div className="process-number">{item.step_number}</div>
                <div className="process-icon">{renderIcon(item.icon_name, 24)}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Our Team</span>
            <h2 className="section-title">Meet The <span className="golden-text">Experts</span></h2>
          </div>

          <div className="team-grid">
            {team.map((member: any) => (
              <div key={member.id} className="team-card">
                <div className="team-image">
                  <img src={member.image} alt={member.name} />
                  <div className="team-social">
                    {member.social_linkedin && (
                      <a href={member.social_linkedin}><Linkedin size={16} /></a>
                    )}
                    {member.social_twitter && (
                      <a href={member.social_twitter}><Twitter size={16} /></a>
                    )}
                  </div>
                </div>
                <h3>{member.name}</h3>
                <p className="team-role">{member.role}</p>
                <p className="team-expertise">{member.expertise}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section className="pricing-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Pricing</span>
            <h2 className="section-title">Choose your <span className="golden-text">plan</span></h2>
          </div>

          <div className="pricing-grid">
            {pricing.map((plan: any) => (
              <div key={plan.id} className={`pricing-card ${plan.is_recommended ? 'recommended' : ''}`}>
                <h3>{plan.name}</h3>
                <div className="pricing-price">
                  <span className="price">{plan.price}</span>
                  <span className="period">/{plan.period}</span>
                </div>
                <ul className="pricing-features">
                  {plan.features?.map((feature: any, idx: number) => (
                    <li key={idx}>
                      <Check size={16} /> {feature.feature || feature}
                    </li>
                  ))}
                </ul>
                <button 
                  className={`pricing-btn ${plan.is_recommended ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => handlePlanClick(plan)}
                >
                  {plan.button_text || 'Select plan'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {showPlanModal && selectedPlan && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <X size={20} />
            </button>
            
            <div className="modal-content">
              <div className="modal-header">
                <h3>Get started</h3>
                <p className="modal-plan">{selectedPlan.name} plan</p>
              </div>
              
              <form onSubmit={handlePlanSubmit}>
                <div className="form-group">
                  <input 
                    type="text" 
                    placeholder="Full name"
                    value={planFormData.name} 
                    onChange={(e) => setPlanFormData({...planFormData, name: e.target.value})} 
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <input 
                    type="email" 
                    placeholder="Email address"
                    value={planFormData.email} 
                    onChange={(e) => setPlanFormData({...planFormData, email: e.target.value})} 
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <input 
                    type="tel" 
                    placeholder="Phone number"
                    value={planFormData.phone} 
                    onChange={(e) => setPlanFormData({...planFormData, phone: e.target.value})} 
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <textarea 
                    placeholder="Anything else?"
                    rows={3} 
                    value={planFormData.message} 
                    onChange={(e) => setPlanFormData({...planFormData, message: e.target.value})} 
                  />
                </div>
                
                <button type="submit" disabled={planFormStatus === 'sending'} className="submit-btn">
                  {planFormStatus === 'sending' ? 'Processing...' : 'Continue'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Appointment Booking Modal */}
      {showAppointmentModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999999,
          backdropFilter: 'blur(5px)'
        }} onClick={closeAppointmentModal}>
          <div style={{
            backgroundColor: '#1a1a1a',
            padding: '32px',
            borderRadius: '24px',
            width: '500px',
            maxWidth: '90%',
            maxHeight: '85vh',
            overflowY: 'auto',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
            animation: 'slideUp 0.3s ease',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }} onClick={(e) => e.stopPropagation()}>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              paddingBottom: '16px'
            }}>
              <h3 style={{
                margin: 0,
                fontSize: '24px',
                fontWeight: '600',
                color: '#FFD700',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <Calendar size={24} color="#FFD700" />
                Book Appointment
              </h3>
              <button 
                onClick={closeAppointmentModal}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  fontSize: '20px',
                  cursor: 'pointer',
                  color: '#ffffff',
                  padding: '8px',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleAppointmentSubmit}>
              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '500', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={appointmentFormData.name}
                  onChange={(e) => setAppointmentFormData({...appointmentFormData, name: e.target.value})}
                  required
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    color: '#ffffff',
                    fontSize: '15px',
                    outline: 'none',
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#FFD700';
                    e.target.style.backgroundColor = 'rgba(255, 215, 0, 0.08)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '500', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={appointmentFormData.email}
                  onChange={(e) => setAppointmentFormData({...appointmentFormData, email: e.target.value})}
                  required
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    color: '#ffffff',
                    fontSize: '15px',
                    outline: 'none',
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#FFD700';
                    e.target.style.backgroundColor = 'rgba(255, 215, 0, 0.08)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                  }}
                />
              </div>
              
              {/* Row 2: Phone Number & Date - 2 columns */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '18px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '500', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    placeholder="+92 300 1234567"
                    value={appointmentFormData.phone}
                    onChange={(e) => setAppointmentFormData({...appointmentFormData, phone: e.target.value})}
                    required
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      borderRadius: '12px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      color: '#ffffff',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'all 0.2s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#FFD700';
                      e.target.style.backgroundColor = 'rgba(255, 215, 0, 0.08)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                      e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                    }}
                  />
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '500', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    value={appointmentFormData.date}
                    onChange={(e) => setAppointmentFormData({...appointmentFormData, date: e.target.value})}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      borderRadius: '12px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      color: '#ffffff',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'all 0.2s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#FFD700';
                      e.target.style.backgroundColor = 'rgba(255, 215, 0, 0.08)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                      e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                    }}
                  />
                </div>
              </div>
              
              {/* Row 3: Time - Full width */}
              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '500', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Preferred Time *
                </label>
                <input
                  type="time"
                  value={appointmentFormData.time}
                  onChange={(e) => setAppointmentFormData({...appointmentFormData, time: e.target.value})}
                  required
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    color: '#ffffff',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#FFD700';
                    e.target.style.backgroundColor = 'rgba(255, 215, 0, 0.08)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                  }}
                />
              </div>
              
              {/* Row 4: Message */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '500', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Message (Optional)
                </label>
                <textarea
                  placeholder="Tell us what you'd like to discuss..."
                  rows={3}
                  value={appointmentFormData.message}
                  onChange={(e) => setAppointmentFormData({...appointmentFormData, message: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    color: '#ffffff',
                    fontSize: '15px',
                    resize: 'vertical',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                    fontFamily: 'inherit'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#FFD700';
                    e.target.style.backgroundColor = 'rgba(255, 215, 0, 0.08)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                  }}
                />
              </div>
              
              <button
                type="submit"
                disabled={appointmentFormStatus === 'sending'}
                style={{
                  width: '100%',
                  padding: '16px',
                  background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                  color: '#000000',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '600',
                  opacity: appointmentFormStatus === 'sending' ? 0.7 : 1,
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px'
                }}
                onMouseEnter={(e) => {
                  if (appointmentFormStatus !== 'sending') {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(255, 215, 0, 0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (appointmentFormStatus !== 'sending') {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                {appointmentFormStatus === 'sending' ? (
                  <>⏳ Booking...</>
                ) : (
                  <>📅 Book Appointment <ArrowRight size={18} /></>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Testimonials Slider */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Testimonials</span>
            <h2 className="section-title">What <span className="golden-text">Clients</span> Say</h2>
          </div>

          <div className="testimonials-slider">
            <button className="slider-arrow prev" onClick={prevTestimonial}>
              <ChevronLeft size={24} />
            </button>
            
            <div className="testimonials-container">
              {testimonials.map((testimonial: any, index: number) => {
                const isActive = index === currentTestimonial;
                const isPrev = index === (currentTestimonial - 1 + testimonials.length) % testimonials.length;
                const isNext = index === (currentTestimonial + 1) % testimonials.length;
                
                let position = 'hidden';
                let scale = 0.6;
                let zIndex = 1;
                
                if (isActive) {
                  position = 'active';
                  scale = 1;
                  zIndex = 3;
                } else if (isPrev) {
                  position = 'prev';
                  scale = 0.8;
                  zIndex = 2;
                } else if (isNext) {
                  position = 'next';
                  scale = 0.8;
                  zIndex = 2;
                }
                
                return (
                  <div
                    key={testimonial.id}
                    className={`testimonial-slide ${position}`}
                    style={{ 
                      transform: `scale(${scale})`,
                      zIndex: zIndex,
                      opacity: position === 'hidden' ? 0 : 1
                    }}
                  >
                    <div className="testimonial-card">
                      <div className="testimonial-rating">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} size={18} fill="#FFD700" color="#FFD700" />
                        ))}
                      </div>
                      <p className="testimonial-text">"{testimonial.testimonial_text || testimonial.text}"</p>
                      <div className="testimonial-author">
                        <div className="author-avatar">
                          {testimonial.client_image || testimonial.image ? (
                            <img 
                              src={testimonial.client_image || testimonial.image} 
                              alt={testimonial.client_name || testimonial.name}
                            />
                          ) : (
                            <span>{(testimonial.client_name || testimonial.name || '').charAt(0)}</span>
                          )}
                        </div>
                        <div className="author-info">
                          <h4>{testimonial.client_name || testimonial.name}</h4>
                          <p>{testimonial.client_role || testimonial.role}</p>
                          <span className="author-company">{testimonial.client_company || testimonial.company}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button className="slider-arrow next" onClick={nextTestimonial}>
              <ChevronRight size={24} />
            </button>

            <div className="slider-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === currentTestimonial ? 'active' : ''}`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
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
          </div>

          <div className="faq-grid">
            {faqs.map((faq: any) => (
              <div key={faq.id} className="faq-item">
                <button 
                  className={`faq-question ${activeFaq === faq.id ? 'active' : ''}`}
                  onClick={() => setActiveFaq(activeFaq === faq.id ? null : faq.id)}
                >
                  <span>{faq.question}</span>
                  <ChevronRight size={20} className={`faq-arrow ${activeFaq === faq.id ? 'rotated' : ''}`} />
                </button>
                <div className={`faq-answer ${activeFaq === faq.id ? 'open' : ''}`}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section with Map + Modern Booking Form */}
      <section className="contact-section" style={{ padding: '80px 0', background: '#0a0a0a' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Get In Touch</span>
            <h2 className="section-title">Book Your <span className="golden-text">Appointment</span></h2>
            <p className="section-description">
              Schedule a consultation with our experts. We're here to help you grow your business.
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '40px',
            alignItems: 'stretch'
          }}>
            {/* LEFT SIDE - MAP */}
            <div className="map-container" style={{ 
              width: '100%', 
              height: '100%', 
              minHeight: '550px',
              borderRadius: '24px',
              overflow: 'hidden',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
            }}>
              <iframe
                title="office-location"
                src={companyInfo?.map_embed_url || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.636256472517!2d-122.088654484685!3d37.422408979825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fba5b3c4c0f0d%3A0x8c3c5f5f5f5f5f5f!2sGoogleplex!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>

            {/* RIGHT SIDE - MODERN BOOKING FORM */}
            <div style={{
              background: 'linear-gradient(145deg, #1a1a1a, #0f0f0f)',
              borderRadius: '24px',
              padding: '32px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '600',
                marginBottom: '8px',
                color: '#ffffff'
              }}>
                Schedule a Meeting
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#aaa',
                marginBottom: '28px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                paddingBottom: '16px'
              }}>
                Fill out the form and our team will contact you within 24 hours.
              </p>

              <form onSubmit={handleAppointmentSubmit}>
                {/* Row 1: Full Name & Email */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: '500', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={appointmentFormData.name}
                      onChange={(e) => setAppointmentFormData({...appointmentFormData, name: e.target.value})}
                      required
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        color: '#ffffff',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'all 0.2s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#FFD700';
                        e.target.style.backgroundColor = 'rgba(255, 215, 0, 0.08)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                      }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: '500', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      value={appointmentFormData.email}
                      onChange={(e) => setAppointmentFormData({...appointmentFormData, email: e.target.value})}
                      required
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        color: '#ffffff',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'all 0.2s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#FFD700';
                        e.target.style.backgroundColor = 'rgba(255, 215, 0, 0.08)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                      }}
                    />
                  </div>
                </div>

                
{/* Row 2: Date & Time - Ek line main */}
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
  <div>
    <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: '500', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
      Preferred Date *
    </label>
    <input
      type="date"
      value={appointmentFormData.date}
      onChange={(e) => setAppointmentFormData({...appointmentFormData, date: e.target.value})}
      required
      min={new Date().toISOString().split('T')[0]}
      style={{
        width: '100%',
        padding: '12px 16px',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        color: '#ffffff',
        fontSize: '14px',
        outline: 'none',
        transition: 'all 0.2s ease'
      }}
      onFocus={(e) => {
        e.target.style.borderColor = '#FFD700';
        e.target.style.backgroundColor = 'rgba(255, 215, 0, 0.08)';
      }}
      onBlur={(e) => {
        e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
      }}
    />
  </div>

  <div>
    <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: '500', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
      Preferred Time *
    </label>
    <input
      type="time"
      value={appointmentFormData.time}
      onChange={(e) => setAppointmentFormData({...appointmentFormData, time: e.target.value})}
      required
      style={{
        width: '100%',
        padding: '12px 16px',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        color: '#ffffff',
        fontSize: '14px',
        outline: 'none',
        transition: 'all 0.2s ease'
      }}
      onFocus={(e) => {
        e.target.style.borderColor = '#FFD700';
        e.target.style.backgroundColor = 'rgba(255, 215, 0, 0.08)';
      }}
      onBlur={(e) => {
        e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
      }}
    />
  </div>
</div>






                   {/* Row 3: phone no  - Full width */}
                <div style={{ marginBottom: '20px' }}>
                   <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: '500', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="+92 300 1234567"
                      value={appointmentFormData.phone}
                      onChange={(e) => setAppointmentFormData({...appointmentFormData, phone: e.target.value})}
                      required
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        color: '#ffffff',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'all 0.2s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#FFD700';
                        e.target.style.backgroundColor = 'rgba(255, 215, 0, 0.08)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                      }}
                    />
                  </div>
                </div>









                
                {/* Row 4: Message - Full width */}
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: '500', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Message (Optional)
                  </label>
                  <textarea
                    placeholder="Tell us what you'd like to discuss..."
                    rows={3}
                    value={appointmentFormData.message}
                    onChange={(e) => setAppointmentFormData({...appointmentFormData, message: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      color: '#ffffff',
                      fontSize: '14px',
                      resize: 'vertical',
                      outline: 'none',
                      transition: 'all 0.2s ease',
                      fontFamily: 'inherit'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#FFD700';
                      e.target.style.backgroundColor = 'rgba(255, 215, 0, 0.08)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                      e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                    }}
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={appointmentFormStatus === 'sending'}
                  style={{
                    width: '100%',
                    padding: '14px',
                    background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                    color: '#000000',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontSize: '15px',
                    fontWeight: '600',
                    opacity: appointmentFormStatus === 'sending' ? 0.7 : 1,
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                  onMouseEnter={(e) => {
                    if (appointmentFormStatus !== 'sending') {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 20px rgba(255, 215, 0, 0.3)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (appointmentFormStatus !== 'sending') {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                >
                  {appointmentFormStatus === 'sending' ? (
                    <>⏳ Booking...</>
                  ) : (
                    <>📅 Book Appointment <ArrowRight size={16} /></>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <h3>Subscribe to Our Newsletter</h3>
            <p>Get the latest tech insights and updates directly in your inbox</p>
            <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
              />
              <button type="submit" disabled={newsletterStatus === 'sending'}>
                {newsletterStatus === 'sending' ? 'Subscribing...' : 'Subscribe'} <Send size={16} />
              </button>
            </form>
            {newsletterStatus === 'success' && <p style={{color: '#4ade80', marginTop: '10px', fontSize: '14px'}}>✅ Subscribed successfully!</p>}
            {newsletterStatus === 'error' && <p style={{color: '#f87171', marginTop: '10px', fontSize: '14px'}}>❌ {newsletterErrorMsg}</p>}
          </div>
        </div>
      </section>

      {/* Slide Up Animation */}
      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes scrollStats {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default Home;
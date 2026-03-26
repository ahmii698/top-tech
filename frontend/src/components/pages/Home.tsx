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
  
  const [planFormData, setPlanFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [planFormStatus, setPlanFormStatus] = useState('');
  
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
  
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('');
  const [newsletterErrorMsg, setNewsletterErrorMsg] = useState('');
  
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
  
  const handlePlanClick = (plan: any) => {
    setSelectedPlan(plan);
    setShowPlanModal(true);
    setPlanFormData({ name: '', email: '', phone: '', message: '' });
    setPlanFormStatus('');
  };

  const closeModal = () => {
    setShowPlanModal(false);
    setSelectedPlan(null);
  };

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

      setAppointmentFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        message: ''
      });

      if (showAppointmentModal) {
        closeAppointmentModal();
      }

    } catch (error: any) {
      console.error('Error booking appointment:', error);
      setAppointmentFormStatus('error');
      alert('❌ Error: ' + (error.response?.data?.message || error.message));
    }
  };

  const filteredPortfolio = activeFilter === 'all' 
    ? portfolio 
    : portfolio.filter(item => item.category === activeFilter);

  useEffect(() => {
    document.title = 'Home - TopTech | Premium IT Solutions Provider';
    window.scrollTo(0, 0);
  }, []);

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
    <div className="home-container" style={{ overflowX: 'hidden', marginTop: '70px' }}>
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
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999,
          transition: 'all 0.3s ease',
        }}
        title="Book Appointment"
      >
        <Calendar size={26} color="#000000" />
      </button>

      {/* Hero Section with 3D - NO BLACK OVERLAY */}
      <section style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '100vh',
        overflow: 'hidden',
        background: '#000000'
      }}>
        {/* 3D Cube Container */}
        <div style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          zIndex: 1
        }}>
          <Hero3D />
        </div>
        
        {/* Text Content - NO BACKGROUND */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 2,
          textAlign: 'center',
          color: '#fff',
          padding: '20px',
          width: '100%',
          maxWidth: '900px',
          textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
        }}>
          <span style={{
            fontSize: 'clamp(12px, 4vw, 18px)',
            letterSpacing: '4px',
            color: '#FFD700',
            display: 'block',
            marginBottom: '15px',
            fontWeight: '600'
          }}>WELCOME TO TOP TECH</span>
          <h1 style={{
            fontSize: 'clamp(28px, 8vw, 68px)',
            margin: '15px 0',
            lineHeight: '1.2',
            fontWeight: '800',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
          }}>
            Innovative <span style={{ color: '#FFD700' }}>IT Solutions</span><br />
            For Your Business
          </h1>
          <p style={{
            fontSize: 'clamp(14px, 4vw, 20px)',
            marginBottom: '30px',
            opacity: 0.95,
            lineHeight: '1.5',
            maxWidth: '700px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            We deliver cutting-edge technology solutions that drive growth, 
            enhance security, and transform your digital presence.
          </p>
          <div>
            <button style={{
              padding: 'clamp(12px, 3vw, 16px) clamp(24px, 6vw, 40px)',
              fontSize: 'clamp(14px, 4vw, 16px)',
              background: 'linear-gradient(135deg, #FFD700, #FFA500)',
              border: 'none',
              borderRadius: '50px',
              color: '#000',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 20px rgba(255,215,0,0.4)'
            }}>Get Started</button>
          </div>
        </div>
        
        {/* Stats Section - Light transparent bottom bar */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          gap: 'clamp(20px, 6vw, 70px)',
          flexWrap: 'wrap',
          padding: 'clamp(10px, 3vw, 20px)',
          background: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(8px)',
          zIndex: 2,
          borderTop: '1px solid rgba(255,215,0,0.3)'
        }}>
          <div style={{ textAlign: 'center', padding: '8px', minWidth: 'clamp(80px, 20vw, 100px)' }}>
            <svg width="clamp(30px, 6vw, 40px)" height="clamp(30px, 6vw, 40px)" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#FFD700" strokeWidth="2"/>
              <path d="M12 6V12L16 14" stroke="#FFD700" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <div style={{ fontSize: 'clamp(20px, 5vw, 28px)', fontWeight: 'bold', color: '#FFD700' }}>{counts.years}+</div>
            <div style={{ fontSize: 'clamp(10px, 3vw, 12px)', color: '#fff' }}>YEARS EXPERIENCE</div>
          </div>
          
          <div style={{ textAlign: 'center', padding: '8px', minWidth: 'clamp(80px, 20vw, 100px)' }}>
            <svg width="clamp(30px, 6vw, 40px)" height="clamp(30px, 6vw, 40px)" viewBox="0 0 24 24" fill="none">
              <circle cx="9" cy="8" r="4" stroke="#FFD700" strokeWidth="2"/>
              <circle cx="15" cy="8" r="4" stroke="#FFD700" strokeWidth="2"/>
              <path d="M3 16C3 14 5 12 9 12C13 12 15 14 15 16M9 20C13 20 15 18 15 16" stroke="#FFD700" strokeWidth="2"/>
            </svg>
            <div style={{ fontSize: 'clamp(20px, 5vw, 28px)', fontWeight: 'bold', color: '#FFD700' }}>{counts.clients}+</div>
            <div style={{ fontSize: 'clamp(10px, 3vw, 12px)', color: '#fff' }}>HAPPY CLIENTS</div>
          </div>
          
          <div style={{ textAlign: 'center', padding: '8px', minWidth: 'clamp(80px, 20vw, 100px)' }}>
            <svg width="clamp(30px, 6vw, 40px)" height="clamp(30px, 6vw, 40px)" viewBox="0 0 24 24" fill="none">
              <rect x="4" y="4" width="16" height="16" rx="2" stroke="#FFD700" strokeWidth="2"/>
              <path d="M8 8H16M8 12H16M8 16H12" stroke="#FFD700" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <div style={{ fontSize: 'clamp(20px, 5vw, 28px)', fontWeight: 'bold', color: '#FFD700' }}>{counts.projects}+</div>
            <div style={{ fontSize: 'clamp(10px, 3vw, 12px)', color: '#fff' }}>PROJECTS DONE</div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section" style={{ padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span className="section-subtitle" style={{ fontSize: '14px', color: '#FFD700' }}>Our Services</span>
            <h2 className="section-title" style={{ fontSize: '42px', margin: '10px 0' }}>What <span style={{ color: '#FFD700' }}>We Offer</span></h2>
            <p className="section-description" style={{ fontSize: '16px', color: '#aaa' }}>
              Comprehensive IT solutions tailored to your business needs
            </p>
          </div>

          <div className="services-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px'
          }}>
            {services.map((service: any) => (
              <div key={service.id} className="service-card" style={{
                background: '#1a1a1a',
                borderRadius: '20px',
                padding: '30px',
                transition: 'all 0.3s ease'
              }}>
                <div className="service-icon" style={{ marginBottom: '20px', color: '#FFD700' }}>
                  {renderIcon(service.icon_name, 48)}
                </div>
                <h3 style={{ fontSize: '24px', marginBottom: '15px' }}>{service.title}</h3>
                <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#ccc' }}>{service.description}</p>
                
                <div className="service-features" style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '10px',
                  margin: '20px 0'
                }}>
                  {service.features?.map((feature: any, idx: number) => (
                    <span key={idx} style={{
                      padding: '5px 12px',
                      background: 'rgba(255, 215, 0, 0.1)',
                      borderRadius: '20px',
                      fontSize: '12px',
                      color: '#FFD700'
                    }}>{feature.feature || feature}</span>
                  ))}
                </div>
                
                <a href={service.link || '#'} style={{
                  color: '#FFD700',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px'
                }}>
                  Learn More <ArrowRight size={16} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="portfolio-section" style={{ padding: '80px 0', background: '#0A0A0A' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span className="section-subtitle" style={{ fontSize: '14px', color: '#FFD700' }}>Our Work</span>
            <h2 className="section-title" style={{ fontSize: '42px', margin: '10px 0' }}>Featured <span style={{ color: '#FFD700' }}>Projects</span></h2>
          </div>

          <div className="portfolio-filters" style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '15px',
            marginBottom: '50px',
            flexWrap: 'wrap'
          }}>
            {['all', 'development', 'design', 'ai', 'marketing'].map(filter => (
              <button 
                key={filter}
                onClick={() => setActiveFilter(filter)}
                style={{
                  padding: '10px 24px',
                  fontSize: '14px',
                  background: activeFilter === filter ? '#FFD700' : 'transparent',
                  border: `1px solid ${activeFilter === filter ? '#FFD700' : 'rgba(255,215,0,0.3)'}`,
                  borderRadius: '30px',
                  cursor: 'pointer',
                  color: activeFilter === filter ? '#000' : '#FFD700'
                }}
              >
                {filter === 'all' ? 'All' : filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>

          <div className="portfolio-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '30px'
          }}>
            {filteredPortfolio.map((item: any) => (
              <div key={item.id} className="portfolio-item">
                <div style={{
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '15px',
                  aspectRatio: '16/9'
                }}>
                  <img src={item.image} alt={item.title} style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease'
                  }} />
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(135deg, rgba(0,0,0,0.8), rgba(0,0,0,0.6))',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    padding: '20px'
                  }}>
                    <h4 style={{ fontSize: '20px', marginBottom: '10px', color: '#FFD700' }}>{item.title}</h4>
                    <p style={{ fontSize: '14px', textAlign: 'center' }}>{item.client_name || item.client} • {item.project_year || item.year}</p>
                    <button style={{
                      marginTop: '15px',
                      padding: '10px',
                      background: '#FFD700',
                      border: 'none',
                      borderRadius: '50%',
                      cursor: 'pointer'
                    }}>
                      <ExternalLink size={20} color="#000" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" style={{ padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span className="section-subtitle" style={{ fontSize: '14px', color: '#FFD700' }}>Why Choose Us</span>
            <h2 className="section-title" style={{ fontSize: '42px', margin: '10px 0' }}>We Deliver <span style={{ color: '#FFD700' }}>Excellence</span></h2>
            <p className="section-description" style={{ fontSize: '16px', color: '#aaa' }}>
              Combining technical expertise with creative innovation
            </p>
          </div>
          
          <div className="features-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px'
          }}>
            {features.map((feature: any) => (
              <div key={feature.id} className="feature-card" style={{
                background: '#1a1a1a',
                borderRadius: '20px',
                padding: '30px',
                textAlign: 'center'
              }}>
                <div style={{ marginBottom: '20px', color: '#FFD700' }}>
                  {renderIcon(feature.icon_name, 40)}
                </div>
                <h3 style={{ fontSize: '22px', marginBottom: '15px' }}>{feature.title}</h3>
                <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#ccc' }}>{feature.description}</p>
                <div style={{
                  marginTop: '15px',
                  fontSize: '28px',
                  fontWeight: 'bold',
                  color: '#FFD700'
                }}>{feature.stats}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="stats-section" style={{ background: '#0A0A0A', padding: '80px 0', overflow: 'hidden' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span className="section-subtitle" style={{ fontSize: '14px', color: '#FFD700' }}>Our Achievements</span>
            <h2 className="section-title" style={{ fontSize: '42px', margin: '10px 0' }}>Company <span style={{ color: '#FFD700' }}>Statistics</span></h2>
          </div>
          
          <div style={{ overflow: 'hidden' }}>
            <div style={{ display: 'flex', animation: 'scrollStats 30s linear infinite', width: 'fit-content' }}>
              {[...statistics, ...statistics].map((stat: any, index: number) => (
                <div key={`${stat.id}-${index}`} style={{ flex: '0 0 auto', padding: '0 15px' }}>
                  <div style={{
                    background: '#1a1a1a',
                    borderRadius: '20px',
                    padding: '30px',
                    textAlign: 'center',
                    minWidth: '200px'
                  }}>
                    <div style={{ marginBottom: '15px' }}>{renderStatIcon(index)}</div>
                    <h2 style={{ fontSize: '42px', margin: '10px 0', color: '#FFD700' }}>{stat.value}{stat.suffix}</h2>
                    <p style={{ fontSize: '14px' }}>{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section" style={{ padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span className="section-subtitle" style={{ fontSize: '14px', color: '#FFD700' }}>How We Work</span>
            <h2 className="section-title" style={{ fontSize: '42px', margin: '10px 0' }}>Our <span style={{ color: '#FFD700' }}>Process</span></h2>
          </div>
          
          <div className="process-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '30px'
          }}>
            {processSteps.map((item: any) => (
              <div key={item.id} className="process-card" style={{
                background: '#1a1a1a',
                borderRadius: '20px',
                padding: '30px',
                textAlign: 'center',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-15px',
                  left: '20px',
                  background: '#FFD700',
                  color: '#000',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  fontWeight: 'bold'
                }}>{item.step_number}</div>
                <div style={{ margin: '20px 0', color: '#FFD700' }}>
                  {renderIcon(item.icon_name, 40)}
                </div>
                <h3 style={{ fontSize: '22px', marginBottom: '15px' }}>{item.title}</h3>
                <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#ccc' }}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section" style={{ padding: '80px 0', background: '#0A0A0A' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span className="section-subtitle" style={{ fontSize: '14px', color: '#FFD700' }}>Our Team</span>
            <h2 className="section-title" style={{ fontSize: '42px', margin: '10px 0' }}>Meet The <span style={{ color: '#FFD700' }}>Experts</span></h2>
          </div>

          <div className="team-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '30px'
          }}>
            {team.map((member: any) => (
              <div key={member.id} className="team-card" style={{
                background: '#1a1a1a',
                borderRadius: '20px',
                overflow: 'hidden',
                textAlign: 'center'
              }}>
                <div style={{ position: 'relative', aspectRatio: '1', overflow: 'hidden' }}>
                  <img src={member.image} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: 0,
                    right: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '10px',
                    opacity: 0,
                    transition: 'opacity 0.3s ease'
                  }}>
                    {member.social_linkedin && (
                      <a href={member.social_linkedin} style={{ background: 'rgba(0,0,0,0.7)', padding: '8px', borderRadius: '50%' }}>
                        <Linkedin size={16} color="#FFD700" />
                      </a>
                    )}
                    {member.social_twitter && (
                      <a href={member.social_twitter} style={{ background: 'rgba(0,0,0,0.7)', padding: '8px', borderRadius: '50%' }}>
                        <Twitter size={16} color="#FFD700" />
                      </a>
                    )}
                  </div>
                </div>
                <div style={{ padding: '20px' }}>
                  <h3 style={{ fontSize: '22px', marginBottom: '5px' }}>{member.name}</h3>
                  <p style={{ color: '#FFD700', fontSize: '14px', marginBottom: '10px' }}>{member.role}</p>
                  <p style={{ fontSize: '13px', color: '#aaa' }}>{member.expertise}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section className="pricing-section" style={{ padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span className="section-subtitle" style={{ fontSize: '14px', color: '#FFD700' }}>Pricing</span>
            <h2 className="section-title" style={{ fontSize: '42px', margin: '10px 0' }}>Choose your <span style={{ color: '#FFD700' }}>plan</span></h2>
          </div>

          <div className="pricing-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px'
          }}>
            {pricing.map((plan: any) => (
              <div key={plan.id} style={{
                background: plan.is_recommended ? 'linear-gradient(145deg, #1f1f1f, #141414)' : '#1a1a1a',
                borderRadius: '20px',
                padding: '35px',
                textAlign: 'center',
                position: 'relative',
                border: plan.is_recommended ? '2px solid #FFD700' : '1px solid rgba(255,255,255,0.1)',
                transform: plan.is_recommended ? 'scale(1.05)' : 'scale(1)'
              }}>
                {plan.is_recommended && (
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    right: '20px',
                    background: '#FFD700',
                    color: '#000',
                    padding: '5px 15px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    Recommended
                  </div>
                )}
                <h3 style={{ fontSize: '26px', marginBottom: '20px' }}>{plan.name}</h3>
                <div style={{ marginBottom: '25px' }}>
                  <span style={{ fontSize: '48px', fontWeight: 'bold', color: '#FFD700' }}>{plan.price}</span>
                  <span style={{ fontSize: '16px' }}>/{plan.period}</span>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 25px 0' }}>
                  {plan.features?.map((feature: any, idx: number) => (
                    <li key={idx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      marginBottom: '12px',
                      fontSize: '14px'
                    }}>
                      <Check size={16} color="#FFD700" /> {feature.feature || feature}
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => handlePlanClick(plan)}
                  style={{
                    width: '100%',
                    padding: '14px',
                    background: plan.is_recommended ? 'linear-gradient(135deg, #FFD700, #FFA500)' : 'rgba(255,215,0,0.2)',
                    border: 'none',
                    borderRadius: '10px',
                    color: plan.is_recommended ? '#000' : '#FFD700',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: '600',
                    transition: 'all 0.3s ease'
                  }}
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
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          backdropFilter: 'blur(5px)',
          padding: '20px'
        }} onClick={closeModal}>
          <div onClick={(e) => e.stopPropagation()} style={{
            backgroundColor: '#1a1a1a',
            borderRadius: '20px',
            width: '90%',
            maxWidth: '500px',
            maxHeight: '90vh',
            overflow: 'auto',
            position: 'relative'
          }}>
            <button onClick={closeModal} style={{
              position: 'absolute',
              top: '15px',
              right: '15px',
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: '50%',
              width: '35px',
              height: '35px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <X size={20} />
            </button>
            
            <div style={{ padding: '30px' }}>
              <div style={{ marginBottom: '25px' }}>
                <h3 style={{ fontSize: '28px', marginBottom: '5px' }}>Get started</h3>
                <p style={{ color: '#FFD700', fontSize: '16px' }}>{selectedPlan.name} plan</p>
              </div>
              
              <form onSubmit={handlePlanSubmit}>
                <div style={{ marginBottom: '15px' }}>
                  <input 
                    type="text" 
                    placeholder="Full name"
                    value={planFormData.name} 
                    onChange={(e) => setPlanFormData({...planFormData, name: e.target.value})} 
                    required 
                    style={{
                      width: '100%',
                      padding: '14px',
                      borderRadius: '10px',
                      border: '1px solid rgba(255,255,255,0.2)',
                      background: 'rgba(255,255,255,0.05)',
                      color: '#fff',
                      fontSize: '16px'
                    }}
                  />
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                  <input 
                    type="email" 
                    placeholder="Email address"
                    value={planFormData.email} 
                    onChange={(e) => setPlanFormData({...planFormData, email: e.target.value})} 
                    required 
                    style={{
                      width: '100%',
                      padding: '14px',
                      borderRadius: '10px',
                      border: '1px solid rgba(255,255,255,0.2)',
                      background: 'rgba(255,255,255,0.05)',
                      color: '#fff',
                      fontSize: '16px'
                    }}
                  />
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                  <input 
                    type="tel" 
                    placeholder="Phone number"
                    value={planFormData.phone} 
                    onChange={(e) => setPlanFormData({...planFormData, phone: e.target.value})} 
                    required 
                    style={{
                      width: '100%',
                      padding: '14px',
                      borderRadius: '10px',
                      border: '1px solid rgba(255,255,255,0.2)',
                      background: 'rgba(255,255,255,0.05)',
                      color: '#fff',
                      fontSize: '16px'
                    }}
                  />
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                  <textarea 
                    placeholder="Anything else?"
                    rows={3} 
                    value={planFormData.message} 
                    onChange={(e) => setPlanFormData({...planFormData, message: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '14px',
                      borderRadius: '10px',
                      border: '1px solid rgba(255,255,255,0.2)',
                      background: 'rgba(255,255,255,0.05)',
                      color: '#fff',
                      fontSize: '16px',
                      resize: 'vertical'
                    }}
                  />
                </div>
                
                <button type="submit" disabled={planFormStatus === 'sending'} style={{
                  width: '100%',
                  padding: '14px',
                  background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                  border: 'none',
                  borderRadius: '10px',
                  color: '#000',
                  fontWeight: '600',
                  fontSize: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}>
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
          backdropFilter: 'blur(5px)',
          padding: '20px'
        }} onClick={closeAppointmentModal}>
          <div style={{
            backgroundColor: '#1a1a1a',
            padding: '32px',
            borderRadius: '24px',
            width: '90%',
            maxWidth: '500px',
            maxHeight: '85vh',
            overflowY: 'auto',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
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
                  justifyContent: 'center'
                }}
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleAppointmentSubmit}>
              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '500', color: '#aaa' }}>
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
                    outline: 'none'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '500', color: '#aaa' }}>
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
                    outline: 'none'
                  }}
                />
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '18px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '500', color: '#aaa' }}>
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
                      outline: 'none'
                    }}
                  />
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '500', color: '#aaa' }}>
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
                      outline: 'none'
                    }}
                  />
                </div>
              </div>
              
              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '500', color: '#aaa' }}>
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
                    outline: 'none'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '500', color: '#aaa' }}>
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
                    fontFamily: 'inherit'
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
      <section className="testimonials-section" style={{ padding: '80px 0', background: '#0A0A0A' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span className="section-subtitle" style={{ fontSize: '14px', color: '#FFD700' }}>Testimonials</span>
            <h2 className="section-title" style={{ fontSize: '42px', margin: '10px 0' }}>What <span style={{ color: '#FFD700' }}>Clients</span> Say</h2>
          </div>

          <div className="testimonials-slider" style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
            <button className="slider-arrow prev" onClick={prevTestimonial} style={{
              position: 'absolute',
              left: '-50px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255,215,0,0.2)',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10
            }}>
              <ChevronLeft size={24} />
            </button>
            
            <div className="testimonials-container" style={{ position: 'relative', height: '400px' }}>
              {testimonials.map((testimonial: any, index: number) => {
                const isActive = index === currentTestimonial;
                const isPrev = index === (currentTestimonial - 1 + testimonials.length) % testimonials.length;
                const isNext = index === (currentTestimonial + 1) % testimonials.length;
                
                let scale = 0.6;
                let zIndex = 1;
                let opacity = 0;
                
                if (isActive) {
                  scale = 1;
                  zIndex = 3;
                  opacity = 1;
                } else if (isPrev || isNext) {
                  scale = 0.8;
                  zIndex = 2;
                  opacity = 0.8;
                }
                
                return (
                  <div
                    key={testimonial.id}
                    style={{ 
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: `translate(-50%, -50%) scale(${scale})`,
                      width: '100%',
                      maxWidth: '500px',
                      transition: 'all 0.5s ease',
                      zIndex: zIndex,
                      opacity: opacity,
                      pointerEvents: isActive ? 'auto' : 'none'
                    }}
                  >
                    <div className="testimonial-card" style={{
                      background: '#1a1a1a',
                      borderRadius: '20px',
                      padding: '35px',
                      textAlign: 'center'
                    }}>
                      <div className="testimonial-rating" style={{ marginBottom: '20px' }}>
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} size={18} fill="#FFD700" color="#FFD700" />
                        ))}
                      </div>
                      <p style={{
                        fontSize: '16px',
                        lineHeight: '1.6',
                        marginBottom: '25px',
                        fontStyle: 'italic'
                      }}>"{testimonial.testimonial_text || testimonial.text}"</p>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '15px'
                      }}>
                        <div style={{
                          width: '50px',
                          height: '50px',
                          borderRadius: '50%',
                          background: '#FFD700',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '20px',
                          fontWeight: 'bold'
                        }}>
                          {testimonial.client_image || testimonial.image ? (
                            <img 
                              src={testimonial.client_image || testimonial.image} 
                              alt={testimonial.client_name || testimonial.name}
                              style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                            />
                          ) : (
                            <span>{(testimonial.client_name || testimonial.name || '').charAt(0)}</span>
                          )}
                        </div>
                        <div style={{ textAlign: 'left' }}>
                          <h4 style={{ fontSize: '18px', marginBottom: '5px' }}>{testimonial.client_name || testimonial.name}</h4>
                          <p style={{ fontSize: '13px', color: '#FFD700', marginBottom: '3px' }}>{testimonial.client_role || testimonial.role}</p>
                          <span style={{ fontSize: '12px', color: '#aaa' }}>{testimonial.client_company || testimonial.company}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button className="slider-arrow next" onClick={nextTestimonial} style={{
              position: 'absolute',
              right: '-50px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255,215,0,0.2)',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10
            }}>
              <ChevronRight size={24} />
            </button>

            <div className="slider-dots" style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '10px',
              marginTop: '30px'
            }}>
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  style={{
                    width: index === currentTestimonial ? '30px' : '10px',
                    height: '10px',
                    borderRadius: '5px',
                    background: index === currentTestimonial ? '#FFD700' : 'rgba(255,215,0,0.3)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section" style={{ padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span className="section-subtitle" style={{ fontSize: '14px', color: '#FFD700' }}>FAQ</span>
            <h2 className="section-title" style={{ fontSize: '42px', margin: '10px 0' }}>Frequently Asked <span style={{ color: '#FFD700' }}>Questions</span></h2>
          </div>

          <div className="faq-grid" style={{ maxWidth: '800px', margin: '0 auto' }}>
            {faqs.map((faq: any) => (
              <div key={faq.id} className="faq-item" style={{
                marginBottom: '15px',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '10px',
                overflow: 'hidden'
              }}>
                <button 
                  onClick={() => setActiveFaq(activeFaq === faq.id ? null : faq.id)}
                  style={{
                    width: '100%',
                    padding: '20px',
                    textAlign: 'left',
                    background: 'rgba(255,255,255,0.05)',
                    border: 'none',
                    color: '#fff',
                    fontSize: '18px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <span>{faq.question}</span>
                  <ChevronRight size={20} style={{
                    transition: 'transform 0.3s ease',
                    transform: activeFaq === faq.id ? 'rotate(90deg)' : 'rotate(0deg)'
                  }} />
                </button>
                <div style={{
                  maxHeight: activeFaq === faq.id ? '200px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.3s ease',
                  padding: activeFaq === faq.id ? '20px' : '0 20px',
                  background: 'rgba(0,0,0,0.3)',
                  fontSize: '15px',
                  lineHeight: '1.6'
                }}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - MOBILE FIX: Date & Time alag lines */}
      <section className="contact-section" style={{ padding: '80px 0', background: '#0a0a0a' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span className="section-subtitle" style={{ fontSize: '14px', color: '#FFD700' }}>Get In Touch</span>
            <h2 className="section-title" style={{ fontSize: '42px', margin: '10px 0' }}>Book Your <span style={{ color: '#FFD700' }}>Appointment</span></h2>
            <p className="section-description" style={{ fontSize: '16px', color: '#aaa' }}>
              Schedule a consultation with our experts. We're here to help you grow your business.
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '40px',
            alignItems: 'stretch'
          }}>
            <div className="map-container" style={{ 
              width: '100%', 
              height: '100%', 
              minHeight: '450px',
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

            <div style={{
              background: '#1a1a1a',
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
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr', 
                  gap: '16px', 
                  marginBottom: '20px'
                }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: '500', color: '#aaa' }}>
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
                        outline: 'none'
                      }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: '500', color: '#aaa' }}>
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
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                {/* Row 2: Date & Time - Desktop: 2 columns, Mobile: 1 column (will be handled by media query) */}
                <div className="date-time-row" style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr', 
                  gap: '16px', 
                  marginBottom: '20px'
                }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: '500', color: '#aaa' }}>
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
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: '500', color: '#aaa' }}>
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
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                {/* Row 3: Phone Number */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: '500', color: '#aaa' }}>
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
                      outline: 'none'
                    }}
                  />
                </div>

                {/* Row 4: Message */}
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: '500', color: '#aaa' }}>
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
                      fontFamily: 'inherit'
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
      <section className="newsletter-section" style={{ padding: '80px 0', background: 'linear-gradient(135deg, #0a0a0a, #1a1a1a)' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div className="newsletter-content" style={{
            textAlign: 'center',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <h3 style={{ fontSize: '32px', marginBottom: '15px' }}>Subscribe to Our Newsletter</h3>
            <p style={{ fontSize: '16px', marginBottom: '25px', color: '#aaa' }}>Get the latest tech insights and updates directly in your inbox</p>
            <form className="newsletter-form" onSubmit={handleNewsletterSubmit} style={{
              display: 'flex',
              gap: '10px',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                style={{
                  flex: '1',
                  minWidth: '200px',
                  padding: '14px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255,215,0,0.3)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#fff',
                  fontSize: '16px'
                }}
              />
              <button type="submit" disabled={newsletterStatus === 'sending'} style={{
                padding: '14px 30px',
                background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                border: 'none',
                borderRadius: '10px',
                color: '#000',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '16px'
              }}>
                {newsletterStatus === 'sending' ? 'Subscribing...' : 'Subscribe'} <Send size={16} />
              </button>
            </form>
            {newsletterStatus === 'success' && <p style={{color: '#4ade80', marginTop: '10px', fontSize: '14px'}}>✅ Subscribed successfully!</p>}
            {newsletterStatus === 'error' && <p style={{color: '#f87171', marginTop: '10px', fontSize: '14px'}}>❌ {newsletterErrorMsg}</p>}
          </div>
        </div>
      </section>

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
        
        @media (max-width: 768px) {
          .testimonials-slider .slider-arrow {
            display: none;
          }
          
          /* Mobile: Date and Time in separate rows */
          .date-time-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
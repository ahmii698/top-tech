// pages/About.tsx
import { useEffect, useState } from 'react';
import { 
  Award, Users, Target, Eye, Heart, Shield, Code, 
  Rocket, Zap, Globe, Clock, CheckCircle, ArrowRight,
  Facebook, Twitter, Instagram, Linkedin, Quote, Mail,
  Github, Briefcase, Star, MapPin
} from 'lucide-react';
import './About.css';

const About = () => {
  const [counts, setCounts] = useState({
    years: 0,
    clients: 0,
    projects: 0,
    satisfaction: 0
  });

  // YE EFFECT - TITLE AUR SCROLL DONO KE LIYE
  useEffect(() => {
    // Set page title
    document.title = 'About Us - TopTech | IT Solutions Provider';
    // Scroll to top
    window.scrollTo(0, 0);
  }, []);

  // Animated counters - 3 Seconds
  useEffect(() => {
    const targets = {
      years: 10,
      clients: 200,
      projects: 500,
      satisfaction: 98
    };

    const duration = 3000;
    const steps = 60;
    const increment = {
      years: targets.years / steps,
      clients: targets.clients / steps,
      projects: targets.projects / steps,
      satisfaction: targets.satisfaction / steps
    };

    let currentStep = 0;
    const timer = setInterval(() => {
      if (currentStep < steps) {
        setCounts(prev => ({
          years: Math.min(Math.ceil(prev.years + increment.years), targets.years),
          clients: Math.min(Math.ceil(prev.clients + increment.clients), targets.clients),
          projects: Math.min(Math.ceil(prev.projects + increment.projects), targets.projects),
          satisfaction: Math.min(Math.ceil(prev.satisfaction + increment.satisfaction), targets.satisfaction)
        }));
        currentStep++;
      } else {
        setCounts(targets);
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  // Company Stats with animated values
  const stats = [
    { id: 1, value: counts.years + "+", label: "Years Experience", icon: <Clock size={32} /> },
    { id: 2, value: counts.clients + "+", label: "Happy Clients", icon: <Users size={32} /> },
    { id: 3, value: counts.projects + "+", label: "Projects Done", icon: <Code size={32} /> },
    { id: 4, value: counts.satisfaction + "%", label: "Client Satisfaction", icon: <Award size={32} /> }
  ];

  // Core Values
  const values = [
    {
      id: 1,
      icon: <Target size={40} />,
      title: "Mission",
      description: "To empower businesses with innovative technology solutions that drive growth, efficiency, and digital transformation."
    },
    {
      id: 2,
      icon: <Eye size={40} />,
      title: "Vision",
      description: "To be the most trusted technology partner globally, known for excellence, innovation, and client success."
    },
    {
      id: 3,
      icon: <Heart size={40} />,
      title: "Core Values",
      description: "Integrity, innovation, excellence, client-centricity, and continuous learning drive everything we do."
    }
  ];

  // Team Members - VIP with Circle Images
  const team = [
    {
      id: 1,
      name: "Alexander Mitchell",
      position: "Founder & CEO",
      bio: "20+ years in tech innovation. Previously led engineering at Fortune 500 companies.",
      expertise: ["Strategic Planning", "Business Development", "Tech Innovation"],
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=faces",
      social: { 
        twitter: "#", 
        linkedin: "#", 
        email: "#",
        github: "#" 
      }
    },
    {
      id: 2,
      name: "Victoria Chen",
      position: "CTO",
      bio: "AI/ML expert with 15+ years experience. PhD in Computer Science from Stanford.",
      expertise: ["Artificial Intelligence", "Machine Learning", "Cloud Architecture"],
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=faces",
      social: { 
        twitter: "#", 
        linkedin: "#", 
        email: "#",
        github: "#" 
      }
    },
    {
      id: 3,
      name: "Marcus Rodriguez",
      position: "Head of Design",
      bio: "Award-winning designer with 12+ years creating beautiful digital experiences.",
      expertise: ["UI/UX Design", "Brand Identity", "User Research"],
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=faces",
      social: { 
        twitter: "#", 
        linkedin: "#", 
        email: "#",
        github: "#" 
      }
    },
    {
      id: 4,
      name: "Sarah Johnson",
      position: "Lead Developer",
      bio: "Full-stack expert specializing in scalable web applications and cloud architecture.",
      expertise: ["React/Node.js", "Cloud Computing", "System Architecture"],
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=faces",
      social: { 
        twitter: "#", 
        linkedin: "#", 
        email: "#",
        github: "#" 
      }
    }
  ];

  // Milestones
  const milestones = [
    { id: 1, year: "2014", title: "Company Founded", description: "Started with just 3 people in a small office" },
    { id: 2, year: "2016", title: "First 100 Clients", description: "Reached 100 happy clients milestone" },
    { id: 3, year: "2018", title: "International Expansion", description: "Opened offices in 3 countries" },
    { id: 4, year: "2020", title: "500+ Projects", description: "Completed 500+ successful projects" },
    { id: 5, year: "2022", title: "Industry Award", description: "Won Best IT Service Provider Award" },
    { id: 6, year: "2024", title: "Global Presence", description: "Serving clients in 20+ countries" }
  ];

  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-particles"></div>
        <div className="container">
          <div className="about-hero-content">
            <span className="hero-subtitle">About TopTech</span>
            <h1 className="hero-title">
              We're on a Mission to <span className="golden-text">Transform</span> Businesses Through Technology
            </h1>
            <p className="hero-description">
              Founded in 2014, TopTech has grown from a small team of passionate developers 
              to a global technology partner trusted by 200+ businesses worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section - with animated counters */}
      <section className="about-stats">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat) => (
              <div key={stat.id} className="stat-item">
                <div className="stat-icon">{stat.icon}</div>
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="story-section">
        <div className="container">
          <div className="story-grid">
            <div className="story-content">
              <span className="section-subtitle">Our Story</span>
              <h2 className="section-title">From a <span className="golden-text">Dream</span> to Reality</h2>
              <p className="story-text">
                TopTech started in 2014 with a simple idea: to make enterprise-grade technology 
                accessible to businesses of all sizes. What began as a two-person operation in 
                a small garage has now grown into a global team of 50+ experts serving clients 
                across 20+ countries.
              </p>
              <p className="story-text">
                Our journey has been defined by passion, innovation, and an unwavering commitment 
                to client success. We've helped startups scale, enterprises transform, and 
                businesses of all sizes achieve their digital goals.
              </p>
              <div className="story-features">
                <div className="story-feature">
                  <CheckCircle size={20} />
                  <span>50+ Expert Team Members</span>
                </div>
                <div className="story-feature">
                  <CheckCircle size={20} />
                  <span>500+ Successful Projects</span>
                </div>
                <div className="story-feature">
                  <CheckCircle size={20} />
                  <span>20+ Countries Served</span>
                </div>
                <div className="story-feature">
                  <CheckCircle size={20} />
                  <span>98% Client Retention</span>
                </div>
              </div>
            </div>
            <div className="story-image">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop" 
                alt="TopTech Team"
                className="story-img"
              />
              <div className="story-quote">
                <Quote size={40} />
                <p>The best decision we made was partnering with TopTech. Their expertise transformed our business.</p>
                <span>- Michael Chen, CTO of InnovateLabs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="values-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">What Drives Us</span>
            <h2 className="section-title">Our <span className="golden-text">Core</span> Principles</h2>
          </div>

          <div className="values-grid">
            {values.map((value) => (
              <div key={value.id} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="milestones-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Our Journey</span>
            <h2 className="section-title">Key <span className="golden-text">Milestones</span></h2>
          </div>

          <div className="milestones-grid">
            {milestones.map((item) => (
              <div key={item.id} className="milestone-card">
                <div className="milestone-year">{item.year}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section - CIRCLE IMAGES */}
      <section className="team-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Our Leadership</span>
            <h2 className="section-title">Meet the <span className="golden-text">Team</span></h2>
            <p className="section-description">
              Passionate experts dedicated to your success
            </p>
          </div>

          <div className="team-grid">
            {team.map((member) => (
              <div key={member.id} className="team-card">
                <div className="team-image-wrapper">
                  <div className="team-image-circle">
                    <img src={member.image} alt={member.name} />
                    <div className="team-image-overlay">
                      <div className="team-expertise">
                        {member.expertise.map((skill, index) => (
                          <span key={index} className="expertise-tag">{skill}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="team-social-circle">
                    <a href={member.social.twitter} className="social-icon-circle" target="_blank" rel="noopener noreferrer">
                      <Twitter size={14} />
                    </a>
                    <a href={member.social.linkedin} className="social-icon-circle" target="_blank" rel="noopener noreferrer">
                      <Linkedin size={14} />
                    </a>
                    <a href={member.social.github} className="social-icon-circle" target="_blank" rel="noopener noreferrer">
                      <Github size={14} />
                    </a>
                    <a href={`mailto:${member.social.email}`} className="social-icon-circle">
                      <Mail size={14} />
                    </a>
                  </div>
                </div>
                <div className="team-info-circle">
                  <h3>{member.name}</h3>
                  <p className="team-position-circle">{member.position}</p>
                  <p className="team-bio-circle">{member.bio}</p>
                  <div className="team-stats-circle">
                    <div className="team-stat-circle">
                      <Briefcase size={12} />
                      <span>10+ Projects</span>
                    </div>
                    <div className="team-stat-circle">
                      <Star size={12} />
                      <span>4.9 Rating</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-section">
        <div className="container">
          <div className="why-choose-grid">
            <div className="why-choose-content">
              <span className="section-subtitle">Why Choose Us</span>
              <h2 className="section-title">We're <span className="golden-text">Different</span> by Design</h2>
              <ul className="why-choose-list">
                <li>
                  <Shield size={24} />
                  <div>
                    <h4>Proven Track Record</h4>
                    <p>500+ successful projects with 98% client satisfaction rate</p>
                  </div>
                </li>
                <li>
                  <Users size={24} />
                  <div>
                    <h4>Expert Team</h4>
                    <p>50+ certified professionals with diverse industry experience</p>
                  </div>
                </li>
                <li>
                  <Rocket size={24} />
                  <div>
                    <h4>Innovation First</h4>
                    <p>Cutting-edge technologies and modern development practices</p>
                  </div>
                </li>
                <li>
                  <Zap size={24} />
                  <div>
                    <h4>Client-Centric Approach</h4>
                    <p>Your success is our success - we're partners in your growth</p>
                  </div>
                </li>
              </ul>
              <button className="btn-primary">
                Start Your Journey <ArrowRight size={18} />
              </button>
            </div>
            <div className="why-choose-image">
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=600&fit=crop" 
                alt="Why Choose TopTech"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Work With the Best?</h2>
            <p>Let's discuss how we can help transform your business</p>
            <button className="btn-primary">Get in Touch</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
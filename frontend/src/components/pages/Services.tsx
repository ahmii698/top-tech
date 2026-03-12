// pages/Services.tsx
import { useEffect } from 'react';
import { 
  Code, Smartphone, Cloud, Shield, Database, ShoppingCart, 
  PenTool, Headphones, Globe, Zap, Users, Clock, 
  CheckCircle, ArrowRight, Star, Award, TrendingUp,
  Rocket, Cpu, Palette, BarChart, Briefcase, Lock
} from 'lucide-react';
import './Services.css';

const Services = () => {
  // YE EFFECT - TITLE AUR SCROLL DONO KE LIYE
  useEffect(() => {
    // Set page title
    document.title = 'Our Services - TopTech | IT Solutions Provider';
    // Scroll to top
    window.scrollTo(0, 0);
  }, []);

  // Services Data
  const services = [
    {
      id: 1,
      icon: <Code size={48} />,
      title: "Web Development",
      description: "Custom websites, web applications, and e-commerce solutions built with modern technologies like React, Node.js, and PHP.",
      features: ["Responsive Design", "Fast Performance", "SEO Optimized", "Secure Code"],
      color: "#FFD700"
    },
    {
      id: 2,
      icon: <Smartphone size={48} />,
      title: "Mobile App Development",
      description: "Native and cross-platform mobile apps for iOS and Android that deliver exceptional user experiences.",
      features: ["iOS & Android", "React Native", "Flutter", "App Store Upload"],
      color: "#FFD700"
    },
    {
      id: 3,
      icon: <Cloud size={48} />,
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure, migration services, and cloud-native application development on AWS, Azure, and GCP.",
      features: ["Cloud Migration", "Serverless", "DevOps", "Auto-scaling"],
      color: "#FFD700"
    },
    {
      id: 4,
      icon: <Shield size={48} />,
      title: "Cybersecurity",
      description: "Comprehensive security solutions to protect your business from digital threats and vulnerabilities.",
      features: ["Security Audits", "Penetration Testing", "Firewall Setup", "Compliance"],
      color: "#FFD700"
    },
    {
      id: 5,
      icon: <Database size={48} />,
      title: "Data Analytics",
      description: "Transform your data into actionable insights with our advanced analytics and BI solutions.",
      features: ["Business Intelligence", "Big Data", "Machine Learning", "Reporting"],
      color: "#FFD700"
    },
    {
      id: 6,
      icon: <ShoppingCart size={48} />,
      title: "E-Commerce Solutions",
      description: "End-to-end e-commerce platforms that drive sales and provide seamless shopping experiences.",
      features: ["Custom Stores", "Payment Integration", "Inventory Management", "SEO"],
      color: "#FFD700"
    },
    {
      id: 7,
      icon: <PenTool size={48} />,
      title: "UI/UX Design",
      description: "User-centered design that creates intuitive, engaging, and beautiful digital experiences.",
      features: ["User Research", "Wireframing", "Prototyping", "Usability Testing"],
      color: "#FFD700"
    },
    {
      id: 8,
      icon: <Headphones size={48} />,
      title: "IT Consulting",
      description: "Expert guidance to help you make informed technology decisions and optimize your IT strategy.",
      features: ["Technology Audit", "Digital Strategy", "Process Optimization", "Training"],
      color: "#FFD700"
    },
    {
      id: 9,
      icon: <Globe size={48} />,
      title: "Digital Marketing",
      description: "Data-driven digital marketing strategies that increase visibility, engagement, and conversions.",
      features: ["SEO/SEM", "Social Media", "Content Marketing", "Email Campaigns"],
      color: "#FFD700"
    },
    {
      id: 10,
      icon: <Cpu size={48} />,
      title: "AI/ML Solutions",
      description: "Intelligent AI and machine learning solutions that automate processes and provide valuable insights.",
      features: ["Chatbots", "Predictive Analytics", "Computer Vision", "NLP"],
      color: "#FFD700"
    },
    {
      id: 11,
      icon: <Briefcase size={48} />,
      title: "CRM Development",
      description: "Custom CRM systems that streamline operations and enhance customer relationships.",
      features: ["Sales Pipeline", "Contact Management", "Analytics", "Integration"],
      color: "#FFD700"
    },
    {
      id: 12,
      icon: <Lock size={48} />,
      title: "Blockchain Solutions",
      description: "Secure and transparent blockchain solutions for modern business needs.",
      features: ["Smart Contracts", "DApps", "Cryptocurrency", "Supply Chain"],
      color: "#FFD700"
    }
  ];

  // Process Steps
  const processSteps = [
    {
      id: 1,
      number: "01",
      title: "Discovery",
      description: "We analyze your requirements, goals, and target audience to create a detailed project plan."
    },
    {
      id: 2,
      number: "02",
      title: "Planning",
      description: "We create wireframes, prototypes, and technical specifications for your approval."
    },
    {
      id: 3,
      number: "03",
      title: "Development",
      description: "Our experts build your solution using agile methodology with regular updates."
    },
    {
      id: 4,
      number: "04",
      title: "Testing",
      description: "Rigorous quality assurance and performance testing to ensure everything works perfectly."
    },
    {
      id: 5,
      number: "05",
      title: "Deployment",
      description: "We deploy your solution and ensure smooth launch with zero downtime."
    },
    {
      id: 6,
      number: "06",
      title: "Support",
      description: "Ongoing maintenance, support, and continuous improvement for your peace of mind."
    }
  ];

  // Technologies
  const technologies = [
    { id: 1, name: "React", icon: "⚛️" },
    { id: 2, name: "Node.js", icon: "🟢" },
    { id: 3, name: "Python", icon: "🐍" },
    { id: 4, name: "PHP", icon: "🐘" },
    { id: 5, name: "Laravel", icon: "⚡" },
    { id: 6, name: "MySQL", icon: "🗄️" },
    { id: 7, name: "MongoDB", icon: "🍃" },
    { id: 8, name: "AWS", icon: "☁️" },
    { id: 9, name: "Docker", icon: "🐳" },
    { id: 10, name: "Kubernetes", icon: "⎈" },
    { id: 11, name: "GraphQL", icon: "◉" },
    { id: 12, name: "TypeScript", icon: "🔷" }
  ];

  return (
    <div className="services-container">
      {/* Hero Section */}
      <section className="services-hero">
        <div className="hero-particles"></div>
        <div className="container">
          <div className="services-hero-content">
            <span className="hero-subtitle">Our Services</span>
            <h1 className="hero-title">
              Comprehensive <span className="golden-text">IT Solutions</span> For Your Business
            </h1>
            <p className="hero-description">
              We offer a wide range of technology services to help you grow, innovate, 
              and succeed in today's digital landscape.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-grid-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">What We Offer</span>
            <h2 className="section-title">Our <span className="golden-text">Services</span></h2>
            <p className="section-description">
              End-to-end solutions tailored to your business needs
            </p>
          </div>

          <div className="services-grid">
            {services.map((service) => (
              <div key={service.id} className="service-card">
                <div className="service-icon-wrapper">
                  <div className="service-icon">
                    {service.icon}
                  </div>
                </div>
                <h3>{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <ul className="service-features">
                  {service.features.map((feature, index) => (
                    <li key={index}>
                      <CheckCircle size={14} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a href="#" className="service-link">
                  Learn More <ArrowRight size={16} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">How We Work</span>
            <h2 className="section-title">Our <span className="golden-text">Process</span></h2>
            <p className="section-description">
              A systematic approach to deliver excellence
            </p>
          </div>

          <div className="process-grid">
            {processSteps.map((step) => (
              <div key={step.id} className="process-card">
                <div className="process-number">{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="tech-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Technologies</span>
            <h2 className="section-title">Tools & <span className="golden-text">Technologies</span></h2>
            <p className="section-description">
              We work with cutting-edge technologies
            </p>
          </div>

          <div className="tech-grid">
            {technologies.map((tech) => (
              <div key={tech.id} className="tech-card">
                <span className="tech-icon">{tech.icon}</span>
                <span className="tech-name">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-section">
        <div className="container">
          <div className="why-choose-grid">
            <div className="why-choose-content">
              <span className="section-subtitle">Why Choose Us</span>
              <h2 className="section-title">We're <span className="golden-text">Different</span> by Design</h2>
              <ul className="why-choose-list">
                <li>
                  <Award size={24} />
                  <div>
                    <h4>10+ Years Experience</h4>
                    <p>Proven track record of delivering quality solutions</p>
                  </div>
                </li>
                <li>
                  <Users size={24} />
                  <div>
                    <h4>Expert Team</h4>
                    <p>50+ certified professionals ready to help you</p>
                  </div>
                </li>
                <li>
                  <Rocket size={24} />
                  <div>
                    <h4>Fast Delivery</h4>
                    <p>Agile methodology ensures quick turnaround</p>
                  </div>
                </li>
                <li>
                  <Clock size={24} />
                  <div>
                    <h4>24/7 Support</h4>
                    <p>Round-the-clock assistance for your peace of mind</p>
                  </div>
                </li>
              </ul>
              <button className="btn-primary">
                Start Your Project <ArrowRight size={18} />
              </button>
            </div>
            <div className="why-choose-image">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=600&fit=crop" 
                alt="Why Choose Us"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Project?</h2>
            <p>Let's discuss how we can help bring your ideas to life</p>
            <button className="btn-primary">Get in Touch</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
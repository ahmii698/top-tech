// pages/Blog.tsx
import { useEffect, useState } from 'react';
import { 
  Calendar, User, Tag, Clock, ArrowRight, Search, 
  Facebook, Twitter, Linkedin, Instagram, MessageCircle,
  Eye, Heart, Share2, Bookmark, ChevronLeft, ChevronRight,
  X, Filter, TrendingUp, Award, Star
} from 'lucide-react';
import './Blog.css';

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [currentFeatured, setCurrentFeatured] = useState(0);

  useEffect(() => {
    document.title = 'Blog - TopTech | IT Solutions Provider';
    window.scrollTo(0, 0);
  }, []);

  // Auto-slide featured posts
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeatured((prev) => (prev + 1) % featuredPosts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Blog Categories with updated counts (15 posts total)
  const categories = [
    { id: 'all', name: 'All Posts', count: 15 },
    { id: 'web-dev', name: 'Web Development', count: 5 },
    { id: 'mobile-app', name: 'Mobile Apps', count: 4 },
    { id: 'cloud', name: 'Cloud Computing', count: 3 },
    { id: 'ai-ml', name: 'AI & Machine Learning', count: 2 },
    { id: 'cybersecurity', name: 'Cybersecurity', count: 1 }
  ];

  // Featured Posts Data - 15 posts
  const featuredPosts = [
    {
      id: 1,
      title: "The Future of Web Development: What to Expect in 2024",
      excerpt: "Explore the latest trends shaping web development, from AI-powered tools to new frameworks and best practices.",
      category: "web-dev",
      tags: ["React", "Next.js", "Trends"],
      author: {
        name: "Alexander Mitchell",
        avatar: "https://ui-avatars.com/api/?name=Alexander+Mitchell&background=FFD700&color=0A0A0A&size=100",
        role: "CEO & Founder"
      },
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop",
      date: "Mar 15, 2024",
      readTime: "5 min read",
      views: 1234,
      likes: 89,
      comments: 23
    },
    {
      id: 2,
      title: "React vs Vue: Which Framework Should You Choose?",
      excerpt: "A comprehensive comparison between React and Vue to help you make the right choice for your next project.",
      category: "web-dev",
      tags: ["React", "Vue", "Comparison"],
      author: {
        name: "Sarah Johnson",
        avatar: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=FFD700&color=0A0A0A&size=100",
        role: "Lead Developer"
      },
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6a0c?w=600&h=400&fit=crop",
      date: "Mar 10, 2024",
      readTime: "7 min read",
      views: 2345,
      likes: 156,
      comments: 34
    },
    {
      id: 3,
      title: "Mastering Cloud Architecture: Best Practices",
      excerpt: "Learn the key principles and best practices for designing scalable and secure cloud architectures.",
      category: "cloud",
      tags: ["AWS", "Azure", "DevOps"],
      author: {
        name: "Victoria Chen",
        avatar: "https://ui-avatars.com/api/?name=Victoria+Chen&background=FFD700&color=0A0A0A&size=100",
        role: "CTO"
      },
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
      date: "Mar 5, 2024",
      readTime: "6 min read",
      views: 1876,
      likes: 98,
      comments: 15
    },
    {
      id: 4,
      title: "iOS vs Android Development: A Complete Guide",
      excerpt: "Compare iOS and Android development to understand which platform suits your business needs better.",
      category: "mobile-app",
      tags: ["iOS", "Android", "Mobile"],
      author: {
        name: "Marcus Rodriguez",
        avatar: "https://ui-avatars.com/api/?name=Marcus+Rodriguez&background=FFD700&color=0A0A0A&size=100",
        role: "Head of Design"
      },
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
      date: "Feb 28, 2024",
      readTime: "8 min read",
      views: 1543,
      likes: 67,
      comments: 12
    },
    {
      id: 5,
      title: "AI in Business: Practical Applications for 2024",
      excerpt: "Discover how artificial intelligence is transforming businesses and what you need to know.",
      category: "ai-ml",
      tags: ["AI", "Machine Learning", "Business"],
      author: {
        name: "Priya Patel",
        avatar: "https://ui-avatars.com/api/?name=Priya+Patel&background=FFD700&color=0A0A0A&size=100",
        role: "AI Specialist"
      },
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop",
      date: "Feb 20, 2024",
      readTime: "5 min read",
      views: 2098,
      likes: 145,
      comments: 28
    },
    {
      id: 6,
      title: "Cybersecurity Best Practices for Small Businesses",
      excerpt: "Essential security measures every small business should implement to protect their digital assets.",
      category: "cybersecurity",
      tags: ["Security", "Business", "Protection"],
      author: {
        name: "David Williams",
        avatar: "https://ui-avatars.com/api/?name=David+Williams&background=FFD700&color=0A0A0A&size=100",
        role: "Security Head"
      },
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop",
      date: "Feb 15, 2024",
      readTime: "4 min read",
      views: 987,
      likes: 56,
      comments: 8
    },
    {
      id: 7,
      title: "Building Scalable APIs with Node.js",
      excerpt: "Learn how to design and build high-performance APIs that can handle millions of requests.",
      category: "web-dev",
      tags: ["Node.js", "API", "Backend"],
      author: {
        name: "Michael Chen",
        avatar: "https://ui-avatars.com/api/?name=Michael+Chen&background=FFD700&color=0A0A0A&size=100",
        role: "Senior Developer"
      },
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
      date: "Feb 10, 2024",
      readTime: "6 min read",
      views: 1654,
      likes: 87,
      comments: 19
    },
    {
      id: 8,
      title: "The Complete Guide to Flutter Development",
      excerpt: "Everything you need to know about building beautiful cross-platform apps with Flutter.",
      category: "mobile-app",
      tags: ["Flutter", "Mobile", "Cross-platform"],
      author: {
        name: "Lisa Wang",
        avatar: "https://ui-avatars.com/api/?name=Lisa+Wang&background=FFD700&color=0A0A0A&size=100",
        role: "Mobile Developer"
      },
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop",
      date: "Feb 5, 2024",
      readTime: "7 min read",
      views: 1432,
      likes: 76,
      comments: 14
    },
    {
      id: 9,
      title: "Docker and Kubernetes: A Practical Guide",
      excerpt: "Master containerization and orchestration with Docker and Kubernetes for modern application deployment.",
      category: "cloud",
      tags: ["Docker", "Kubernetes", "DevOps"],
      author: {
        name: "James Wilson",
        avatar: "https://ui-avatars.com/api/?name=James+Wilson&background=FFD700&color=0A0A0A&size=100",
        role: "DevOps Engineer"
      },
      image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=600&h=400&fit=crop",
      date: "Jan 28, 2024",
      readTime: "6 min read",
      views: 1123,
      likes: 67,
      comments: 11
    },
    {
      id: 10,
      title: "TypeScript Best Practices for Large Applications",
      excerpt: "Learn how to leverage TypeScript effectively in large-scale applications for better code quality.",
      category: "web-dev",
      tags: ["TypeScript", "JavaScript", "Best Practices"],
      author: {
        name: "Emily Brown",
        avatar: "https://ui-avatars.com/api/?name=Emily+Brown&background=FFD700&color=0A0A0A&size=100",
        role: "Senior Developer"
      },
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
      date: "Jan 20, 2024",
      readTime: "5 min read",
      views: 1876,
      likes: 98,
      comments: 21
    },
    {
      id: 11,
      title: "React Native vs Flutter: Cross-Platform Showdown",
      excerpt: "Detailed comparison of React Native and Flutter to help you choose the right framework for your mobile app.",
      category: "mobile-app",
      tags: ["React Native", "Flutter", "Mobile"],
      author: {
        name: "Robert Taylor",
        avatar: "https://ui-avatars.com/api/?name=Robert+Taylor&background=FFD700&color=0A0A0A&size=100",
        role: "Mobile Developer"
      },
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
      date: "Jan 15, 2024",
      readTime: "8 min read",
      views: 2341,
      likes: 167,
      comments: 42
    },
    {
      id: 12,
      title: "Machine Learning for Beginners: Getting Started",
      excerpt: "A beginner-friendly introduction to machine learning concepts and practical applications.",
      category: "ai-ml",
      tags: ["Machine Learning", "AI", "Beginners"],
      author: {
        name: "Jennifer Lee",
        avatar: "https://ui-avatars.com/api/?name=Jennifer+Lee&background=FFD700&color=0A0A0A&size=100",
        role: "AI Specialist"
      },
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop",
      date: "Jan 10, 2024",
      readTime: "6 min read",
      views: 1987,
      likes: 134,
      comments: 28
    },
    {
      id: 13,
      title: "Serverless Architecture: Pros and Cons",
      excerpt: "Explore the benefits and drawbacks of serverless architecture for modern applications.",
      category: "cloud",
      tags: ["Serverless", "AWS Lambda", "Cloud"],
      author: {
        name: "Daniel Martinez",
        avatar: "https://ui-avatars.com/api/?name=Daniel+Martinez&background=FFD700&color=0A0A0A&size=100",
        role: "Cloud Architect"
      },
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
      date: "Jan 5, 2024",
      readTime: "5 min read",
      views: 1432,
      likes: 76,
      comments: 15
    },
    {
      id: 14,
      title: "Web Security: Essential Tips for Developers",
      excerpt: "Learn crucial security practices to protect your web applications from common vulnerabilities.",
      category: "web-dev",
      tags: ["Security", "Web Dev", "Best Practices"],
      author: {
        name: "Christopher Adams",
        avatar: "https://ui-avatars.com/api/?name=Christopher+Adams&background=FFD700&color=0A0A0A&size=100",
        role: "Security Expert"
      },
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop",
      date: "Dec 28, 2023",
      readTime: "7 min read",
      views: 1654,
      likes: 89,
      comments: 23
    },
    {
      id: 15,
      title: "The Rise of Progressive Web Apps",
      excerpt: "Discover why PWAs are becoming the future of web development and how to build them.",
      category: "web-dev",
      tags: ["PWA", "Web Dev", "Mobile"],
      author: {
        name: "Amanda White",
        avatar: "https://ui-avatars.com/api/?name=Amanda+White&background=FFD700&color=0A0A0A&size=100",
        role: "Frontend Developer"
      },
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop",
      date: "Dec 20, 2023",
      readTime: "5 min read",
      views: 1345,
      likes: 78,
      comments: 16
    }
  ];

  // Blog Posts Data - 15 posts (same as featured)
  const blogPosts = [...featuredPosts]; // Using same data for both

  // Navigation functions for featured slider
  const nextFeatured = () => {
    setCurrentFeatured((prev) => (prev + 1) % featuredPosts.length);
  };

  const prevFeatured = () => {
    setCurrentFeatured((prev) => (prev - 1 + featuredPosts.length) % featuredPosts.length);
  };

  // Filter posts based on category and search
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Pagination
  const postsPerPage = 4;
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <div className="blog-container">
      {/* Hero Section */}
      <section className="blog-hero">
        <div className="hero-particles"></div>
        <div className="container">
          <div className="blog-hero-content">
            <span className="hero-subtitle">Our Blog</span>
            <h1 className="hero-title">
              Insights & <span className="golden-text">Innovations</span>
            </h1>
            <p className="hero-description">
              Stay updated with the latest trends, tips, and insights from our tech experts
            </p>
            
            {/* Search Bar */}
            <div className="hero-search">
              <div className={`search-wrapper ${showSearch ? 'expanded' : ''}`}>
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                <button 
                  className="search-btn"
                  onClick={() => setShowSearch(!showSearch)}
                >
                  {showSearch ? <X size={20} /> : <Search size={20} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts Slider - HORIZONTAL SLIDER with 15 posts */}
      {searchQuery === '' && selectedCategory === 'all' && (
        <section className="featured-section">
          <div className="container">
            <div className="featured-header">
              <h2 className="featured-title">
                <Award size={24} />
                Featured <span className="golden-text">Posts</span>
              </h2>
              <div className="featured-controls">
                <button 
                  className="featured-control prev" 
                  onClick={prevFeatured}
                  disabled={featuredPosts.length <= 1}
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  className="featured-control next" 
                  onClick={nextFeatured}
                  disabled={featuredPosts.length <= 1}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <div className="featured-slider-container">
              <div 
                className="featured-slider-track"
                style={{ transform: `translateX(-${currentFeatured * 100}%)` }}
              >
                {featuredPosts.map((post) => (
                  <div key={post.id} className="featured-slide">
                    <div className="featured-card">
                      <div className="featured-card-image">
                        <img src={post.image} alt={post.title} />
                        <span className="featured-category">{post.category}</span>
                      </div>
                      <div className="featured-card-content">
                        <div className="featured-meta">
                          <span className="featured-date">
                            <Calendar size={14} />
                            {post.date}
                          </span>
                          <span className="featured-read-time">
                            <Clock size={14} />
                            {post.readTime}
                          </span>
                        </div>
                        <h3 className="featured-card-title">{post.title}</h3>
                        <p className="featured-card-excerpt">{post.excerpt}</p>
                        <div className="featured-card-footer">
                          <div className="featured-author">
                            <img src={post.author.avatar} alt={post.author.name} />
                            <div>
                              <h4>{post.author.name}</h4>
                              <p>{post.author.role}</p>
                            </div>
                          </div>
                          <a href="#" className="featured-read-more">
                            Read More <ArrowRight size={14} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Slider Dots */}
            {featuredPosts.length > 1 && (
              <div className="featured-dots">
                {featuredPosts.map((_, index) => (
                  <button
                    key={index}
                    className={`dot ${index === currentFeatured ? 'active' : ''}`}
                    onClick={() => setCurrentFeatured(index)}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Blog Content Section */}
      <section className="blog-content-section">
        <div className="container">
          <div className="blog-layout">
            {/* Sidebar */}
            <aside className="blog-sidebar">
              {/* Categories */}
              <div className="sidebar-widget">
                <h3 className="widget-title">Categories</h3>
                <ul className="category-list">
                  {categories.map(category => (
                    <li key={category.id}>
                      <button
                        className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                        onClick={() => {
                          setSelectedCategory(category.id);
                          setCurrentPage(1);
                        }}
                      >
                        <span>{category.name}</span>
                        <span className="category-count">{category.count}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter */}
              <div className="sidebar-widget newsletter-widget">
                <h3 className="widget-title">Newsletter</h3>
                <p>Subscribe to get the latest updates</p>
                <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                  <input type="email" placeholder="Your email" />
                  <button type="submit">Subscribe</button>
                </form>
              </div>
            </aside>

            {/* Blog Posts Grid */}
            <div className="blog-posts">
              {currentPosts.length > 0 ? (
                <>
                  <div className="posts-grid">
                    {currentPosts.map(post => (
                      <article key={post.id} className="blog-post-card">
                        <div className="post-image">
                          <img src={post.image} alt={post.title} />
                          <div className="post-category">{post.category}</div>
                        </div>
                        <div className="post-content">
                          <div className="post-meta">
                            <span className="post-date">
                              <Calendar size={14} />
                              {post.date}
                            </span>
                            <span className="post-read-time">
                              <Clock size={14} />
                              {post.readTime}
                            </span>
                          </div>
                          <h3 className="post-title">
                            <a href="#">{post.title}</a>
                          </h3>
                          <p className="post-excerpt">{post.excerpt}</p>
                          
                          <div className="post-footer">
                            <div className="post-author">
                              <img src={post.author.avatar} alt={post.author.name} />
                              <span>{post.author.name}</span>
                            </div>
                            <div className="post-stats">
                              <span title="Views">
                                <Eye size={14} />
                                {post.views}
                              </span>
                              <span title="Likes">
                                <Heart size={14} />
                                {post.likes}
                              </span>
                              <span title="Comments">
                                <MessageCircle size={14} />
                                {post.comments}
                              </span>
                            </div>
                          </div>
                          
                          <div className="post-tags">
                            {post.tags.map(tag => (
                              <span key={tag} className="tag">#{tag}</span>
                            ))}
                          </div>
                          
                          <a href="#" className="read-more">
                            Read More <ArrowRight size={14} />
                          </a>
                        </div>
                      </article>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="pagination">
                      <button
                        className="pagination-btn"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft size={18} />
                      </button>
                      
                      {[...Array(totalPages)].map((_, i) => (
                        <button
                          key={i + 1}
                          className={`pagination-btn ${currentPage === i + 1 ? 'active' : ''}`}
                          onClick={() => setCurrentPage(i + 1)}
                        >
                          {i + 1}
                        </button>
                      ))}
                      
                      <button
                        className="pagination-btn"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="no-results">
                  <Search size={48} />
                  <h3>No posts found</h3>
                  <p>Try adjusting your search or filter to find what you're looking for.</p>
                  <button 
                    className="btn-primary"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setCurrentPage(1);
                    }}
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Want to Contribute?</h2>
            <p>Share your expertise and insights with our community</p>
            <button className="btn-primary">Write for Us</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
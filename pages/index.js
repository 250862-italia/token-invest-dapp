import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { getRandomNews, updateNewsDates } from '../data/news';

export default function Home() {
  const [news, setNews] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(null);

  const fetchNews = async () => {
    try {
      const response = await fetch('/api/news');
      const data = await response.json();
      
      if (data.success) {
        setNews(data.news);
        setLastUpdate(data.timestamp);
      } else {
        // Fallback to local news if API fails
        const randomNews = getRandomNews();
        const updatedNews = updateNewsDates(randomNews);
        setNews(updatedNews);
      }
    } catch (error) {
      // Fallback to local news if API fails
      const randomNews = getRandomNews();
      const updatedNews = updateNewsDates(randomNews);
      setNews(updatedNews);
    }
  };

  useEffect(() => {
    // Check if we need to update news (once per day)
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem('glg_news_date');
    
    if (storedDate !== today) {
      // Update news for today
      fetchNews();
      localStorage.setItem('glg_news_date', today);
    } else {
      // Load cached news
      const cachedNews = localStorage.getItem('glg_news_cache');
      if (cachedNews) {
        setNews(JSON.parse(cachedNews));
      } else {
        fetchNews();
      }
    }
  }, []);

  // Cache news when it updates
  useEffect(() => {
    if (news.length > 0) {
      localStorage.setItem('glg_news_cache', JSON.stringify(news));
    }
  }, [news]);

  const getTagClassName = (tag) => {
    const tagMap = {
      'partnership': styles.partnership,
      'markets': styles.markets,
      'regulation': styles.regulation,
      'luxury': styles.luxury,
      'technology': styles.technology,
      'emerging': styles.emerging
    };
    return `${styles.newsTag} ${tagMap[tag] || styles.partnership}`;
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>GLG Capital Group - Homepage</title>
        <meta name="description" content="GLG Capital Group LLC - Innovative Financial Solutions" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation Bar */}
      <nav className={styles.navbar}>
        <div className={styles.navContainer}>
          <div className={styles.navLogo}>
            <span className={styles.navLogoText}>GLG Capital Group</span>
          </div>
          <div className={styles.navLinks}>
            <a href="/" className={styles.navLink}>Home</a>
            <a href="/about" className={styles.navLink}>About Us</a>
            <a href="/about#contact" className={styles.navLink}>Contact</a>
            <a href="/dashboard" className={styles.navButton}>Client Area</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Welcome to <span className={styles.heroHighlight}>GLG Capital Group</span>
          </h1>
          <p className={styles.heroSubtitle}>
            "True power is not bought. It's subscribed."
          </p>
        </div>
      </section>

      {/* Business Image Section */}
      <section className={styles.businessSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.businessImageContainer}>
            <img 
              src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
              alt="Modern Business Office" 
              className={styles.businessImage}
            />
            <div className={styles.businessOverlay}>
              <div className={styles.businessContent}>
                <h2 className={styles.businessTitle}>Excellence in Equity Management</h2>
                <p className={styles.businessSubtitle}>
                  Strategic partnerships, innovative solutions, and unparalleled expertise in global financial markets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className={styles.newsSection}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>Latest News</h2>
          <div className={styles.newsGrid}>
            {news.map((newsItem, index) => (
              <div key={newsItem.id} className={styles.newsCard}>
                <div className={styles.newsDate}>{newsItem.date}</div>
                <h3 className={styles.newsHeadline}>{newsItem.headline}</h3>
                <p className={styles.newsExcerpt}>{newsItem.excerpt}</p>
                <div className={getTagClassName(newsItem.tag)}>
                  {newsItem.tag.charAt(0).toUpperCase() + newsItem.tag.slice(1)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerInfo}>
            <h3 className={styles.footerTitle}>GLG Capital Consulting LLC</h3>
            <p className={styles.footerAddress}>
              1309 Coffeen Avenue, STE 1200<br />
              Sheridan, Wyoming 82801<br />
              United States
            </p>
            <div className={styles.footerLinks}>
              <a href="https://www.glgcapitalgroupllc.com" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
                Official Website
              </a>
              <a href="/about" className={styles.footerLink}>
                About Us
              </a>
            </div>
            <p className={styles.footerLegal}>
              © 2024 GLG Capital Consulting LLC. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
} 
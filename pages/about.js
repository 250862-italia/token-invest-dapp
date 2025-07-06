import Head from 'next/head';
import styles from '../styles/About.module.css';

export default function About() {
  return (
    <div className={styles.container}>
      <Head>
        <title>About Us - GLG Capital Group</title>
        <meta name="description" content="Discover the story and mission of GLG Capital Group LLC" />
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
            <a href="#contact" className={styles.navLink}>Contact</a>
            <a href="/dashboard" className={styles.navButton}>Client Area</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>About Us</h1>
          <p className={styles.heroSubtitle}>
            GLG Capital Group LLC - Innovation and Excellence in the Financial Sector
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className={styles.storySection}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>Our Story</h2>
          <div className={styles.storyContent}>
            <p className={styles.storyText}>
              GLG Capital Group LLC is a leading financial consulting company in the equity 
              and wealth management sector. Founded with the goal of providing innovative and 
              personalized financial solutions, we have developed a reputation for excellence 
              in the global market.
            </p>
            <p className={styles.storyText}>
              Our company stands out for its strategic approach to equity management, combining 
              advanced market analysis with a deep understanding of global economic dynamics. 
              This allows us to offer our clients unique financial opportunities and 
              tailored wealth management solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className={styles.missionSection}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>Our Mission</h2>
          <div className={styles.missionContent}>
            <div className={styles.missionCard}>
              <h3 className={styles.missionCardTitle}>Innovation</h3>
              <p className={styles.missionCardText}>
                We develop cutting-edge financial solutions that leverage the latest 
                technologies and investment methodologies.
              </p>
            </div>
            <div className={styles.missionCard}>
              <h3 className={styles.missionCardTitle}>Excellence</h3>
              <p className={styles.missionCardText}>
                We maintain the highest standards of quality and professionalism in every aspect 
                of our service.
              </p>
            </div>
            <div className={styles.missionCard}>
              <h3 className={styles.missionCardTitle}>Trust</h3>
              <p className={styles.missionCardText}>
                We build lasting relationships based on transparency, integrity, and 
                mutual trust with our clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={styles.servicesSection}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>Our Services</h2>
          <div className={styles.servicesGrid}>
            <div className={styles.serviceCard}>
              <h3 className={styles.serviceTitle}>Wealth Management</h3>
              <p className={styles.serviceDescription}>
                Personalized strategies for managing and growing our clients' wealth 
                and equity portfolios.
              </p>
            </div>
            <div className={styles.serviceCard}>
              <h3 className={styles.serviceTitle}>Financial Advisory</h3>
              <p className={styles.serviceDescription}>
                Expert consultation for informed and strategic financial decisions.
              </p>
            </div>
            <div className={styles.serviceCard}>
              <h3 className={styles.serviceTitle}>Alternative Equity Solutions</h3>
              <p className={styles.serviceDescription}>
                Access to innovative and diversified financial opportunities.
              </p>
            </div>
            <div className={styles.serviceCard}>
              <h3 className={styles.serviceTitle}>Market Analysis</h3>
              <p className={styles.serviceDescription}>
                In-depth analysis and exclusive insights on global financial markets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={styles.contactSection}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>Contact Us</h2>
          <div className={styles.contactContent}>
            <div className={styles.contactInfo}>
              <h3 className={styles.contactInfoTitle}>Company Information</h3>
              <div className={styles.contactDetails}>
                <div className={styles.contactItem}>
                  <strong>GLG Capital Consulting LLC</strong>
                </div>
                <div className={styles.contactItem}>
                  <strong>Address:</strong><br />
                  1309 Coffeen Avenue, STE 1200<br />
                  Sheridan, Wyoming 82801<br />
                  United States
                </div>
                <div className={styles.contactItem}>
                  <strong>Website:</strong><br />
                  <a href="https://www.glgcapitalgroupllc.com" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                    www.glgcapitalgroupllc.com
                  </a>
                </div>
              </div>
            </div>
            <div className={styles.contactForm}>
              <h3 className={styles.contactFormTitle}>Send a Message</h3>
              <form className={styles.form}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.formLabel}>Full Name</label>
                  <input type="text" id="name" name="name" className={styles.formInput} required />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.formLabel}>Email</label>
                  <input type="email" id="email" name="email" className={styles.formInput} required />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="subject" className={styles.formLabel}>Subject</label>
                  <input type="text" id="subject" name="subject" className={styles.formInput} required />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.formLabel}>Message</label>
                  <textarea id="message" name="message" rows="5" className={styles.formTextarea} required></textarea>
                </div>
                <button type="submit" className={styles.formButton}>Send Message</button>
              </form>
            </div>
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
              <a href="/" className={styles.footerLink}>
                Home
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
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Superadmin credentials
    const superadminEmail = 'admin@glg.com';
    const superadminPassword = 'GLGadmin2024!';

    // Check if it's superadmin login
    if (formData.email === superadminEmail && formData.password === superadminPassword) {
      setTimeout(() => {
        setIsLoading(false);
        // Redirect to dashboard as superadmin
        window.location.href = '/dashboard';
      }, 1000);
      return;
    }

    // Simulate regular login process
    setTimeout(() => {
      setIsLoading(false);
      setError('Credenziali non valide. Prova con admin@glg.com / GLGadmin2024!');
    }, 1000);
  };

  const fillSuperadminCredentials = () => {
    setFormData({
      email: 'admin@glg.com',
      password: 'GLGadmin2024!'
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>GLG Capital Group - Area Riservata</title>
        <meta name="description" content="Accedi all'area riservata GLG Capital Group" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.logoContainer}>
        <img src="/logo-glg.png" alt="GLG Capital Group Logo" className={styles.logo} />
      </div>

      <div style={{
        background: '#ffffff',
        borderRadius: '12px',
        padding: '3rem 2rem',
        maxWidth: '500px',
        width: '100%',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      }}>
        <h1 style={{
          color: '#1e293b',
          fontSize: '2rem',
          textAlign: 'center',
          marginBottom: '0.5rem',
          fontWeight: '700'
        }}>
          Area Riservata
        </h1>
        
        <p style={{
          color: '#64748b',
          textAlign: 'center',
          marginBottom: '2rem',
          fontSize: '1.1rem'
        }}>
          Accedi al tuo account GLG Capital Group
        </p>

        {/* Superadmin Quick Access */}
        <div style={{
          background: '#f1f5f9',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '1.5rem',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          <h3 style={{color: '#1e293b', marginBottom: '1rem', fontSize: '1.1rem'}}>
            🚀 Accesso Rapido Superadmin
          </h3>
          <p style={{color: '#475569', marginBottom: '1rem', fontSize: '0.9rem'}}>
            <strong>Email:</strong> admin@glg.com<br/>
            <strong>Password:</strong> GLGadmin2024!
          </p>
          <button
            onClick={fillSuperadminCredentials}
            style={{
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              padding: '0.8rem 1.5rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: '600',
              transition: 'all 0.2s ease'
            }}
          >
            Compila Automaticamente
          </button>
        </div>

        {error && (
          <div style={{
            background: '#fef2f2',
            color: '#dc2626',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1.5rem',
            border: '1px solid #fecaca'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className={styles.formInput}
              placeholder="La tua email"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Password *
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className={styles.formInput}
              placeholder="La tua password"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={styles.submitButton}
            style={{marginBottom: '1.5rem'}}
          >
            {isLoading ? 'Accesso in corso...' : 'Accedi'}
          </button>
        </form>

        <div style={{textAlign: 'center'}}>
          <Link href="/" style={{
            color: '#3b82f6',
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: '500'
          }}>
            ← Torna alla Homepage
          </Link>
        </div>
      </div>
    </div>
  );
} 
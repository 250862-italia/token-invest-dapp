import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    company: '',
    position: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
    setSuccess('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Le password non coincidono');
      setIsLoading(false);
      return;
    }

    // Validate password strength
    if (formData.password.length < 8) {
      setError('La password deve essere di almeno 8 caratteri');
      setIsLoading(false);
      return;
    }

    // Simulate registration process
    setTimeout(() => {
      setIsLoading(false);
      setSuccess('Registrazione completata! Ti abbiamo inviato una email di conferma.');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        company: '',
        position: ''
      });
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>GLG Capital Group - Registrazione</title>
        <meta name="description" content="Registrati all'area riservata GLG Capital Group" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.logoContainer}>
        <img src="/logo-glg.png" alt="GLG Capital Group Logo" className={styles.logo} />
      </div>

      <div style={{
        background: '#ffffff',
        borderRadius: '12px',
        padding: '3rem 2rem',
        maxWidth: '600px',
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
          Registrazione
        </h1>
        
        <p style={{
          color: '#64748b',
          textAlign: 'center',
          marginBottom: '2rem',
          fontSize: '1.1rem'
        }}>
          Crea il tuo account GLG Capital Group
        </p>

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

        {success && (
          <div style={{
            background: '#d1fae5',
            color: '#065f46',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1.5rem',
            border: '1px solid #a7f3d0'
          }}>
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem'}}>
            <div>
              <label className={styles.formLabel}>
                Nome *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                className={styles.formInput}
                placeholder="Nome"
              />
            </div>
            <div>
              <label className={styles.formLabel}>
                Cognome *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                className={styles.formInput}
                placeholder="Cognome"
              />
            </div>
          </div>

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
              Telefono
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={styles.formInput}
              placeholder="Il tuo numero di telefono"
            />
          </div>

          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem'}}>
            <div>
              <label className={styles.formLabel}>
                Azienda
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className={styles.formInput}
                placeholder="Nome azienda"
              />
            </div>
            <div>
              <label className={styles.formLabel}>
                Posizione
              </label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                className={styles.formInput}
                placeholder="La tua posizione"
              />
            </div>
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
              placeholder="Crea una password sicura"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Conferma Password *
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              className={styles.formInput}
              placeholder="Conferma la password"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={styles.submitButton}
            style={{marginBottom: '1.5rem'}}
          >
            {isLoading ? 'Registrazione in corso...' : 'Registrati'}
          </button>
        </form>

        <div style={{textAlign: 'center'}}>
          <p style={{color: '#64748b', marginBottom: '1rem'}}>
            Hai già un account?
          </p>
          <Link href="/login" style={{
            color: '#3b82f6',
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: '500'
          }}>
            Accedi qui
          </Link>
        </div>

        <div style={{textAlign: 'center', marginTop: '1.5rem'}}>
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
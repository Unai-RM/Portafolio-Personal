import React from 'react';
import styles from '../styles.module.css';
import { getTranslation } from '../../translations';

interface ContactProps {
  locale: 'es' | 'en';
  isMobileDevice: boolean;
  isMapInitialized: boolean;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const Contact: React.FC<ContactProps> = ({
  locale,
  isMobileDevice,
  isMapInitialized,
  handleSubmit,
}) => {
  return (
    <section className={styles.footer} id="contact">
      <div className={styles.footerContent}>
        <h2 className={styles.footerTitle}>{getTranslation('contact.title', locale)}</h2>
        <div className={styles.contactGrid}>
          <div className={styles.contactColumn}>
            <div className={styles.contactDetails}>
              <p>{getTranslation('contact.message', locale)}</p>
              <div className={styles.contactLinks}>
                <div>
                  <a href="https://linkedin.com/in/unairicco" className={styles.contactLink} target="_blank" rel="noopener noreferrer" title="/in/unairicco">
                    <img src="/linkedin.svg" alt="LinkedIn" className={styles.socialIcon} />
                  </a>
                </div>
                <div>
                  <div>
                    <a href="https://wa.me/34639635256" className={styles.contactLink} target="_blank" rel="noopener noreferrer" title="(+34) 639 635 256">
                      <img src="/whatsapp.svg" alt="WhatsApp" className={styles.socialIcon} />
                    </a>
                  </div>
                </div>
              </div>  
              <form className={styles.contactForm} onSubmit={handleSubmit}>
                <input 
                  type="text" 
                  name="name" 
                  placeholder={getTranslation('contact.name', locale)} 
                  className={styles.formInput} 
                  required 
                />
                <input 
                  type="email" 
                  name="email" 
                  placeholder={getTranslation('contact.email', locale)} 
                  className={styles.formInput} 
                  required 
                />
                <textarea 
                  name="message" 
                  placeholder={getTranslation('contact.message', locale)} 
                  className={styles.formInput} 
                  required
                />
                <button type="submit" className={styles.submitButton}>
                  {getTranslation('contact.send', locale)}
                </button>
              </form>
            </div>
          </div>
          {!isMobileDevice && (
            <div className={styles.mapDetails}>
              <p className={styles.locationText}>{getTranslation('contact.location', locale)}</p>
              <div className={styles.mapColumn}>
                <div className={styles.mapContainer} id="map">
                  {!isMapInitialized && (
                    <div className="map-placeholder">Loading map...</div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <p className={styles.copyright}> &copy; Unai Ricco {new Date().getFullYear()}</p>
    </section>
  );
};

export default Contact;

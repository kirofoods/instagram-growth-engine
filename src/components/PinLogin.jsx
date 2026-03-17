import React, { useState, useRef } from 'react';
import { Lock } from 'lucide-react';

const PinLogin = ({ onSuccess }) => {
  const [pin, setPin] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [shaking, setShaking] = useState(false);
  const inputRefs = useRef([]);

  const CORRECT_PIN = '1793';

  const handleInputChange = (index, value) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value.slice(-1); // Keep only the last character
    setPin(newPin);
    setError('');

    // Auto-advance to next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-validate when all digits are entered
    if (newPin[3] !== '' && newPin.every(digit => digit !== '')) {
      const enteredPin = newPin.join('');
      if (enteredPin === CORRECT_PIN) {
        onSuccess();
      } else {
        triggerShakeAnimation();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && pin[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const triggerShakeAnimation = () => {
    setShaking(true);
    setError('Invalid PIN');
    setPin(['', '', '', '']);
    setTimeout(() => setShaking(false), 500);
  };

  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: '#0a0a0a',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
      margin: 0,
      padding: '20px',
    },
    card: {
      background: 'rgba(20, 20, 20, 0.95)',
      borderRadius: '20px',
      padding: '60px 40px',
      maxWidth: '500px',
      width: '100%',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      position: 'relative',
      overflow: 'hidden',
    },
    gradientBorder: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '2px',
      background: 'linear-gradient(90deg, #E1306C, #833AB4, #E1306C)',
      boxShadow: '0 0 20px rgba(225, 48, 108, 0.5)',
    },
    content: {
      position: 'relative',
      zIndex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    logo: {
      width: '80px',
      height: '80px',
      borderRadius: '16px',
      background: 'linear-gradient(135deg, #E1306C, #833AB4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '36px',
      fontWeight: '900',
      color: 'white',
      marginBottom: '24px',
      boxShadow: '0 8px 24px rgba(225, 48, 108, 0.3)',
      letterSpacing: '-1px',
    },
    appName: {
      fontSize: '32px',
      fontWeight: '800',
      background: 'linear-gradient(135deg, #E1306C, #833AB4)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '8px',
      letterSpacing: '1px',
    },
    subtitle: {
      fontSize: '14px',
      color: '#999',
      marginBottom: '40px',
      fontWeight: '500',
      letterSpacing: '0.5px',
    },
    lockIconContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '30px',
    },
    lockIcon: {
      width: '48px',
      height: '48px',
      color: '#E1306C',
      opacity: 0.8,
    },
    pinInputContainer: {
      display: 'flex',
      gap: '16px',
      justifyContent: 'center',
      marginBottom: '24px',
      animation: shaking ? 'shake 0.5s ease-in-out' : 'none',
    },
    pinInput: {
      width: '60px',
      height: '60px',
      fontSize: '32px',
      fontWeight: 'bold',
      textAlign: 'center',
      border: '2px solid rgba(225, 48, 108, 0.3)',
      borderRadius: '12px',
      background: 'rgba(255, 255, 255, 0.05)',
      color: '#fff',
      transition: 'all 0.3s ease',
      outline: 'none',
      cursor: 'text',
    },
    pinInputFocus: {
      borderColor: '#E1306C',
      background: 'rgba(225, 48, 108, 0.1)',
      boxShadow: '0 0 12px rgba(225, 48, 108, 0.3)',
    },
    errorMessage: {
      fontSize: '14px',
      color: '#ff4757',
      textAlign: 'center',
      minHeight: '20px',
      fontWeight: '500',
      letterSpacing: '0.5px',
    },
  };

  return (
    <>
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
      `}</style>
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.gradientBorder}></div>
          <div style={styles.content}>
            <div style={styles.logo}>KG</div>
            <h1 style={styles.appName}>KiroGram</h1>
            <p style={styles.subtitle}>Your Instagram Growth Platform</p>

            <div style={styles.lockIconContainer}>
              <Lock style={styles.lockIcon} />
            </div>

            <div style={{ ...styles.pinInputContainer, animation: shaking ? 'shake 0.5s ease-in-out' : 'none' }}>
              {pin.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onFocus={(e) => e.target.style.borderColor = '#E1306C'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(225, 48, 108, 0.3)'}
                  style={{
                    ...styles.pinInput,
                  }}
                  placeholder="•"
                  autoComplete="off"
                />
              ))}
            </div>

            <div style={styles.errorMessage}>{error}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PinLogin;

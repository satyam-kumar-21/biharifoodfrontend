import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useSendOtpMutation, useVerifyOtpMutation } from '../slices/usersApiSlice';

const THEME = {
  primary: '#e05c1b',
  primaryLight: '#fff7f0',
  primaryGradient: 'linear-gradient(135deg, #e05c1b 0%, #ff8c42 100%)',
  bg: '#fcfaf8',
  text: '#1a1a1a',
  textLight: '#666666',
  border: '#eee3d8',
  white: '#ffffff',
  shadow: '0 10px 40px rgba(224, 92, 27, 0.08)',
};

const S = {
  container: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: THEME.bg, padding: '20px', fontFamily: "'Inter', system-ui, sans-serif" },
  card: { background: THEME.white, padding: '48px 40px', borderRadius: '32px', boxShadow: THEME.shadow, width: '100%', maxWidth: '440px', position: 'relative', overflow: 'hidden', border: '1px solid rgba(224, 92, 27, 0.05)' },
  header: { textAlign: 'center', marginBottom: '40px' },
  logo: { width: '72px', height: '72px', background: THEME.primaryLight, borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', margin: '0 auto 20px', color: THEME.primary },
  title: { fontSize: '28px', fontWeight: '800', color: THEME.text, marginBottom: '8px', letterSpacing: '-0.5px' },
  subtitle: { fontSize: '15px', color: THEME.textLight, lineHeight: '1.5' },
  formGroup: { marginBottom: '20px' },
  label: { display: 'block', fontSize: '14px', fontWeight: '600', color: '#444', marginBottom: '10px', marginLeft: '4px' },
  input: { width: '100%', padding: '16px 20px', borderRadius: '16px', border: `2px solid ${THEME.border}`, fontSize: '16px', color: THEME.text, background: '#fafafa', transition: 'all 0.2s', outline: 'none', boxSizing: 'border-box' },
  button: (disabled) => ({ width: '100%', padding: '18px', borderRadius: '18px', border: 'none', background: disabled ? '#e0e0e0' : THEME.primaryGradient, color: THEME.white, fontSize: '16px', fontWeight: '700', cursor: disabled ? 'not-allowed' : 'pointer', transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)', boxShadow: disabled ? 'none' : '0 10px 20px rgba(224, 92, 27, 0.2)', marginTop: '10px' }),
  otpRow: { display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '30px' },
  otpBox: (filled) => ({ width: '52px', height: '64px', textAlign: 'center', fontSize: '24px', fontWeight: '800', borderRadius: '16px', border: `2px solid ${filled ? THEME.primary : THEME.border}`, background: filled ? THEME.primaryLight : '#fff', color: THEME.primary, outline: 'none', transition: 'all 0.2s' }),
  footer: { textAlign: 'center', marginTop: '32px', paddingTop: '24px', borderTop: `1px solid ${THEME.border}`, fontSize: '15px', color: THEME.textLight },
  link: { color: THEME.primary, fontWeight: '700', textDecoration: 'none' },
};

const OtpInput = ({ value, onChange }) => {
  const refs = useRef([]);
  const handleInput = (e, i) => {
    const val = e.target.value.replace(/\D/g, '').slice(-1);
    const newOtp = value.split('');
    newOtp[i] = val;
    onChange(newOtp.join(''));
    if (val && i < 5) refs.current[i + 1]?.focus();
  };
  const handleKeyDown = (e, i) => { if (e.key === 'Backspace' && !value[i] && i > 0) refs.current[i - 1]?.focus(); };
  return (
    <div style={S.otpRow}>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <input key={i} ref={(el) => (refs.current[i] = el)} type="text" inputMode="numeric" style={S.otpBox(!!value[i])} value={value[i] || ''} onChange={(e) => handleInput(e, i)} onKeyDown={(e) => handleKeyDown(e, i)} />
      ))}
    </div>
  );
};

const ForgotPasswordScreen = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [sendOtpApi] = useSendOtpMutation();
  const [verifyOtpApi] = useVerifyOtpMutation();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendOtpApi({ email, purpose: 'forgot-password' }).unwrap();
      setStep(2);
      toast.success('Reset code sent to your email! 📧');
    } catch (err) { toast.error(err?.data?.message || 'Failed to send OTP'); } finally { setLoading(false); }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return toast.error('Passwords do not match');
    if (otp.length !== 6) return toast.error('Enter 6-digit OTP');

    setLoading(true);
    try {
      await verifyOtpApi({ email, otp, password, purpose: 'forgot-password' }).unwrap();
      toast.success('Password reset successfully! 🔐');
      navigate('/login');
    } catch (err) { toast.error(err?.data?.message || 'Invalid OTP or failed to reset'); } finally { setLoading(false); }
  };

  return (
    <div style={S.container}>
      <div style={S.card}>
        <div style={S.header}>
          <div style={S.logo}>🍛</div>
          <h1 style={S.title}>Reset Password</h1>
          <p style={S.subtitle}>{step === 1 ? 'Enter your email to receive a reset code.' : 'Enter the code and your new password.'}</p>
        </div>

        {step === 1 ? (
          <form onSubmit={handleSendOtp}>
            <div style={S.formGroup}>
              <label style={S.label}>Email Address</label>
              <input style={S.input} type="email" placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <button type="submit" style={S.button(loading)} disabled={loading}>{loading ? 'Sending...' : 'Send Reset Code'}</button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword}>
            <div style={S.formGroup}>
              <label style={S.label}>Verification Code</label>
              <OtpInput value={otp} onChange={setOtp} />
            </div>
            <div style={S.formGroup}>
              <label style={S.label}>New Password</label>
              <input style={S.input} type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div style={S.formGroup}>
              <label style={S.label}>Confirm New Password</label>
              <input style={S.input} type="password" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
            <button type="submit" style={S.button(loading)} disabled={loading}>{loading ? 'Resetting...' : 'Reset Password'}</button>
          </form>
        )}

        <div style={S.footer}>
          Remember your password? <Link to="/login" style={S.link}>Login here</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordScreen;

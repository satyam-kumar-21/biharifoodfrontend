import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { useSendOtpMutation, useVerifyOtpMutation, useRegisterMutation } from '../slices/usersApiSlice';
import { useGetSettingsQuery } from '../slices/settingsApiSlice';
import { setCredentials } from '../slices/authSlice';

// ─── Constants & Styles ───────────────────────────────────────────────────────
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

const styleTag = `
  @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  .register-card { animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
  @media (max-width: 480px) {
    .register-card { padding: 30px 20px !important; border-radius: 0 !important; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; }
    .otp-input-box { width: 40px !important; height: 50px !important; font-size: 20px !important; }
    .otp-row { gap: 6px !important; }
  }
`;

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
  phoneInputGroup: { display: 'flex', gap: '12px' },
  countryCode: { padding: '0 16px', borderRadius: '16px', border: `2px solid ${THEME.border}`, background: THEME.primaryLight, display: 'flex', alignItems: 'center', fontWeight: '700', fontSize: '15px', color: THEME.primary },
  button: (disabled) => ({ width: '100%', padding: '18px', borderRadius: '18px', border: 'none', background: disabled ? '#e0e0e0' : THEME.primaryGradient, color: THEME.white, fontSize: '16px', fontWeight: '700', cursor: disabled ? 'not-allowed' : 'pointer', transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)', boxShadow: disabled ? 'none' : '0 10px 20px rgba(224, 92, 27, 0.2)', marginTop: '10px' }),
  otpRow: { display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '30px' },
  otpBox: (filled) => ({ width: '52px', height: '64px', textAlign: 'center', fontSize: '24px', fontWeight: '800', borderRadius: '16px', border: `2px solid ${filled ? THEME.primary : THEME.border}`, background: filled ? THEME.primaryLight : '#fff', color: THEME.primary, outline: 'none', transition: 'all 0.2s' }),
  footer: { textAlign: 'center', marginTop: '32px', paddingTop: '24px', borderTop: `1px solid ${THEME.border}`, fontSize: '15px', color: THEME.textLight },
  link: { color: THEME.primary, fontWeight: '700', textDecoration: 'none' },
};

// ─── OTP Component ────────────────────────────────────────────────────────────
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
    <div style={S.otpRow} className="otp-row">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <input key={i} ref={(el) => (refs.current[i] = el)} type="text" inputMode="numeric" style={S.otpBox(!!value[i])} className="otp-input-box" value={value[i] || ''} onChange={(e) => handleInput(e, i)} onKeyDown={(e) => handleKeyDown(e, i)} />
      ))}
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const RegisterScreen = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const redirect = new URLSearchParams(search).get('redirect') || '/';

  const { data: settings, isLoading: settingsLoading } = useGetSettingsQuery();
  const [sendOtpApi] = useSendOtpMutation();
  const [verifyOtpApi] = useVerifyOtpMutation();
  const [registerApi] = useRegisterMutation();

  const authMode = settings?.authMode || 'mobile_otp';

  useEffect(() => { if (userInfo) navigate(redirect); }, [userInfo, navigate, redirect]);
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const onRegister = async (e) => {
    e.preventDefault();
    if (authMode === 'mobile_otp') {
      if (step === 1) {
        if (!name) return toast.error('Enter name');
        if (phone.length !== 10) return toast.error('Enter valid 10-digit number');
        setLoading(true);
        try {
          await sendOtpApi({ phone: `91${phone}` }).unwrap();
          setStep(2);
          setCountdown(60);
          toast.success('Code sent! 📱');
        } catch (err) { toast.error(err?.data?.message || 'Failed to send OTP'); } finally { setLoading(false); }
      } else {
        if (otp.length !== 6) return toast.error('Enter 6-digit OTP');
        setLoading(true);
        try {
          const res = await verifyOtpApi({ name, phone: `91${phone}`, otp }).unwrap();
          dispatch(setCredentials({ ...res }));
          toast.success('Welcome! 🎉');
          navigate(redirect);
        } catch (err) { toast.error(err?.data?.message || 'Invalid OTP'); } finally { setLoading(false); }
      }
    } else if (authMode === 'email_password_otp') {
      if (step === 1) {
        if (!name || !email || !password) return toast.error('Fill all fields');
        setLoading(true);
        try {
          await sendOtpApi({ email, name }).unwrap();
          setStep(2);
          setCountdown(60);
          toast.success('Verification code sent to email! 📧');
        } catch (err) { toast.error(err?.data?.message || 'Failed to send OTP'); } finally { setLoading(false); }
      } else {
        if (otp.length !== 6) return toast.error('Enter 6-digit OTP');
        setLoading(true);
        try {
          const res = await verifyOtpApi({ name, email, password, otp }).unwrap();
          dispatch(setCredentials({ ...res }));
          toast.success('Account verified! 🎉');
          navigate(redirect);
        } catch (err) { toast.error(err?.data?.message || 'Invalid OTP'); } finally { setLoading(false); }
      }
    } else {
      // mobile_password
      setLoading(true);
      try {
        const res = await registerApi({ name, phone: `91${phone}`, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success('Registration successful! 🎉');
        navigate(redirect);
      } catch (err) { toast.error(err?.data?.message || 'Failed to register'); } finally { setLoading(false); }
    }
  };

  if (settingsLoading) return null;

  return (
    <div style={S.container}>
      <style>{styleTag}</style>
      <div style={S.card} className="register-card">
        <div style={S.header}>
          <div style={S.logo}>🍛</div>
          <h1 style={S.title}>{step === 2 ? 'Verify Code' : 'Join Us'}</h1>
          <p style={S.subtitle}>
            {step === 2 ? `Code sent to ${authMode.includes('email') ? email : phone}` : 'Create an account to start ordering!'}
          </p>
        </div>

        <form onSubmit={onRegister}>
          {step === 1 ? (
            <>
              <div style={S.formGroup}>
                <label style={S.label}>Full Name</label>
                <input style={S.input} type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              {authMode.includes('email') ? (
                <div style={S.formGroup}>
                  <label style={S.label}>Email Address</label>
                  <input style={S.input} type="email" placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
              ) : (
                <div style={S.formGroup}>
                  <label style={S.label}>Mobile Number</label>
                  <div style={S.phoneInputGroup}>
                    <div style={S.countryCode}>+91</div>
                    <input style={S.input} type="tel" placeholder="98765 43210" maxLength={10} value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))} required />
                  </div>
                </div>
              )}
              {authMode.includes('password') && (
                <div style={S.formGroup}>
                  <label style={S.label}>Create Password</label>
                  <input style={S.input} type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
              )}
            </>
          ) : <OtpInput value={otp} onChange={setOtp} />}

          <button type="submit" style={S.button(loading)} disabled={loading}>
            {loading ? 'Processing...' : step === 1 ? (authMode === 'mobile_password' ? 'Create Account' : 'Get Verification Code') : 'Verify & Continue'}
          </button>
          
          {step === 2 && (
            <button type="button" style={{ background:'none', border:'none', color:THEME.primary, width:'100%', marginTop:'20px', fontWeight:'600' }} onClick={() => setStep(1)}>← Back</button>
          )}
        </form>

        <div style={S.footer}>
          Already have an account?{' '}
          <Link to="/login" style={S.link}>Login here</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;

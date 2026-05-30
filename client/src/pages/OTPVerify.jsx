import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function OTPVerify() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(30);
  const inputRefs = useRef([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { verifyOTP, sendOTP } = useAuth();

  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate('/login');
    }
  }, [email, navigate]);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleChange = (index, value) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }

    if (!/^\d*$/.test(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pastedData) {
      const newOtp = pastedData.split('').concat(Array(6).fill('')).slice(0, 6);
      setOtp(newOtp);
      inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join('');

    if (otpString.length !== 6) {
      setError('Please enter a valid OTP');
      return;
    }

    setLoading(true);
    try {
      await verifyOTP(email, otpString);
      toast.success('Login successful');
      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'Please enter a valid OTP');
      toast.error(error.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;

    try {
      await sendOTP(email);
      toast.success('OTP resent successfully');
      setResendTimer(30);
    } catch (error) {
      toast.error('Failed to resend OTP');
    }
  };

  return (
    <div className="min-h-screen flex bg-[#f8f9fa]">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex lg:w-[48%] relative p-6">
        <div className="w-full h-full rounded-3xl overflow-hidden relative"
          style={{
            background: 'linear-gradient(135deg, #c5d0e6 0%, #e8d5e0 30%, #f0e0e8 50%, #d8cce8 70%, #b8c8e8 100%)'
          }}
        >
          {/* Abstract 3D Wave Background */}
          <div className="absolute inset-0">
            <svg className="w-full h-full" viewBox="0 0 800 900" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="wave1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#b8c4e8" stopOpacity="0.8"/>
                  <stop offset="50%" stopColor="#d0c8e0" stopOpacity="0.6"/>
                  <stop offset="100%" stopColor="#e8d0e0" stopOpacity="0.4"/>
                </linearGradient>
                <linearGradient id="wave2" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#c8d8f0" stopOpacity="0.7"/>
                  <stop offset="100%" stopColor="#e0d0e8" stopOpacity="0.5"/>
                </linearGradient>
                <linearGradient id="wave3" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f0d8e0" stopOpacity="0.6"/>
                  <stop offset="100%" stopColor="#d0d8f0" stopOpacity="0.4"/>
                </linearGradient>
              </defs>
              <path d="M-50 200 Q200 100 400 250 T850 200 L850 -50 L-50 -50 Z" fill="url(#wave1)"/>
              <path d="M-50 350 Q150 250 350 380 T850 320 L850 200 Q600 280 400 250 T-50 200 Z" fill="url(#wave2)"/>
              <path d="M-50 500 Q200 400 450 520 T850 480 L850 320 Q600 380 350 380 T-50 350 Z" fill="url(#wave3)"/>
              <path d="M-50 650 Q250 550 500 680 T850 640 L850 480 Q600 540 450 520 T-50 500 Z" fill="url(#wave1)" opacity="0.7"/>
              <path d="M-50 800 Q300 700 550 830 T850 800 L850 640 Q600 700 500 680 T-50 650 Z" fill="url(#wave2)" opacity="0.6"/>
              <path d="M-50 950 Q350 850 600 970 T850 940 L850 800 Q600 860 550 830 T-50 800 Z" fill="url(#wave3)" opacity="0.5"/>
            </svg>
          </div>

          {/* Productr Logo */}
          <div className="absolute top-6 left-8 flex items-center gap-2 z-10">
            <span className="text-2xl font-bold text-[#1a1a6c] tracking-tight">Productr</span>
            <div className="w-6 h-6 bg-[#f97316] rounded-full flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
          </div>

          {/* Orange Card with Runner */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[45%]">
            <div className="w-[280px] h-[380px] rounded-[28px] overflow-hidden shadow-2xl relative"
              style={{
                background: 'linear-gradient(180deg, #f97316 0%, #ea580c 40%, #7c2d12 100%)'
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-[200px] h-[260px] opacity-90" viewBox="0 0 200 260" fill="none">
                  <path d="M120 30c8 0 14-6 14-14s-6-14-14-14-14 6-14 14 6 14 14 14zm-8 30l20-10 15 20-25 15-10 30 20 10-5 25-30-15 10-35-15-10 20-25zm35 45l-15 35 25 15 10 40-20 10 10 30 35-15-10-45-25-15 5-30-15 5zm-55 20l-20 25 15 10-10 40 25-10 15 30-35-15 10-45-20-10 20-35z"
                    fill="rgba(0,0,0,0.6)"/>
                </svg>
              </div>
              <div className="absolute bottom-8 left-0 right-0 text-center">
                <p className="text-white font-semibold text-lg leading-tight">
                  Uplist your<br />product to market
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - OTP Form */}
      <div className="w-full lg:w-[52%] flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-[420px]">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2 mb-10">
            <span className="text-2xl font-bold text-[#1a1a6c] tracking-tight">Productr</span>
            <div className="w-6 h-6 bg-[#f97316] rounded-full flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-[26px] font-bold text-[#1a1a6c] mb-10 leading-tight">
            Login to your Productr Account
          </h1>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Enter OTP
              </label>
              <div className="flex gap-3 justify-start">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className={`w-[52px] h-[52px] text-center text-xl font-semibold border rounded-xl bg-white focus:border-[#1a1a6c] focus:ring-1 focus:ring-[#1a1a6c] transition-colors ${
                      error ? 'border-red-400' : 'border-gray-300'
                    }`}
                  />
                ))}
              </div>
              {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1a1a6c] text-white py-3.5 rounded-xl font-semibold text-[15px] hover:bg-[#12125a] transition-colors disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Enter your OTP'}
            </button>
          </form>

          {/* Resend */}
          <div className="mt-6">
            <p className="text-gray-500 text-sm">
              Didnt recive OTP ?{' '}
              <button
                onClick={handleResend}
                disabled={resendTimer > 0}
                className={`font-bold ${
                  resendTimer > 0
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-[#1a1a6c] hover:underline'
                }`}
              >
                {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

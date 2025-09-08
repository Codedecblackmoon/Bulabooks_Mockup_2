import React, {useState} from 'react';
import logo from '../assets/logo2.png'
import Home from './Home'
import { useLanguage } from '../hooks/useLanguage';
import { useProgress } from '../hooks/useProgress';
import { useToast } from '../hooks/useToast';
import '../App.css'


const Login: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const { resetProgress } = useProgress();
  const { showToast} = useToast();

  const handleResetProgress = () => {
    resetProgress();
    showToast('Progress reset successfully', 'success');
  };

  const [currentView, setCurrentView] = useState<'landing' | 'login' | 'home'>('landing');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
    // Redirect to home page
    setCurrentView('home');
  };

  const handleGoogleSignIn = () => {
    console.log('Google Sign In clicked');
    // Redirect to home page
    setCurrentView('home');
  };

  const renderLandingPage = () => (
    <div className="min-h-screen bg-orange-600 from-orange-500 via-orange-400 to-orange-600 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-45 from-white/10 to-white/5"></div>
      
      <div className="text-center mb-10 z-10">
        {/* Logo */}
        <div className="w-80 h-80 flex items-center justify-center mx-auto mb-0  relative">
          <img className='m-0' src={logo} alt="" />
        </div>

        <p className="text-white text-lg font-medium tracking-widest uppercase opacity-95">READ. PLAY. SPEAK. GROW</p>
      </div>
      
      {/* Buttons */}
      <div className="flex gap-5 z-10">
        <button 
          className="px-8 py-2 text-lg  font-semibold bg-black/100 text-white rounded-lg hover:bg-black/90 hover:-translate-y-0.5 transition-all duration-300 shadow-lg  min-w-[120px]"
          onClick={() => setCurrentView('login')}>
          Log in
        </button>
        <button className="px-8 py-4 text-lg font-semibold bg-white/20 text-white border-2 border-white/30 rounded-lg hover:bg-white/30 hover:-translate-y-0.5 transition-all duration-300 shadow-lg backdrop-blur-sm min-w-[120px]">
          Sign up
        </button>
      </div>
    </div>
  );

  const renderLoginPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-orange-400 to-orange-600 flex items-center justify-center relative overflow-hidden p-4">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-45 from-white/10 to-white/5"></div>
      
      {/* Back button */}
      <button 
        className="absolute top-8 left-8 bg-white/20 text-white px-5 py-3 rounded-lg hover:bg-white/30 transition-all duration-300 backdrop-blur-sm text-sm"
        onClick={() => setCurrentView('landing')}
      >
        ← Back
      </button>
      
      {/* Login form */}
      <div className="bg-white/15 backdrop-blur-xl rounded-3xl p-10 w-full max-w-md shadow-2xl border border-white/20 z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-white text-3xl font-bold mb-2">Login to your Account</h2>
          <p className="text-white/90 text-base">Welcome back, please enter your details</p>
        </div>

        {/* User type */}
        <div className="flex items-center justify-center mb-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-3">
              <svg className="w-8 h-8 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
            <p className="text-white font-semibold">Learner</p>
          </div>
        </div>

        {/* Google sign in */}
        <button 
          className="w-full bg-black/80 text-white py-4 rounded-lg font-semibold text-base hover:bg-black/90 hover:-translate-y-0.5 transition-all duration-300 mb-5 backdrop-blur-sm"
          onClick={handleGoogleSignIn}
        >
          Sign In with Google
        </button>

        {/* Divider */}
        <div className="relative text-center mb-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/30"></div>
          </div>
          <div className="relative bg-white/10 backdrop-blur-sm inline-block px-5 text-white/80 text-sm">
            or
          </div>
        </div>

        {/* Form inputs */}
        <div className="space-y-4">
          <input
            type="email"
            name="email"
            className="w-full px-4 py-4 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:bg-white/25 focus:border-white/50 focus:ring-0 backdrop-blur-sm transition-all duration-300"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          
          <input
            type="password"
            name="password"
            className="w-full px-4 py-4 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:bg-white/25 focus:border-white/50 focus:ring-0 backdrop-blur-sm transition-all duration-300"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Form options */}
        <div className="flex justify-between items-center my-5 text-sm">
          <label className="flex items-center gap-2 text-white/90 cursor-pointer">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleInputChange}
              className="w-4 h-4 accent-white"
            />
            Remember me
          </label>
          <span 
            className="text-white/90 hover:text-white cursor-pointer transition-colors duration-300"
            onClick={() => console.log('Forgot password clicked')}
          >
            Forgot my password
          </span>
        </div>

        {/* Login button */}
        <button 
          onClick={handleLogin}
          className="w-full bg-black/80 text-white py-4 rounded-lg font-semibold text-base hover:bg-black/90 hover:-translate-y-0.5 transition-all duration-300 mb-5 backdrop-blur-sm"
        >
          Log In
        </button>

        {/* Sign up link */}
        <p className="text-center text-white/90 text-sm">
          Don't have an account?{' '}
          <span 
            className="text-white font-semibold underline cursor-pointer hover:no-underline transition-all duration-300"
            onClick={() => console.log('Sign up clicked')}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );

  // const renderHomePage = () => (
  //   <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center relative overflow-hidden">
  //     {/* Background overlay */}
  //     <div className="absolute inset-0 bg-gradient-to-45 from-white/10 to-white/5"></div>
      
  //     <div className="text-center z-10">
  //       <div className="bg-white/15 backdrop-blur-xl rounded-3xl p-16 shadow-2xl border border-white/20">
  //         <h1 className="text-white text-6xl font-bold mb-4 drop-shadow-sm">Welcome!</h1>
  //         <p className="text-white/90 text-xl mb-8">You have successfully logged into BulaBooks</p>
          
  //         <div className="space-y-4">
  //           <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30">
  //             <h3 className="text-white text-2xl font-semibold mb-2">📚 My Library</h3>
  //             <p className="text-white/80">Access your reading collection</p>
  //           </div>
            
  //           <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30">
  //             <h3 className="text-white text-2xl font-semibold mb-2">🎮 Learning Games</h3>
  //             <p className="text-white/80">Play interactive educational games</p>
  //           </div>
            
  //           <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30">
  //             <h3 className="text-white text-2xl font-semibold mb-2">🗣️ Speaking Practice</h3>
  //             <p className="text-white/80">Improve your pronunciation skills</p>
  //           </div>
  //         </div>
          
  //         <button 
  //           className="mt-8 px-8 py-3 bg-white/20 text-white border-2 border-white/30 rounded-lg hover:bg-white/30 transition-all duration-300 backdrop-blur-sm"
  //           onClick={() => setCurrentView('landing')}
  //         >
  //           Back to Landing
  //         </button>
  //       </div>
  //     </div>
    // </div>
  // );

  return (
    <div>
      {currentView === 'landing' && renderLandingPage()}
      {currentView === 'login' && renderLoginPage()}
      {currentView === 'home' && <Home
        language={language}
        onLanguageChange={setLanguage}
        onResetProgress={handleResetProgress}
      />}
    </div>
  );
};

export default Login;
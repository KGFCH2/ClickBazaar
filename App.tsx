import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import ReactDOM from 'react-dom';
import { 
  ShoppingCart, 
  User as UserIcon, 
  Search, 
  Package, 
  LayoutDashboard, 
  LogOut, 
  ChevronRight,
  TrendingUp,
  Box,
  Users,
  CreditCard,
  Plus, 
  Trash2,
  X,
  Menu,
  CheckCircle,
  Truck,
  Eye,
  Sparkles,
  Check,
  Bell,
  AlertTriangle,
  Filter,
  Phone,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Gift,
  Zap,
  Tag,
  Heart,
  ShieldCheck,
  Headphones,
  Award,
  Star,
  Quote,
  ArrowRight,
  ArrowLeft,
  Settings,
  MapPin,
  Clock,
  Download,
  Printer,
  Calendar,
  ShoppingBag,
  Smartphone,
  Watch,
  Gamepad2,
  Shirt,
  CreditCard as PaymentIcon,
  FileText,
  Shield,
  Infinity,
  Gem,
  Coffee,
  LifeBuoy,
  BarChart3,
  ExternalLink,
  History,
  Activity,
  Timer,
  UserPlus,
  LogIn,
  Radar,
  Info,
  Scale,
  Lock,
  Mail,
  Percent,
  MessageSquare
} from 'lucide-react';
import { 
  Category, 
  Product, 
  User, 
  UserRole, 
  AppState, 
  CartItem, 
  Order, 
  OrderStatus,
  LoginSession
} from './types';
import { INITIAL_PRODUCTS, INITIAL_USERS } from './constants';
import { getProductDescription } from './services/geminiService';

// --- UI Utility Components ---

export const SiteLoader = ({ message = "Click Bazaar" }: { message?: string }) => {
  const content = (
    <div className="fixed inset-0 z-[99999] bg-[#ffffff] flex flex-col items-center justify-center overflow-hidden">
      <style>{`
      .loader-container { position: relative; width: 200px; height: 240px; display: flex; flex-direction: column; align-items: center; justify-content: center; animation: loader-fade-in 0.6s ease-out; }
      @keyframes loader-fade-in { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
      .basket-wrapper { position: relative; margin-top: 60px; animation: basket-bounce 2s ease-in-out infinite; z-index: 10; }
      .basket-shadow { position: absolute; bottom: -20px; left: 50%; transform: translateX(-50%); width: 60px; height: 10px; background: rgba(0,0,0,0.05); border-radius: 50%; filter: blur(4px); animation: shadow-scale 2s ease-in-out infinite; }
      .falling-item { position: absolute; top: -120px; opacity: 0; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1)); animation: item-fall-dynamic 2.5s cubic-bezier(0.4,0,0.2,1) infinite; }
      .f-1 { animation-delay: 0s; color: #6366f1; } .f-2 { animation-delay: 0.6s; color: #ec4899; } .f-3 { animation-delay: 1.2s; color: #10b981; } .f-4 { animation-delay: 1.8s; color: #f59e0b; }
      @keyframes basket-bounce { 0%,100% { transform: translateY(0) scale(1,1);} 45% { transform: translateY(-15px) scale(0.9,1.1);} 50% { transform: translateY(0) scale(1.1,0.9);} 55% { transform: translateY(5px) scale(1.05,0.95);} }
      @keyframes shadow-scale { 0%,100% { transform: translateX(-50%) scale(1); opacity: 0.1; } 50% { transform: translateX(-50%) scale(1.4); opacity: 0.05; } }
      @keyframes item-fall-dynamic { 0% { transform: translateY(0) rotate(-20deg) scale(0.5); opacity: 0; filter: blur(8px);} 15% { opacity: 1; filter: blur(0);} 50% { transform: translateY(180px) rotate(380deg) scale(1.3); opacity: 1;} 70% { transform: translateY(200px) rotate(400deg) scale(0); opacity: 0;} 100% { transform: translateY(200px) scale(0); opacity: 0; } }
      .impact-ring { position: absolute; bottom: 15px; width: 120px; height: 50px; border: 2px solid rgba(99,102,241,0.3); border-radius: 50%; opacity: 0; animation: ripple-dynamic 2.5s ease-out infinite; }
      @keyframes ripple-dynamic { 0%,45% { transform: scale(0.3); opacity: 0; } 55% { transform: scale(0.8); opacity: 0.8; } 100% { transform: scale(1.8); opacity: 0; }}
      .loader-bg-pulse { position: absolute; inset: 0; background: radial-gradient(circle at center, rgba(99,102,241,0.03) 0%, transparent 70%); animation: bg-pulse 4s ease-in-out infinite; }
      @keyframes bg-pulse { 0%,100% { opacity: 0.5; transform: scale(1);} 50% { opacity: 1; transform: scale(1.2);} }
      .branding-text { margin-top: 60px; text-align: center; font-family: 'Roca One', serif; }
      .branding-text h2 { font-size: 1.75rem; font-weight: 800; color: #1e293b; margin-bottom: 8px; background: linear-gradient(135deg,#4f46e5 0%,#ec4899 50%,#4f46e5 100%); background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; animation: shine-text 3s linear infinite; }
      @keyframes shine-text { to { background-position: 200% center; }} .branding-text p { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.4em; color: #94a3b8; font-weight: 700; animation: pulse-op 2s ease-in-out infinite; } @keyframes pulse-op { 0%,100% { opacity: 0.6; } 50% { opacity: 1; } }
      `}</style>

      <div className="loader-bg-pulse"></div>

      <div className="loader-container">
        <div className="falling-item f-1"><Smartphone size={28} /></div>
        <div className="falling-item f-2"><Watch size={28} /></div>
        <div className="falling-item f-3"><Gamepad2 size={28} /></div>
        <div className="falling-item f-4"><Shirt size={28} /></div>

        <div className="basket-wrapper">
          <div className="p-7 bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-50 relative overflow-hidden backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/40 via-transparent to-pink-50/20 pointer-events-none"></div>
            <ShoppingBag size={64} className="text-indigo-600 relative z-10" strokeWidth={1.2} />
          </div>
          <div className="impact-ring"></div>
        </div>

        <div className="basket-shadow"></div>
      </div>

      <div className="branding-text">
        <h2 className="animate-pulse">{message}</h2>
        <p>Curating Your Experience</p>
      </div>
    </div>
  );

  if (typeof document === 'undefined') return content;
  return ReactDOM.createPortal(content, document.body);
};

export const CartLoader = () => {
  const el = (
    <div className="fixed inset-0 z-[99998] bg-white/80 backdrop-blur-xl flex items-center justify-center">
      <div className="w-16 h-16 border-[6px] border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
    </div>
  );
  if (typeof document === 'undefined') return el;
  return ReactDOM.createPortal(el, document.body);
};

const Badge: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color = "bg-blue-600" }) => (
  <span className={`${color} text-white text-[9px] md:text-[10px] font-black uppercase tracking-widest px-2 md:px-3 py-1 rounded-full shadow-sm whitespace-nowrap inline-flex items-center justify-center`}>
    {children}
  </span>
);

const useScrollReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('heading-visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
};

const SectionHeader: React.FC<{ title: React.ReactNode; subtitle: string; centered?: boolean }> = ({ title, subtitle, centered }) => {
  const revealRef = useScrollReveal();
  return (
  <div ref={revealRef} className={`${centered ? 'text-center' : 'text-left'} mb-8 md:mb-12 px-2 heading-animate`}>
    <h4 className="text-blue-600 font-black uppercase text-[10px] md:text-[11px] tracking-[0.3em] mb-3 md:mb-4 heading-subtitle">{subtitle}</h4>
    <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1] md:leading-[0.9] bg-gradient-to-br from-slate-950 via-slate-800 to-blue-700 bg-clip-text text-transparent heading-gradient-text">
      {title}
    </h2>
  </div>
  );
};

const ScrollReveal: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  const ref = useScrollReveal();
  return <div ref={ref} className={`heading-animate ${className}`}>{children}</div>;
};

const ScrollRevealSmall: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  const ref = useScrollReveal();
  return <div ref={ref} className={`sub-heading-reveal ${className}`}>{children}</div>;
};

const ScrollRevealFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  const ref = useScrollReveal();
  return <div ref={ref} className={`footer-heading-reveal ${className}`}>{children}</div>;
};

// --- Hero Slider Component ---

const HERO_IMAGES = [
  "/images/hero1.jpg",
  "/images/hero2.jpg",
  "/images/hero3.jpg",
  "/images/hero4.png",
];

const HeroSlider: React.FC<{ onExplore: () => void }> = ({ onExplore }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden bg-slate-950">
      {HERO_IMAGES.map((img, idx) => (
        <div
          key={img}
          className={`absolute inset-0 transition-all duration-[2000ms] ease-in-out transform ${
            idx === currentIndex ? 'opacity-40 scale-105' : 'opacity-0 scale-100'
          }`}
        >
          <img src={img} className="w-full h-full object-cover" alt="" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
        </div>
      ))}

      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center items-start">
        <div className="max-w-3xl animate-fadeIn">
          <Badge color="bg-blue-600">Premium Curations 2026</Badge>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[1] md:leading-[0.9] mt-6 md:mt-8 mb-8 md:mb-10 bg-gradient-to-br from-white via-slate-100 to-blue-400 bg-clip-text text-transparent heading-gradient-text" style={{backgroundSize: '200% 200%', animation: 'headingGradientShift 6s ease-in-out infinite'}}>
            <span className="block">Elevate Your <br /><span className="italic">Lifestyle.</span></span>
          </h1>
          <p className="text-slate-300 text-base md:text-xl font-medium mb-10 md:mb-12 max-w-lg leading-relaxed">
            Discover a hand-picked collection of world-class essentials designed for those who settle for nothing but the best.
          </p>
          <div className="flex gap-4">
            <button 
              onClick={onExplore}
              className="bg-white text-slate-950 px-8 md:px-10 py-4 md:py-5 rounded-full font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all transform active:scale-95 shadow-2xl flex items-center gap-3 group"
            >
              Shop Collection <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="flex gap-3 mt-10 md:mt-12">
            {HERO_IMAGES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1 transition-all duration-500 rounded-full ${
                  idx === currentIndex ? 'w-8 md:w-12 bg-blue-600' : 'w-3 md:w-4 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Application Logic ---

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loginSessions, setLoginSessions] = useState<LoginSession[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [search, setSearch] = useState('');
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const [isAdminMobileOpen, setIsAdminMobileOpen] = useState(false);

  const bestSellersRef = useRef<HTMLDivElement>(null);
  const newArrivalsRef = useRef<HTMLDivElement>(null);

  // Initial Load Animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  // Persistence Logic
  useEffect(() => {
    const data = localStorage.getItem('cb_state_final_v1');
    if (data) {
      const parsed = JSON.parse(data);
      if (parsed.users) {
        const currentUsers = [...parsed.users];
        if (!currentUsers.find(u => u.email === INITIAL_USERS[0].email)) {
          currentUsers.push(INITIAL_USERS[0]);
        }
        setUsers(currentUsers);
      }
      if (parsed.orders) setOrders(parsed.orders);
      if (parsed.loginSessions) setLoginSessions(parsed.loginSessions);
      if (parsed.wishlist) setWishlist(parsed.wishlist);
    } else {
      setUsers(INITIAL_USERS);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cb_state_final_v1', JSON.stringify({ users, orders, loginSessions, wishlist }));
  }, [users, orders, loginSessions, wishlist]);

  const handleNavigate = useCallback((p: string, category: Category | 'All' = 'All') => {
    setSelectedCategory(category);
    setCurrentPage(p);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSignup = (name: string, email: string, pass: string) => {
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      showToast("Identity already exists in archive.");
      return;
    }
    const newUser: User = {
      id: `USR-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      name,
      email: email.toLowerCase(),
      role: email.includes('admin@clickbazaar') ? UserRole.Admin : UserRole.Customer,
      createdAt: new Date().toISOString()
    };
    setUsers(prev => [...prev, newUser]);
    showToast("Registration successful. Proceed to Login.");
    setCurrentPage('login');
  };

  const handleLogin = (email: string, pass: string) => {
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      setCurrentUser(user);
      const session: LoginSession = {
        id: `SES-${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        timestamp: new Date().toISOString()
      };
      setLoginSessions(prev => [session, ...prev]);
      showToast(`Authenticated as ${user.name}`);
      
      if (user.role === UserRole.Admin) {
        setCurrentPage('admin-dashboard');
      } else {
        setCurrentPage('home');
      }
    } else {
      showToast("Invalid credentials.");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('home');
    showToast("Session terminated.");
  };

  const addToCart = (id: string) => {
    setIsProcessing(true);
    setTimeout(() => {
      setCart(prev => {
        const exists = prev.find(i => i.productId === id);
        if (exists) return prev.map(i => i.productId === id ? { ...i, quantity: i.quantity + 1 } : i);
        return [...prev, { productId: id, quantity: 1 }];
      });
      setIsProcessing(false);
      showToast("Added to bag");
    }, 800);
  };

  const completeOrder = (shipping: any) => {
    if (!currentUser) {
        showToast("Please login to complete purchase.");
        setCurrentPage('login');
        return;
    }
    
    setIsProcessing(true);
    setTimeout(() => {
      const items = cart.map(c => {
        const p = products.find(prod => prod.id === c.productId)!;
        return { ...c, priceAtPurchase: p.price, name: p.name };
      });
      const total = items.reduce((a, b) => a + (b.priceAtPurchase * b.quantity), 0);
      const order: Order = {
        id: `CB-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
        userId: currentUser.id,
        items,
        total,
        status: OrderStatus.Placed,
        shippingAddress: shipping,
        createdAt: new Date().toISOString()
      };
      setOrders(prev => [order, ...prev]);
      setLastOrder(order);
      setCart([]);
      setIsProcessing(false);
      setCurrentPage('order-success');
    }, 2000);
  };

  if (currentPage === 'admin-dashboard') {
    return (
      <>
        {loading && <SiteLoader />}
        {isProcessing && <CartLoader />}
        <AdminDashboard 
          users={users} 
          orders={orders} 
          sessions={loginSessions} 
          products={products}
          onLogout={handleLogout} 
          onNavigate={handleNavigate} 
          isMobileOpen={isAdminMobileOpen}
          setIsMobileOpen={setIsAdminMobileOpen}
        />
      </>
    );
  }

  return (
    <>
      {loading && <SiteLoader />}
      {isProcessing && <CartLoader />}
      <div className="min-h-screen flex flex-col selection:bg-blue-600 selection:text-white bg-[#fafafa]">
      <div className="bg-slate-950 text-white py-2 overflow-hidden whitespace-nowrap border-b border-slate-900 no-print">
        <div className="flex animate-ticker gap-12 md:gap-16 font-black text-[8px] md:text-[9px] uppercase tracking-[0.2em] px-4">
          <span>Complimentary International Shipping on Orders Over ₹5,000</span>
          <span>New Limited Drop: The Midnight Collection</span>
          <span>Elite Member Access Now Open</span>
          <span>Complimentary International Shipping on Orders Over ₹5,000</span>
        </div>
      </div>

      <nav className="sticky top-0 z-50 glass border-b border-slate-100 no-print">
        <div className="max-w-7xl mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-4 md:gap-6">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavigate('home')}>
              <div className="bg-slate-950 p-1 md:p-1.5 rounded-lg"><ShoppingCart className="w-4 h-4 md:w-5 md:h-5 text-white" /></div>
              <span className="text-lg md:text-xl font-black tracking-tighter text-slate-950 uppercase">Click Bazaar</span>
            </div>
          </div>

          <div className="hidden lg:flex flex-1 max-w-md mx-8">
             <div className="relative w-full group">
               <input 
                 type="text" placeholder="Search curated catalog..." value={search} onChange={e => setSearch(e.target.value)}
                 className="w-full bg-slate-100 border-none rounded-full px-6 py-2.5 pr-12 focus:ring-2 focus:ring-blue-600 outline-none font-bold text-slate-900 transition-all text-sm"
               />
               <Search className="absolute right-5 top-2.5 w-4 h-4 text-slate-400" />
             </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button 
              onClick={() => handleNavigate('tracking')} 
              className="relative p-2 md:p-2.5 hover:bg-slate-50 rounded-full transition-all text-slate-500 group"
              title="Live Tracking"
            >
              <Truck className="w-5 h-5" />
              {orders.filter(o => o.userId === currentUser?.id).length > 0 && (
                <span className="absolute top-1 right-1 bg-blue-600 text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                  !
                </span>
              )}
            </button>

            <button onClick={() => handleNavigate('wishlist')} className="relative p-2 md:p-2.5 hover:bg-slate-50 rounded-full transition-all text-slate-500">
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && <span className="absolute top-1 right-1 bg-rose-500 text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">{wishlist.length}</span>}
            </button>
            
            <button onClick={() => handleNavigate('cart')} className="relative p-2 md:p-2.5 hover:bg-slate-50 rounded-full transition-all text-slate-500">
              <ShoppingCart className="w-5 h-5" />
              {cart.length > 0 && <span className="absolute top-1 right-1 bg-blue-600 text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">{cart.length}</span>}
            </button>
            
            <div className="h-6 w-px bg-slate-200 mx-1 md:mx-2"></div>
            
            {currentUser ? (
              <div className="relative group">
                <button className="flex items-center gap-2 md:gap-3 pl-2 pr-1 py-1 rounded-full hover:bg-slate-50 transition-all">
                  <span className="hidden lg:block text-[11px] font-black uppercase tracking-widest text-slate-600">{currentUser.name.split(' ')[0]}</span>
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-slate-950 flex items-center justify-center text-white text-[10px] md:text-xs font-black uppercase">{currentUser.name[0]}</div>
                </button>
                <div className="group-hover-visible absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-[70]">
                  {currentUser.role === UserRole.Admin ? (
                    <button onClick={() => setCurrentPage('admin-dashboard')} className="w-full text-left px-4 py-2 hover:bg-slate-50 rounded-lg text-xs font-bold flex items-center gap-3"><LayoutDashboard className="w-4 h-4" /> Control Panel</button>
                  ) : (
                    <>
                      <button onClick={() => handleNavigate('profile')} className="w-full text-left px-4 py-2 hover:bg-slate-50 rounded-lg text-xs font-bold flex items-center gap-3"><UserIcon className="w-4 h-4" /> Profile</button>
                      <button onClick={() => handleNavigate('orders')} className="w-full text-left px-4 py-2 hover:bg-slate-50 rounded-lg text-xs font-bold flex items-center gap-3"><Package className="w-4 h-4" /> My Orders</button>
                    </>
                  )}
                  <div className="h-px bg-slate-100 my-1 mx-2"></div>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-slate-50 rounded-lg text-xs font-bold flex items-center gap-3 text-rose-500"><LogOut className="w-4 h-4" /> Logout</button>
                </div>
              </div>
            ) : (
              <div className="flex gap-1 md:gap-2">
                <button onClick={() => setCurrentPage('login')} className="bg-slate-100 text-slate-950 px-3 md:px-6 py-2 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all">In</button>
                <button onClick={() => setCurrentPage('signup')} className="bg-slate-950 text-white px-3 md:px-6 py-2 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl">Up</button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {currentPage === 'home' && (
          <div className="animate-fadeIn">
            <HeroSlider onExplore={() => handleNavigate('shop')} />

            {/* Flash Deals Section */}
            <div className="py-16 md:py-24 bg-white border-b border-slate-100 overflow-hidden relative">
               <div className="absolute top-0 right-0 p-40 bg-rose-500/5 rounded-full blur-[100px]"></div>
               <div className="max-w-7xl mx-auto px-6 relative z-10">
                 <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
                   <ScrollReveal>
                     <Badge color="bg-rose-500">Accelerated Savings</Badge>
                     <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[1] md:leading-[0.9] mt-4 bg-gradient-to-br from-slate-950 via-slate-800 to-blue-700 bg-clip-text text-transparent heading-gradient-text">
                       Flash <span className="italic">Deals.</span>
                     </h2>
                   </ScrollReveal>
                   <div className="flex gap-4">
                      <div className="bg-rose-50 text-rose-600 px-6 md:px-8 py-3 md:py-4 rounded-[20px] md:rounded-[24px] border border-rose-100 font-black text-xs md:text-sm uppercase tracking-widest flex items-center gap-3 shadow-sm">
                        <Zap className="w-4 h-4 md:w-5 md:h-5 fill-current animate-pulse" /> 
                        <div className="flex gap-2 md:gap-3 items-center">
                           <div className="flex flex-col items-center"><span>04</span><span className="text-[7px] md:text-[8px] opacity-60">Hrs</span></div>
                           <span className="opacity-40">:</span>
                           <div className="flex flex-col items-center"><span>22</span><span className="text-[7px] md:text-[8px] opacity-60">Min</span></div>
                           <span className="opacity-40">:</span>
                           <div className="flex flex-col items-center"><span>15</span><span className="text-[7px] md:text-[8px] opacity-60">Sec</span></div>
                        </div>
                      </div>
                   </div>
                 </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
                    {products.filter(p => p.isLimitedOffer).slice(0, 4).map(p => (
                      <ProductCard key={p.id} product={p} onAdd={() => addToCart(p.id)} onQuick={() => setQuickView(p)} isWish={wishlist.includes(p.id)} onWish={() => {}} />
                    ))}
                 </div>
               </div>
            </div>

            {/* Best Sellers */}
            <div ref={bestSellersRef} className="py-16 md:py-24 max-w-7xl mx-auto px-6">
              <ScrollReveal className="mb-8 md:mb-12 px-2">
                <h4 className="text-blue-600 font-black uppercase text-[10px] md:text-[11px] tracking-[0.3em] mb-3 md:mb-4 heading-subtitle">Most Coveted</h4>
                <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[1] md:leading-[0.9] bg-gradient-to-br from-slate-950 via-slate-800 to-blue-700 bg-clip-text text-transparent heading-gradient-text">
                  <span className="block">Archival <br /><span className="italic">Favorites.</span></span>
                </h2>
              </ScrollReveal>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
                {products.filter(p => p.isBestSeller).slice(0, 8).map(p => (
                  <ProductCard key={p.id} product={p} onAdd={() => addToCart(p.id)} onQuick={() => setQuickView(p)} isWish={wishlist.includes(p.id)} onWish={() => {}} />
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div className="bg-slate-950 py-20 md:py-32 text-white overflow-hidden relative">
               <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>
               <div className="max-w-7xl mx-auto px-6 relative z-10">
                  <ScrollReveal className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
                     <h4 className="text-blue-500 font-black uppercase text-[10px] md:text-xs tracking-[0.4em] mb-4 heading-subtitle">Curator Voice</h4>
                     <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[1] md:leading-[0.9] bg-gradient-to-br from-white via-slate-100 to-blue-400 bg-clip-text text-transparent heading-gradient-text"><span className="block">Verified Archival<br /><span className="italic">Reviews.</span></span></h2>
                  </ScrollReveal>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                     {[
                       { name: "Julian Vance", text: "The Selvedge Denim is unparalleled. Click Bazaar truly understands archival quality and fabric weight.", role: "Fashion Curator", rating: 5 },
                       { name: "Sophia Chen", text: "Exceptional logistics node. My Arctic Humidifier arrived in its perfect state within a mere 24 hours.", role: "Interior Designer", rating: 5 },
                       { name: "Marcus Thorne", text: "The Chrono Series watch is a masterpiece of automated kinetic movement. Highly recommended for enthusiasts.", role: "Timepiece Collector", rating: 4 }
                     ].map((rev, i) => (
                       <div key={i} className="bg-white/5 p-8 md:p-12 rounded-[40px] md:rounded-[60px] border border-white/10 backdrop-blur-xl group hover:bg-white/10 transition-all duration-500">
                          <div className="flex gap-1 mb-6 md:mb-8">
                             {[...Array(rev.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-blue-500 text-blue-500" />)}
                          </div>
                          <Quote className="w-10 h-10 md:w-12 md:h-12 text-blue-500 mb-6 md:mb-8 opacity-30 group-hover:opacity-100 transition-opacity" />
                          <p className="text-lg md:text-xl font-medium leading-relaxed mb-8 md:mb-12 text-slate-300 italic">"{rev.text}"</p>
                          <div className="flex items-center gap-4 md:gap-5">
                             <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl md:rounded-3xl bg-blue-600 flex items-center justify-center font-black text-xs md:text-sm shadow-xl shadow-blue-900/20">{rev.name[0]}</div>
                             <div>
                                <h4 className="font-black text-sm tracking-tight card-heading-animate">{rev.name}</h4>
                                <span className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">{rev.role}</span>
                             </div>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
            
            <div ref={newArrivalsRef} className="bg-white py-16 md:py-24 border-y border-slate-100">
               <div className="max-w-7xl mx-auto px-6">
                 <ScrollReveal className="mb-8 md:mb-12 px-2">
                   <h4 className="text-blue-600 font-black uppercase text-[10px] md:text-[11px] tracking-[0.3em] mb-3 md:mb-4 heading-subtitle">The Latest Archival Drops</h4>
                   <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[1] md:leading-[0.9] bg-gradient-to-br from-slate-950 via-slate-800 to-blue-700 bg-clip-text text-transparent heading-gradient-text">
                     <span className="block">New <br /><span className="italic">Arrivals.</span></span>
                   </h2>
                 </ScrollReveal>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
                    {products.filter(p => p.isNewArrival).map(p => (
                      <ProductCard key={p.id} product={p} onAdd={() => addToCart(p.id)} onQuick={() => setQuickView(p)} isWish={wishlist.includes(p.id)} onWish={() => {}} />
                    ))}
                 </div>
               </div>
            </div>
          </div>
        )}

        {currentPage === 'shop' && (
          <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 animate-fadeIn">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 md:mb-16 gap-8">
               <SectionHeader title={selectedCategory === 'All' ? "The Full Archive" : selectedCategory} subtitle="Catalog" />
               <div className="flex flex-wrap gap-2 md:gap-4 mb-0 lg:mb-14">
                  {['All', ...Object.values(Category)].slice(0, 8).map(cat => (
                    <button 
                      key={cat} 
                      onClick={() => setSelectedCategory(cat as Category | 'All')}
                      className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full font-black text-[9px] md:text-[10px] uppercase tracking-widest transition-all ${selectedCategory === cat ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}
                    >
                      {cat}
                    </button>
                  ))}
               </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
               {products.filter(p => selectedCategory === 'All' || p.category === selectedCategory).map(p => (
                 <ProductCard key={p.id} product={p} onAdd={() => addToCart(p.id)} onQuick={() => setQuickView(p)} isWish={wishlist.includes(p.id)} onWish={() => {}} />
               ))}
            </div>
          </div>
        )}

        {currentPage === 'login' && <AuthView mode="login" onAuth={handleLogin} onToggle={() => setCurrentPage('signup')} />}
        {currentPage === 'signup' && <AuthView mode="signup" onAuth={handleSignup} onToggle={() => setCurrentPage('login')} />}
        {currentPage === 'cart' && <CartPage cart={cart} products={products} onRemove={id => setCart(prev => prev.filter(i => i.productId !== id))} onCheckout={() => setCurrentPage('checkout')} onNavigate={handleNavigate} />}
        {currentPage === 'checkout' && <CheckoutPage cart={cart} products={products} onComplete={completeOrder} onBack={() => setCurrentPage('cart')} />}
        {currentPage === 'order-success' && <OrderSuccessPage order={lastOrder} onNavigate={handleNavigate} />}
        {currentPage === 'profile' && currentUser && <ProfilePage user={currentUser} orders={orders} onNavigate={handleNavigate} />}
        {currentPage === 'orders' && currentUser && <OrdersPage orders={orders.filter(o => o.userId === currentUser.id)} onNavigate={handleNavigate} />}
        {currentPage === 'tracking' && <LiveTrackingView orders={orders.filter(o => o.userId === currentUser?.id)} onNavigate={handleNavigate} />}
        {currentPage === 'support' && <SupportPage onNavigate={handleNavigate} />}
        {currentPage === 'privacy' && <PrivacyPage onNavigate={handleNavigate} />}
        {currentPage === 'terms' && <TermsPage onNavigate={handleNavigate} />}
        {currentPage === 'legal' && <LegalPage onNavigate={handleNavigate} />}
        {currentPage === 'wishlist' && (
          <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 animate-fadeIn">
            <SectionHeader title="Your Wishlist" subtitle="Saved Pieces" />
            {wishlist.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                {products.filter(p => wishlist.includes(p.id)).map(p => (
                  <ProductCard key={p.id} product={p} onAdd={() => addToCart(p.id)} onQuick={() => setQuickView(p)} isWish={true} onWish={() => setWishlist(w => w.filter(id => id !== p.id))} />
                ))}
              </div>
            ) : (
              <div className="py-32 md:py-40 text-center bg-white rounded-[40px] md:rounded-[48px] border-2 border-dashed border-slate-100 flex flex-col items-center px-6">
                <Heart className="w-12 h-12 md:w-16 md:h-16 text-slate-200 mb-6" />
                <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-4 tracking-tighter page-sub-heading-animate">Your wishlist is empty</h3>
                <button onClick={() => handleNavigate('shop')} className="bg-slate-950 text-white px-8 md:px-10 py-3 md:py-4 rounded-full font-black text-[9px] md:text-[10px] uppercase tracking-widest">Explore Collections</button>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer onNavigate={handleNavigate} />

      {quickView && <QuickViewModal product={quickView} onClose={() => setQuickView(null)} onAdd={addToCart} isWish={wishlist.includes(quickView.id)} />}

      {toast && (
        <div className="fixed bottom-6 md:bottom-10 right-6 md:right-10 z-[100] animate-fadeIn">
           <div className="bg-slate-950 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl shadow-2xl flex items-center gap-3 md:gap-4 border border-slate-800">
             <div className="bg-blue-600 p-1 md:p-1.5 rounded-lg"><Check className="w-3 h-3 md:w-4 md:h-4" /></div>
             <span className="font-black text-[8px] md:text-[10px] uppercase tracking-widest">{toast}</span>
           </div>
        </div>
      )}
    </div>
    </>
  );
}

const OrderSuccessPage = ({ order, onNavigate }: { order: Order | null; onNavigate: (p: string) => void }) => {
  if (!order) return null;
  return (
    <div className="max-w-4xl mx-auto px-6 py-24 md:py-40 text-center animate-fadeIn">
      <div className="bg-white p-10 md:p-20 rounded-[50px] md:rounded-[80px] border border-slate-100 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
        <div className="w-20 h-20 md:w-28 md:h-28 bg-green-500 text-white rounded-[30px] md:rounded-[40px] flex items-center justify-center mx-auto mb-10 md:mb-12 shadow-2xl animate-bounce">
          <CheckCircle className="w-10 h-10 md:w-14 md:h-14" />
        </div>
        <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[1] md:leading-[0.9] mb-6 bg-gradient-to-br from-slate-950 via-slate-800 to-blue-700 bg-clip-text text-transparent heading-gradient-text" style={{backgroundSize: '200% 200%', animation: 'headingGradientShift 6s ease-in-out infinite'}}><span className="block">Deployment<br /><span className="italic">Successful.</span></span></h2>
        <p className="text-slate-500 font-medium mb-10 md:mb-12 max-w-md mx-auto leading-relaxed">Your archival acquisition has been authenticated and initialized. Tracking telemetry is now active for Node {order.id}.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={() => onNavigate('shop')} className="bg-slate-950 text-white px-10 md:px-12 py-4 md:py-5 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all flex items-center justify-center gap-3">Continue Exploring</button>
        </div>
      </div>
    </div>
  );
};

const ProfilePage = ({ user, orders, onNavigate }: { user: User; orders: Order[]; onNavigate: (p: string) => void }) => {
  const stats = useMemo(() => ({
    count: orders.length,
    total: orders.reduce((a, b) => a + b.total, 0)
  }), [orders]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 animate-fadeIn">
      <SectionHeader title="Curator Profile" subtitle="Identity Node" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16">
        <div className="bg-white p-10 md:p-14 rounded-[40px] md:rounded-[60px] shadow-sm border border-slate-100 text-center flex flex-col items-center">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-[32px] md:rounded-[48px] bg-slate-950 text-white flex items-center justify-center text-4xl md:text-5xl font-black mb-8 shadow-2xl">{user.name[0]}</div>
          <h3 className="text-2xl md:text-3xl font-black text-slate-950 tracking-tighter mb-2 page-sub-heading-animate">{user.name}</h3>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mb-10">{user.email}</p>
          <div className="w-full space-y-4">
             <div className="p-6 bg-slate-50 rounded-[24px] border border-slate-100 flex justify-between items-center text-left">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Total Value</span>
                <span className="text-lg font-black text-slate-950">₹{stats.total.toLocaleString()}</span>
             </div>
             <div className="p-6 bg-slate-50 rounded-[24px] border border-slate-100 flex justify-between items-center text-left">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Acquisitions</span>
                <span className="text-lg font-black text-slate-950">{stats.count}</span>
             </div>
          </div>
        </div>
        <div className="lg:col-span-2 space-y-8">
           <div className="bg-slate-950 text-white p-10 md:p-16 rounded-[40px] md:rounded-[60px] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/20 rounded-full -mr-20 -mt-20 blur-3xl"></div>
              <h3 className="text-4xl md:text-6xl font-black tracking-tighter leading-[1] md:leading-[0.9] mb-8 md:mb-10 bg-gradient-to-br from-white via-slate-100 to-blue-400 bg-clip-text text-transparent heading-gradient-text" style={{backgroundSize: '200% 200%', animation: 'headingGradientShift 6s ease-in-out infinite'}}><span className="block">Archival<br /><span className="italic">Preferences.</span></span></h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                 <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Default Currency</label>
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10 font-black text-sm">INR - Indian Rupee</div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Fulfillment Priority</label>
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10 font-black text-sm">Archival Elite Standard</div>
                 </div>
              </div>
           </div>
           <div className="flex gap-4">
              <button onClick={() => onNavigate('orders')} className="flex-1 bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:border-blue-500 transition-all text-left group">
                 <Package className="w-8 h-8 text-blue-600 mb-6 group-hover:scale-110 transition-transform" />
                 <h4 className="font-black text-slate-950 uppercase text-xs tracking-widest mb-2 page-sub-heading-animate">Order Ledger</h4>
                 <p className="text-slate-400 text-[11px] font-medium leading-relaxed">Access full acquisition history and fulfillment documentation.</p>
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

const OrdersPage = ({ orders, onNavigate }: { orders: Order[]; onNavigate: (p: string) => void }) => (
  <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 animate-fadeIn">
    <SectionHeader title="Purchase Archive" subtitle="Acquisition Ledger" />
    {orders.length > 0 ? (
      <div className="space-y-8 md:space-y-10">
        {orders.map(order => (
          <div key={order.id} className="bg-white p-8 md:p-12 rounded-[40px] md:rounded-[50px] border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-8 group hover:shadow-xl transition-all duration-500">
            <div className="flex items-center gap-6 md:gap-10">
               <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-50 rounded-[24px] flex items-center justify-center text-slate-200 group-hover:bg-blue-600 group-hover:text-white transition-all"><Package className="w-8 h-8" /></div>
               <div>
                  <div className="flex items-center gap-3 mb-2">
                     <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{order.id}</span>
                     <Badge color="bg-green-500">{order.status}</Badge>
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-slate-950 tracking-tight card-heading-animate">Archival Batch Deployment</h3>
                  <p className="text-slate-400 text-xs md:text-sm font-medium mt-1">Acquired on {new Date(order.createdAt).toLocaleDateString()}</p>
               </div>
            </div>
            <div className="flex flex-row md:flex-col justify-between items-center md:items-end w-full md:w-auto mt-6 md:mt-0 pt-6 md:pt-0 border-t md:border-t-0 border-slate-50 gap-4">
               <span className="text-2xl md:text-3xl font-black text-slate-950 tracking-tighter">₹{order.total.toLocaleString()}</span>
               <button onClick={() => onNavigate('shop')} className="px-6 md:px-8 py-2.5 md:py-3 bg-slate-950 text-white rounded-full font-black text-[9px] uppercase tracking-widest hover:bg-blue-600 transition-all flex items-center gap-3">Details <ArrowRight className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="py-24 md:py-40 text-center bg-white rounded-[40px] md:rounded-[60px] border-2 border-dashed border-slate-100 flex flex-col items-center px-6">
         <Package className="w-16 h-16 text-slate-100 mb-8" />
         <h3 className="text-2xl font-black text-slate-950 mb-4 page-sub-heading-animate">No acquisitions found</h3>
         <button onClick={() => onNavigate('shop')} className="bg-slate-950 text-white px-10 py-4 rounded-full font-black text-[10px] uppercase tracking-widest">Initiate Discovery</button>
      </div>
    )}
  </div>
);

const QuickViewModal = ({ product, onClose, onAdd, isWish }: any) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-slate-950/60 backdrop-blur-xl animate-fadeIn">
    <div className="bg-white w-full max-w-5xl rounded-[40px] md:rounded-[60px] overflow-hidden shadow-2xl relative animate-scaleIn border border-slate-100 flex flex-col md:flex-row h-full max-h-[85vh] md:max-h-none md:h-auto">
      <button onClick={onClose} className="absolute top-6 right-6 md:top-10 md:right-10 p-3 md:p-4 bg-slate-50 rounded-2xl hover:bg-rose-500 hover:text-white transition-all z-20"><X className="w-6 h-6" /></button>
      <div className="w-full md:w-1/2 relative bg-slate-50 overflow-hidden h-64 md:h-auto">
        <img src={product.image} className="w-full h-full object-cover" alt="" />
        {product.discount && <div className="absolute top-8 left-8 bg-rose-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg shrink-0">-{product.discount}% UNLOCKED</div>}
      </div>
      <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col overflow-y-auto">
        <div className="flex gap-4 mb-8">
           <Badge>{product.category}</Badge>
           {product.isNewArrival && <Badge color="bg-orange-500">NEW ARRIVAL</Badge>}
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-slate-950 tracking-tighter mb-4 md:mb-6 modal-heading-animate">{product.name}</h2>
        <div className="flex items-center gap-6 mb-8 md:mb-10">
           <span className="text-3xl md:text-4xl font-black text-slate-950 tracking-tighter">₹{product.price.toLocaleString()}</span>
           <div className="w-px h-6 bg-slate-200" />
           <div className="flex items-center gap-2 text-orange-500 font-black text-lg"><Star className="w-5 h-5 fill-current" /> {product.rating}</div>
        </div>
        <p className="text-slate-500 font-medium leading-relaxed mb-10 md:mb-12 text-sm md:text-base border-l-4 border-slate-100 pl-6 italic">"{product.description}"</p>
        
        <div className="mt-auto space-y-4 pt-10 border-t border-slate-100">
           <button onClick={() => { onAdd(product.id); onClose(); }} className="w-full bg-slate-950 text-white py-5 md:py-6 rounded-[24px] md:rounded-[32px] font-black text-xs md:text-sm uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl flex items-center justify-center gap-4 group">
             Add to Bag <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
           </button>
        </div>
      </div>
    </div>
  </div>
);

// --- Informational Pages Components ---

const SupportPage = ({ onNavigate }: any) => (
    <div className="max-w-4xl mx-auto px-6 py-16 md:py-24 animate-fadeIn">
        <SectionHeader title="Support Center" subtitle="Assistance Hub" centered />
        <div className="space-y-8 md:space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="bg-white p-8 md:p-10 rounded-[30px] md:rounded-[40px] shadow-sm border border-slate-100">
                    <Mail className="w-8 h-8 md:w-10 md:h-10 text-blue-600 mb-6" />
                    <h3 className="text-lg md:text-xl font-black mb-2 page-sub-heading-animate">Digital Inquiry</h3>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed">Reach out via support@clickbazaar.com for standard assistance within 4 hours.</p>
                </div>
            </div>
            <div className="bg-slate-950 text-white p-8 md:p-12 rounded-[40px] md:rounded-[60px] shadow-2xl">
                <h3 className="text-4xl md:text-6xl font-black tracking-tighter leading-[1] md:leading-[0.9] mb-8 bg-gradient-to-br from-white via-slate-100 to-blue-400 bg-clip-text text-transparent heading-gradient-text" style={{backgroundSize: '200% 200%', animation: 'headingGradientShift 6s ease-in-out infinite'}}><span className="block">Frequently<br /><span className="italic">Asked.</span></span></h3>
                <div className="space-y-6">
                    <details className="group cursor-pointer">
                        <summary className="font-black text-sm uppercase tracking-widest list-none flex justify-between items-center group-open:text-blue-500">How do I track my shipment? <ChevronDown className="w-4 h-4" /></summary>
                        <p className="mt-4 text-slate-400 text-sm leading-relaxed">Log into your account and navigate to the 'Live Tracking' node for real-time telemetry of your acquisition.</p>
                    </details>
                    <div className="h-px bg-slate-800" />
                    <details className="group cursor-pointer">
                        <summary className="font-black text-sm uppercase tracking-widest list-none flex justify-between items-center group-open:text-blue-500">What is the return policy? <ChevronDown className="w-4 h-4" /></summary>
                        <p className="mt-4 text-slate-400 text-sm leading-relaxed">We offer a 30-day elite return window for all archival pieces in their original authenticated state.</p>
                    </details>
                </div>
            </div>
        </div>
    </div>
);

const PrivacyPage = ({ onNavigate }: any) => (
    <div className="max-w-4xl mx-auto px-6 py-16 md:py-24 animate-fadeIn">
        <SectionHeader title="Privacy Node" subtitle="Data Security" centered />
        <div className="bg-white p-8 md:p-16 rounded-[40px] md:rounded-[60px] shadow-sm border border-slate-100 text-slate-600 font-medium leading-loose text-sm md:text-base">
            <Lock className="w-12 h-12 md:w-16 md:h-16 text-blue-600 mb-8 md:mb-10" />
            <h3 className="text-xl md:text-2xl font-black text-slate-950 mb-6 page-sub-heading-animate">Your Security, Our Priority</h3>
            <p className="mb-8">At Click Bazaar, we employ military-grade encryption to protect your identity and transaction history. Every piece of telemetry collected is used solely to enhance your curated experience and ensure logistical precision.</p>
            <ul className="space-y-4 mb-10">
                <li className="flex gap-4 items-start"><Check className="w-5 h-5 text-blue-600 shrink-0 mt-1" /> No third-party data brokerage of individual identities.</li>
                <li className="flex gap-4 items-start"><Check className="w-5 h-5 text-blue-600 shrink-0 mt-1" /> End-to-end encrypted transaction ledger.</li>
                <li className="flex gap-4 items-start"><Check className="w-5 h-5 text-blue-600 shrink-0 mt-1" /> Real-time monitoring of account access nodes.</li>
            </ul>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Version 2025.1.0 ARCHIVE</p>
        </div>
    </div>
);

const TermsPage = ({ onNavigate }: any) => (
    <div className="max-w-4xl mx-auto px-6 py-16 md:py-24 animate-fadeIn">
        <SectionHeader title="Terms of Use" subtitle="User Protocol" centered />
        <div className="bg-slate-50 p-8 md:p-16 rounded-[40px] md:rounded-[60px] border border-slate-200">
            <h3 className="text-lg md:text-xl font-black text-slate-950 mb-8 uppercase tracking-widest page-sub-heading-animate">General protocols</h3>
            <div className="space-y-8 text-slate-500 text-sm leading-relaxed">
                <p>By accessing the Click Bazaar network, you agree to the protocols defined in our archival agreement. Our services are provided to authenticated curators only.</p>
                <div className="bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl border border-slate-100">
                    <h4 className="font-black text-slate-950 mb-4 text-[10px] md:text-xs uppercase tracking-widest card-heading-animate">1. Registration</h4>
                    <p>Curators must provide valid legal identity identifiers. Multiple account creation for speculative acquisition is strictly prohibited within the ecosystem.</p>
                </div>
                <div className="bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl border border-slate-100">
                    <h4 className="font-black text-slate-950 mb-4 text-[10px] md:text-xs uppercase tracking-widest card-heading-animate">2. Fulfillment</h4>
                    <p>All logistical estimations are subject to global freight telemetry. Click Bazaar ensures priority handling for all Elite acquisitions.</p>
                </div>
            </div>
        </div>
    </div>
);

const LegalPage = ({ onNavigate }: any) => (
    <div className="max-w-4xl mx-auto px-6 py-16 md:py-24 animate-fadeIn">
        <SectionHeader title="Legal Archive" subtitle="Regulatory Node" centered />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="bg-white p-10 md:p-12 rounded-[40px] md:rounded-[50px] shadow-sm border border-slate-100">
                <Scale className="w-10 h-10 md:w-12 md:h-12 text-blue-600 mb-8" />
                <h3 className="text-xl md:text-2xl font-black text-slate-950 mb-4 tracking-tighter page-sub-heading-animate">Compliance</h3>
                <p className="text-slate-500 font-medium leading-relaxed mb-8 text-sm">Full adherence to international e-commerce regulations and archival standards. Our legal node is continuously audited for transparency.</p>
                <Badge color="bg-slate-950">Verified</Badge>
            </div>
            <div className="bg-white p-10 md:p-12 rounded-[40px] md:rounded-[50px] shadow-sm border border-slate-100">
                <ShieldCheck className="w-10 h-10 md:w-12 md:h-12 text-blue-600 mb-8" />
                <h3 className="text-xl md:text-2xl font-black text-slate-950 mb-4 tracking-tighter page-sub-heading-animate">Intellectual Property</h3>
                <p className="text-slate-500 font-medium leading-relaxed mb-8 text-sm">All curated content, archival descriptions, and telemetry interfaces are proprietary assets of Click Bazaar Global Archive.</p>
                <Badge color="bg-slate-950">Protected</Badge>
            </div>
        </div>
    </div>
);

// --- Live Tracking View Component ---

const LiveTrackingView = ({ orders, onNavigate }: { orders: Order[], onNavigate: (p: string) => void }) => {
  const latestOrder = orders.length > 0 ? orders[0] : null;

  if (!latestOrder) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 md:py-40 animate-fadeIn text-center flex flex-col items-center">
        <Radar className="w-16 h-16 md:w-24 md:h-24 text-slate-200 mb-10 animate-pulse" />
        <h2 className="text-2xl md:text-3xl font-black text-slate-950 tracking-tighter mb-4 page-sub-heading-animate">No active shipments detected</h2>
        <p className="text-slate-400 mb-10 max-w-sm text-sm md:text-base">Initiate an archival acquisition to activate live tracking telemetry and monitor your fulfillment in real-time.</p>
        <button onClick={() => onNavigate('shop')} className="bg-slate-950 text-white px-10 md:px-12 py-4 md:py-5 rounded-full font-black text-[9px] md:text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-colors shadow-2xl">Shop Collections</button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-8">
        <ScrollReveal>
           <h4 className="text-blue-600 font-black uppercase text-[10px] md:text-[11px] tracking-[0.4em] mb-4 heading-subtitle">Logistics Node</h4>
           <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[1] md:leading-[0.9] bg-gradient-to-br from-slate-950 via-slate-800 to-blue-700 bg-clip-text text-transparent heading-gradient-text" style={{backgroundSize: '200% 200%', animation: 'headingGradientShift 6s ease-in-out infinite'}}>
             <span className="block">Live<br /><span className="italic">Telemetry.</span></span>
           </h1>
        </ScrollReveal>
        <div className="flex gap-4">
           <div className="bg-white px-6 md:px-8 py-4 md:py-5 rounded-[24px] md:rounded-[28px] border border-slate-100 shadow-sm flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-ping"></div>
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-500">Node Online</span>
           </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-16">
        <div className="lg:col-span-2 bg-white rounded-[40px] md:rounded-[60px] border border-slate-100 shadow-2xl overflow-hidden p-8 md:p-16 relative">
           <div className="flex flex-col md:flex-row justify-between items-start mb-12 md:mb-16 gap-6">
              <div>
                <span className="text-[10px] font-black uppercase text-blue-600 tracking-widest block mb-1">Archive ID: {latestOrder.id}</span>
                <h3 className="text-2xl md:text-3xl font-black text-slate-950 tracking-tighter card-heading-animate">In Transit - Hub Departure</h3>
              </div>
              <Badge color="bg-orange-500">Accelerated Fulfillment</Badge>
           </div>

           <div className="space-y-10 md:space-y-12 relative">
             <div className="absolute left-[20px] md:left-[22px] top-4 bottom-4 w-1 bg-slate-50"></div>
             {[
               { status: 'Arrived at Destination Hub', detail: 'Local sorting facility, Mumbai', time: 'Expected Today', active: false },
               { status: 'Departed Global Sorting Node', detail: 'International Air Hub', time: '08:45 AM', active: true },
               { status: 'Package Processed', detail: 'Click Bazaar Fulfillment Center', time: 'Yesterday, 04:20 PM', active: false },
               { status: 'Order Authenticated', detail: 'System Validation Complete', time: 'Yesterday, 02:15 PM', active: false },
             ].map((step, i) => (
               <div key={i} className="flex gap-6 md:gap-10 relative z-10">
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-[16px] md:rounded-[20px] flex items-center justify-center shrink-0 transition-all duration-500 ${step.active ? 'bg-blue-600 text-white shadow-2xl shadow-blue-200' : 'bg-white border-2 border-slate-100 text-slate-200'}`}>
                    {step.active ? <Truck className="w-5 h-5" /> : <div className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-current" />}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-black text-base md:text-lg tracking-tight card-heading-animate ${step.active ? 'text-slate-950' : 'text-slate-400'}`}>{step.status}</h4>
                    <p className="text-xs md:text-sm font-medium text-slate-400 mt-1">{step.detail}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-300">{step.time}</span>
                  </div>
               </div>
             ))}
           </div>
        </div>

        <div className="space-y-8 md:space-y-12">
           <div className="bg-slate-950 text-white p-8 md:p-12 rounded-[36px] md:rounded-[50px] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
              <h4 className="text-3xl md:text-5xl font-black tracking-tighter leading-[1] md:leading-[0.9] mb-8 bg-gradient-to-br from-white via-slate-100 to-blue-400 bg-clip-text text-transparent heading-gradient-text" style={{backgroundSize: '200% 200%', animation: 'headingGradientShift 6s ease-in-out infinite'}}><span className="block">Courier<br /><span className="italic">Profile.</span></span></h4>
              <div className="flex items-center gap-5 md:gap-6 mb-10">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-[20px] md:rounded-[24px] bg-white/5 flex items-center justify-center border border-white/10 shadow-inner"><UserIcon className="w-6 h-6 md:w-8 md:h-8 text-blue-500" /></div>
                <div>
                  <p className="font-black text-base md:text-lg">Vikram S.</p>
                  <p className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Elite Logistics Handler</p>
                </div>
              </div>
              <button className="w-full bg-blue-600 py-4 md:py-5 rounded-[20px] md:rounded-[24px] font-black text-[10px] uppercase tracking-widest hover:bg-white hover:text-slate-950 transition-all shadow-xl">Contact Node</button>
           </div>
           
           <div className="bg-white border border-slate-100 p-8 md:p-12 rounded-[36px] md:rounded-[50px] shadow-sm">
              <h4 className="text-3xl md:text-5xl font-black tracking-tighter leading-[1] md:leading-[0.9] mb-8 bg-gradient-to-br from-slate-950 via-slate-800 to-blue-700 bg-clip-text text-transparent heading-gradient-text" style={{backgroundSize: '200% 200%', animation: 'headingGradientShift 6s ease-in-out infinite'}}><span className="block">Terminal<br /><span className="italic">Destination.</span></span></h4>
              <div className="flex gap-4 md:gap-5">
                 <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-blue-50 flex items-center justify-center shrink-0"><MapPin className="w-5 h-5 md:w-6 md:h-6 text-blue-600" /></div>
                 <p className="text-xs md:text-sm font-medium text-slate-500 leading-relaxed pt-1">
                   <span className="text-slate-950 font-black text-[10px] uppercase block mb-1">Consignee</span>
                   {latestOrder.shippingAddress.fullName}<br />
                   {latestOrder.shippingAddress.address}<br />
                   {latestOrder.shippingAddress.city}, {latestOrder.shippingAddress.zip}
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

// --- Footer Component ---

const Footer = ({ onNavigate }: { onNavigate: (p: string, cat?: Category) => void }) => (
  <footer className="bg-slate-950 text-white py-20 md:py-24 border-t border-slate-900 no-print">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-24">
      <div className="col-span-1">
        <div className="flex items-center gap-2 mb-8 md:mb-10 cursor-pointer" onClick={() => onNavigate('home')}>
          <div className="bg-blue-600 p-1.5 rounded-lg"><ShoppingCart className="w-6 h-6" /></div>
          <span className="text-2xl md:text-3xl font-black tracking-tighter uppercase">Click Bazaar</span>
        </div>
        <p className="text-slate-500 font-medium text-sm leading-relaxed max-w-sm mb-10 md:mb-12">Defining digital excellence through curated aesthetics, global archival fulfillment, and advanced archival telemetry.</p>
        <div className="flex gap-4">
           <button onClick={() => onNavigate('support')} className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-colors border border-white/5"><HelpCircle className="w-5 h-5" /></button>
           <button onClick={() => onNavigate('legal')} className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-colors border border-white/5"><Info className="w-5 h-5" /></button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-1 gap-12 md:gap-16">
        <div>
          <ScrollRevealFooter>
            <h4 className="font-black text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-slate-400 mb-8 md:mb-12">Customer Command</h4>
          </ScrollRevealFooter>
          <ul className="space-y-4 md:space-y-6">
            <li><button onClick={() => onNavigate('tracking')} className="text-[10px] md:text-xs font-black text-slate-500 hover:text-white transition-all uppercase tracking-widest flex items-center gap-3"><Radar className="w-4 h-4" /> Live Tracking</button></li>
            <li><button onClick={() => onNavigate('orders')} className="text-[10px] md:text-xs font-black text-slate-500 hover:text-white transition-all uppercase tracking-widest flex items-center gap-3"><Package className="w-4 h-4" /> Purchase Archive</button></li>
            <li><button onClick={() => onNavigate('profile')} className="text-[10px] md:text-xs font-black text-slate-500 hover:text-white transition-all uppercase tracking-widest flex items-center gap-3"><UserIcon className="w-4 h-4" /> Account Profile</button></li>
            <li><button onClick={() => onNavigate('wishlist')} className="text-[10px] md:text-xs font-black text-slate-500 hover:text-white transition-all uppercase tracking-widest flex items-center gap-3"><Heart className="w-4 h-4" /> Saved Pieces</button></li>
          </ul>
        </div>
        <div className="md:hidden">
          <ScrollRevealFooter>
            <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-slate-400 mb-8">Support</h4>
          </ScrollRevealFooter>
          <ul className="space-y-4">
             <li><button onClick={() => onNavigate('support')} className="text-[10px] font-black text-slate-500 hover:text-white transition-all uppercase tracking-widest">Support Center</button></li>
             <li><button onClick={() => onNavigate('legal')} className="text-[10px] font-black text-slate-500 hover:text-white transition-all uppercase tracking-widest">Legal Archive</button></li>
          </ul>
        </div>
      </div>

      <div className="hidden lg:block">
        <ScrollRevealFooter>
          <h4 className="font-black text-[11px] uppercase tracking-[0.3em] text-slate-400 mb-12">Archives & Info</h4>
        </ScrollRevealFooter>
        <ul className="space-y-6">
          <li><button onClick={() => onNavigate('support')} className="text-xs font-black text-slate-500 hover:text-white transition-all uppercase tracking-widest">Support Center</button></li>
          <li><button onClick={() => onNavigate('legal')} className="text-xs font-black text-slate-500 hover:text-white transition-all uppercase tracking-widest">Legal Archive</button></li>
          <li><button onClick={() => onNavigate('privacy')} className="text-xs font-black text-slate-500 hover:text-white transition-all uppercase tracking-widest">Privacy Protocols</button></li>
          <li><button onClick={() => onNavigate('terms')} className="text-xs font-black text-slate-500 hover:text-white transition-all uppercase tracking-widest">Terms of Use</button></li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-6 mt-20 md:mt-24 pt-10 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-8">
      <p className="text-[9px] md:text-[10px] font-black text-slate-700 uppercase tracking-widest text-center">© 2025 CLICK BAZAAR GLOBAL ARCHIVE. ARCHITECTED FOR ELITE COMMERCE.</p>
      <div className="flex items-center gap-6 md:gap-10 text-[8px] md:text-[9px] font-black text-slate-700 uppercase tracking-[0.2em]">
        <span>ISO 9001 COMPLIANT</span>
        <span>AES-256 ENCRYPTED</span>
      </div>
    </div>
  </footer>
);

// --- Admin Components ---

const AdminDashboard = ({ users, orders, sessions, products, onLogout, onNavigate, isMobileOpen, setIsMobileOpen }: any) => {
  const [activeTab, setActiveTab] = useState('telemetry');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const userStats = useMemo(() => {
    if (!selectedUser) return null;
    const userOrders = orders.filter((o: any) => o.userId === selectedUser.id);
    const userSessions = sessions.filter((s: any) => s.userId === selectedUser.id);
    return {
      totalOrders: userOrders.length,
      totalSpend: userOrders.reduce((a: number, b: any) => a + b.total, 0),
      sessionCount: userSessions.length,
      lastActive: userSessions[0]?.timestamp || null,
      orders: userOrders,
      sessions: userSessions
    };
  }, [selectedUser, orders, sessions]);

  return (
    <div className="min-h-screen flex bg-[#f8f9fc] animate-fadeIn flex-col md:flex-row">
      {/* Mobile Admin Header */}
      <div className="md:hidden bg-slate-950 text-white p-4 flex justify-between items-center sticky top-0 z-[60]">
         <div className="flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5 text-blue-600" />
            <span className="font-black uppercase tracking-tighter">ARCHIVE</span>
         </div>
         <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="p-2 bg-slate-900 rounded-lg">
           {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
         </button>
      </div>

      <aside className={`w-72 bg-slate-950 text-white flex-col sticky top-0 h-screen shadow-2xl z-50 md:flex ${isMobileOpen ? 'fixed inset-0 w-full flex' : 'hidden md:flex'}`}>
        <div className="p-10 mb-8 hidden md:block">
           <div className="flex items-center gap-2 mb-2">
             <div className="bg-blue-600 p-1 rounded-lg"><LayoutDashboard className="w-5 h-5" /></div>
             <span className="text-xl font-black uppercase tracking-tighter">ARCHIVE</span>
           </div>
           <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Command Center</p>
        </div>
        <nav className="flex-1 px-6 space-y-2 mt-12 md:mt-0">
           {[
             { id: 'telemetry', label: 'Telemetry Logs', icon: Activity },
             { id: 'identities', label: 'User Registry', icon: Users },
             { id: 'ledger', label: 'Order Ledger', icon: CreditCard }
           ].map(tab => (
             <button 
               key={tab.id} onClick={() => { setActiveTab(tab.id); setSelectedUser(null); setIsMobileOpen(false); }}
               className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-black text-[11px] uppercase tracking-widest ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-xl shadow-blue-900/20' : 'text-slate-500 hover:text-white hover:bg-slate-900'}`}
             >
               <tab.icon className="w-5 h-5" /> {tab.label}
             </button>
           ))}
        </nav>
        <div className="p-8 border-t border-slate-900 space-y-4">
           <button onClick={() => onNavigate('home')} className="w-full text-left px-6 py-3 font-black text-[10px] uppercase tracking-widest text-slate-500 hover:text-white flex items-center gap-4"><ExternalLink className="w-4 h-4" /> Storefront</button>
           <button onClick={onLogout} className="w-full text-left px-6 py-3 font-black text-[10px] uppercase tracking-widest text-rose-500 hover:bg-rose-500/10 rounded-xl flex items-center gap-4"><LogOut className="w-4 h-4" /> Terminate</button>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-12 overflow-y-auto relative custom-scrollbar">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 md:mb-16 gap-6">
          <div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[1] md:leading-[0.9] capitalize bg-gradient-to-br from-slate-950 via-slate-800 to-blue-700 bg-clip-text text-transparent heading-gradient-text" style={{backgroundSize: '200% 200%', animation: 'headingGradientShift 6s ease-in-out infinite'}}><span className="block">{activeTab}<br /><span className="italic">Interface.</span></span></h1>
            <p className="text-slate-400 font-bold text-[10px] md:text-xs uppercase tracking-widest mt-2">Real-time system diagnostics</p>
          </div>
          <div className="flex gap-4">
             <div className="bg-white p-3 md:p-4 rounded-xl md:rounded-2xl border border-slate-100 flex items-center gap-3 md:gap-4 shadow-sm">
                <div className="bg-blue-100 p-1.5 md:p-2 rounded-lg md:rounded-xl text-blue-600"><Timer className="w-4 h-4 md:w-5 md:h-5" /></div>
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-500">{sessions.length} Active Interactions</span>
             </div>
          </div>
        </div>

        {/* Desktop-friendly Table Container */}
        <div className="overflow-x-auto bg-white rounded-[32px] md:rounded-[48px] border border-slate-50 shadow-sm">
          {activeTab === 'telemetry' && (
            <table className="w-full text-left min-w-[600px]">
              <thead>
                <tr className="border-b border-slate-50">
                  <th className="px-6 md:px-10 py-6 md:py-8 text-[10px] font-black uppercase tracking-widest text-slate-400">User Identity</th>
                  <th className="px-6 md:px-10 py-6 md:py-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Node Access Point</th>
                  <th className="px-6 md:px-10 py-6 md:py-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Session ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {sessions.map((s: any) => (
                  <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 md:px-10 py-4 md:py-6">
                       <div className="flex items-center gap-3 md:gap-4">
                         <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-950 text-white flex items-center justify-center font-black text-[10px] md:text-xs uppercase">{s.userName[0]}</div>
                         <div>
                            <p className="font-black text-slate-950 text-xs md:text-sm">{s.userName}</p>
                            <span className="text-[8px] md:text-[9px] font-bold text-slate-400 uppercase tracking-widest">{s.userEmail}</span>
                         </div>
                       </div>
                    </td>
                    <td className="px-6 md:px-10 py-4 md:py-6 text-[10px] md:text-[11px] font-black text-slate-500">
                      {new Date(s.timestamp).toLocaleDateString()} @ {new Date(s.timestamp).toLocaleTimeString()}
                    </td>
                    <td className="px-6 md:px-10 py-4 md:py-6 font-mono text-[9px] md:text-[10px] font-bold text-blue-600">{s.id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'identities' && (
            <table className="w-full text-left min-w-[600px]">
              <thead>
                <tr className="border-b border-slate-50">
                  <th className="px-6 md:px-10 py-6 md:py-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Registrant</th>
                  <th className="px-6 md:px-10 py-6 md:py-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Role</th>
                  <th className="px-6 md:px-10 py-6 md:py-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                  <th className="px-6 md:px-10 py-6 md:py-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {users.map((u: User) => (
                  <tr key={u.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 md:px-10 py-4 md:py-6">
                      <p className="font-black text-slate-950 text-xs md:text-sm">{u.name}</p>
                      <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase">{u.email}</p>
                    </td>
                    <td className="px-6 md:px-10 py-4 md:py-6"><Badge color={u.role === UserRole.Admin ? "bg-slate-950" : "bg-blue-600"}>{u.role}</Badge></td>
                    <td className="px-6 md:px-10 py-4 md:py-6"><span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Active</span></td>
                    <td className="px-6 md:px-10 py-4 md:py-6">
                       <button 
                        onClick={() => setSelectedUser(u)} 
                        className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-slate-100 group-hover:bg-blue-600 group-hover:text-white rounded-lg md:rounded-xl transition-all font-black text-[9px] md:text-[10px] uppercase tracking-widest whitespace-nowrap"
                       >
                         <Eye className="w-4 h-4" /> Full Profile
                       </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'ledger' && (
            <table className="w-full text-left min-w-[600px]">
              <thead>
                <tr className="border-b border-slate-50">
                  <th className="px-6 md:px-10 py-6 md:py-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Trans ID</th>
                  <th className="px-6 md:px-10 py-6 md:py-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Timestamp</th>
                  <th className="px-6 md:px-10 py-6 md:py-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Total Investment</th>
                  <th className="px-6 md:px-10 py-6 md:py-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Fulfillment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {orders.map((o: any) => (
                  <tr key={o.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 md:px-10 py-4 md:py-6 font-mono font-bold text-[10px] md:text-xs text-blue-600">{o.id}</td>
                    <td className="px-6 md:px-10 py-4 md:py-6 text-[9px] md:text-[10px] font-bold text-slate-400 uppercase">
                      {new Date(o.createdAt).toLocaleDateString()} @ {new Date(o.createdAt).toLocaleTimeString()}
                    </td>
                    <td className="px-6 md:px-10 py-4 md:py-6 font-black text-xs md:text-sm text-slate-950">₹{o.total.toLocaleString()}</td>
                    <td className="px-6 md:px-10 py-4 md:py-6"><Badge color="bg-green-500">{o.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* User Detailed Drill-down Modal */}
        {selectedUser && userStats && (
           <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-slate-950/60 backdrop-blur-xl animate-fadeIn">
              <div className="bg-white w-full max-w-5xl rounded-[40px] md:rounded-[60px] overflow-hidden shadow-2xl relative animate-scaleIn border border-slate-100 flex flex-col h-full max-h-[90vh]">
                 <button onClick={() => setSelectedUser(null)} className="absolute top-6 right-6 md:top-10 md:right-10 p-3 md:p-5 bg-slate-50 rounded-2xl md:rounded-3xl hover:bg-rose-500 hover:text-white transition-all z-10"><X className="w-6 h-6" /></button>
                 
                 <div className="flex flex-col md:flex-row h-full overflow-hidden">
                    <div className="md:w-1/3 bg-slate-50 p-8 md:p-12 flex flex-col items-center text-center border-r border-slate-100 overflow-y-auto shrink-0">
                       <div className="w-24 h-24 md:w-32 md:h-32 rounded-[32px] md:rounded-[48px] bg-slate-950 text-white flex items-center justify-center text-4xl md:text-5xl font-black mb-8 shadow-2xl rotate-3 shrink-0">{selectedUser.name[0]}</div>
                       <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[1] md:leading-[0.9] mb-3 bg-gradient-to-br from-slate-950 via-slate-800 to-blue-700 bg-clip-text text-transparent heading-gradient-text" style={{backgroundSize: '200% 200%', animation: 'headingGradientShift 6s ease-in-out infinite'}}>{selectedUser.name}</h2>
                       <p className="text-slate-400 font-bold uppercase text-[9px] md:text-[10px] tracking-widest mb-8 md:mb-10 px-4 py-2 bg-white rounded-full border border-slate-100 truncate w-full">{selectedUser.email}</p>
                       
                       <div className="w-full space-y-4">
                          <div className="p-5 md:p-6 bg-white rounded-[24px] md:rounded-[32px] border border-slate-100 flex flex-col items-center shadow-sm">
                             <span className="text-[8px] md:text-[9px] font-black text-blue-600 uppercase tracking-widest mb-1">Lifetime Acquisition</span>
                             <span className="text-xl md:text-2xl font-black text-slate-950">₹{userStats.totalSpend.toLocaleString()}</span>
                          </div>
                          <div className="p-5 md:p-6 bg-white rounded-[24px] md:rounded-[32px] border border-slate-100 flex flex-col items-center shadow-sm">
                             <span className="text-[8px] md:text-[9px] font-black text-blue-600 uppercase tracking-widest mb-1">Archival Hits</span>
                             <span className="text-xl md:text-2xl font-black text-slate-950">{userStats.sessionCount}</span>
                          </div>
                       </div>
                    </div>

                    <div className="flex-1 p-8 md:p-16 overflow-y-auto custom-scrollbar">
                       <div className="grid grid-cols-1 gap-12 md:gap-16">
                          <div>
                             <h4 className="font-black text-[10px] md:text-xs uppercase tracking-[0.3em] text-blue-600 mb-6 md:mb-8 flex items-center gap-3 card-heading-animate">
                               <Activity className="w-4 h-4 md:w-5 md:h-5" /> Interaction Telemetry
                             </h4>
                             <div className="space-y-3 md:space-y-4">
                                {userStats.sessions.map((s: any) => (
                                  <div key={s.id} className="p-4 md:p-6 bg-slate-50 rounded-2xl md:rounded-[28px] flex justify-between items-center border border-slate-100">
                                     <div>
                                        <p className="text-[10px] md:text-[11px] font-black text-slate-950">System Access Node: {s.id}</p>
                                        <p className="text-[8px] md:text-[10px] font-bold text-slate-400 mt-1">
                                          {new Date(s.timestamp).toLocaleDateString()} @ {new Date(s.timestamp).toLocaleTimeString()}
                                        </p>
                                     </div>
                                     <Badge color="bg-blue-600/10 !text-blue-600 border border-blue-100">AUTH</Badge>
                                  </div>
                                ))}
                             </div>
                          </div>

                          <div>
                             <h4 className="font-black text-[10px] md:text-xs uppercase tracking-[0.3em] text-blue-600 mb-6 md:mb-8 flex items-center gap-3 card-heading-animate">
                               <CreditCard className="w-4 h-4 md:w-5 md:h-5" /> Ledger History
                             </h4>
                             <div className="space-y-4 md:space-y-6">
                                {userStats.orders.map((o: any) => (
                                  <div key={o.id} className="p-6 md:p-8 bg-slate-50 rounded-[28px] md:rounded-[36px] flex justify-between items-center border border-slate-100 group">
                                     <div>
                                        <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
                                           <span className="text-[9px] md:text-[10px] font-black text-blue-600 tracking-widest uppercase">{o.id}</span>
                                           <Badge color="bg-green-500/10 !text-green-600 text-[8px]">{o.status}</Badge>
                                        </div>
                                        <p className="text-[9px] md:text-[10px] font-bold text-slate-500">
                                          {new Date(o.createdAt).toLocaleDateString()} @ {new Date(o.createdAt).toLocaleTimeString()}
                                        </p>
                                     </div>
                                     <div className="text-right">
                                        <span className="text-xl md:text-2xl font-black text-slate-950 tracking-tighter">₹{o.total.toLocaleString()}</span>
                                     </div>
                                  </div>
                                ))}
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        )}
      </main>
    </div>
  );
};

// --- Auth Views ---

const AuthView = ({ mode, onAuth, onToggle }: { mode: 'login' | 'signup', onAuth: any, onToggle: () => void }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'signup') onAuth(name, email, pass);
    else onAuth(email, pass);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 md:px-6 py-12 md:py-24">
      <div className="w-full max-w-xl bg-white p-8 md:p-20 rounded-[40px] md:rounded-[70px] shadow-2xl border border-slate-100 animate-scaleIn text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-3 md:h-4 bg-blue-600"></div>
        <div className="bg-slate-950 w-16 h-16 md:w-24 md:h-24 rounded-[24px] md:rounded-[40px] flex items-center justify-center mx-auto mb-8 md:mb-12 text-white shadow-2xl rotate-12">
           {mode === 'login' ? <LogIn className="w-8 h-8 md:w-10 md:h-10" /> : <UserPlus className="w-8 h-8 md:w-10 md:h-10" />}
        </div>
        <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[1] md:leading-[0.9] mb-4 bg-gradient-to-br from-slate-950 via-slate-800 to-blue-700 bg-clip-text text-transparent heading-gradient-text" style={{backgroundSize: '200% 200%', animation: 'headingGradientShift 6s ease-in-out infinite'}}>
          <span className="block">{mode === 'login' ? <>Identity<br /><span className="italic">Portal.</span></> : <>Register<br /><span className="italic">Node.</span></>}</span>
        </h2>
        
        {mode === 'login' && (
           <div className="bg-blue-50/50 p-4 md:p-6 rounded-[24px] md:rounded-[32px] border border-blue-100 mb-8 md:mb-10 text-left text-[10px] md:text-xs">
             <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <p className="font-black text-blue-600 uppercase tracking-widest">Admin Hub Credentials</p>
             </div>
             <p className="font-bold text-slate-700">id: <span className="text-slate-950 select-all font-black">admin@clickbazaar.com</span></p>
             <p className="font-bold text-slate-700">cipher: <span className="text-slate-950 select-all font-black">admin123</span></p>
           </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8 text-left">
          {mode === 'signup' && (
            <div className="space-y-2">
              <label className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 block">Identity</label>
              <input required type="text" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} className="w-full bg-slate-50 border-none rounded-[20px] md:rounded-[28px] px-6 md:px-8 py-4 md:py-5 focus:ring-2 focus:ring-blue-600 outline-none font-bold text-sm shadow-inner" />
            </div>
          )}
          <div className="space-y-2">
             <label className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 block">Archive ID (Email)</label>
             <input required type="email" placeholder="email@address.com" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-slate-50 border-none rounded-[20px] md:rounded-[28px] px-6 md:px-8 py-4 md:py-5 focus:ring-2 focus:ring-blue-600 outline-none font-bold text-sm shadow-inner" />
          </div>
          <div className="space-y-2">
             <label className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 block">Cipher (Password)</label>
             <input required type="password" placeholder="••••••••" value={pass} onChange={e => setPass(e.target.value)} className="w-full bg-slate-50 border-none rounded-[20px] md:rounded-[28px] px-6 md:px-8 py-4 md:py-5 focus:ring-2 focus:ring-blue-600 outline-none font-bold text-sm shadow-inner" />
          </div>
          
          <button type="submit" className="w-full bg-slate-950 text-white py-5 md:py-6 rounded-[28px] md:rounded-[36px] font-black text-lg md:text-xl hover:bg-blue-600 transition-all shadow-2xl mt-8 md:mt-12 uppercase tracking-widest transform active:scale-95">
             {mode === 'login' ? 'Authenticate' : 'Register'}
          </button>
        </form>

        <div className="mt-12 md:mt-16 pt-8 md:pt-10 border-t border-slate-50 flex flex-col items-center gap-4 md:gap-6">
           <button onClick={onToggle} className="text-blue-600 font-black text-[9px] md:text-[11px] uppercase tracking-[0.3em] hover:text-slate-950 transition-colors">
             {mode === 'login' ? 'Create Hub Node' : 'Access Existing Archive'}
           </button>
        </div>
      </div>
    </div>
  );
};

// --- Product Card Component ---

const ProductCard: React.FC<{product: Product; onAdd: () => void; onQuick: () => void; isWish: boolean; onWish: () => void;}> = ({ product, onAdd, onQuick, isWish, onWish }) => (
  <div className="premium-card group bg-white rounded-[32px] md:rounded-[48px] overflow-hidden flex flex-col border border-slate-50 shadow-sm relative transition-all duration-500 hover:shadow-[0_40px_80px_-30px_rgba(0,0,0,0.15)] h-full">
    <div className="relative aspect-[4/5] overflow-hidden bg-slate-50">
      <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out" alt={product.name} />
      <div className="absolute inset-0 bg-slate-950/40 opacity-0 lg:group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-4 md:gap-5 backdrop-blur-[4px]">
        <button onClick={onQuick} className="bg-white p-4 md:p-5 rounded-[20px] md:rounded-[24px] text-slate-900 shadow-2xl translate-y-6 lg:group-hover:translate-y-0 transition-all duration-500 hover:bg-blue-600 hover:text-white"><Eye className="w-5 h-5 md:w-6 md:h-6" /></button>
        <button onClick={onAdd} className="bg-white p-4 md:p-5 rounded-[20px] md:rounded-[24px] text-slate-900 shadow-2xl translate-y-6 lg:group-hover:translate-y-0 transition-all duration-500 delay-75 hover:bg-blue-600 hover:text-white"><Plus className="w-5 h-5 md:w-6 md:h-6" /></button>
      </div>
      
      {/* Mobile-only action indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center lg:hidden gap-3 pointer-events-none px-4 opacity-70">
         <button className="bg-white/80 p-2 rounded-lg pointer-events-auto" onClick={onQuick}><Eye className="w-4 h-4" /></button>
         <button className="bg-white/80 p-2 rounded-lg pointer-events-auto" onClick={onAdd}><Plus className="w-4 h-4" /></button>
      </div>

      {product.discount && (
        <div className="absolute top-6 md:top-8 left-6 md:left-8 flex flex-col gap-2 md:gap-3">
           <div className="bg-rose-500 text-white text-[8px] md:text-[10px] font-black px-3 md:px-4 py-1 md:py-1.5 rounded-full shadow-lg">-{product.discount}%</div>
           {product.isLimitedOffer && <div className="bg-slate-950 text-white text-[8px] md:text-[10px] font-black px-3 md:px-4 py-1 md:py-1.5 rounded-full shadow-lg">FLASH</div>}
        </div>
      )}
      <button onClick={onWish} className={`absolute top-6 md:top-8 right-6 md:right-8 p-3 md:p-4 rounded-[20px] md:rounded-[24px] backdrop-blur-xl transition-all duration-300 shadow-xl ${isWish ? 'bg-rose-500 text-white scale-110' : 'bg-white/80 text-slate-400 hover:text-rose-500'}`}>
        <Heart className={`w-4 h-4 md:w-5 md:h-5 ${isWish ? 'fill-current' : ''}`} />
      </button>
    </div>
    <div className="p-6 md:p-10 flex flex-col flex-1">
      <div className="flex justify-between items-start mb-2 md:mb-3">
        <h3 className="text-lg md:text-xl font-black text-slate-950 tracking-tight leading-tight group-hover:text-blue-600 transition-colors card-heading-animate">{product.name}</h3>
        <div className="text-right shrink-0">
           <span className="text-base md:text-xl font-black text-slate-950 tracking-tighter block">₹{product.price.toLocaleString('en-IN')}</span>
           {product.discount && <span className="text-[9px] md:text-[11px] font-bold text-slate-300 line-through">₹{(Math.round(product.price / (1 - product.discount/100))).toLocaleString()}</span>}
        </div>
      </div>
      <p className="text-slate-400 text-[10px] md:text-xs font-medium line-clamp-2 italic mb-6 md:mb-10 flex-1 leading-relaxed">"{product.description}"</p>
      <div className="pt-6 md:pt-8 border-t border-slate-50 flex justify-between items-center">
         <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 truncate mr-2">{product.category}</span>
         <div className="flex items-center gap-1 px-2 md:px-3 py-0.5 md:py-1 bg-orange-50 rounded-full text-orange-500 font-black text-[8px] md:text-[10px]"><Star className="w-2.5 h-2.5 md:w-3 md:h-3 fill-current" /> {product.rating || '4.5'}</div>
      </div>
    </div>
  </div>
);

// --- Cart and Checkout Support Components ---

const CartPage = ({ cart, products, onRemove, onCheckout, onNavigate }: any) => {
  const items = cart.map((c: any) => ({ ...c, product: products.find((p: any) => p.id === c.productId)! }));
  const total = items.reduce((a: number, b: any) => a + (b.product.price * b.quantity), 0);
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 animate-fadeIn">
      <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[1] md:leading-[0.9] mb-12 md:mb-20 bg-gradient-to-br from-slate-950 via-slate-800 to-blue-700 bg-clip-text text-transparent heading-gradient-text" style={{backgroundSize: '200% 200%', animation: 'headingGradientShift 6s ease-in-out infinite'}}>
        Curated <span className="italic">Bag</span>
      </h2>
      {items.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-24">
          <div className="lg:col-span-2 space-y-8 md:space-y-10">
            {items.map((item: any) => (
              <div key={item.productId} className="flex flex-col sm:flex-row gap-8 md:gap-12 bg-white p-8 md:p-12 rounded-[40px] md:rounded-[60px] border border-slate-50 shadow-sm relative group hover:shadow-xl transition-all duration-500">
                <div className="w-full sm:w-48 h-48 rounded-[32px] md:rounded-[40px] overflow-hidden bg-slate-50 shrink-0"><img src={item.product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" /></div>
                <div className="flex-1 flex flex-col justify-between py-2">
                  <div className="flex justify-between items-start">
                    <div>
                       <Badge color="bg-blue-600/10 !text-blue-600 mb-3">{item.product.category}</Badge>
                       <h3 className="text-2xl md:text-3xl font-black text-slate-950 tracking-tight leading-tight card-heading-animate">{item.product.name}</h3>
                    </div>
                    <button onClick={() => onRemove(item.productId)} className="p-3 md:p-4 bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white rounded-2xl transition-all shadow-sm"><Trash2 className="w-5 h-5 md:w-6 md:h-6" /></button>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-8 md:pt-10 border-t border-slate-50 gap-6 sm:gap-0">
                    <span className="font-black text-xl md:text-2xl text-slate-950 tracking-tighter">₹{item.product.price.toLocaleString()}</span>
                    <div className="flex items-center gap-4 bg-slate-50 px-5 md:px-6 py-2 md:py-3 rounded-full border border-slate-100">
                       <span className="text-[9px] md:text-[10px] font-black uppercase text-slate-400 tracking-widest">Qty</span>
                       <span className="text-base md:text-lg font-black text-slate-950">{item.quantity}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-slate-950 p-8 md:p-16 rounded-[40px] md:rounded-[70px] text-white shadow-2xl h-fit sticky top-28 overflow-hidden relative">
             <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
             <h3 className="text-4xl md:text-6xl font-black tracking-tighter leading-[1] md:leading-[0.9] mb-10 md:mb-12 bg-gradient-to-br from-white via-slate-100 to-blue-400 bg-clip-text text-transparent heading-gradient-text" style={{backgroundSize: '200% 200%', animation: 'headingGradientShift 6s ease-in-out infinite'}}><span className="block"><span className="italic">Summary.</span></span></h3>
             <div className="space-y-4 md:space-y-6 mb-10 md:mb-12">
                <div className="flex justify-between items-center text-slate-400 text-xs md:text-sm font-bold uppercase tracking-widest">
                   <span>Archival Value</span><span>₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-slate-400 text-xs md:text-sm font-bold uppercase tracking-widest">
                   <span>Node Status</span><span className="text-blue-500">PRIORITY</span>
                </div>
             </div>
             <div className="flex justify-between items-center py-8 md:py-12 font-black text-4xl md:text-5xl text-blue-500 tracking-tighter border-y border-white/10">
               <span>Total</span><span>₹{total.toLocaleString()}</span>
             </div>
             <button onClick={onCheckout} className="w-full bg-blue-600 text-white py-6 md:py-8 rounded-[28px] md:rounded-[40px] font-black text-lg md:text-xl hover:bg-white hover:text-slate-950 transition-all shadow-2xl uppercase tracking-widest mt-10 md:mt-12 flex items-center justify-center gap-4 group">Finalize Node <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform" /></button>
          </div>
        </div>
      ) : (
        <div className="py-24 md:py-40 text-center bg-white rounded-[40px] md:rounded-[70px] border-2 border-dashed border-slate-100 flex flex-col items-center px-6">
           <ShoppingCart className="w-16 h-16 md:w-24 md:h-24 text-slate-100 mb-8 md:mb-10" />
           <h3 className="text-3xl md:text-4xl font-black text-slate-950 mb-4 md:mb-6 tracking-tighter page-sub-heading-animate">Your Archive is Empty</h3>
           <p className="text-slate-400 mb-10 md:mb-12 max-w-sm font-medium text-sm md:text-base">Begin your premium acquisition journey by exploring our world-class collections.</p>
           <button onClick={() => onNavigate('shop')} className="bg-slate-950 text-white px-10 md:px-14 py-4 md:py-6 rounded-full font-black text-[9px] md:text-[11px] uppercase tracking-[0.3em] hover:bg-blue-600 transition-all shadow-2xl">Explore Collections</button>
        </div>
      )}
    </div>
  );
};

const CheckoutPage = ({ cart, products, onComplete, onBack }: any) => {
  const [shipping, setShipping] = useState({ fullName: '', address: '', city: '', zip: '' });
  const items = cart.map((c: any) => ({ ...c, product: products.find((p: any) => p.id === c.productId)! }));
  const total = items.reduce((a: number, b: any) => a + (b.product.price * b.quantity), 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(shipping);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 animate-fadeIn">
      <button onClick={onBack} className="flex items-center gap-2 font-black text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-slate-400 hover:text-slate-950 mb-10 md:mb-12 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Return to Bag
      </button>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
        <div>
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[1] md:leading-[0.9] mb-10 md:mb-12 bg-gradient-to-br from-slate-950 via-slate-800 to-blue-700 bg-clip-text text-transparent heading-gradient-text" style={{backgroundSize: '200% 200%', animation: 'headingGradientShift 6s ease-in-out infinite'}}>
            <span className="block">Shipping<br /><span className="italic">Node.</span></span>
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
            <div className="space-y-2">
              <label className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
              <input 
                required
                value={shipping.fullName}
                onChange={(e) => setShipping({ ...shipping, fullName: e.target.value })}
                className="w-full bg-slate-50 border border-slate-100 px-6 md:px-8 py-5 md:py-6 rounded-[24px] md:rounded-[32px] text-slate-950 font-black focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm md:text-base outline-none"
                placeholder="Ex. John Doe"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Archival Location (Address)</label>
              <input 
                required
                value={shipping.address}
                onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                className="w-full bg-slate-50 border border-slate-100 px-6 md:px-8 py-5 md:py-6 rounded-[24px] md:rounded-[32px] text-slate-950 font-black focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm md:text-base outline-none"
                placeholder="Ex. 73 Premium District"
              />
            </div>
            <div className="grid grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-2">
                <label className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">City Node</label>
                <input 
                  required
                  value={shipping.city}
                  onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-100 px-6 md:px-8 py-4 md:py-5 rounded-[22px] md:rounded-[28px] text-slate-950 font-black focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm outline-none"
                  placeholder="Ex. Metro City"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Postcode</label>
                <input 
                  required
                  value={shipping.zip}
                  onChange={(e) => setShipping({ ...shipping, zip: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-100 px-6 md:px-8 py-4 md:py-5 rounded-[22px] md:rounded-[28px] text-slate-950 font-black focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm outline-none"
                  placeholder="Ex. 10101"
                />
              </div>
            </div>
            <button type="submit" className="w-full bg-slate-950 text-white py-6 md:py-8 rounded-[28px] md:rounded-[40px] font-black text-lg md:text-xl hover:bg-blue-600 transition-all shadow-2xl uppercase tracking-widest mt-6 md:mt-8">
              Initialize Deployment
            </button>
          </form>
        </div>
        <div>
           <div className="bg-slate-50 p-8 md:p-12 rounded-[40px] md:rounded-[60px] border border-slate-100">
              <h3 className="text-4xl md:text-6xl font-black tracking-tighter leading-[1] md:leading-[0.9] mb-8 md:mb-10 border-b border-slate-200 pb-6 bg-gradient-to-br from-slate-950 via-slate-800 to-blue-700 bg-clip-text text-transparent heading-gradient-text" style={{backgroundSize: '200% 200%', animation: 'headingGradientShift 6s ease-in-out infinite'}}><span className="block">Acquisition<br /><span className="italic">Pool.</span></span></h3>
              <div className="space-y-6 md:space-y-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item: any) => (
                  <div key={item.product.id} className="flex justify-between items-center bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-4 md:gap-6">
                       <span className="w-10 h-10 md:w-12 md:h-12 bg-slate-950 text-white rounded-full flex items-center justify-center font-black text-xs md:text-sm">{item.quantity}</span>
                       <div>
                          <p className="font-black text-sm md:text-base text-slate-950 leading-tight">{item.product.name}</p>
                          <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase mt-1 tracking-widest">{item.product.category}</p>
                       </div>
                    </div>
                    <span className="font-black text-slate-950 text-sm md:text-base">₹{(item.product.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="mt-10 md:mt-12 pt-8 md:pt-10 border-t-2 border-dashed border-slate-200">
                 <div className="flex justify-between items-center font-black text-2xl md:text-3xl text-slate-950 tracking-tighter">
                   <span>Final Value</span>
                   <span className="text-blue-600">₹{total.toLocaleString()}</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

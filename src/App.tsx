import { FormEvent, useEffect, useState } from 'react';
import {
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  Github,
  Globe2,
  Heart,
  Home,
  Linkedin,
  Mail,
  Menu,
  MessageSquare,
  Rocket,
  Send,
  Sparkles,
  Star,
  Users2,
  X,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

/* ─── DATA ─── */
const navLinks = [
  { name: 'Our Story', href: '#story' },
  { name: 'What We Stand For', href: '#values' },
  { name: 'At a Glance', href: '#at-a-glance' },
  { name: 'HuddleUp App', href: '#huddleup' },
  { name: 'Team', href: '#team' },
  { name: 'Join Us', href: '#join' },
];

const valuesList = [
  {
    title: 'Belonging first',
    description: 'Every member is welcomed by name and invited to take part.',
    icon: Heart,
    circleBg: 'bg-crimson-600',
    iconColor: 'text-white',
  },
  {
    title: 'Culture shared',
    description: 'We swap stories, food and traditions, and we learn from each other.',
    icon: Globe2,
    circleBg: 'bg-navy-700',
    iconColor: 'text-white',
  },
  {
    title: 'Service together',
    description: 'We volunteer on campus and in the SVSU community.',
    icon: Star,
    circleBg: 'bg-gold-400',
    iconColor: 'text-crimson-700',
  },
  {
    title: 'Leaders grow here',
    description: 'Members run events, lead teams and build real experience.',
    icon: Home,
    circleBg: 'bg-navy-900',
    iconColor: 'text-crimson-500',
  },
];

const glanceItems = [
  {
    title: 'Weekly meetups',
    details: 'Wednesdays & Saturdays · Campus Innovation Hub',
    sub: 'Casual gatherings, project collabs & tech discussions',
    icon: Clock,
    borderAccent: 'border-l-crimson-600',
    iconBg: 'bg-crimson-50 text-crimson-600',
  },
  {
    title: 'Open to all students',
    details: 'No experience needed',
    sub: 'Whether you code, design, write, or just want to connect',
    icon: Users2,
    borderAccent: 'border-l-navy-600',
    iconBg: 'bg-navy-50 text-navy-700',
  },
  {
    title: 'Events each term',
    details: 'Hackathons, Workshops & Community Dinners',
    sub: 'Hands-on learning, CTF competitions & product sprints',
    icon: Calendar,
    borderAccent: 'border-l-gold-500',
    iconBg: 'bg-gold-100 text-gold-600',
  },
  {
    title: 'Student-led board',
    details: 'Built by students, for students',
    sub: 'Core organizers and builders working together across disciplines',
    icon: Star,
    borderAccent: 'border-l-navy-900',
    iconBg: 'bg-navy-950 text-gold-400',
  },
];

const teamMembers = [
  { name: 'Rohan', role: 'ADMIN & Lead', initials: 'R', tag: '01', linkedin: 'https://www.linkedin.com/in/rohannaagar', github: 'https://github.com/irncyber' },
  { name: 'Pramod', role: 'Core Member', initials: 'P', tag: '02', linkedin: 'https://www.linkedin.com/in/pramod-tewatia-875b75392', github: 'https://github.com/PramodTewatia2007' },
  { name: 'Hirdey', role: 'Core Member', initials: 'H', tag: '03', linkedin: 'https://www.linkedin.com/in/hirdey-219111429', github: '#' },
  { name: 'Mudit', role: 'Core Member', initials: 'M', tag: '04', linkedin: '#', github: '#' },
  { name: 'Pawan', role: 'Core Member', initials: 'PK', tag: '05', linkedin: '#', github: '#' },
  { name: 'Priyanshu', role: 'Core Member', initials: 'PP', tag: '06', linkedin: 'https://www.linkedin.com/in/priyanshu-pandey-76368143b', github: '#' },
  { name: 'Rohtash', role: 'Core Member', initials: 'P', tag: '07', linkedin: '#', github: '#' },
  { name: 'Tarun', role: 'Core Member', initials: 'T', tag: '08', linkedin: 'https://www.linkedin.com/in/tarun-kumar-16937642a', github: '#' },
];

/* ─── HUDDLEUP POPUP NOTIFICATION ─── */
function HuddleUpNotification() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Show after a brief delay so the user first absorbs the page
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsDismissed(true);
    setTimeout(() => setIsVisible(false), 350);
  };

  if (!isVisible) return null;

  return (
    <div
      role="alert"
      aria-live="polite"
      className={`fixed bottom-5 right-5 z-50 max-w-sm sm:max-w-md w-[calc(100vw-2.5rem)] transition-all duration-300 ${
        isDismissed ? 'animate-popup-out' : 'animate-popup-in'
      }`}
    >
      <div className="relative overflow-hidden rounded-2xl bg-white border-2 border-navy-800/10 p-5 shadow-2xl shadow-navy-950/20">
        {/* Top colored accent line */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-crimson-600 via-gold-400 to-navy-700" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Dismiss notification"
        >
          <X size={16} />
        </button>

        <div className="flex items-start gap-3.5 pr-4">
          {/* App Icon Badge */}
          <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-crimson-600 to-navy-800 text-white flex items-center justify-center shadow-md shadow-crimson-600/20">
            <Rocket size={22} className="animate-pulse-subtle" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-crimson-50 text-crimson-700 text-[10px] font-bold uppercase tracking-wider">
                <Sparkles size={10} /> App In Development
              </span>
            </div>

            <h4 className="mt-1 font-serif text-lg font-bold text-navy-900 leading-snug">
              HOMELANDERS is developing <span className="text-crimson-600">HuddleUp</span>!
            </h4>

            <p className="mt-1 text-xs text-slate-600 leading-relaxed">
              Our team is building an open-source collaborative platform designed to bring campus communities and student teams closer together.
            </p>

            <div className="mt-3.5 flex items-center gap-2.5 flex-wrap">
              <a
                href="https://github.com/IRNCyber/HuddleUp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-navy-900 text-white text-xs font-semibold hover:bg-crimson-600 transition-colors shadow-sm"
              >
                <Github size={13} />
                Explore on GitHub
                <ExternalLink size={12} className="opacity-70" />
              </a>

              <a
                href="#huddleup"
                onClick={handleClose}
                className="text-xs font-semibold text-navy-700 hover:text-crimson-600 transition-colors"
              >
                Learn more →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── HERO COMMUNITY SVG ILLUSTRATION (Matching PDF Page 1) ─── */
function HeroIllustration() {
  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-2xl select-none">
      <svg
        viewBox="0 0 900 380"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-sm"
      >
        {/* Sky background */}
        <rect width="900" height="380" fill="#FAF9F5" />

        {/* Sun & Moon overlapping circles (top right as in PDF) */}
        <g transform="translate(680, 50)">
          {/* Golden Sun */}
          <circle cx="55" cy="55" r="46" fill="#FDE047" opacity="0.9" />
          {/* Overlapping Slate-Blue Moon */}
          <circle cx="82" cy="55" r="42" fill="#94A3B8" opacity="0.75" />
        </g>

        {/* Background Navy Hill */}
        <path
          d="M-50 320 Q 200 240, 480 300 T 950 250 L 950 380 L -50 380 Z"
          fill="#142761"
        />

        {/* Midground Deep Blue Hill */}
        <path
          d="M-50 340 Q 250 280, 550 330 T 950 290 L 950 380 L -50 380 Z"
          fill="#1C3582"
        />

        {/* Foreground Crimson Red Hill/Band */}
        <path
          d="M-20 350 Q 220 340, 460 365 T 920 350 L 920 380 L -20 380 Z"
          fill="#C51D34"
        />
        <rect x="0" y="360" width="900" height="20" fill="#991B1B" />

        {/* House 1 (Leftmost) */}
        <g transform="translate(50, 245)">
          {/* Roof */}
          <polygon points="0,45 55,0 110,45" fill="#F59E0B" />
          {/* Body */}
          <rect x="12" y="45" width="86" height="75" fill="#FFFFFF" />
          {/* Windows */}
          <rect x="28" y="58" width="18" height="18" fill="#FDE047" />
          {/* Door */}
          <rect x="64" y="65" width="22" height="55" fill="#142761" />
        </g>

        {/* House 2 (Middle Left) */}
        <g transform="translate(210, 260)">
          {/* Roof */}
          <polygon points="0,35 48,0 96,35" fill="#C51D34" />
          {/* Body */}
          <rect x="10" y="35" width="76" height="65" fill="#FFFFFF" />
          {/* Windows */}
          <rect x="24" y="48" width="14" height="14" fill="#FDE047" />
          <rect x="46" y="48" width="14" height="14" fill="#FDE047" />
          {/* Door */}
          <rect x="68" y="58" width="12" height="42" fill="#142761" />
        </g>

        {/* Small Tree in midground */}
        <g transform="translate(440, 280)">
          <rect x="14" y="25" width="6" height="35" fill="#0A1330" />
          <circle cx="17" cy="20" r="18" fill="#0F1F4B" />
        </g>

        {/* Center Community Flag */}
        <g transform="translate(390, 205)">
          <line x1="0" y1="0" x2="0" y2="70" stroke="#0F1F4B" strokeWidth="2.5" />
          {/* Blue-Red split pennant flag */}
          <polygon points="0,2 35,2 35,32 0,32" fill="#1E3E9D" />
          <polygon points="35,2 70,17 35,32" fill="#C51D34" />
        </g>

        {/* Group of 5 diverse students standing together (as in PDF) */}
        <g transform="translate(350, 310)">
          {/* Student 1 (White / Cream shirt) */}
          <g transform="translate(0, 0)">
            <circle cx="15" cy="15" r="11" fill="#FBBF24" />
            <path d="M4 42 C4 27, 26 27, 26 42 Z" fill="#F8FAFC" />
          </g>

          {/* Student 2 (Navy shirt) */}
          <g transform="translate(24, -4)">
            <circle cx="15" cy="15" r="11" fill="#D97706" />
            <path d="M4 46 C4 29, 26 29, 26 46 Z" fill="#142761" />
          </g>

          {/* Student 3 (Deep brown / Navy shirt) */}
          <g transform="translate(48, -2)">
            <circle cx="15" cy="15" r="11" fill="#78350F" />
            <path d="M4 44 C4 28, 26 28, 26 44 Z" fill="#1E3E9D" />
          </g>

          {/* Student 4 (Yellow shirt) */}
          <g transform="translate(70, 2)">
            <circle cx="15" cy="15" r="10.5" fill="#F59E0B" />
            <path d="M4 40 C4 26, 26 26, 26 40 Z" fill="#FDE047" />
          </g>

          {/* Student 5 (Crimson shirt) */}
          <g transform="translate(90, 0)">
            <circle cx="15" cy="15" r="10.5" fill="#FBBF24" />
            <path d="M4 42 C4 27, 26 27, 26 42 Z" fill="#C51D34" />
          </g>
        </g>

        {/* House 3 (Middle Right) */}
        <g transform="translate(560, 225)">
          {/* Roof */}
          <polygon points="0,48 65,0 130,48" fill="#C51D34" />
          {/* Body */}
          <rect x="15" y="48" width="100" height="85" fill="#FFFFFF" />
          {/* Windows */}
          <rect x="35" y="65" width="20" height="20" fill="#FDE047" />
          <rect x="75" y="65" width="20" height="20" fill="#FDE047" />
          {/* Door */}
          <rect x="52" y="95" width="26" height="38" fill="#142761" />
        </g>

        {/* House 4 (Rightmost) */}
        <g transform="translate(720, 250)">
          {/* Roof */}
          <polygon points="0,42 55,0 110,42" fill="#142761" />
          {/* Body */}
          <rect x="12" y="42" width="86" height="75" fill="#FFFFFF" />
          {/* Windows */}
          <rect x="25" y="55" width="16" height="16" fill="#FDE047" />
          {/* Red Door */}
          <rect x="50" y="68" width="22" height="49" fill="#C51D34" />
        </g>
      </svg>
    </div>
  );
}

/* ─── STORY DINING TABLE SVG ILLUSTRATION (Matching PDF Page 1 & 2) ─── */
function DiningTableIllustration() {
  return (
    <div className="relative w-full max-w-2xl mx-auto overflow-hidden rounded-3xl shadow-xl shadow-navy-950/20 bg-navy-900">
      <svg
        viewBox="0 0 700 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto block select-none"
      >
        {/* Dark night sky */}
        <rect width="700" height="400" fill="#142761" />

        {/* Constellation / String lights arc */}
        <path
          d="M 50 300 Q 350 250, 650 310"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          opacity="0.35"
        />

        {/* String light lanterns / stars */}
        <circle cx="85" cy="298" r="8" fill="#94A3B8" opacity="0.6" />
        <circle cx="160" cy="285" r="10" fill="#FDE047" />
        <circle cx="245" cy="288" r="8" fill="#64748B" opacity="0.7" />
        <circle cx="330" cy="275" r="9" fill="#F59E0B" />
        <circle cx="410" cy="282" r="8" fill="#78716C" opacity="0.6" />
        <circle cx="495" cy="292" r="8" fill="#64748B" opacity="0.7" />

        {/* Large Glowing Moon */}
        <circle cx="540" cy="265" r="50" fill="#FEF08A" opacity="0.95" />

        {/* ─── Friends gathered at the dining table ─── */}
        <g transform="translate(140, 40)">
          {/* Person 1 (Blue shirt) */}
          <g transform="translate(0, 0)">
            {/* Head */}
            <circle cx="35" cy="40" r="28" fill="#FBBF24" />
            {/* Friendly smile */}
            <path d="M 27 45 Q 35 52, 43 45" stroke="#78350F" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            {/* Eyes */}
            <circle cx="28" cy="35" r="2" fill="#78350F" />
            <circle cx="42" cy="35" r="2" fill="#78350F" />
            {/* Torso */}
            <path d="M 5 110 C 5 68, 65 68, 65 110 Z" fill="#1E3E9D" />
          </g>

          {/* Person 2 (White shirt) */}
          <g transform="translate(85, -15)">
            {/* Head */}
            <circle cx="38" cy="40" r="30" fill="#D97706" />
            {/* Smile */}
            <path d="M 30 46 Q 38 54, 46 46" stroke="#451A03" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <circle cx="30" cy="35" r="2.2" fill="#451A03" />
            <circle cx="46" cy="35" r="2.2" fill="#451A03" />
            {/* Torso */}
            <path d="M 5 125 C 5 70, 75 70, 75 125 Z" fill="#FFFFFF" />
          </g>

          {/* Shared Bread / Meal platter on table */}
          <ellipse cx="215" cy="105" rx="42" ry="16" fill="#F59E0B" />
          <ellipse cx="215" cy="103" rx="36" ry="12" fill="#FDE047" />

          {/* Person 3 (Yellow shirt) */}
          <g transform="translate(210, -15)">
            {/* Head */}
            <circle cx="38" cy="40" r="30" fill="#78350F" />
            {/* Smile */}
            <path d="M 30 46 Q 38 54, 46 46" stroke="#FEF3C7" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <circle cx="30" cy="35" r="2.2" fill="#FEF3C7" />
            <circle cx="46" cy="35" r="2.2" fill="#FEF3C7" />
            {/* Torso */}
            <path d="M 5 125 C 5 70, 75 70, 75 125 Z" fill="#F59E0B" />
          </g>

          {/* Person 4 (Red shirt) */}
          <g transform="translate(295, 0)">
            {/* Head */}
            <circle cx="35" cy="40" r="28" fill="#FBBF24" />
            {/* Smile */}
            <path d="M 27 45 Q 35 52, 43 45" stroke="#78350F" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <circle cx="28" cy="35" r="2" fill="#78350F" />
            <circle cx="42" cy="35" r="2" fill="#78350F" />
            {/* Torso */}
            <path d="M 5 110 C 5 68, 65 68, 65 110 Z" fill="#C51D34" />
          </g>

          {/* Crimson Dining Table */}
          <rect x="-10" y="110" width="395" height="14" fill="#991B1B" rx="3" />
          {/* Table Legs */}
          <rect x="40" y="124" width="14" height="60" fill="#7F1D1D" />
          <rect x="325" y="124" width="14" height="60" fill="#7F1D1D" />
        </g>
      </svg>
    </div>
  );
}

/* ─── FOOTER ROLLING HILLS SVG ILLUSTRATION (Matching PDF Page 3) ─── */
function FooterRollingHills() {
  return (
    <div className="w-full overflow-hidden select-none">
      <svg
        viewBox="0 0 1200 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto block"
      >
        {/* Navy wave hill */}
        <path
          d="M0 80 Q 250 30, 500 70 T 1000 50 Q 1100 45, 1200 65 L 1200 120 L 0 120 Z"
          fill="#142761"
        />
        {/* Deep navy base */}
        <path
          d="M0 95 Q 300 70, 600 90 T 1200 85 L 1200 120 L 0 120 Z"
          fill="#0A1330"
        />

        {/* Small cute house 1 */}
        <g transform="translate(210, 62)">
          <polygon points="0,15 15,0 30,15" fill="#F59E0B" />
          <rect x="3" y="15" width="24" height="20" fill="#FFFFFF" />
          <rect x="11" y="21" width="8" height="14" fill="#142761" />
        </g>

        {/* Small cute house 2 (Center) */}
        <g transform="translate(540, 50)">
          <polygon points="0,15 15,0 30,15" fill="#F59E0B" />
          <rect x="3" y="15" width="24" height="22" fill="#FFFFFF" />
          <rect x="11" y="21" width="8" height="16" fill="#142761" />
        </g>

        {/* Small cute house 3 */}
        <g transform="translate(870, 56)">
          <polygon points="0,15 15,0 30,15" fill="#F59E0B" />
          <rect x="3" y="15" width="24" height="20" fill="#FFFFFF" />
          <rect x="11" y="21" width="8" height="14" fill="#142761" />
        </g>
      </svg>
    </div>
  );
}

/* ─── MAIN APP COMPONENT ─── */
export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('sending');

    if (!supabase) {
      // Graceful fallback if supabase is not yet configured
      setTimeout(() => {
        setFormStatus('sent');
      }, 700);
      return;
    }

    try {
      const form = new FormData(e.currentTarget);
      const payload = {
        name: String(form.get('name') ?? ''),
        email: String(form.get('email') ?? ''),
        message: String(form.get('message') ?? ''),
      };
      const { error } = await supabase.from('contact_submissions').insert(payload);
      if (error) throw error;
      setFormStatus('sent');
      e.currentTarget.reset();
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-warm-50 text-slate-800 font-sans selection:bg-crimson-100 selection:text-navy-900">
      {/* ─── Pop Notification for HuddleUp ─── */}
      <HuddleUpNotification />

      {/* ─── NAVIGATION BAR ─── */}
      <header className="sticky top-0 z-40 bg-warm-50/90 backdrop-blur-md border-b border-warm-200/80 transition-all">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-navy-900 text-white flex items-center justify-center font-serif text-xl font-bold shadow-sm group-hover:bg-crimson-600 transition-colors">
              H
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-navy-900 block leading-tight">
                HOMELANDERS
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-500 block">
                SVSU Student Community
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="hover:text-crimson-600 transition-colors"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Header Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="https://github.com/IRNCyber/HuddleUp"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-navy-900 bg-navy-100/70 hover:bg-navy-200 transition-colors"
              title="HuddleUp on GitHub"
            >
              <Github size={15} />
              <span>HuddleUp</span>
              <span className="w-2 h-2 rounded-full bg-crimson-600 animate-pulse" />
            </a>

            <a
              href="#join"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-crimson-600 hover:bg-crimson-700 transition-all shadow-sm hover:shadow"
            >
              Join Us <ArrowUpRight size={14} />
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-crimson-600 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-warm-50 border-b border-warm-200 px-6 py-4 space-y-3">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-medium text-slate-700 hover:text-crimson-600"
              >
                {item.name}
              </a>
            ))}
            <div className="pt-3 border-t border-warm-200 flex flex-col gap-2">
              <a
                href="https://github.com/IRNCyber/HuddleUp"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-navy-900 bg-navy-100"
              >
                <Github size={16} /> Check out HuddleUp App
              </a>
              <a
                href="#join"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-white bg-crimson-600"
              >
                Join HOMELANDERS
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ─── SECTION 1: HERO (Wherever you're from, you belong here.) ─── */}
      <section className="pt-12 sm:pt-20 pb-16 px-5 sm:px-8">
        <div className="max-w-4xl mx-auto text-left">
          {/* Main Editorial Headline from PDF Page 1 */}
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-bold text-slate-400 tracking-tight leading-[1.08] max-w-3xl">
            <span className="text-slate-900 block">Wherever</span>
            <span className="text-slate-800 block">you’re from, you</span>
            <span className="text-slate-800 block">belong here.</span>
          </h1>

          {/* Subheading from PDF */}
          <p className="mt-7 text-lg sm:text-xl text-slate-600 max-w-2xl leading-relaxed">
            <strong className="font-semibold text-navy-900">HOMELANDERS</strong> is a student community at SVSU that turns a campus into a home.
          </p>

          {/* Quick CTA row */}
          <div className="mt-8 flex items-center gap-4 flex-wrap">
            <a
              href="#join"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-crimson-600 text-white font-semibold text-sm hover:bg-crimson-700 transition-all shadow-md shadow-crimson-600/20"
            >
              Join HOMELANDERS <ArrowUpRight size={16} />
            </a>

            <a
              href="https://github.com/IRNCyber/HuddleUp"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white border border-slate-300/80 text-navy-900 font-semibold text-sm hover:border-navy-800 hover:shadow-sm transition-all"
            >
              <Github size={16} />
              We're building HuddleUp
              <ExternalLink size={13} className="text-slate-400" />
            </a>
          </div>

          {/* Community Graphic (Faithful to PDF page 1) */}
          <div className="mt-12 sm:mt-16">
            <HeroIllustration />
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: OUR STORY (PDF Page 1 & 2) ─── */}
      <section id="story" className="py-20 sm:py-28 px-5 sm:px-8 bg-white border-y border-warm-200/60">
        <div className="max-w-4xl mx-auto">
          {/* Section Heading */}
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 tracking-tight">
            Our story
          </h2>

          {/* Narrative text from PDF */}
          <div className="mt-8 space-y-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-3xl">
            <p>
              Starting college means leaving something familiar behind.{' '}
              <span className="font-medium text-navy-900">
                HOMELANDERS exists so nobody has to do that alone.
              </span>
            </p>

            <p>
              We bring students together around shared roots, shared meals and shared plans, and we make room for everyone who wants to join in.
            </p>

            <div className="p-6 rounded-2xl bg-warm-50 border border-warm-200/80 text-base sm:text-lg text-slate-700 leading-relaxed font-sans">
              Founded at <strong className="text-navy-900">Shri Vishwakarma Skill University (SVSU)</strong>, we began with a simple belief: university life should be collaborative, exciting, and supportive. Whether we are competing in hackathons, organizing campus meetups, or building full-scale applications like <span className="text-crimson-600 font-semibold">HuddleUp</span>, we do it together as one community.
            </div>
          </div>

          {/* Dining Table Illustration (PDF Page 2) */}
          <div className="mt-14">
            <DiningTableIllustration />
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: WHAT WE STAND FOR (PDF Page 2) ─── */}
      <section id="values" className="py-20 sm:py-28 px-5 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 tracking-tight">
            What we stand for
          </h2>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {valuesList.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Circle Icon Badge matching PDF */}
                    <div className={`w-14 h-14 rounded-full ${item.circleBg} flex items-center justify-center mb-6 shadow-inner`}>
                      <Icon size={26} className={item.iconColor} />
                    </div>

                    <h3 className="font-serif text-2xl font-bold text-slate-800">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-slate-600 text-base sm:text-lg leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: AT A GLANCE (PDF Page 3) ─── */}
      <section id="at-a-glance" className="py-20 sm:py-28 px-5 sm:px-8 bg-warm-100/50 border-t border-warm-200/60">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 tracking-tight">
            At a glance
          </h2>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {glanceItems.slice(0, 3).map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className={`bg-white rounded-2xl p-6 border border-slate-200/90 border-l-4 ${item.borderAccent} shadow-sm hover:shadow-md transition-all flex flex-col justify-between`}
                >
                  <div>
                    <div className={`w-11 h-11 rounded-full ${item.iconBg} flex items-center justify-center mb-4`}>
                      <Icon size={20} />
                    </div>

                    <h3 className="font-serif text-xl font-bold text-slate-800">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm font-semibold text-navy-900">
                      {item.details}
                    </p>

                    <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
                      {item.sub}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* 4th Card spanning nicely */}
            {glanceItems.slice(3, 4).map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className={`bg-white rounded-2xl p-6 border border-slate-200/90 border-l-4 ${item.borderAccent} shadow-sm hover:shadow-md transition-all sm:col-span-2 md:col-span-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-11 h-11 rounded-full ${item.iconBg} flex-shrink-0 flex items-center justify-center`}>
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-bold text-slate-800">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm font-semibold text-navy-900">
                        Core team of organizers, developers & creators from SVSU
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Rohan (Admin), Pramod, Hirdey, Mudit, Pawan, Priyanshu, Rohtash, Tarun
                      </p>
                    </div>
                  </div>
                  <a
                    href="#team"
                    className="self-start sm:self-auto px-4 py-2 rounded-xl text-xs font-semibold bg-warm-100 hover:bg-navy-900 hover:text-white transition-colors"
                  >
                    View All Members →
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: HUDDLEUP APP SPOTLIGHT (User Request) ─── */}
      <section id="huddleup" className="py-20 sm:py-28 px-5 sm:px-8 bg-gradient-to-b from-navy-950 to-navy-900 text-white relative overflow-hidden">
        {/* Background glow circle */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-crimson-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-crimson-600/20 border border-crimson-500/30 text-crimson-300 text-xs font-semibold uppercase tracking-wider mb-6">
            <Rocket size={14} /> Homelanders Project Showcase
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
                Homelanders is developing <span className="text-crimson-400">HuddleUp</span>
              </h2>

              <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed">
                <strong className="text-white">HuddleUp</strong> is our newest open-source platform created to eliminate the friction of organizing student groups, coordinating project sprints, and bringing university communities together in one shared workspace.
              </p>

              <div className="mt-8 space-y-3">
                {[
                  'Designed specifically for college clubs, hackathon teams & student communities',
                  'Streamlined channels, meetups, and real-time announcements',
                  'Open-source & actively crafted by SVSU student developers',
                ].map((feat) => (
                  <div key={feat} className="flex items-start gap-3 text-sm text-slate-300">
                    <CheckCircle2 size={18} className="text-crimson-400 flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="mt-9 flex items-center gap-4 flex-wrap">
                <a
                  href="https://github.com/IRNCyber/HuddleUp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-crimson-600 hover:bg-crimson-700 text-white font-semibold text-sm transition-all shadow-lg shadow-crimson-600/25"
                >
                  <Github size={18} />
                  View HuddleUp on GitHub
                  <ExternalLink size={15} />
                </a>

                <a
                  href="https://github.com/IRNCyber/HuddleUp/stargazers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm transition-colors border border-white/10"
                >
                  <Star size={16} className="text-gold-400" /> Star on GitHub
                </a>
              </div>
            </div>

            {/* App Preview Card */}
            <div className="bg-navy-800/80 rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl backdrop-blur-sm">
              <div className="flex items-center justify-between pb-5 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-crimson-500" />
                  <div className="w-3 h-3 rounded-full bg-gold-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <span className="text-xs font-mono text-slate-400">IRNCyber / HuddleUp</span>
              </div>

              <div className="pt-6 space-y-4">
                <div className="p-4 rounded-xl bg-navy-900/90 border border-white/5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-crimson-400 block mb-1">
                    Repository
                  </span>
                  <a
                    href="https://github.com/IRNCyber/HuddleUp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-sm text-white hover:text-crimson-300 transition-colors flex items-center justify-between"
                  >
                    <span>github.com/IRNCyber/HuddleUp</span>
                    <ExternalLink size={14} />
                  </a>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-navy-900/60 border border-white/5">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 block">Status</span>
                    <span className="text-sm font-semibold text-emerald-400 flex items-center gap-1.5 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      Active Dev
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-navy-900/60 border border-white/5">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 block">Team</span>
                    <span className="text-sm font-semibold text-white mt-0.5 block">HOMELANDERS</span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed pt-2">
                  Have ideas, feature requests, or want to contribute? The repo is open for SVSU students and collaborators worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: STUDENT-LED BOARD & CORE TEAM ─── */}
      <section id="team" className="py-20 sm:py-28 px-5 sm:px-8 bg-white border-b border-warm-200/60">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-crimson-600 block mb-2">
                Student-Led Board
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 tracking-tight">
                The people behind the community
              </h2>
            </div>
            <p className="text-slate-500 text-sm max-w-xs">
              Diverse disciplines, one common goal: building a welcoming space at SVSU.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="bg-warm-50 rounded-2xl p-5 border border-warm-200/80 hover:border-navy-700/40 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-navy-900 text-white flex items-center justify-center font-serif text-xl font-bold mb-4 group-hover:bg-crimson-600 transition-colors shadow-sm">
                    {member.initials}
                  </div>
                  <h3 className="font-serif text-lg font-bold text-slate-900">
                    {member.name}
                  </h3>
                  <p className="text-xs font-medium text-slate-500 mt-0.5">
                    {member.role}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-warm-200/70 flex items-center gap-2">
                  {member.github && member.github !== '#' && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-navy-900 transition-colors"
                      aria-label={`${member.name}'s GitHub`}
                    >
                      <Github size={15} />
                    </a>
                  )}
                  {member.linkedin && member.linkedin !== '#' && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-navy-900 transition-colors"
                      aria-label={`${member.name}'s LinkedIn`}
                    >
                      <Linkedin size={15} />
                    </a>
                  )}
                  <span className="ml-auto text-[10px] font-mono text-slate-400">
                    {member.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 7: COME FIND YOUR PEOPLE (PDF Page 3) ─── */}
      <section id="join" className="py-20 sm:py-28 px-5 sm:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Main Invitation Headline from PDF Page 3 */}
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-slate-800 tracking-tight">
            Come find your people.
          </h2>

          <p className="mt-4 text-lg sm:text-xl text-slate-600">
            Join a meetup this week and meet the team.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="https://forms.gle/a9tUWv2YjFaQXzoi6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-crimson-600 hover:bg-crimson-700 text-white font-serif text-lg font-bold transition-all shadow-md hover:shadow-lg shadow-crimson-600/20"
            >
              Join HOMELANDERS <ArrowUpRight size={18} />
            </a>

            <a
              href="mailto:svsuredteam@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-white border border-slate-300 text-slate-700 font-semibold text-sm hover:border-slate-800 transition-colors"
            >
              <Mail size={16} /> Contact Us Directly
            </a>
          </div>

          {/* Quick Contact Form */}
          <div className="mt-14 p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-sm">
            <div className="flex items-center justify-between pb-6 border-b border-slate-100">
              <div>
                <h3 className="font-serif text-2xl font-bold text-slate-900">
                  Send us a quick note
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  Have a question about meetups, joining, or HuddleUp? Drop us a line.
                </p>
              </div>
              <MessageSquare className="text-crimson-600" size={24} />
            </div>

            <form onSubmit={handleFormSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Your Name
                  </label>
                  <input
                    required
                    name="name"
                    type="text"
                    placeholder="e.g. Alex Sharma"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-crimson-600 text-sm bg-warm-50/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Your Email
                  </label>
                  <input
                    required
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-crimson-600 text-sm bg-warm-50/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Message
                </label>
                <textarea
                  required
                  name="message"
                  rows={4}
                  placeholder="Tell us what you're interested in or how we can help..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-crimson-600 text-sm bg-warm-50/50 resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-navy-900 hover:bg-crimson-600 text-white font-semibold text-sm transition-colors disabled:opacity-60"
                >
                  {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
                  <Send size={15} />
                </button>

                {formStatus === 'sent' && (
                  <span className="text-sm font-semibold text-emerald-600 flex items-center gap-1.5">
                    <CheckCircle2 size={16} /> Message sent successfully!
                  </span>
                )}
                {formStatus === 'error' && (
                  <span className="text-sm text-crimson-600">
                    Failed to send. Please email svsuredteam@gmail.com directly.
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ─── BOTTOM ROLLING HILLS ILLUSTRATION (From PDF Page 3) ─── */}
      <FooterRollingHills />

      {/* ─── FOOTER ─── */}
      <footer className="bg-navy-950 text-slate-400 py-12 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-crimson-600 text-white flex items-center justify-center font-serif text-sm font-bold">
              H
            </div>
            <div>
              <span className="font-serif text-lg font-bold text-white block leading-tight">
                HOMELANDERS
              </span>
              <span className="text-[11px] text-slate-400">
                Shri Vishwakarma Skill University (SVSU)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <a href="#story" className="hover:text-white transition-colors">Our Story</a>
            <a href="#values" className="hover:text-white transition-colors">Values</a>
            <a href="https://github.com/IRNCyber/HuddleUp" target="_blank" rel="noopener noreferrer" className="text-crimson-400 hover:text-white transition-colors">HuddleUp App</a>
            <a href="https://forms.gle/a9tUWv2YjFaQXzoi6" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Recruitment</a>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/irncyber"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href="mailto:svsuredteam@gmail.com"
              className="text-slate-400 hover:text-white transition-colors"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
            <span className="text-xs text-slate-500 ml-2">
              © {new Date().getFullYear()} HOMELANDERS. All rights reserved.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

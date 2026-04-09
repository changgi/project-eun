'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap, ScrollToPlugin } from '@/lib/gsap';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { navLinks } from '@/data/content';

export default function Navigation() {
  const { scrollDirection, scrollY } = useScrollDirection();
  const [activeSection, setActiveSection] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroHeight, setHeroHeight] = useState(0);

  useEffect(() => {
    setHeroHeight(window.innerHeight);
    const onResize = () => setHeroHeight(window.innerHeight);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const isHidden = scrollDirection === 'down' && scrollY > 100;
  const hasScrolled = scrollY > 50;
  const isInHero = heroHeight > 0 && scrollY < heroHeight;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );

    navLinks.forEach((link) => {
      const el = document.getElementById(link.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      gsap.to(window, {
        scrollTo: { y: el, offsetY: 80 },
        duration: 1.2,
        ease: 'power2.inOut',
      });
      setMenuOpen(false);
    }
  };

  // In hero: white text. After scroll: dark text.
  const useWhite = isInHero && !hasScrolled;

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: hasScrolled ? 'rgba(255,255,255,0.98)' : 'transparent',
          borderBottom: hasScrolled ? '1px solid #e0ddd8' : '1px solid transparent',
          transition: 'background-color 0.3s ease, border-color 0.3s ease',
        }}
        animate={{ y: isHidden ? '-100%' : '0%' }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-[1200px] mx-auto flex items-center justify-between px-6 lg:px-12 h-16">
          {/* Logo */}
          <button
            onClick={() => gsap.to(window, { scrollTo: { y: 0 }, duration: 1.2, ease: 'power2.inOut' })}
            className="heading-serif text-[15px] transition-colors duration-300"
            style={{ color: useWhite ? '#ffffff' : '#222222' }}
          >
            은평구시설관리공단
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="relative text-[14px] font-medium tracking-wide transition-colors duration-200 pb-1"
                  style={{
                    color: isActive
                      ? (useWhite ? '#ffffff' : '#222222')
                      : (useWhite ? 'rgba(255,255,255,0.55)' : '#999999'),
                  }}
                >
                  {link.label}
                  {/* Active underline */}
                  <span
                    className="absolute bottom-0 left-0 right-0 h-px transition-opacity duration-200"
                    style={{
                      backgroundColor: useWhite ? '#ffffff' : '#222222',
                      opacity: isActive ? 1 : 0,
                    }}
                  />
                </button>
              );
            })}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-6 h-5 relative z-[101]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              className="block absolute left-0 w-full h-px"
              style={{ backgroundColor: menuOpen ? '#222222' : (useWhite ? '#ffffff' : '#222222') }}
              animate={menuOpen ? { rotate: 45, top: '50%' } : { rotate: 0, top: '0%' }}
            />
            <motion.span
              className="block absolute left-0 w-full h-px top-1/2"
              style={{ backgroundColor: menuOpen ? '#222222' : (useWhite ? '#ffffff' : '#222222') }}
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            />
            <motion.span
              className="block absolute left-0 w-full h-px"
              style={{ backgroundColor: menuOpen ? '#222222' : (useWhite ? '#ffffff' : '#222222') }}
              animate={menuOpen ? { rotate: -45, top: '50%' } : { rotate: 0, top: '100%' }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Full-screen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center bg-white md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="heading-serif text-xl transition-colors duration-200"
                  style={{
                    color: activeSection === link.id ? '#222222' : '#999999',
                  }}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

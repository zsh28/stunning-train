import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { GoArrowUpRight } from 'react-icons/go';
import { WalletButton } from './solana/solana-provider';
import { ClusterUiSelect } from './cluster/cluster-ui';

type CardNavLink = {
  label: string;
  href: string;
  ariaLabel: string;
};

export type CardNavItem = {
  label: string;
  bgColor: string;
  textColor: string;
  links: CardNavLink[];
};

export interface CardNavProps {
  logo: string;
  logoAlt?: string;
  items: CardNavItem[];
  className?: string;
  ease?: string;
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
}

const CardNav: React.FC<CardNavProps> = ({
  logo,
  logoAlt = 'Logo',
  items,
  className = '',
  ease = 'power3.out',
  baseColor = '#fff',
  menuColor,
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 60;

    const contentEl = navEl.querySelector('.card-nav-content') as HTMLElement;
    if (contentEl) {
      const wasVisible = contentEl.style.visibility;
      const wasPointerEvents = contentEl.style.pointerEvents;
      const wasPosition = contentEl.style.position;
      const wasHeight = contentEl.style.height;

      contentEl.style.visibility = 'visible';
      contentEl.style.pointerEvents = 'auto';
      contentEl.style.position = 'static';
      contentEl.style.height = 'auto';

      void contentEl.offsetHeight;

      const topBar = 60;
      const padding = 16;
      const contentHeight = contentEl.scrollHeight;

      contentEl.style.visibility = wasVisible;
      contentEl.style.pointerEvents = wasPointerEvents;
      contentEl.style.position = wasPosition;
      contentEl.style.height = wasHeight;

      return topBar + contentHeight + padding;
    }
    return 60;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.4,
      ease
    });

    tl.to(cardsRef.current, { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 }, '-=0.1');

    return tl;
  };

  useLayoutEffect(() => {
    if (navRef.current) {
      gsap.set(navRef.current, { height: 60, overflow: 'visible' });
    }
    if (cardsRef.current.length) {
      gsap.set(cardsRef.current, { y: 50, opacity: 0 });
    }

    const tl = createTimeline();
    tlRef.current = tl;

    return () => {
      tl?.kill();
      tlRef.current = null;
    };
  }, [ease, items]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;

      if (window.matchMedia('(min-width: 768px)').matches && isExpanded) {
        setIsHamburgerOpen(false);
        setIsExpanded(false);
        gsap.set(navRef.current, { height: 60 });
        return;
      }

      if (isExpanded) {
        const newHeight = calculateHeight();
        gsap.to(navRef.current, { height: newHeight, duration: 0.2 });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isExpanded]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
      tl.reverse();
    }
  };

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[i] = el;
  };

  const allLinks = items.flatMap((item) => item.links);

  return (
    <div
      className={`card-nav-container absolute left-1/2 -translate-x-1/2 w-[95%] max-w-[1200px] z-50 top-[1.2em] md:top-[2em] ${className}`}
    >
      <nav
        ref={navRef}
        className={`card-nav ${isExpanded ? 'open' : ''} block h-[60px] p-0 rounded-xl shadow-md relative will-change-[height] backdrop-blur-md border border-white/10`}
        style={{ backgroundColor: baseColor }}
      >
        <div className="card-nav-top absolute inset-x-0 top-0 h-[60px] flex items-center justify-between p-2 pl-[1.1rem] z-2">
          <div
            className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''} md:hidden group h-full flex flex-col items-center justify-center cursor-pointer gap-1.5 order-1`}
            onClick={toggleMenu}
            role="button"
            aria-label={isExpanded ? 'Close menu' : 'Open menu'}
            tabIndex={0}
            style={{ color: menuColor || '#fff' }}
          >
            <div
              className={`hamburger-line w-6 h-0.5 bg-current transition-[transform,opacity,margin] duration-300 ease-linear origin-[50%_50%] ${
                isHamburgerOpen ? 'translate-y-1 rotate-45' : ''
              } group-hover:opacity-75`}
            />
            <div
              className={`hamburger-line w-6 h-0.5 bg-current transition-[transform,opacity,margin] duration-300 ease-linear origin-[50%_50%] ${
                isHamburgerOpen ? '-translate-y-1 -rotate-45' : ''
              } group-hover:opacity-75`}
            />
          </div>

          <div className="logo-container flex items-center order-2 md:order-1 md:mr-6">
            <img src={logo} alt={logoAlt} className="logo h-7" />
          </div>

          <div className="hidden md:flex nav-links items-center gap-6 mr-auto order-2">
            {allLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="text-white font-medium hover:opacity-75 whitespace-nowrap transition-opacity text-sm md:text-base"
                aria-label={link.ariaLabel}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0 order-3">
            <WalletButton />
            <div className="hidden md:block">
              <ClusterUiSelect />
            </div>
          </div>
        </div>

        <div
          className={`card-nav-content absolute left-0 right-0 top-[60px] bottom-0 p-2 flex flex-col items-stretch gap-2 justify-start z-1 ${
            isExpanded ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
          } md:hidden`}
          aria-hidden={!isExpanded}
        >
          <div className="flex flex-col gap-2 p-2">
            {allLinks.map((link, i) => (
              <div key={i} ref={setCardRef(i)} className="bg-white/5 rounded-lg p-3">
                <a
                  href={link.href}
                  className="text-white font-medium flex items-center justify-between"
                  aria-label={link.ariaLabel}
                >
                  {link.label}
                  <GoArrowUpRight />
                </a>
              </div>
            ))}
            <div ref={setCardRef(allLinks.length)} className="mt-2 flex justify-center">
              <ClusterUiSelect />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default CardNav;

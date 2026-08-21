import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

import Header from './Header';
import Footer from './Footer';
import StickyCta from './StickyCta';
import JsonLd from './ui/JsonLd';

function Layout({ children }) {
  return (
    <div
      className="flex min-h-svh flex-col bg-surface-alt"
      style={{ paddingBottom: "var(--sticky-cta-h, 0px)" }}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent-600 focus:px-4 focus:py-2 focus:text-body focus:font-medium focus:text-white"
      >
        Ir al contenido
      </a>
      <Header />
      <main id="main-content" tabIndex={-1} className="grow">
        {children}
      </main>
      <Footer />
      <StickyCta />
      <JsonLd />
      <Analytics />
      <SpeedInsights />
    </div>
  );
}

export default Layout;
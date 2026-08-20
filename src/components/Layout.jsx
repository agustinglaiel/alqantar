import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

import Header from './Header';
import Footer from './Footer';
import StickyCta from './StickyCta';

function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-surface-alt">
      <Header />
      <main className="grow">{children}</main>
      <Footer />
      <StickyCta />
      <Analytics />
      <SpeedInsights />
    </div>
  );
}

export default Layout;
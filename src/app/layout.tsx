import type { Metadata } from 'next';
import './globals.css';
import { WolfDataProvider } from '@/context/WolfDataContext';
import { DemoNoticeBar } from '@/components/common/DemoDisclaimerModal';
import { ToastContainer } from '@/components/ui/ToastContainer';

export const metadata: Metadata = {
  title: 'WOLF MOTORS | Built to Dominate — Luxury Automotive Platform',
  description:
    'Singapore premier luxury automotive and mobility platform. Supercars, executive saloons, grand tourers, and electrified performance fleet. Built to Dominate.',
  keywords: [
    'Wolf Motors',
    'Built to Dominate',
    'Luxury Car Rental Singapore',
    'Supercar Rental Singapore',
    'Ferrari Rental',
    'Porsche Rental Singapore',
    'Executive Mobility Singapore',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className="bg-white text-gray-950 min-h-screen flex flex-col antialiased selection:bg-forest selection:text-white"
      >
        <WolfDataProvider>
          <DemoNoticeBar />
          <div className="flex-1 flex flex-col">{children}</div>
          <ToastContainer />
        </WolfDataProvider>
      </body>
    </html>
  );
}

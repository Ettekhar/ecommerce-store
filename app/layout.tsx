import type { Metadata } from 'next';
import { Urbanist } from 'next/font/google';

import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import ModalProvider from '@/providers/modal-provider';
import { ToasterProvider } from '@/providers/toast-provider';
import IpBlocker from '@/components/IpBlocker'; // Import the IpBlocker component

import './globals.css';

const font = Urbanist({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Store',
  description: 'Store',
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ModalProvider />
        <ToasterProvider />
        <IpBlocker>
          <Navbar />
          {children}
          <Footer />
        </IpBlocker>
      </body>
    </html>
  );
}

import { Modal } from './components/modals/Modal';
import { RegisterModal } from './components/modals/RegisterModal';
import { Navbar } from './components/navbar/Navbar';
import './globals.css';
import { Nunito } from 'next/font/google';
import ToasterProvider from './providers/ToasterProvider';

const nunito = Nunito({ subsets: ['latin'] });

export const metadata = {
  title: 'Airbnb clone',
  description: 'Created using NEXT 13.4',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <ToasterProvider />
        <RegisterModal />
        <Navbar />
        {children}
      </body>
    </html>
  );
}

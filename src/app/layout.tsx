import Navbar from '@components/Navbar';
import '@styles/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* <Navbar /> Navbar appears on every page */}
        {children}
      </body>
    </html>
  );
}
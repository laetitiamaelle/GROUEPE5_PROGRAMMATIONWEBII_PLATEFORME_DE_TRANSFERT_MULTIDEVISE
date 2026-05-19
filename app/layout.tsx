import "./globals.css";
import ErrorLogger from '../components/ErrorLogger'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ErrorLogger />
        {children}
      </body>
    </html>
  );
}

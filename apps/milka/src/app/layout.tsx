import './global.css';
import { Header } from '../../../../organism/src/lib/header/header';
import headerData from '../../data/header.json';
import footerData from '../../data/footer.json';
import { Footer } from '../../../../organism/src/lib/footer/footer';

export const metadata = {
  title: 'FC Milka & die Bundesliga',
  description: 'Gewinne mit FC Milka einen Manager-Tag mit Rudi Völler.',
  og_title: 'FC Milka & die Bundesliga',
  og_description: "Kaufe 1 Produkt von Milka und/oder OREO und gewinne mit etwas Glück 1 Manager - Tag mit Rudi Völler.",
  og_sitename: "fcmilka.de"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <head>
        <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
        <meta name="title" content={metadata.title} />
        <meta property="og:title" content={metadata.og_title} />
        <meta property="og:description" content={metadata.og_description} />
        <meta property="og:site_name" content={metadata.og_sitename} />
      </head>

      <body>
        <Header {...headerData} />
        <main>
          {children}
        </main>
        <Footer {...footerData} />
      </body>

    </html>
  );
}

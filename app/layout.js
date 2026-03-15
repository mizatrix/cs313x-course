import './globals.css';

export const metadata = {
  title: 'CS313x — Information Retrieval Interactive Course',
  description: 'Interactive visualizations, quizzes, and tutorials for the CS313x Information Retrieval course. Master text processing, vector space models, index construction, and evaluation metrics.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

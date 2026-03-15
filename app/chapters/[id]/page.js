import { notFound } from 'next/navigation';
import ParticleCanvas from '../../components/ParticleCanvas';
import Navbar from '../../components/Navbar';
import SearchBar from '../../components/SearchBar';
import ChapterHub from '../../components/ChapterHub';
import { chapters } from '../../data/chapters';

export function generateStaticParams() {
  return Object.keys(chapters).map(id => ({ id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const chapter = chapters[id];
  if (!chapter) return {};
  return {
    title: `Chapter ${chapter.week} · ${chapter.title} — CS313x`,
    description: chapter.description,
  };
}

export default async function ChapterPage({ params }) {
  const { id } = await params;
  const chapter = chapters[id];
  if (!chapter) notFound();

  return (
    <>
      <ParticleCanvas />
      <Navbar
        brandLabel={`Chapter ${chapter.week}`}
        backHref="/"
        backLabel="Home"
        rightContent={<SearchBar />}
      />

      <div className="page-container">
        <header className="page-header">
          <div className="badge">Week {chapter.week} — Interactive Lab</div>
          <h1>{chapter.title}</h1>
          <p>{chapter.description}</p>
        </header>

        <ChapterHub chapterId={id} chapter={chapter} />
      </div>
    </>
  );
}

import Link from 'next/link';

export default function Navbar({ brandLabel, backHref, backLabel, rightContent }) {
  return (
    <nav className="navbar">
      <Link href={backHref || '/'} className="navbar-brand">
        <div className="brand-icon">IR</div>
        <div className="brand-text">CS313x · <span>{brandLabel || 'Home'}</span></div>
      </Link>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {rightContent}
        {backHref && (
          <Link href={backHref} className="nav-back">
            ← {backLabel || 'Back'}
          </Link>
        )}
      </div>
    </nav>
  );
}

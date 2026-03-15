'use client';

import { useState, useEffect } from 'react';

export default function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(true);

  // Change this message and key to show a new announcement
  const announcementKey = 'announcement_v1';
  const message = '📢 Welcome to CS313x Interactive Course! Start with Chapter 2 and work through each visualization in order for the best learning experience.';

  useEffect(() => {
    const wasDismissed = localStorage.getItem(announcementKey);
    if (!wasDismissed) setDismissed(false);
  }, []);

  const dismiss = () => {
    localStorage.setItem(announcementKey, 'true');
    setDismissed(true);
  };

  if (dismissed) return null;

  return (
    <div className="announcement-bar">
      <div className="announcement-text">{message}</div>
      <button className="announcement-close" onClick={dismiss}>✕</button>
    </div>
  );
}

'use client';

import { useEffect } from 'react';

export default function Callback() {
  useEffect(() => {
    // Redirect back to main page - the hash will be handled there
    window.location.href = '/';
  }, []);

  return (
    <div className="min-h-screen bg-black text-green-400 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-pulse">[ CONNECTING TO SPOTIFY... ]</div>
      </div>
    </div>
  );
}

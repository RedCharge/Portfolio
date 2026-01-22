import React from 'react';

export default function Home() {
  return (
    <div style={{ background: 'black', color: 'white', minHeight: '100vh', padding: '50px' }}>
      <h1 style={{ fontSize: '48px', color: '#EAFF00' }}>SIMPLE TEST</h1>
      
      <div style={{ margin: '50px 0' }}>
        <h2>Direct Paths:</h2>
        <img src="/me.png" alt="Me" width="300" style={{ display: 'block', margin: '20px' }} />
        <img src="/soho.webp" alt="SOHO" width="300" style={{ display: 'block', margin: '20px' }} />
        <img src="/passco.webp" alt="Passco" width="300" style={{ display: 'block', margin: '20px' }} />
        <img src="/hsk.webp" alt="HSK" width="300" style={{ display: 'block', margin: '20px' }} />
      </div>
      
      <div style={{ margin: '50px 0' }}>
        <h2>Absolute URLs:</h2>
        <img src="https://redcharger-portfolio.vercel.app/me.png" alt="Me" width="300" style={{ display: 'block', margin: '20px' }} />
        <img src="https://redcharger-portfolio.vercel.app/soho.webp" alt="SOHO" width="300" style={{ display: 'block', margin: '20px' }} />
        <img src="https://redcharger-portfolio.vercel.app/passco.webp" alt="Passco" width="300" style={{ display: 'block', margin: '20px' }} />
        <img src="https://redcharger-portfolio.vercel.app/hsk.webp" alt="HSK" width="300" style={{ display: 'block', margin: '20px' }} />
      </div>
      
      <div style={{ background: 'red', padding: '20px', marginTop: '50px' }}>
        <p>If NO images show above, the problem is with:</p>
        <ul>
          <li>1. Your Vercel deployment (not copying files)</li>
          <li>2. Your image files (corrupted/wrong format)</li>
          <li>3. Browser caching (try incognito mode)</li>
        </ul>
      </div>
    </div>
  );
}
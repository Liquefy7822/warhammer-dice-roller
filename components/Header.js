// components/Header.js

import Link from 'next/link';

export default function Header({ title }) {
  return (
    <div>
      <h1 className="title">{title}</h1>
      <div className="phase-buttons">
        <Link href="/command-phase"><a><button className="phase-button">Command Phase</button></a></Link>
        <Link href="/movement-phase"><a><button className="phase-button">Movement Phase</button></a></Link>
        <Link href="/shooting-phase"><a><button className="phase-button">Shooting Phase</button></a></Link>
        <Link href="/charge-phase"><a><button className="phase-button">Charge Phase</button></a></Link>
        <Link href="/fight-phase"><a><button className="phase-button">Fight Phase</button></a></Link>
        <Link href="/reanimation-protocol"><a><button className="phase-button">Reanimation Protocols</button></a></Link>
      </div>
    </div>
  );
}

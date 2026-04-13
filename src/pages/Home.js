import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';

function Navbar() {
  return (
    <nav className="navbar">
      <a href="/" className="navbar-logo">
        <div className="logo-badge">S</div>
        <div className="logo-text">SKYLINE<br /><span>RESIDENCES</span></div>
      </a>
      <ul className="navbar-links">
        <li><a href="#about">Overview</a></li>
        <li><a href="#amenities">Amenities</a></li>
        <li><a href="#floorplan">Floor Plan</a></li>
        <li><a href="#nearby">Location</a></li>
        <li><a href="#faq">FAQ</a></li>
        <li><a href="#contact" className="nav-cta">Schedule Visit</a></li>
      </ul>
    </nav>
  );
}

function Hero({ data }) {
  if (!data) return null;
  return (
    <section className="hero" id="home">
      <div className="hero-inner">
        <div>
          <span className="hero-eyebrow">🏆 {data.badge}</span>
          <h1>{data.title?.split(' ').slice(0, 3).join(' ')}<br /><em>{data.title?.split(' ').slice(3).join(' ')}</em></h1>
          <p className="hero-sub">{data.projectName}</p>
          <div className="pricing-row">
            <div className="pricing-box">
              <div className="config">Smart 1 BHK</div>
              <div className="size">{data.smart1bhk?.area}</div>
              <div className="amt">{data.smart1bhk?.price}</div>
              <div className="note">onwards</div>
            </div>
            <div className="pricing-box">
              <div className="config">Premium 2 BHK</div>
              <div className="size">{data.premium2bhk?.area}</div>
              <div className="amt">{data.premium2bhk?.price}</div>
              <div className="note">onwards</div>
            </div>
          </div>
          <div className="hero-meta">
            <div className="hero-meta-item"><span className="meta-dot"></span><span>{data.address}</span></div>
            <div className="hero-meta-item"><span className="meta-dot"></span><span>📞 {data.phone}</span></div>
          </div>
        </div>
        <div className="hero-card">
          <span className="building-icon">🏙️</span>
          <h3>{data.projectName}</h3>
          <p>HYDERABAD, TELANGANA</p>
          <span className="tag">✦ Premium Living</span>
        </div>
      </div>
    </section>
  );
}

function About({ data }) {
  if (!data) return null;
  return (
    <section className="section about" id="about">
      <div className="section-inner">
        <div className="about-grid">
          <div className="about-visual">
            <div className="about-img-a">🏢</div>
            <div className="about-img-b">🌿</div>
            <div className="about-stat-chip">
              <span className="num">3+</span>
              <span className="lbl">Acres</span>
            </div>
          </div>
          <div className="about-text">
            <span className="eyebrow">{data.title}</span>
            <h2 className="section-title">Crafted for Those Who Deserve the Best</h2>
            {data.description?.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
            <button className="btn-gold" style={{ marginTop: 10 }}>📄 {data.btnText}</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Amenities({ data }) {
  if (!data) return null;
  return (
    <section className="section amenities" id="amenities">
      <div className="section-inner">
        <span className="eyebrow">World-Class Lifestyle</span>
        <h2 className="section-title">{data.title}</h2>
        <p className="section-desc">{data.subtitle}</p>
        <div className="amenities-grid">
          {data.items?.map((item, i) => (
            <div className="amenity-card" key={i}>
              <div className="amenity-icon">{item.icon}</div>
              <h4>{item.title}</h4>
            </div>
          ))}
        </div>
        <button className="btn-outline">{data.btnText} →</button>
      </div>
    </section>
  );
}

function FloorPlan({ data }) {
  const [active, setActive] = useState(0);
  if (!data) return null;
  return (
    <section className="section floorplan" id="floorplan">
      <div className="section-inner">
        <span className="eyebrow">Unit Configurations</span>
        <h2 className="section-title">{data.title}</h2>
        <p className="section-desc" style={{ color: 'rgba(255,255,255,0.45)' }}>Thoughtfully designed layouts for every lifestyle</p>
        <div className="floorplan-grid">
          <div className="floor-img-box">🗺️</div>
          <div>
            <div className="floor-tabs">
              {data.tabs?.map((tab, i) => (
                <button key={i} className={`floor-tab${active === i ? ' active' : ''}`} onClick={() => setActive(i)}>{tab}</button>
              ))}
            </div>
            <div className="floor-spec"><div className="spec-label">Carpet Area</div><div className="spec-val">{data.area}</div></div>
            <div className="floor-spec" style={{ marginTop: 16 }}><div className="spec-label">Starting Price</div><div className="spec-val">{data.price}</div></div>
            <button className="btn-gold" style={{ marginTop: 28 }}>📐 {data.btnText}</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Nearby({ data }) {
  if (!data) return null;
  const categories = ['IT Hub', 'Business', 'Commercial', 'Transport', 'Tech Park', 'Healthcare'];
  return (
    <section className="section nearby" id="nearby">
      <div className="section-inner">
        <span className="eyebrow">Prime Location</span>
        <h2 className="section-title">{data.title}</h2>
        <p className="section-desc">Seamlessly connected to the city's most important landmarks</p>
        <div className="nearby-grid">
          {data.items?.map((item, i) => (
            <div className="nearby-item" key={i}>
              <div className="nearby-place">
                <span className="place-dot"></span>
                <div>
                  <div className="place-name">{item.place}</div>
                  <div className="place-cat">{categories[i % categories.length]}</div>
                </div>
              </div>
              <span className="dist-pill">{item.distance}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function VideoCTA() {
  return (
    <div className="video-cta">
      <div className="play-ring">▶</div>
      <p>Watch the Project Walkthrough</p>
    </div>
  );
}

function Explore() {
  const buildings = [
    { name: 'Skyline Nanditha', status: 'Ready to Move', emoji: '🏢', bg: 'linear-gradient(135deg,#1a3560,#3a6fd8)' },
    { name: 'Skyline Enclave – East', status: 'New Launch', emoji: '🏗️', bg: 'linear-gradient(135deg,#0f1f3d,#1e4db7)' },
    { name: 'Skyline Heights – West', status: 'New Launch', emoji: '🏛️', bg: 'linear-gradient(135deg,#243e7a,#3a6fd8)' }
  ];
  return (
    <section className="section explore">
      <div className="section-inner">
        <span className="eyebrow">Our Township</span>
        <h2 className="section-title">Explore More Buildings</h2>
        <p className="section-desc">A growing township designed for complete urban living</p>
        <div className="buildings-grid">
          {buildings.map((b, i) => (
            <div className="building-card" key={i}>
              <div className="building-img" style={{ background: b.bg }}><span>{b.emoji}</span></div>
              <div className="building-body">
                <h4>{b.name}</h4>
                <span className="building-status">{b.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Developer({ data }) {
  if (!data) return null;
  return (
    <section className="section developer">
      <div className="section-inner">
        <span className="eyebrow">About Developer</span>
        <h2 className="section-title">{data.title}</h2>
        <p className="developer-quote">{data.description}</p>
        <div className="dev-stats">
          {data.stats?.map((s, i) => (
            <div className="stat-card" key={i}>
              <span className="val">{s.value}</span>
              <span className="lbl">{s.label}</span>
            </div>
          ))}
        </div>
        <div className="dev-imgs">
          <div className="dev-img" style={{ background: 'linear-gradient(135deg,#1a3560,#3a6fd8)' }}>🏢</div>
          <div className="dev-img" style={{ background: 'linear-gradient(135deg,#0f1f3d,#243e7a)' }}>🏗️</div>
        </div>
      </div>
    </section>
  );
}

function Construction({ data }) {
  if (!data) return null;
  const bgs = [
    'linear-gradient(135deg,#b2ceff,#7fa8f5)',
    'linear-gradient(135deg,#c5d5f5,#8aaae0)',
    'linear-gradient(135deg,#dce8ff,#a3c0f0)'
  ];
  return (
    <section className="section construction" id="construction">
      <div className="section-inner">
        <span className="eyebrow">Progress Updates</span>
        <h2 className="section-title">{data.title}</h2>
        <p className="section-desc">Transparent, on-schedule construction milestones</p>
        <div className="construction-grid">
          {data.updates?.map((u, i) => (
            <div className="update-card" key={i}>
              <div className="update-img" style={{ background: bgs[i % bgs.length] }}>🏚️</div>
              <div className="update-label">{u.label}<span></span></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ({ data }) {
  const [open, setOpen] = useState(null);
  if (!data) return null;
  return (
    <section className="section faq" id="faq">
      <div className="section-inner">
        <span className="eyebrow">Got Questions?</span>
        <h2 className="section-title">{data.title}</h2>
        <p className="section-desc">Everything you need to know before making your decision</p>
        <div className="faq-list">
          {data.items?.map((item, i) => (
            <div className="faq-item" key={i}>
              <button className="faq-q" onClick={() => setOpen(open === i ? null : i)}>
                {item.q}
                <span className={`faq-icon${open === i ? ' open' : ''}`}>+</span>
              </button>
              <div className={`faq-a${open === i ? ' open' : ''}`}>{item.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { content, loading } = useContent();
  if (loading) return <div className="loading-screen"><div className="spinner"></div></div>;
  return (
    <div>
      <Navbar />
      <Hero data={content.hero} />
      <About data={content.about} />
      <Amenities data={content.amenities} />
      <FloorPlan data={content.floorplan} />
      <Nearby data={content.nearbyConnectivity} />
      <VideoCTA />
      <Explore />
      <Developer data={content.developer} />
      <Construction data={content.construction} />
      <FAQ data={content.faq} />
      <footer>
        <div className="footer-inner">
          <p>© 2024 Skyline Residences. All rights reserved. Hyderabad, Telangana.</p>
          <a href="/admin/login">Admin Panel</a>
        </div>
      </footer>
      <Link to="/admin/login" className="admin-fab">⚙ Admin</Link>
    </div>
  );
}

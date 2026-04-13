import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';

const styles = {
  wrap: { minHeight: '100vh', background: '#f7f8fc', fontFamily: "'Poppins', sans-serif" },
  sidebar: {
    position: 'fixed', top: 0, left: 0, bottom: 0, width: 240,
    background: '#0f1f3d', overflowY: 'auto', zIndex: 100
  },
  sidebarHeader: {
    padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)',
    display: 'flex', alignItems: 'center', gap: 12
  },
  logoCircle: {
    width: 36, height: 36, background: '#1e4db7', borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18
  },
  logoText: { color: 'white', fontSize: 14, fontWeight: 600, lineHeight: 1.3 },
  navItem: (active) => ({
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '12px 20px', cursor: 'pointer', borderRadius: 8, margin: '2px 8px',
    background: active ? 'rgba(76,175,125,0.2)' : 'transparent',
    color: active ? '#9de8c0' : 'rgba(255,255,255,0.7)',
    fontSize: 13, fontWeight: active ? 600 : 400,
    transition: 'all 0.2s', textDecoration: 'none', border: 'none', width: 'calc(100% - 16px)',
    textAlign: 'left', fontFamily: "'Poppins', sans-serif"
  }),
  main: { marginLeft: 240, padding: '32px 40px' },
  topbar: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    marginBottom: 32
  },
  card: {
    background: 'white', borderRadius: 12, padding: '28px 32px',
    border: '1px solid rgba(76,175,125,0.1)', marginBottom: 24
  },
  label: { fontSize: 12, fontWeight: 600, color: '#3d5080', marginBottom: 6, display: 'block', letterSpacing: 0.5 },
  input: {
    width: '100%', padding: '10px 14px', border: '1.5px solid #e0e0e0',
    borderRadius: 8, fontSize: 14, outline: 'none', fontFamily: "'Poppins', sans-serif",
    marginBottom: 16, boxSizing: 'border-box'
  },
  textarea: {
    width: '100%', padding: '10px 14px', border: '1.5px solid #e0e0e0',
    borderRadius: 8, fontSize: 14, outline: 'none', fontFamily: "'Poppins', sans-serif",
    marginBottom: 16, resize: 'vertical', minHeight: 100, boxSizing: 'border-box'
  },
  saveBtn: {
    background: '#1e4db7', color: 'white', border: 'none', borderRadius: 8,
    padding: '11px 28px', fontSize: 14, fontWeight: 600, cursor: 'pointer',
    fontFamily: "'Poppins', sans-serif"
  },
  badge: (ok) => ({
    display: 'inline-block', padding: '4px 12px', borderRadius: 20,
    fontSize: 12, fontWeight: 500,
    background: ok ? '#e8f5ee' : '#fff3f3',
    color: ok ? '#2d7a52' : '#c62828'
  }),
  sectionTitle: { fontSize: 20, fontWeight: 700, color: '#1a2e1a', marginBottom: 4 },
  sectionSub: { fontSize: 13, color: '#7a9a7a', marginBottom: 28 },
  divider: { borderTop: '1px solid #f0f0f0', margin: '20px 0' }
};

const SECTIONS = [
  { key: 'hero', label: '🏠 Hero Section', icon: '🏠' },
  { key: 'about', label: '📝 About Project', icon: '📝' },
  { key: 'amenities', label: '🏋️ Amenities', icon: '🏋️' },
  { key: 'floorplan', label: '📐 Floor Plans', icon: '📐' },
  { key: 'nearbyConnectivity', label: '📍 Nearby Connectivity', icon: '📍' },
  { key: 'developer', label: '🏢 About Developer', icon: '🏢' },
  { key: 'construction', label: '🏗️ Construction Updates', icon: '🏗️' },
  { key: 'faq', label: '❓ FAQ', icon: '❓' }
];

function FieldInput({ label, value, onChange, multi, rows = 4 }) {
  return (
    <div>
      <label style={styles.label}>{label}</label>
      {multi
        ? <textarea style={styles.textarea} rows={rows} value={value || ''} onChange={e => onChange(e.target.value)} />
        : <input style={styles.input} value={value || ''} onChange={e => onChange(e.target.value)} />
      }
    </div>
  );
}

function HeroEditor({ data, onChange }) {
  const set = (key, val) => onChange({ ...data, [key]: val });
  const setNested = (parent, key, val) => onChange({ ...data, [parent]: { ...data[parent], [key]: val } });
  return (
    <div>
      <FieldInput label="BADGE TEXT" value={data.badge} onChange={v => set('badge', v)} />
      <FieldInput label="MAIN TITLE" value={data.title} onChange={v => set('title', v)} />
      <FieldInput label="PROJECT NAME" value={data.projectName} onChange={v => set('projectName', v)} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <FieldInput label="1 BHK PRICE" value={data.smart1bhk?.price} onChange={v => setNested('smart1bhk', 'price', v)} />
          <FieldInput label="1 BHK AREA" value={data.smart1bhk?.area} onChange={v => setNested('smart1bhk', 'area', v)} />
        </div>
        <div>
          <FieldInput label="2 BHK PRICE" value={data.premium2bhk?.price} onChange={v => setNested('premium2bhk', 'price', v)} />
          <FieldInput label="2 BHK AREA" value={data.premium2bhk?.area} onChange={v => setNested('premium2bhk', 'area', v)} />
        </div>
      </div>
      <FieldInput label="ADDRESS" value={data.address} onChange={v => set('address', v)} multi />
      <FieldInput label="PHONE NUMBER" value={data.phone} onChange={v => set('phone', v)} />
    </div>
  );
}

function AboutEditor({ data, onChange }) {
  const set = (key, val) => onChange({ ...data, [key]: val });
  return (
    <div>
      <FieldInput label="SECTION TITLE" value={data.title} onChange={v => set('title', v)} />
      <FieldInput label="DESCRIPTION" value={data.description} onChange={v => set('description', v)} multi rows={6} />
      <FieldInput label="BUTTON TEXT" value={data.btnText} onChange={v => set('btnText', v)} />
    </div>
  );
}

function AmenitiesEditor({ data, onChange }) {
  const set = (key, val) => onChange({ ...data, [key]: val });
  const setItem = (i, key, val) => {
    const items = [...(data.items || [])];
    items[i] = { ...items[i], [key]: val };
    onChange({ ...data, items });
  };
  const addItem = () => onChange({ ...data, items: [...(data.items || []), { title: '', icon: '⭐' }] });
  const removeItem = (i) => {
    const items = data.items.filter((_, idx) => idx !== i);
    onChange({ ...data, items });
  };
  return (
    <div>
      <FieldInput label="SECTION TITLE" value={data.title} onChange={v => set('title', v)} />
      <FieldInput label="SUBTITLE" value={data.subtitle} onChange={v => set('subtitle', v)} multi />
      <div style={styles.divider} />
      <p style={{ fontSize: 13, fontWeight: 600, color: '#3d5080', marginBottom: 12 }}>AMENITY ITEMS</p>
      {data.items?.map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 12 }}>
          <input style={{ ...styles.input, width: 60, marginBottom: 0 }} placeholder="Icon" value={item.icon || ''} onChange={e => setItem(i, 'icon', e.target.value)} />
          <input style={{ ...styles.input, flex: 1, marginBottom: 0 }} placeholder="Title" value={item.title || ''} onChange={e => setItem(i, 'title', e.target.value)} />
          <button onClick={() => removeItem(i)} style={{ padding: '10px 14px', background: '#fff3f3', border: '1px solid #ffcdd2', borderRadius: 8, cursor: 'pointer', color: '#c62828', fontSize: 13 }}>✕</button>
        </div>
      ))}
      <button onClick={addItem} style={{ ...styles.saveBtn, background: '#eef2ff', color: '#1e4db7', marginBottom: 16 }}>+ Add Amenity</button>
      <br />
      <FieldInput label="BUTTON TEXT" value={data.btnText} onChange={v => set('btnText', v)} />
    </div>
  );
}

function FloorPlanEditor({ data, onChange }) {
  const set = (key, val) => onChange({ ...data, [key]: val });
  return (
    <div>
      <FieldInput label="SECTION TITLE" value={data.title} onChange={v => set('title', v)} />
      <FieldInput label="AREA DETAIL" value={data.area} onChange={v => set('area', v)} />
      <FieldInput label="PRICE TEXT" value={data.price} onChange={v => set('price', v)} />
      <FieldInput label="BUTTON TEXT" value={data.btnText} onChange={v => set('btnText', v)} />
    </div>
  );
}

function NearbyEditor({ data, onChange }) {
  const set = (key, val) => onChange({ ...data, [key]: val });
  const setItem = (i, key, val) => {
    const items = [...(data.items || [])];
    items[i] = { ...items[i], [key]: val };
    onChange({ ...data, items });
  };
  const addItem = () => onChange({ ...data, items: [...(data.items || []), { place: '', distance: '' }] });
  const removeItem = (i) => onChange({ ...data, items: data.items.filter((_, idx) => idx !== i) });
  return (
    <div>
      <FieldInput label="SECTION TITLE" value={data.title} onChange={v => set('title', v)} />
      <div style={styles.divider} />
      <p style={{ fontSize: 13, fontWeight: 600, color: '#3d5080', marginBottom: 12 }}>LOCATIONS</p>
      {data.items?.map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
          <input style={{ ...styles.input, flex: 2, marginBottom: 0 }} placeholder="Place Name" value={item.place || ''} onChange={e => setItem(i, 'place', e.target.value)} />
          <input style={{ ...styles.input, flex: 1, marginBottom: 0 }} placeholder="Distance" value={item.distance || ''} onChange={e => setItem(i, 'distance', e.target.value)} />
          <button onClick={() => removeItem(i)} style={{ padding: '10px 14px', background: '#fff3f3', border: '1px solid #ffcdd2', borderRadius: 8, cursor: 'pointer', color: '#c62828', fontSize: 13 }}>✕</button>
        </div>
      ))}
      <button onClick={addItem} style={{ ...styles.saveBtn, background: '#eef2ff', color: '#1e4db7' }}>+ Add Location</button>
    </div>
  );
}

function DeveloperEditor({ data, onChange }) {
  const set = (key, val) => onChange({ ...data, [key]: val });
  const setStats = (i, key, val) => {
    const stats = [...(data.stats || [])];
    stats[i] = { ...stats[i], [key]: val };
    onChange({ ...data, stats });
  };
  return (
    <div>
      <FieldInput label="SECTION TITLE" value={data.title} onChange={v => set('title', v)} />
      <FieldInput label="QUOTE / DESCRIPTION" value={data.description} onChange={v => set('description', v)} multi rows={4} />
      <div style={styles.divider} />
      <p style={{ fontSize: 13, fontWeight: 600, color: '#3d5080', marginBottom: 12 }}>STATISTICS</p>
      {data.stats?.map((s, i) => (
        <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
          <input style={{ ...styles.input, flex: 1, marginBottom: 0 }} placeholder="Value" value={s.value || ''} onChange={e => setStats(i, 'value', e.target.value)} />
          <input style={{ ...styles.input, flex: 2, marginBottom: 0 }} placeholder="Label" value={s.label || ''} onChange={e => setStats(i, 'label', e.target.value)} />
        </div>
      ))}
    </div>
  );
}

function ConstructionEditor({ data, onChange }) {
  const set = (key, val) => onChange({ ...data, [key]: val });
  const setUpdate = (i, val) => {
    const updates = [...(data.updates || [])];
    updates[i] = { ...updates[i], label: val };
    onChange({ ...data, updates });
  };
  return (
    <div>
      <FieldInput label="SECTION TITLE" value={data.title} onChange={v => set('title', v)} />
      <div style={styles.divider} />
      <p style={{ fontSize: 13, fontWeight: 600, color: '#3d5080', marginBottom: 12 }}>UPDATE LABELS</p>
      {data.updates?.map((u, i) => (
        <FieldInput key={i} label={`UPDATE ${i + 1} LABEL`} value={u.label} onChange={v => setUpdate(i, v)} />
      ))}
    </div>
  );
}

function FAQEditor({ data, onChange }) {
  const set = (key, val) => onChange({ ...data, [key]: val });
  const setItem = (i, key, val) => {
    const items = [...(data.items || [])];
    items[i] = { ...items[i], [key]: val };
    onChange({ ...data, items });
  };
  const addItem = () => onChange({ ...data, items: [...(data.items || []), { q: '', a: '' }] });
  const removeItem = (i) => onChange({ ...data, items: data.items.filter((_, idx) => idx !== i) });
  return (
    <div>
      <FieldInput label="SECTION TITLE" value={data.title} onChange={v => set('title', v)} />
      <div style={styles.divider} />
      {data.items?.map((item, i) => (
        <div key={i} style={{ background: '#f8fdf9', borderRadius: 10, padding: '16px 20px', marginBottom: 16, border: '1px solid rgba(76,175,125,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#3d5080' }}>Question {i + 1}</span>
            <button onClick={() => removeItem(i)} style={{ padding: '4px 10px', background: 'transparent', border: '1px solid #ffcdd2', borderRadius: 6, cursor: 'pointer', color: '#c62828', fontSize: 12 }}>Remove</button>
          </div>
          <FieldInput label="QUESTION" value={item.q} onChange={v => setItem(i, 'q', v)} />
          <FieldInput label="ANSWER" value={item.a} onChange={v => setItem(i, 'a', v)} multi rows={3} />
        </div>
      ))}
      <button onClick={addItem} style={{ ...styles.saveBtn, background: '#eef2ff', color: '#1e4db7' }}>+ Add FAQ</button>
    </div>
  );
}

const EDITORS = {
  hero: HeroEditor,
  about: AboutEditor,
  amenities: AmenitiesEditor,
  floorplan: FloorPlanEditor,
  nearbyConnectivity: NearbyEditor,
  developer: DeveloperEditor,
  construction: ConstructionEditor,
  faq: FAQEditor
};

export default function AdminPanel() {
  const { content, updateSection } = useContent();
  const [activeSection, setActiveSection] = useState('hero');
  const [localData, setLocalData] = useState({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) navigate('/admin/login');
  }, [navigate]);

  useEffect(() => {
    setLocalData(JSON.parse(JSON.stringify(content[activeSection] || {})));
  }, [activeSection, content]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('adminToken');
      await updateSection(activeSection, localData, token);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      alert('Save failed. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const EditorComponent = EDITORS[activeSection];
  const sectionInfo = SECTIONS.find(s => s.key === activeSection);

  return (
    <div style={styles.wrap}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <div style={styles.logoCircle}>🌿</div>
          <div style={styles.logoText}>USHA ORCHID<br /><span style={{ fontSize: 11, opacity: 0.7, fontWeight: 400 }}>Admin Panel</span></div>
        </div>
        <div style={{ padding: '16px 0' }}>
          {SECTIONS.map(s => (
            <button
              key={s.key}
              style={styles.navItem(activeSection === s.key)}
              onClick={() => setActiveSection(s.key)}
            >
              {s.label}
            </button>
          ))}
        </div>
        <div style={{ padding: '16px 8px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <Link to="/" style={{ ...styles.navItem(false), display: 'block', textAlign: 'center' }}>
            🌐 View Website
          </Link>
          <button onClick={handleLogout} style={{ ...styles.navItem(false), color: '#ff8a80' }}>
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={styles.main}>
        <div style={styles.topbar}>
          <div>
            <h1 style={styles.sectionTitle}>
              {sectionInfo?.icon} Edit {sectionInfo?.label.replace(/^[^\s]+ /, '')}
            </h1>
            <p style={styles.sectionSub}>Changes will be reflected live on the website after saving.</p>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            {saved && <span style={styles.badge(true)}>✓ Saved successfully!</span>}
            <button onClick={handleSave} disabled={saving} style={{ ...styles.saveBtn, opacity: saving ? 0.7 : 1 }}>
              {saving ? '⏳ Saving...' : '💾 Save Changes'}
            </button>
          </div>
        </div>

        <div style={styles.card}>
          {EditorComponent && (
            <EditorComponent
              data={localData}
              onChange={setLocalData}
            />
          )}
        </div>

        <div style={{ textAlign: 'right' }}>
          <button onClick={handleSave} disabled={saving} style={{ ...styles.saveBtn, opacity: saving ? 0.7 : 1 }}>
            {saving ? '⏳ Saving...' : '💾 Save Changes'}
          </button>
        </div>
      </main>
    </div>
  );
}

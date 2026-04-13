import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { API } from '../context/ContentContext';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res = await axios.post(`${API}/api/auth/login`, { email, password });
      if (res.data.success) { localStorage.setItem('adminToken', res.data.token); navigate('/admin'); }
    } catch { setError('Invalid credentials. Use admin@gmail.com / 1234'); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(160deg,#0f1f3d 0%,#1a3560 100%)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'DM Sans',sans-serif", padding:20 }}>
      <div style={{ background:'white', borderRadius:14, padding:'48px 40px', width:'100%', maxWidth:420, boxShadow:'0 32px 80px rgba(0,0,0,0.35)' }}>
        <div style={{ textAlign:'center', marginBottom:36 }}>
          <div style={{ width:56, height:56, background:'#0f1f3d', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px', fontSize:26, color:'#c9a84c', fontWeight:700 }}>S</div>
          <h1 style={{ fontSize:22, fontWeight:600, color:'#0f1f3d', marginBottom:6, fontFamily:"'DM Serif Display',serif" }}>Admin Login</h1>
          <p style={{ fontSize:13, color:'#8896b3' }}>Skyline Residences CMS</p>
        </div>
        {error && <div style={{ background:'#fff5f5', border:'1px solid #fecaca', borderRadius:8, padding:'12px 16px', fontSize:13, color:'#c62828', marginBottom:20 }}>{error}</div>}
        <form onSubmit={handleLogin}>
          {[['Email', 'email', email, setEmail, 'admin@gmail.com'], ['Password', 'password', password, setPassword, '••••']].map(([label, type, val, setter, ph]) => (
            <div key={label} style={{ marginBottom:18 }}>
              <label style={{ display:'block', fontSize:12, fontWeight:600, color:'#3d5080', marginBottom:7, letterSpacing:'0.5px', textTransform:'uppercase' }}>{label}</label>
              <input type={type} value={val} onChange={e => setter(e.target.value)} placeholder={ph} required
                style={{ width:'100%', padding:'12px 15px', border:'1.5px solid #e2e8f0', borderRadius:8, fontSize:14, outline:'none', fontFamily:"'DM Sans',sans-serif", boxSizing:'border-box' }}
                onFocus={e => e.target.style.borderColor='#1e4db7'}
                onBlur={e => e.target.style.borderColor='#e2e8f0'} />
            </div>
          ))}
          <button type="submit" disabled={loading} style={{ width:'100%', padding:'13px', background: loading ? '#8896b3' : '#0f1f3d', color:'white', border:'none', borderRadius:8, fontSize:15, fontWeight:600, cursor: loading ? 'not-allowed' : 'pointer', fontFamily:"'DM Sans',sans-serif", marginTop:10 }}>
            {loading ? 'Logging in...' : 'Login to Admin Panel'}
          </button>
        </form>
        <div style={{ textAlign:'center', marginTop:24 }}>
          <Link to="/" style={{ fontSize:13, color:'#1e4db7', textDecoration:'none' }}>← Back to Website</Link>
        </div>
      </div>
    </div>
  );
}

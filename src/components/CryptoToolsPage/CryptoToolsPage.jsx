import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ContentCopy, Check, LockOutlined, TagOutlined, CodeOutlined } from '@mui/icons-material'
import { colors } from '../../info/Info'
import './CryptoToolsPage.scss'

// ─── Utilities ────────────────────────────────────────────────────────────────

// SHA-256 via Web Crypto API (native browser, no library needed)
async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message)
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer)
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('')
}

// SHA-1
async function sha1(message) {
  const msgBuffer = new TextEncoder().encode(message)
  const hashBuffer = await crypto.subtle.digest('SHA-1', msgBuffer)
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('')
}

// SHA-512
async function sha512(message) {
  const msgBuffer = new TextEncoder().encode(message)
  const hashBuffer = await crypto.subtle.digest('SHA-512', msgBuffer)
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('')
}

// MD5 (pure JS, no Web Crypto support)
function md5(str) {
  function safeAdd(x, y) { const lsw=(x&0xFFFF)+(y&0xFFFF); const msw=(x>>16)+(y>>16)+(lsw>>16); return (msw<<16)|(lsw&0xFFFF) }
  function bitRotateLeft(num, cnt) { return (num<<cnt)|(num>>>(32-cnt)) }
  function md5cmn(q,a,b,x,s,t) { return safeAdd(bitRotateLeft(safeAdd(safeAdd(a,q),safeAdd(x,t)),s),b) }
  function md5ff(a,b,c,d,x,s,t) { return md5cmn((b&c)|((~b)&d),a,b,x,s,t) }
  function md5gg(a,b,c,d,x,s,t) { return md5cmn((b&d)|(c&(~d)),a,b,x,s,t) }
  function md5hh(a,b,c,d,x,s,t) { return md5cmn(b^c^d,a,b,x,s,t) }
  function md5ii(a,b,c,d,x,s,t) { return md5cmn(c^(b|(~d)),a,b,x,s,t) }
  const m = []
  const l = str.length
  for (let i=0;i<l;i++) { m[i>>2]|=str.charCodeAt(i)<<((i%4)*8) }
  m[l>>2]|=0x80<<((l%4)*8)
  m[(((l+8)>>>6)<<4)+14]=l*8
  let a=1732584193,b=-271733879,c=-1732584194,d=271733878
  for (let i=0;i<m.length;i+=16) {
    const [aa,bb,cc,dd]=[a,b,c,d]
    a=md5ff(a,b,c,d,m[i],7,-680876936);d=md5ff(d,a,b,c,m[i+1],12,-389564586);c=md5ff(c,d,a,b,m[i+2],17,606105819);b=md5ff(b,c,d,a,m[i+3],22,-1044525330)
    a=md5ff(a,b,c,d,m[i+4],7,-176418897);d=md5ff(d,a,b,c,m[i+5],12,1200080426);c=md5ff(c,d,a,b,m[i+6],17,-1473231341);b=md5ff(b,c,d,a,m[i+7],22,-45705983)
    a=md5ff(a,b,c,d,m[i+8],7,1770035416);d=md5ff(d,a,b,c,m[i+9],12,-1958414417);c=md5ff(c,d,a,b,m[i+10],17,-42063);b=md5ff(b,c,d,a,m[i+11],22,-1990404162)
    a=md5ff(a,b,c,d,m[i+12],7,1804603682);d=md5ff(d,a,b,c,m[i+13],12,-40341101);c=md5ff(c,d,a,b,m[i+14],17,-1502002290);b=md5ff(b,c,d,a,m[i+15],22,1236535329)
    a=md5gg(a,b,c,d,m[i+1],5,-165796510);d=md5gg(d,a,b,c,m[i+6],9,-1069501632);c=md5gg(c,d,a,b,m[i+11],14,643717713);b=md5gg(b,c,d,a,m[i],20,-373897302)
    a=md5gg(a,b,c,d,m[i+5],5,-701558691);d=md5gg(d,a,b,c,m[i+10],9,38016083);c=md5gg(c,d,a,b,m[i+15],14,-660478335);b=md5gg(b,c,d,a,m[i+4],20,-405537848)
    a=md5gg(a,b,c,d,m[i+9],5,568446438);d=md5gg(d,a,b,c,m[i+14],9,-1019803690);c=md5gg(c,d,a,b,m[i+3],14,-187363961);b=md5gg(b,c,d,a,m[i+8],20,1163531501)
    a=md5gg(a,b,c,d,m[i+13],5,-1444681467);d=md5gg(d,a,b,c,m[i+2],9,-51403784);c=md5gg(c,d,a,b,m[i+7],14,1735328473);b=md5gg(b,c,d,a,m[i+12],20,-1926607734)
    a=md5hh(a,b,c,d,m[i+5],4,-378558);d=md5hh(d,a,b,c,m[i+8],11,-2022574463);c=md5hh(c,d,a,b,m[i+11],16,1839030562);b=md5hh(b,c,d,a,m[i+14],23,-35309556)
    a=md5hh(a,b,c,d,m[i+1],4,-1530992060);d=md5hh(d,a,b,c,m[i+4],11,1272893353);c=md5hh(c,d,a,b,m[i+7],16,-155497632);b=md5hh(b,c,d,a,m[i+10],23,-1094730640)
    a=md5hh(a,b,c,d,m[i+13],4,681279174);d=md5hh(d,a,b,c,m[i],11,-358537222);c=md5hh(c,d,a,b,m[i+3],16,-722521979);b=md5hh(b,c,d,a,m[i+6],23,76029189)
    a=md5hh(a,b,c,d,m[i+9],4,-640364487);d=md5hh(d,a,b,c,m[i+12],11,-421815835);c=md5hh(c,d,a,b,m[i+15],16,530742520);b=md5hh(b,c,d,a,m[i+2],23,-995338651)
    a=md5ii(a,b,c,d,m[i],6,-198630844);d=md5ii(d,a,b,c,m[i+7],10,1126891415);c=md5ii(c,d,a,b,m[i+14],15,-1416354905);b=md5ii(b,c,d,a,m[i+5],21,-57434055)
    a=md5ii(a,b,c,d,m[i+12],6,1700485571);d=md5ii(d,a,b,c,m[i+3],10,-1894986606);c=md5ii(c,d,a,b,m[i+10],15,-1051523);b=md5ii(b,c,d,a,m[i+1],21,-2054922799)
    a=md5ii(a,b,c,d,m[i+8],6,1873313359);d=md5ii(d,a,b,c,m[i+15],10,-30611744);c=md5ii(c,d,a,b,m[i+6],15,-1560198380);b=md5ii(b,c,d,a,m[i+13],21,1309151649)
    a=md5ii(a,b,c,d,m[i+4],6,-145523070);d=md5ii(d,a,b,c,m[i+11],10,-1120210379);c=md5ii(c,d,a,b,m[i+2],15,718787259);b=md5ii(b,c,d,a,m[i+9],21,-343485551)
    a=safeAdd(a,aa);b=safeAdd(b,bb);c=safeAdd(c,cc);d=safeAdd(d,dd)
  }
  return [a,b,c,d].map(n=>Array.from({length:4},(_,i)=>((n>>(i*8))&0xFF).toString(16).padStart(2,'0')).join('')).join('')
}

// Caesar Cipher
function caesarEncrypt(text, shift) {
  return text.replace(/[a-zA-Z]/g, ch => {
    const base = ch >= 'a' ? 97 : 65
    return String.fromCharCode(((ch.charCodeAt(0) - base + shift) % 26 + 26) % 26 + base)
  })
}

// Base64
function toBase64(str) {
  try { return btoa(unescape(encodeURIComponent(str))) } catch { return 'Error: invalid input' }
}
function fromBase64(str) {
  try { return decodeURIComponent(escape(atob(str))) } catch { return 'Error: invalid Base64 string' }
}

// ─── Copy Button ──────────────────────────────────────────────────────────────
function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    if (!text) return
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }
  return (
    <button className={`copy-btn ${copied ? 'copied' : ''}`} onClick={handleCopy} title="Copy to clipboard">
      {copied ? <Check fontSize="small" /> : <ContentCopy fontSize="small" />}
      {copied ? 'Copied!' : 'Copy'}
    </button>
  )
}

// ─── Output Box ───────────────────────────────────────────────────────────────
function OutputBox({ label, value, mono = true }) {
  return (
    <div className="output-box">
      <div className="output-header">
        <span className="output-label">{label}</span>
        <CopyBtn text={value} />
      </div>
      <div className={`output-value ${mono ? 'mono' : ''} ${!value ? 'empty' : ''}`}>
        {value || '— output akan muncul di sini —'}
      </div>
    </div>
  )
}

// ─── TOOL 1: Hash Generator ───────────────────────────────────────────────────
function HashGenerator() {
  const [input, setInput] = useState('')
  const [results, setResults] = useState({ md5: '', sha1: '', sha256: '', sha512: '' })
  const [loading, setLoading] = useState(false)

  const handleGenerate = useCallback(async () => {
    if (!input.trim()) return
    setLoading(true)
    const [s1, s256, s512] = await Promise.all([sha1(input), sha256(input), sha512(input)])
    setResults({ md5: md5(input), sha1: s1, sha256: s256, sha512: s512 })
    setLoading(false)
  }, [input])

  return (
    <div className="tool-body">
      <div className="input-group">
        <label>Input Text</label>
        <textarea
          rows={3}
          placeholder="Ketik teks yang ingin di-hash..."
          value={input}
          onChange={e => setInput(e.target.value)}
        />
      </div>
      <button
        className="tool-btn"
        onClick={handleGenerate}
        disabled={!input.trim() || loading}
        style={{ background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})` }}
      >
        {loading ? 'Generating...' : '⚡ Generate Hash'}
      </button>
      <div className="outputs">
        <OutputBox label="MD5" value={results.md5} />
        <OutputBox label="SHA-1" value={results.sha1} />
        <OutputBox label="SHA-256" value={results.sha256} />
        <OutputBox label="SHA-512" value={results.sha512} />
      </div>
    </div>
  )
}

// ─── TOOL 2: Caesar Cipher ────────────────────────────────────────────────────
function CaesarCipher() {
  const [input, setInput] = useState('')
  const [shift, setShift] = useState(13)
  const [mode, setMode] = useState('encrypt') // encrypt | decrypt

  const effectiveShift = mode === 'decrypt' ? 26 - shift : shift
  const output = input ? caesarEncrypt(input, effectiveShift) : ''

  // Brute force all 25 shifts
  const bruteForce = input
    ? Array.from({ length: 25 }, (_, i) => ({ shift: i + 1, text: caesarEncrypt(input, i + 1) }))
    : []

  return (
    <div className="tool-body">
      <div className="mode-toggle">
        {['encrypt', 'decrypt'].map(m => (
          <button
            key={m}
            className={`mode-btn ${mode === m ? 'active' : ''}`}
            onClick={() => setMode(m)}
            style={mode === m ? { background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`, color: '#000' } : {}}
          >
            {m === 'encrypt' ? '🔒 Encrypt' : '🔓 Decrypt'}
          </button>
        ))}
      </div>

      <div className="input-group">
        <label>Input Text</label>
        <textarea
          rows={3}
          placeholder={`Ketik teks yang ingin di-${mode}...`}
          value={input}
          onChange={e => setInput(e.target.value)}
        />
      </div>

      <div className="input-group shift-group">
        <label>Shift Value: <strong style={{ color: colors[0] }}>{shift}</strong></label>
        <input
          type="range"
          min={1}
          max={25}
          value={shift}
          onChange={e => setShift(Number(e.target.value))}
          className="shift-slider"
        />
        <div className="shift-labels"><span>1</span><span>13 (ROT13)</span><span>25</span></div>
      </div>

      <OutputBox label={`Output (shift ${shift}${mode === 'decrypt' ? ' → decrypt' : ''})`} value={output} />

      {input && (
        <details className="brute-force">
          <summary>🔍 Brute Force — lihat semua 25 kemungkinan shift</summary>
          <div className="brute-force-list">
            {bruteForce.map(({ shift: s, text }) => (
              <div key={s} className="brute-row">
                <span className="brute-shift" style={{ color: colors[1] }}>+{s}</span>
                <span className="brute-text">{text}</span>
                <CopyBtn text={text} />
              </div>
            ))}
          </div>
        </details>
      )}
    </div>
  )
}

// ─── TOOL 3: Base64 ───────────────────────────────────────────────────────────
function Base64Tool() {
  const [input, setInput] = useState('')
  const [mode, setMode] = useState('encode')

  const output = input
    ? (mode === 'encode' ? toBase64(input) : fromBase64(input))
    : ''

  const isError = output.startsWith('Error:')

  return (
    <div className="tool-body">
      <div className="mode-toggle">
        {['encode', 'decode'].map(m => (
          <button
            key={m}
            className={`mode-btn ${mode === m ? 'active' : ''}`}
            onClick={() => setMode(m)}
            style={mode === m ? { background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`, color: '#000' } : {}}
          >
            {m === 'encode' ? '📦 Encode' : '📬 Decode'}
          </button>
        ))}
      </div>

      <div className="input-group">
        <label>{mode === 'encode' ? 'Plain Text' : 'Base64 String'}</label>
        <textarea
          rows={4}
          placeholder={mode === 'encode' ? 'Ketik teks untuk di-encode...' : 'Paste Base64 string untuk di-decode...'}
          value={input}
          onChange={e => setInput(e.target.value)}
        />
      </div>

      <div className={`output-box ${isError ? 'error' : ''}`}>
        <div className="output-header">
          <span className="output-label">{mode === 'encode' ? 'Base64 Output' : 'Decoded Text'}</span>
          {!isError && <CopyBtn text={output} />}
        </div>
        <div className={`output-value mono ${!output ? 'empty' : ''} ${isError ? 'error-text' : ''}`}>
          {output || '— output akan muncul di sini —'}
        </div>
      </div>

      {input && !isError && mode === 'encode' && (
        <p className="info-note">
          📏 Plain: <strong>{input.length}</strong> chars → Base64: <strong>{output.length}</strong> chars
          ({Math.round((output.length / input.length - 1) * 100)}% lebih besar)
        </p>
      )}
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
const TOOLS = [
  { id: 'hash',   label: 'Hash Generator',     icon: <TagOutlined />,    component: <HashGenerator />,  desc: 'MD5 · SHA-1 · SHA-256 · SHA-512' },
  { id: 'caesar', label: 'Caesar Cipher',       icon: <LockOutlined />,   component: <CaesarCipher />,   desc: 'Encrypt & Decrypt · Brute Force' },
  { id: 'base64', label: 'Base64',              icon: <CodeOutlined />,   component: <Base64Tool />,     desc: 'Encode & Decode' },
]

export default function CryptoToolsPage() {
  const [activeTool, setActiveTool] = useState('hash')
  const active = TOOLS.find(t => t.id === activeTool)

  return (
    <div className="crypto-tools-page">
      {/* Header */}
      <motion.div
        className="tools-header"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>
          🔐 Crypto{' '}
          <span style={{ background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Playground
          </span>
        </h1>
        <p className="tools-subtitle">
          Interactive cybersecurity tools — semua berjalan di browser kamu, tidak ada data yang dikirim ke server.
        </p>
      </motion.div>

      {/* Tool selector tabs */}
      <motion.div
        className="tool-tabs"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {TOOLS.map(tool => (
          <button
            key={tool.id}
            className={`tool-tab ${activeTool === tool.id ? 'active' : ''}`}
            onClick={() => setActiveTool(tool.id)}
          >
            <span className="tab-icon">{tool.icon}</span>
            <div className="tab-text">
              <span className="tab-label">{tool.label}</span>
              <span className="tab-desc">{tool.desc}</span>
            </div>
            {activeTool === tool.id && (
              <motion.div
                className="tab-indicator"
                layoutId="tab-indicator"
                style={{ background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})` }}
              />
            )}
          </button>
        ))}
      </motion.div>

      {/* Active tool panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTool}
          className="tool-panel"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.25 }}
        >
          <div className="tool-panel-header">
            <span className="tool-panel-icon">{active.icon}</span>
            <div>
              <h2>{active.label}</h2>
              <p>{active.desc}</p>
            </div>
          </div>
          {active.component}
        </motion.div>
      </AnimatePresence>

      {/* Privacy note */}
      <motion.p
        className="privacy-note"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        🛡️ <strong>100% client-side</strong> — semua komputasi dilakukan di browser kamu menggunakan Web Crypto API dan pure JavaScript. Tidak ada teks atau hash yang dikirim ke mana pun.
      </motion.p>
    </div>
  )
}

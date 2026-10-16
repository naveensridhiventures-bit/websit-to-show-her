import { useEffect, useRef, useState } from 'react'

// ✏️ EDIT THESE
const HER_NAME = 'My Girl'
const HER_TAMIL_NAME = 'என் உயிரே'
const photos = [1,2,3,4,5,6,7].map((n, i) => `/photos/p${n}.${n === 2 ? 'png' : 'jpeg'}`)
const captions = ['Shine like this earring ✨','Bougainvillea queen 🌺','Anarkali vibes 🖤','Walking into my heart 🚶‍♀️','Slower. Calmer. Happier. 🌄','Sunshine in a smile ☀️','Smile that wins me 💖']
const quotes = [
  ['காதல் இல்லையேல் சாதல்','Without love, there is no life — Bharathiyar'],
  ['யாதும் ஊரே யாவரும் கேளிர்','Every place is home when you are with your own — Kaniyan Poongundranar'],
  ['அன்பே சிவம்','Love itself is divine'],
  ['எண்ணம் போல் வாழ்வு','Life follows the way you think'],
  ['நீ இருந்தா போதும்','Just you being there is enough 💞'],
]
const Q = [
  { q: 'Friday night plan?', a: [['Yuvan melodies + a long drive 🚗','y'],['Hip-hop beats + loud with friends 🎧','h']] },
  { q: 'Perfect concert moment?', a: [['Everybody singing along with lights on 📱','y'],['Crowd jumping when the drop hits 🔥','h']] },
  { q: 'Your Tamil quote style?', a: [['Soft & poetic 🌸','y'],['Punchy mass dialogue 😎','h']] },
  { q: 'Rainy day playlist?', a: [['Yuvan love songs 🌧️','y'],['Tamizha rap 🎤','h']] },
]

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && e.target.classList.add('in')), { threshold: .15 })
    document.querySelectorAll('.reveal').forEach(el => io.observe(el))
    return () => io.disconnect()
  })
}

function Hearts() {
  const items = Array.from({ length: 22 }, (_, i) => ({ l: (i * 47) % 100, d: 8 + (i % 7) * 2, s: 14 + (i % 5) * 8, de: (i % 9) * -1.5, e: ['💖','✨','🎵','🌸','💜'][i % 5] }))
  return <div className="hearts">{items.map((h, i) => <span key={i} style={{ left: h.l + '%', fontSize: h.s, animationDuration: h.d + 's', animationDelay: h.de + 's' }}>{h.e}</span>)}</div>
}

function Typing({ text }) {
  const [n, setN] = useState(0)
  useEffect(() => { setN(0); const t = setInterval(() => setN(v => v < text.length ? v + 1 : v), 90); return () => clearInterval(t) }, [text])
  return <span>{text.slice(0, n)}<i className="caret" /></span>
}

function Tilt({ children, className = '' }) {
  const r = useRef()
  const move = e => { const b = r.current.getBoundingClientRect(); const x = (e.clientX - b.left) / b.width - .5, y = (e.clientY - b.top) / b.height - .5; r.current.style.transform = `perspective(700px) rotateY(${x * 18}deg) rotateX(${-y * 18}deg) scale(1.04)` }
  return <div ref={r} className={className} onMouseMove={move} onMouseLeave={() => r.current.style.transform = ''}>{children}</div>
}

function Hero() {
  const [qi, setQi] = useState(0)
  useEffect(() => { const t = setInterval(() => setQi(v => (v + 1) % quotes.length), 5500); return () => clearInterval(t) }, [])
  return (
    <header className="hero">
      <img className="hero-photo" src={photos[2]} alt="" />
      <p className="small">a little website, just for</p>
      <h1 className="script">{HER_NAME}</h1>
      <h2 className="tamil glow">{HER_TAMIL_NAME}</h2>
      <p className="quote tamil"><Typing text={quotes[qi][0]} /></p>
      <p className="small">{quotes[qi][1]}</p>
      <a href="#gallery" className="btn pulse">Scroll, beautiful ↓</a>
    </header>
  )
}

function Gallery() {
  return (
    <section id="gallery" className="sec">
      <h2 className="title reveal">Moments of You 📸</h2>
      <div className="grid">
        {photos.map((p, i) => (
          <Tilt key={i} className="card reveal" >
            <img src={p} alt="" loading="lazy" />
            <div className="cap">{captions[i]}</div>
          </Tilt>
        ))}
      </div>
    </section>
  )
}

function Music() {
  const yt = q => `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`
  const cards = [
    ['🎹 Yuvan Magic','Melody, heartbreak, love — the king of feels','Yuvan Shankar Raja best melodies'],
    ['🎤 Hip-Hop Tamizha','Pure swag and Tamil pride','Hiphop Tamizha best songs'],
    ['🎪 Concert Night','Our next concert plan — you pick the artist!','Tamil live concert highlights'],
  ]
  return (
    <section className="sec">
      <h2 className="title reveal">Your Soundtrack 🎧</h2>
      <div className="grid three">
        {cards.map(([t, d, q]) => (
          <Tilt key={t} className="card music reveal">
            <h3>{t}</h3><p>{d}</p>
            <a className="btn" href={yt(q)} target="_blank" rel="noreferrer">▶ Play on YouTube</a>
          </Tilt>
        ))}
      </div>
    </section>
  )
}

function Quiz() {
  const [i, setI] = useState(0)
  const [s, setS] = useState({ y: 0, h: 0 })
  const done = i >= Q.length
  const pick = k => { setS(v => ({ ...v, [k]: v[k] + 1 })); setI(i + 1) }
  return (
    <section className="sec">
      <h2 className="title reveal">What's Your Vibe? 🎶</h2>
      <div className="panel reveal">
        {!done ? (<>
          <p className="small">Question {i + 1} / {Q.length}</p>
          <h3 key={i} className="pop">{Q[i].q}</h3>
          {Q[i].a.map(([t, k]) => <button key={t} className="opt" onClick={() => pick(k)}>{t}</button>)}
        </>) : (<div className="pop">
          <h3>{s.y >= s.h ? '🎹 You are a Yuvan Soul' : '🔥 You are a Hip-Hop Queen'}</h3>
          <p className="tamil">{s.y >= s.h ? 'மெல்லிசையில் மூழ்கும் மனசு 💜' : 'தமிழன் என்று சொல்லடா, தலை நிமிர்ந்து நில்லடா 🎤'}</p>
          <p>Either way, I'll be right next to you at the next concert. — Naveen</p>
          <button className="btn" onClick={() => { setI(0); setS({ y: 0, h: 0 }) }}>Play again</button>
        </div>)}
      </div>
    </section>
  )
}

function Business() {
  const [coins, setCoins] = useState(0), [per, setPer] = useState(1), [auto, setAuto] = useState(0), [pops, setPops] = useState([])
  useEffect(() => { const t = setInterval(() => setCoins(c => c + auto), 1000); return () => clearInterval(t) }, [auto])
  const click = e => { setCoins(c => c + per); const id = Math.random(); setPops(p => [...p, { id, x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY }]); setTimeout(() => setPops(p => p.filter(q => q.id !== id)), 800) }
  const costP = 20 * per, costA = 50 * (auto + 1)
  const level = coins < 100 ? 'Street Stall 🛒' : coins < 500 ? 'Local Hall 🏟️' : coins < 2000 ? 'Arena Show 🎪' : 'Stadium Concert Empire 👑'
  return (
    <section className="sec">
      <h2 className="title reveal">Our Concert Business 💰</h2>
      <div className="panel reveal">
        <p className="small">Tap to sell tickets & earn. Reach the stadium!</p>
        <h3>₹ {coins.toLocaleString()}</h3><p>{level}</p>
        <div className="tap-wrap"><button className="tap" onClick={click}>🎟️</button>{pops.map(p => <b key={p.id} className="float-up" style={{ left: p.x, top: p.y }}>+{per}</b>)}</div>
        <button className="btn" disabled={coins < costP} onClick={() => { setCoins(coins - costP); setPer(per + 1) }}>Better tickets (+1/tap) — {costP}</button>
        <button className="btn" disabled={coins < costA} onClick={() => { setCoins(coins - costA); setAuto(auto + 2) }}>Hire fans (+2/sec) — {costA}</button>
      </div>
    </section>
  )
}

function Memory() {
  const base = [photos[1], photos[2], photos[4], photos[5]]
  const [cards, setCards] = useState(() => [...base, ...base].map((p, i) => ({ p, i, o: false, m: false })).sort(() => Math.random() - .5))
  const [sel, setSel] = useState([]), [moves, setMoves] = useState(0)
  const flip = k => {
    if (sel.length === 2 || cards[k].o || cards[k].m) return
    const c = cards.map((x, j) => j === k ? { ...x, o: true } : x); setCards(c)
    const s = [...sel, k]; setSel(s)
    if (s.length === 2) {
      setMoves(m => m + 1)
      setTimeout(() => {
        setCards(cs => cs.map((x, j) => s.includes(j) ? (cs[s[0]].p === cs[s[1]].p ? { ...x, m: true } : { ...x, o: false }) : x)); setSel([])
      }, 800)
    }
  }
  const won = cards.every(c => c.m)
  return (
    <section className="sec">
      <h2 className="title reveal">Match Her Moments 🃏</h2>
      <p className="small">Moves: {moves}</p>
      <div className="mem reveal">
        {cards.map((c, k) => <div key={k} className={'flip ' + (c.o || c.m ? 'on' : '')} onClick={() => flip(k)}><div className="face back">💖</div><div className="face front"><img src={c.p} alt="" /></div></div>)}
      </div>
      {won && <h3 className="pop glow">You found every moment of her! 🎉 In {moves} moves.</h3>}
    </section>
  )
}

function Quotes() {
  return (
    <section className="sec">
      <h2 className="title reveal">Tamil Words for You 🌺</h2>
      <div className="grid three">
        {quotes.map(([t, e]) => <Tilt key={t} className="card quote-card reveal"><p className="tamil big">{t}</p><p className="small">{e}</p></Tilt>)}
      </div>
    </section>
  )
}

export default function App() {
  useReveal()
  return (
    <>
      <Hearts />
      <Hero /><Gallery /><Music /><Quiz /><Business /><Memory /><Quotes />
      <footer className="foot"><p className="script big">Made with ❤️ by Naveen</p><p className="tamil">என்றும் உன்னோடு 💞</p></footer>
    </>
  )
}

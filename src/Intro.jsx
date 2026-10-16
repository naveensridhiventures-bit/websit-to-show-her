import { useState } from 'react'

// ✏️ Put Naveen's WhatsApp number with country code, digits only (example: 919876543210)
const NAVEEN_PHONE = ''

const rateReply = n =>
  n <= 3 ? 'ஐயோ! 😭 அடுத்த தடவை better-ஆ try பண்றேன்'
  : n <= 6 ? 'பரவால்ல… improve பண்ணிக்கிறேன் 😅'
  : n <= 9 ? 'நல்ல score! 😎 Popcorn என் செலவு 🍿'
  : 'ஹுகும்! 🔥 Tiger ka Hukum!'

export default function Intro({ onDone }) {
  const [step, setStep] = useState(0)
  const [noCount, setNoCount] = useState(0)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [song, setSong] = useState('')
  const [rate, setRate] = useState(0)
  const [burst, setBurst] = useState(false)

  const next = () => { setBurst(true); setTimeout(() => setBurst(false), 1200); setStep(s => s + 1) }
  const dodge = () => { setNoCount(c => c + 1); setPos({ x: (Math.random() - .5) * 220, y: (Math.random() - .5) * 160 }) }
  const yt = q => `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`
  const msg = `Jailer 2 Sunday: போவோம் 🎟️\nSong: ${song}\nRating: ${rate}/10`
  const wa = `https://wa.me/${NAVEEN_PHONE}?text=${encodeURIComponent(msg)}`

  return (
    <div className="intro">
      {burst && <div className="confetti">{Array.from({ length: 26 }, (_, i) => <span key={i} style={{ left: (i * 37) % 100 + '%', animationDelay: (i % 8) * .06 + 's' }}>{['🎉','🍿','🎬','✨','🎶'][i % 5]}</span>)}</div>}

      {step === 0 && <div className="step pop">
        <h1 className="tamil">ஹாய்… 👀</h1>
        <p className="tamil big">ஒரு சின்ன கேள்வி இருக்கு</p>
        <button className="btn pulse" onClick={next}>கேளு 😏</button>
      </div>}

      {step === 1 && <div className="step pop">
        <div className="ticket"><small>ADMIT TWO</small><h2>JAILER 2 🎬</h2><small>SUNDAY • FIRST SHOW</small></div>
        <p className="tamil big">ஞாயிற்றுக்கிழமை Jailer 2 க்கு போவோமா?</p>
        <div className="row">
          <button className="btn" onClick={next}>போவோம்! 🎟️</button>
          {noCount < 4
            ? <button className="btn ghost" style={{ transform: `translate(${pos.x}px,${pos.y}px)` }} onMouseEnter={dodge} onTouchStart={dodge}>வேணாம் 🙄</button>
            : <button className="btn ghost" onClick={next}>சரி சரி, போவோம் 😅</button>}
        </div>
        {noCount > 0 && noCount < 4 && <p className="small">அந்த பட்டன் புடிக்க முடியாது 😜</p>}
      </div>}

      {step === 2 && <div className="step pop">
        <div className="eq">{Array.from({ length: 9 }, (_, i) => <i key={i} style={{ animationDelay: i * .12 + 's' }} />)}</div>
        <p className="tamil big">Yuvan song ஒண்ணா கேக்கலாமா? 🎧</p>
        {!song ? <div className="row">
          <button className="btn" onClick={() => setSong('Yuvan melody')}>கண்டிப்பா 🎶</button>
          <button className="btn ghost" onClick={() => setSong('Hip-hop first, Yuvan later')}>முதல்ல Hip-hop 😜</button>
        </div> : <>
          <a className="btn" target="_blank" rel="noreferrer" href={yt(song.startsWith('Yuvan') ? 'Yuvan Shankar Raja love songs' : 'Hiphop Tamizha songs')}>▶ இப்போ கேக்கலாம்</a>
          <button className="btn ghost" onClick={next}>அடுத்தது →</button>
        </>}
      </div>}

      {step === 3 && <div className="step pop">
        <p className="tamil big">கடைசி கேள்வி… Naveen-ஐ உனக்கு பிடிக்குமா? 😎</p>
        <p className="small">1 முதல் 10 வரை rate பண்ணு</p>
        <div className="nums">{Array.from({ length: 10 }, (_, i) => i + 1).map(n =>
          <button key={n} className={'num ' + (rate === n ? 'sel' : '')} onClick={() => setRate(n)}>{n}</button>)}</div>
        {rate > 0 && <div className="pop">
          <p className="tamil big glow">{rateReply(rate)}</p>
          <a className="btn" target="_blank" rel="noreferrer" href={wa}>📲 Naveen-க்கு answer அனுப்பு</a>
          <button className="btn ghost" onClick={onDone}>உள்ளே போ ✨</button>
        </div>}
      </div>}

      <p className="small foot-note">made by Naveen</p>
    </div>
  )
}

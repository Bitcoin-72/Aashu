import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'motion/react'
import { ArrowDown, ArrowUp, Check, ChevronRight, Flower2, Heart, LockKeyhole, Moon, Sparkles, Star, Sun, X } from 'lucide-react'
import { apologyParagraphs, missedParagraphs, photos, promises, reunionPlans } from './data/content'

const noMessages = [
  'Areyyyy, wrong button 😂',
  'Nice try, Aashu. Try again.',
  'HAHAHAHA why are you chasing me 😭',
  'Even this button knows we belong together.',
  "Okay, I'm officially scared of you.",
  'Fineeee, I surrender. But I still love you.',
]

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const visible = useInView(ref, { once: true, margin: '-80px' })
  return <motion.div ref={ref} className={className} initial={{ opacity: 0, y: 28 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>{children}</motion.div>
}

function App() {
  const [opened, setOpened] = useState(false)
  const [lightbox, setLightbox] = useState<number | null>(null)
  const [egg, setEgg] = useState('')
  const [noAttempts, setNoAttempts] = useState(0)
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 })
  const [celebrating, setCelebrating] = useState(false)
  const [hugged, setHugged] = useState(false)
  const [reunion, setReunion] = useState(false)
  const [checkedPlans, setCheckedPlans] = useState<number[]>([])
  const [finalHug, setFinalHug] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [soobhaMessage, setSoobhaMessage] = useState('')
  const [soobhaBurst, setSoobhaBurst] = useState(false)
  const touchStart = useRef(0)
  const slideCount = 13

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === 'PageDown') setCurrentSlide((value) => Math.min(value + 1, slideCount - 1))
      if (event.key === 'ArrowLeft' || event.key === 'PageUp') setCurrentSlide((value) => Math.max(value - 1, 0))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const moveNo = () => {
    const x = Math.round((Math.random() - 0.5) * 180)
    const y = Math.round((Math.random() - 0.5) * 100)
    setNoAttempts((value) => Math.min(value + 1, noMessages.length))
    setNoPosition({ x, y })
  }

  const showEgg = (message: string) => {
    setEgg(message)
    window.setTimeout(() => setEgg(''), 3200)
  }

  const makeSoobha = () => {
    const messages = ['Another SOOBHA with my favourite human.', 'SOOBHA officially reserved for Aashu.', "Tirthu's favourite SOOBHA is the one spent with you.", '1000 more SOOBHAs, please.', 'SOOBHA loading... LOVE FOUND.', 'Every SOOBHA, always you.', 'SOOBHA approved by the heart committee.', 'A little SOOBHA, a lot of love.', 'The best SOOBHA is our SOOBHA.', 'SOOBHA mode: hopelessly in love.']
    setSoobhaMessage(messages[Math.floor(Math.random() * messages.length)])
    setSoobhaBurst(true)
    window.setTimeout(() => setSoobhaBurst(false), 1800)
  }

  const goToSlide = (value: number) => setCurrentSlide(Math.max(0, Math.min(value, slideCount - 1)))

  return (
    <div className="app">
      <div className="grain" aria-hidden="true" />
      <nav className="nav">
        <button className="brand-heart" onClick={() => showEgg('Psst... Tirth is hopelessly in love with you.')}>T<Heart size={14} fill="currentColor" /></button>
        <div className="nav-links">
          {[['story', 'Our story', 0], ['letter', 'My apology', 2], ['memories', 'Memories', 3], ['promises', 'Promises', 4], ['missed', 'Nine days', 5], ['home', 'H1-401', 7], ['question', 'One question', 12]].map(([id, label, index]) => (
            <a key={id} href={`#${id}`} onClick={(event) => { event.preventDefault(); goToSlide(Number(index)) }}>{label}</a>
          ))}
        </div>
      </nav>
      <aside className="chapter-rail" aria-label="Story navigation">
        <div className="slide-progress" aria-label={`Chapter ${currentSlide + 1} of ${slideCount}`}><span>{String(currentSlide + 1).padStart(2, '0')} / {String(slideCount).padStart(2, '0')} — {['ONE LITTLE SURPRISE', 'A LITTLE SOMETHING', 'AN APOLOGY FROM MY HEART', 'OUR FAVOURITE MEMORIES', 'PROMISES I WANT TO KEEP', 'NINE DAYS OF MISSING YOU', 'TOMORROW, FINALLY', 'OUR LITTLE HOME', 'SOOBHA FOREVER', 'REUNION PLANS', 'THE BIG QUESTION', 'YOU. ME. US.', 'ONE LAST SURPRISE'][currentSlide]}</span><div>{Array.from({ length: slideCount }, (_, index) => <button key={index} className={`${index < currentSlide ? 'complete ' : ''}${index === currentSlide ? 'active' : ''}`} onClick={() => goToSlide(index)} aria-label={`Go to chapter ${index + 1}`}><Heart size={9} fill={index <= currentSlide ? 'currentColor' : 'none'} /></button>)}</div></div>
        <div className="rail-next"><button className="heart-navigation" onClick={() => goToSlide(currentSlide + 1)} disabled={currentSlide === slideCount - 1} aria-label="Next chapter"><Heart size={34} fill="currentColor" /><ArrowDown className="rail-arrow" size={20} /></button><strong>{currentSlide === slideCount - 1 ? 'ONE LAST SURPRISE' : 'MORE LOVE AWAITS'}</strong><span>next chapter</span></div>
      </aside>

      <main className={`slide-deck slide-${currentSlide}`} onTouchStart={(event) => { touchStart.current = event.touches[0].clientX }} onTouchEnd={(event) => { const delta = event.changedTouches[0].clientX - touchStart.current; if (Math.abs(delta) > 50) goToSlide(currentSlide + (delta < 0 ? 1 : -1)) }}>
        <section className="hero" id="story">
          <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
          <motion.button className="hero-flower" onClick={() => showEgg('A flower for my favourite flower.')} animate={{ rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 5 }}><Flower2 size={40} /></motion.button>
          <motion.div className="hero-copy" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 1 }}>
            <p className="eyebrow">a tiny corner of the internet · 01 / 07</p>
            <h1>Heyyyy<br /><em>Aashuuuu</em> <Heart className="heading-heart" size={35} fill="currentColor" /></h1>
            <p className="hero-subtitle">Someone has something very important<br className="desktop-only" /> to tell you...</p>
            {!opened ? <button className="button button-dark" onClick={() => { setOpened(true); window.setTimeout(() => goToSlide(1), 300) }}>Open your surprise <span>↗</span></button> : <motion.div className="opened-note" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>For the girl who makes every ordinary day feel like a love story.</motion.div>}
            <p className="tiny-note">made with approximately 847293 hearts by Tirthu</p>
          </motion.div>
          <motion.div className="teddy" onClick={() => showEgg("He says you should stop being so pretty. He's getting distracted.")} animate={{ y: [0, -8, 0], rotate: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 3.5 }}>
            <div className="teddy-ear left" /><div className="teddy-ear right" />            <div className="teddy-face"><span className="teddy-eye left-eye" /><span className="teddy-eye right-eye" /><span className="teddy-mouth" /><Heart size={16} fill="currentColor" /></div>
          </motion.div>
          <Heart className="floating-heart heart-a" size={20} fill="currentColor" /><Heart className="floating-heart heart-b" size={20} fill="currentColor" /><Heart className="floating-heart heart-c" size={14} fill="currentColor" />
          <button className="scroll-cue" onClick={() => goToSlide(1)}><ArrowDown size={16} /> continue gently</button>
        </section>

        <section className="section disclaimer" id="disclaimer">
          <Reveal><p className="eyebrow">first things first · 02 / 07</p><h2>Before the big<br /><em>feelings...</em></h2><p className="lead">I know we had a little fight, and things got a bit messy. But before anything else, I want you to know that I love you. <strong>A LOT.</strong></p></Reveal>
          <div className="stat-grid">
            {[['100%', 'Love', 'No subscription required.'], ['0%', 'Intention to hurt you', 'Still working on my communication skills.'], ['∞', 'Us', 'Terms: we keep choosing each other.']].map(([number, title, copy], index) => <Reveal className="stat-card" key={title}><span className="stat-number">{number}</span><h3>{title}</h3><p>{copy}</p><span className="card-index">0{index + 1}</span></Reveal>)}
          </div>
        </section>

        <section className="letter-section slide" id="letter">
          <Reveal className="letter-paper">
            <div className="letter-top"><span>to my Aashu</span><span>08 / 11 / 26</span></div>
            <p className="eyebrow">okay, jokes apart · 03 / 07</p>
            <h2>My love,</h2>
            {apologyParagraphs.map((paragraph, index) => <p key={index} className={index === apologyParagraphs.length - 1 ? 'letter-emphasis' : ''}>{paragraph}</p>)}
            <div className="signature"><span>Your slightly stupid but extremely in-love boyfriend,</span><strong onClick={() => showEgg('Officially signed by your biggest admirer.')}>Tirthu <Heart size={24} fill="currentColor" /></strong></div>
            <div className="stamp">T + A<br /><small>always</small></div>
          </Reveal>
        </section>

        <section className="section memories slide" id="memories">
          <Reveal><div className="section-heading"><div><p className="eyebrow">our little world · 04 / 07</p><h2>Some of my favourite things<br /> are actually just <em>you.</em></h2></div><p className="side-note">tap a memory<br />to make it bigger ↗</p></div></Reveal>
          <div className="photo-grid">
            {photos.map((photo, index) => <Reveal className={`photo-card card-${index + 1}`} key={photo.src}><button onClick={() => setLightbox(index)}><img src={photo.src} alt={photo.alt} /><span className="photo-caption">{photo.caption}</span><span className="photo-number">0{index + 1}</span></button></Reveal>)}
            <button className="secret-heart" onClick={() => showEgg("You found a secret! Here's a thousand kisses.")}><Heart size={14} fill="currentColor" /></button>
          </div>
        </section>

        <section className="section promises slide" id="promises">
          <Reveal><p className="eyebrow">things I want you to know · 05 / 07</p><h2>Not perfect.<br /><em>Just present.</em></h2><p className="lead">These aren't unrealistic promises. They're the things I want to keep making an effort toward, with you.</p></Reveal>
          <div className="promise-list">{promises.map(([number, title, copy, icon]) => <Reveal className="promise-card" key={title}><span className="promise-icon">{icon}</span><span className="promise-number">{number}</span><div><h3>{title}</h3><p>{copy}</p></div><ChevronRight size={18} /></Reveal>)}</div>
        </section>

        <section className="missed-section slide" id="missed">
          <Reveal><p className="eyebrow">the emotional bit · 06 / 10</p><h2>DO YOU KNOW HOW MUCH<br /> I'VE MISSED YOU, <em>AASHUUUU?</em></h2><p className="missed-subtitle">NINE. WHOLE. DAYS. WITHOUT MY FAVOURITE HUMAN.</p></Reveal>
          <div className="elapsed-grid">{[['9', 'DAYS'], ['216', 'HOURS'], ['12,960', 'MINUTES'], ['WAY TOO MANY', 'SECONDS']].map(([value, unit]) => <div className="elapsed-card" key={unit}><strong>{value}</strong><span>{unit}</span></div>)}</div>
          <div className="missed-scene"><div className="lonely-teddy"><Heart size={34} /><span className="simple-bear"><span /><span /></span></div><div className="crossed-calendar"><b>NOV</b><strong>09</strong><small>9 days crossed out</small></div><div className="moon-character"><Moon size={48} fill="currentColor" /><span className="simple-face" /></div></div>
          <div className="missed-letter">{missedParagraphs.map((paragraph, index) => <motion.p key={paragraph} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .06 }}>{paragraph}</motion.p>)}</div>
          <div className="long-distance-path">♥　·　♥　·　♥　·　♥　·　♥</div>
        </section>

        <section className="reunion-section slide" id="reunion">
          <Reveal><p className="eyebrow">tomorrow / our little reunion</p><h2>THE WAIT IS<br /><em>ALMOST OVER.</em></h2><div className={`calendar-page ${reunion ? 'calendar-open' : ''}`}><span>MONDAY</span><strong>09</strong><b>NOVEMBER 2026</b></div><h3>THE DAY I FINALLY GET MY AASHU BACK.</h3><button className={`reunion-door ${reunion ? 'door-open' : ''}`} onClick={() => setReunion(true)} aria-label="Replay our reunion"><span>H1-401</span><i>tap to open</i><b><Heart size={18} fill="currentColor" /><Heart size={18} fill="currentColor" /></b></button><p className="reunion-copy">Imagine me seeing you tomorrow.<br /><br />I genuinely don't know whether I'll smile like an idiot, run towards you, or just stand there admiring you for a few seconds.<br /><br />Probably all three.<br /><br />But one thing is certain: you're getting a very, very long hug.<br /><br />I've been waiting nine days for that exact moment.</p><button className="button button-outline" onClick={() => { setReunion(false); window.setTimeout(() => setReunion(true), 100) }}>REPLAY OUR REUNION 🫂</button>{reunion && <motion.p className="reunion-message" initial={{ opacity: 0, scale: .7 }} animate={{ opacity: 1, scale: 1 }}>FINALLY TOGETHER. ♥</motion.p>}</Reveal>
        </section>

        <section className="home-section slide" id="home">
          <Reveal><p className="eyebrow">H1-401 / our little home</p><h2>AND THEN...<br /><em>H1-401.</em></h2><p className="home-subtitle">Not just a room. OUR LITTLE HOME.</p><div className="home-scene"><div className="window"><Moon className="window-moon" size={38} fill="currentColor" /><Star className="window-star star-one" size={12} fill="currentColor" /><Star className="window-star star-two" size={9} fill="currentColor" /><Sparkles className="window-sparkle" size={16} /><small>night sky</small></div><div className="bed"><div className="headboard" /><div className="sleeping-bears"><span className="bed-bear bear-one" /><span className="bed-bear bear-two" /></div><b>HOME <Heart size={10} fill="currentColor" /></b></div><div className="lamp"><Sun size={36} fill="currentColor" /><span className="sun-rays" /></div></div><div className="home-copy"><p>Do you know what I'm looking forward to the most?</p><p>Coming back to H1-401 with you.</p><p>After nine days of missing you, I cannot wait for the simplest things.</p><p>Finally lying next to you. Finally having you close enough that I don't need a phone or a screen. Finally being able to hold you whenever I want.</p><p>I want those lazy moments, those random conversations before sleeping, the silly jokes, the comfortable silences, the cuddles, and the feeling that we don't need to be anywhere else.</p><p>I want to sleep so peacefully with you. I want to wake up and see you next to me.</p><p>I want to steal the blanket, annoy you, get yelled at, and probably do it all over again.</p><p>I want H1-401 to be filled with our laughter, our little arguments, our hugs, our memories, and so much love.</p><p>Because tomorrow, it won't just be a room number. It'll be our little home again.</p><p>And honestly, I couldn't be more excited.</p></div><p className="goodnight">GOODNIGHT, AASHU. SEE YOU IN OUR LITTLE HOME. ♥</p></Reveal>
        </section>

        <section className={`soobha-section slide ${soobhaBurst ? 'soobha-burst' : ''}`} id="soobha">
          <Reveal><p className="eyebrow">our absolute inside joke / 08 / 12</p><div className="soobha-heart"><Heart size={30} fill="currentColor" /></div><h2>SOOOOOOBHAAAAAA <Heart size={35} fill="currentColor" /></h2><p className="soobha-intro">One thing I know for sure...</p><p className="soobha-dominant">I can't wait to spend my every SOOBHA with you.</p><div className="soobha-teddy"><span className="soobha-bear-face"><i /><i /></span><div>SOOBHA</div></div><div className="soobha-copy"><p>Aashuuuu,</p><p>I don't know how many SOOBHAs we'll get together. But I know I want every single one.</p><p>I want my mornings, afternoons, evenings, nights, random moments, lazy days, silly days, special days, and absolutely ordinary days with you.</p><p>I want to spend every SOOBHA laughing with you, annoying you, loving you, hugging you, and making memories.</p><p>I want our every SOOBHA to have a little bit of us in it.</p><p>Tomorrow is just another reminder of how much I want all the SOOBHAs that come after it.</p><p className="soobha-declaration">I WANT TO SPEND MY EVERY SOOBHA WITH YOU.<br /><small>Signed, Your Tirthu ♥</small></p></div><button className="button button-soobha" onClick={makeSoobha}>MAKE A SOOBHA ♥</button><p className="soobha-counter">SOOBHAs I want to spend with you: ∞</p>{soobhaMessage && <motion.p className="soobha-message" initial={{ opacity: 0, scale: .8 }} animate={{ opacity: 1, scale: 1 }}>{soobhaMessage}</motion.p>}</Reveal>
        </section>

        <section className="bucket-section slide" id="bucket">
          <Reveal><p className="eyebrow">a very serious plan · 08 / 10</p><h2>THINGS TIRTHU NEEDS<br />TO DO WITH <em>AASHU</em> TOMORROW.</h2><p className="bucket-note">A playful fantasy, not a schedule or an obligation. Just a little list of things I can't wait for.</p></Reveal>
          <div className="bucket-list">{reunionPlans.map((plan, index) => <button className={`bucket-item ${checkedPlans.includes(index) ? 'checked' : ''}`} key={plan} onClick={() => setCheckedPlans((current) => current.includes(index) ? current.filter((item) => item !== index) : [...current, index])}><span className="checkbox">{checkedPlans.includes(index) && <Check size={14} />}</span><span>{plan}</span>{checkedPlans.includes(index) && <span className="mini-heart">♥</span>}</button>)}</div>
          <p className="progress">REUNION PLANS COMPLETED: {checkedPlans.length} / 12</p>{checkedPlans.length === reunionPlans.length && <motion.p className="perfect-day" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>PERFECT DAY. NO FURTHER IMPROVEMENTS REQUIRED. ♥</motion.p>}
        </section>

        <section className="distance-section slide" id="distance">
          <Reveal><p className="eyebrow">the distance is temporary · 09 / 10</p><h2>9 days apart<br />was already <em>illegal.</em></h2><div className={`distance-figures ${hugged ? 'hugged' : ''}`}><div className="figure tirth">T <span>⌣</span></div><div className="path">♥　·　♥　·　♥</div><div className="figure aashu">A <span>⌣</span></div></div><p className="distance-copy">I hate being away from you.<br /><br />I miss your hugs, your face, your voice, your random conversations, and all the little things that make being with you feel like home.</p><button className="button button-outline" onClick={() => setHugged(true)}>Send a virtual hug <span>🫂</span></button>{hugged && <motion.p className="hug-message" initial={{ opacity: 0, scale: .8 }} animate={{ opacity: 1, scale: 1 }}>HUG DELIVERED SUCCESSFULLY ♥</motion.p>}</Reveal>
        </section>

        <section className="trust-section slide" id="trust">
          <Reveal><LockKeyhole className="trust-icon" size={22} /><p className="eyebrow">the important bit</p><h2>Trust isn't a button.<br />It's something we <em>build.</em></h2><p className="trust-copy">I don't want you to trust me just because I made a cute website. I want to earn your trust through the little things I do every day. Through how I listen, how I communicate, how I treat your feelings, and how I show up for you.</p><p className="trust-copy">I cannot promise that we'll never disagree. But I can promise that I want to keep learning how to love you better.</p><div className="big-heart">♥</div></Reveal>
        </section>

        <section className="question-section slide" id="question">
          <Reveal><p className="eyebrow">the final question / 10 / 10</p><h2>So... are we okay,<br /><em>my love?</em></h2><p className="lead">I have one extremely important question.</p><div className="question-character">T <Flower2 size={28} /></div><div className="question-actions"><button className="button button-yes" onClick={() => setCelebrating(true)}>YES <Heart size={17} fill="currentColor" /></button><motion.button className="button button-no" animate={{ x: noPosition.x, y: noPosition.y }} transition={{ type: 'spring', stiffness: 350, damping: 16 }} onMouseEnter={moveNo} onTouchStart={(event) => { event.preventDefault(); moveNo() }} onClick={() => showEgg("That's okay, baby. You don't have to say yes right now. I love you.")}>NO</motion.button></div>{noAttempts > 0 && <motion.p className="no-message" key={noAttempts} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>{noMessages[noAttempts - 1]}</motion.p>}<p className="tiny-note">psst... try tapping NO. I dare you.</p></Reveal>
        </section>
      </main>

      <div className="slide-controls"><button onClick={() => goToSlide(currentSlide - 1)} disabled={currentSlide === 0}><ArrowUp size={16} /> previous</button></div>
      <footer><span>Forever your Tirthu <i>♥</i></span><span>times Tirthu wanted to hug Aashu while making this: ∞</span><button onClick={() => goToSlide(0)}><ArrowUp size={16} /> restart story</button></footer>
      <AnimatePresence>{egg && <motion.div className="toast" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}>{egg}</motion.div>}</AnimatePresence>
      <AnimatePresence>{lightbox !== null && <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLightbox(null)}><button className="close-lightbox" onClick={() => setLightbox(null)}><X /></button><motion.img src={photos[lightbox].src} alt={photos[lightbox].alt} initial={{ scale: .85 }} animate={{ scale: 1 }} onClick={(event) => event.stopPropagation()} /><p>{photos[lightbox].caption}</p></motion.div>}</AnimatePresence>
      <AnimatePresence>{celebrating && <motion.div className="celebration" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><div className="confetti"><Heart /><Sparkles /><Heart /><Flower2 /><Heart /></div><Sparkles className="celebration-sparkle" /><p className="eyebrow">the best answer</p><h2>YAYYYYYYY<br /><em>AASHUUUU</em> <Heart size={45} fill="currentColor" /></h2><h3>MY FAVOURITE GIRL SAID YESSSS.</h3><p>Okay, now come here. I owe you the biggest hug ever.</p><div className="final-letter"><p>Aashuuuu,<br /><br />Nine days were too long. I've missed you more than I can explain, and tomorrow I finally get to make up for all those missed hugs, kisses, cuddles, conversations and little moments.<br /><br />I can't wait to see your face, hold you close, spend time with you, and fall asleep peacefully next to you in our H1-401.<br /><br />I want so many more tomorrows like this. I know we won't always get everything right. We'll misunderstand each other sometimes, we'll disagree, and we'll have things to learn.<br /><br />But I want us to keep figuring things out together. I want you to trust me, feel safe with me, and never doubt that your happiness and feelings matter to me.<br /><br />I don't need perfect. I just want you, me, and our little world.<br /><br />I love you, Aashi.<br /><br />See you tomorrow, my favourite person.<br /><br /><strong>All my love,<br />Your Tirthu ♥</strong></p></div><button className="button button-dark" onClick={() => setFinalHug(true)}>One last hug? 🫂</button>{finalHug && <motion.div className="final-hug" initial={{ scale: 0 }} animate={{ scale: 1 }}>LOVE YOU INFINITELY, AASHU. ♥</motion.div>}<button className="celebration-close" onClick={() => setCelebrating(false)}>close this little universe ×</button></motion.div>}</AnimatePresence>
    </div>
  )
}

export default App

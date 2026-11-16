import { useEffect, useState } from 'react'
import { config, projects, services, skills } from './data.js'

function Arrow() { return <span aria-hidden="true">↗</span> }

function Logo() {
  return <img className="logo-image" src="/logo.svg" alt="Mohith logo" />
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [headerHidden, setHeaderHidden] = useState(false)
  const [filter, setFilter] = useState('All')
  const [activeProject, setActiveProject] = useState(null)
  const [formState, setFormState] = useState('idle')
  const filters = ['All', 'Business', 'E-commerce', 'Restaurant', 'Real Estate', 'Fitness', 'SaaS', 'Music', 'POS']
  const visibleProjects = filter === 'All' ? projects : projects.filter((project) => project.type === filter)

  async function handleContactSubmit(event) {
    event.preventDefault()
    setFormState('sending')
    const form = event.currentTarget
    const formData = Object.fromEntries(new FormData(form))

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${config.email}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, _captcha: false }),
      })

      if (!response.ok) throw new Error('Message delivery failed')
      form.reset()
      setFormState('sent')
    } catch {
      const subject = encodeURIComponent('New portfolio enquiry')
      const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\n${formData.message}`)
      window.location.href = `mailto:${config.email}?subject=${subject}&body=${body}`
      setFormState('fallback')
    }
  }

  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible')
    }), { threshold: 0.12 })
    reveals.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    let previousScrollY = window.scrollY
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setHeaderHidden(currentScrollY > 80 && currentScrollY > previousScrollY)
      previousScrollY = currentScrollY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="site-shell">
      <div className="grain" />
      <header className={`nav-wrap ${headerHidden ? 'nav-hidden' : ''}`}>
        <nav className="nav container" aria-label="Primary navigation">
          <a className="wordmark" href="#top"><Logo /></a>
          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            {['About', 'Services', 'Work', 'Process', 'Contact'].map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>)}
            <a className="nav-cta" href="#contact" onClick={() => setMenuOpen(false)}>Start a project <Arrow /></a>
          </div>
          <button className="menu-toggle" type="button" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
        </nav>
      </header>

      <main id="top">
        <section className="hero container">
          <div className="hero-copy">
            <p className="eyebrow"><i /> Available for freelance projects</p>
            <h1 className="name-lockup" aria-label={config.name}>{config.name.split('').map((letter, index) => <span key={`${letter}-${index}`} style={{ '--i': index }}>{letter}</span>)}</h1>
            <div className="hero-bottom">
              <p className="hero-intro">Crafting digital experiences<br /><em>that stand out.</em></p>
              <div className="hero-note"><span>Based in India</span><span>Available worldwide</span></div>
            </div>
            <p className="hero-description">I design and build modern, responsive websites for businesses, brands and creators.</p>
            <div className="hero-actions"><a className="button button-dark" href="#work">View my work <Arrow /></a><a className="text-link" href="#contact">Let's work together <Arrow /></a></div>
          </div>
          <div className="hero-art" aria-label="Abstract browser interface visual">
            <div className="orbit orbit-one" /><div className="orbit orbit-two" />
            <div className="browser-card">
              <div className="browser-bar"><span /><span /><span /><b>mohith.studio</b></div>
              <div className="browser-content"><div className="mini-label">SELECTED / 01</div><strong>Make it<br /><em>meaningful.</em></strong><div className="mini-line" /><div className="mini-footer"><span>UI / UX</span><span>2026</span></div></div>
            </div>
            <div className="art-caption"><span>Independent digital<br />craft, with intent.</span><Arrow /></div>
            <div className="scroll-hint"><span className="scroll-line" /> Scroll to explore</div>
          </div>
        </section>

        <section className="marquee-band" aria-label="Capabilities"><div>{[...skills, ...skills].map((skill, index) => <span key={`${skill}-${index}`}>{skill} <b>✳</b></span>)}</div></section>

        <section className="section container about reveal" id="about">
          <div className="section-kicker">01 / About</div>
          <div className="about-content"><h2>More than<br /><em>just code.</em></h2><div className="about-text"><p className="lead">A website should feel like a natural extension of the people behind it. Useful, considered and unmistakably yours.</p><p>I combine sharp design with clean development to make digital experiences that give brands room to move. The goal is simple: make your next good idea easier to find, trust and remember.</p><a className="text-link" href="#contact">A little more about me <Arrow /></a></div></div>
          <div className="feature-row">{[['Design', 'Clear, modern interfaces with a human center.'], ['Development', 'Responsive, accessible and built to perform.'], ['Experience', 'Small moments that make a lasting impression.']].map(([title, copy]) => <article className="feature" key={title}><span className="feature-icon">✳</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
        </section>

        <section className="section services-section" id="services"><div className="container reveal"><div className="section-kicker">02 / Services</div><div className="section-heading"><h2>What I can<br /><em>build for you.</em></h2><p>From first sketch to final launch, I build digital spaces with a point of view.</p></div><div className="service-list">{services.map(([number, title, copy]) => <article className="service-item" key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p><Arrow /></article>)}</div></div></section>

        <section className="section container work-section reveal" id="work"><div className="section-kicker">03 / Selected work</div><div className="section-heading work-heading"><h2>Things made<br /><em>with intent.</em></h2><p>A collection of websites and digital experiences I've designed and developed.</p></div><div className="filter-row" role="group" aria-label="Filter projects">{filters.map((item) => <button className={filter === item ? 'active' : ''} onClick={() => setFilter(item)} key={item}>{item}</button>)}<span className="project-count">{visibleProjects.length} {visibleProjects.length === 1 ? 'project' : 'projects'}</span></div><div className="project-grid">{visibleProjects.map((project, index) => <article className={`project project-${project.tone}`} key={project.title} onClick={() => project.url ? window.open(project.url, '_blank', 'noopener,noreferrer') : setActiveProject(project)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); project.url ? window.open(project.url, '_blank', 'noopener,noreferrer') : setActiveProject(project) } }} role="button" tabIndex="0"><div className="project-visual">{project.image && <iframe className="project-preview" src={project.image} title={`${project.title} live preview`} loading="lazy" tabIndex="-1" />}{!project.image && <div className="visual-shape" />}</div><div className="project-meta"><div><span className="project-number">{String(index + 1).padStart(2, '0')} / {project.category}</span><h3>{project.title}</h3></div>{project.featured && <span className="project-badge">Featured</span>}<a className="project-link" href={project.url || '#contact'} target={project.url ? '_blank' : undefined} rel={project.url ? 'noreferrer' : undefined} onClick={(event) => event.stopPropagation()}>{project.url ? 'View live site' : 'View details'} <Arrow /></a></div><p>{project.description}</p><div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></article>)}</div></section>

        <section className="process-section" id="process"><div className="container reveal"><div className="section-kicker">04 / Process</div><div className="section-heading"><h2>How ideas become<br /><em>websites.</em></h2><p>A thoughtful process keeps the work clear, collaborative and moving forward.</p></div><div className="process-grid">{[['01', 'Discover', 'Understand your goals, audience and the opportunity.'], ['02', 'Design', 'Find the visual direction and structure that fits.'], ['03', 'Develop', 'Build the responsive experience with care.'], ['04', 'Launch', 'Test, refine and make it ready for the world.']].map(([number, title, copy]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>

        <section className="stats container reveal"><div><strong>10<span>+</span></strong><small>Projects built</small></div><div><strong>100<span>%</span></strong><small>Responsive</small></div><div><strong>24<span>/7</span></strong><small>Curious mind</small></div><div><strong>∞</strong><small>Possibilities</small></div></section>

        <section className="contact-section" id="contact"><div className="container reveal"><div className="section-kicker">05 / Contact</div><div className="contact-grid"><div><h2>Have a good<br /><em>idea?</em></h2><p>Let's turn it into something people remember.</p><div className="contact-details"><a href={`mailto:${config.email}`}>{config.email} <Arrow /></a><span>{config.whatsapp}</span></div></div><form onSubmit={handleContactSubmit}><input type="hidden" name="_subject" value="New portfolio enquiry" /><input type="hidden" name="_template" value="table" /><label>Name<input required name="name" placeholder="Your name" /></label><label>Email<input required type="email" name="email" placeholder="you@company.com" /></label><label>Phone number<input required type="tel" name="phone" placeholder="Your phone number" /></label><label>Tell me a little about it<textarea required name="message" rows="3" placeholder="A new website, a refresh, a wild idea..." /></label><button className="button button-light" type="submit" disabled={formState === 'sending'}>{formState === 'sending' ? 'Sending...' : formState === 'sent' ? 'Message sent' : 'Send a message'} <Arrow /></button>{formState === 'fallback' && <p className="form-status" role="status">Your email app is opening. Please send the prepared message there.</p>}{formState === 'sent' && <p className="form-status" role="status">Thanks, I’ll get back to you soon.</p>}</form></div></div></section>
      </main>

      <footer className="footer container"><a className="wordmark" href="#top"><Logo /></a><p>Designing digital experiences,<br />one website at a time.</p><div className="footer-links">{Object.entries(config.socials).map(([name, url]) => <a href={url} key={name} target="_blank" rel="noreferrer">{name}</a>)}</div><small>© 2026 Mohith. All rights reserved.</small></footer>
      <a className="whatsapp" href={`https://wa.me/${config.whatsapp.replace(/\D/g, '')}`} aria-label="Chat with me on WhatsApp"><span>↗</span><b>Chat with me</b></a>
      {activeProject && <div className="modal-backdrop" role="presentation" onClick={() => setActiveProject(null)}><div className={`project-modal project-${activeProject.tone}`} role="dialog" aria-modal="true" aria-label={activeProject.title} onClick={(event) => event.stopPropagation()}><button className="modal-close" aria-label="Close project details" onClick={() => setActiveProject(null)}>×</button><div className="modal-visual"><div className="visual-ui"><span>{activeProject.title}</span><b>2026</b></div></div><span className="project-number">{activeProject.category}</span><h2>{activeProject.title}</h2><p>{activeProject.description}</p><div className="modal-tags">{activeProject.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><a className="button button-dark" href="#contact" onClick={() => setActiveProject(null)}>Talk about a project <Arrow /></a></div></div>}
    </div>
  )
}

export default App

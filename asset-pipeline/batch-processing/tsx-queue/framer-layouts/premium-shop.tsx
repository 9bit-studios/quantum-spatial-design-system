import { addPropertyControls, ControlType } from 'framer'
import type { PremiumShopifyProps, ResponsiveNumber, ResponsiveBoolean } from './framer-types'

export default function PetersenShopifyPackage({ 
  clientName = "Petersen Games",
  projectType = "Shopify Premium Store",
  deliveryDate = "Monday",
  corePackagePrice = "$4,000",
  phase2Price = "$6,000",
  phase3Price = "$3,000",
  // Responsive controls
  headerFontSize = { default: 56, tablet: 40, mobile: 32 },
  taglineFontSize = { default: 24, tablet: 20, mobile: 18 },
  packageTitleFontSize = { default: 32, tablet: 28, mobile: 24 },
  containerPadding = { default: 32, tablet: 24, mobile: 16 },
  cardPadding = { default: 40, tablet: 32, mobile: 25 },
  gridColumns = { default: 2, tablet: 2, mobile: 1 },
  showNavSubtitle = { default: true, tablet: true, mobile: false },
  enableGlassEffects = { default: true, tablet: true, mobile: false },
  buttonMinHeight = { default: 44, tablet: 48, mobile: 56 },
  mobileBackgroundIntensity = 0.8
}: PremiumShopifyProps) {
  return (
    <div className="cosmic-presentation">
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .cosmic-presentation {
          font-family: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif';
          background: radial-gradient(ellipse at center, #0B0C1A 0%, #000000 100%);
          color: #ffffff;
          min-height: 100vh;
          cursor: none;
          position: relative;
          overflow-x: hidden;
        }

        /* Custom Cursor */
        .cosmic-cursor {
          position: fixed;
          width: 20px;
          height: 20px;
          background: radial-gradient(circle, #5AC8FA 0%, #6A3093 50%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          z-index: 10000;
          mix-blend-mode: screen;
          transition: transform 0.1s ease;
        }

        /* Animated Background */
        .cosmic-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          background: 
            radial-gradient(2px 2px at 20px 30px, #5AC8FA, transparent),
            radial-gradient(2px 2px at 40px 70px, #6A3093, transparent),
            radial-gradient(1px 1px at 90px 40px, #BF4080, transparent),
            radial-gradient(1px 1px at 130px 80px, #5AC8FA, transparent);
          background-size: 200px 200px;
          animation: cosmicDrift 20s linear infinite;
        }

        @keyframes cosmicDrift {
          0% { transform: translate(0, 0); }
          100% { transform: translate(-200px, -200px); }
        }

        /* Navigation */
        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 20px 40px;
          background: rgba(11, 12, 26, 0.8);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(90, 200, 250, 0.2);
        }

        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
        }

        .logo {
          font-size: 1.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #5AC8FA, #6A3093);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 20px rgba(90, 200, 250, 0.3);
        }

        .project-info {
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.9rem;
          font-weight: 300;
        }

        /* Container */
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 100px ${containerPadding.default}px 2rem;
        }

        .header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .header h1 {
          font-size: ${headerFontSize.default}px;
          font-weight: 700;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #5AC8FA, #6A3093, #BF4080);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 30px rgba(90, 200, 250, 0.3);
          line-height: 1.2;
        }

        .header .subtitle {
          font-size: ${taglineFontSize.default}px;
          font-weight: 300;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 2rem;
        }

        .header .description {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.7);
          max-width: 800px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* Glass Cards */
        .glass-card {
          background: rgba(13, 13, 21, 0.7);
          border: 1px solid rgba(90, 200, 250, 0.2);
          border-radius: 20px;
          padding: ${cardPadding.default}px;
          backdrop-filter: ${enableGlassEffects.default ? 'blur(20px)' : 'none'};
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          margin: 20px 0;
          position: relative;
          overflow: hidden;
        }

        .glass-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(90, 200, 250, 0.1), transparent);
          transition: left 0.8s;
        }

        .glass-card:hover::before {
          left: 100%;
        }

        /* Package Headers */
        .package-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid rgba(90, 200, 250, 0.2);
        }

        .package-title {
          font-size: ${packageTitleFontSize.default}px;
          color: #ffffff;
          font-weight: 600;
        }

        .package-price {
          font-size: 2.5rem;
          font-weight: bold;
          color: #5AC8FA;
          text-shadow: 0 0 20px rgba(90, 200, 250, 0.3);
        }

        .delivery-date {
          background: linear-gradient(45deg, #10b981, #3b82f6);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 50px;
          font-weight: bold;
          margin-left: 1rem;
          box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
        }

        /* Value Highlight */
        .value-highlight {
          background: linear-gradient(45deg, rgba(255, 236, 210, 0.1), rgba(252, 182, 159, 0.1));
          padding: 2rem;
          border-radius: 16px;
          margin: 2rem 0;
          border: 1px solid rgba(90, 200, 250, 0.2);
          backdrop-filter: blur(16px);
        }

        .value-highlight h3 {
          color: #ffffff;
          margin-bottom: 1rem;
          font-size: 1.4rem;
          font-weight: 600;
        }

        .value-highlight p {
          color: rgba(255, 255, 255, 0.8);
          font-size: 1.1rem;
          line-height: 1.6;
        }

        /* Deliverables Grid */
        .deliverables-grid {
          display: grid;
          grid-template-columns: repeat(${gridColumns.default}, 1fr);
          gap: 1.5rem;
          margin: 2rem 0;
        }

        .deliverable-item {
          background: rgba(13, 13, 21, 0.5);
          padding: 1.5rem;
          border-radius: 12px;
          border-left: 4px solid #5AC8FA;
          transition: all 0.3s ease;
          border: 1px solid rgba(90, 200, 250, 0.1);
        }

        .deliverable-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(90, 200, 250, 0.2);
          border-color: rgba(90, 200, 250, 0.3);
        }

        .deliverable-item h4 {
          color: #ffffff;
          margin-bottom: 0.5rem;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .deliverable-item p {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
          line-height: 1.5;
        }

        /* Security Badges */
        .security-badge {
          display: inline-block;
          background: linear-gradient(45deg, #ff6b6b, #ee5a24);
          color: white;
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: bold;
          margin: 0.2rem;
          box-shadow: 0 2px 8px rgba(255, 107, 107, 0.3);
        }

        /* Tech Stack */
        .tech-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 1.5rem;
        }

        .tech-item {
          background: linear-gradient(45deg, #5AC8FA, #6A3093);
          color: white;
          padding: 0.3rem 0.8rem;
          border-radius: 15px;
          font-size: 0.8rem;
          font-weight: 500;
          box-shadow: 0 2px 8px rgba(90, 200, 250, 0.3);
        }

        /* Timeline */
        .timeline {
          display: flex;
          justify-content: space-between;
          margin: 2rem 0;
          position: relative;
        }

        .timeline::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, #5AC8FA, #6A3093, #BF4080);
          z-index: 1;
        }

        .timeline-item {
          background: rgba(13, 13, 21, 0.8);
          padding: 1rem;
          border-radius: 10px;
          text-align: center;
          z-index: 2;
          position: relative;
          box-shadow: 0 4px 8px rgba(0,0,0,0.3);
          flex: 1;
          margin: 0 0.5rem;
          border: 1px solid rgba(90, 200, 250, 0.2);
        }

        .timeline-item.completed {
          background: linear-gradient(45deg, #10b981, #3b82f6);
          color: white;
        }

        .timeline-item h4 {
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .timeline-item p {
          font-size: 0.8rem;
          opacity: 0.9;
        }

        /* CTA Section */
        .cta-section {
          text-align: center;
          margin-top: 4rem;
          padding: 3rem 2rem;
          background: rgba(10, 6, 33, 0.4);
          border-radius: 20px;
          backdrop-filter: blur(20px);
          border: 1px solid rgba(90, 200, 250, 0.2);
        }

        .cta-section h2 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          font-weight: 700;
          color: #ffffff;
        }

        .cta-section p {
          font-size: 1.2rem;
          margin-bottom: 2rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .cta-button {
          background: linear-gradient(45deg, #10b981, #3b82f6);
          color: white;
          padding: 1rem 2rem;
          border: none;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          margin: 0.5rem;
          box-shadow: 0 8px 24px rgba(16, 185, 129, 0.3);
          min-height: ${buttonMinHeight.default}px;
          min-width: ${buttonMinHeight.default}px;
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(16, 185, 129, 0.4);
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .container {
            padding: 80px ${containerPadding.tablet || containerPadding.default}px 1rem;
          }
          
          .header h1 {
            font-size: ${headerFontSize.tablet || headerFontSize.default}px;
          }
          
          .header .subtitle {
            font-size: ${taglineFontSize.tablet || taglineFontSize.default}px;
          }
          
          .package-title {
            font-size: ${packageTitleFontSize.tablet || packageTitleFontSize.default}px;
          }
          
          .glass-card {
            padding: ${cardPadding.tablet || cardPadding.default}px;
            backdrop-filter: ${enableGlassEffects.tablet !== false ? 'blur(20px)' : 'none'};
          }
          
          .deliverables-grid {
            grid-template-columns: repeat(${gridColumns.tablet || gridColumns.default}, 1fr);
          }
          
          .cta-button {
            min-height: ${buttonMinHeight.tablet || buttonMinHeight.default}px;
            min-width: ${buttonMinHeight.tablet || buttonMinHeight.default}px;
          }
        }
        
        @media (max-width: 768px) {
          .container {
            padding: 80px ${containerPadding.mobile || containerPadding.tablet || containerPadding.default}px 1rem;
          }
          
          .header h1 {
            font-size: ${headerFontSize.mobile || headerFontSize.tablet || headerFontSize.default}px;
          }
          
          .header .subtitle {
            font-size: ${taglineFontSize.mobile || taglineFontSize.tablet || taglineFontSize.default}px;
          }
          
          .package-title {
            font-size: ${packageTitleFontSize.mobile || packageTitleFontSize.tablet || packageTitleFontSize.default}px;
          }
          
          .glass-card {
            padding: ${cardPadding.mobile || cardPadding.tablet || cardPadding.default}px;
            margin: 10px 0;
            backdrop-filter: ${enableGlassEffects.mobile !== false ? 'blur(20px)' : 'none'};
          }
          
          .package-header {
            flex-direction: column;
            text-align: center;
          }
          
          .delivery-date {
            margin-left: 0;
            margin-top: 1rem;
          }
          
          .deliverables-grid {
            grid-template-columns: repeat(${gridColumns.mobile || gridColumns.tablet || gridColumns.default}, 1fr);
          }
          
          .timeline {
            flex-direction: column;
            gap: 1rem;
          }
          
          .timeline::before {
            display: none;
          }

          .cta-button {
            min-height: ${buttonMinHeight.mobile || buttonMinHeight.tablet || buttonMinHeight.default}px;
            min-width: ${buttonMinHeight.mobile || buttonMinHeight.tablet || buttonMinHeight.default}px;
          }
          
          .project-info {
            display: ${showNavSubtitle.mobile !== false ? 'block' : 'none'};
          }
        }

        /* Entrance Animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-in {
          animation: fadeInUp 0.8s ease forwards;
        }

        /* Pulse Animation */
        .pulse {
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(90, 200, 250, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(90, 200, 250, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(90, 200, 250, 0);
          }
        }
      `}</style>

      <div className="cosmic-cursor"></div>
      <div className="cosmic-background"></div>

      <nav className="nav">
        <div className="nav-content">
          <div className="logo">{clientName.toUpperCase()}</div>
          <div className="project-info">{projectType} - Cosmic Horror Ecommerce Excellence</div>
        </div>
      </nav>

      <div className="container">
        <div className="header">
          <h1>🎮 {clientName} Shopify Store</h1>
          <p className="subtitle">Premium Ecommerce Development with Advanced Security & Automation</p>
          <p className="description">
            Transform your cosmic horror gaming empire with a security-hardened Shopify store designed for the Cthulhu Mythos universe. 
            Built with enterprise-level protection and intelligent automation systems.
          </p>
        </div>

        {/* PHASE 1: IMMEDIATE DELIVERY */}
        <div className="glass-card animate-in">
          <div className="package-header">
            <div>
              <h2 className="package-title">Phase 1: Core Store Launch</h2>
              <span className="delivery-date">DELIVERING {deliveryDate.toUpperCase()}</span>
            </div>
            <div className="package-price">{corePackagePrice}</div>
          </div>

          <div className="value-highlight">
            <h3What You're Getting {deliveryDate}</h3>
            <p><strong>A fully functional, security-hardened Shopify store with advanced navigation and filtering that your customers will love.</strong> This isn't just another basic theme—it's a sophisticated ecommerce platform built specifically for your cosmic horror miniatures empire.</p>
          </div>

          <div className="deliverables-grid">
            <div className="deliverable-item">
              <h4>Enterprise-Level Security</h4>
              <p>Type-safe code architecture with vulnerability scanning. No data theft risks—every component has been secured and validated against cosmic intrusions.</p>
              <div style={{marginTop: '1rem'}}>
                <span className="security-badge">SQL Injection Protection</span>
                <span className="security-badge">XSS Prevention</span>
                <span className="security-badge">CSRF Guards</span>
                <span className="security-badge">Eldritch Protections</span>
              </div>
            </div>

            <div className="deliverable-item">
              <h4>Quantum Spatial Navigation</h4>
              <p>Dynamic, intelligent navigation that adapts to your game inventory. Customers find their desired Old Ones and expansions 3x faster with our tag-based filtering system.</p>
            </div>

            <div className="deliverable-item">
              <h4>Cosmic Horror Design System</h4>
              <p>Dark, immersive design following Apple HIG guidelines but themed for the Cthulhu Mythos. Optimized for mobile-first shopping experiences in the cosmic darkness.</p>
            </div>

            <div className="deliverable-item">
              <h4>⚡ Sanity-Preserving Performance</h4>
              <p>Lightning-fast loading, SEO-optimized product pages, and Core Web Vitals scoring in the green. Your customers won't lose their minds waiting for pages to load.</p>
            </div>

            <div className="deliverable-item">
              <h4>Game-Specific Features</h4>
              <p>Custom meta displays for game stats, faction power levels, collection feeds, and dedicated landing pages for Cthulhu Wars, Planet Apocalypse, and each game line.</p>
            </div>

            <div className="deliverable-item">
              <h4>Analytics-Ready Foundation</h4>
              <p>Pre-configured for Klaviyo and Grid API integration. Clean data structure for maximum automation potential—track every cultist conversion.</p>
            </div>
          </div>

          <div className="tech-stack">
            <span className="tech-item">Shopify Plus Ready</span>
            <span className="tech-item">Mobile Optimized</span>
            <span className="tech-item">SEO Configured</span>
            <span className="tech-item">Type Safety</span>
            <span className="tech-item">Progressive Web App</span>
            <span className="tech-item">Cosmic Horror Themed</span>
          </div>
        </div>

        {/* PHASE 2: AUTOMATION & GROWTH */}
        <div className="glass-card">
          <div className="package-header">
            <div>
              <h2 className="package-title">🤖 Phase 2: Automation & Growth Engine</h2>
              <span className="delivery-date">NEXT 4 WEEKS</span>
            </div>
            <div className="package-price">{phase2Price}</div>
          </div>

          <div className="value-highlight">
            <h3>Transform Visitors Into Loyal Cultists</h3>
            <p><strong>Intelligent email automation that works while you dream of R'lyeh.</strong> We're building a system that identifies your best customers and automatically nurtures them through personalized campaigns featuring exclusive miniatures and lore.</p>
          </div>

          <div className="deliverables-grid">
            <div className="deliverable-item">
              <h4>Klaviyo Email Automation</h4>
              <p>Welcome series for new cultists, abandoned cart recovery with cosmic urgency, post-purchase upsells, and game-specific campaigns. Expect 20-30% revenue increase from email alone.</p>
            </div>

            <div className="deliverable-item">
              <h4>Lead Magnets & Cult Recruitment</h4>
              <p>Exit-intent popups with eldritch warnings, game-specific lead magnets (free STL files of lesser beings), and progressive profiling to build your email congregation organically.</p>
            </div>

            <div className="deliverable-item">
              <h4>Grid API Analytics</h4>
              <p>Real-time performance tracking, customer behavior analysis, and conversion optimization insights. Data-driven decisions guided by cosmic intelligence, not mere mortal guesswork.</p>
            </div>

            <div className="deliverable-item">
              <h4>5 Game Landing Pages</h4>
              <p>Dedicated, conversion-optimized pages for Cthulhu Wars, Planet Apocalypse, Hyperspace, Evil High Priest, and Orcs Must Die with custom lore displays and targeted messaging.</p>
            </div>

            <div className="deliverable-item">
              <h4>Smart Product Features</h4>
              <p>Category feeds for each faction, collection sliders showcasing Old Ones, and recommendation engines that increase average order value by 25% through strategic upsells.</p>
            </div>

            <div className="deliverable-item">
              <h4>Social Media Integration</h4>
              <p>Link-in-bio optimization for Sandy's content, social proof integration showing community engagement, and branded presence across platforms spreading the cosmic word.</p>
            </div>
          </div>
        </div>

        {/* PHASE 3: PATREON & MEMBERSHIP */}
        <div className="glass-card">
          <div className="package-header">
            <div>
              <h2 className="package-title">Phase 3: Community & STL Membership</h2>
              <span className="delivery-date">MONTH 2</span>
            </div>
            <div className="package-price">{phase3Price}</div>
          </div>

          <div className="deliverables-grid">
            <div className="deliverable-item">
              <h4>Patreon Professional Upgrade</h4>
              <p>Cosmic horror media kit design, professional eldritch branding, and optimized tier structure to increase monthly revenue from the faithful.</p>
            </div>

            <div className="deliverable-item">
              <h4>STL Membership Platform</h4>
              <p>Integrated with Shopify, offering exclusive digital miniatures and creating recurring revenue stream from 3D printing cultists worldwide.</p>
            </div>

            <div className="deliverable-item">
              <h4>Content Strategy</h4>
              <p>Social media templates featuring Sandy's cosmic wisdom, email announcement systems for new releases, and community engagement tools for the growing cult.</p>
            </div>
          </div>
        </div>

        {/* TIMELINE */}
        <div className="glass-card">
          <h2 style={{textAlign: 'center', marginBottom: '2rem', color: '#ffffff'}}>📅 Project Timeline</h2>
          <div className="timeline">
            <div className="timeline-item completed">
              <h4>Week 1-3</h4>
              <p>Core Development</p>
              <small>COMPLETE</small>
            </div>
            <div className="timeline-item completed">
              <h4>{deliveryDate}</h4>
              <p>Store Launch</p>
              <small>DELIVERING</small>
            </div>
            <div className="timeline-item">
              <h4>Week 4-6</h4>
              <p>Automation Setup</p>
              <small>EMAIL FLOWS</small>
            </div>
            <div className="timeline-item">
              <h4>Month 2</h4>
              <p>Membership Platform</p>
              <small>👥 COMMUNITY</small>
            </div>
          </div>
        </div>

        {/* VALUE PROPOSITION */}
        <div className="glass-card">
          <h2 style={{textAlign: 'center', marginBottom: '2rem', color: '#ffffff'}}>Why This Investment Pays For Itself</h2>
          
          <div className="deliverables-grid">
            <div className="deliverable-item">
              <h4>Immediate Impact</h4>
              <p>Professional cosmic horror store increases conversion rates by 40-60%. Better UX = more miniature sales from day one.</p>
            </div>

            <div className="deliverable-item">
              <h4>Automation ROI</h4>
              <p>Email automation typically generates $40 for every $1 invested. Pay for itself in the first month of cultist conversions.</p>
            </div>

            <div className="deliverable-item">
              <h4>Risk Elimination</h4>
              <p>Security vulnerabilities can cost thousands in lost sales and reputation. We prevent eldritch intrusions and data breaches.</p>
            </div>

            <div className="deliverable-item">
              <h4>Scalability</h4>
              <p>Built to handle growth as your cosmic empire expands. No rebuilding needed as you venture into new realms and markets.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="cta-section">
          <h2>Ready to Launch Your Cosmic Empire?</h2>
          <p>Your custom Shopify store with advanced security and automation is ready to awaken {deliveryDate}.</p>
          
          <button className="cta-button">Launch Phase 1 - {corePackagePrice}</button>
          <button className="cta-button">Add Automation - {phase2Price}</button>
          <button className="cta-button">Full Package - $13,000</button>
          
          <p style={{marginTop: '2rem', opacity: 0.9}}>
            <strong>Next Steps:</strong> Schedule your store walkthrough and finalize {deliveryDate}'s deployment timeline.
          </p>
        </div>
      </div>
    </div>
  )
}

addPropertyControls(PetersenShopifyPackage, {
  clientName: {
    type: ControlType.String,
    defaultValue: "Petersen Games",
    title: "Client Name"
  },
  projectType: {
    type: ControlType.String,
    defaultValue: "Shopify Premium Store",
    title: "Project Type"
  },
  deliveryDate: {
    type: ControlType.String,
    defaultValue: "Monday",
    title: "Delivery Date"
  },
  corePackagePrice: {
    type: ControlType.String,
    defaultValue: "$4,000",
    title: "Phase 1 Price"
  },
  phase2Price: {
    type: ControlType.String,
    defaultValue: "$6,000",
    title: "Phase 2 Price"
  },
  phase3Price: {
    type: ControlType.String,
    defaultValue: "$3,000",
    title: "Phase 3 Price"
  },
  // Responsive Typography Controls
  headerFontSize: {
    type: ControlType.ResponsiveNumber,
    title: "Header Font Size",
    defaultValue: {
      default: 56,
      tablet: 40,
      mobile: 32,
    },
    min: 20,
    max: 80,
    unit: "px",
  },
  taglineFontSize: {
    type: ControlType.ResponsiveNumber,
    title: "Tagline Font Size",
    defaultValue: {
      default: 24,
      tablet: 20,
      mobile: 18,
    },
    min: 12,
    max: 32,
    unit: "px",
  },
  packageTitleFontSize: {
    type: ControlType.ResponsiveNumber,
    title: "Package Title Font Size",
    defaultValue: {
      default: 32,
      tablet: 28,
      mobile: 24,
    },
    min: 16,
    max: 48,
    unit: "px",
  },
  // Responsive Spacing Controls
  containerPadding: {
    type: ControlType.ResponsiveNumber,
    title: "Container Padding",
    defaultValue: {
      default: 32,
      tablet: 24,
      mobile: 16,
    },
    min: 8,
    max: 60,
    unit: "px",
  },
  cardPadding: {
    type: ControlType.ResponsiveNumber,
    title: "Card Padding",
    defaultValue: {
      default: 40,
      tablet: 32,
      mobile: 25,
    },
    min: 16,
    max: 80,
    unit: "px",
  },
  // Responsive Layout Controls
  gridColumns: {
    type: ControlType.ResponsiveNumber,
    title: "Grid Columns",
    defaultValue: {
      default: 2,
      tablet: 2,
      mobile: 1,
    },
    min: 1,
    max: 3,
    step: 1,
  },
  showNavSubtitle: {
    type: ControlType.ResponsiveBoolean,
    title: "Show Nav Subtitle",
    defaultValue: {
      default: true,
      tablet: true,
      mobile: false,
    },
  },
  enableGlassEffects: {
    type: ControlType.ResponsiveBoolean,
    title: "Enable Glass Effects",
    defaultValue: {
      default: true,
      tablet: true,
      mobile: false,
    },
  },
  // Apple HIG Compliance
  buttonMinHeight: {
    type: ControlType.ResponsiveNumber,
    title: "Button Min Height (Apple HIG)",
    defaultValue: {
      default: 44,
      tablet: 48,
      mobile: 56,
    },
    min: 44,
    max: 64,
    unit: "px",
  },
  // Visual Controls
  mobileBackgroundIntensity: {
    type: ControlType.Number,
    title: "Mobile Background Intensity",
    defaultValue: 0.8,
    min: 0.3,
    max: 1,
    step: 0.1,
  },
})
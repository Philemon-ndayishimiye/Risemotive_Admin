import { useNavigate } from "react-router-dom";
import image1 from "../assets/RM PROSPOT.jpg.jpeg";
import image2 from "../assets/RM TASKSPOT.jpg.jpeg";
import image4 from "../assets/RM INFOSPOT.jpg.jpeg";

export default function Hero() {
  const navigate = useNavigate();
  const images = [image1, image2, image4];
  const total = images.length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Jost:wght@300;400;500;600&display=swap');

        /* ─── Background ─────────────────────────── */
        .hero-section {
          background-color: #1E40AF;
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
        }

        .hero-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 55% 65% at 10% 60%, rgba(255,255,255,0.35) 0%, transparent 55%),
            radial-gradient(ellipse 45% 55% at 90% 30%, rgba(30,58,138,0.1) 0%, transparent 55%);
          pointer-events: none;
        }

        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          pointer-events: none;
          opacity: 0.45;
        }
        .blob-1 { width:380px; height:380px; background:rgba(255,255,255,0.5); top:-80px; left:-80px; }
        .blob-2 { width:280px; height:280px; background:rgba(59,130,246,0.2); bottom:-60px; right:5%; }

        /* ─── Layout ─────────────────────────────── */
        .hero-inner {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
          padding: clamp(70px,9vw,110px) clamp(24px,6vw,80px);
          display: flex;
          align-items: center;
          gap: clamp(48px,8vw,110px);
          width: 100%;
          flex-wrap: wrap;
          justify-content: center;
        }

        /* ─── Orbit circle ───────────────────────── */
        .circle-container {
          position: relative;
          --r: clamp(105px, 15vw, 155px);   /* orbit radius — tweak if needed */
          width:  clamp(270px, 40vw, 410px);
          height: clamp(270px, 40vw, 410px);
          flex-shrink: 0;
        }

        .ring-outer {
          position: absolute;
          inset: -22px;
          border-radius: 50%;
          border: 1.5px dashed rgba(30,58,138,0.28);
          animation: spinRing 35s linear infinite;
        }
        .ring-mid {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.55);
          box-shadow: 0 0 0 8px rgba(255,255,255,0.12), 0 0 50px rgba(59,130,246,0.12) inset;
        }

        /* Glassy center bubble */
        .circle-center {
          position: absolute;
          inset: 21%;
          border-radius: 50%;
          background-color: #ffffff;
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(255,255,255,0.85);
          box-shadow: 0 8px 32px rgba(30,58,138,0.14);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 16px;
        }
        .circle-center p {
          font-family: 'playfair', sans-serif;
          font-size: clamp(9.5px,1.35vw,11.5px);
          font-weight: 500;
          color: #374151;
          line-height: 1.55;
        }
        .circle-center span {
          display: block;
          margin-top: 17px;
          font-family: 'playfair', sans-serif;
          font-size: clamp(7px,0.9vw,13px);
          font-weight: 800;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #3B82F6;
        }

        /* ─── Orbiting images ────────────────────── */
        /*
          Each wrapper sits at the circle's exact center.
          orbitCW rotates it → translates along --r → counter-rotates.
          Result: wrapper travels in a circle; image stays upright.
          60 s = very slow revolution. Stagger 15 s per image = 90° apart.
        */
        .orbit-wrapper {
          position: absolute;
          top: 50%;
          left: 50%;
          width:  clamp(72px,10.5vw,90px);
          height: clamp(72px,10.5vw,90px);
          margin-top:  calc(clamp(72px,10.5vw,90px) / -2);
          margin-left: calc(clamp(72px,10.5vw,90px) / -2);
          animation: orbitCW 60s linear infinite;
          z-index: 10;
        }
      

        .orbit-wrapper img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #fff;
          box-shadow: 0 0 0 3px rgba(59,130,246,0.35), 0 6px 24px rgba(30,58,138,0.25);
          animation: counterCW 60s linear infinite;
          transition: box-shadow 0.3s ease;
        }
        

        .orbit-wrapper:hover img {
          box-shadow: 0 0 0 4px rgba(59,130,246,0.6), 0 10px 32px rgba(30,58,138,0.4);
        }

        @keyframes orbitCW {
          from { transform: rotate(0deg)   translateX(var(--r)) rotate(0deg);   }
          to   { transform: rotate(360deg) translateX(var(--r)) rotate(360deg); }
        }
        @keyframes counterCW {
          from { transform: rotate(0deg);    }
          to   { transform: rotate(-360deg); }
        }
        @keyframes spinRing {
          to { transform: rotate(360deg); }
        }

        /* ─── Text column ────────────────────────── */
        .hero-text {
          flex: 1;
          max-width: 550px;
          padding: 0 4px;
          font-family: 'playfair', sans-serif;
        }

        .eyebrow {
          font-family: 'playfair', sans-serif;
          font-size: 16px;
          font-style:italic;
          font-weight: 700;
          letter-spacing: 3.5px;
          text-transform: uppercase;
          color: #1D4ED8;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }
       

       .hero-title {
  font-family: 'playfair', sans-serif;
  font-size: clamp(16px,5.5vw,38px);
  font-weight: 600;
  color: #1E3A8A;
  line-height: 1.07;
  letter-spacing: 3px;
  margin-bottom: 22px;
}

.hero-title span {
  display: inline-block;
  opacity: 0;
  transform: translateY(20px);
  animation: letterAnim 2.5s ease-in-out infinite;
}

/* 🎨 Different colors per letter */
.hero-title span:nth-child(1) { color: #ffffff; animation-delay: 0s; }
.hero-title span:nth-child(2) { color: #ffffff; animation-delay: 0.15s; }
.hero-title span:nth-child(3) { color: #ffffff; animation-delay: 0.3s; }
.hero-title span:nth-child(4) { color: #ffffff; animation-delay: 0.45s; }
.hero-title span:nth-child(5) { color: #ffffff; animation-delay: 0.6s; }
.hero-title span:nth-child(6) { color: #ffffff; animation-delay: 0.75s; }
.hero-title span:nth-child(7) { color: #ffffff; animation-delay: 0.9s; }
.hero-title span:nth-child(8) { color: #ffffff; animation-delay: 0.45s; }
.hero-title span:nth-child(9) { color: #ffffff; animation-delay: 0.6s; }
.hero-title span:nth-child(10) { color: #ffffff; animation-delay: 0.75s; }
.hero-title span:nth-child(11) { color: #ffffff; animation-delay: 0.9s; }
.hero-title span:nth-child(12) { color: #ffffff; animation-delay: 0.9s; }
.hero-title span:nth-child(13) { color: #ffffff; animation-delay: 0.9s; }

@keyframes letterAnim {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }

  40% {
    opacity: 1;
    transform: translateY(0);
  }

  /* unify color */
  70% {
    color: #1E3A8A;
  }

  100% {
    opacity: 0;
    transform: translateY(-20px);
    color: #1E3A8A;
  }
}        .hero-title .accent { color:#1D4ED8;  }

        .hero-body {
          font-family: 'playfair', sans-serif;
          font-size: clamp(14px,1.6vw,16px);
          font-weight: 200;
          color:#ffffff;
          opacity: 1.85;
          line-height: 1.85;
          margin-bottom: 38px;
          max-width: 470px;
        }

        /* ─── Buttons ────────────────────────────── */
        .cta-row { display:flex; align-items:center; gap:22px; flex-wrap:wrap; }

        .btn-primary {
          background: #1D4ED8;
          color: #fff;
          font-family: 'playfair', sans-serif;
          font-weight: 600;
          font-size: 12px;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 14px 34px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(29,78,216,0.35);
          transition: all 0.3s ease;
        }
        .btn-primary:hover { background:#1e40af; transform:translateY(-2px); box-shadow:0 8px 28px rgba(29,78,216,0.45); }

        .btn-ghost {
          font-family: 'playfair', sans-serif;
          font-weight: 400;
          font-size: 13px;
          letter-spacing: 1px;
          color: #1D4ED8;
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          opacity: 0.75;
          transition: gap 0.3s ease, opacity 0.3s ease;
        }
        .btn-ghost:hover { gap:13px; opacity:1; }

        /* ─── Stats ──────────────────────────────── */
        .stats-row {
          display: flex;
          gap: 36px;
          margin-top: 44px;
          padding-top: 28px;
          border-top: 1px solid rgba(30,58,138,0.15);
          flex-wrap: wrap;
        }
        .stat-item .num { font-family: 'playfair', sans-serif; font-size:28px; font-weight:700; color:#ffffff; line-height:1; }
        .stat-item .label { font-family: 'playfair', sans-serif; font-size:11px; letter-spacing:2px; text-transform:uppercase; color:#ffffff; font-weight:700 margin-top:5px; opacity:0.8; }

        /* ─── Responsive ─────────────────────────── */
        @media (max-width: 768px) {
          .hero-inner { flex-direction:column-reverse; text-align:center; }
          .eyebrow    { justify-content:center; }
          .hero-body  { margin:0 auto 38px; }
          .cta-row    { justify-content:center; }
          .stats-row  { justify-content:center; }
        }
      `}</style>

      <section className="hero-section">
        <div className="blob blob-1" />
        <div className="blob blob-2" />

        <div className="hero-inner">
          {/* ── Left: orbiting circle ── */}
          <div className="circle-container">
            <div className="ring-outer" />
            <div className="ring-mid" />

            <div className="circle-center">
              <p className="">
                Rise Motive Ltd, your gateway for products, services, and
                opportunities. Explore our Clusters; RM TaskSpot, RM ProSpot,
                and RM InfoSpot.
              </p>
              <span>Rise Motive Ltd</span>
            </div>

            {images.map((src, i) => {
              const delay = -(i * (60 / images.length)); // dynamic spacing

              return (
                <div
                  className="orbit-wrapper"
                  key={i}
                  style={{ animationDelay: `${delay}s` }}
                >
                  <img
                    src={src}
                    alt={`Product ${i + 1}`}
                    style={{ animationDelay: `${delay}s` }}
                  />
                </div>
              );
            })}
          </div>

          {/* ── Right: text ── */}
          <div className="hero-text">
            <p className="eyebrow"></p>

            <h1 className="hero-title">
              <span>I</span>
              <span>F</span>
              <span></span>
              <span>Y</span>
              <span>O</span>
              <span>U</span>
              <span></span>
              <span>R</span>
              <span>I</span>
              <span>S</span>
              <span>E</span>
              <span></span>
              <span>W</span>
              <span>E</span>
              <span></span>
              <span>R</span>
              <span>I</span>
              <span>S</span>
              <span>E</span>
            </h1>

            <p className="hero-body">
              Rise Motive Ltd builds systems that empower communities to learn,
              create, earn, and access digital services ensuring individuals and
              businesses thrive in a rapidly evolving world.
            </p>

            {/* <div className="cta-row">
              <button className="btn-primary">Discover More</button>
              <button className="btn-ghost">
                Our Mission
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div> */}

            <div className="stats-row">
              {[
                { num: "4+", label: "Core Platforms" },
                { num: "10K+", label: "People Reached" },
                { num: "100%", label: "Digital-First" },
              ].map(({ num, label }) => (
                <div className="stat-item" key={label}>
                  <div className="num">{num}</div>
                  <div className="label">{label}</div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-8 mt-20">
              <button
                onClick={() => navigate("/taskSpot#services")}
                className="px-6 py-3 bg-transparent cursor-pointer border border-white/60 hover:bg-white/10 active:scale-95 text-white text-sm font-semibold rounded-lg transition-all duration-200 font-family-poppins"
              >
                Submit A Task
              </button>
              <button
                onClick={() => navigate("/proSpot#product")}
                className="px-6 py-3 cursor-pointer bg-transparent border border-white/60 hover:bg-white/10 active:scale-95 text-white text-sm font-semibold rounded-lg transition-all duration-200 font-family-poppins"
              >
                Order Products
              </button>
            </div>
          </div>
        </div>
      </section>

      <div></div>
    </>
  );
}

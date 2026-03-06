import React, { useState, useEffect, useRef } from "react";

const R = "#D0021B";
const BK = "#111111";
const WH = "#FFFFFF";
const CR = "#F7F4F0";
const GY = "#7a7a7a";

const PHOTOS = {
  hero:        "https://picsum.photos/id/1015/1800/900",
  guilin:      "https://picsum.photos/id/1003/900/600",
  shanghai:    "https://picsum.photos/id/1040/900/600",
  tibet:       "https://picsum.photos/id/1018/900/600",
  yunnan:      "https://picsum.photos/id/1080/900/600",
  xian:        "https://picsum.photos/id/1043/900/600",
  zhangjiajie: "https://picsum.photos/id/1022/900/600",
  strip1:      "https://picsum.photos/id/1036/600/400",
  strip2:      "https://picsum.photos/id/1047/600/400",
  strip3:      "https://picsum.photos/id/1055/600/400",
  strip4:      "https://picsum.photos/id/1059/600/400",
  strip5:      "https://picsum.photos/id/1038/600/400",
};


const LANGS = {
  es: {
    nav: ["Destinos", "Viajes", "Personalizar", "Nosotros", "Contacto"],
    hero_eyebrow: "Viajes a China desde Europa",
    hero_title: ["Descubre", "la China", "auténtica"],
    hero_sub: "Itinerarios exclusivos con guías en español, visado sin estrés y experiencias únicas.",
    hero_cta: "Ver Itinerarios",
    hero_cta2: "Consulta Gratuita",
    stat1: "Viajeros", stat2: "Destinos", stat3: "Años",
    dest_label: "DESTINOS",
    dest_title: "¿A dónde te llevamos?",
    gallery_label: "MOMENTOS",
    gallery_title: "China te espera",
    tours_label: "ITINERARIOS",
    tours_title: "Viajes que recordarás",
    tours_sub: "Diseñados para viajeros europeos que quieren ir más allá",
    why_label: "POR QUÉ NOSOTROS",
    why_title: "Tu viaje empieza aquí",
    trust: [
      { icon: "visa", t: "Asistencia de Visado", d: "Te guiamos paso a paso en todo el proceso" },
      { icon: "guide", t: "Guías en Español", d: "Tu idioma en cada ciudad, en cada momento" },
      { icon: "team", t: "Equipo en Europa", d: "Con sede en España y socios locales en China" },
      { icon: "custom", t: "Viaje a tu Medida", d: "Nada de grupos masivos. Cada viaje es único" },
    ],
    rev_label: "TESTIMONIOS",
    rev_title: "Lo que dicen nuestros viajeros",
    cta_title: "¿Tienes alguna pregunta?",
    cta_sub: "Escríbenos por WhatsApp o WeChat. Respondemos en menos de 24 horas y diseñamos tu viaje sin compromiso.",
    cta_btn: "Hablar con un experto",
    contact_name: "Tu nombre", contact_email: "Tu email", contact_dest: "Destino de interés",
    from: "Desde", days: "días", book: "Ver itinerario →", seeall: "Ver todos →",
  },
  en: {
    nav: ["Destinations", "Tours", "Customize", "About", "Contact"],
    hero_eyebrow: "China Journeys from Europe",
    hero_title: ["Discover", "authentic", "China"],
    hero_sub: "Exclusive itineraries with Spanish-speaking guides, stress-free visas and unique experiences.",
    hero_cta: "Explore Tours",
    hero_cta2: "Free Consultation",
    stat1: "Travellers", stat2: "Destinations", stat3: "Years",
    dest_label: "DESTINATIONS",
    dest_title: "Where shall we take you?",
    gallery_label: "MOMENTS",
    gallery_title: "China awaits",
    tours_label: "ITINERARIES",
    tours_title: "Journeys you'll never forget",
    tours_sub: "Built for European travellers who want to go beyond the surface",
    why_label: "WHY US",
    why_title: "Your journey starts here",
    trust: [
      { icon: "visa", t: "Visa Assistance", d: "Step-by-step guidance through the whole process" },
      { icon: "guide", t: "Spanish-Speaking Guides", d: "Your language in every city, every moment" },
      { icon: "team", t: "European-Based Team", d: "HQ in Spain, local partners across China" },
      { icon: "custom", t: "Tailor-Made Travel", d: "No mass groups. Every trip is one of a kind" },
    ],
    rev_label: "TESTIMONIALS",
    rev_title: "What our travellers say",
    cta_title: "Have a question?",
    cta_sub: "Message us on WhatsApp or WeChat. We reply within 24 hours and design your trip with no commitment.",
    cta_btn: "Talk to an expert",
    contact_name: "Your name", contact_email: "Your email", contact_dest: "Destination of interest",
    from: "From", days: "days", book: "View itinerary →", seeall: "See all →",
  },
  zh: {
    nav: ["目的地", "行程", "定制游", "关于我们", "联系"],
    hero_eyebrow: "从欧洲出发，探索中国",
    hero_title: ["发现", "真实的", "中国"],
    hero_sub: "专为旅欧人士打造的深度游，双语导游、签证协助，带您体验不一样的中国。",
    hero_cta: "查看行程",
    hero_cta2: "免费咨询",
    stat1: "旅行者", stat2: "目的地", stat3: "年经验",
    dest_label: "目的地",
    dest_title: "我们带您去哪里？",
    gallery_label: "旅途瞬间",
    gallery_title: "中国在等您",
    tours_label: "行程",
    tours_title: "令您难忘的旅程",
    tours_sub: "专为欧洲出发、追求深度体验的旅行者设计",
    why_label: "为什么选择我们",
    why_title: "旅程从这里开始",
    trust: [
      { icon: "visa", t: "签证全程协助", d: "手把手指导，轻松完成签证申请" },
      { icon: "guide", t: "双语导游服务", d: "中文、西班牙语，随时为您解说" },
      { icon: "team", t: "欧洲本地团队", d: "总部西班牙，合作伙伴遍布中国" },
      { icon: "custom", t: "私人定制行程", d: "告别跟团旅游，每段旅程都独一无二" },
    ],
    rev_label: "旅行者评价",
    rev_title: "他们这样说",
    cta_title: "有任何疑问？",
    cta_sub: "通过微信或 WhatsApp 联系我们，24小时内回复，免费为您定制专属行程。",
    cta_btn: "联系旅行顾问",
    contact_name: "您的姓名", contact_email: "邮箱地址", contact_dest: "感兴趣的目的地",
    from: "起价", days: "天", book: "查看行程 →", seeall: "查看全部 →",
  },
};

const destinations = [
  { key: "guilin",      photo: PHOTOS.guilin,      name: { es: "Guilin",    en: "Guilin",    zh: "桂林"  }, tag: { es: "Naturaleza", en: "Nature",   zh: "自然" }, desc: { es: "Karst eterno y ríos esmeralda",          en: "Eternal karst and emerald rivers",      zh: "千古喀斯特与碧玉江河"   }, wide: true  },
  { key: "shanghai",   photo: PHOTOS.shanghai,    name: { es: "Shanghái",  en: "Shanghai",  zh: "上海"  }, tag: { es: "Metrópoli",  en: "City",      zh: "都市" }, desc: { es: "Donde el futuro y el pasado conviven",  en: "Where future meets past",               zh: "过去与未来交汇之城"     }, wide: false },
  { key: "tibet",      photo: PHOTOS.tibet,       name: { es: "Tíbet",     en: "Tibet",     zh: "西藏"  }, tag: { es: "Espiritual", en: "Spiritual", zh: "心灵" }, desc: { es: "El techo del mundo te llama",           en: "The roof of the world calls",           zh: "世界屋脊的心灵召唤"     }, wide: false },
  { key: "yunnan",     photo: PHOTOS.yunnan,      name: { es: "Yunnan",    en: "Yunnan",    zh: "云南"  }, tag: { es: "Cultura",    en: "Culture",   zh: "文化" }, desc: { es: "Terrazas, té y etnias fascinantes",     en: "Terraces, tea and vibrant cultures",    zh: "梯田茶园与缤纷民族"     }, wide: false },
  { key: "xian",       photo: PHOTOS.xian,        name: { es: "Xi'an",     en: "Xi'an",     zh: "西安"  }, tag: { es: "Historia",   en: "History",   zh: "历史" }, desc: { es: "Guerreros de terracota y Ruta de la Seda", en: "Terracotta warriors and the Silk Road", zh: "兵马俑与丝绸之路起点"   }, wide: false },
  { key: "zhangjiajie",photo: PHOTOS.zhangjiajie, name: { es: "Zhangjiajie",en: "Zhangjiajie",zh: "张家界"}, tag: { es: "Aventura",   en: "Adventure", zh: "探险" }, desc: { es: "Las montañas que inspiraron Avatar",     en: "The mountains that inspired Avatar",    zh: "《阿凡达》取景地"       }, wide: true  },
];

const tours = [
  { title: { es: "Ruta de la Seda", en: "Silk Road", zh: "丝绸之路" }, days: 15, price: "3.490", cities: { es: "Xi'an · Dunhuang · Turpán · Kashgar", en: "Xi'an · Dunhuang · Turpan · Kashgar", zh: "西安 · 敦煌 · 吐鲁番 · 喀什" }, badge: { es: "Más Vendido", en: "Best Seller", zh: "最受欢迎" }, num: "01", imgKey: "xian" },
  { title: { es: "China Clásica",   en: "Classic China",  zh: "经典中国"  }, days: 10, price: "2.290", cities: { es: "Pekín · Xi'an · Shanghái",           en: "Beijing · Xi'an · Shanghai",           zh: "北京 · 西安 · 上海"        }, badge: { es: "Para Principiantes", en: "First Trip", zh: "首次旅华" }, num: "02", imgKey: "shanghai" },
  { title: { es: "China Natural",   en: "Natural China",  zh: "自然中国"  }, days: 12, price: "2.890", cities: { es: "Guilin · Zhangjiajie · Yunnan",       en: "Guilin · Zhangjiajie · Yunnan",        zh: "桂林 · 张家界 · 云南"      }, badge: { es: "Naturaleza",         en: "Nature",     zh: "自然之旅" }, num: "03", imgKey: "guilin" },
];

const reviews = [
  { name: "María G.", origin: "Madrid",    text: { es: "Una experiencia que cambió mi forma de ver el mundo. Todo perfecto, guías en español en todo momento.", en: "An experience that changed how I see the world. Everything perfect, Spanish-speaking guides throughout.", zh: "一次改变我世界观的旅程，一切都很完美，全程西班牙语服务。" }, stars: 5 },
  { name: "Thomas K.", origin: "Berlin",   text: { es: "Viajé con mi familia a Yunnan y Guilin. Los niños quedaron fascinados. Organización impecable.",         en: "Travelled with my family to Yunnan and Guilin. The kids were amazed. Flawless organisation.",                   zh: "带家人游了云南和桂林，孩子们惊叹不已，组织安排无懈可击。" }, stars: 5 },
  { name: "林小红",   origin: "Barcelona", text: { es: "Como china viviendo en España, este viaje me devolvió mis raíces. El servicio en chino fue impecable.",    en: "As a Chinese living in Spain, this trip gave me back my roots. Chinese-language service was impeccable.",         zh: "作为旅居西班牙的华人，这次旅行让我重新找到了根，中文服务无可挑剔。" }, stars: 5 },
];

const ICONS = {
  visa: (<svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke={R} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="22" height="14" rx="1.5"/><line x1="2" y1="11" x2="24" y2="11"/><line x1="6" y1="16" x2="11" y2="16"/><line x1="6" y1="19" x2="9" y2="19"/></svg>),
  guide: (<svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke={R} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="13" cy="8" r="4"/><path d="M5 23c0-4.418 3.582-8 8-8s8 3.582 8 8"/><path d="M17 11.5l2.5 2.5M19.5 11.5L17 14"/></svg>),
  team: (<svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke={R} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="9" r="3.5"/><circle cx="18" cy="9" r="3.5"/><path d="M2 22c0-3.866 3.134-7 7-7"/><path d="M24 22c0-3.866-3.134-7-7-7"/><path d="M9 15c1.1-.64 2.42-1 3.8-1 1.38 0 2.7.36 3.8 1"/></svg>),
  custom: (<svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke={R} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 3L3 8v5c0 5.25 4.25 10.15 10 11.35C19.75 23.15 24 18.25 24 13V8L13 3z"/><polyline points="9,13 12,16 17,11"/></svg>),
};

export default function App() {
  const [lang, setLang] = useState("es");
  const [scrolled, setScrolled] = useState(false);
  const [heroIn, setHeroIn] = useState(false);
  const t = LANGS[lang];

  useEffect(() => {
    setTimeout(() => setHeroIn(true), 100);
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ fontFamily: "Georgia,serif", background: WH, color: BK, minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        .pf{font-family:'Playfair Display',serif;}
        .dm{font-family:'DM Sans',sans-serif;}
        .nav-item{cursor:pointer;font-family:'DM Sans',sans-serif;font-size:12px;letter-spacing:.1em;color:${WH};opacity:.75;transition:opacity .2s;text-transform:uppercase;}
        .nav-item:hover{opacity:1;}
        .nav-item.dark{color:${BK};opacity:.55;}
        .nav-item.dark:hover{opacity:1;}
        .lang-pill{cursor:pointer;padding:4px 11px;border:1.5px solid transparent;border-radius:100px;font-family:'DM Sans',sans-serif;font-size:11px;font-weight:500;letter-spacing:.05em;transition:all .2s;color:rgba(255,255,255,.65);background:transparent;}
        .lang-pill.active{border-color:${WH};color:${WH};}
        .lang-pill:hover:not(.active){color:${WH};border-color:rgba(255,255,255,.3);}
        .lang-pill.dk{color:${GY};}
        .lang-pill.dk.active{border-color:${R};color:${R};background:rgba(208,2,27,.05);}
        .lang-pill.dk:hover:not(.active){color:${BK};border-color:#ddd;}
        .btn-red{cursor:pointer;font-family:'DM Sans',sans-serif;font-size:12px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;padding:15px 38px;background:${R};color:${WH};border:none;transition:all .25s;}
        .btn-red:hover{background:#a5001b;transform:translateY(-1px);box-shadow:0 8px 24px rgba(208,2,27,.3);}
        .btn-white{cursor:pointer;font-family:'DM Sans',sans-serif;font-size:12px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;padding:14px 38px;background:transparent;color:${WH};border:1.5px solid rgba(255,255,255,.6);transition:all .25s;}
        .btn-white:hover{background:rgba(255,255,255,.12);border-color:${WH};}
        .btn-bk{cursor:pointer;font-family:'DM Sans',sans-serif;font-size:11px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;padding:11px 22px;background:transparent;color:${BK};border:1.5px solid #ccc;transition:all .25s;}
        .btn-bk:hover{border-color:${BK};}
        .dest-card{cursor:pointer;overflow:hidden;position:relative;border-radius:3px;}
        .dest-card .dimg-div{width:100%;height:100%;transition:transform .6s cubic-bezier(.25,.46,.45,.94);background-size:cover;background-position:center;}
        .dest-card:hover .dimg-div{transform:scale(1.07);}
        .dest-card .dovl{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.75) 0%,rgba(0,0,0,.1) 55%);transition:opacity .3s;}
        .dest-card:hover .dovl{opacity:.9;}
        .dtag{position:absolute;top:14px;left:14px;padding:4px 10px;background:${R};color:${WH};font-family:'DM Sans',sans-serif;font-size:10px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;z-index:2;}
        .tour-card{cursor:pointer;overflow:hidden;border-radius:3px;position:relative;transition:transform .3s,box-shadow .3s;}
        .tour-card:hover{transform:translateY(-4px);box-shadow:0 16px 48px rgba(0,0,0,.15);}
        .tour-card img{width:100%;height:220px;object-fit:cover;display:block;transition:transform .5s;}
        .tour-card:hover img{transform:scale(1.05);}
        .trust-card{padding:28px;border:1.5px solid #ebebeb;transition:all .3s;}
        .trust-card:hover{border-color:${R};transform:translateY(-3px);box-shadow:0 12px 40px rgba(208,2,27,.08);}
        .rev-card{padding:32px;background:${CR};border-left:3px solid ${R};}
        .hw{display:inline-block;overflow:hidden;vertical-align:top;}
        .hwi{display:block;transform:translateY(110%);transition:transform .9s cubic-bezier(.16,1,.3,1);}
        .hwi.in{transform:translateY(0);}
        .fu{opacity:0;transform:translateY(22px);transition:opacity .75s,transform .75s;}
        .fu.in{opacity:1;transform:translateY(0);}
        .rl{display:inline-block;width:28px;height:2px;background:${R};vertical-align:middle;margin-right:10px;flex-shrink:0;}
        .marquee-wrap{overflow:hidden;white-space:nowrap;border-top:1px solid #e8e8e8;border-bottom:1px solid #e8e8e8;padding:13px 0;background:${CR};}
        .marquee-inner{display:inline-block;animation:mq 28s linear infinite;font-family:'DM Sans',sans-serif;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:rgba(17,17,17,.35);}
        @keyframes mq{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        .cin{width:100%;padding:13px 0;border:none;border-bottom:2px solid #333;background:transparent;color:${WH};font-family:'DM Sans',sans-serif;font-size:14px;outline:none;transition:border-color .25s;}
        .cin::placeholder{color:#555;}
        .cin:focus{border-bottom-color:${R};}
        .cin option{background:#111;}
        .scroll-strip{display:flex;gap:12px;overflow-x:auto;scrollbar-width:none;padding-bottom:4px;}
        .scroll-strip::-webkit-scrollbar{display:none;}
        .strip-img{flex:0 0 280px;height:200px;border-radius:3px;transition:transform .4s;background-size:cover;background-position:center;}
        .strip-img:hover{transform:scale(1.02);}
      `}</style>

      {/* ── NAV ── */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: scrolled ? "14px 48px" : "22px 48px",
        background: scrolled ? "rgba(255,255,255,.97)" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        boxShadow: scrolled ? "0 1px 0 #e8e8e8" : "none",
        transition: "all .35s",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "34px", height: "34px", background: R, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ color: WH, fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: "16px" }}>中</span>
          </div>
          <div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "17px", fontWeight: 700, lineHeight: 1.1, color: scrolled ? BK : WH, transition: "color .35s" }}>ChinaWay</div>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "9px", letterSpacing: ".2em", color: scrolled ? GY : "rgba(255,255,255,.55)", textTransform: "uppercase", marginTop: "1px", transition: "color .35s" }}>desde Europa</div>
          </div>
        </div>
        <nav style={{ display: "flex", gap: "30px" }}>
          {t.nav.map((n, i) => <span key={i} className={`nav-item ${scrolled ? "dark" : ""}`}>{n}</span>)}
        </nav>
        <div style={{ display: "flex", gap: "5px" }}>
          {[["es","ES"],["en","EN"],["zh","中文"]].map(([l,label]) => (
            <button key={l} className={`lang-pill ${scrolled ? "dk" : ""} ${lang===l?"active":""}`} onClick={() => setLang(l)}>{label}</button>
          ))}
        </div>
      </header>

      {/* ── HERO (full bleed photo) ── */}
      <section style={{ position: "relative", height: "100vh", minHeight: "680px", overflow: "hidden" }}>
        <img src={PHOTOS.hero} alt="China landscape" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }} />
        {/* Gradient overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,.72) 0%, rgba(0,0,0,.45) 55%, rgba(0,0,0,.15) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,.4) 0%, transparent 40%)" }} />

        {/* Content */}
        <div style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 8%" }}>
          <div className={`fu ${heroIn?"in":""}`} style={{ transitionDelay: ".05s", display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
            <span style={{ display: "inline-block", width: "28px", height: "2px", background: R }} />
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", letterSpacing: ".2em", color: "rgba(255,255,255,.8)", fontWeight: 500, textTransform: "uppercase" }}>{t.hero_eyebrow}</span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: "clamp(56px,8vw,120px)", lineHeight: 1.0, color: WH, marginBottom: "28px" }}>
            {t.hero_title.map((line, i) => (
              <div key={i} style={{ display: "block" }}>
                <span className="hw">
                  <span className={`hwi ${heroIn?"in":""}`} style={{ transitionDelay: `${.2+i*.15}s` }}>
                    {i === 2 ? <em style={{ color: R }}>{line}</em> : line}
                  </span>
                </span>
              </div>
            ))}
          </h1>
          <p className={`fu ${heroIn?"in":""}`} style={{ transitionDelay: ".65s", fontFamily: "'DM Sans',sans-serif", fontSize: "16px", lineHeight: 1.8, color: "rgba(255,255,255,.75)", maxWidth: "420px", marginBottom: "40px", fontWeight: 300 }}>{t.hero_sub}</p>
          <div className={`fu ${heroIn?"in":""}`} style={{ transitionDelay: ".8s", display: "flex", gap: "14px", flexWrap: "wrap" }}>
            <button className="btn-red">{t.hero_cta}</button>
            <button className="btn-white">{t.hero_cta2}</button>
          </div>
        </div>

        {/* Bottom stats strip */}
        <div className={`fu ${heroIn?"in":""}`} style={{ transitionDelay: "1s", position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(0,0,0,.55)", backdropFilter: "blur(8px)", display: "flex", justifyContent: "center", gap: "0" }}>
          {[["500+", t.stat1], ["20+", t.stat2], ["8", t.stat3]].map(([n, l], i) => (
            <div key={i} style={{ padding: "22px 64px", textAlign: "center", borderRight: i < 2 ? "1px solid rgba(255,255,255,.1)" : "none" }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "32px", fontWeight: 700, color: WH, lineHeight: 1 }}>{n}</div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", color: "rgba(255,255,255,.55)", letterSpacing: ".1em", textTransform: "uppercase", marginTop: "5px" }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="marquee-wrap">
        <div className="marquee-inner">
          {Array(2).fill(["Guilin","Beijing","Shanghai","Tibet","Yunnan","Xi'an","Zhangjiajie","Chengdu","Dunhuang","Suzhou"].map(x=>`✦  ${x}`).join("   —   ")).join("   —   ")}
        </div>
      </div>

      {/* ── DESTINATIONS ── */}
      <section style={{ padding: "96px 6%" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "44px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
                <span className="rl" /><span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", color: R, letterSpacing: ".18em", fontWeight: 500 }}>{t.dest_label}</span>
              </div>
              <h2 className="pf" style={{ fontSize: "clamp(30px,4vw,50px)", fontWeight: 700, lineHeight: 1.1 }}>{t.dest_title}</h2>
            </div>
            <button className="btn-bk">{t.seeall}</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gridAutoRows: "240px", gap: "12px" }}>
            {destinations.map((d, i) => (
              <div key={i} className="dest-card" style={{ gridColumn: d.wide ? "span 2" : "span 1" }}>
                <img src={PHOTOS[d.key]} alt={d.name.en} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                <div className="dovl" />
                <span className="dtag">{d.tag[lang]}</span>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 18px", color: WH, zIndex: 2 }}>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "24px", fontWeight: 700, marginBottom: "3px" }}>{d.name[lang]}</div>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", opacity: .72 }}>{d.desc[lang]}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHOTO STRIP ── */}
      <section style={{ padding: "0 0 80px 6%" }}>
        <div style={{ maxWidth: "1200px", marginBottom: "28px", paddingRight: "6%" }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
            <span className="rl" /><span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", color: R, letterSpacing: ".18em", fontWeight: 500 }}>{t.gallery_label}</span>
          </div>
          <h2 className="pf" style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 700 }}>{t.gallery_title}</h2>
        </div>
        <div className="scroll-strip">
          {[PHOTOS.strip1,PHOTOS.strip2,PHOTOS.strip3,PHOTOS.strip4,PHOTOS.strip5,PHOTOS.guilin,PHOTOS.yunnan].map((src, i) => (
            <img key={i} src={src} alt="" className="strip-img" />
          ))}
        </div>
      </section>

      {/* ── TOURS ── */}
      <section style={{ padding: "80px 6%", background: CR }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
            <span className="rl" /><span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", color: R, letterSpacing: ".18em", fontWeight: 500 }}>{t.tours_label}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "40px", gap: "20px" }}>
            <h2 className="pf" style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 700 }}>{t.tours_title}</h2>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13px", color: GY, maxWidth: "280px", textAlign: "right", fontWeight: 300, lineHeight: 1.7 }}>{t.tours_sub}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "20px" }}>
            {tours.map((tour, i) => (
              <div key={i} className="tour-card" style={{ background: WH, border: "1px solid #eee" }}>
                <div style={{ position: "relative", overflow: "hidden" }}>
                  <img src={PHOTOS[tour.imgKey]} alt={tour.title.en} style={{ width: "100%", height: "220px", objectFit: "cover", display: "block" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,.5) 0%, transparent 60%)" }} />
                  <div style={{ position: "absolute", top: "14px", left: "14px", padding: "4px 10px", background: R, color: WH, fontFamily: "'DM Sans',sans-serif", fontSize: "9px", fontWeight: 500, letterSpacing: ".12em", textTransform: "uppercase" }}>{tour.badge[lang]}</div>
                  <div style={{ position: "absolute", bottom: "14px", left: "14px" }}>
                    <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "22px", fontWeight: 700, color: WH }}>{tour.title[lang]}</div>
                  </div>
                </div>
                <div style={{ padding: "20px 22px" }}>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", color: GY, marginBottom: "16px" }}>{tour.cities[lang]}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", paddingTop: "16px", borderTop: "1px solid #f0f0f0" }}>
                    <div>
                      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "10px", color: GY, textTransform: "uppercase", letterSpacing: ".08em" }}>{t.from}</div>
                      <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "26px", fontWeight: 700, color: R, lineHeight: 1.1 }}>{tour.price}€</div>
                      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", color: GY }}>{tour.days} {t.days}</div>
                    </div>
                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", fontWeight: 500, color: R, letterSpacing: ".08em", textTransform: "uppercase" }}>{t.book}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section style={{ padding: "96px 6%" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
            <span className="rl" /><span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", color: R, letterSpacing: ".18em", fontWeight: 500 }}>{t.why_label}</span>
          </div>
          <h2 className="pf" style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, marginBottom: "48px" }}>{t.why_title}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "18px" }}>
            {t.trust.map((item, i) => (
              <div key={i} className="trust-card">
                <div style={{ marginBottom: "20px" }}>{ICONS[item.icon]}</div>
                <div className="pf" style={{ fontSize: "18px", fontWeight: 700, marginBottom: "10px", lineHeight: 1.25 }}>{item.t}</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13px", color: GY, fontWeight: 300, lineHeight: 1.7 }}>{item.d}</div>
              </div>
            ))}
          </div>
          {/* Stats bar */}
          <div style={{ marginTop: "56px", background: BK, display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}>
            {[["500+", t.stat1],["20+", t.stat2],["8", t.stat3]].map(([n,l], i) => (
              <div key={i} style={{ padding: "36px 40px", borderRight: i < 2 ? "1px solid #222" : "none", textAlign: "center" }}>
                <div className="pf" style={{ fontSize: "52px", fontWeight: 900, color: R, lineHeight: 1 }}>{n}</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", color: WH, marginTop: "8px", fontWeight: 400, letterSpacing: ".08em", textTransform: "uppercase" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FULL WIDTH BANNER ── */}
      <section style={{ position: "relative", height: "420px", overflow: "hidden" }}>
        <img src={PHOTOS.zhangjiajie} alt="Zhangjiajie" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.5)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 6%" }}>
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", letterSpacing: ".22em", textTransform: "uppercase", color: "rgba(255,255,255,.65)", marginBottom: "16px" }}>Zhangjiajie · 张家界</div>
          <h3 className="pf" style={{ fontSize: "clamp(32px,5vw,64px)", fontWeight: 700, color: WH, lineHeight: 1.1, marginBottom: "28px", fontStyle: "italic" }}>
            "Las montañas que inspiraron Avatar"
          </h3>
          <button className="btn-red">{t.hero_cta}</button>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section style={{ padding: "80px 6%", background: CR }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
            <span className="rl" /><span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", color: R, letterSpacing: ".18em", fontWeight: 500 }}>{t.rev_label}</span>
          </div>
          <h2 className="pf" style={{ fontSize: "clamp(26px,3.5vw,44px)", fontWeight: 700, marginBottom: "40px" }}>{t.rev_title}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "18px" }}>
            {reviews.map((r, i) => (
              <div key={i} className="rev-card">
                <div style={{ color: R, fontSize: "16px", letterSpacing: "4px", marginBottom: "16px" }}>{"★".repeat(r.stars)}</div>
                <p className="pf" style={{ fontSize: "16px", fontStyle: "italic", lineHeight: 1.8, color: BK, marginBottom: "22px" }}>"{r.text[lang]}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: "11px" }}>
                  <div style={{ width: "38px", height: "38px", background: BK, display: "flex", alignItems: "center", justifyContent: "center", color: WH, fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "15px", flexShrink: 0 }}>{r.name[0]}</div>
                  <div>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13px", fontWeight: 500 }}>{r.name}</div>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", color: GY }}>{r.origin}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section style={{ padding: "0 6% 80px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ background: BK, padding: "72px 64px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
                <span style={{ display: "inline-block", width: "28px", height: "2px", background: R }} />
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "10px", color: R, letterSpacing: ".2em", fontWeight: 500, textTransform: "uppercase" }}>Contacto</span>
              </div>
              <h2 className="pf" style={{ fontSize: "clamp(28px,3.5vw,46px)", fontWeight: 700, color: WH, lineHeight: 1.1, marginBottom: "22px" }}>{t.cta_title}</h2>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "14px", color: "#aaa", lineHeight: 1.85, fontWeight: 300, marginBottom: "40px" }}>{t.cta_sub}</p>
              <div style={{ display: "flex", gap: "28px" }}>
                {[{ label: "WhatsApp", icon: "W" }, { label: "WeChat", icon: "微" }, { label: "Email", icon: "@" }].map((c, i) => (
                  <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", cursor: "pointer", opacity: .45, transition: "opacity .2s" }}
                    onMouseEnter={e => e.currentTarget.style.opacity=1}
                    onMouseLeave={e => e.currentTarget.style.opacity=.45}>
                    <div style={{ width: "40px", height: "40px", border: "1px solid #333", display: "flex", alignItems: "center", justifyContent: "center", color: WH, fontFamily: "'Playfair Display',serif", fontSize: "15px" }}>{c.icon}</div>
                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "10px", letterSpacing: ".1em", textTransform: "uppercase", color: WH }}>{c.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
              <input type="text" placeholder={t.contact_name} className="cin" />
              <input type="email" placeholder={t.contact_email} className="cin" />
              <select className="cin" defaultValue="">
                <option value="" disabled>{t.contact_dest}</option>
                {["Guilin","Shanghai","Tibet","Yunnan","Xi'an","Ruta de la Seda"].map(o => <option key={o}>{o}</option>)}
              </select>
              <button className="btn-red" style={{ marginTop: "8px", padding: "17px" }}>{t.cta_btn}</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid #e8e8e8", padding: "28px 6%", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "14px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
          <div style={{ width: "28px", height: "28px", background: R, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: WH, fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: "13px" }}>中</span>
          </div>
          <span className="pf" style={{ fontSize: "16px", fontWeight: 700 }}>ChinaWay</span>
        </div>
        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", color: GY }}>© 2025 · Based in Spain · Partners across China</span>
        <div style={{ display: "flex", gap: "22px" }}>
          {["Instagram","WeChat","WhatsApp"].map((s,i) => (
            <span key={i} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", color: GY, cursor: "pointer", letterSpacing: ".08em", textTransform: "uppercase" }}>{s}</span>
          ))}
        </div>
      </footer>
    </div>
  );
}

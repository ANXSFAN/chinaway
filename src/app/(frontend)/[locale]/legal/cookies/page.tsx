import { useLocale } from 'next-intl'
import { SectionLabel } from '@/components/ui/SectionLabel'

const content = {
  es: {
    title: 'Política de Cookies',
    lastUpdate: 'Última actualización: marzo 2026',
    sections: [
      {
        heading: '¿Qué son las cookies?',
        body: 'Las cookies son pequeños archivos de texto que los sitios web almacenan en tu dispositivo cuando los visitas. Se utilizan para mejorar tu experiencia de navegación, recordar tus preferencias y analizar cómo se utiliza el sitio.',
      },
      {
        heading: 'Cookies que utilizamos',
        body: 'Cookies técnicas (necesarias): Imprescindibles para el funcionamiento del sitio web. Incluyen cookies de sesión, preferencia de idioma y consentimiento de cookies. No requieren consentimiento.\n\nCookies analíticas (Google Analytics 4): Nos ayudan a entender cómo los visitantes interactúan con nuestro sitio web. Recopilan información de forma anónima sobre páginas visitadas, tiempo de permanencia y origen del tráfico. Requieren tu consentimiento.',
      },
      {
        heading: 'Gestión de cookies',
        body: 'Puedes aceptar o rechazar las cookies analíticas a través de nuestro banner de cookies. También puedes configurar tu navegador para bloquear o eliminar cookies. Ten en cuenta que bloquear las cookies técnicas puede afectar al funcionamiento del sitio.',
      },
      {
        heading: 'Cookies de terceros',
        body: 'Google Analytics (analytics): _ga, _ga_*, duración hasta 2 años. Utilizadas para distinguir usuarios y generar estadísticas de uso del sitio web.',
      },
      {
        heading: 'Más información',
        body: 'Para más información sobre cómo gestionamos tus datos, consulta nuestra Política de Privacidad. Si tienes preguntas, contacta con nosotros en privacy@chinaway.es.',
      },
    ],
  },
  en: {
    title: 'Cookie Policy',
    lastUpdate: 'Last updated: March 2026',
    sections: [
      {
        heading: 'What are cookies?',
        body: 'Cookies are small text files that websites store on your device when you visit them. They are used to improve your browsing experience, remember your preferences and analyse how the site is used.',
      },
      {
        heading: 'Cookies we use',
        body: 'Technical cookies (necessary): Essential for the website to function. These include session cookies, language preference and cookie consent. They do not require consent.\n\nAnalytical cookies (Google Analytics 4): Help us understand how visitors interact with our website. They collect anonymous information about pages visited, time spent and traffic source. They require your consent.',
      },
      {
        heading: 'Cookie management',
        body: 'You can accept or reject analytical cookies through our cookie banner. You can also configure your browser to block or delete cookies. Please note that blocking technical cookies may affect the site\'s functionality.',
      },
      {
        heading: 'Third-party cookies',
        body: 'Google Analytics (analytics): _ga, _ga_*, duration up to 2 years. Used to distinguish users and generate website usage statistics.',
      },
      {
        heading: 'More information',
        body: 'For more information on how we manage your data, please see our Privacy Policy. If you have questions, contact us at privacy@chinaway.es.',
      },
    ],
  },
  zh: {
    title: 'Cookie 政策',
    lastUpdate: '最后更新：2026年3月',
    sections: [
      {
        heading: '什么是 Cookie？',
        body: 'Cookie 是网站在您访问时存储在您设备上的小型文本文件。它们用于改善您的浏览体验、记住您的偏好设置以及分析网站的使用情况。',
      },
      {
        heading: '我们使用的 Cookie',
        body: '技术性 Cookie（必要）：网站运行所必需的 Cookie，包括会话 Cookie、语言偏好和 Cookie 同意记录，不需要额外同意。\n\n分析性 Cookie（Google Analytics 4）：帮助我们了解访客如何与网站互动，匿名收集页面访问、停留时间和流量来源等信息，需要您的同意。',
      },
      {
        heading: 'Cookie 管理',
        body: '您可以通过我们的 Cookie 横幅接受或拒绝分析性 Cookie。您也可以在浏览器中设置阻止或删除 Cookie。请注意，阻止技术性 Cookie 可能会影响网站功能。',
      },
      {
        heading: '第三方 Cookie',
        body: 'Google Analytics（分析类）：_ga、_ga_*，有效期最长2年。用于区分用户并生成网站使用统计数据。',
      },
      {
        heading: '更多信息',
        body: '有关我们如何管理您数据的更多信息，请参阅我们的隐私政策。如有疑问，请联系 privacy@chinaway.es。',
      },
    ],
  },
}

export default function CookiesPage() {
  const locale = useLocale() as 'es' | 'en' | 'zh'
  const c = content[locale]

  return (
    <>
      <section className="pt-32 pb-12 px-[6%] bg-cream">
        <div className="max-w-[800px] mx-auto">
          <SectionLabel>{locale === 'es' ? 'LEGAL' : locale === 'en' ? 'LEGAL' : '法律'}</SectionLabel>
          <h1 className="font-playfair text-[clamp(32px,4vw,52px)] font-bold">{c.title}</h1>
          <p className="font-dm text-sm text-gray mt-3">{c.lastUpdate}</p>
        </div>
      </section>
      <section className="py-16 px-[6%]">
        <div className="max-w-[800px] mx-auto space-y-8">
          {c.sections.map((s, i) => (
            <div key={i}>
              <h2 className="font-playfair text-xl font-bold mb-3">{s.heading}</h2>
              <p className="font-dm text-sm text-black/80 leading-relaxed whitespace-pre-line">{s.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

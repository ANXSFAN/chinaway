import { getPayload } from 'payload'
import config from '@payload-config'
import type { Payload } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
import https from 'https'
import http from 'http'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Download a file from a URL and save it to disk.
 * Returns the local file path.
 */
async function downloadFile(url: string, destPath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(destPath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    const client = url.startsWith('https') ? https : http
    client
      .get(url, { headers: { 'User-Agent': 'ChinaWay-Seed/1.0' } }, (response) => {
        // Follow redirects (picsum redirects)
        if (
          response.statusCode &&
          response.statusCode >= 300 &&
          response.statusCode < 400 &&
          response.headers.location
        ) {
          downloadFile(response.headers.location, destPath).then(resolve).catch(reject)
          return
        }
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to download ${url}: status ${response.statusCode}`))
          return
        }
        const file = fs.createWriteStream(destPath)
        response.pipe(file)
        file.on('finish', () => {
          file.close()
          resolve(destPath)
        })
        file.on('error', (err) => {
          fs.unlinkSync(destPath)
          reject(err)
        })
      })
      .on('error', reject)
  })
}

/**
 * Create a media document from a URL. Downloads the image first, then
 * creates via Payload Local API so the file is properly processed by sharp.
 * Returns the media document id.
 */
async function createMediaFromUrl(
  payload: Payload,
  url: string,
  altEs: string,
  altEn: string,
  altZh: string,
  tmpDir: string,
): Promise<number> {
  const filename = `seed-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.jpg`
  const filePath = path.join(tmpDir, filename)

  await downloadFile(url, filePath)

  const media = await payload.create({
    collection: 'media',
    data: {
      alt: altEs,
    },
    filePath,
  })

  // Update localized alt text
  await payload.update({
    collection: 'media',
    id: media.id,
    locale: 'en',
    data: { alt: altEn },
  })
  await payload.update({
    collection: 'media',
    id: media.id,
    locale: 'zh',
    data: { alt: altZh },
  })

  // Clean up temp file
  try {
    fs.unlinkSync(filePath)
  } catch {
    // ignore cleanup errors
  }

  return media.id as number
}

/**
 * Simple Lexical richText JSON for a list of bullet items.
 * Payload 3.x with @payloadcms/richtext-lexical uses Lexical's serialized format.
 */
function lexicalBulletList(items: string[]): Record<string, unknown> {
  return {
    root: {
      type: 'root',
      children: [
        {
          type: 'list',
          listType: 'bullet',
          start: 1,
          tag: 'ul',
          children: items.map((item) => ({
            type: 'listitem',
            value: 1,
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: item,
                    format: 0,
                    detail: 0,
                    mode: 'normal',
                    style: '',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                textFormat: 0,
                textStyle: '',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          })),
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

/**
 * Simple Lexical richText JSON for a single paragraph of text.
 */
function lexicalParagraph(text: string): Record<string, unknown> {
  return {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text,
              format: 0,
              detail: 0,
              mode: 'normal',
              style: '',
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          textFormat: 0,
          textStyle: '',
          version: 1,
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

/**
 * Simple Lexical richText JSON for multiple paragraphs of text.
 */
function lexicalParagraphs(texts: string[]): Record<string, unknown> {
  return {
    root: {
      type: 'root',
      children: texts.map((text) => ({
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text,
            format: 0,
            detail: 0,
            mode: 'normal',
            style: '',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        textFormat: 0,
        textStyle: '',
        version: 1,
      })),
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

/**
 * Check if a document with a given slug already exists in a collection.
 * Returns the document id if found, null otherwise.
 */
async function findBySlug(
  payload: Payload,
  collection: string,
  slug: string,
): Promise<number | null> {
  const result = await payload.find({
    collection: collection as any,
    where: { slug: { equals: slug } },
    limit: 1,
  })
  if (result.docs.length > 0) {
    return result.docs[0].id as number
  }
  return null
}

// ---------------------------------------------------------------------------
// Main seed function
// ---------------------------------------------------------------------------

export async function seed() {
  const payload = await getPayload({ config })

  console.log('=== ChinaWay Seed Script ===')
  console.log('Starting seed process...')

  // Temp directory for downloaded images
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  const tmpDir = path.join(__dirname, '..', '.seed-tmp')
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir, { recursive: true })
  }

  // ------------------------------------------------------------------
  // 1. Seed SiteSettings Global
  // ------------------------------------------------------------------
  console.log('\n[1/7] Seeding SiteSettings global...')

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      company: {
        name: 'ChinaWay Travel S.L.',
        cif: 'B-12345678',
        address: 'Madrid, España',
        foundedYear: 2018,
      },
      contact: {
        whatsapp: '+34 600 000 000',
        wechat: 'ChinaWayTravel',
        email: 'info@chinaway.es',
        privacyEmail: 'privacy@chinaway.es',
      },
      stats: {
        travelers: '500+',
        destinations: '20+',
        years: '8',
      },
      social: {
        instagram: 'https://instagram.com/chinaway',
      },
    },
  })

  console.log('  SiteSettings seeded.')

  // ------------------------------------------------------------------
  // 2. Seed HomePage Global
  // ------------------------------------------------------------------
  console.log('\n[2/7] Seeding HomePage global...')

  // ES (default locale)
  await payload.updateGlobal({
    slug: 'home-page',
    data: {
      hero: {
        imageUrl: 'https://picsum.photos/id/1015/1800/900',
      },
      marqueeCities: [
        { city: 'Guilin' },
        { city: 'Beijing' },
        { city: 'Shanghai' },
        { city: 'Tibet' },
        { city: 'Yunnan' },
        { city: "Xi'an" },
        { city: 'Zhangjiajie' },
        { city: 'Chengdu' },
        { city: 'Dunhuang' },
        { city: 'Suzhou' },
      ],
      photoStrip: [
        { imageUrl: 'https://picsum.photos/id/1036/600/400' },
        { imageUrl: 'https://picsum.photos/id/1047/600/400' },
        { imageUrl: 'https://picsum.photos/id/1055/600/400' },
        { imageUrl: 'https://picsum.photos/id/1059/600/400' },
        { imageUrl: 'https://picsum.photos/id/1038/600/400' },
        { imageUrl: 'https://picsum.photos/id/1003/600/400' },
        { imageUrl: 'https://picsum.photos/id/1080/600/400' },
      ],
      banner: {
        imageUrl: 'https://picsum.photos/id/1022/1800/900',
        location: 'Zhangjiajie · 张家界',
        quote: 'Las montañas que inspiraron Avatar',
      },
      whyUsCards: [
        {
          iconType: 'visa',
          title: 'Asistencia de Visado',
          description:
            'Te acompañamos en cada paso del proceso de visado. Sin estrés, sin complicaciones.',
        },
        {
          iconType: 'guide',
          title: 'Guías en Español',
          description:
            'Todos nuestros guías hablan español nativo. Comunícate sin barreras.',
        },
        {
          iconType: 'team',
          title: 'Equipo Europeo',
          description:
            'Equipo basado en Madrid con años de experiencia y contactos directos en China.',
        },
        {
          iconType: 'custom',
          title: 'Viajes a Medida',
          description:
            'Cada viaje es único. Diseñamos itinerarios personalizados según tus intereses.',
        },
      ],
      mapProvinces: [
        {
          provinceId: 'beijing',
          tours: 5,
          description: 'Capital milenaria del imperio chino',
          highlights: 'Gran Muralla · Ciudad Prohibida · Templo del Cielo',
        },
        {
          provinceId: 'shanghai',
          tours: 3,
          description: 'La metrópoli donde el futuro y el pasado conviven',
          highlights: 'El Bund · Pudong · Jardín Yuyuan',
        },
        {
          provinceId: 'guangxi',
          tours: 4,
          description: 'Paisajes kársticos eternos y ríos de jade',
          highlights: 'Guilin · Río Li · Arrozales de Longji',
        },
        {
          provinceId: 'yunnan',
          tours: 6,
          description: 'Terrazas de arroz, té y culturas fascinantes',
          highlights: 'Lijiang · Dali · Shangri-La',
        },
        {
          provinceId: 'sichuan',
          tours: 4,
          description: 'Pandas gigantes y cocina de fuego',
          highlights: 'Chengdu · Jiuzhaigou · Leshan',
        },
        {
          provinceId: 'tibet',
          tours: 3,
          description: 'El techo del mundo, espiritualidad pura',
          highlights: 'Lhasa · Potala · Everest',
        },
        {
          provinceId: 'shaanxi',
          tours: 3,
          description: 'Guerreros de terracota y la Ruta de la Seda',
          highlights: "Xi'an · Ejército de Terracota · Muralla",
        },
        {
          provinceId: 'hunan',
          tours: 2,
          description: 'Las montañas que inspiraron Avatar',
          highlights: 'Zhangjiajie · Fenghuang',
        },
        {
          provinceId: 'gansu',
          tours: 2,
          description: 'Grutas de Mogao y desierto de Gobi',
          highlights: 'Dunhuang · Mogao · Zhangye Danxia',
        },
        {
          provinceId: 'xinjiang',
          tours: 2,
          description: 'La nueva frontera y la Ruta de la Seda',
          highlights: 'Kashgar · Turpán · Lago Kanas',
        },
      ],
      mapSection: {
        intro:
          'Somos la agencia que va más allá del turismo convencional. Te ayudamos a descubrir la China auténtica entre mercados callejeros, aldeas remotas y, sobre todo, a través de la gente que conocerás en el camino.',
        tagline:
          'Acompáñanos a descubrir experiencias de viaje exclusivas por China',
      },
    },
  })

  // EN locale
  await payload.updateGlobal({
    slug: 'home-page',
    locale: 'en',
    data: {
      banner: {
        quote: 'The mountains that inspired Avatar',
      },
      whyUsCards: [
        {
          iconType: 'visa',
          title: 'Visa Assistance',
          description:
            'We guide you through every step of the visa process. No stress, no complications.',
        },
        {
          iconType: 'guide',
          title: 'Spanish-Speaking Guides',
          description:
            'All our guides speak native Spanish. Communicate without barriers.',
        },
        {
          iconType: 'team',
          title: 'European Team',
          description:
            'Madrid-based team with years of experience and direct contacts in China.',
        },
        {
          iconType: 'custom',
          title: 'Custom Trips',
          description:
            'Every trip is unique. We design personalized itineraries based on your interests.',
        },
      ],
      mapProvinces: [
        {
          provinceId: 'beijing',
          tours: 5,
          description: 'Ancient capital of the Chinese empire',
          highlights: 'Great Wall · Forbidden City · Temple of Heaven',
        },
        {
          provinceId: 'shanghai',
          tours: 3,
          description: 'The metropolis where future meets past',
          highlights: 'The Bund · Pudong · Yu Garden',
        },
        {
          provinceId: 'guangxi',
          tours: 4,
          description: 'Eternal karst landscapes and jade rivers',
          highlights: 'Guilin · Li River · Longji Rice Terraces',
        },
        {
          provinceId: 'yunnan',
          tours: 6,
          description: 'Rice terraces, tea and vibrant cultures',
          highlights: 'Lijiang · Dali · Shangri-La',
        },
        {
          provinceId: 'sichuan',
          tours: 4,
          description: 'Giant pandas and fiery cuisine',
          highlights: 'Chengdu · Jiuzhaigou · Leshan',
        },
        {
          provinceId: 'tibet',
          tours: 3,
          description: 'Roof of the world, pure spirituality',
          highlights: 'Lhasa · Potala · Everest',
        },
        {
          provinceId: 'shaanxi',
          tours: 3,
          description: 'Terracotta warriors and the Silk Road',
          highlights: "Xi'an · Terracotta Army · City Wall",
        },
        {
          provinceId: 'hunan',
          tours: 2,
          description: 'The mountains that inspired Avatar',
          highlights: 'Zhangjiajie · Fenghuang',
        },
        {
          provinceId: 'gansu',
          tours: 2,
          description: 'Mogao Caves and Gobi Desert',
          highlights: 'Dunhuang · Mogao · Zhangye Danxia',
        },
        {
          provinceId: 'xinjiang',
          tours: 2,
          description: 'The new frontier and the Silk Road',
          highlights: 'Kashgar · Turpan · Kanas Lake',
        },
      ],
      mapSection: {
        intro:
          'We are the travel company that punches through the tourist bubble to get to the real stories. We empower you to discover the China that lives amid the aromatic sizzle of street-side woks, in bustling city markets and far-flung mountain villages.',
        tagline:
          'Come with us and enjoy exclusive luxury travel experiences in China',
      },
    },
  })

  // ZH locale
  await payload.updateGlobal({
    slug: 'home-page',
    locale: 'zh',
    data: {
      banner: {
        quote: '《阿凡达》取景地',
      },
      whyUsCards: [
        {
          iconType: 'visa',
          title: '签证协助',
          description: '全程协助签证办理，无忧无虑。',
        },
        {
          iconType: 'guide',
          title: '西班牙语导游',
          description: '所有导游均为母语级西班牙语，沟通零障碍。',
        },
        {
          iconType: 'team',
          title: '欧洲团队',
          description:
            '总部位于马德里，深耕多年，在中国拥有直接合作网络。',
        },
        {
          iconType: 'custom',
          title: '定制行程',
          description:
            '每段旅程都独一无二，根据您的兴趣量身定制。',
        },
      ],
      mapProvinces: [
        {
          provinceId: 'beijing',
          tours: 5,
          description: '千年帝都',
          highlights: '长城 · 故宫 · 天坛',
        },
        {
          provinceId: 'shanghai',
          tours: 3,
          description: '过去与未来交汇的大都市',
          highlights: '外滩 · 浦东 · 豫园',
        },
        {
          provinceId: 'guangxi',
          tours: 4,
          description: '千古喀斯特与碧玉江河',
          highlights: '桂林 · 漓江 · 龙脊梯田',
        },
        {
          provinceId: 'yunnan',
          tours: 6,
          description: '梯田茶园与缤纷民族',
          highlights: '丽江 · 大理 · 香格里拉',
        },
        {
          provinceId: 'sichuan',
          tours: 4,
          description: '大熊猫与火辣美食',
          highlights: '成都 · 九寨沟 · 乐山',
        },
        {
          provinceId: 'tibet',
          tours: 3,
          description: '世界屋脊，心灵净土',
          highlights: '拉萨 · 布达拉宫 · 珠峰',
        },
        {
          provinceId: 'shaanxi',
          tours: 3,
          description: '兵马俑与丝绸之路',
          highlights: '西安 · 兵马俑 · 古城墙',
        },
        {
          provinceId: 'hunan',
          tours: 2,
          description: '阿凡达取景地',
          highlights: '张家界 · 凤凰古城',
        },
        {
          provinceId: 'gansu',
          tours: 2,
          description: '莫高窟与戈壁沙漠',
          highlights: '敦煌 · 莫高窟 · 张掖丹霞',
        },
        {
          provinceId: 'xinjiang',
          tours: 2,
          description: '新边疆与丝绸之路',
          highlights: '喀什 · 吐鲁番 · 喀纳斯',
        },
      ],
      mapSection: {
        intro:
          '我们是一家突破传统旅游泡沫的旅行社。我们带您深入街头巷尾的烟火气，走进繁华都市与偏远山村，感受真实的中国故事。',
        tagline: '与我们一起，畅享中国奢华旅行体验',
      },
    },
  })

  console.log('  HomePage global seeded (ES/EN/ZH).')

  // ------------------------------------------------------------------
  // 3. Seed AboutPage Global
  // ------------------------------------------------------------------
  console.log('\n[3/7] Seeding AboutPage global...')

  // ES (default locale)
  await payload.updateGlobal({
    slug: 'about-page',
    data: {
      heroImageUrl: 'https://picsum.photos/id/1029/1800/900',
      storyImageUrl: 'https://picsum.photos/id/1036/800/1000',
      storyParagraphs: [
        {
          paragraph:
            'ChinaWay nació en 2018 de una idea sencilla: que viajar a China no debería ser complicado ni generar incertidumbre. Fundada por un equipo con raíces en España y profundos lazos con China, nuestra empresa se construyó sobre la convicción de que la mejor forma de conocer un país es a través de experiencias auténticas, no de itinerarios genéricos.',
        },
        {
          paragraph:
            'Empezamos organizando viajes para amigos y familiares que querían descubrir China más allá de las guías turísticas. Lo que comenzó como un proyecto personal se convirtió rápidamente en una agencia de viajes especializada, gracias a las recomendaciones de viajeros satisfechos que regresaban con historias increíbles.',
        },
        {
          paragraph:
            'Hoy, con más de 500 viajeros atendidos y presencia en Madrid y colaboradores en toda China, seguimos manteniendo el mismo espíritu: cada viaje es único, cada viajero merece una atención personalizada, y China tiene mucho más que ofrecer de lo que la mayoría imagina.',
        },
      ],
      values: [
        {
          iconType: 'globe',
          title: 'Autenticidad',
          description:
            'Te mostramos la China real, más allá de los tópicos y las rutas masificadas. Cada experiencia que ofrecemos es genuina.',
        },
        {
          iconType: 'shield',
          title: 'Confianza',
          description:
            'Transparencia en precios, atención cercana y un equipo siempre disponible. Tu tranquilidad es nuestra prioridad.',
        },
        {
          iconType: 'people',
          title: 'Cercanía',
          description:
            'Somos un equipo pequeño y eso es una ventaja. Conocemos a cada viajero por su nombre y adaptamos cada detalle.',
        },
        {
          iconType: 'card',
          title: 'Expertise',
          description:
            '8 años de experiencia, más de 500 viajeros y un conocimiento profundo de China que solo se consigue viviendo allí.',
        },
      ],
    },
  })

  // EN locale
  await payload.updateGlobal({
    slug: 'about-page',
    locale: 'en',
    data: {
      storyParagraphs: [
        {
          paragraph:
            'ChinaWay was born in 2018 from a simple idea: that traveling to China should not be complicated or generate uncertainty. Founded by a team with roots in Spain and deep ties to China, our company was built on the conviction that the best way to know a country is through authentic experiences, not generic itineraries.',
        },
        {
          paragraph:
            'We started by organizing trips for friends and family who wanted to discover China beyond the travel guides. What began as a personal project quickly became a specialized travel agency, thanks to recommendations from satisfied travelers who returned with incredible stories.',
        },
        {
          paragraph:
            'Today, with more than 500 travelers served and a presence in Madrid with collaborators across China, we continue to maintain the same spirit: each trip is unique, each traveler deserves personalized attention, and China has much more to offer than most people imagine.',
        },
      ],
      values: [
        {
          iconType: 'globe',
          title: 'Authenticity',
          description:
            'We show you the real China, beyond clichés and mass routes. Every experience we offer is genuine.',
        },
        {
          iconType: 'shield',
          title: 'Trust',
          description:
            'Price transparency, close attention, and a team always available. Your peace of mind is our priority.',
        },
        {
          iconType: 'people',
          title: 'Closeness',
          description:
            'We are a small team and that is an advantage. We know each traveler by name and adapt every detail.',
        },
        {
          iconType: 'card',
          title: 'Expertise',
          description:
            '8 years of experience, over 500 travelers, and a deep knowledge of China that can only come from living there.',
        },
      ],
    },
  })

  // ZH locale
  await payload.updateGlobal({
    slug: 'about-page',
    locale: 'zh',
    data: {
      storyParagraphs: [
        {
          paragraph:
            'ChinaWay成立于2018年，源于一个简单的想法：去中国旅行不应该复杂或充满不确定性。我们的团队扎根于西班牙，与中国有着深厚的联系，公司建立在一个信念之上——了解一个国家最好的方式是通过真实的体验，而非千篇一律的行程。',
        },
        {
          paragraph:
            '我们最初是为想要深度探索中国的亲友组织旅行。这个个人项目很快发展成了一家专业旅行社，这要归功于那些带着精彩故事归来的满意旅客的口碑推荐。',
        },
        {
          paragraph:
            '如今，我们已服务超过500位旅客，在马德里设有办公室，在中国各地都有合作伙伴。我们始终秉持同样的理念：每次旅行都是独一无二的，每位旅客都值得获得个性化的关注，而中国能提供的远超大多数人的想象。',
        },
      ],
      values: [
        {
          iconType: 'globe',
          title: '真实',
          description:
            '我们展示真实的中国，超越刻板印象和大众路线。我们提供的每一次体验都是真实的。',
        },
        {
          iconType: 'shield',
          title: '信任',
          description:
            '价格透明、贴心服务、团队随时待命。您的安心是我们的首要目标。',
        },
        {
          iconType: 'people',
          title: '亲近',
          description:
            '我们是一个小团队，这正是我们的优势。我们了解每位旅客，精心调整每个细节。',
        },
        {
          iconType: 'card',
          title: '专业',
          description:
            '8年经验、500多位旅客，以及只有在中国生活过才能获得的深刻了解。',
        },
      ],
    },
  })

  console.log('  AboutPage global seeded (ES/EN/ZH).')

  // ------------------------------------------------------------------
  // 4. Seed Destinations
  // ------------------------------------------------------------------
  console.log('\n[4/7] Seeding Destinations...')

  const destinationsData = [
    {
      slug: 'guilin',
      name: { es: 'Guilin', en: 'Guilin', zh: '桂林' },
      province: 'guangxi',
      theme: 'nature',
      featured: true,
      imageUrl: 'https://picsum.photos/id/1003/900/600',
      shortDescription: {
        es: 'Karst eterno y ríos esmeralda',
        en: 'Eternal karst and emerald rivers',
        zh: '千古喀斯特与碧玉江河',
      },
      longDescription: {
        es: 'Guilin es sinónimo de paisajes de ensueño. Sus montañas kársticas, el río Li y los campos de arroz de Longji crean un escenario que parece sacado de una pintura china. Es el destino perfecto para los amantes de la naturaleza y la fotografía.',
        en: "Guilin is synonymous with dreamlike landscapes. Its karst mountains, the Li River and the Longji rice terraces create a setting that looks like a Chinese painting. It's the perfect destination for nature and photography lovers.",
        zh: '桂林山水甲天下。喀斯特山峰、漓江和龙脊梯田构成了如同中国水墨画般的风景。这里是自然爱好者和摄影爱好者的完美目的地。',
      },
      highlights: {
        es: 'Guilin · Río Li · Arrozales de Longji',
        en: 'Guilin · Li River · Longji Rice Terraces',
        zh: '桂林 · 漓江 · 龙脊梯田',
      },
    },
    {
      slug: 'shanghai',
      name: { es: 'Shanghái', en: 'Shanghai', zh: '上海' },
      province: 'shanghai',
      theme: 'city',
      featured: true,
      imageUrl: 'https://picsum.photos/id/1040/900/600',
      shortDescription: {
        es: 'Donde el futuro y el pasado conviven',
        en: 'Where future meets past',
        zh: '过去与未来交汇之城',
      },
      longDescription: {
        es: 'Shanghái es la ciudad más cosmopolita de China. El Bund, Pudong, los jardines Yu y la concesión francesa conviven en una metrópoli que nunca duerme. Gastronomía, arte y compras de nivel mundial.',
        en: "Shanghai is China's most cosmopolitan city. The Bund, Pudong, Yu Garden and the French Concession coexist in a metropolis that never sleeps. World-class dining, art and shopping.",
        zh: '上海是中国最国际化的城市。外滩、浦东、豫园和法租界共存于这座不夜城。世界级的美食、艺术和购物体验。',
      },
      highlights: {
        es: 'El Bund · Pudong · Jardín Yuyuan',
        en: 'The Bund · Pudong · Yu Garden',
        zh: '外滩 · 浦东 · 豫园',
      },
    },
    {
      slug: 'tibet',
      name: { es: 'Tíbet', en: 'Tibet', zh: '西藏' },
      province: 'tibet',
      theme: 'spiritual',
      featured: true,
      imageUrl: 'https://picsum.photos/id/1018/900/600',
      shortDescription: {
        es: 'El techo del mundo te llama',
        en: 'The roof of the world calls',
        zh: '世界屋脊的心灵召唤',
      },
      longDescription: {
        es: 'El Tíbet es un destino que transforma. Sus monasterios, paisajes de alta montaña y la espiritualidad que impregna cada rincón lo convierten en una experiencia única.',
        en: 'Tibet is a destination that transforms. Its monasteries, high mountain landscapes, and the spirituality that permeates every corner make it a unique experience.',
        zh: '西藏是一个能改变人生的目的地。寺庙、高山风光以及无处不在的灵性，让这里成为独一无二的体验。',
      },
      highlights: {
        es: 'Lhasa · Potala · Everest',
        en: 'Lhasa · Potala · Everest',
        zh: '拉萨 · 布达拉宫 · 珠峰',
      },
    },
    {
      slug: 'yunnan',
      name: { es: 'Yunnan', en: 'Yunnan', zh: '云南' },
      province: 'yunnan',
      theme: 'culture',
      featured: true,
      imageUrl: 'https://picsum.photos/id/1080/900/600',
      shortDescription: {
        es: 'Terrazas, té y etnias fascinantes',
        en: 'Terraces, tea and vibrant cultures',
        zh: '梯田茶园与缤纷民族',
      },
      longDescription: {
        es: 'Yunnan es una de las provincias más diversas de China. Desde las cumbres nevadas de Shangri-La hasta los arrozales de Yuanyang, ofrece una riqueza cultural y natural sin igual.',
        en: "Yunnan is one of China's most diverse provinces. From the snowy peaks of Shangri-La to the rice terraces of Yuanyang, it offers unparalleled cultural and natural richness.",
        zh: '云南是中国最多元化的省份之一。从香格里拉的雪山到元阳的梯田，这里拥有无与伦比的文化和自然资源。',
      },
      highlights: {
        es: 'Lijiang · Dali · Shangri-La',
        en: 'Lijiang · Dali · Shangri-La',
        zh: '丽江 · 大理 · 香格里拉',
      },
    },
    {
      slug: 'xian',
      name: { es: "Xi'an", en: "Xi'an", zh: '西安' },
      province: 'shaanxi',
      theme: 'history',
      featured: true,
      imageUrl: 'https://picsum.photos/id/1043/900/600',
      shortDescription: {
        es: 'Guerreros de terracota y Ruta de la Seda',
        en: 'Terracotta warriors and the Silk Road',
        zh: '兵马俑与丝绸之路起点',
      },
      longDescription: {
        es: "Xi'an fue la capital de China durante más de mil años y el punto de partida de la Ruta de la Seda. Los guerreros de terracota, la muralla y el barrio musulmán son solo el comienzo.",
        en: "Xi'an was China's capital for over a thousand years and the starting point of the Silk Road. The Terracotta Warriors, city wall, and Muslim Quarter are just the beginning.",
        zh: '西安曾作为中国都城超过千年，是丝绸之路的起点。兵马俑、古城墙和回民街只是开始。',
      },
      highlights: {
        es: "Xi'an · Ejército de Terracota · Muralla",
        en: "Xi'an · Terracotta Army · City Wall",
        zh: '西安 · 兵马俑 · 古城墙',
      },
    },
    {
      slug: 'zhangjiajie',
      name: { es: 'Zhangjiajie', en: 'Zhangjiajie', zh: '张家界' },
      province: 'hunan',
      theme: 'adventure',
      featured: true,
      imageUrl: 'https://picsum.photos/id/1022/900/600',
      shortDescription: {
        es: 'Las montañas que inspiraron Avatar',
        en: 'The mountains that inspired Avatar',
        zh: '《阿凡达》取景地',
      },
      longDescription: {
        es: 'Zhangjiajie asombra con sus pilares de piedra arenisca que inspiraron las montañas flotantes de Avatar. El puente de cristal y los senderos entre nubes completan una experiencia inolvidable.',
        en: "Zhangjiajie amazes with its sandstone pillars that inspired Avatar's floating mountains. The glass bridge and cloud-walking trails complete an unforgettable experience.",
        zh: '张家界以启发了《阿凡达》悬浮山的砂岩石柱令人惊叹。玻璃桥和云中栈道让这里的体验令人难忘。',
      },
      highlights: {
        es: 'Zhangjiajie · Fenghuang',
        en: 'Zhangjiajie · Fenghuang',
        zh: '张家界 · 凤凰古城',
      },
    },
    {
      slug: 'beijing',
      name: { es: 'Pekín', en: 'Beijing', zh: '北京' },
      province: 'beijing',
      theme: 'history',
      featured: false,
      imageUrl: 'https://picsum.photos/id/1059/900/600',
      shortDescription: {
        es: 'La capital milenaria del imperio',
        en: 'The ancient imperial capital',
        zh: '千年帝都',
      },
      longDescription: {
        es: 'Pekín es el corazón político y cultural de China. La Ciudad Prohibida, la Gran Muralla y los hutongs tradicionales ofrecen una inmersión total en la historia y el presente del país.',
        en: "Beijing is the political and cultural heart of China. The Forbidden City, the Great Wall, and traditional hutongs offer total immersion in the country's history and present.",
        zh: '北京是中国的政治文化中心。故宫、长城和传统胡同让您全方位沉浸在这个国家的历史与现实中。',
      },
      highlights: {
        es: 'Gran Muralla · Ciudad Prohibida · Templo del Cielo',
        en: 'Great Wall · Forbidden City · Temple of Heaven',
        zh: '长城 · 故宫 · 天坛',
      },
    },
    {
      slug: 'chengdu',
      name: { es: 'Chengdu', en: 'Chengdu', zh: '成都' },
      province: 'sichuan',
      theme: 'culture',
      featured: false,
      imageUrl: 'https://picsum.photos/id/1036/900/600',
      shortDescription: {
        es: 'Pandas, té y la vida tranquila',
        en: 'Pandas, tea and the laid-back life',
        zh: '熊猫、茶馆与悠闲生活',
      },
      longDescription: {
        es: "Chengdu es la ciudad del relax en China. Capital del Sichuan, ofrece pandas gigantes, gastronomía picante y una cultura de casas de té que te invita a quedarte.",
        en: "Chengdu is China's laid-back city. Capital of Sichuan, it offers giant pandas, spicy cuisine, and a teahouse culture that invites you to stay.",
        zh: '成都是中国最悠闲的城市。作为四川省会，这里有大熊猫、麻辣美食和让人流连忘返的茶馆文化。',
      },
      highlights: {
        es: 'Chengdu · Jiuzhaigou · Leshan',
        en: 'Chengdu · Jiuzhaigou · Leshan',
        zh: '成都 · 九寨沟 · 乐山',
      },
    },
    {
      slug: 'dunhuang',
      name: { es: 'Dunhuang', en: 'Dunhuang', zh: '敦煌' },
      province: 'gansu',
      theme: 'history',
      featured: false,
      imageUrl: 'https://picsum.photos/id/1047/900/600',
      shortDescription: {
        es: 'Las grutas de Mogao y el desierto',
        en: 'Mogao Caves and the desert',
        zh: '莫高窟与大漠',
      },
      longDescription: {
        es: 'Dunhuang es un oasis en el desierto de Gobi y hogar de las famosas grutas de Mogao, Patrimonio de la Humanidad. Las dunas de Mingsha completan un paisaje de otro mundo.',
        en: 'Dunhuang is an oasis in the Gobi Desert and home to the famous UNESCO Mogao Caves. The Mingsha Sand Dunes complete an otherworldly landscape.',
        zh: '敦煌是戈壁沙漠中的绿洲，坐拥世界文化遗产莫高窟。鸣沙山月牙泉构成了如同外星球般的风景。',
      },
      highlights: {
        es: 'Dunhuang · Mogao · Zhangye Danxia',
        en: 'Dunhuang · Mogao · Zhangye Danxia',
        zh: '敦煌 · 莫高窟 · 张掖丹霞',
      },
    },
  ]

  // Map: destination slug -> Payload document id (for later relationship linking in Tours)
  const destinationIdMap: Record<string, number> = {}

  for (const dest of destinationsData) {
    const existingId = await findBySlug(payload, 'destinations', dest.slug)
    if (existingId) {
      console.log(`  Destination "${dest.slug}" already exists (id: ${existingId}), skipping.`)
      destinationIdMap[dest.slug] = existingId
      continue
    }

    // Create a media placeholder for coverImage by downloading the image
    let mediaId: number
    try {
      mediaId = await createMediaFromUrl(
        payload,
        dest.imageUrl,
        dest.name.es,
        dest.name.en,
        dest.name.zh,
        tmpDir,
      )
    } catch (err) {
      console.warn(`  Warning: Could not download image for ${dest.slug}, creating without coverImage...`)
      // Create a minimal placeholder media entry without a file
      const placeholder = await payload.create({
        collection: 'media',
        data: { alt: dest.name.es },
        filePath: undefined as any,
      }).catch(() => null)
      mediaId = placeholder?.id as number
      if (!mediaId) {
        console.error(`  ERROR: Cannot create destination "${dest.slug}" - media creation failed. Skipping.`)
        continue
      }
    }

    // Create with ES (default locale)
    const doc = await payload.create({
      collection: 'destinations',
      data: {
        slug: dest.slug,
        name: dest.name.es,
        province: dest.province as any,
        theme: dest.theme as any,
        featured: dest.featured,
        imageUrl: dest.imageUrl,
        coverImage: mediaId,
        shortDescription: dest.shortDescription.es,
        longDescription: dest.longDescription.es,
        highlights: dest.highlights.es,
        status: 'published',
      },
    })

    // Update EN
    await payload.update({
      collection: 'destinations',
      id: doc.id,
      locale: 'en',
      data: {
        name: dest.name.en,
        shortDescription: dest.shortDescription.en,
        longDescription: dest.longDescription.en,
        highlights: dest.highlights.en,
      },
    })

    // Update ZH
    await payload.update({
      collection: 'destinations',
      id: doc.id,
      locale: 'zh',
      data: {
        name: dest.name.zh,
        shortDescription: dest.shortDescription.zh,
        longDescription: dest.longDescription.zh,
        highlights: dest.highlights.zh,
      },
    })

    destinationIdMap[dest.slug] = doc.id as number
    console.log(`  Destination "${dest.slug}" created (id: ${doc.id}).`)
  }

  console.log(`  ${Object.keys(destinationIdMap).length} destinations processed.`)

  // ------------------------------------------------------------------
  // 5. Seed Tours
  // ------------------------------------------------------------------
  console.log('\n[5/7] Seeding Tours...')

  // Silk Road itinerary data
  const silkRoadItinerary = {
    es: [
      { day: 1, title: "Llegada a Xi'an", description: 'Recepción en el aeropuerto y traslado al hotel. Paseo libre por el barrio musulmán.' },
      { day: 2, title: 'Guerreros de Terracota', description: 'Visita al ejército de terracota, muralla de la ciudad y espectáculo de la dinastía Tang.' },
      { day: 3, title: 'Hacia Dunhuang', description: 'Tren de alta velocidad a Dunhuang. Tarde libre para explorar la ciudad.' },
      { day: 4, title: 'Grutas de Mogao', description: 'Visita a las grutas de Mogao, Patrimonio de la Humanidad. Atardecer en las dunas de Mingsha.' },
      { day: 5, title: 'Desierto de Gobi', description: 'Excursión al paso de Yumen y paisajes del desierto de Gobi.' },
    ],
    en: [
      { day: 1, title: "Arrival in Xi'an", description: 'Airport pickup and hotel transfer. Free walk through the Muslim Quarter.' },
      { day: 2, title: 'Terracotta Warriors', description: 'Visit the Terracotta Army, city wall and Tang Dynasty show.' },
      { day: 3, title: 'To Dunhuang', description: 'High-speed train to Dunhuang. Free afternoon to explore the town.' },
      { day: 4, title: 'Mogao Caves', description: 'Visit the UNESCO Mogao Caves. Sunset at Mingsha Sand Dunes.' },
      { day: 5, title: 'Gobi Desert', description: 'Excursion to Yumen Pass and Gobi Desert landscapes.' },
    ],
    zh: [
      { day: 1, title: '抵达西安', description: '机场接机，入住酒店。自由游览回民街。' },
      { day: 2, title: '兵马俑', description: '参观兵马俑博物馆、古城墙，观赏唐代歌舞表演。' },
      { day: 3, title: '前往敦煌', description: '乘高铁前往敦煌，下午自由活动。' },
      { day: 4, title: '莫高窟', description: '参观世界文化遗产莫高窟，鸣沙山月牙泉观日落。' },
      { day: 5, title: '戈壁沙漠', description: '游览玉门关及戈壁沙漠风光。' },
    ],
  }

  const silkRoadIncluded = {
    es: ['Vuelos internos', 'Hoteles 4-5★', 'Guía en español', 'Desayunos y 8 comidas/cenas', 'Transporte terrestre', 'Entradas a monumentos', 'Asistencia de visado'],
    en: ['Domestic flights', '4-5★ Hotels', 'Spanish-speaking guide', 'Breakfasts + 8 lunches/dinners', 'Ground transportation', 'Monument entrance fees', 'Visa assistance'],
    zh: ['国内机票', '四至五星酒店', '西班牙语导游', '早餐及8次正餐', '地面交通', '景点门票', '签证协助'],
  }

  const silkRoadExcluded = {
    es: ['Vuelo internacional', 'Seguro de viaje', 'Propinas', 'Gastos personales'],
    en: ['International flights', 'Travel insurance', 'Tips', 'Personal expenses'],
    zh: ['国际机票', '旅行保险', '小费', '个人消费'],
  }

  // Classic China itinerary data
  const classicChinaItinerary = {
    es: [
      { day: 1, title: 'Llegada a Pekín', description: 'Recepción en el aeropuerto y traslado al hotel. Paseo por el hutong de Nanluoguxiang.' },
      { day: 2, title: 'Ciudad Prohibida y Templo del Cielo', description: 'Visita guiada a la Ciudad Prohibida, Tiananmén y el Templo del Cielo. Cena de pato pekín.' },
      { day: 3, title: 'Gran Muralla', description: 'Excursión a la sección de Mutianyu de la Gran Muralla. Tarde libre en el centro.' },
      { day: 4, title: 'Tren a Xi\'an', description: 'Tren bala a Xi\'an. Visita al barrio musulmán y espectáculo de la dinastía Tang.' },
      { day: 5, title: 'Guerreros de Terracota', description: 'Visita al ejército de terracota y la muralla de Xi\'an en bicicleta.' },
      { day: 6, title: 'Vuelo a Shanghái', description: 'Vuelo a Shanghái. Tarde libre para explorar la concesión francesa.' },
      { day: 7, title: 'El Bund y Pudong', description: 'Visita al Bund, jardín Yuyuan, torre de Shanghái y barrio de Tianzifang.' },
      { day: 8, title: 'Día libre y despedida', description: 'Día libre para compras o visita opcional a Suzhou. Traslado al aeropuerto.' },
    ],
    en: [
      { day: 1, title: 'Arrival in Beijing', description: 'Airport pickup and hotel transfer. Stroll through Nanluoguxiang hutong.' },
      { day: 2, title: 'Forbidden City & Temple of Heaven', description: 'Guided tour of the Forbidden City, Tiananmen and Temple of Heaven. Peking duck dinner.' },
      { day: 3, title: 'Great Wall', description: 'Day trip to the Mutianyu section of the Great Wall. Free afternoon downtown.' },
      { day: 4, title: 'Train to Xi\'an', description: 'Bullet train to Xi\'an. Visit the Muslim Quarter and Tang Dynasty show.' },
      { day: 5, title: 'Terracotta Warriors', description: 'Visit the Terracotta Army and cycle the Xi\'an city wall.' },
      { day: 6, title: 'Flight to Shanghai', description: 'Flight to Shanghai. Free afternoon to explore the French Concession.' },
      { day: 7, title: 'The Bund & Pudong', description: 'Visit The Bund, Yu Garden, Shanghai Tower and Tianzifang.' },
      { day: 8, title: 'Free day & farewell', description: 'Free day for shopping or optional Suzhou day trip. Airport transfer.' },
    ],
    zh: [
      { day: 1, title: '抵达北京', description: '机场接机，入住酒店。漫步南锣鼓巷胡同。' },
      { day: 2, title: '故宫与天坛', description: '导览故宫、天安门和天坛。晚餐享用北京烤鸭。' },
      { day: 3, title: '长城', description: '游览慕田峪长城。下午市区自由活动。' },
      { day: 4, title: '高铁赴西安', description: '乘高铁前往西安。游览回民街，观赏唐代歌舞表演。' },
      { day: 5, title: '兵马俑', description: '参观兵马俑博物馆，骑行西安古城墙。' },
      { day: 6, title: '飞往上海', description: '飞往上海，下午自由游览法租界。' },
      { day: 7, title: '外滩与浦东', description: '游览外滩、豫园、上海中心大厦和田子坊。' },
      { day: 8, title: '自由活动与告别', description: '自由购物或可选苏州一日游。送机。' },
    ],
  }

  const classicChinaIncluded = {
    es: ['Vuelos internos Pekín-Shanghái', 'Tren bala Pekín-Xi\'an', 'Hoteles 4★', 'Guía en español', 'Desayunos y 5 comidas/cenas', 'Transporte terrestre', 'Entradas a monumentos', 'Asistencia de visado'],
    en: ['Domestic flight Beijing-Shanghai', 'Bullet train Beijing-Xi\'an', '4★ Hotels', 'Spanish-speaking guide', 'Breakfasts + 5 lunches/dinners', 'Ground transportation', 'Monument entrance fees', 'Visa assistance'],
    zh: ['北京-上海国内机票', '北京-西安高铁', '四星酒店', '西班牙语导游', '早餐及5次正餐', '地面交通', '景点门票', '签证协助'],
  }

  const classicChinaExcluded = {
    es: ['Vuelo internacional', 'Seguro de viaje', 'Propinas', 'Gastos personales', 'Comidas no indicadas'],
    en: ['International flights', 'Travel insurance', 'Tips', 'Personal expenses', 'Meals not indicated'],
    zh: ['国际机票', '旅行保险', '小费', '个人消费', '未标注的餐食'],
  }

  // Natural China itinerary data
  const naturalChinaItinerary = {
    es: [
      { day: 1, title: 'Llegada a Guilin', description: 'Recepción en el aeropuerto. Paseo por el lago Shanhu y la Pagoda del Sol y la Luna.' },
      { day: 2, title: 'Crucero por el Río Li', description: 'Crucero de día completo por el río Li hasta Yangshuo. Paisajes kársticos espectaculares.' },
      { day: 3, title: 'Yangshuo en bicicleta', description: 'Recorrido en bicicleta por los arrozales y aldeas rurales de Yangshuo.' },
      { day: 4, title: 'Arrozales de Longji', description: 'Excursión a las terrazas de arroz de Longji. Almuerzo con familia local Zhuang.' },
      { day: 5, title: 'Vuelo a Zhangjiajie', description: 'Vuelo a Zhangjiajie. Tarde libre en la ciudad.' },
      { day: 6, title: 'Parque Nacional de Zhangjiajie', description: 'Día completo en el parque. Pilares de Avatar, ascensor Bailong y puente de cristal.' },
      { day: 7, title: 'Cañón de cristal y Fenghuang', description: 'Visita al Gran Cañón de Zhangjiajie. Traslado a la ciudad antigua de Fenghuang.' },
      { day: 8, title: 'Vuelo a Kunming', description: 'Vuelo a Kunming. Visita al Bosque de Piedra.' },
      { day: 9, title: 'Tren a Dali', description: 'Tren a Dali. Paseo por el casco antiguo y el lago Erhai.' },
      { day: 10, title: 'Lijiang', description: 'Traslado a Lijiang. Casco antiguo y montaña del Dragón de Jade.' },
      { day: 11, title: 'Día libre en Lijiang', description: 'Día libre para explorar o excursión opcional a la Garganta del Salto del Tigre.' },
      { day: 12, title: 'Regreso', description: 'Vuelo de regreso desde Lijiang. Fin de los servicios.' },
    ],
    en: [
      { day: 1, title: 'Arrival in Guilin', description: 'Airport pickup. Walk around Shanhu Lake and Sun & Moon Pagodas.' },
      { day: 2, title: 'Li River Cruise', description: 'Full-day cruise down the Li River to Yangshuo. Spectacular karst scenery.' },
      { day: 3, title: 'Yangshuo by bike', description: 'Cycling tour through Yangshuo rice paddies and rural villages.' },
      { day: 4, title: 'Longji Rice Terraces', description: 'Day trip to Longji terraces. Lunch with a local Zhuang family.' },
      { day: 5, title: 'Flight to Zhangjiajie', description: 'Flight to Zhangjiajie. Free afternoon in town.' },
      { day: 6, title: 'Zhangjiajie National Park', description: 'Full day in the park. Avatar pillars, Bailong elevator and glass bridge.' },
      { day: 7, title: 'Glass canyon & Fenghuang', description: 'Visit Zhangjiajie Grand Canyon. Transfer to ancient Fenghuang town.' },
      { day: 8, title: 'Flight to Kunming', description: 'Flight to Kunming. Visit the Stone Forest.' },
      { day: 9, title: 'Train to Dali', description: 'Train to Dali. Stroll through the old town and Erhai Lake.' },
      { day: 10, title: 'Lijiang', description: 'Transfer to Lijiang. Old town and Jade Dragon Snow Mountain.' },
      { day: 11, title: 'Free day in Lijiang', description: 'Free day to explore or optional Tiger Leaping Gorge excursion.' },
      { day: 12, title: 'Departure', description: 'Return flight from Lijiang. End of services.' },
    ],
    zh: [
      { day: 1, title: '抵达桂林', description: '机场接机。漫步杉湖，游览日月双塔。' },
      { day: 2, title: '漓江游船', description: '全天漓江游船至阳朔，欣赏壮丽喀斯特风光。' },
      { day: 3, title: '阳朔骑行', description: '骑行穿越阳朔稻田和乡村。' },
      { day: 4, title: '龙脊梯田', description: '一日游龙脊梯田，与壮族家庭共进午餐。' },
      { day: 5, title: '飞往张家界', description: '飞往张家界，下午自由活动。' },
      { day: 6, title: '张家界国家公园', description: '全天游览：阿凡达石柱、百龙天梯、玻璃桥。' },
      { day: 7, title: '大峡谷与凤凰', description: '游览张家界大峡谷，前往凤凰古城。' },
      { day: 8, title: '飞往昆明', description: '飞往昆明，游览石林。' },
      { day: 9, title: '火车赴大理', description: '乘火车前往大理，漫步古城和洱海。' },
      { day: 10, title: '丽江', description: '前往丽江，游览古城和玉龙雪山。' },
      { day: 11, title: '丽江自由日', description: '自由探索或可选虎跳峡一日游。' },
      { day: 12, title: '返程', description: '从丽江乘机返回，行程结束。' },
    ],
  }

  const naturalChinaIncluded = {
    es: ['Vuelos internos (3 trayectos)', 'Tren Kunming-Dali', 'Hoteles 4★', 'Guía en español', 'Desayunos y 7 comidas/cenas', 'Crucero río Li', 'Transporte terrestre', 'Entradas a monumentos', 'Asistencia de visado'],
    en: ['Domestic flights (3 legs)', 'Kunming-Dali train', '4★ Hotels', 'Spanish-speaking guide', 'Breakfasts + 7 lunches/dinners', 'Li River cruise', 'Ground transportation', 'Monument entrance fees', 'Visa assistance'],
    zh: ['国内机票（3段）', '昆明-大理火车', '四星酒店', '西班牙语导游', '早餐及7次正餐', '漓江游船', '地面交通', '景点门票', '签证协助'],
  }

  const naturalChinaExcluded = {
    es: ['Vuelo internacional', 'Seguro de viaje', 'Propinas', 'Gastos personales', 'Comidas no indicadas'],
    en: ['International flights', 'Travel insurance', 'Tips', 'Personal expenses', 'Meals not indicated'],
    zh: ['国际机票', '旅行保险', '小费', '个人消费', '未标注的餐食'],
  }

  // Helper: map destination slugs to IDs for tour relationships
  function resolveDestinationIds(slugs: string[]): number[] {
    return slugs.map((s) => destinationIdMap[s]).filter(Boolean)
  }

  const toursData = [
    {
      slug: 'silk-road',
      title: { es: 'Ruta de la Seda', en: 'Silk Road', zh: '丝绸之路' },
      days: 15,
      cities: {
        es: "Xi'an · Dunhuang · Turpán · Kashgar",
        en: "Xi'an · Dunhuang · Turpan · Kashgar",
        zh: '西安 · 敦煌 · 吐鲁番 · 喀什',
      },
      price: 3490,
      badge: { es: 'Más Vendido', en: 'Best Seller', zh: '最受欢迎' },
      imageUrl: 'https://picsum.photos/id/1043/900/600',
      isUpcoming: true,
      isExpress: false,
      depositAmount: 100,
      destinationSlugs: ['xian', 'dunhuang'],
      departures: [
        { date: '2026-04-15', spotsTotal: 16, spotsBooked: 11 },
        { date: '2026-05-20', spotsTotal: 16, spotsBooked: 5 },
        { date: '2026-09-10', spotsTotal: 20, spotsBooked: 3 },
      ],
      itinerary: silkRoadItinerary,
      included: silkRoadIncluded,
      excluded: silkRoadExcluded,
    },
    {
      slug: 'classic-china',
      title: { es: 'China Clásica', en: 'Classic China', zh: '经典中国' },
      days: 10,
      cities: {
        es: "Pekín · Xi'an · Shanghái",
        en: "Beijing · Xi'an · Shanghai",
        zh: '北京 · 西安 · 上海',
      },
      price: 2290,
      badge: { es: 'Para Principiantes', en: 'First Trip', zh: '首次旅华' },
      imageUrl: 'https://picsum.photos/id/1040/900/600',
      isUpcoming: true,
      isExpress: false,
      depositAmount: 100,
      destinationSlugs: ['beijing', 'xian', 'shanghai'],
      departures: [
        { date: '2026-04-05', spotsTotal: 20, spotsBooked: 14 },
        { date: '2026-06-01', spotsTotal: 20, spotsBooked: 7 },
      ],
      itinerary: classicChinaItinerary,
      included: classicChinaIncluded,
      excluded: classicChinaExcluded,
    },
    {
      slug: 'natural-china',
      title: { es: 'China Natural', en: 'Natural China', zh: '自然中国' },
      days: 12,
      cities: {
        es: 'Guilin · Zhangjiajie · Yunnan',
        en: 'Guilin · Zhangjiajie · Yunnan',
        zh: '桂林 · 张家界 · 云南',
      },
      price: 2890,
      badge: { es: 'Naturaleza', en: 'Nature', zh: '自然之旅' },
      imageUrl: 'https://picsum.photos/id/1003/900/600',
      isUpcoming: true,
      isExpress: false,
      depositAmount: 100,
      destinationSlugs: ['guilin', 'zhangjiajie', 'yunnan'],
      departures: [
        { date: '2026-05-10', spotsTotal: 16, spotsBooked: 9 },
        { date: '2026-10-01', spotsTotal: 20, spotsBooked: 2 },
      ],
      itinerary: naturalChinaItinerary,
      included: naturalChinaIncluded,
      excluded: naturalChinaExcluded,
    },
    {
      slug: 'yunnan-explorer',
      title: { es: 'Yunnan Explorador', en: 'Yunnan Explorer', zh: '云南探秘' },
      days: 8,
      cities: {
        es: 'Kunming · Dali · Lijiang · Shangri-La',
        en: 'Kunming · Dali · Lijiang · Shangri-La',
        zh: '昆明 · 大理 · 丽江 · 香格里拉',
      },
      price: 1990,
      badge: { es: 'Cultura', en: 'Culture', zh: '文化之旅' },
      imageUrl: 'https://picsum.photos/id/1080/900/600',
      isUpcoming: false,
      isExpress: false,
      depositAmount: 100,
      destinationSlugs: ['yunnan'],
    },
    {
      slug: 'tibet-sacred',
      title: { es: 'Tíbet Sagrado', en: 'Sacred Tibet', zh: '神圣西藏' },
      days: 10,
      cities: {
        es: 'Lhasa · Shigatse · Everest Base Camp',
        en: 'Lhasa · Shigatse · Everest Base Camp',
        zh: '拉萨 · 日喀则 · 珠峰大本营',
      },
      price: 3190,
      badge: { es: 'Espiritual', en: 'Spiritual', zh: '心灵之旅' },
      imageUrl: 'https://picsum.photos/id/1018/900/600',
      isUpcoming: false,
      isExpress: false,
      depositAmount: 100,
      destinationSlugs: ['tibet'],
    },
    {
      slug: 'beijing-shanghai',
      title: { es: 'Pekín & Shanghái', en: 'Beijing & Shanghai', zh: '京沪双城' },
      days: 6,
      cities: {
        es: 'Pekín · Shanghái',
        en: 'Beijing · Shanghai',
        zh: '北京 · 上海',
      },
      price: 1490,
      badge: { es: 'Express', en: 'Express', zh: '快捷游' },
      imageUrl: 'https://picsum.photos/id/1059/900/600',
      isUpcoming: false,
      isExpress: false,
      depositAmount: 100,
      destinationSlugs: ['beijing', 'shanghai'],
    },
    // Express-only tours
    {
      slug: 'silk-road-express',
      title: { es: 'Ruta de la Seda Express', en: 'Silk Road Express', zh: '丝绸之路特快' },
      days: 12,
      cities: {
        es: "Xi'an · Dunhuang · Kashgar",
        en: "Xi'an · Dunhuang · Kashgar",
        zh: '西安 · 敦煌 · 喀什',
      },
      price: 3490,
      discountPrice: 2790,
      discountPercent: 20,
      imageUrl: 'https://picsum.photos/id/1036/900/600',
      isUpcoming: false,
      isExpress: true,
      depositAmount: 100,
      destinationSlugs: ['xian', 'dunhuang'],
      departures: [{ date: '2026-04-15', spotsTotal: 16, spotsBooked: 10 }],
    },
    {
      slug: 'yunnan-express',
      title: { es: 'Yunnan Exprés', en: 'Yunnan Express', zh: '云南特快' },
      days: 8,
      cities: {
        es: 'Kunming · Dali · Lijiang',
        en: 'Kunming · Dali · Lijiang',
        zh: '昆明 · 大理 · 丽江',
      },
      price: 2290,
      discountPrice: 1830,
      discountPercent: 20,
      imageUrl: 'https://picsum.photos/id/1015/900/600',
      isUpcoming: false,
      isExpress: true,
      depositAmount: 100,
      destinationSlugs: ['yunnan'],
      departures: [{ date: '2026-04-22', spotsTotal: 16, spotsBooked: 12 }],
    },
    {
      slug: 'beijing-shanghai-express',
      title: { es: 'Pekín & Shanghái', en: 'Beijing & Shanghai', zh: '北京 & 上海' },
      days: 7,
      cities: {
        es: 'Pekín · Shanghái',
        en: 'Beijing · Shanghai',
        zh: '北京 · 上海',
      },
      price: 1890,
      discountPrice: 1510,
      discountPercent: 20,
      imageUrl: 'https://picsum.photos/id/1040/900/600',
      isUpcoming: false,
      isExpress: true,
      depositAmount: 100,
      destinationSlugs: ['beijing', 'shanghai'],
      departures: [{ date: '2026-05-01', spotsTotal: 20, spotsBooked: 12 }],
    },
    {
      slug: 'tibet-mystic',
      title: { es: 'Tíbet Místico', en: 'Mystic Tibet', zh: '神秘西藏' },
      days: 10,
      cities: {
        es: 'Lhasa · Shigatse · Everest BC',
        en: 'Lhasa · Shigatse · Everest BC',
        zh: '拉萨 · 日喀则 · 珠峰大本营',
      },
      price: 3190,
      discountPrice: 2550,
      discountPercent: 20,
      imageUrl: 'https://picsum.photos/id/1047/900/600',
      isUpcoming: false,
      isExpress: true,
      depositAmount: 100,
      destinationSlugs: ['tibet'],
      departures: [{ date: '2026-05-10', spotsTotal: 16, spotsBooked: 13 }],
    },
  ]

  const tourIdMap: Record<string, number> = {}

  for (const tour of toursData) {
    const existingId = await findBySlug(payload, 'tours', tour.slug)
    if (existingId) {
      console.log(`  Tour "${tour.slug}" already exists (id: ${existingId}), skipping.`)
      tourIdMap[tour.slug] = existingId
      continue
    }

    // Create media for cover image
    let mediaId: number
    try {
      mediaId = await createMediaFromUrl(
        payload,
        tour.imageUrl,
        tour.title.es,
        tour.title.en,
        tour.title.zh,
        tmpDir,
      )
    } catch (err) {
      console.warn(`  Warning: Could not download image for tour ${tour.slug}, trying fallback...`)
      const placeholder = await payload.create({
        collection: 'media',
        data: { alt: tour.title.es },
        filePath: undefined as any,
      }).catch(() => null)
      mediaId = placeholder?.id as number
      if (!mediaId) {
        console.error(`  ERROR: Cannot create tour "${tour.slug}" - media creation failed. Skipping.`)
        continue
      }
    }

    // Build itinerary for ES (default locale) - only for silk-road which has detailed itinerary
    const itineraryEs = tour.itinerary
      ? tour.itinerary.es.map((item) => ({
          day: item.day,
          title: item.title,
          description: lexicalParagraph(item.description),
        }))
      : undefined

    // Build included/excluded richText for ES
    const includedEs = tour.included ? lexicalBulletList(tour.included.es) : undefined
    const excludedEs = tour.excluded ? lexicalBulletList(tour.excluded.es) : undefined

    const esData: Record<string, any> = {
      slug: tour.slug,
      title: tour.title.es,
      days: tour.days,
      cities: tour.cities.es,
      price: tour.price,
      badge: tour.badge?.es,
      imageUrl: tour.imageUrl,
      coverImage: mediaId,
      isUpcoming: tour.isUpcoming,
      isExpress: tour.isExpress,
      depositAmount: tour.depositAmount,
      destinations: resolveDestinationIds(tour.destinationSlugs || []),
      status: 'published',
    }

    if (tour.discountPrice) esData.discountPrice = tour.discountPrice
    if (tour.discountPercent) esData.discountPercent = tour.discountPercent
    if (tour.departures) esData.departures = tour.departures
    if (itineraryEs) esData.itinerary = itineraryEs
    if (includedEs) esData.included = includedEs
    if (excludedEs) esData.excluded = excludedEs

    const doc = await payload.create({
      collection: 'tours',
      data: esData as any,
    })

    // Update EN
    const enData: Record<string, any> = {
      title: tour.title.en,
      cities: tour.cities.en,
      badge: tour.badge?.en,
    }
    if (tour.itinerary) {
      enData.itinerary = tour.itinerary.en.map((item) => ({
        day: item.day,
        title: item.title,
        description: lexicalParagraph(item.description),
      }))
    }
    if (tour.included) enData.included = lexicalBulletList(tour.included.en)
    if (tour.excluded) enData.excluded = lexicalBulletList(tour.excluded.en)

    await payload.update({
      collection: 'tours',
      id: doc.id,
      locale: 'en',
      data: enData,
    })

    // Update ZH
    const zhData: Record<string, any> = {
      title: tour.title.zh,
      cities: tour.cities.zh,
      badge: tour.badge?.zh,
    }
    if (tour.itinerary) {
      zhData.itinerary = tour.itinerary.zh.map((item) => ({
        day: item.day,
        title: item.title,
        description: lexicalParagraph(item.description),
      }))
    }
    if (tour.included) zhData.included = lexicalBulletList(tour.included.zh)
    if (tour.excluded) zhData.excluded = lexicalBulletList(tour.excluded.zh)

    await payload.update({
      collection: 'tours',
      id: doc.id,
      locale: 'zh',
      data: zhData,
    })

    tourIdMap[tour.slug] = doc.id as number
    console.log(`  Tour "${tour.slug}" created (id: ${doc.id}).`)
  }

  console.log(`  ${Object.keys(tourIdMap).length} tours processed.`)

  // ------------------------------------------------------------------
  // 6. Seed Reviews
  // ------------------------------------------------------------------
  console.log('\n[6/7] Seeding Reviews...')

  const reviewsData = [
    {
      customerName: 'María G.',
      customerLocation: 'Madrid',
      rating: 5,
      content: {
        es: 'Una experiencia que cambió mi forma de ver el mundo. Todo perfecto, guías en español en todo momento.',
        en: 'An experience that changed how I see the world. Everything perfect, Spanish-speaking guides throughout.',
        zh: '一次改变我世界观的旅程，一切都很完美，全程西班牙语服务。',
      },
    },
    {
      customerName: 'Thomas K.',
      customerLocation: 'Berlin',
      rating: 5,
      content: {
        es: 'Viajé con mi familia a Yunnan y Guilin. Los niños quedaron fascinados. Organización impecable.',
        en: 'Travelled with my family to Yunnan and Guilin. The kids were amazed. Flawless organisation.',
        zh: '带家人游了云南和桂林，孩子们惊叹不已，组织安排无懈可击。',
      },
    },
    {
      customerName: '林小红',
      customerLocation: 'Barcelona',
      rating: 5,
      content: {
        es: 'Como china viviendo en España, este viaje me devolvió mis raíces. El servicio en chino fue impecable.',
        en: 'As a Chinese living in Spain, this trip gave me back my roots. Chinese-language service was impeccable.',
        zh: '作为旅居西班牙的华人，这次旅行让我重新找到了根，中文服务无可挑剔。',
      },
    },
  ]

  // Check if reviews already exist by customerName
  for (const review of reviewsData) {
    const existing = await payload.find({
      collection: 'reviews',
      where: { customerName: { equals: review.customerName } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      console.log(`  Review by "${review.customerName}" already exists, skipping.`)
      continue
    }

    const doc = await payload.create({
      collection: 'reviews',
      data: {
        customerName: review.customerName,
        customerLocation: review.customerLocation,
        rating: review.rating,
        content: review.content.es,
        status: 'published',
      },
    })

    await payload.update({
      collection: 'reviews',
      id: doc.id,
      locale: 'en',
      data: { content: review.content.en },
    })

    await payload.update({
      collection: 'reviews',
      id: doc.id,
      locale: 'zh',
      data: { content: review.content.zh },
    })

    console.log(`  Review by "${review.customerName}" created (id: ${doc.id}).`)
  }

  // ------------------------------------------------------------------
  // 7. Seed Posts (Blog)
  // ------------------------------------------------------------------
  console.log('\n[7/7] Seeding Posts...')

  const postsData = [
    {
      slug: 'visa-guide-spanish-citizens',
      title: {
        es: 'Guía completa de visado para ciudadanos españoles',
        en: 'Complete visa guide for Spanish citizens',
        zh: '西班牙公民签证完整指南',
      },
      category: 'tips',
      imageUrl: 'https://picsum.photos/id/1015/800/500',
      publishedAt: '2026-02-20',
      excerpt: {
        es: 'Todo lo que necesitas saber sobre el proceso de solicitud de visado para China.',
        en: 'Everything you need to know about the China visa application process.',
        zh: '关于中国签证申请流程的所有信息。',
      },
      content: {
        es: [
          'Obtener un visado para China desde España es un proceso sencillo si sigues los pasos correctos. En esta guía te explicamos todo lo que necesitas saber para que tu solicitud sea aprobada sin problemas.',
          'El primer paso es reunir la documentación necesaria: pasaporte con al menos 6 meses de validez y 2 páginas en blanco, formulario de solicitud cumplimentado, foto reciente tipo carnet, reserva de vuelo y hotel, y una carta de invitación o itinerario de viaje.',
          'El visado turístico (tipo L) es el más común para viajeros. Se tramita en el Centro de Servicio de Visados de China en Madrid o Barcelona. El tiempo de tramitación estándar es de 4 días laborables, aunque existe un servicio exprés de 2-3 días con coste adicional.',
          'En ChinaWay ofrecemos asistencia completa de visado incluida en todos nuestros paquetes. Nos encargamos de revisar tu documentación, preparar la carta de invitación y acompañarte en todo el proceso. Contacta con nosotros si tienes cualquier duda.',
        ],
        en: [
          'Getting a visa for China from Spain is a straightforward process if you follow the right steps. In this guide we explain everything you need to know for a smooth application.',
          'The first step is gathering the required documents: passport with at least 6 months validity and 2 blank pages, completed application form, recent passport-size photo, flight and hotel booking, and an invitation letter or travel itinerary.',
          'The tourist visa (Type L) is the most common for travelers. It is processed at the Chinese Visa Application Service Center in Madrid or Barcelona. Standard processing time is 4 business days, with an express service of 2-3 days at extra cost.',
          'At ChinaWay we offer full visa assistance included in all our packages. We review your documents, prepare the invitation letter, and guide you through the whole process. Contact us if you have any questions.',
        ],
        zh: [
          '从西班牙获取中国签证是一个简单的过程，只要按照正确的步骤操作即可。本指南将为您详细介绍申请流程的方方面面。',
          '第一步是准备所需文件：有效期至少6个月且有2页空白页的护照、填写完整的申请表、近期证件照、机票和酒店预订确认函，以及邀请函或旅行行程单。',
          '旅游签证（L签）是最常见的类型。可在马德里或巴塞罗那的中国签证申请服务中心办理。标准处理时间为4个工作日，加急服务2-3天需额外付费。',
          'ChinaWay所有行程套餐均包含完整的签证协助服务。我们负责审核您的材料、准备邀请函，并全程陪伴您完成申请。如有任何疑问，请随时联系我们。',
        ],
      },
      author: 'ChinaWay Team',
      relatedSlugs: ['traveling-china-with-kids', 'great-wall-sections'],
    },
    {
      slug: 'hidden-gems-yunnan',
      title: {
        es: 'Joyas ocultas de Yunnan que no puedes perderte',
        en: 'Hidden gems of Yunnan you cannot miss',
        zh: '云南不可错过的隐秘宝藏',
      },
      category: 'destinations',
      imageUrl: 'https://picsum.photos/id/1039/800/500',
      publishedAt: '2026-02-10',
      excerpt: {
        es: 'Más allá de Lijiang y Dali, Yunnan esconde pueblos ancestrales y paisajes que te dejarán sin aliento.',
        en: 'Beyond Lijiang and Dali, Yunnan hides ancestral villages and landscapes that will take your breath away.',
        zh: '在丽江和大理之外，云南还隐藏着古老的村落和令人叹为观止的风景。',
      },
      content: {
        es: [
          'Yunnan es una de las provincias más diversas y fascinantes de China. Mientras que Lijiang y Dali atraen a la mayoría de los turistas, hay rincones menos conocidos que ofrecen experiencias igual de memorables.',
          'Las terrazas de arroz de Yuanyang, al sur de la provincia, son un espectáculo visual sin igual. Construidas por la etnia Hani durante siglos, estas terrazas cambian de color con las estaciones y al amanecer ofrecen un paisaje que parece sacado de un sueño.',
          'Shaxi es un pueblo de la antigua Ruta del Té y los Caballos que ha conservado su encanto original. Su plaza central, el templo Xingjiao y los alrededores montañosos lo convierten en un destino perfecto para desconectar del turismo masivo.',
          'La Garganta del Salto del Tigre, entre Lijiang y Shangri-La, ofrece uno de los trekkings más espectaculares del mundo. El sendero de dos días te lleva por paisajes de vértigo con el río Yangtsé rugiendo cientos de metros más abajo.',
        ],
        en: [
          'Yunnan is one of China\'s most diverse and fascinating provinces. While Lijiang and Dali attract most tourists, there are lesser-known spots offering equally memorable experiences.',
          'The Yuanyang Rice Terraces in the south of the province are an unparalleled visual spectacle. Built by the Hani people over centuries, these terraces change colour with the seasons and offer a dreamlike landscape at sunrise.',
          'Shaxi is a town on the ancient Tea Horse Road that has preserved its original charm. Its central square, Xingjiao Temple and surrounding mountains make it a perfect destination to escape mass tourism.',
          'Tiger Leaping Gorge, between Lijiang and Shangri-La, offers one of the world\'s most spectacular treks. The two-day trail takes you through vertigo-inducing scenery with the Yangtze River roaring hundreds of metres below.',
        ],
        zh: [
          '云南是中国最多元、最迷人的省份之一。虽然丽江和大理吸引了大多数游客，但还有很多鲜为人知的角落同样值得探索。',
          '省南部的元阳梯田是无与伦比的视觉盛宴。哈尼族历经数百年建造的梯田随季节变幻色彩，日出时分的景色如梦似幻。',
          '沙溪是茶马古道上一座保存完好的古镇。中心广场、兴教寺和周围的群山使其成为远离大众旅游的理想去处。',
          '虎跳峡位于丽江和香格里拉之间，是世界上最壮观的徒步路线之一。两天的行程穿越令人目眩的峡谷，金沙江在数百米下方奔腾咆哮。',
        ],
      },
      author: 'ChinaWay Team',
      relatedSlugs: ['chinese-tea-culture', 'great-wall-sections'],
    },
    {
      slug: 'chinese-tea-culture',
      title: {
        es: 'La cultura del té en China: una tradición milenaria',
        en: 'Tea culture in China: a millenary tradition',
        zh: '中国茶文化：千年传承',
      },
      category: 'culture',
      imageUrl: 'https://picsum.photos/id/1060/800/500',
      publishedAt: '2026-01-28',
      excerpt: {
        es: 'Descubre los rituales, las variedades y los lugares donde podrás vivir una auténtica ceremonia del té.',
        en: 'Discover the rituals, varieties, and places where you can experience an authentic tea ceremony.',
        zh: '探索茶道仪式、茶叶品种以及旅途中体验正宗茶道的好去处。',
      },
      content: {
        es: [
          'El té es mucho más que una bebida en China: es un arte, una filosofía y un puente entre personas. Con más de 5.000 años de historia, la cultura del té forma parte esencial de la vida cotidiana china.',
          'China produce seis grandes categorías de té: verde, blanco, amarillo, oolong, rojo (conocido en Occidente como "negro") y pu-erh (fermentado). Cada región tiene su especialidad, desde el Longjing de Hangzhou hasta el pu-erh de Yunnan.',
          'La ceremonia del té (gongfu cha) es un ritual que requiere precisión y calma. Se utilizan utensilios específicos: tetera de arcilla yixing, tazas de aroma, bandeja de té y un hervidor de agua a temperatura controlada. El maestro de té vierte el agua en movimientos circulares, descarta la primera infusión y sirve las siguientes con gestos medidos.',
          'En tu viaje con ChinaWay, te llevaremos a casas de té tradicionales en Chengdu, plantaciones en Hangzhou y mercados de té en Kunming donde podrás aprender directamente de los maestros.',
        ],
        en: [
          'Tea is much more than a drink in China: it is an art, a philosophy and a bridge between people. With over 5,000 years of history, tea culture is an essential part of daily Chinese life.',
          'China produces six major tea categories: green, white, yellow, oolong, red (known in the West as "black") and pu-erh (fermented). Each region has its specialty, from Hangzhou\'s Longjing to Yunnan\'s pu-erh.',
          'The tea ceremony (gongfu cha) is a ritual requiring precision and calm. Specific utensils are used: a yixing clay teapot, aroma cups, a tea tray and a temperature-controlled kettle. The tea master pours water in circular motions, discards the first brew, and serves subsequent infusions with measured gestures.',
          'On your ChinaWay trip, we will take you to traditional teahouses in Chengdu, plantations in Hangzhou and tea markets in Kunming where you can learn directly from the masters.',
        ],
        zh: [
          '茶在中国远不止是一种饮品：它是一门艺术、一种哲学，更是人与人之间的纽带。五千多年来，茶文化已融入中国人的日常生活。',
          '中国出产六大茶类：绿茶、白茶、黄茶、乌龙茶、红茶和普洱茶（后发酵茶）。每个产区都有特色品种，从杭州龙井到云南普洱，各具风味。',
          '功夫茶是一种讲究精确与从容的仪式。使用紫砂壶、闻香杯、茶盘和控温水壶等专用器具。茶师以环形手法注水，弃去头泡，后续每一泡都以精准的手势呈上。',
          '在ChinaWay的行程中，我们将带您走进成都的传统茶馆、杭州的茶园和昆明的茶叶市场，亲身跟随茶师学习品茶之道。',
        ],
      },
      author: 'ChinaWay Team',
      relatedSlugs: ['hidden-gems-yunnan', 'best-street-food-beijing'],
    },
    {
      slug: 'best-street-food-beijing',
      title: {
        es: 'La mejor comida callejera de Pekín',
        en: 'The best street food in Beijing',
        zh: '北京最佳街头美食',
      },
      category: 'food',
      imageUrl: 'https://picsum.photos/id/1080/800/500',
      publishedAt: '2026-01-15',
      excerpt: {
        es: 'Te llevamos por los mejores puestos callejeros de la capital china.',
        en: 'We take you through the best street food stalls in the Chinese capital.',
        zh: '带您走遍北京最好的街头小吃摊。',
      },
      content: {
        es: [
          'Pekín es un paraíso para los amantes de la comida callejera. Más allá del famoso pato laqueado, la capital china ofrece una variedad de sabores que sorprende hasta al viajero más experimentado.',
          'El jianbing (crepe chino) es el desayuno rey de Pekín. En cada esquina encontrarás puestos donde preparan esta masa crujiente rellena de huevo, cebolleta, cilantro y una lámina de wonton frito. Cuestan apenas 1-2 euros y son adictivos.',
          'En el barrio de Guijie ("la calle fantasma") encontrarás cientos de restaurantes abiertos hasta la madrugada especializados en cangrejos de río picantes (mala xiaolongxia). Es la experiencia nocturna gastronómica por excelencia de Pekín.',
          'Los hutongs esconden tesoros: el zhajiangmian (fideos con salsa de soja frita) de los puestos locales es incomparable. Y para los más aventureros, el mercado nocturno de Donghuamen ofrece escorpiones y estrellas de mar fritos, aunque esto es más para turistas que para pekieneses.',
          'En nuestros viajes, nuestros guías locales te llevarán a los puestos auténticos donde comen los propios pekieneses, lejos de las trampas turísticas.',
        ],
        en: [
          'Beijing is a paradise for street food lovers. Beyond the famous Peking duck, the Chinese capital offers a variety of flavors that surprises even the most seasoned traveler.',
          'Jianbing (Chinese crepe) is Beijing\'s king of breakfasts. On every corner you\'ll find stalls preparing this crispy wrap filled with egg, spring onion, coriander and a fried wonton cracker. They cost just 1-2 euros and are addictive.',
          'In the Guijie neighbourhood ("Ghost Street") you\'ll find hundreds of restaurants open until the early hours specializing in spicy crayfish (mala xiaolongxia). It\'s Beijing\'s quintessential late-night food experience.',
          'The hutongs hide treasures: the zhajiangmian (noodles with fried bean paste) from local stalls is unbeatable. For the adventurous, Donghuamen night market offers fried scorpions and starfish, though this is more for tourists than locals.',
          'On our trips, our local guides take you to the authentic stalls where Beijingers themselves eat, far from the tourist traps.',
        ],
        zh: [
          '北京是街头美食爱好者的天堂。除了闻名遐迩的北京烤鸭，这座城市还有令人惊喜的丰富美味，即使是最资深的旅行者也会大开眼界。',
          '煎饼是北京的早餐之王。街头巷尾都有摊位，现做的薄脆饼皮裹着鸡蛋、葱花、香菜和炸馄饨皮，只要几块钱，让人欲罢不能。',
          '簋街（"鬼街"）有数百家营业到凌晨的餐厅，以麻辣小龙虾著称。这里是北京最具代表性的夜间美食体验。',
          '胡同里藏着宝藏：当地小摊的炸酱面是任何餐厅都比不了的味道。东华门夜市还有炸蝎子和海星等猎奇小吃，不过那更多是为游客准备的。',
          '在我们的行程中，本地导游会带您去北京人自己常吃的地道摊位，远离游客陷阱。',
        ],
      },
      author: 'ChinaWay Team',
      relatedSlugs: ['chinese-tea-culture', 'great-wall-sections'],
    },
    {
      slug: 'great-wall-sections',
      title: {
        es: 'Los mejores tramos de la Gran Muralla para visitar',
        en: 'The best Great Wall sections to visit',
        zh: '长城最值得游览的段落',
      },
      category: 'destinations',
      imageUrl: 'https://picsum.photos/id/1047/800/500',
      publishedAt: '2026-01-05',
      excerpt: {
        es: 'Badaling, Mutianyu o Jinshanling: cada tramo tiene su encanto.',
        en: 'Badaling, Mutianyu or Jinshanling: each section has its charm.',
        zh: '八达岭、慕田峪还是金山岭：每一段都有独特魅力。',
      },
      content: {
        es: [
          'La Gran Muralla China se extiende más de 21.000 kilómetros, pero no todos sus tramos son iguales. Elegir el adecuado puede marcar la diferencia entre una experiencia masificada y un momento mágico.',
          'Badaling es el tramo más visitado y el mejor restaurado. Está a solo 70 km de Pekín y cuenta con teleférico. Es ideal para familias y personas con movilidad reducida, pero puede estar muy concurrido, especialmente en festivos.',
          'Mutianyu combina buena restauración con menos multitudes. También tiene teleférico y tobogán de bajada. Las torres de vigilancia ofrecen vistas espectaculares y es nuestro tramo recomendado para la mayoría de viajeros.',
          'Jinshanling es para los aventureros. Menos restaurado y con pocos turistas, ofrece la experiencia más auténtica. El senderismo desde Jinshanling a Simatai (4-5 horas) es uno de los trekkings más memorables de China.',
          'En ChinaWay organizamos visitas a los tres tramos según tu perfil viajero. Nuestros guías conocen los mejores horarios y miradores para evitar aglomeraciones.',
        ],
        en: [
          'The Great Wall of China stretches over 21,000 kilometres, but not all sections are the same. Choosing the right one can make the difference between a crowded experience and a magical moment.',
          'Badaling is the most visited and best-restored section. Just 70 km from Beijing with a cable car, it\'s ideal for families and people with limited mobility, but can be very crowded, especially on holidays.',
          'Mutianyu combines good restoration with fewer crowds. It also has a cable car and a toboggan ride down. The watchtowers offer spectacular views and it\'s our recommended section for most travelers.',
          'Jinshanling is for adventurers. Less restored and with few tourists, it offers the most authentic experience. The hike from Jinshanling to Simatai (4-5 hours) is one of China\'s most memorable treks.',
          'At ChinaWay we organise visits to all three sections based on your traveler profile. Our guides know the best times and viewpoints to avoid the crowds.',
        ],
        zh: [
          '中国长城全长超过21,000公里，但并非每一段都一样。选对段落，可能决定你是在人山人海中挤行，还是享受一段难忘的旅程。',
          '八达岭是游客最多、修复最完善的段落。距北京仅70公里，配有缆车，适合家庭和行动不便的游客，但节假日可能非常拥挤。',
          '慕田峪兼具良好修复和较少人流。同样有缆车和滑道。烽火台上视野开阔，是我们向大多数旅客推荐的段落。',
          '金山岭适合探险者。修复较少、游客稀少，提供最原始的长城体验。从金山岭到司马台的徒步（4-5小时）是中国最难忘的徒步线路之一。',
          'ChinaWay会根据您的旅行风格安排不同段落的游览。我们的导游深谙最佳时段和观景点，助您避开人群。',
        ],
      },
      author: 'ChinaWay Team',
      relatedSlugs: ['visa-guide-spanish-citizens', 'traveling-china-with-kids'],
    },
    {
      slug: 'traveling-china-with-kids',
      title: {
        es: 'Viajar a China con niños: consejos prácticos',
        en: 'Traveling to China with kids: practical tips',
        zh: '带孩子去中国旅行：实用建议',
      },
      category: 'tips',
      imageUrl: 'https://picsum.photos/id/1024/800/500',
      publishedAt: '2025-12-20',
      excerpt: {
        es: 'China es un destino fantástico para familias.',
        en: 'China is a fantastic destination for families.',
        zh: '中国是家庭旅行的绝佳目的地。',
      },
      content: {
        es: [
          'China es un destino fantástico para viajar en familia. Los niños quedan fascinados por la Gran Muralla, los pandas de Chengdu y las montañas de Avatar en Zhangjiajie. Con algo de planificación, el viaje será inolvidable para toda la familia.',
          'La mejor época para viajar con niños es la primavera (abril-mayo) y el otoño (septiembre-octubre), cuando el clima es agradable y hay menos turistas. Evita la Semana Dorada de octubre y el Año Nuevo Chino, cuando todo el país está en movimiento.',
          'En cuanto a comida, no te preocupes: la gastronomía china tiene opciones para todos los gustos. El arroz frito, los dumplings y los fideos son favoritos universales entre los niños. En las grandes ciudades también encontrarás opciones occidentales sin problema.',
          'El transporte en China es sorprendentemente cómodo para familias. Los trenes de alta velocidad son espaciosos y puntuales. Los hoteles de 4-5 estrellas ofrecen habitaciones familiares. Y los vuelos internos son frecuentes y asequibles.',
          'En ChinaWay diseñamos itinerarios específicos para familias con un ritmo más relajado, actividades interactivas para niños y guías que saben cómo mantener el interés de los más pequeños.',
        ],
        en: [
          'China is a fantastic destination for family travel. Kids are amazed by the Great Wall, Chengdu\'s pandas and Zhangjiajie\'s Avatar mountains. With some planning, the trip will be unforgettable for the whole family.',
          'The best time to travel with children is spring (April-May) and autumn (September-October), when the weather is pleasant and there are fewer tourists. Avoid Golden Week in October and Chinese New Year, when the whole country is on the move.',
          'As for food, don\'t worry: Chinese cuisine has options for all tastes. Fried rice, dumplings and noodles are universal favourites among children. In major cities you\'ll also find Western options easily.',
          'Transport in China is surprisingly comfortable for families. High-speed trains are spacious and punctual. 4-5 star hotels offer family rooms. And domestic flights are frequent and affordable.',
          'At ChinaWay we design family-specific itineraries with a more relaxed pace, interactive activities for kids, and guides who know how to keep young ones engaged.',
        ],
        zh: [
          '中国是绝佳的家庭旅行目的地。长城、成都大熊猫和张家界阿凡达山让孩子们惊叹不已。只要稍加规划，全家人都会拥有一段难忘的旅程。',
          '带孩子出行的最佳时间是春季（4-5月）和秋季（9-10月），气候宜人且游客较少。避开十一黄金周和春节，那时全国都在出行高峰。',
          '饮食方面无需担心：中国美食总有适合孩子们的选择。炒饭、饺子和面条是小朋友的最爱。在大城市也很容易找到西餐。',
          '中国的交通对家庭来说出人意料地舒适。高铁宽敞准时，四五星级酒店提供家庭房，国内航班班次多且价格实惠。',
          'ChinaWay专为家庭设计节奏更轻松的行程，包含适合儿童的互动活动，导游也善于保持小朋友的兴趣。',
        ],
      },
      author: 'ChinaWay Team',
      relatedSlugs: ['visa-guide-spanish-citizens', 'best-street-food-beijing'],
    },
  ]

  const postIdMap: Record<string, number> = {}

  for (const post of postsData) {
    const existingId = await findBySlug(payload, 'posts', post.slug)
    if (existingId) {
      console.log(`  Post "${post.slug}" already exists (id: ${existingId}), skipping.`)
      postIdMap[post.slug] = existingId
      continue
    }

    // Create media for cover image
    let mediaId: number | undefined
    try {
      mediaId = await createMediaFromUrl(
        payload,
        post.imageUrl,
        post.title.es,
        post.title.en,
        post.title.zh,
        tmpDir,
      )
    } catch (err) {
      console.warn(`  Warning: Could not download image for post ${post.slug}, continuing without coverImage.`)
    }

    const esData: Record<string, any> = {
      slug: post.slug,
      title: post.title.es,
      category: post.category,
      imageUrl: post.imageUrl,
      publishedAt: post.publishedAt,
      excerpt: post.excerpt.es,
      author: post.author,
      status: 'published',
    }
    if (mediaId) esData.coverImage = mediaId
    if (post.content) esData.content = lexicalParagraphs(post.content.es)

    const doc = await payload.create({
      collection: 'posts',
      data: esData as any,
    })

    // Update EN
    const enPostData: Record<string, any> = {
      title: post.title.en,
      excerpt: post.excerpt.en,
    }
    if (post.content) enPostData.content = lexicalParagraphs(post.content.en)
    await payload.update({
      collection: 'posts',
      id: doc.id,
      locale: 'en',
      data: enPostData,
    })

    // Update ZH
    const zhPostData: Record<string, any> = {
      title: post.title.zh,
      excerpt: post.excerpt.zh,
    }
    if (post.content) zhPostData.content = lexicalParagraphs(post.content.zh)
    await payload.update({
      collection: 'posts',
      id: doc.id,
      locale: 'zh',
      data: zhPostData,
    })

    postIdMap[post.slug] = doc.id as number
    console.log(`  Post "${post.slug}" created (id: ${doc.id}).`)
  }

  // Link relatedPosts after all posts are created
  for (const post of postsData) {
    if (!post.relatedSlugs || post.relatedSlugs.length === 0) continue
    const postId = postIdMap[post.slug]
    if (!postId) continue
    const relatedIds = post.relatedSlugs.map((s) => postIdMap[s]).filter(Boolean)
    if (relatedIds.length === 0) continue
    try {
      await payload.update({
        collection: 'posts',
        id: postId,
        data: { relatedPosts: relatedIds },
      })
      console.log(`  Post "${post.slug}" linked to ${relatedIds.length} related posts.`)
    } catch (err) {
      console.warn(`  Warning: Could not link relatedPosts for "${post.slug}".`)
    }
  }

  // ------------------------------------------------------------------
  // Cleanup
  // ------------------------------------------------------------------
  // Remove temp directory
  try {
    fs.rmSync(tmpDir, { recursive: true, force: true })
  } catch {
    // ignore cleanup errors
  }

  console.log('\n=== Seed complete! ===')
  console.log(`  Globals: SiteSettings, HomePage, AboutPage`)
  console.log(`  Destinations: ${Object.keys(destinationIdMap).length}`)
  console.log(`  Tours: ${Object.keys(tourIdMap).length}`)
  console.log(`  Reviews: ${reviewsData.length}`)
  console.log(`  Posts: ${postsData.length}`)
}

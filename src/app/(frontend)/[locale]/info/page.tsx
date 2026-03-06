'use client'

import { useState } from 'react'
import { useLocale } from 'next-intl'
import { SectionLabel } from '@/components/ui/SectionLabel'

type Locale = 'es' | 'en' | 'zh'

const pageText = {
  label: { es: 'INFORMACIÓN', en: 'INFORMATION', zh: '信息' },
  title: { es: 'Información Práctica', en: 'Practical Information', zh: '实用信息' },
  subtitle: {
    es: 'Todo lo que necesitas saber antes de tu viaje a China.',
    en: 'Everything you need to know before your trip to China.',
    zh: '出发前往中国之前您需要了解的一切。',
  },
}

interface AccordionItem {
  question: Record<Locale, string>
  answer: Record<Locale, string[]>
}

interface InfoSection {
  id: string
  icon: string
  title: Record<Locale, string>
  intro: Record<Locale, string>
  items: AccordionItem[]
}

const sections: InfoSection[] = [
  {
    id: 'visa',
    icon: '🛂',
    title: { es: 'Guía de Visado', en: 'Visa Guide', zh: '签证指南' },
    intro: {
      es: 'Información actualizada sobre el proceso de visado para ciudadanos españoles y europeos que viajan a China.',
      en: 'Updated information on the visa process for Spanish and European citizens traveling to China.',
      zh: '为前往中国旅行的西班牙及欧洲公民提供最新签证流程信息。',
    },
    items: [
      {
        question: {
          es: '¿Qué tipo de visado necesito?',
          en: 'What type of visa do I need?',
          zh: '我需要什么类型的签证？',
        },
        answer: {
          es: [
            'Para turismo necesitas un visado tipo L. Es el más común para viajeros europeos y permite una estancia de hasta 30 días con entrada simple o doble.',
            'Si planeas una visita de negocios, necesitarás un visado tipo M. Para estudios, el visado tipo X.',
            'Desde 2024, España está incluida en la política de tránsito sin visado de 144 horas, lo que permite estancias cortas sin necesidad de visado si cumples ciertos requisitos de tránsito.',
          ],
          en: [
            'For tourism, you need an L-type visa. It is the most common for European travelers and allows a stay of up to 30 days with single or double entry.',
            'If you plan a business visit, you will need an M-type visa. For studies, the X-type visa.',
            'Since 2024, Spain is included in the 144-hour transit without visa policy, allowing short stays without a visa if you meet certain transit requirements.',
          ],
          zh: [
            '旅游需要L签证。这是欧洲旅客最常见的签证类型，允许单次或两次入境，停留最多30天。',
            '如果计划商务访问，需要M签证。留学则需要X签证。',
            '自2024年起，西班牙被纳入144小时过境免签政策，符合特定过境条件可短期免签停留。',
          ],
        },
      },
      {
        question: {
          es: '¿Qué documentos necesito para solicitar el visado?',
          en: 'What documents do I need to apply for a visa?',
          zh: '申请签证需要哪些文件？',
        },
        answer: {
          es: [
            'Pasaporte original con validez mínima de 6 meses y al menos 2 páginas en blanco.',
            'Formulario de solicitud de visado completado y firmado (disponible en la web del consulado chino).',
            'Foto reciente tamaño pasaporte (48x33mm) con fondo blanco.',
            'Confirmación de reserva de hotel para todas las noches de estancia.',
            'Billetes de avión de ida y vuelta.',
            'En ChinaWay te ayudamos con toda la documentación y revisamos tu solicitud antes de presentarla.',
          ],
          en: [
            'Original passport valid for at least 6 months with at least 2 blank pages.',
            'Completed and signed visa application form (available on the Chinese consulate website).',
            'Recent passport-size photo (48x33mm) with white background.',
            'Hotel booking confirmation for all nights of stay.',
            'Round-trip flight tickets.',
            'At ChinaWay, we help you with all documentation and review your application before submission.',
          ],
          zh: [
            '有效期至少6个月、至少有2页空白页的护照原件。',
            '填写完整并签名的签证申请表（可在中国领事馆官网获取）。',
            '白底近期护照照片（48x33毫米）。',
            '全部住宿天数的酒店预订确认单。',
            '往返机票。',
            '在ChinaWay，我们帮您准备所有文件，并在提交前审核您的申请。',
          ],
        },
      },
      {
        question: {
          es: '¿Cuánto tiempo tarda el proceso?',
          en: 'How long does the process take?',
          zh: '办理流程需要多长时间？',
        },
        answer: {
          es: [
            'El tiempo de procesamiento estándar es de 4 días laborables desde la entrega de documentación.',
            'Existe un servicio exprés de 2-3 días laborables con un coste adicional de aproximadamente 30-40€.',
            'Recomendamos iniciar el trámite al menos 4-6 semanas antes de la fecha de viaje para evitar prisas y poder solucionar cualquier incidencia.',
          ],
          en: [
            'Standard processing time is 4 business days from document submission.',
            'There is an express service of 2-3 business days at an additional cost of approximately 30-40 euros.',
            'We recommend starting the process at least 4-6 weeks before your travel date to avoid rush and resolve any issues.',
          ],
          zh: [
            '从提交文件起，标准处理时间为4个工作日。',
            '加急服务为2-3个工作日，需额外支付约30-40欧元。',
            '我们建议至少在出行日期前4-6周开始办理，以避免匆忙并解决可能出现的问题。',
          ],
        },
      },
    ],
  },
  {
    id: 'seasons',
    icon: '🌤️',
    title: { es: 'Mejores Épocas para Viajar', en: 'Best Travel Seasons', zh: '最佳旅行季节' },
    intro: {
      es: 'China es un país inmenso con climas muy variados. La mejor época depende del destino y el tipo de experiencia que buscas.',
      en: 'China is a vast country with very varied climates. The best time depends on the destination and the type of experience you seek.',
      zh: '中国幅员辽阔，气候多样。最佳旅行时间取决于目的地和您所期望的体验。',
    },
    items: [
      {
        question: {
          es: 'Primavera (marzo - mayo): la mejor época',
          en: 'Spring (March - May): the best season',
          zh: '春季（三月至五月）：最佳季节',
        },
        answer: {
          es: [
            'La primavera es ideal para la mayoría de destinos en China. Las temperaturas son agradables (15-25°C), la naturaleza florece y hay menos turistas que en verano.',
            'Destinos recomendados: los cerezos en flor de Wuhan, los campos de colza de Yunnan, los jardines de Suzhou y las terrazas de arroz de Guilin cuando empiezan a llenarse de agua.',
            'Consejo: evita la primera semana de mayo (festivo del Día del Trabajador) ya que los destinos se llenan de turistas nacionales.',
          ],
          en: [
            'Spring is ideal for most destinations in China. Temperatures are pleasant (15-25°C), nature blooms, and there are fewer tourists than in summer.',
            'Recommended destinations: cherry blossoms in Wuhan, rapeseed fields in Yunnan, gardens of Suzhou, and Guilin\'s rice terraces when they start filling with water.',
            'Tip: avoid the first week of May (Labor Day holiday) as destinations fill up with domestic tourists.',
          ],
          zh: [
            '春季是中国大多数目的地的理想季节。气温宜人（15-25°C），自然万物复苏，游客比夏季少。',
            '推荐目的地：武汉的樱花、云南的油菜花田、苏州的园林，以及桂林稻田开始注水时的梯田美景。',
            '小贴士：避开五月第一周（劳动节假期），因为景点会挤满国内游客。',
          ],
        },
      },
      {
        question: {
          es: 'Otoño (septiembre - noviembre): la otra gran temporada',
          en: 'Autumn (September - November): the other great season',
          zh: '秋季（九月至十一月）：另一个绝佳季节',
        },
        answer: {
          es: [
            'El otoño es tan bueno como la primavera para viajar a China. El clima es seco y templado, los cielos suelen estar despejados y los paisajes se tiñen de colores otoñales espectaculares.',
            'Destinos recomendados: la Gran Muralla con follaje otoñal, los arces rojos de Jiuzhaigou, la cosecha de arroz en Yunnan y las montañas de Huangshan entre nubes.',
            'Consejo: evita la Semana Dorada (1-7 de octubre), la fiesta nacional china, cuando millones de personas viajan internamente.',
          ],
          en: [
            'Autumn is as good as spring for traveling to China. The weather is dry and temperate, skies are usually clear, and landscapes are painted with spectacular fall colors.',
            'Recommended destinations: the Great Wall with autumn foliage, the red maples of Jiuzhaigou, the rice harvest in Yunnan, and Huangshan mountains among clouds.',
            'Tip: avoid Golden Week (October 1-7), the Chinese national holiday, when millions of people travel domestically.',
          ],
          zh: [
            '秋季和春季一样是去中国旅行的好时节。天气干燥温和，天空通常晴朗，景色被壮观的秋色点缀。',
            '推荐目的地：秋叶中的长城、九寨沟的红枫、云南的稻谷丰收，以及云雾缭绕的黄山。',
            '小贴士：避开十一黄金周（10月1-7日），这是中国国庆假期，数以百万计的人在国内旅行。',
          ],
        },
      },
      {
        question: {
          es: 'Verano e invierno: ¿vale la pena viajar?',
          en: 'Summer and winter: is it worth traveling?',
          zh: '夏季和冬季：值得去旅行吗？',
        },
        answer: {
          es: [
            'Verano (junio-agosto): caluroso y húmedo en la mayoría del país. Sin embargo, es la mejor época para visitar Tíbet, las praderas de Mongolia Interior y las zonas montañosas del norte. Los precios de vuelos y hoteles suben considerablemente.',
            'Invierno (diciembre-febrero): frío en el norte pero ideal para destinos del sur como Yunnan, Hainan o Hong Kong. El Festival de Hielo de Harbin (enero) es espectacular. Menos turistas y precios más bajos, excepto durante el Año Nuevo Chino (enero/febrero).',
            'Año Nuevo Chino: es la fiesta más importante del país. El transporte se satura, muchos comercios cierran, pero la atmósfera festiva es única e inolvidable si te pillan en China.',
          ],
          en: [
            'Summer (June-August): hot and humid in most of the country. However, it is the best time to visit Tibet, Inner Mongolia\'s grasslands, and the mountainous areas of the north. Flight and hotel prices rise considerably.',
            'Winter (December-February): cold in the north but ideal for southern destinations like Yunnan, Hainan, or Hong Kong. The Harbin Ice Festival (January) is spectacular. Fewer tourists and lower prices, except during Chinese New Year (January/February).',
            'Chinese New Year: it is the most important holiday in the country. Transportation gets saturated, many shops close, but the festive atmosphere is unique and unforgettable if you happen to be in China.',
          ],
          zh: [
            '夏季（六月至八月）：全国大部分地区炎热潮湿。但这是去西藏、内蒙古草原和北方山区的最佳时节。机票和酒店价格会大幅上涨。',
            '冬季（十二月至二月）：北方寒冷，但南方目的地如云南、海南或香港非常理想。哈尔滨冰雪节（一月）壮观无比。游客较少、价格较低，春节期间（一/二月）除外。',
            '春节：这是中国最重要的节日。交通极为拥挤，许多商店关门，但如果您恰好在中国，节日氛围独特而难忘。',
          ],
        },
      },
    ],
  },
  {
    id: 'safety',
    icon: '🛡️',
    title: { es: 'Consejos de Seguridad', en: 'Safety Tips', zh: '安全提示' },
    intro: {
      es: 'China es generalmente un país muy seguro para los turistas. Aun así, hay precauciones básicas que conviene tener en cuenta.',
      en: 'China is generally a very safe country for tourists. Even so, there are basic precautions worth keeping in mind.',
      zh: '中国总体上对游客来说是一个非常安全的国家。尽管如此，仍有一些基本注意事项值得了解。',
    },
    items: [
      {
        question: {
          es: 'Seguridad general',
          en: 'General safety',
          zh: '总体安全',
        },
        answer: {
          es: [
            'China tiene una de las tasas de criminalidad más bajas del mundo. Los delitos violentos contra turistas son extremadamente raros.',
            'Los carteristas pueden operar en zonas turísticas muy concurridas y en el transporte público. Mantén tus objetos de valor en bolsillos internos o riñoneras.',
            'Las estafas más comunes incluyen el "tea scam" (invitación a tomar té que acaba en una cuenta exorbitante) y taxistas que no usan el taxímetro. Usa siempre apps como DiDi para el transporte.',
            'Registra tu alojamiento en la policía local dentro de las 24 horas de tu llegada. La mayoría de hoteles lo hacen automáticamente, pero en alojamientos privados debes hacerlo tú.',
          ],
          en: [
            'China has one of the lowest crime rates in the world. Violent crimes against tourists are extremely rare.',
            'Pickpockets may operate in very crowded tourist areas and on public transportation. Keep your valuables in internal pockets or money belts.',
            'The most common scams include the "tea scam" (invitation to drink tea that ends in an exorbitant bill) and taxi drivers who don\'t use the meter. Always use apps like DiDi for transportation.',
            'Register your accommodation at the local police station within 24 hours of arrival. Most hotels do this automatically, but in private accommodation, you must do it yourself.',
          ],
          zh: [
            '中国是世界上犯罪率最低的国家之一。针对游客的暴力犯罪极为罕见。',
            '在非常拥挤的旅游区和公共交通上可能有扒手。将贵重物品放在内袋或腰包里。',
            '最常见的骗局包括"茶艺骗局"（被邀请喝茶后收到天价账单）和出租车不打表。建议使用滴滴等打车软件。',
            '到达后24小时内需在当地派出所登记住宿。大多数酒店会自动办理，但如果住在私人住所，需要自行登记。',
          ],
        },
      },
      {
        question: {
          es: 'Salud y atención médica',
          en: 'Health and medical care',
          zh: '健康与医疗',
        },
        answer: {
          es: [
            'No se requieren vacunas obligatorias para viajar a China desde España, pero se recomiendan las vacunas de hepatitis A y B, y tifoidea.',
            'El agua del grifo NO es potable. Bebe siempre agua embotellada, que está disponible en todas partes a precios muy económicos.',
            'Lleva un botiquín básico con medicamentos para el estómago, antidiarreicos, protector solar y repelente de mosquitos (especialmente si visitas zonas rurales en verano).',
            'Los hospitales internacionales en las grandes ciudades (Pekín, Shanghái, Guangzhou) ofrecen atención médica de alto nivel con personal que habla inglés. Contrata un seguro de viaje con cobertura médica antes de salir.',
          ],
          en: [
            'No mandatory vaccinations are required for traveling to China from Spain, but hepatitis A and B, and typhoid vaccines are recommended.',
            'Tap water is NOT drinkable. Always drink bottled water, which is available everywhere at very affordable prices.',
            'Bring a basic first-aid kit with stomach medications, anti-diarrheal medicine, sunscreen, and mosquito repellent (especially if visiting rural areas in summer).',
            'International hospitals in major cities (Beijing, Shanghai, Guangzhou) offer high-level medical care with English-speaking staff. Take out travel insurance with medical coverage before departure.',
          ],
          zh: [
            '从西班牙前往中国不需要强制接种疫苗，但建议接种甲肝、乙肝和伤寒疫苗。',
            '自来水不可直接饮用。请始终饮用瓶装水，到处都可以买到，价格非常便宜。',
            '携带基本药箱，包括胃药、止泻药、防晒霜和驱蚊液（尤其是夏季去农村地区时）。',
            '大城市（北京、上海、广州）的国际医院提供高水平的医疗服务，配有英语服务人员。出发前请购买含医疗保障的旅行保险。',
          ],
        },
      },
      {
        question: {
          es: 'Números de emergencia y apps útiles',
          en: 'Emergency numbers and useful apps',
          zh: '紧急电话和实用应用',
        },
        answer: {
          es: [
            'Emergencias generales: 110 (policía), 120 (ambulancia), 119 (bomberos).',
            'Consulado de España en Pekín: +86 10 6532 3629. Consulado en Shanghái: +86 21 6321 3543.',
            'Apps imprescindibles: WeChat (comunicación y pagos), Alipay (pagos móviles), DiDi (transporte), Baidu Maps (navegación), Pleco (diccionario chino-español).',
            'Importante: Google, WhatsApp, Instagram y muchas webs occidentales están bloqueadas en China. Descarga una VPN fiable antes de tu viaje si necesitas acceder a estos servicios.',
          ],
          en: [
            'General emergencies: 110 (police), 120 (ambulance), 119 (fire department).',
            'Spanish Consulate in Beijing: +86 10 6532 3629. Consulate in Shanghai: +86 21 6321 3543.',
            'Essential apps: WeChat (communication and payments), Alipay (mobile payments), DiDi (transportation), Baidu Maps (navigation), Pleco (Chinese-English dictionary).',
            'Important: Google, WhatsApp, Instagram, and many Western websites are blocked in China. Download a reliable VPN before your trip if you need to access these services.',
          ],
          zh: [
            '紧急电话：110（警察）、120（急救）、119（消防）。',
            '西班牙驻北京大使馆：+86 10 6532 3629。驻上海领事馆：+86 21 6321 3543。',
            '必备应用：微信（通讯和支付）、支付宝（移动支付）、滴滴（出行）、百度地图（导航）、Pleco（中西词典）。',
            '重要提示：Google、WhatsApp、Instagram等许多西方网站在中国被屏蔽。如需使用这些服务，请在出发前下载可靠的VPN。',
          ],
        },
      },
    ],
  },
  {
    id: 'faq',
    icon: '❓',
    title: { es: 'Preguntas Frecuentes', en: 'FAQ', zh: '常见问题' },
    intro: {
      es: 'Respuestas a las preguntas más comunes de nuestros viajeros.',
      en: 'Answers to the most common questions from our travelers.',
      zh: '为旅客解答最常见的问题。',
    },
    items: [
      {
        question: {
          es: '¿Es seguro viajar a China siendo europeo?',
          en: 'Is it safe to travel to China as a European?',
          zh: '欧洲人去中国旅行安全吗？',
        },
        answer: {
          es: ['Absolutamente. China es uno de los países más seguros del mundo para turistas. La tasa de criminalidad es muy baja, y los extranjeros son tratados con curiosidad y amabilidad. Las ciudades principales cuentan con excelentes infraestructuras y servicios de emergencia. Solo hay que tomar las precauciones normales que tomarías en cualquier destino internacional.'],
          en: ['Absolutely. China is one of the safest countries in the world for tourists. The crime rate is very low, and foreigners are treated with curiosity and kindness. Major cities have excellent infrastructure and emergency services. You just need to take the normal precautions you would take at any international destination.'],
          zh: ['完全安全。中国是世界上对游客最安全的国家之一。犯罪率非常低，外国人会受到友好和好奇的对待。主要城市拥有优质的基础设施和应急服务。只需采取在任何国际目的地都会采取的常规预防措施即可。'],
        },
      },
      {
        question: {
          es: '¿Necesito hablar chino para viajar a China?',
          en: 'Do I need to speak Chinese to travel to China?',
          zh: '去中国旅行需要会说中文吗？',
        },
        answer: {
          es: ['No es necesario, especialmente si viajas con ChinaWay. Todos nuestros itinerarios incluyen guías que hablan español. En las grandes ciudades hay señalización en inglés en el metro y las principales atracciones. La app de traducción de WeChat y Google Translate (con VPN) son muy útiles para situaciones cotidianas.'],
          en: ['It is not necessary, especially if you travel with ChinaWay. All our itineraries include Spanish-speaking guides. In major cities, there is English signage in the metro and main attractions. WeChat\'s translation feature and Google Translate (with VPN) are very useful for everyday situations.'],
          zh: ['不需要，特别是如果您选择ChinaWay旅行。我们所有行程都配有西班牙语导游。大城市的地铁和主要景点都有英文标识。微信翻译功能和谷歌翻译（需VPN）在日常场景中非常实用。'],
        },
      },
      {
        question: {
          es: '¿Cómo funcionan los pagos en China?',
          en: 'How do payments work in China?',
          zh: '在中国如何支付？',
        },
        answer: {
          es: ['China es prácticamente una sociedad sin efectivo. WeChat Pay y Alipay son los métodos de pago dominantes. Como turista extranjero, puedes vincular tu tarjeta de crédito internacional a Alipay. Aun así, lleva algo de efectivo (yuanes/RMB) para mercados pequeños y zonas rurales. Los cajeros automáticos de los grandes bancos aceptan tarjetas internacionales.'],
          en: ['China is practically a cashless society. WeChat Pay and Alipay are the dominant payment methods. As a foreign tourist, you can link your international credit card to Alipay. Still, carry some cash (yuan/RMB) for small markets and rural areas. ATMs at major banks accept international cards.'],
          zh: ['中国几乎已是无现金社会。微信支付和支付宝是主流支付方式。作为外国游客，可以将国际信用卡绑定到支付宝。不过建议携带一些现金（人民币），以便在小型市场和农村地区使用。大型银行的ATM接受国际银行卡。'],
        },
      },
      {
        question: {
          es: '¿Qué incluye el depósito de 100€?',
          en: 'What does the 100 euro deposit include?',
          zh: '100欧元定金包含什么？',
        },
        answer: {
          es: ['El depósito de 100€ reserva tu plaza en una salida programada. Este importe se descuenta del precio total del viaje. Una vez confirmado tu depósito, nos ponemos en contacto contigo para organizar todos los detalles del viaje. El resto del pago se realiza antes de la fecha de salida según las condiciones indicadas en cada itinerario.'],
          en: ['The 100 euro deposit reserves your spot on a scheduled departure. This amount is deducted from the total trip price. Once your deposit is confirmed, we contact you to organize all trip details. The remaining payment is made before the departure date according to the conditions indicated in each itinerary.'],
          zh: ['100欧元定金用于预留您在计划出发团的名额。该金额将从旅行总价中扣除。定金确认后，我们会联系您安排所有旅行细节。余款需在出发日期前按各行程中注明的条件支付。'],
        },
      },
      {
        question: {
          es: '¿Puedo personalizar un itinerario?',
          en: 'Can I customize an itinerary?',
          zh: '我可以定制行程吗？',
        },
        answer: {
          es: ['Por supuesto. Además de nuestros viajes programados, ofrecemos un servicio de viaje a medida. Puedes elegir las provincias que quieres visitar a través de nuestro mapa interactivo, indicar tus preferencias y presupuesto, y nuestro equipo diseñará un itinerario personalizado sin compromiso. Es completamente gratuito solicitar un presupuesto.'],
          en: ['Of course. In addition to our scheduled trips, we offer a custom travel service. You can choose the provinces you want to visit through our interactive map, indicate your preferences and budget, and our team will design a personalized itinerary with no obligation. Requesting a quote is completely free.'],
          zh: ['当然可以。除了预定行程外，我们还提供定制旅行服务。您可以通过互动地图选择想要游览的省份，说明您的偏好和预算，我们的团队将为您设计个性化行程，无需承担任何义务。索取报价完全免费。'],
        },
      },
      {
        question: {
          es: '¿Qué pasa con Internet y las redes sociales en China?',
          en: 'What about Internet and social media in China?',
          zh: '在中国上网和使用社交媒体怎么办？',
        },
        answer: {
          es: ['Servicios como Google, WhatsApp, Facebook, Instagram y Twitter están bloqueados en China continental. Recomendamos descargar una VPN fiable antes de salir (ExpressVPN, NordVPN o Astrill son buenas opciones). Alternativamente, WeChat funciona perfectamente en China y permite mensajería, llamadas y pagos. El WiFi está disponible en prácticamente todos los hoteles y restaurantes.'],
          en: ['Services like Google, WhatsApp, Facebook, Instagram, and Twitter are blocked in mainland China. We recommend downloading a reliable VPN before departure (ExpressVPN, NordVPN, or Astrill are good options). Alternatively, WeChat works perfectly in China and allows messaging, calls, and payments. WiFi is available in virtually all hotels and restaurants.'],
          zh: ['Google、WhatsApp、Facebook、Instagram和Twitter等服务在中国大陆被屏蔽。建议出发前下载可靠的VPN（ExpressVPN、NordVPN或Astrill是不错的选择）。此外，微信在中国运行顺畅，可用于通讯、通话和支付。几乎所有酒店和餐厅都提供WiFi。'],
        },
      },
      {
        question: {
          es: '¿Cuál es la diferencia horaria con España?',
          en: 'What is the time difference with Spain?',
          zh: '与西班牙的时差是多少？',
        },
        answer: {
          es: ['China tiene una sola zona horaria (UTC+8) para todo el país. La diferencia con España es de +7 horas en invierno y +6 horas en verano (por el cambio horario europeo). Por ejemplo, cuando en Madrid son las 12:00 del mediodía, en Pekín son las 19:00 (invierno) o las 18:00 (verano).'],
          en: ['China has a single time zone (UTC+8) for the entire country. The difference with Spain is +7 hours in winter and +6 hours in summer (due to European daylight saving time). For example, when it is 12:00 noon in Madrid, it is 19:00 (winter) or 18:00 (summer) in Beijing.'],
          zh: ['中国全国统一使用一个时区（UTC+8）。与西班牙的时差冬季为+7小时，夏季为+6小时（因欧洲夏令时调整）。例如，马德里中午12:00时，北京为冬季19:00或夏季18:00。'],
        },
      },
      {
        question: {
          es: '¿Necesito un seguro de viaje?',
          en: 'Do I need travel insurance?',
          zh: '需要旅行保险吗？',
        },
        answer: {
          es: ['Sí, recomendamos encarecidamente contratar un seguro de viaje con cobertura médica, cancelación y repatriación. Aunque no es obligatorio para entrar en China, la sanidad no es gratuita para extranjeros y una consulta hospitalaria puede ser costosa. Empresas como Chapka, IATI o Mondo ofrecen pólizas específicas para viajes a Asia desde unos 40€ por persona.'],
          en: ['Yes, we strongly recommend taking out travel insurance with medical, cancellation, and repatriation coverage. Although it is not mandatory to enter China, healthcare is not free for foreigners and a hospital visit can be expensive. Companies like Chapka, IATI, or Mondo offer specific policies for trips to Asia from around 40 euros per person.'],
          zh: ['是的，我们强烈建议购买包含医疗、取消和遣返保障的旅行保险。虽然入境中国不强制要求，但外国人在中国就医不免费，住院费用可能很高。Chapka、IATI或Mondo等公司提供专门的亚洲旅行保险，每人约40欧元起。'],
        },
      },
    ],
  },
]

function AccordionSection({ item, locale }: { item: AccordionItem; locale: Locale }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-[#e8e8e8] last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 px-1 text-left group"
      >
        <span className="font-playfair text-base font-bold pr-4 group-hover:text-red transition-colors">
          {item.question[locale]}
        </span>
        <span
          className={`flex-shrink-0 w-6 h-6 flex items-center justify-center border border-[#ddd] rounded-full text-sm transition-all duration-300 ${
            open ? 'rotate-45 bg-red border-red text-white' : 'text-gray'
          }`}
        >
          +
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? 'max-h-[1000px] opacity-100 pb-5' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-1 space-y-3">
          {item.answer[locale].map((para, i) => (
            <p key={i} className="font-dm text-sm text-black/70 leading-[1.8]">
              {para}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function InfoPage() {
  const locale = useLocale() as Locale

  return (
    <>
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden flex items-end">
        <img
          src="https://picsum.photos/id/1044/1800/900"
          alt="Practical information"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        <div className="relative w-full max-w-[1200px] mx-auto px-[6%] pb-12">
          <SectionLabel>{pageText.label[locale]}</SectionLabel>
          <h1 className="font-playfair text-[clamp(36px,5vw,64px)] font-bold text-white leading-tight">
            {pageText.title[locale]}
          </h1>
          <p className="font-dm text-base text-white/70 mt-3 max-w-[520px]">
            {pageText.subtitle[locale]}
          </p>
        </div>
      </section>

      {/* Sections */}
      <div className="py-16 px-[6%]">
        <div className="max-w-[900px] mx-auto space-y-16">
          {sections.map((section) => (
            <section key={section.id}>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{section.icon}</span>
                <SectionLabel>{section.title[locale].toUpperCase()}</SectionLabel>
              </div>
              <h2 className="font-playfair text-[clamp(24px,3vw,36px)] font-bold mb-3">
                {section.title[locale]}
              </h2>
              <p className="font-dm text-sm text-gray leading-relaxed mb-8">
                {section.intro[locale]}
              </p>
              <div className="bg-white border border-[#eee] rounded-sm px-6">
                {section.items.map((item, i) => (
                  <AccordionSection key={i} item={item} locale={locale} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  )
}

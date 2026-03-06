import { use } from 'react'
import { useLocale } from 'next-intl'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Link } from '@/i18n/navigation'

const posts: Record<string, {
  img: string
  category: { es: string; en: string; zh: string }
  title: { es: string; en: string; zh: string }
  date: string
  author: string
  content: { es: string[]; en: string[]; zh: string[] }
  related: string[]
}> = {
  'visa-guide-spanish-citizens': {
    img: 'https://picsum.photos/id/1015/1600/700',
    category: { es: 'Consejos de Viaje', en: 'Travel Tips', zh: '旅行贴士' },
    title: {
      es: 'Guía completa de visado para ciudadanos españoles',
      en: 'Complete visa guide for Spanish citizens',
      zh: '西班牙公民签证完整指南',
    },
    date: '2026-02-20',
    author: 'ChinaWay Team',
    content: {
      es: [
        'Viajar a China desde España requiere obtener un visado antes de tu viaje. El proceso puede parecer complicado al principio, pero con la información correcta y una buena planificación, es completamente manejable. En esta guía te explicamos paso a paso todo lo que necesitas saber.',
        'El tipo de visado más común para turistas es el visado L (turismo). Para solicitarlo, necesitarás: un pasaporte válido con al menos 6 meses de vigencia y dos páginas en blanco, el formulario de solicitud completado, una foto reciente tamaño pasaporte, la confirmación de reserva de hotel y los billetes de avión de ida y vuelta.',
        'El tiempo de procesamiento estándar es de 4 días laborables, aunque existe un servicio exprés de 2 días con un coste adicional. Recomendamos iniciar el proceso al menos 1 mes antes de tu fecha de viaje.',
        'En ChinaWay te ofrecemos asistencia completa con el visado. Nos encargamos de revisar tu documentación, te ayudamos a completar el formulario y te acompañamos en cada paso del proceso. Nuestro equipo en Madrid conoce perfectamente los requisitos actualizados.',
        'Un dato importante: desde 2024, China ha ampliado su política de tránsito sin visado a 144 horas para ciudadanos de muchos países europeos, incluida España. Si tu viaje es corto y cumples ciertos requisitos, podrías no necesitar visado.',
      ],
      en: [
        'Traveling to China from Spain requires obtaining a visa before your trip. The process may seem complicated at first, but with the right information and good planning, it is completely manageable. In this guide, we explain step by step everything you need to know.',
        'The most common visa type for tourists is the L visa (tourism). To apply, you will need: a valid passport with at least 6 months of validity and two blank pages, a completed application form, a recent passport-size photo, hotel booking confirmation, and round-trip flight tickets.',
        'Standard processing time is 4 business days, although there is an express service of 2 days at an additional cost. We recommend starting the process at least 1 month before your travel date.',
        'At ChinaWay, we offer complete visa assistance. We take care of reviewing your documentation, help you complete the form, and accompany you every step of the way. Our team in Madrid is perfectly familiar with the updated requirements.',
        'An important note: since 2024, China has expanded its transit without visa policy to 144 hours for citizens of many European countries, including Spain. If your trip is short and you meet certain requirements, you might not need a visa at all.',
      ],
      zh: [
        '从西班牙前往中国旅行需要在出发前获得签证。虽然这个过程一开始看起来可能很复杂，但只要有正确的信息和良好的规划，完全可以顺利办理。在本指南中，我们将逐步为您介绍所有需要了解的信息。',
        '游客最常见的签证类型是L签证（旅游签证）。申请时您需要：有效期至少6个月且有两页空白页的护照、填写完整的申请表、近期护照照片、酒店预订确认单和往返机票。',
        '标准处理时间为4个工作日，也有2天的加急服务，需额外付费。我们建议至少在出行日期前1个月开始办理。',
        '在ChinaWay，我们提供完整的签证协助服务。我们负责审核您的文件，帮您填写表格，并在整个过程中为您提供指导。我们在马德里的团队非常熟悉最新的签证要求。',
        '重要提示：自2024年起，中国已将免签过境政策扩大至144小时，适用于包括西班牙在内的多个欧洲国家公民。如果您的行程较短且符合特定条件，可能无需申请签证。',
      ],
    },
    related: ['hidden-gems-yunnan', 'traveling-china-with-kids'],
  },
  'hidden-gems-yunnan': {
    img: 'https://picsum.photos/id/1039/1600/700',
    category: { es: 'Destinos', en: 'Destinations', zh: '目的地' },
    title: {
      es: 'Joyas ocultas de Yunnan que no puedes perderte',
      en: 'Hidden gems of Yunnan you cannot miss',
      zh: '云南不可错过的隐秘宝藏',
    },
    date: '2026-02-10',
    author: 'ChinaWay Team',
    content: {
      es: [
        'Yunnan es una de las provincias más diversas y fascinantes de China. Mientras que Lijiang y Dali atraen a millones de visitantes cada año, hay rincones menos conocidos que ofrecen experiencias aún más auténticas y memorables.',
        'Shaxi es un pequeño pueblo que fue una parada importante en la antigua Ruta del Té y los Caballos. Con su plaza central perfectamente restaurada, su mercado semanal y sus alrededores de montañas y arrozales, Shaxi ofrece una ventana al pasado que pocos turistas llegan a ver.',
        'Las terrazas de arroz de Yuanyang son otro tesoro escondido. Esculpidas en las laderas de las montañas por el pueblo Hani durante siglos, estas terrazas crean un espectáculo visual impresionante, especialmente al amanecer cuando el agua refleja los colores del cielo.',
        'Para los amantes de la naturaleza, el Parque Nacional de Pudacuo en Shangri-La ofrece senderos a través de bosques vírgenes, lagos de aguas cristalinas y praderas alpinas donde pastan los yaks. Es uno de los primeros parques nacionales de China y mantiene un equilibrio perfecto entre conservación y turismo.',
        'En ChinaWay diseñamos rutas por Yunnan que incluyen tanto los destinos imprescindibles como estas joyas ocultas, siempre con guías locales que conocen los mejores rincones y momentos para visitarlos.',
      ],
      en: [
        'Yunnan is one of the most diverse and fascinating provinces in China. While Lijiang and Dali attract millions of visitors each year, there are lesser-known corners that offer even more authentic and memorable experiences.',
        'Shaxi is a small town that was an important stop on the ancient Tea Horse Road. With its perfectly restored central square, weekly market, and surroundings of mountains and rice paddies, Shaxi offers a window into the past that few tourists get to see.',
        'The Yuanyang rice terraces are another hidden treasure. Carved into the mountain slopes by the Hani people over centuries, these terraces create an impressive visual spectacle, especially at sunrise when the water reflects the colors of the sky.',
        'For nature lovers, Pudacuo National Park in Shangri-La offers trails through pristine forests, crystal-clear lakes, and alpine meadows where yaks graze. It is one of China\'s first national parks and maintains a perfect balance between conservation and tourism.',
        'At ChinaWay, we design Yunnan routes that include both must-see destinations and these hidden gems, always with local guides who know the best spots and times to visit them.',
      ],
      zh: [
        '云南是中国最多元、最迷人的省份之一。虽然丽江和大理每年吸引着数百万游客，但还有一些鲜为人知的角落，能带来更加真实难忘的体验。',
        '沙溪是茶马古道上的一个重要驿站。这个小镇拥有修缮完好的中心广场、每周一次的集市，四周环绕着群山和稻田，为游客打开了一扇通往过去的窗户。',
        '元阳梯田是另一处隐秘的瑰宝。哈尼族人历经数百年在山坡上雕刻出这些梯田，形成了令人叹为观止的视觉奇观，尤其是日出时分，水面倒映天空的色彩，美不胜收。',
        '对于自然爱好者来说，香格里拉的普达措国家公园提供了穿越原始森林、清澈湖泊和牦牛悠然吃草的高山草甸的徒步路线。它是中国最早的国家公园之一，在保护与旅游之间保持着完美的平衡。',
        '在ChinaWay，我们设计的云南路线既包括必游景点，也包含这些隐秘宝藏，并始终配备熟知最佳景点和最佳游览时间的当地导游。',
      ],
    },
    related: ['chinese-tea-culture', 'great-wall-sections'],
  },
  'chinese-tea-culture': {
    img: 'https://picsum.photos/id/1060/1600/700',
    category: { es: 'Cultura', en: 'Culture', zh: '文化' },
    title: {
      es: 'La cultura del té en China: una tradición milenaria',
      en: 'Tea culture in China: a millenary tradition',
      zh: '中国茶文化：千年传承',
    },
    date: '2026-01-28',
    author: 'ChinaWay Team',
    content: {
      es: [
        'El té no es solo una bebida en China: es una filosofía, un arte y una forma de vida que se remonta más de 4.000 años. Desde las plantaciones de Fujian hasta las casas de té de Chengdu, la cultura del té impregna cada aspecto de la sociedad china.',
        'Existen seis tipos principales de té chino: verde, blanco, amarillo, oolong, negro (llamado "rojo" en China) y pu-erh (fermentado). Cada uno tiene sus propias técnicas de preparación, temperatura ideal del agua y tiempos de infusión.',
        'La ceremonia del té, conocida como "gongfu cha", es mucho más que servir una taza de té. Es un ritual meditativo que involucra la selección cuidadosa del té, el calentamiento de los utensilios, múltiples infusiones cortas y la apreciación del aroma, color y sabor.',
        'Algunos de los mejores lugares para experimentar la cultura del té durante tu viaje incluyen: las casas de té tradicionales de Chengdu, las plantaciones de Longjing en Hangzhou, los mercados de té de Kunming y la histórica calle del té en Fuzhou.',
        'En nuestros itinerarios siempre incluimos al menos una experiencia de té auténtica, donde podrás aprender de maestros del té locales y descubrir por qué esta tradición milenaria sigue tan viva como siempre.',
      ],
      en: [
        'Tea is not just a beverage in China: it is a philosophy, an art, and a way of life that dates back more than 4,000 years. From the plantations of Fujian to the teahouses of Chengdu, tea culture permeates every aspect of Chinese society.',
        'There are six main types of Chinese tea: green, white, yellow, oolong, black (called "red" in China), and pu-erh (fermented). Each has its own preparation techniques, ideal water temperature, and steeping times.',
        'The tea ceremony, known as "gongfu cha," is much more than serving a cup of tea. It is a meditative ritual involving the careful selection of tea, warming of utensils, multiple short infusions, and the appreciation of aroma, color, and flavor.',
        'Some of the best places to experience tea culture during your trip include: the traditional teahouses of Chengdu, the Longjing plantations in Hangzhou, the tea markets of Kunming, and the historic tea street in Fuzhou.',
        'In our itineraries, we always include at least one authentic tea experience, where you can learn from local tea masters and discover why this millenary tradition remains as alive as ever.',
      ],
      zh: [
        '在中国，茶不仅仅是一种饮品：它是一种哲学、一门艺术、一种延续了四千多年的生活方式。从福建的茶园到成都的茶馆，茶文化渗透在中国社会的方方面面。',
        '中国茶主要分为六大类：绿茶、白茶、黄茶、乌龙茶、红茶和普洱茶（发酵茶）。每种茶都有独特的制作工艺、理想的水温和冲泡时间。',
        '茶道，即"功夫茶"，远不只是泡一杯茶那么简单。它是一种冥想式的仪式，包括精心选茶、温壶烫杯、多次短时冲泡，以及对茶的香气、色泽和味道的细细品味。',
        '旅途中体验茶文化的最佳去处包括：成都的传统茶馆、杭州的龙井茶园、昆明的茶叶市场，以及福州历史悠久的茶街。',
        '在我们的行程中，我们总会安排至少一次正宗的茶道体验，您可以向当地茶艺师学习，感受这一千年传统为何至今依然充满生机。',
      ],
    },
    related: ['best-street-food-beijing', 'hidden-gems-yunnan'],
  },
  'best-street-food-beijing': {
    img: 'https://picsum.photos/id/1080/1600/700',
    category: { es: 'Gastronomía', en: 'Food', zh: '美食' },
    title: {
      es: 'La mejor comida callejera de Pekín',
      en: 'The best street food in Beijing',
      zh: '北京最佳街头美食',
    },
    date: '2026-01-15',
    author: 'ChinaWay Team',
    content: {
      es: [
        'Pekín es un paraíso para los amantes de la comida callejera. Desde los hutongs históricos hasta los mercados nocturnos modernos, la capital china ofrece una variedad gastronómica que satisface todos los paladares.',
        'El jianbing es el desayuno favorito de los pekineses: una crepe crujiente hecha en el momento con huevo, salsa de soja, cilantro y una lámina de wonton frito. Lo encontrarás en casi cada esquina por la mañana, y cuesta menos de un euro.',
        'Los baozi (bollos al vapor rellenos) son otra delicia imprescindible. Ya sean de cerdo, verduras o pasta de judía roja dulce, estos bollos esponjosos son perfectos para cualquier momento del día. Qingfeng Baozi, la cadena donde Xi Jinping fue fotografiado comiendo, es una parada clásica.',
        'Para los más aventureros, el mercado nocturno de Wangfujing ofrece brochetas de escorpión, estrella de mar y otros bocados exóticos. Aunque es más una atracción turística, la experiencia merece la pena al menos una vez.',
        'En nuestros tours por Pekín, siempre incluimos un recorrido gastronómico por los hutongs con un guía local que te lleva a los puestos que los propios pekineses frecuentan, lejos de las trampas turísticas.',
      ],
      en: [
        'Beijing is a paradise for street food lovers. From historic hutongs to modern night markets, the Chinese capital offers a gastronomic variety that satisfies every palate.',
        'Jianbing is the favorite breakfast of Beijingers: a crispy crepe made on the spot with egg, soy sauce, cilantro, and a sheet of fried wonton. You will find it on almost every corner in the morning, and it costs less than one euro.',
        'Baozi (steamed stuffed buns) are another must-try delicacy. Whether filled with pork, vegetables, or sweet red bean paste, these fluffy buns are perfect for any time of day. Qingfeng Baozi, the chain where Xi Jinping was photographed eating, is a classic stop.',
        'For the more adventurous, the Wangfujing night market offers scorpion skewers, starfish, and other exotic bites. Although it is more of a tourist attraction, the experience is worth it at least once.',
        'In our Beijing tours, we always include a gastronomic tour through the hutongs with a local guide who takes you to the stalls that Beijingers themselves frequent, far from tourist traps.',
      ],
      zh: [
        '北京是街头美食爱好者的天堂。从历史悠久的胡同到现代夜市，中国首都提供了满足各种味蕾的丰富美食。',
        '煎饼是北京人最爱的早餐：现做的脆薄饼，加上鸡蛋、酱油、香菜和一片炸馄饨皮。早晨几乎在每个街角都能找到，价格不到一欧元。',
        '包子是另一种必尝的美食。无论是猪肉馅、蔬菜馅还是甜豆沙馅，这些松软的包子适合一天中的任何时候享用。庆丰包子铺——习近平曾被拍到在此用餐——是经典的打卡地。',
        '对于更具冒险精神的人来说，王府井夜市提供蝎子串、海星和其他奇特小吃。虽然这更像是一个旅游景点，但至少值得体验一次。',
        '在我们的北京之旅中，我们总会安排一次由当地导游带领的胡同美食之旅，带您去北京人真正常去的小摊，远离旅游陷阱。',
      ],
    },
    related: ['chinese-tea-culture', 'visa-guide-spanish-citizens'],
  },
  'great-wall-sections': {
    img: 'https://picsum.photos/id/1047/1600/700',
    category: { es: 'Destinos', en: 'Destinations', zh: '目的地' },
    title: {
      es: 'Los mejores tramos de la Gran Muralla para visitar',
      en: 'The best Great Wall sections to visit',
      zh: '长城最值得游览的段落',
    },
    date: '2026-01-05',
    author: 'ChinaWay Team',
    content: {
      es: [
        'La Gran Muralla China se extiende más de 21.000 kilómetros y tiene más de 2.000 años de historia. No es una estructura única, sino una red de muros, torres y fortalezas construidas por diferentes dinastías. Elegir el tramo adecuado puede marcar la diferencia en tu experiencia.',
        'Badaling es el tramo más visitado y está completamente restaurado. Es la opción más accesible desde Pekín (a solo 70 km) y cuenta con buenas infraestructuras, pero puede estar muy concurrido, especialmente en temporada alta.',
        'Mutianyu es nuestra recomendación para la mayoría de viajeros. Combina una restauración cuidada con menor afluencia de turistas que Badaling. Tiene un teleférico y un tobogán de descenso que lo hacen ideal para familias.',
        'Para los aventureros, Jinshanling ofrece la experiencia más auténtica: tramos parcialmente restaurados junto a secciones en ruinas, con paisajes espectaculares y muy pocos turistas. La caminata de Jinshanling a Simatai es una de las mejores rutas de senderismo de China.',
        'En ChinaWay seleccionamos el tramo de la muralla que mejor se adapta a tu nivel físico, tus intereses y la época del año. Siempre evitamos las horas punta y los accesos más masificados.',
      ],
      en: [
        'The Great Wall of China stretches more than 21,000 kilometers and has over 2,000 years of history. It is not a single structure but a network of walls, towers, and fortresses built by different dynasties. Choosing the right section can make all the difference in your experience.',
        'Badaling is the most visited section and is fully restored. It is the most accessible option from Beijing (only 70 km away) and has good infrastructure, but it can be very crowded, especially in peak season.',
        'Mutianyu is our recommendation for most travelers. It combines careful restoration with fewer tourists than Badaling. It has a cable car and a descent toboggan that make it ideal for families.',
        'For adventurers, Jinshanling offers the most authentic experience: partially restored sections alongside ruined ones, with spectacular scenery and very few tourists. The hike from Jinshanling to Simatai is one of the best trekking routes in China.',
        'At ChinaWay, we select the wall section that best suits your fitness level, interests, and time of year. We always avoid peak hours and the most crowded access points.',
      ],
      zh: [
        '中国长城绵延超过21,000公里，拥有2,000多年的历史。它并非一座单一的建筑，而是由不同朝代修建的城墙、烽火台和城堡组成的网络。选择合适的段落可以让您的体验截然不同。',
        '八达岭是游客最多的段落，已完全修复。它是距北京最近的选择（仅70公里），基础设施完善，但可能非常拥挤，尤其是在旅游旺季。',
        '慕田峪是我们向大多数游客推荐的段落。它既有精心修复的城墙，游客又比八达岭少得多。这里有缆车和滑道，非常适合家庭游。',
        '对于探险者来说，金山岭提供最原汁原味的体验：部分修复的段落与残垣断壁交替出现，景色壮观，游客稀少。从金山岭到司马台的徒步路线是中国最佳的徒步线路之一。',
        '在ChinaWay，我们会根据您的体力水平、兴趣和出行季节，为您选择最合适的长城段落。我们始终避开高峰时段和最拥挤的入口。',
      ],
    },
    related: ['visa-guide-spanish-citizens', 'hidden-gems-yunnan'],
  },
  'traveling-china-with-kids': {
    img: 'https://picsum.photos/id/1024/1600/700',
    category: { es: 'Consejos de Viaje', en: 'Travel Tips', zh: '旅行贴士' },
    title: {
      es: 'Viajar a China con niños: consejos prácticos',
      en: 'Traveling to China with kids: practical tips',
      zh: '带孩子去中国旅行：实用建议',
    },
    date: '2025-12-20',
    author: 'ChinaWay Team',
    content: {
      es: [
        'China es un destino sorprendentemente amigable para familias con niños. La cultura china adora a los niños, y encontrarás que la gente local será especialmente amable y atenta con los más pequeños de tu grupo.',
        'En cuanto al transporte, los trenes de alta velocidad de China son cómodos y eficientes para familias. Los niños menores de 1.20 m viajan gratis, y los menores de 1.50 m pagan medio billete. Los asientos son espaciosos y hay espacio para equipaje.',
        'Para la comida, no te preocupes: la cocina china ofrece muchas opciones que gustan a los niños. Los dumplings, el arroz frito, los fideos y los baozi (bollos al vapor) suelen ser éxitos seguros. En las grandes ciudades también encontrarás restaurantes internacionales si lo necesitas.',
        'Actividades que encantarán a los niños: ver pandas en Chengdu, caminar por la Gran Muralla, pasear en barco por el río Li en Guilin, visitar el museo de los guerreros de terracota en Xi\'an y explorar los hutongs de Pekín en rickshaw.',
        'En ChinaWay diseñamos itinerarios familiares con ritmos adaptados, tiempos de descanso incluidos, actividades interactivas y alojamientos family-friendly. Viajar a China con niños es una experiencia que toda la familia recordará para siempre.',
      ],
      en: [
        'China is a surprisingly family-friendly destination. Chinese culture adores children, and you will find that local people are especially kind and attentive to the little ones in your group.',
        'Regarding transportation, China\'s high-speed trains are comfortable and efficient for families. Children under 1.20 m travel free, and those under 1.50 m pay half price. Seats are spacious and there is plenty of luggage space.',
        'For food, don\'t worry: Chinese cuisine offers many options that kids love. Dumplings, fried rice, noodles, and baozi (steamed buns) are usually safe bets. In major cities, you will also find international restaurants if needed.',
        'Activities that kids will love: seeing pandas in Chengdu, walking the Great Wall, taking a boat ride on the Li River in Guilin, visiting the Terracotta Warriors museum in Xi\'an, and exploring Beijing\'s hutongs by rickshaw.',
        'At ChinaWay, we design family itineraries with adapted rhythms, included rest times, interactive activities, and family-friendly accommodation. Traveling to China with kids is an experience the whole family will remember forever.',
      ],
      zh: [
        '中国是一个对家庭出游非常友好的目的地。中国文化喜爱孩子，您会发现当地人对团队中的小朋友格外友善和关注。',
        '在交通方面，中国的高铁对家庭旅行来说既舒适又高效。身高1.20米以下的儿童免费乘车，1.50米以下的儿童半价。座位宽敞，行李空间充足。',
        '在饮食方面，不必担心：中国菜有很多孩子们喜欢的选择。饺子、炒饭、面条和包子通常都是安全的选择。在大城市，如果需要，还能找到国际餐厅。',
        '孩子们会喜欢的活动：在成都看大熊猫、登长城、在桂林漓江乘船游览、参观西安兵马俑博物馆，以及坐三轮车游北京胡同。',
        '在ChinaWay，我们设计的家庭行程节奏适中、包含休息时间、安排互动活动并选择适合家庭的住宿。带孩子去中国旅行是全家人终生难忘的体验。',
      ],
    },
    related: ['visa-guide-spanish-citizens', 'best-street-food-beijing'],
  },
}

const allPostSummaries = [
  { slug: 'visa-guide-spanish-citizens', title: { es: 'Guía completa de visado para ciudadanos españoles', en: 'Complete visa guide for Spanish citizens', zh: '西班牙公民签证完整指南' }, img: 'https://picsum.photos/id/1015/800/500', category: { es: 'Consejos de Viaje', en: 'Travel Tips', zh: '旅行贴士' } },
  { slug: 'hidden-gems-yunnan', title: { es: 'Joyas ocultas de Yunnan que no puedes perderte', en: 'Hidden gems of Yunnan you cannot miss', zh: '云南不可错过的隐秘宝藏' }, img: 'https://picsum.photos/id/1039/800/500', category: { es: 'Destinos', en: 'Destinations', zh: '目的地' } },
  { slug: 'chinese-tea-culture', title: { es: 'La cultura del té en China: una tradición milenaria', en: 'Tea culture in China: a millenary tradition', zh: '中国茶文化：千年传承' }, img: 'https://picsum.photos/id/1060/800/500', category: { es: 'Cultura', en: 'Culture', zh: '文化' } },
  { slug: 'best-street-food-beijing', title: { es: 'La mejor comida callejera de Pekín', en: 'The best street food in Beijing', zh: '北京最佳街头美食' }, img: 'https://picsum.photos/id/1080/800/500', category: { es: 'Gastronomía', en: 'Food', zh: '美食' } },
  { slug: 'great-wall-sections', title: { es: 'Los mejores tramos de la Gran Muralla para visitar', en: 'The best Great Wall sections to visit', zh: '长城最值得游览的段落' }, img: 'https://picsum.photos/id/1047/800/500', category: { es: 'Destinos', en: 'Destinations', zh: '目的地' } },
  { slug: 'traveling-china-with-kids', title: { es: 'Viajar a China con niños: consejos prácticos', en: 'Traveling to China with kids: practical tips', zh: '带孩子去中国旅行：实用建议' }, img: 'https://picsum.photos/id/1024/800/500', category: { es: 'Consejos de Viaje', en: 'Travel Tips', zh: '旅行贴士' } },
]

const pageText = {
  back: { es: 'Volver al blog', en: 'Back to blog', zh: '返回博客' },
  related: { es: 'Artículos relacionados', en: 'Related articles', zh: '相关文章' },
  readMore: { es: 'Leer más', en: 'Read more', zh: '阅读更多' },
}

function formatDate(dateStr: string, locale: string) {
  const date = new Date(dateStr)
  const localeMap: Record<string, string> = { es: 'es-ES', en: 'en-US', zh: 'zh-CN' }
  return date.toLocaleDateString(localeMap[locale] || 'es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const locale = useLocale() as 'es' | 'en' | 'zh'

  const resolvedParams = use(params)
  const slug = resolvedParams.slug
  const post = posts[slug]

  if (!post) {
    return (
      <section className="py-32 px-[6%] text-center">
        <h1 className="font-playfair text-3xl font-bold mb-4">
          {locale === 'es' ? 'Artículo no encontrado' : locale === 'en' ? 'Article not found' : '文章未找到'}
        </h1>
        <Link href="/blog" className="font-dm text-sm text-red hover:underline">
          {pageText.back[locale]} &larr;
        </Link>
      </section>
    )
  }

  const relatedPosts = allPostSummaries.filter((p) => post.related.includes(p.slug))

  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[360px] overflow-hidden flex items-end">
        <img
          src={post.img}
          alt={post.title.en}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
        <div className="relative w-full max-w-[800px] mx-auto px-[6%] pb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-2.5 py-1 bg-red text-white font-dm text-[9px] font-medium tracking-[.12em] uppercase">
              {post.category[locale]}
            </span>
            <span className="font-dm text-[11px] text-white/60">
              {formatDate(post.date, locale)}
            </span>
          </div>
          <h1 className="font-playfair text-[clamp(28px,4vw,48px)] font-bold text-white leading-tight">
            {post.title[locale]}
          </h1>
          <div className="font-dm text-sm text-white/50 mt-3">{post.author}</div>
        </div>
      </section>

      {/* Article content */}
      <section className="py-16 px-[6%]">
        <div className="max-w-[800px] mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center font-dm text-sm text-gray hover:text-red transition-colors mb-10"
          >
            &larr;&nbsp;&nbsp;{pageText.back[locale]}
          </Link>

          <article className="space-y-6">
            {post.content[locale].map((paragraph, i) => (
              <p key={i} className="font-dm text-base text-black/80 leading-[1.85]">
                {paragraph}
              </p>
            ))}
          </article>
        </div>
      </section>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 px-[6%] bg-cream">
          <div className="max-w-[1200px] mx-auto">
            <SectionLabel>{pageText.related[locale].toUpperCase()}</SectionLabel>
            <h2 className="font-playfair text-[clamp(24px,3vw,36px)] font-bold mb-10">
              {pageText.related[locale]}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/blog/${rp.slug}`}
                  className="group flex gap-5 bg-white rounded-sm overflow-hidden border border-[#eee] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(0,0,0,.1)]"
                >
                  <img
                    src={rp.img}
                    alt={rp.title.en}
                    className="w-[180px] h-[140px] object-cover flex-shrink-0 transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="py-4 pr-4 flex flex-col justify-center">
                    <span className="font-dm text-[9px] text-red font-medium tracking-[.12em] uppercase mb-1">
                      {rp.category[locale]}
                    </span>
                    <h3 className="font-playfair text-base font-bold leading-snug group-hover:text-red transition-colors">
                      {rp.title[locale]}
                    </h3>
                    <span className="font-dm text-xs text-gray mt-2">
                      {pageText.readMore[locale]} &rarr;
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

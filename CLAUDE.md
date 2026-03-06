# ChinaWay - 中国旅行网站项目规范

## 项目概述

ChinaWay 是一家面向欧洲客户（主要为西班牙市场）的中国旅行社网站。网站提供固定行程预订、定制旅行咨询、目的地浏览等功能。

**品牌名称：** ChinaWay  
**主色调：** 红色 #D0021B，黑色 #111111，米白 #F7F4F0，灰色 #7a7a7a  
**字体：** Playfair Display（标题）+ DM Sans（正文）  
**语言：** 西班牙语（默认）、英语、中文  
**目标用户：** 欧洲（主要西班牙）旅客  

---

## 技术栈

- **前端：** Next.js 16 + React 19 + Tailwind CSS
- **后台 CMS：** Payload CMS 3.x（嵌入 Next.js，单一代码库部署）
- **数据库：** Supabase（托管 PostgreSQL），仅用作数据库，Auth/Storage 由 Payload 处理
- **支付：** Stripe Checkout + Stripe Tax（自动计算 IVA）+ Stripe Invoicing（自动生成合规发票）
- **地图：** Leaflet + GeoJSON（中国省份交互地图）
- **部署：** Vercel / 自选 VPS
- **分析：** Google Analytics 4（不自建）
- **即时通讯：** WhatsApp Business 按钮（不做 AI 客服）
- **隐私合规：** GDPR cookie banner + 隐私政策页面

### 技术决策说明

**为什么选 Payload CMS 3.x：**
- 直接嵌入 Next.js，不需要单独部署后端服务，降低运维成本
- TypeScript 原生，与 Next.js 16 / React 19 无缝集成
- 内置 i18n 支持，完美匹配三语（ES/EN/ZH）需求
- 内置图片管理（Media Library）、Auth（管理员登录）、REST + GraphQL API
- 免费开源，无 API 调用量限制
- 数据模型通过 Collection Config 定义，开发效率高

**为什么 Stripe Tax + Invoicing 一起用：**
- Stripe Tax：在 Checkout Session 自动计算西班牙 IVA（21%），解决"收多少税"
- Stripe Invoicing：支付完成后自动生成带 NIF/CIF、税额明细的正式发票（factura），解决"税务凭证"合规
- 两者配合使用，开发端零发票逻辑，合规由 Stripe 处理

**Supabase 使用原则：**
- 仅作为托管 PostgreSQL 数据库使用，通过 Payload 的 `@payloadcms/db-postgres` 适配器连接
- **不使用** Supabase Auth（用 Payload 内置 Auth）
- **不使用** Supabase Storage（用 Payload Media Collection，可配 S3/Cloudflare R2）
- **不使用** Supabase Realtime / Edge Functions
- 连接方式：Supabase Dashboard → Settings → Database → Connection string (URI)
- 免费层：500MB 数据库 + 50,000 月活用户 API 请求，初期足够

---

## 前端页面结构

### 1. 首页 (Home)
**已有设计稿：** `china-travel-website.jsx`（完整 React 组件，含所有样式和多语言数据）

首页包含以下模块（按顺序）：

- **导航栏（Nav）**：固定顶部，滚动后背景变白。Logo "中 ChinaWay"，五个导航项（目的地/行程/定制/关于我们/联系），三语切换按钮（ES/EN/中文）
- **Hero 全屏大图**：渐变遮罩，动画标题 "Descubre la China auténtica"，两个 CTA 按钮（查看行程/免费咨询），底部统计条（500+ 旅行者 / 20+ 目的地 / 8 年经验）
- **滚动文字条（Marquee）**：城市名循环滚动
- **目的地板块（Destinations）**：6 个目的地卡片（桂林/上海/西藏/云南/西安/张家界），网格布局，hover 放大效果，带标签（自然/都市/心灵/文化/历史/探险）
- **图片条（Photo Strip）**：横向滚动图片
- **限时优惠/Express 专区**（客户新需求）：首页展示部分"即将出发"行程的折扣信息卡片，含原价、折扣价、折扣百分比标签，可横向滚动浏览
- **行程推荐（Tours）**：3 个精选行程卡片（丝绸之路 15天 €3,490 / 经典中国 10天 €2,290 / 自然中国 12天 €2,890），hover 上浮效果
- **全幅横图 Banner**：张家界大图 + 引用语
- **为什么选择我们（Why Us）**：4 个信任卡片（签证协助/西语导游/欧洲团队/定制行程）+ 统计数字条
- **用户评价（Reviews）**：3 条评价卡片，带星级和用户信息
- **联系板块（Contact）**：黑色背景，左侧联系方式（WhatsApp/WeChat/Email），右侧询价表单（姓名/邮箱/目的地选择）
- **页脚（Footer）**：Logo + 版权信息 + 社交链接

### 2. 目的地页面 (Destinations)
- 展示所有目的地分类（按省份/主题）
- 每个目的地有详情页，展示该地区的所有可用行程

### 3. 即将出发页面 (Upcoming Departures / "Salidas Inminentes")
- 展示所有固定出发日期的行程
- 每个行程显示：行程名称、天数、城市路线、出发日期、价格、剩余名额
- **预订功能**：客户可选择出发日期，填写个人信息，支付固定定金（100€）
- 定金通过 Stripe Checkout 收取，金额固定不需动态计算

### 4. 行程详情页 (Tour Detail)
- 行程概览（天数、城市、价格、标签）
- 每日行程安排（Day 1, Day 2...）
- 包含/不包含项目
- 价格说明
- 出发日期选择
- 预订/支付定金按钮
- 相关行程推荐

### 5. 交互式中国地图页面 (Interactive Map)
- 使用 Leaflet + 中国省份 GeoJSON 数据
- 支持拖动、缩放操作
- 鼠标 hover 省份高亮
- 点击省份 → 弹出该省份信息卡片（省份名称、简介、可用行程数量）
- 点击卡片 → 跳转到该省份的目的地详情页
- 主要用于"定制旅行"流程中的省份选择

### 6. 定制旅行页面 (Custom Travel / "Viaje a Medida")
- 引导式表单流程：
  1. 通过地图选择感兴趣的省份/目的地
  2. 填写旅行偏好（人数、日期范围、预算范围、兴趣主题）
  3. 填写联系信息（姓名、邮箱、电话、WhatsApp）
  4. 提交 → 后台收到询价单

### 7. 实用信息页面 (Practical Info)
- 签证指南
- 最佳旅行季节
- 安全须知
- 常见问题 FAQ

### 8. 博客/视频页面 (Blog)
- 文章列表 + 详情页
- 支持图文、视频嵌入

### 9. 联系我们 (Contact)
- 联系表单
- WhatsApp 链接
- WeChat 二维码
- 公司信息

### 10. 法律页面
- 隐私政策（GDPR 合规）
- Cookie 政策
- 服务条款

---

## 后台管理系统 (Payload CMS 3.x)

Payload 嵌入 Next.js 运行，管理后台路由默认挂载在 `/admin`。所有 Collection 自动生成 CRUD 界面和 REST/GraphQL API。

### Collection: Destinations（目的地）
```typescript
// 字段设计参考
{
  name: { type: 'text', localized: true },        // 三语名称
  slug: { type: 'text', unique: true },
  description: { type: 'richText', localized: true },
  province: { type: 'select' },                    // 省份归属（关联地图）
  theme: { type: 'select', options: ['nature','culture','history','adventure','city','spiritual'] },
  coverImage: { type: 'upload', relationTo: 'media' },
  gallery: { type: 'array', fields: [{ type: 'upload' }] },
  status: { type: 'select', options: ['draft','published'] }
}
```

### Collection: Tours（行程/套餐）
```typescript
{
  title: { type: 'text', localized: true },
  slug: { type: 'text', unique: true },
  days: { type: 'number' },
  cities: { type: 'text', localized: true },       // 路线城市
  price: { type: 'number' },                        // 原价（€）
  discountPrice: { type: 'number' },                // 折扣价（可选）
  discountPercent: { type: 'number' },              // 折扣百分比（可选）
  badge: { type: 'text', localized: true },         // 标签（最受欢迎/首次旅华等）
  destinations: { type: 'relationship', relationTo: 'destinations', hasMany: true },
  coverImage: { type: 'upload', relationTo: 'media' },
  itinerary: { type: 'array', fields: [            // 每日行程
    { name: 'day', type: 'number' },
    { name: 'title', type: 'text', localized: true },
    { name: 'description', type: 'richText', localized: true },
  ]},
  included: { type: 'richText', localized: true },  // 包含项目
  excluded: { type: 'richText', localized: true },  // 不包含项目
  isUpcoming: { type: 'checkbox' },                  // 是否"即将出发"
  isExpress: { type: 'checkbox' },                   // 是否首页限时优惠
  departures: { type: 'array', fields: [             // 出发日期
    { name: 'date', type: 'date' },
    { name: 'spotsTotal', type: 'number' },
    { name: 'spotsBooked', type: 'number', defaultValue: 0 },
  ]},
  depositAmount: { type: 'number', defaultValue: 100 }, // 定金（€）
  status: { type: 'select', options: ['draft','published','archived'] }
}
```

### Collection: Bookings（预订/定金订单）
```typescript
{
  tour: { type: 'relationship', relationTo: 'tours' },
  departureDate: { type: 'date' },
  customerName: { type: 'text' },
  customerEmail: { type: 'email' },
  customerPhone: { type: 'text' },
  stripeSessionId: { type: 'text' },
  stripeInvoiceId: { type: 'text' },
  paymentStatus: { type: 'select', options: ['pending','paid','failed','refunded'] },
  amount: { type: 'number' },
  paidAt: { type: 'date' },
}
```

### Collection: Inquiries（定制旅行询价）
```typescript
{
  customerName: { type: 'text' },
  customerEmail: { type: 'email' },
  customerPhone: { type: 'text' },
  selectedProvinces: { type: 'json' },              // 地图选择的省份
  travelers: { type: 'number' },
  dateRange: { type: 'text' },
  budget: { type: 'select', options: ['<2000','2000-4000','4000-6000','>6000'] },
  interests: { type: 'select', hasMany: true },
  message: { type: 'textarea' },
  status: { type: 'select', options: ['new','replied','confirmed','completed'], defaultValue: 'new' },
}
```

### Collection: Media（媒体）
- Payload 内置 Media Collection，支持图片上传、裁剪、多尺寸生成
- 配置 imageSizes 生成缩略图和 WebP 格式

### Collection: Posts（博客文章）
```typescript
{
  title: { type: 'text', localized: true },
  slug: { type: 'text', unique: true },
  content: { type: 'richText', localized: true },
  coverImage: { type: 'upload', relationTo: 'media' },
  category: { type: 'select' },
  publishedAt: { type: 'date' },
  status: { type: 'select', options: ['draft','published'] }
}
```

### Payload 多语言配置
```typescript
// payload.config.ts
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'

export default buildConfig({
  db: postgresAdapter({
    pool: { connectionString: process.env.SUPABASE_DATABASE_URL },
    // 格式: postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres
  }),
  localization: {
    locales: [
      { label: 'Español', code: 'es' },
      { label: 'English', code: 'en' },
      { label: '中文', code: 'zh' },
    ],
    defaultLocale: 'es',
    fallback: true,
  },
  // ...collections, plugins, etc.
})
```

---

## Stripe 支付集成

### 范围
- **仅用于"即将出发"行程的定金收取**
- 固定金额：100€（可在后台 Payload CMS 中按行程配置）
- 使用 Stripe Checkout Session（跳转到 Stripe 托管支付页面）

### 核心配置：Tax + Invoicing
```typescript
// 创建 Checkout Session 示例
const session = await stripe.checkout.sessions.create({
  mode: 'payment',
  line_items: [{
    price_data: {
      currency: 'eur',
      product_data: { name: '丝绸之路 15天 - 定金 / Depósito' },
      unit_amount: 10000, // 100€ in cents
    },
    quantity: 1,
  }],
  automatic_tax: { enabled: true },         // ← Stripe Tax 自动计算 IVA
  invoice_creation: { enabled: true },       // ← 自动生成正式发票（factura）
  customer_email: customerEmail,
  success_url: `${baseUrl}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${baseUrl}/booking/cancel`,
  metadata: {
    tourId: tour.id,
    departureDate: selectedDate,
  },
});
```

### Stripe Webhook 处理
- 监听 `checkout.session.completed` 事件
- 更新 Payload CMS 中 Bookings Collection 的支付状态
- 更新对应出发日期的已预订名额（spotsBooked + 1）
- Stripe 自动发送带发票的确认邮件给客户

### 客户需要在 Stripe Dashboard 预先配置
- 公司信息（公司名称、NIF/CIF、注册地址）
- Tax Registration（西班牙 IVA 注册）
- Invoice 模板（Logo、页脚信息）
- Webhook endpoint URL

### 不包含
- 全额付款（线下处理）
- 退款自动化（手动在 Stripe Dashboard 操作）
- 自动对接西班牙税务局（SII/TicketBAI）
- 自建发票模板（使用 Stripe 内置发票功能）

---

## 多语言策略

- 默认语言：西班牙语 (ES)
- 支持语言：英语 (EN)、中文 (ZH)
- 自动检测用户浏览器语言设置
- 手动切换（导航栏语言按钮）
- URL 结构：`/es/...`、`/en/...`、`/zh/...`
- **前端静态文案：** next-intl 或 next-international，JSON 翻译文件
- **CMS 动态内容：** Payload 内置 localization，所有 Collection 字段支持三语录入，API 请求时传 `?locale=es` 获取对应语言
- SEO：每个语言版本有独立的 meta tags 和 hreflang 标签

---

## SEO 要求

- 语义化 HTML 结构
- 每页独立 title 和 meta description（多语言）
- hreflang 标签（ES/EN/ZH）
- Open Graph + Twitter Card meta tags
- 结构化数据（JSON-LD：旅行社/行程/FAQ）
- Sitemap.xml 自动生成
- robots.txt
- 图片 alt 标签（多语言）
- 页面加载速度优化（图片懒加载、Next.js SSR/SSG）

---

## GDPR 合规

- Cookie consent banner（首次访问弹出）
- Cookie 政策页面
- 隐私政策页面（说明数据收集、使用、存储方式）
- 表单提交前的隐私同意勾选框
- 用户数据删除请求通道（联系邮箱即可）

---

## 响应式设计

- 桌面端（>1200px）：完整布局
- 平板端（768px-1200px）：自适应网格
- 移动端（<768px）：单列布局，汉堡菜单，触摸友好
- 地图在移动端可正常缩放和操作

---

## 项目目录结构（参考）

```
chinaway/
├── src/
│   ├── app/
│   │   ├── (frontend)/           # 前台页面
│   │   │   ├── [locale]/         # 多语言路由
│   │   │   │   ├── page.tsx              # 首页
│   │   │   │   ├── destinations/         # 目的地
│   │   │   │   ├── tours/                # 行程列表 + 详情
│   │   │   │   ├── upcoming/             # 即将出发
│   │   │   │   ├── custom/               # 定制旅行（含地图）
│   │   │   │   ├── blog/                 # 博客
│   │   │   │   ├── info/                 # 实用信息
│   │   │   │   ├── contact/              # 联系我们
│   │   │   │   └── legal/                # 隐私政策/Cookie/条款
│   │   │   └── layout.tsx
│   │   ├── (payload)/             # Payload Admin 自动挂载
│   │   │   └── admin/
│   │   └── api/
│   │       ├── checkout/          # Stripe Checkout Session 创建
│   │       └── webhooks/
│   │           └── stripe/        # Stripe Webhook 处理
│   ├── collections/               # Payload Collection 定义
│   │   ├── Destinations.ts
│   │   ├── Tours.ts
│   │   ├── Bookings.ts
│   │   ├── Inquiries.ts
│   │   ├── Media.ts
│   │   └── Posts.ts
│   ├── components/                # 前端 React 组件
│   │   ├── layout/                # Nav, Footer, LangSwitcher
│   │   ├── home/                  # 首页各模块组件
│   │   ├── map/                   # 中国地图组件
│   │   ├── booking/               # 预订/支付流程组件
│   │   └── ui/                    # 通用 UI 组件
│   ├── lib/
│   │   ├── stripe.ts              # Stripe 客户端配置
│   │   └── payload.ts             # Payload 客户端
│   └── i18n/
│       ├── es.json
│       ├── en.json
│       └── zh.json
├── public/
│   └── geojson/
│       └── china-provinces.json   # 中国省份 GeoJSON 数据
├── payload.config.ts              # Payload 主配置（含 localization + Supabase 连接）
├── tailwind.config.ts
├── next.config.ts
├── .env.local                     # 环境变量（不入 git）
└── package.json
```

### 环境变量 (.env.local)
```bash
# Supabase
SUPABASE_DATABASE_URL=postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres

# Payload
PAYLOAD_SECRET=your-payload-secret

# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...

# Site
NEXT_PUBLIC_BASE_URL=https://chinaway.es
```

---

## 现有资源

| 文件 | 说明 |
|------|------|
| `china-travel-website.jsx` | 首页完整 React 设计稿（含样式、多语言数据、组件结构），直接作为首页开发基础 |
| `需求文档.docx` | 开发方提供的网站架构方案 |
| `chinaway.pdf` | 客户反馈，补充了地图/限时优惠/即将出发等需求 |

---

## 不在本期范围内

- ❌ 会员系统 / 用户注册登录
- ❌ 权限管理
- ❌ 自建数据分析面板（使用 GA4）
- ❌ AI 客服 / 智能推荐
- ❌ 全额在线支付
- ❌ 自动退款
- ❌ 对接西班牙税务局系统（SII/TicketBAI）
- ❌ 原生 App

---

## 开发优先级

1. **P0 - 核心**：首页（基于现有 JSX）、导航、多语言、响应式
2. **P0 - 核心**：目的地页面、行程详情页、"即将出发"列表页
3. **P0 - 核心**：后台 CMS（目的地 + 行程 CRUD）
4. **P1 - 重要**：Stripe 定金支付集成
5. **P1 - 重要**：交互式中国地图
6. **P1 - 重要**：定制旅行表单、联系表单
7. **P2 - 标准**：限时优惠首页专区
8. **P2 - 标准**：SEO 优化、GDPR 合规
9. **P3 - 后续**：博客/视频页面、实用信息页面

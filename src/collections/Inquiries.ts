import type { CollectionConfig } from 'payload'

export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  labels: {
    singular: { en: 'Inquiry', zh: '询价', es: 'Consulta' },
    plural: { en: 'Inquiries', zh: '询价', es: 'Consultas' },
  },
  admin: {
    useAsTitle: 'customerName',
    defaultColumns: ['customerName', 'customerEmail', 'status', 'createdAt'],
  },
  access: {
    read: ({ req }) => !!req.user,
    create: () => true,
  },
  fields: [
    {
      name: 'customerName',
      label: { en: 'Customer Name', zh: '客户姓名', es: 'Nombre del cliente' },
      type: 'text',
      required: true,
    },
    {
      name: 'customerEmail',
      label: { en: 'Customer Email', zh: '客户邮箱', es: 'Email del cliente' },
      type: 'email',
      required: true,
    },
    {
      name: 'customerPhone',
      label: { en: 'Customer Phone', zh: '客户电话', es: 'Teléfono del cliente' },
      type: 'text',
    },
    {
      name: 'selectedProvinces',
      label: { en: 'Selected Provinces', zh: '选择的省份', es: 'Provincias seleccionadas' },
      type: 'json',
    },
    {
      name: 'travelers',
      label: { en: 'Number of Travelers', zh: '旅行人数', es: 'Número de viajeros' },
      type: 'number',
      min: 1,
    },
    {
      name: 'dateRange',
      label: { en: 'Date Range', zh: '日期范围', es: 'Rango de fechas' },
      type: 'text',
    },
    {
      name: 'budget',
      label: { en: 'Budget', zh: '预算', es: 'Presupuesto' },
      type: 'select',
      options: [
        { label: '< 2.000€', value: '<2000' },
        { label: '2.000€ - 4.000€', value: '2000-4000' },
        { label: '4.000€ - 6.000€', value: '4000-6000' },
        { label: '> 6.000€', value: '>6000' },
      ],
    },
    {
      name: 'interests',
      label: { en: 'Interests', zh: '兴趣', es: 'Intereses' },
      type: 'select',
      hasMany: true,
      options: [
        { label: { en: 'Nature', zh: '自然', es: 'Naturaleza' }, value: 'nature' },
        { label: { en: 'Culture', zh: '文化', es: 'Cultura' }, value: 'culture' },
        { label: { en: 'History', zh: '历史', es: 'Historia' }, value: 'history' },
        { label: { en: 'Adventure', zh: '探险', es: 'Aventura' }, value: 'adventure' },
        { label: { en: 'City', zh: '都市', es: 'Ciudad' }, value: 'city' },
        { label: { en: 'Spiritual', zh: '心灵', es: 'Espiritual' }, value: 'spiritual' },
        { label: { en: 'Gastronomy', zh: '美食', es: 'Gastronomía' }, value: 'gastronomy' },
      ],
    },
    {
      name: 'message',
      label: { en: 'Message', zh: '留言', es: 'Mensaje' },
      type: 'textarea',
    },
    {
      name: 'status',
      label: { en: 'Status', zh: '状态', es: 'Estado' },
      type: 'select',
      options: [
        { label: { en: 'New', zh: '新询价', es: 'Nuevo' }, value: 'new' },
        { label: { en: 'Replied', zh: '已回复', es: 'Respondido' }, value: 'replied' },
        { label: { en: 'Confirmed', zh: '已确认', es: 'Confirmado' }, value: 'confirmed' },
        { label: { en: 'Completed', zh: '已完成', es: 'Completado' }, value: 'completed' },
      ],
      defaultValue: 'new',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}

import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: { en: 'User', zh: '用户', es: 'Usuario' },
    plural: { en: 'Users', zh: '用户', es: 'Usuarios' },
  },
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [],
}

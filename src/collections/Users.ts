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
  access: {
    read: ({ req }) => !!req.user,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: 'role',
      label: { en: 'Role', zh: '角色', es: 'Rol' },
      type: 'select',
      options: [
        { label: { en: 'Admin', zh: '管理员', es: 'Administrador' }, value: 'admin' },
        { label: { en: 'Editor', zh: '编辑', es: 'Editor' }, value: 'editor' },
      ],
      defaultValue: 'editor',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}

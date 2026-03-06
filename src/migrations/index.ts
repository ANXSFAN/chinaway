import * as migration_20260306_102944_initial from './20260306_102944_initial';

export const migrations = [
  {
    up: migration_20260306_102944_initial.up,
    down: migration_20260306_102944_initial.down,
    name: '20260306_102944_initial'
  },
];

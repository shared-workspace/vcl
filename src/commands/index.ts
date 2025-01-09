import type { CommandDef } from 'citty'

const _rDefault = (r: any) => (r.default || r) as Promise<CommandDef>

export const commands = {
  'test': () => import('./test').then(_rDefault),
  'info': () => import('./info').then(_rDefault),
} as const

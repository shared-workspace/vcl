import { resolve } from 'pathe'

export function headerLog(ctx: any) {
  // Resolve rootDir
  const cwd = resolve(ctx.args.cwd || ctx.args.rootDir || '.')
  console.log('Working directory:', cwd)
}

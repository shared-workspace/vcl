import type { packageManagerLocks } from '@utils/packageManagers'
import {
  getPackageManager,
  getPackageManagerVersion,
} from '@utils/packageManagers'

export default (cwd: string) => {
  let packageManager: keyof typeof packageManagerLocks | 'unknown' | null =
    getPackageManager(cwd)?.name ?? null
  if (packageManager) {
    packageManager += '@' + getPackageManagerVersion(packageManager)
  } else {
    packageManager = 'unknown'
  }
  return packageManager
}

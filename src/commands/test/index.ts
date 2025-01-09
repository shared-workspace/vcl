import { defineCommand } from 'citty'

export default defineCommand({
  meta: {
    name: 'test',
    description: 'Run tests',
  },
  async run() {
    console.log("Test is Successful...")
  },
})
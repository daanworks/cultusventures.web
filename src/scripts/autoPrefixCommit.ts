#!/usr/bin/env ts-node

import { readFileSync, writeFileSync } from 'fs'
import { execSync } from 'child_process'

const commitMessageFilePath = process.argv[2]

if (!commitMessageFilePath) {
  console.error('❌ Commit message file path not provided.')
  process.exit(1)
}

try {
  const originalMessage = readFileSync(commitMessageFilePath, 'utf8').trim()
  const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim()
  const match = branch.match(/(CVWEB-\d+)/)
  const prefix = match ? match[1] : 'NO-ISSUE'

  if (originalMessage.startsWith(prefix)) {
    console.log(`✅ Commit already contains prefix`)
    process.exit(0)
  }

  const formattedMessage = `${prefix}: ${originalMessage}`
  writeFileSync(commitMessageFilePath, formattedMessage)

  console.log(`✅ Commit message updated to: ${formattedMessage}`)
} catch (error) {
  console.error('❌ Failed to prefix commit message:', error)
  process.exit(1)
}

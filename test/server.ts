import path = require('path')
import fs = require('mz/fs')
import tape = require('tape')
import promisifyTape from 'tape-promise'
import {
  prepare,
  execPnpm,
  spawn,
} from './utils'

const test = promisifyTape(tape)

test['only']('installation using pnpm server', async (t: tape.Test) => {
  const project = prepare(t)

  const server = spawn(['server'])

  setTimeout(async () => {
    await execPnpm('install', 'is-positive')

    server.kill(1)

    t.ok(project.requireModule('is-positive'))

    t.end()
  }, 2000)
})

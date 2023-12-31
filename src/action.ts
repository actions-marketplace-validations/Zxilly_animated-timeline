import {renderAnimatedGif} from './render/render'
import * as core from '@actions/core'
import * as process from 'process'
import 'source-map-support/register'

async function run(): Promise<void> {
  const type = core.getInput('type')
  if (type !== 'webp' && type !== 'gif') {
    core.setFailed('Invalid type')
    return
  }

  const name = core.getInput('name') === '' ? undefined : core.getInput('name')

  const token = process.env['GITHUB_TOKEN']
  if (!token) {
    core.setFailed('Token must be provided as environment variable')
    return
  }

  const output = core.getInput('output')
  if (!output) {
    core.setFailed('Invalid output')
    return
  }

  await renderAnimatedGif({
    token,
    type,
    name,
    output
  })
}

run()

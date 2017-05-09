#!/usr/bin/env node
const babel_preset_jsy_json = require('../../package.json')
const fs = require('fs')

::
  new Promise @ (resolve, reject) =>
    fs.readFile @ './package.json', 'utf-8',
      (err, content) => err ? reject(err) : resolve(content)

  .then @ content => JSON.parse @ content

  .then @ pkg => ::
    pkg.devDependencies = setupDevDependencies @ pkg.devDependencies || {}
    pkg.babel = setupBabelPresets @ pkg.babel || {}
    pkg.scripts = setupScripts @ pkg.scripts || {}
    return pkg

  .then @ pkg => JSON.stringify(pkg, null, 2)
  .then @ console.log


function setupDevDependencies(devDependencies) ::
  devDependencies['babel-cli'] = babel_preset_jsy_json.devDependencies['babel-cli']
  devDependencies['babel-preset-jsy'] = `^${babel_preset_jsy_json.version}`
  return devDependencies


function setupBabelPresets(babel) ::
  if ! babel.presets ::
    babel.presets = []
  else if 'string' === babel.presets ::
    babel.presets = [babel.presets]
  
  if ! babel.presets.find @ e => e=='jsy' || e[0]=='jsy' ::
    //babel.presets.push @ ['jsy', {no_stage_3: false}]
    babel.presets.push @ 'jsy'

  return babel

function setupScripts(scripts) ::
  if !scripts.watch ::
    scripts.watch = 'npm -s run build -- --watch'

  if !scripts.build ::
    scripts.build = 'babel -s inline -x .js,.jsy code -d dist'

  if !scripts.testone ::
    scripts.testone = 'babel-node test/example.jsy'

  return scripts

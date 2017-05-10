#!/usr/bin/env node
const babel_preset_jsy_json = require('../../package.json')
const fs = require('fs')

const argv = process.argv.slice(2)
let jsy_options
const jsy_option_sets =
  @{} no_stage_3:
        @{} no_stage_3: true
    , all:
        @{} stage_3: true
          , targets: @{} node: true, browser: true
          , offside: @{} check_blocks: '\/node_modules\/|\\node_modules\\/'

if argv.includes @ '--help' ::
  console.log @
    @[] ''
      , '  Usage: jsy-init [options]'
      , ''
      , '  Purpose: Configures the package.json with Babel settings, devDependencies, and common scripts for quickly starting a new project.'
      , ''
      , '  Options:'
      , ''
      , '    --help            output usage information'
      , '    --no_stage_3      add babel config option to exclude stage_3 preset (used to prevent async/await code generation)'
      , '    --options         add all babel config options for JSY for later editing'
      , ''
    .join('\n')

else ::
  if argv.includes @ '--no_stage_3' || argv.includes @ '--no_stage3' ::
    jsy_options = Object.assign @ {}, jsy_options, jsy_option_sets.no_stage_3

  if argv.includes @ '--options' ::
    jsy_options = Object.assign @ {}, jsy_options, jsy_option_sets.all
    
  transformPackageJson()


function transformPackageJson(filename='./package.json') ::
  new Promise @ (resolve, reject) =>
    fs.readFile @ filename, 'utf-8',
      (err, content) => err ? reject(err) : resolve(content)

  .then @ content => JSON.parse @ content

  .then @ pkg => ::
    console.log @
      @[] '', `Merging settings into "${filename}":`
        , JSON.stringify @ setupPackageJson({}), null, 2
        , ''
      .join('\n')
    return setupPackageJson(pkg)

  .then @ pkg => JSON.stringify(pkg, null, 2)

  .then @ content =>
    new Promise @ (resolve, reject) =>
      fs.writeFile @ filename, content,
        (err) => err ? reject(err) : resolve(content)

  .then @ content => console.log @ `Wrote merged JSY settings into "${filename}"`


function setupPackageJson(pkg) ::
  pkg.devDependencies = setupDevDependencies @ pkg.devDependencies || {}
  pkg.babel = setupBabelPresets @ pkg.babel || {}
  pkg.scripts = setupScripts @ pkg.scripts || {}
  return pkg


function setupDevDependencies(devDependencies) ::
  devDependencies['babel-cli'] = babel_preset_jsy_json.devDependencies['babel-cli']
  devDependencies['babel-preset-jsy'] = `^${babel_preset_jsy_json.version}`
  devDependencies['nodemon'] = '*'
  return devDependencies


function setupBabelPresets(babel) ::
  if ! babel.presets ::
    babel.presets = []
  else if 'string' === babel.presets ::
    babel.presets = [babel.presets]
  
  if ! babel.presets.find @ e => e=='jsy' || e[0]=='jsy' ::
    babel.presets.push @ jsy_options ? ['jsy', jsy_options] : 'jsy'

  return babel

function setupScripts(scripts) ::
  if !scripts.start ::
    scripts.start = 'node dist'

  if !scripts['start:dev'] ::
    scripts['start:dev'] = 'nodemon -d 2 dist'

  if !scripts.build ::
    scripts.build = 'babel -s inline -x .js,.jsy code -d dist'

  if !scripts.watch ::
    scripts.watch = 'npm -s run build -- --watch'

  if !scripts.pretest ::
    scripts.pretest = 'npm -s run build'

  if !scripts.testone ::
    scripts.testone = 'babel-node test/example.jsy'

  return scripts


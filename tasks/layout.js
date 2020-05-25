// Simple script to generate all xml directory and html entry point by env from : https://airtable.com/tbl4GWmvpULb17nO9/viwULQOeYhRCjq4M3
/* eslint-disable */
const dotenv = require('dotenv')
dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

const fs = require('fs')
const path = require('path')

const config = require('../app.config')
const appName = config.package.name

const templateDir = path.resolve(__dirname, '../src/templates')

let baseHTML = fs.readFileSync(path.join(templateDir, '/layout/base.html'), 'UTF8')
const processEnvKeys = Object.keys(process.env).filter(k => k.indexOf('VUE_APP_') > -1)

// Replace all HTML variables w/ .env's variables
if (processEnvKeys.length > 0) {
  processEnvKeys.forEach(key => {
    const re = new RegExp(`{{ ${key} }}`, 'gm')
    baseHTML = baseHTML.replace(re, process.env[`${key}`])
  })
}

// Export HTML
fs.writeFile(path.join(templateDir, 'index.html'), baseHTML, function (err) {
  if (err) {
    return console.log(err)
  }
  console.log(`The file index.html for deployment to production environment and local development was saved!`)
})

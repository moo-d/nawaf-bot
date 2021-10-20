const { decryptMedia, Client } = require('@open-wa/wa-automate')
const fs = require('fs-extra')
const fetch = require('node-fetch')
const exec = require('await-exec')
const config = require('./config.json')
const axios = require('axios')
const path = require('path')
const ms = require('parse-ms')
const toMs = require('ms')
const canvas = require('canvacord')
const mathjs = require('mathjs')
const moment = require('moment-timezone')
const ocrtess = require('node-tesseract-ocr')
moment.tz.setDefault('Saudi_Arabia/Qassim').locale('sau')

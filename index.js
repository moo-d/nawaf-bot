const { create, Client } = require('@open-wa/wa-automate')
const { color, options } = require('./tools')
const { loader } = require('./function')
const msgHandler = require('./nawaf.js')
const figlet = require('figlet')
const canvas = require('discord-canvas')
const { ownerBot } = require('./config.json')
const fs = require('fs-extra')
const express = require('express')
const app = express()

const start = (Nawaf = new Client()) => {
  console.log(color(figlet.textSync('BocchiBot', 'Larry 3D'), 'cyan'))
  console.log(color('=> Bot successfully loaded! Database:', 'yellow'), color(loader.getAllDirFiles('./database').length), color('Library:', 'yellow'), color(loader.getAllDirFiles('./lib').length), color('Function:', 'yellow'), color(loader.getAllDirFiles('./function').length))
  console.log(color('=> Source code version:', 'yellow'), color(version))
  console.log(color('=> Bug? Error? Suggestion? Tell me.', 'yellow'))
  console.log(color('[NAWAF]'), color('NawafBot is now online!', 'yellow'))
  console.log(color('[DEV]', 'cyan'), color('Welcome back, Owner! Hope you are doing well~', 'magenta'))

  // Creating a localhost
  app.get('/', (req, res) => res.status(200).send('Nawaf Client'))
  const PORT = process.env.PORT || 8080 || 5000 || 3000
  app.listen(PORT, () => {
    console.log(color('Localhost is running!', 'yellow'))
  })

  // Uncomment code di bawah untuk mengaktifkan auto-update file changes. Tidak disarankan untuk long-time use.
  // Uncomment code below to activate auto-update file changes. Not recommended for long-time use.
  // loader.nocache('../nawaf.js', (m) => console.log(color('[WATCH]', 'orange'), color(`=> '${m}'`, 'yellow'), 'file is updated!'))

  Nawaf.onStateChanged((state) => {
    console.log(color('[NAWAF]'), state)
    if (state === 'UNPAIRED' || state === 'CONFLICT' || state === 'UNLAUNCHED') Nawaf.forceRefocus()
  })

  Nawaf.onMessage((message) => {
    // Uncomment code di bawah untuk mengaktifkan auto-delete cache pesan.
    // Uncomment code below to activate auto-delete message cache.
    /*
    Nawaf.getAmountOfLoadedMessages()
    .then((msg) => {
      if (msg >= 1000) {
        console.log(color('[NAWAF]'), color(`Loaded message reach ${msg}, cuting message cache...`, 'yellow'))
        Nawaf.cutMsgCache()
        console.log(color('[NAWAF]'), color('Cache deleted!', 'yellow'))
      }
    })
    */
    // Comment code msgHandler di bawah untuk mengaktifkan auto-update. Kemudian, uncomment code require di bawah msgHandler.
    // Comment code below to activate auto-update. Then, uncomment require code below msgHandler.
    msgHandler(Nawaf, message)
    // require('./nawaf.js')(Nawaf, message)
  })

  Nawaf.onGlobalParticipantsChanged(async (event) => {
    const _welcome = JSON.parse(fs.readFileSync('./database/group/welcome.json'))
    const isWelcome = _welcome.includes(event.chat)
    const gcChat = await Nawaf.getChatById(event.chat)
    const pcChat = await Nawaf.getContact(event.who)
    let { pushname, verifiedName, formattedName } = pcChat
    pushname = pushname || verifiedName || formattedName
    const { name, groupMetadata } = gcChat
    const botNumbers = await Nawaf.getHostNumber() + '@c.us'
    try {
      if (event.action === 'add' && event.who !== botNumbers && isWelcome) {
        const pic = await Nawaf.getProfilePicFromServer(event.who)
        if (pic === `ERROR: 401`) {
          var picx = 'https://i.ibb.co/Tq7d7TZ/age-hananta-495-photo.png'
        } else if (pic === `ERROR: 404`) {
	  var picx = `https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg`
	} else {
          picx = pic
        }
        const welcomer = await new canvas.Welcome()
        .setUsername(pushname)
        .setDiscriminator(event.who.substring(6, 10))
        .setMemberCount(groupMetadata.participants.length)
        .setGuildName(name)
        .setAvatar(picx)
        .setColor('border', '#00100C')
        .setColor('username-box', '#00100C')
        .setColor('discriminator-box', '#00100C')
        .setColor('message-box', '#00100C')
        .setColor('title', '#00FFFF')
        .setBackground('https://www.photohdx.com/images/2016/05/red-blurry-background.jpg')
        .toAttachment()
        const base64 = `data:image/png;base64,${welcomer.toBuffer().toString('base64')}`
        await Nawaf.sendFile(event.chat, base64, 'welcome.png', `Welcome ${pushname}!`)
      } else if (event.action === 'remove' && event.who !== botNumbers && isWelcome) {
        const pic = await Nawaf.getProfilePicFromServer(event.who)
        if (pic === `ERROR: 401`) {
          var picxs = 'https://i.ibb.co/Tq7d7TZ/age-hananta-495-photo.png'
        } else if (pic === `ERROR: 404`) {
	  var picx = `https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg`
	} else {
          picxs = pic
        }
        const bye = await new canvas.Goodbye()
        .setUsername(pushname)
        .setDiscriminator(event.who.substring(6, 10))
        .setMemberCount(groupMetadata.participants.length)
        .setGuildName(name)
        .setAvatar(picxs)
        .setColor('border', '#00100C')
        .setColor('username-box', '#00100C')
        .setColor('discriminator-box', '#00100C')
        .setColor('message-box', '#00100C')
        .setColor('title', '#00FFFF')
        .setBackground('https://www.photohdx.com/images/2016/05/red-blurry-background.jpg')
        .toAttachment()
        const base64 = `data:image/png;base64,${bye.toBuffer().toString('base64')}`
        await Nawaf.sendFile(event.chat, base64, 'welcome.png', `Bye ${pushname}, we will miss you~`)
      }
    } catch (err) {
      console.error(err)
    }
  })
}

create(options(start))
  .then((Nawaf) => start(Nawaf))
  .catch((err) => console.error(err))

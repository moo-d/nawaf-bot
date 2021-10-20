/********** MODULES **********/
const { decryptMedia, Client } = require('@open-wa/wa-automate')
const fs = require('fs-extra')
const Nekos = require('nekos.life')
const neko = new Nekos()
const os = require('os')
const nhentai = require('nhentai-js')
const { API } = require('nhentai-api')
const api = new API()
const sagiri = require('sagiri')
const NanaAPI = require('nana-api')
const nana = new NanaAPI()
const fetch = require('node-fetch')
const isPorn = require('is-porn')
const exec = require('await-exec')
const config = require('../config.json')
const saus = sagiri(config.nao, { results: 5 })
const axios = require('axios')
const tts = require('node-gtts')
const nekobocc = require('nekobocc')
const ffmpeg = require('fluent-ffmpeg')
const bent = require('bent')
const path = require('path')
const ms = require('parse-ms')
const toMs = require('ms')
const canvas = require('canvacord')
const mathjs = require('mathjs')
const emojiUnicode = require('emoji-unicode')
const moment = require('moment-timezone')
const ocrtess = require('node-tesseract-ocr')
const translate = require('@vitalets/google-translate-api')
moment.tz.setDefault('Asia/Jakarta').locale('id')
const genshin = require('genshin')
const google = require('google-it')
const cron = require('node-cron')
/********** END OF MODULES **********/

/********** UTILS **********/
const { msgFilter, color, processTime, isUrl, createSerial } = require('../tools')
const { nsfw, weeaboo, downloader, fun, misc, toxic } = require('../lib')
const { uploadImages } = require('../tools/fetcher')
const { ind } = require('./text/lang')
const { daily, level, afk, reminder, premium, limit} = require('../function')
const cd = 4.32e+7
const limitCount = 25
const errorImg = 'https://i.ibb.co/jRCpLfn/user.png'
const dateNow = moment.tz('Asia/Jakarta').format('DD-MM-YYYY')
const ocrconf = {
    lang: 'eng',
    oem: '1',
    psm: '3'
}
/********** END OF UTILS **********/

/********** DATABASES **********/
const _nsfw = JSON.parse(fs.readFileSync('./database/group/nsfw.json'))
const _antilink = JSON.parse(fs.readFileSync('./database/group/antilink.json'))
const _antinsfw = JSON.parse(fs.readFileSync('./database/group/antinsfw.json'))
const _leveling = JSON.parse(fs.readFileSync('./database/group/leveling.json'))
const _welcome = JSON.parse(fs.readFileSync('./database/group/welcome.json'))
const _autosticker = JSON.parse(fs.readFileSync('./database/group/autosticker.json'))
const _ban = JSON.parse(fs.readFileSync('./database/bot/banned.json'))
const _premium = JSON.parse(fs.readFileSync('./database/bot/premium.json'))
const _mute = JSON.parse(fs.readFileSync('./database/bot/mute.json'))
const _level = JSON.parse(fs.readFileSync('./database/user/level.json'))
let _limit = JSON.parse(fs.readFileSync('./database/user/limit.json'))
const _afk = JSON.parse(fs.readFileSync('./database/user/afk.json'))
const _reminder = JSON.parse(fs.readFileSync('./database/user/reminder.json'))
const _daily = JSON.parse(fs.readFileSync('./database/user/daily.json'))
const _stick = JSON.parse(fs.readFileSync('./database/bot/sticker.json'))
const _setting = JSON.parse(fs.readFileSync('./database/bot/setting.json'))
let { memberLimit, groupLimit } = _setting
/********** END OF DATABASES **********/

/********** MESSAGE HANDLER **********/
// eslint-disable-next-line no-undef
module.exports = msgHandler = async (bocchi = new Client(), message) => {
    try {
        const { type, id, from, t, sender, isGroupMsg, chat, caption, isMedia, mimetype, quotedMsg, quotedMsgObj, mentionedJidList } = message
        let { body } = message
        const { name, formattedTitle } = chat
        let { pushname, verifiedName, formattedName } = sender
        pushname = pushname || verifiedName || formattedName
        const botNumber = await bocchi.getHostNumber() + '@c.us'
        const blockNumber = await bocchi.getBlockedIds()
        const ownerNumber = config.ownerBot
        const authorWm = config.authorStick
        const packWm = config.packStick
        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        const groupAdmins = isGroupMsg ? await bocchi.getGroupAdmins(groupId) : ''
        const time = moment(t * 1000).format('DD/MM/YY HH:mm:ss')

        const cmd = caption || body || ''
        const command = cmd.toLowerCase().split(' ')[0] || ''
        const prefix = /^[°•π÷×¶∆£¢€¥®™✓=|~!#$%^&./\\©^]/.test(command) ? command.match(/^[°•π÷×¶∆£¢€¥®™✓=|~!#$%^&./\\©^]/gi) : '-' // Multi-Prefix by: VideFrelan
        const chats = (type === 'chat') ? body : ((type === 'image' || type === 'video')) ? caption : ''
        body = (type === 'chat' && body.startsWith(prefix)) ? body : (((type === 'image' || type === 'video') && caption) && caption.startsWith(prefix)) ? caption : ''
        const args = body.trim().split(/ +/).slice(1)
        const uaOverride = config.uaOverride
        const q = args.join(' ')
        const ar = args.map((v) => v.toLowerCase())
        const url = args.length !== 0 ? args[0] : ''

        /********** VALIDATOR **********/
        const isCmd = body.startsWith(prefix)
        const isBlocked = blockNumber.includes(sender.id)
        const isOwner = sender.id === ownerNumber
        const isBanned = _ban.includes(sender.id)
        const isPremium = premium.checkPremiumUser(sender.id, _premium)
        const isGroupAdmins = isGroupMsg ? groupAdmins.includes(sender.id) : false
        const isBotGroupAdmins = isGroupMsg ? groupAdmins.includes(botNumber) : false
        const isNsfw = isGroupMsg ? _nsfw.includes(groupId) : false
        const isWelcomeOn = isGroupMsg ? _welcome.includes(groupId) : false
        const isDetectorOn = isGroupMsg ? _antilink.includes(groupId) : false
        const isLevelingOn = isGroupMsg ? _leveling.includes(groupId) : false
        const isAutoStickerOn = isGroupMsg ? _autosticker.includes(groupId) : false
        const isAntiNsfw = isGroupMsg ? _antinsfw.includes(groupId) : false
        const isMute = isGroupMsg ? _mute.includes(chat.id) : false
        const isAfkOn = isGroupMsg ? afk.checkAfkUser(sender.id, _afk) : false
        const isQuotedImage = quotedMsg && quotedMsg.type === 'image'
        const isQuotedVideo = quotedMsg && quotedMsg.type === 'video'
        const isQuotedSticker = quotedMsg && quotedMsg.type === 'sticker'
        const isQuotedGif = quotedMsg && quotedMsg.mimetype === 'image/gif'
        const isQuotedAudio = quotedMsg && quotedMsg.type === 'audio'
        const isQuotedVoice = quotedMsg && quotedMsg.type === 'ptt'
        const isImage = type === 'image'
        const isVideo = type === 'video'
        const isAudio = type === 'audio'
        const isVoice = type === 'ptt'
        const isGif = mimetype === 'image/gif'
        /********** END OF VALIDATOR **********/

        // Automate
        premium.expiredCheck(_premium)
        cron.schedule('0 0 * * *', () => {
            const reset = []
            _limit = reset
            console.log('Hang tight, it\'s time to reset usage limits...')
            fs.writeFileSync('./database/user/limit.json', JSON.stringify(_limit))
            console.log('Success!')
        }, {
            scheduled: true,
            timezone: 'Asia/Jakarta'
        })

            // ROLE (Change to what you want, or add) and you can change the role sort based on XP.
            const levelRole = level.getLevelingLevel(sender.id, _level)
            var role = 'Copper V'
            if (levelRole >= 5){
                role = 'Copper IV'
            } 
            if (levelRole >= 10){
                role = 'Copper III'
            } 
            if (levelRole >= 15){
                role = 'Copper II'
            } 
            if (levelRole >= 20){
                role = 'Copper I'
            } 
            if (levelRole >= 25) {
                role = 'Silver V'
            } 
            if (levelRole >= 30) {
                role = 'Silver IV'
            } 
            if (levelRole >= 35) {
                role = 'Silver III'
            } 
            if (levelRole >= 40) {
                role = 'Silver II'
            } 
            if (levelRole >= 45) {
                role = 'Silver I'
            } 
            if (levelRole >= 50) {
                role = 'Gold V'
            } 
            if (levelRole >= 55) {
                role = 'Gold IV'
            } 
            if (levelRole >= 60) {
                role = 'Gold III'
            } 
            if (levelRole >= 65) {
                role = 'Gold II'
            } 
            if (levelRole >= 70) {
                role = 'Gold I'
            } 
            if (levelRole >= 75) {
                role = 'Platinum V'
            } 
            if (levelRole >= 80) {
                role = 'Platinum IV'
            } 
            if (levelRole >= 85) {
                role = 'Platinum III'
            } 
            if (levelRole >= 90) {
                role = 'Platinum II'
            } 
            if (levelRole >= 95) {
                role = 'Platinum I'
            } 
            if (levelRole >= 100) {
                role = 'Exterminator'
            }
        if (isGroupMsg && !level.isGained(sender.id) && !isBanned && isLevelingOn) {
            try {
                level.addCooldown(sender.id)
                const currentLevel = level.getLevelingLevel(sender.id, _level)
                const amountXp = Math.floor(Math.random() * (15 - 25 + 1) + 15)
                const requiredXp = 5 * Math.pow(currentLevel, 2) + 50 * currentLevel + 100
                level.addLevelingXp(sender.id, amountXp, _level)
                if (requiredXp <= level.getLevelingXp(sender.id, _level)) {
                    level.addLevelingLevel(sender.id, 1, _level)
                    const userLevel = level.getLevelingLevel(sender.id, _level)
                    const fetchXp = 5 * Math.pow(userLevel, 2) + 50 * userLevel + 100
                    await bocchi.reply(from, `*── 「 LEVEL UP 」 ──*\n\n➸ *Name*: ${pushname}\n➸ *XP*: ${level.getLevelingXp(sender.id, _level)} / ${fetchXp}\n➸ *Level*: ${currentLevel} -> ${level.getLevelingLevel(sender.id, _level)} 🆙 \n➸ *Role*: *${role}*`, id)
                }
            } catch (err) {
                console.error(err)
            }
        }

        // Anti group link detector
        if (isGroupMsg && !isGroupAdmins && isBotGroupAdmins && isDetectorOn && !isOwner) {
            if (chats.match(new RegExp(/(https:\/\/chat.whatsapp.com)/gi))) {
                const valid = await bocchi.inviteInfo(chats)
                if (valid) {
                    console.log(color('[KICK]', 'red'), color('Received a group link and it is a valid link!', 'yellow'))
                    await bocchi.reply(from, ind.linkDetected(), id)
                    await bocchi.removeParticipant(groupId, sender.id)
                } else {
                    console.log(color('[WARN]', 'yellow'), color('Received a group link but it is not a valid link!', 'yellow'))
                }
            }
        }

        // Anti virtext by: @VideFrelan
        if (isGroupMsg && !isGroupAdmins && isBotGroupAdmins && !isOwner) {
           if (chats.length > 5000) {
               await bocchi.sendTextWithMentions(from, `@${sender.id} is detected sending a virtext.\nYou will be kicked!`)
               await bocchi.removeParticipant(groupId, sender.id)
            }
        } 
               
        // Sticker keywords by: @hardianto02_
        if (isGroupMsg && isRegistered) {
            if (_stick.includes(chats)) {
                await bocchi.sendImageAsSticker(from, `./temp/sticker/${chats}.webp`, { author: authorWm, pack: packWm })
            }
        }

        // Anti fake group link detector by: Baguettou
        if (isGroupMsg && !isGroupAdmins && isBotGroupAdmins && isDetectorOn && !isOwner) {
            if (chats.match(new RegExp(/(https:\/\/chat.(?!whatsapp.com))/gi))) {
                console.log(color('[KICK]', 'red'), color('Received a fake group link!', 'yellow'))
                await bocchi.reply(from, 'Fake group link detected!', id)
                await bocchi.removeParticipant(groupId, sender.id)
            }
        }

        // Anti NSFW link
        if (isGroupMsg && !isGroupAdmins && isBotGroupAdmins && isAntiNsfw && !isOwner) {
            if (isUrl(chats)) {
                const classify = new URL(isUrl(chats))
                console.log(color('[FILTER]', 'yellow'), 'Checking link:', classify.hostname)
                isPorn(classify.hostname, async (err, status) => {
                    if (err) return console.error(err)
                    if (status) {
                        console.log(color('[NSFW]', 'red'), color('The link is classified as NSFW!', 'yellow'))
                        await bocchi.reply(from, ind.linkNsfw(), id)
                        await bocchi.removeParticipant(groupId, sender.id)
                    } else {
                        console.log(('[NEUTRAL]'), color('The link is safe!'))
                    }
                })
            }
        }

        // Auto sticker
        if (isGroupMsg && isAutoStickerOn && isMedia && isImage && !isCmd) {
            const mediaData = await decryptMedia(message, uaOverride)
            const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
            await bocchi.sendImageAsSticker(from, imageBase64, { author: authorWm, pack: packWm })
            console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
        }

        // Auto sticker video
        if (isGroupMsg && isAutoStickerOn && isMedia && isVideo && !isCmd) {
            const mediaData = await decryptMedia(message, uaOverride)
            const videoBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
            await bocchi.sendMp4AsSticker(from, videoBase64, { stickerMetadata: true, pack: packWm, author: authorWm, fps: 30, startTime: '00:00:00.0', endTime : '00:00:05.0', crop: false, loop: 0 })
            console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
        }

        // AFK by Slavyan
        if (isGroupMsg) {
            for (let ment of mentionedJidList) {
                if (afk.checkAfkUser(ment, _afk)) {
                    const getId = afk.getAfkId(ment, _afk)
                    const getReason = afk.getAfkReason(getId, _afk)
                    const getTime = afk.getAfkTime(getId, _afk)
                    await bocchi.reply(from, ind.afkMentioned(getReason, getTime), id)
                }
            }
            if (afk.checkAfkUser(sender.id, _afk) && !isCmd) {
                _afk.splice(afk.getAfkPosition(sender.id, _afk), 1)
                fs.writeFileSync('./database/user/afk.json', JSON.stringify(_afk))
                await bocchi.sendText(from, ind.afkDone(pushname))
            }
        }

        // Mute
        if (isCmd && isMute && !isGroupAdmins && !isOwner && !isPremium) return
        
        // Ignore banned and blocked users
        if (isCmd && (isBanned || isBlocked) && !isGroupMsg) return console.log(color('[BAN]', 'red'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
        if (isCmd && (isBanned || isBlocked) && isGroupMsg) return console.log(color('[BAN]', 'red'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle))

        // Anti spam
        if (isCmd && msgFilter.isFiltered(from) && !isGroupMsg) return console.log(color('[SPAM]', 'red'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
        if (isCmd && msgFilter.isFiltered(from) && isGroupMsg) return console.log(color('[SPAM]', 'red'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle))

        // Log
        if (isCmd && !isGroupMsg) {
            console.log(color('[CMD]'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
            await bocchi.sendSeen(from)
        }
        if (isCmd && isGroupMsg) {
            console.log(color('[CMD]'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle))
            await bocchi.sendSeen(from)
        }
        
        // Anti spam
        if (isCmd && !isPremium && !isOwner) msgFilter.addFilter(from)

        switch (command) {
            if (!isGroupMsg) {
            case prefix+'level':
                if (!isLevelingOn) return await bocchi.reply(from, ind.levelingNotOn(), id)
                const userLevel = level.getLevelingLevel(sender.id, _level)
                const userXp = level.getLevelingXp(sender.id, _level)
                const ppLink = await bocchi.getProfilePicFromServer(sender.id)
                if (ppLink === undefined) {
                    var pepe = errorImg
                } else {
                    pepe = ppLink
                }
                const requiredXp = 5 * Math.pow(userLevel, 2) + 50 * userLevel + 100
                const rank = new canvas.Rank()
                    .setAvatar(pepe)
                    .setLevel(userLevel)
                    .setLevelColor('#ffa200', '#ffa200')
                    .setRank(Number(level.getUserRank(sender.id, _level)))
                    .setCurrentXP(userXp)
                    .setOverlay('#000000', 100, false)
                    .setRequiredXP(requiredXp)
                    .setProgressBar('#ffa200', 'COLOR')
                    .setBackground('COLOR', '#000000')
                    .setUsername(pushname)
                    .setDiscriminator(sender.id.substring(6, 10))
                rank.build()
                    .then(async (buffer) => {
                        const imageBase64 = `data:image/png;base64,${buffer.toString('base64')}`
                        await bocchi.sendImage(from, imageBase64, 'rank.png', '', id)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case prefix+'leaderboard':
                if (!isLevelingOn) return await bocchi.reply(from, ind.levelingNotOn(), id)
                if (!isGroupMsg) return await bocchi.reply(from. ind.groupOnly(), id)
                const resp = _level
                _level.sort((a, b) => (a.xp < b.xp) ? 1 : -1)
                let leaderboard = '*── 「 LEADERBOARDS 」 ──*\n\n'
                try {
                    for (let i = 0; i < 10; i++) {
                        var roles = 'Copper V'
                        if (resp[i].level >= 5) {
                            roles = 'Copper IV'
                        } 
                         if (resp[i].level >= 10) {
                            roles = 'Copper III'
                        } 
                         if (resp[i].level >= 15) {
                            roles = 'Copper II'
                        } 
                         if (resp[i].level >= 20) {
                            roles = 'Copper I'
                        } 
                         if (resp[i].level >= 25) {
                            roles = 'Silver V'
                        } 
                         if (resp[i].level >= 30) {
                            roles = 'Silver IV'
                        } 
                         if (resp[i].level >= 35) {
                            roles = 'Silver III'
                        } 
                         if (resp[i].level >= 40) {
                            roles = 'Silver II'
                        } 
                         if (resp[i].level >= 45) {
                            roles = 'Silver I'
                        } 
                         if (resp[i].level >= 50) {
                            roles = 'Gold V'
                        } 
                         if (resp[i].level >= 55) {
                            roles = 'Gold IV'
                        } 
                         if (resp[i].level >= 60) {
                            roles = 'Gold III'
                        } 
                         if (resp[i].level >= 65) {
                            roles = 'Gold II'
                        } 
                         if (resp[i].level >= 70) {
                            roles = 'Gold I'
                        } 
                         if (resp[i].level >= 75) {
                            roles = 'Platinum V'
                        } 
                         if (resp[i].level >= 80) {
                            roles = 'Platinum IV'
                        } 
                         if (resp[i].level >= 85) {
                            roles = 'Platinum III'
                        } 
                         if (resp[i].level >= 90) {
                            roles = 'Platinum II'
                        } 
                         if (resp[i].level >= 95) {
                            roles = 'Platinum I'
                        } 
                         if (resp[i].level > 100) {
                            roles = 'Exterminator'
                        }
                        leaderboard += `${i + 1}. wa.me/${_level[i].id.replace('@c.us', '')}\n➸ *XP*: ${_level[i].xp} *Level*: ${_level[i].level}\n➸ *Role*: ${roles}\n\n`
                    }
                    await bocchi.reply(from, leaderboard, id)
                } catch (err) {
                    console.error(err)
                    await bocchi.reply(from, ind.minimalDb(), id)
                }
            break

            // Downloader
            case prefix+'joox': // By Hafizh
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, ind.wait(), id)
                const dataJoox = await axios.get(`https://api.vhtear.com/music?query=${q}&apikey=${config.vhtear}`)
                const cardJoox = new canvas.Spotify()
                    .setAuthor(dataJoox.data.result[0].penyanyi)
                    .setAlbum(dataJoox.data.result[0].album)
                    .setStartTimestamp(dataJoox.data.result[0].duration)
                    .setEndTimestamp(10)
                    .setImage(dataJoox.data.result[0].linkImg)
                    .setTitle(dataJoox.data.result[0].judul)
                cardJoox.build()
                    .then(async (buffer) => {
                        canvas.write(buffer, `${sender.id}_joox.png`)
                        await bocchi.sendFile(from, `${sender.id}_joox.png`, 'joox.png', ind.joox(dataJoox.data), id)
                        fs.unlinkSync(`${sender.id}_joox.png`)
                        await bocchi.sendFileFromUrl(from, dataJoox.data.result[0].linkMp3, 'joox.mp3', '', id)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case prefix+'igdl': // by: VideFrelan
            case prefix+'instadl':
                if (!isUrl(url) && !url.includes('instagram.com')) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, ind.wait(), id)
                downloader.insta(url)
                    .then(async ({ result }) => {
                        for (let i = 0; i < result.post.length; i++) {
                            if (result.post[i].type === 'image') {
                                await bocchi.sendFileFromUrl(from, result.post[i].urlDownload, 'igpostdl.jpg', `*...:* *Instagram Downloader* *:...*\n\nUsername: ${result.owner_username}\nCaption: ${result.caption}`, id)
                            } else if (result.post[i].type === 'video') {
                                await bocchi.sendFileFromUrl(from, result.post[i].urlDownload, 'igpostdl.mp4', `*...:* *Instagram Downloader* *:...*\n\nUsername: ${result.owner_username}\nCaption: ${result.caption}`, id)
                            }
                        }
                        console.log('Success sending Instagram media!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break 
            case prefix+'facebook':
            case prefix+'fb':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(pushname), id)
                if (!isUrl(url) && !url.includes('facebook.com')) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, ind.wait(), id)
                downloader.fb(url)
                    .then(async ({ result }) => {
                            await bocchi.sendFileFromUrl(from, result.VideoUrl, 'videofb.mp4', '', id)
                            console.log(from, 'Success sending Facebook video!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
                case prefix+'ytmp3':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isUrl(url) && !url.includes('youtu.be')) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, ind.wait(), id)
                downloader.ytdl(url)
                    .then(async ({result}) => {
                        if (Number(result.size.split(' MB')[0]) >= 30) {
                            await bocchi.reply(from, ind.musiclimit(), id)
                        } else {
                            await bocchi.sendFileFromUrl(from, result.imgUrl, `${result.title}.jpg`, ind.ytFound(result), id)
                            await bocchi.sendFileFromUrl(from, result.UrlMp3, `${result.title}.mp3`, '', id)
                            console.log('Success sending YouTube video!')
                        }
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case prefix+'ytmp4':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isUrl(url) && !url.includes('youtu.be')) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, ind.wait(), id)
                downloader.ytdl(url)
                    .then(async ({result}) => {
                        if (Number(result.size.split(' MB')[0]) >= 30) {
                            await bocchi.reply(from, ind.videoLimit(), id)
                        } else {
                            await bocchi.sendFileFromUrl(from, result.imgUrl, `${result.title}.jpg`, ind.ytFound(result), id)
                            await bocchi.sendFileFromUrl(from, result.UrlVideo, `${result.title}.mp3`, '', id)
                            console.log('Success sending YouTube video!')
                        }
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case prefix+'tiktokpic':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, ind.wait(), id)
                try {
                    console.log(`Get profile pic for ${q}`)
                    const tkt = await axios.get(`https://docs-jojo.herokuapp.com/api/tiktokpp?user=${q}`)
                    if (tkt.data.error) return bocchi.reply(from, tkt.data.error, id)
                    await bocchi.sendFileFromUrl(from, tkt.data.result, 'tiktokpic.jpg', 'Ini :D', id)
                    console.log('Success sending TikTok profile pic!')
                } catch (err) {
                    console.error(err)
                    await bocchi.reply(from, 'Error!', id)
                }
            break
            case prefix+'tiktoknowm': // by: VideFrelan
            case prefix+'tktnowm':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isUrl(url) && !url.includes('tiktok.com')) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, ind.wait(), id)
                downloader.tikNoWm(url)
                    .then(async ({ result }) => {
                        await bocchi.sendFileFromUrl(from, result.thumb, 'TiktokNoWM.jpg', `➸ *Username*: ${result.username}\n➸ *Caption*: ${result.caption}\n➸ *Uploaded on*: ${result.uploaded_on}\n\nSedang dikirim, sabar ya...`, id)
                        const responses = await fetch(result.link)
                        const buffer = await responses.buffer()
                        fs.writeFileSync(`./temp/${sender.id}_TikTokNoWm.mp4`, buffer)
                        await bocchi.sendFile(from, `./temp/${sender.id}_TikTokNoWm.mp4`, `${sender.id}_TikTokNoWm.mp4`, '', id)
                        console.log('Success sending TikTok video with no WM!')
                        fs.unlinkSync(`./temp/${sender.id}_TikTokNoWm.mp4`)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case prefix+'tiktok':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isUrl(url) && !url.includes('tiktok.com')) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, ind.wait(), id)
                downloader.tik(url)
                    .then(async ({ result })=> {
                        await bocchi.sendFileFromUrl(from, result.video, 'TikTok.mp4', '', id)
                        console.log('Success sending TikTok video!')
                    })
                    .catch(async (err) => {
                        console.log(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case prefix+'twitter':
            case prefix+'twt':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isUrl(url) && !url.includes('twitter.com')) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, ind.wait(), id)
                downloader.tweet(url)
                    .then(async (data) => {
                        if (data.type === 'video') {
                            const content = data.variants.filter((x) => x.content_type !== 'application/x-mpegURL').sort((a, b) => b.bitrate - a.bitrate)
                            const result = await misc.shortener(content[0].url)
                            console.log('Shortlink:', result)
                            await bocchi.sendFileFromUrl(from, content[0].url, 'video.mp4', `Link HD: ${result}`, id)
                                .then(() => console.log('Success sending Twitter media!'))
                                .catch(async (err) => {
                                    console.error(err)
                                    await bocchi.reply(from, 'Error!', id)
                                })
                        } else if (data.type === 'photo') {
                            for (let i = 0; i < data.variants.length; i++) {
                                await bocchi.sendFileFromUrl(from, data.variants[i], data.variants[i].split('/media/')[1], '', id)
                                .then(() => console.log('Success sending Twitter media!'))
                                .catch(async (err) => {
                                    console.error(err)
                                    await bocchi.reply(from, 'Error!', id)
                                })
                            }
                        }
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case prefix+'moddroid': // Chikaa Chantekkzz
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, ind.wait(), id)
                downloader.modroid(q)
                    .then(async ({ status, result }) => {
                        if (status !== 200) {
                            await bocchi.reply(from, 'Not found.', id)
                        } else {
                            await bocchi.sendFileFromUrl(from, result[0].image, 'ksk.jpg', `*「 MOD FOUND 」*\n\n➸ *APK*: ${result[0].title}\n\n➸ *Size*: ${result[0].size}\n➸ *Publisher*: ${result[0].publisher}\n➸ *Version*: ${result[0].latest_version}\n➸ *Genre*: ${result[0].genre}\n\n*Download link*\n${result[0].download}`, id)
                            console.log('Success sending APK mod!')
                        }
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case prefix+'happymod': // chikaa chantexxzz
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, ind.wait(), id)
                downloader.happymod(q)
                    .then(async ({ status, result }) => {
                        if (status !== 200) {
                            await bocchi.reply(from, 'Not found.', id)
                        } else {
                            await bocchi.sendFileFromUrl(from, result[0].image, 'ksk.jpg', `*「 MOD FOUND 」*\n\n➸ *APK*: ${result[0].title}\n\n➸ *Size*: ${result[0].size}\n➸ *Root*: ${result[0].root}\n➸ *Version*: ${result[0].version}\n➸ *Price*: ${result[0].price}\n\n*Download link*\n${result[0].download}`, id)
                            console.log('Success sending APK mod!')
                        }
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case prefix+'linedl': // chikaa chantexxzz
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (isGroupMsg) return await bocchi.reply(from, ind.pcOnly(), id)
                if (!isUrl(url) && !url.includes('store.line.me')) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                downloader.line(url)
                    .then(async (res) => {
                        await bocchi.sendFileFromUrl(from, res.thumb, 'line.png', `*「 LINE STICKER DOWNLOADER 」*\n\n➸ *Title*: ${res.title}\n➸ *Sticker type*: ${res.type}\n\n_Media sedang dikirim, mohon tunggu sebentar..._`, id)
                        for (let i = 0; i < res.sticker.length; i++) {
                            await bocchi.sendStickerfromUrl(from, `${res.sticker[i]}`, null, { author: authorWm, pack: packWm })
                            console.log('Success sending Line sticker!')
                        }
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
                 

            // Misc
            case prefix+'ocr': // by: VideFrelan
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (isMedia && isImage || isQuotedImage || isQuotedSticker) {
                    await bocchi.reply(from, ind.wait(), id)
                    const encryptMedia = isQuotedImage || isQuotedSticker ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    fs.writeFileSync(`./temp/${sender.id}.jpg`, mediaData)
                    ocrtess.recognize(`./temp/${sender.id}.jpg`, ocrconf)
                        .then(async (text) => {
                            await bocchi.reply(from, `*...:* *OCR RESULT* *:...*\n\n${text}`, id)
                            fs.unlinkSync(`./temp/${sender.id}.jpg`)
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await bocchi.reply(from, 'Error!', id)
                        })
                } else {
                    await bocchi.reply(from, ind.wrongFormat(), id)
                }
            break
            case prefix+'google': // chika-chantekkzz
            case prefix+'googlesearch':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, ind.wait(), id)
                google({ 'query': q, 'no-display': true })
                    .then(async (results) => {
                        let txt = `*── 「 GOOGLE SEARCH 」 ──*\n\n*by: rashidsiregar28*\n\n_*Search results for: ${q}*_`
                        for (let i = 0; i < results.length; i++) {
                            txt += `\n\n➸ *Title*: ${results[i].title}\n➸ *Desc*: ${results[i].snippet}\n➸ *Link*: ${results[i].link}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await bocchi.reply(from, txt, id)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case prefix+'say':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.sendText(from, q)
            break
            case prefix+'afk': // by Slavyan
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, ind.groupOnly(), id)
                if (isAfkOn) return await bocchi.reply(from, ind.afkOnAlready(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                const reason = q ? q : 'Nothing.'
                afk.addAfkUser(sender.id, time, reason, _afk)
                await bocchi.reply(from, ind.afkOn(pushname, reason), id)
            break
            case prefix+'lyric':
            case prefix+'lirik':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, ind.wait(), id)
                misc.lirik(q)
                    .then(async ({ result }) => {
                        if (result.code !== 200) return await bocchi.reply(from, 'Not found.', id)
                        await bocchi.reply(from, result.result, id)
                        console.log('Success sending lyric!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case prefix+'shortlink':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!isUrl(url)) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                const urlShort = await misc.shortener(url)
                await bocchi.reply(from, ind.wait(), id)
                await bocchi.reply(from, urlShort, id)
                console.log('Success!')
            break
            case prefix+'wikipedia':
            case prefix+'wiki':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, ind.wait(), id)
                misc.wiki(q)
                    .then(async ({ result, status }) => {
                        if (status !== 200) {
                            return await bocchi.reply(from, 'Not found.', id)
                        } else {
                            await bocchi.reply(from, result, id)
                            console.log('Success sending Wiki!')
                        }
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case prefix+'wikien': // By: VideFrelan
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, ind.wait(), id)
                misc.wikien(q)
                    .then(async ( { result }) => {
                        if (result.status !== '200') {
                            await bocchi.reply(from, 'Not Found!', id)
                        } else {
                            await bocchi.reply(from, `➸ *PageId*: ${result.pageid}\n➸ *Title*: ${result.title}\n➸ *Result*: ${result.desc}`, id)
                        }
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case prefix+'corona': // by CHIKAA CHANTEKKXXZZ
            case prefix+'coronavirus':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, ind.wait(), id)
                misc.corona(q)
                    .then(async (res) => {
                        await bocchi.sendText(from, '🌎️ Covid Info - ' + q.charAt(0).toUpperCase() + q.slice(1) + ' 🌍️\n\n✨️ Total Cases: ' + `${res.cases}` + '\n📆️ Today\'s Cases: ' + `${res.todayCases}` + '\n☣️ Total Deaths: ' + `${res.deaths}` + '\n☢️ Today\'s Deaths: ' + `${res.todayDeaths}` + '\n⛩️ Active Cases: ' + `${res.active}` + '.')
                        console.log('Success sending Result!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case prefix+'ttp': // CHIKAA CHANTEKKXXZZ
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, ind.wait(), id)
                misc.ttp(q)
                    .then(async (res) => {
                        await bocchi.sendImageAsSticker(from, res.base64, { author: authorWm, pack: packWm })
                        console.log('Success creating TTP!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case prefix+'genshininfo': // chika chantexxzz
            case prefix+'genshin':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, ind.wait(), id)
                try {
                    console.log('Searching for character...')
                    const character = await genshin.characters(q)
                    await bocchi.sendFileFromUrl(from, character.image, `${character.name}.jpg`, `*「 GENSHIN IMPACT 」*\n\n*${character.name}*\n${character.description}\n\n"_${character.quote}_" - ${character.name}\n\n➸ *Name*: ${character.name}\n➸ *Seiyuu*: ${character.cv}\n➸ *Region*: ${character.city}\n➸ *Rating*: ${character.rating}\n➸ *Vision*: ${character.element}\n➸ *Weapon*: ${character.weapon}\n\n${character.url}`)
                    console.log('Success sending Genshin Impact character!')
                } catch (err) {
                    console.error(err)
                    await bocchi.reply(from, 'Error or character not found!', id)
                }
            break
            case prefix+'jadwaltv': // Chika chantexxzz
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (ar.length !== 1) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                try {
                    const jtv = await axios.get(`http://api.hurtzcrafter.xyz/jadwaltv?channel=${ar[0]}`)
                    if (jtv.data.status === 'true') {
                        let jtvx = '*── 「 TV 」 ──*\n'
                        for (let i = 0; i < jtv.data.result.length; i++) {
                            jtvx += `\n${jtv.data.result[i].jam}: ${jtv.data.result[i].tayang}`
                        }
                        await bocchi.sendText(from, jtvx)
                    } else {
                        await bocchi.sendText(from, 'Channel not found!')
                    }
                } catch (err) {
                    console.error(err)
                    await bocchi.reply(from, 'Error!', id)
                }
            break
            case prefix+'instastory': // By: VideFrelan
            case prefix+'igstory':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return bocchi.reply(from, ind.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, ind.wait(), id)
                misc.its(q)
                    .then(async ({ result }) => {
                        for (let i = 0; i < result.story.itemlist.length; i++) {
                            const { urlDownload } = result.story.itemlist[i]
                            await bocchi.sendFileFromUrl(from, urlDownload, '', 'By: VideFrelan', id)
                            console.log('Success sending IG Story!')
                        }
                    })
            break
            case prefix+'kbbi':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, ind.wait(), id)
                misc.kbbi(q)
                    .then(async ({ result }) => {
                        await bocchi.reply(from, result.hasil, id)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case prefix+'linesticker':
            case prefix+'linestiker':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                if (!isOwner) limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, ind.wait(), id)
                misc.linesticker()
                    .then(async ({ result }) => {
                        let lines = '*── 「 LINE STICKERS 」 ──*'
                        for (let i = 0; i < result.hasil.length; i++) {
                            lines +=  `\n\n➸ *Title*: ${result.hasil[i].title}\n➸ *URL*: ${result.hasil[i].uri}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await bocchi.reply(from, lines, id)
                        console.log('Success sending sticker Line!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case prefix+'jadwalsholat':
            case prefix+'jadwalsolat':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                await bocchi.reply(from, ind.wait(), id)
                misc.jadwalSholat(q)
                    .then((data) => {
                        data.map(async ({isya, subuh, dzuhur, ashar, maghrib, terbit}) => {
                            const x = subuh.split(':')
                            const y = terbit.split(':')
                            const xy = x[0] - y[0]
                            const yx = x[1] - y[1]
                            const perbandingan = `${xy < 0 ? Math.abs(xy) : xy} jam ${yx < 0 ? Math.abs(yx) : yx} menit`
                            const msg = `Jadwal sholat untuk ${q} dan sekitarnya ( *${dateNow}* )\n\nDzuhur: ${dzuhur}\nAshar: ${ashar}\nMaghrib: ${maghrib}\nIsya: ${isya}\nSubuh: ${subuh}\n\nDiperkirakan matahari akan terbit pada pukul ${terbit} dengan jeda dari subuh sekitar ${perbandingan}`
                            await bocchi.reply(from, msg, id)
                            console.log('Success sending jadwal sholat!')
                        })
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case prefix+'gempa':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                await bocchi.reply(from, ind.wait(), id)
                misc.bmkg()
                    .then(async ({ kedalaman, koordinat, lokasi, magnitude, map, potensi, waktu }) => {
                        const teksInfo = `${lokasi}\n\nKoordinat: ${koordinat}\nKedalaman: ${kedalaman}\nMagnitudo: ${magnitude} SR\nPotensi: ${potensi}\n\n${waktu}`
                        await bocchi.sendFileFromUrl(from, map, 'gempa.jpg', teksInfo, id)
                        console.log('Success sending info!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case prefix+'igstalk':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, ind.wait(), id)
                misc.igStalk(q)
                    .then(async ({ graphql }) => {
                        if (graphql === undefined) {
                            await bocchi.reply(from, 'Not found.', id)
                        } else {
                            const { biography, edge_followed_by, edge_follow, full_name, is_private, is_verified, profile_pic_url_hd, username, edge_owner_to_timeline_media } = graphql.user
                            const text = `*── 「 IG STALK 」 ──*\n\n➸ *Username*: ${username}\n➸ *Bio*: ${biography}\n➸ *Full name*: ${full_name}\n➸ *Followers*: ${edge_followed_by.count}\n➸ *Followings*: ${edge_follow.count}\n➸ *Private*: ${is_private ? 'Yes' : 'No'}\n➸ *Verified*: ${is_verified ? 'Yes' : 'No'}\n➸ *Total posts*: ${edge_owner_to_timeline_media.count}`
                            await bocchi.sendFileFromUrl(from, profile_pic_url_hd, 'insta.jpg', text, id)
                            console.log('Success sending IG stalk!')
                        }
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case prefix+'gsmarena':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, ind.wait(), id)
                try {
                    misc.gsmarena(q)
                        .then(async ({ result }) => {
                            await bocchi.sendFileFromUrl(from, result.image, `${result.title}.jpg`, ind.gsm(result), id)
                            console.log('Success sending phone info!')
                        })
                } catch (err) {
                    console.error(err)
                    await bocchi.reply(from, 'Error!', id)
                }
            break
            case prefix+'receipt':
            case prefix+'resep':
                if (!isRegistered) return await bocchi.reply(from, ind.notRegistered(), id)
                if (!q) return await bocchi.reply(from, ind.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, ind.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, ind.wait(), id)
                try {
                    misc.resep(q)
                        .then(async ({ result }) => {
                            await bocchi.sendFileFromUrl(from, result.image, `${result.title}.jpg`, ind.receipt(result), id)
                            console.log('Success sending food receipt!')
                        })
                } catch (err) {
                    console.error(err)
                    await bocchi.reply(from, 'Error!', id)
                }
            break

            } else {
              await bocchi.reply(from, ind.groupOnly(), id)
            }

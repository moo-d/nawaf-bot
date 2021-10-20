/* eslint-disable quotes */
const { prefix } = require('../../../config.json')

exports.wait = () => {
    return `رجاء انتظر لحظة~`
}

exports.ok = () => {
    return `Ok desu~`
}

exports.wrongFormat = () => {
    return `!لم اجد الامر الي تبحث عنه شوف الاوامر وتاكد زين *${prefix}menu*.`
}

exports.emptyMess = () => {
    return `رجاء ادخل الرسالة!`
}

exports.cmdNotFound = (cmd) => {
    return `الامر *${prefix}${cmd}* لم اجده!`
}

exports.blocked = (ownerNumber) => {
    return `ممنوع تتصل على البوت!وببلك كلم المطور ولاتعيدها ك سويتي؟!\n\nContact the owner: wa.me/${ownerNumber.replace('@c.us', '')}`
}

exports.ownerOnly = () => {
    return `هذا الامر فقط المطور يستطيع استخدامه!`
}

exports.doneOwner = () => {
    return ` المطور ساما`
}

exports.groupOnly = () => {
    return `هذا الامر يستخدم فقط في القروب!`
}

exports.adminOnly = () => {
    return `هذا الامر يستخدم في قروب المشرفين فقط!`
}

exports.notNsfw = () => {
    return `هذا الامر لم يتم تمكينه!`
}

exports.nsfwOn = () => {
    return `هذاالامر *تم تشغيله*!`
}

exports.nsfwOff = () => {
    return `هذا الامر تم *ايقافه*!`
}

exports.nsfwAlready = () => {
    return `هذا الامر تم تشغيله مسبقا.`
}

exports.addedGroup = (chat) => {
    return `شكرا لاضافتي يامشرف *${chat.contact.name}*!\n\nPlease register by typing:\n*${prefix}register* name | age`
}

exports.nhFalse = () => {
    return `كود خاطئ !`
}

exports.listBlock = (blockNumber) => {
    return `
*── 「 عار عليك 」 ──*

Total blocked: *${blockNumber.length}* user(s)\n
    `
}

exports.notPremium = () => {
    return `اسف هذا الامر يستخدمه فقط فئة البرايم.`
}

exports.notAdmin = () => {
    return `المستخدم غير مشرف!`
}

exports.adminAlready = () => {
    return `لايمكنني اعطائه اشراف وهو مشرف!`
}

exports.botNotPremium = () => {
    return `هذا البوت لايدعم فئة البرايم رجاء تواصل مع المطور.`
}

exports.botNotAdmin = () => {
    return `خلني مشرف اول!`
}

exports.ytFound = (res) => {
    return `
*── 「 يوتيوب  」 ──*

Video has been found!
➸ *Title*: ${res.title}
➸ *Description*:
${res.desc}
➸ *Duration*: ${res.duration}
    
المقطع قاعد ينرسل انتظر من فضلك...
    `
}

exports.notRegistered = () => {
    return `انت غير معرف في قاعدة بيناتنا!\n\n اضف نفسك اليها بكتابة:\n*${prefix}register* الاسم | العمر`
}

exports.registered = (name, age, userId, time, serial) => {
    return `
*── 「 تمت اضافة بيناتك 」 ──*
    
Your account has been created with data below:
➸ *Name*: ${name}
➸ *Age*: ${age}
➸ *ID*: ${userId}
➸ *Registered time*: ${time}
➸ *Serial*: ${serial}
    
Note:
Don't share your *serial* to anyone!
    
Type *${prefix}rules* first ok~
    `
}

exports.registeredAlready = () => {
    return `You've registered before.`
}

exports.received = (pushname) => {
    return `Hello ${pushname}!\nThank you for reporting, we will work on it ASAP.`
}

exports.daily = (time) => {
    return `Sorry, but you have reached the limit using this commands.\nPlease wait *${time.hours}* hour(s) *${time.minutes}* minute(s) *${time.seconds}* second(s) more.`
}


exports.musiclimit = () => {
    return `The Music size is too large!`
}

exports.videoLimit = () => {
    return `The video size is too large!`
}

exports.joox = (result) => {
    return `
*── 「 JOOX 」 ──*

Song has been found!
➸ *Artist*: ${result[0].penyanyi}
➸ *Title*: ${result[0].judul}
➸ *Album*: ${result[0].album}
➸ *Ext*: ${result[0].ext}
➸ *Size*: ${result[0].filesize}
➸ *Duration*: ${result[0].duration}
    
Media is being send, please wait...
    `
}

exports.gsm = (result) => {
    return `
*── 「 GSMARENA 」 ──*

➸ *Model*: ${result.title}
➸ *Spesification*: ${result.spec}
    `
}

exports.receipt = (result) => {
    return `
*${result.title}*

${result.desc}

➸ *Ingredients*: ${result.bahan}
➸ *Steps*:
${result.cara}
    `
}

exports.ytResult = (urlyt, title, channel, duration, views) => {
    return `
*── 「 YOUTUBE 」 ──*

➸ *Title*: ${title}
➸ *Channel*: ${channel}
➸ *Duration*: ${duration}
➸ *Views*: ${views}
➸ *Link*: ${urlyt}
    `
}

exports.profile = (username, status, premi, benet, adm, level, requiredXp, xp) => {
    return `
*── 「 USER INFO」 ──*

➸ *Username*: ${username}
➸ *Status*: ${status}
➸ *Premium*: ${premi}
➸ *Banned*: ${benet}
➸ *Admin*: ${adm}

=_=_=_=_=_=_=_=_=_=_=_=_=

*── 「 PROGRESS 」 ──*

➸ *Level*: ${level}
➸ *XP*: ${xp} / ${requiredXp}
    `
}

exports.detectorOn = (name, formattedTitle) => {
    return `
*── 「 ANTI GROUP LINK 」 ──*

Attention for all *${(name || formattedTitle)}* members.
This group has an anti-group link detector, if one of you sending a group link then you'll be kicked immediately.

Thank you for your attention.
- Admin *${(name || formattedTitle)}*
    `
}

exports.detectorOff = () => {
    return `Anti-group link feature was successfully *disabled*!`
}

exports.detectorOnAlready = () => {
    return `Anti-group link feature has been enabled before.`
}

exports.antiNsfwOn = (name, formattedTitle) => {
    return `
*── 「 ANTI NSFW LINK 」 ──*

Attention for all *${(name || formattedTitle)}* members.
This group has an anti-NSFW link detector, if one of you sending a NSFW link then you'll be kicked immediately.

Thank you for your attention.
- Admin *${(name || formattedTitle)}*
    `
}

exports.antiNsfwOff = () => {
    return `Anti-NSFW link feature was successfully *disabled*!`
}

exports.antiNsfwOnAlready = () => {
    return `Anti-NSFW link feature has been enabled before.`
}

exports.linkDetected = () => {
    return `
*── 「 ANTI GROUP LINK 」 ──*

You've sent a group link!
Sorry, but you have to leave...
    `
}

exports.levelingOn = () => {
    return `Leveling feature was successfully *enabled*!`
}

exports.levelingOff = () => {
    return `Leveling feature was successfully *disabled*!`
}

exports.levelingOnAlready = () => {
    return `Leveling feature has been enabled before.`
}

exports.levelingNotOn = () => {
    return `Leveling feature hasn't been enabled!`
}

exports.levelNull = () => {
    return `You don't have any level yet!`
}

exports.welcome = (event) => {
    return `Welcome @${event.who.replace('@c.us', '')}!`
}

exports.welcomeOn = () => {
    return `Welcome feature was successfully *enabled*!`
}

exports.welcomeOff = () => {
    return `Welcome feature was successfully *disabled*!`
}

exports.welcomeOnAlready = () => {
    return `Welcome feature has been enabled before.`
}

exports.minimalDb = () => {
    return `Need at least *10* users that have a level in database!`
}

exports.autoStikOn = () => {
    return `Auto-sticker feature was successfully *enabled*!`
}

exports.autoStikOff = () => {
    return `Auto-sticker feature was successfully *enabled*!`
}

exports.autoStikOnAlready = () => {
    return `Auto-sticker feature has been enabled before.`
}

exports.afkOn = (pushname, reason) => {
    return `
*── 「 AFK MODE 」 ──*
    
AFK feature has been successfully *enabled*!
➸ *Username*: ${pushname}
➸ *Reason*: ${reason}
    `
}

exports.afkOnAlready = () => {
    return `AFK feature has been enabled before.`
}

exports.afkMentioned = (getReason, getTime) => {
    return `
*── 「 AFK MODE 」 ──*

Sssttt! This person in currently AFK, don't bother!
➸ *Reason*: ${getReason}
➸ *Since*: ${getTime}
    `
}

exports.afkDone = (pushname) => {
    return `*${pushname}* is back from AFK, welcome~`
}

exports.gcMute = () => {
    return `
*── 「 MUTED 」 ──*
    
Only admins who can send message in this group.
    `
}

exports.gcUnmute = () => {
    return `
*── 「 UNMUTED 」 ──*

All members can send message in this group now.
    `
}

exports.notNum = (q) => {
    return `"${q}", are not a numbers!`
}

exports.playstore = (app_id, title, developer, description, price, free) => {
    return `
*── 「 PLAY STORE 」 ──*
    
➸ *Name*: ${title}
➸ *ID*: ${app_id}
➸ *Developer*: ${developer}
➸ *Free*: ${free}
➸ *Price*: ${price}
➸ *Description*: ${description}
    `
}

exports.shopee = (nama, harga, terjual, shop_location, description, link_product) => {
    return `
*── 「 SHOPEE 」 ──*

➸ *Name*: ${nama}
➸ *Price*: ${harga}
➸ *Sold*: ${terjual}
➸ *Location*: ${shop_location}
➸ *Product link*: ${link_product}
➸ *Description*: ${description}
    `
}

exports.registeredFound = (name, age, time, serial, userId) => {
    return `
*── 「 REGISTERED 」 ──* 

Account has been found!
➸ *Name*: ${name}
➸ *Age*: ${age}
➸ *ID*: ${userId}
➸ *Registered time*: ${time}
➸ *Serial*: ${serial}
    `
}

exports.registeredNotFound = (serial) => {
    return `Account with serial: *${serial}* not found!`
}

exports.ytPlay = (result) => {
    return `
*── 「 PLAY 」 ──*

➸ *Title*: ${result.title}
➸ *Duration*: ${result.duration}
➸ *Link*: ${result.url}

Media is being send, please wait...
    `
}

exports.pcOnly = () => {
    return `This command can only be used in private chat!`
}

exports.linkNsfw = () => {
    return `
*── 「 ANTI NSFW LINK 」 ──*

You've sent a group link!
Sorry, but you have to leave...
    `
}

exports.ageOld = () => {
    return `You're too old for using this feature! Please go back to your youth to be able to using this feature.`
}

exports.menuText = () => {
    return `
╔══❉ *𝐓𝐞𝐱𝐭 𝐌𝐚𝐤𝐞𝐫 (VF)* ❉═══
║
║ For spaces, use *+*
║ Example: ${prefix}text1 neon good+morning
║
╟⊱ *${prefix}text1 burnpaper* _text_
╟⊱ *${prefix}text1 candlemug* _text_
╟⊱ *${prefix}text1 lovemsg* _text_
╟⊱ *${prefix}text1 mugflower* _text_
╟⊱ *${prefix}text1 narutobanner* _text_
╟⊱ *${prefix}text1 paperonglass* _text_
╟⊱ *${prefix}text1 romancetext* _text_
╟⊱ *${prefix}text1 shadowtext* _text_
╟⊱ *${prefix}text1 tiktokeffect* _text_
║
╚══❉ *BocchiBot* ❉════
    `
}

exports.fakeLink = () => {
    return `Ow, this link looks kinda suspicious, for the security of the members of this group I'm gonna kick you.\nBye~.`
}

exports.muteChatOn = () => {
    return `Successfully *mute* bot for this group!`
}

exports.muteChatOff = () => {
    return `Successfully *unmute* bot for this group!`
}

exports.muteChatOnAlready = () => {
    return `Bot is already muted in this group!`
}

exports.randomQuran = (ranquran) => {
    return `
*── 「 AL-QUR'AN 」 ──*

*Surah name*: ${ranquran.data.result.nama} / ${ranquran.data.result.asma}
*Meaning*: ${ranquran.data.result.arti}
*Number*: ${ranquran.data.result.nomor}
*Description*: ${ranquran.data.result.keterangan}
*Audio link*: ${ranquran.data.result.audio}
    `
}

exports.hadis = () => {
    return `
*── 「 HADIS 」 ──*

List of hadees:
1. Bukhari hadees has 6638 hadees
    _usage_: ${prefix}hadees bukhari 1
2. Muslim hadees has 4930 hadees
    _usage_: ${prefix}hadees muslim 25
3. Tirmidzi hadees has 3625 hadees
    _usage_: ${prefix}hadees tirmidzi 10
4. Nasai hadees has 5364 hadees
    _usage_: ${prefix}hadees nasai 6
5. Ahmad hadees 4305 hadees
    _usage_: ${prefix}hadees ahmad 5
6. Abu Daud hadees 4419 hadees
    _usage_: ${prefix}hadees abudaud 45
7. Malik hadees 1587 hadees
    _usage_: ${prefix}hadees malik 45
8. Ibnu Majah hadees 4285 hadees
    _usage_: ${prefix}hadees ibnumajah 8
9. Darimi hadees 2949 hadees
    _usage_: ${prefix}hadees darimi 3
    `
}

exports.limit = () => {
    return `
*── 「 LIMIT 」 ──*

You ran out of usage limit! Please do the following:
❏ *_Wait until 12:00 AM (GMT+7)_*
    `
}

exports.asmaulHusna = (assna) => {
    return `
*── 「 ASMAUL HUSNA 」 ──*

*${assna.name}*
❏ *Number*: ${assna.number}
❏ *Transliteration*: ${assna.transliteration}
❏ *English*: ${assna.en.meaning}
    `
}

exports.stickerDel = () => {
    return `Sticker has been deleted from database!`
}

exports.stickerAdd = () => {
    return `Sticker has been added to database!`
}

exports.stickerAddAlready = (q) => {
    return `Sticker with keyword "${q}" is already in database!`
}

exports.stickerNotFound = () => {
    return `Sticker not found!`
}

exports.reminderOn = (messRemind, parsedTime, sender) => {
    return `
*── 「 REMINDER 」 ──*
    
Reminder has been set!
➸ *Message*: ${messRemind}
➸ *Duration*: ${parsedTime.hours} jam ${parsedTime.minutes} menit ${parsedTime.seconds} detik
➸ *For*: @${sender.id.replace('@c.us', '')}
    `
}

exports.reminderAlert = (messRemind, sender) => {
    return `
*── 「 REMINDER 」 ──*

⏰ @${sender.id.replace('@c.us', '')} ⏰
➸ *Message*: ${messRemind}`
}

exports.nameChanged = (q) => {
    return `Username has been changed to *${q}*`
}

exports.menu = (jumlahUser, level, xp, role, pushname, requiredXp, premium) => {
    return `
*── 「 WELCOME 」 ──*

======================
➸ *Name*: ${pushname}
➸ *Level*: ${level}
➸ *XP*: ${xp} / ${requiredXp}
➸ *Role*: ${role}
➸ *Premium*: ${premium}
======================

Total registered: *${jumlahUser}*

The following menus are available:

*[1]* Downloader
*[2]* Bot
*[3]* Misc
*[4]* Sticker
*[5]* Weeaboo
*[6]* Fun
*[7]* Moderation
*[8]* NSFW
*[9]* Owner
*[10]* Leveling

Type *${prefix}menu* index_number to open the selected page menu.

Note:
Treat the bot well, dev will act firmly if the user violates the rules.
This bot has anti-spam in the form of a cooldown command for *5 seconds* every time you use it.
    `
}

exports.menuDownloader = () => {
    return `
*── 「 التحميل 」 ──*

1. *${prefix}facebook*
Download Facebook video.
Aliases: *fb*
Usage: *${prefix}facebook* video_link

2. *${prefix}ytmp3*
يحمل صوت من اليوتيوب .
Aliases: -
Usage: *${prefix}ytmp3* link

3. *${prefix}ytmp4*
يحمل مقطع من اليوتيوب .
Aliases: -
Usage: *${prefix}ytmp4* link

4. *${prefix}joox*
Download music from Joox.
Aliases: -
Usage: *${prefix}joox* song's_title

5. *${prefix}tiktok*
يحمل مقطع من التيك.
Aliases: -
Usage: *${prefix}tiktok* link

6. *${prefix}twitter*
يحمل صور/مقاطع من تويتر .
Aliases: *twt*
Usage: *${prefix}twiter* link

7. *${prefix}tiktokpic*
Download TikTok profile pic.
Aliases: -
Usage: *${prefix}tiktokpic* username

8. *${prefix}tiktoknowm*
يحمل من التيك بدون حقوق.
Aliases: *tktnowm*
Usage: *${prefix}tiktoknowm* link

9. *${prefix}moddroid*
Search for mod on moddroid.
Aliases: -
Usage: *${prefix}moddroid* APK_name

10. *${prefix}happymod*
Search for mod on happymod.
Aliases: -
Usage: *${prefix}happymod* APK_name

11. *${prefix}linedl*
Line sticker downloader.
Aliases: -
Usage: *${prefix}linedl* sticker_link

_Index of [1]_
    `
}

exports.menuBot = () => {
    return `
*── 「 بوت 」 ──*

1. *${prefix}rules*
لازم تقراها.
Aliases: *rule*
Usage: *${prefix}rules*

2. *${prefix}menu*
عرض قائمة الاوامر.
Aliases: -
Usage: *${prefix}menu* index_number

3. *${prefix}status*
Displays bot status.
Aliases: *stats*
Usage: *${prefix}status*

4. *${prefix}listblock*
قائمة الارقام المحظوره.
Aliases: -
Usage: *${prefix}listblock*

5. *${prefix}ping*
سرعة النت.
Aliases: *p*
Usage: *${prefix}ping*

6. *${prefix}delete*
حذف.
Aliases: *del*
Usage: Reply to deleted messages with a caption *${prefix}delete*.

7. *${prefix}report*
تبليغ.
Aliases: -
Usage: *${prefix}report* text

8. *${prefix}tos*
Terms of service.
Aliases: -
Usage: *${prefix}tos*

9. *${prefix}join*
اضافة لقروب.
Aliases: -
Usage: *${prefix}join* group's_link

10. *${prefix}ownerbot*
المطور.
Aliases: -
Usage: *${prefix}ownerbot*

11. *${prefix}getpic*
يرسل صورة شخص.
Aliases: -
Usage: *${prefix}getpic* @user/62812xxxxxxxx

12. *${prefix}premiumcheck*
وقت الرايم.
Aliases: *cekpremium*
Usage: *${prefix}premiumcheck*

13. *${prefix}premiumlist*
قائمة البرايم.
Aliases: *listpremium*
Usage: *${prefix}premiumlist*

14. *${prefix}limit*
تشوف نقاطك المحدوده.
Aliases: -
Usage: *${prefix}limit*

_Index of [2]_
    `
}

exports.menuMisc = () => {
    return `
*── 「 الصوت 」 ──*

1. *${prefix}say*
البوت بيقول وش قلت انت.
Aliases: -
Usage: *${prefix}say* text

2. *${prefix}lyric*
يبحث عن اغنية.
Aliases: -
Usage: *${prefix}lyric* song's_title

3. *${prefix}shortlink*
تخلي رابط صغير.
Aliases: -
Usage: *${prefix}shortlink* link

4. *${prefix}wikien*
يبحث في ويكيبيديا .
Aliases: -
Usage: *${prefix}wikien* query

5. *${prefix}kbbi*
Send word definitions from KBBI.
Aliases: -
Usage: *${prefix}kbbi* text

6. *${prefix}igstalk*
مراقبة حساب انتسقرام.
Aliases: -
Usage: *${prefix}igstalk* ig_username

7. *${prefix}gsmarena*
يرسل معلومات الرقم.
Aliases: -
Usage: *${prefix}gsmarena* phone's_model

8. *${prefix}receipt*
Sending food receipt.
Aliases: *resep*
Usage: *${prefix}receipt* food's_name

9. *${prefix}ytsearch*
يبحث عن المقطع الي تبي.
Aliases: *yts*
Usage: *${prefix}ytsearch* query

10. *${prefix}tts*
Create a Text to Speech. You need a language code, you can find it here https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
Aliases: -
Usage: *${prefix}tts* language_code | text

11. *${prefix}afk*
Set your account to AFK mode, I will them who mentioned you.
Aliases: -
Usage: *${prefix}afk* reason. Send any message to group to disable.

12. *${prefix}distance*
Sending city distance information.
Aliases: -
Usage: *${prefix}distance* from | to

13. *${prefix}findsticker*
يبحث عن ستيكر.
Aliases: *findstiker*
Usage: *${prefix}findsticker* text

14. *${prefix}math*
عملية حسابيه.
* = multiplication
+ = addition
- = subtraction
/ = division
Aliases: -
Usage: *${prefix}math* 12*12

15. *${prefix}listsurah*
قائمة للقران.
Aliases: -
Usage: *${prefix}listsurah*

16. *${prefix}surah*
صورة من القران.
Aliases: -
Usage: *${prefix}surah* surah_number

17. *${prefix}js*
وقت صلاة.
Aliases: - 
Usage: *${prefix}js* area

18. *${prefix}mutual*
مستخدم عشوائي .
Aliases: -
Usage: *${prefix}mutual*

19. *${prefix}whois*
IP look-up.
Aliases: -
Usage: *${prefix}whois* ip_address

20. *${prefix}play*
يشغل صوت من اليوتيوب .
Aliases: - 
Usage: *${prefix}play* title

21. *${prefix}sms*
Send SMS as anonymous. (SMS gateway)
Aliases: -
Usage: *${prefix}sms* message | number

22. *${prefix}toxic*
Random toxic. (Indonesian)
Aliases: -
Usage: *${prefix}toxic*

23. *${prefix}tafsir*
تفسير من القران. (Indonesian)
Aliases: -
Usage: *${prefix}tafsir* surah_name ayat

24. *${prefix}motivasi*
Motivation text. (Indonesian)
Aliases: -
Usage: *${prefix}motivasi*

25. *${prefix}linesticker*
Latest Line sticker.
Aliases: *linestiker*
Usage: *${prefix}linesticker*

26. *${prefix}alkitab*
Bible search. (Indonesian)
Aliases: -
Usage: *${prefix}* gospel_name

27. *${prefix}cekongkir*
Postal fee check. (Indonesian)
Aliases: -
Usage: *${prefix}ongkir* service_name | from | to

28. *${prefix}movie*
يبحث عن فلم.
Aliases: -
Usage: *${prefix}movie* title

28. *${prefix}reminder*
تذكير. 
*s* - seconds
*m* - minutes
*h* - hours
*d* - days
Aliases: -
Usage: *${prefix}reminder* 10s | reminder_message

29. *${prefix}imagetourl*
يحمل صوره.
Aliases: *imgtourl*
Usage: Send images with caption *${prefix}imagetourl* or reply to the image with a caption *${prefix}imagetourl*.

30. *${prefix}infohoax*
Hoax info update.
Aliases: -
Usage: *${prefix}infohoax*

31. *${prefix}trending*
ترند تويتر.
Aliases: -
Usage: *${prefix}trending*

32. *${prefix}jobseek*
Job seeker in Indonesia only.
Aliases: -
Usage: *${prefix}jobseek*

33. *${prefix}spamcall*
سبام اتصالات .
Aliases: -
Usage: *${prefix}spamcall* 812xxxxxxxx

34. *${prefix}spamsms*
Spam SMS.
Aliases: -
Usage: *${prefix}spamsms* 0812xxxxxxxx amount

35. *${prefix}email*
Send an email.
Aliases: -
Usage: *${prefix}email* email | subject | message

36. *${prefix}quotes*
Random Indonesian quotes.
Aliases: -
Usage: *${prefix}quotes*

37. *${prefix}genshininfo*
معلومات عن شخصيات قينشن امباكت.
Aliases: *genshin*
Usage: *${prefix}genshininfo* chara_name

38. *${prefix}translate*
ترجمة رسالة.
Aliases: *trans*
Usage: *${prefix}translate* text | code_lang

39. *${prefix}hadees*
Hadees info.
Aliases: *hadis*
Usage: *${prefix}hadees* hadees_name | hadees_number

40. *${prefix}asmaulhusna*
Asmaul husna.
Aliases: -
Usage: *${prefix}asmaulhusna* asmaulhusna_number

41. *${prefix}randomquran*
سورة عشوائية من القران.
Aliases: -
Usage: *${prefix}randomquran*

42. *${prefix}coronavirus*
Check a COVID-19 cases.
Aliases: *corona*
Usage: *${prefix}coronavirus* nation_name

43. *${prefix}tomp3*
يحول مقطع لصوت.
Aliases: -
Usage: Send a video with caption *${prefix}tomp3* or reply video with a caption *${prefix}tomp3*.

44. *${prefix}ttp*
رساله لستيكر.
Aliases: -
UsageL *${prefix}ttp* text

45. *${prefix}bass*
Bass boost.
Aliases: -
Usage: Reply audio/voice with caption *${prefix}bass* dB_level.

46. *${prefix}addsticker*
اضافة ستيكر لبيانات البوت.
Aliases: *addstiker*
Usage: Reply sticker with caption *${prefix}addsticker* sticker_keyword.

47. *${prefix}delsticker*
حذف ستيكر من البيانات.
Aliases: *delstiker*
Usage: *${prefix}delstiker* sticker_keyword

48. *${prefix}stickerlist*
قائمة الستيكر.
Aliases: *liststicker stikerlist liststiker*
Usage: *${prefix}stickerlist*

49. *${prefix}nightcore*
Create a nightcore effect.
Aliases: -
Usage: Reply audio/voice with caption *${prefix}nightcore*.

50. *${prefix}ocr*
ينسخ الكلام من الصوره.
Aliases: -
Usage: Send images with caption *${prefix}ocr* or reply to the images/stickers with a caption *${prefix}ocr*.

_Index of [3]_
    `
}

exports.menuSticker = () => {
    return `
*── 「 ستيكر 」 ──*

1. *${prefix}sticker*
تسوي ستيكر.
Aliases: *stiker*
Usage: Send images with caption *${prefix}sticker* or reply to the images with a caption *${prefix}sticker*.

2. *${prefix}stickergif*
ستيكر متحرك
Aliases: *stikergif*
Usage: Send videos/GIFs with caption *${prefix}stickergif* or reply to the videos/GIFs with a caption *${prefix}stickergif*.

3. *${prefix}ttg*
يحول كتابه لصوره.
Aliases: -
Usage: *${prefix}ttg* text

4. *${prefix}stickertoimg*
يحول ستيكر لصورة.
Aliases: *stikertoimg*
Usage: Reply to the stickers with a caption *${prefix}stickertoimg*.

5. *${prefix}emojisticker*
ايموجي لستيكر.
Aliases: *emojistiker*
Usage: *${prefix}emojisticker* emoji

6. *${prefix}stickerwm*
ستيكر مع حقوق ح/ق.
Aliases: *stcwm*
Usage: Send images with caption *${prefix}stickerwm* pack_name | author_name or reply to the image with a caption *${prefix}stickerwm* pack_name | author_name.

7. *${prefix}stickermeme*
Create a sticker meme.
Aliases: *stcmeme*
Usage: Send images with caption *${prefix}sticker* upper_text | bottom_text or reply to the images with a caption *${prefix}sticker* upper_text | bottom_text.

8. *${prefix}takestick*
تغير الحقوق.
Aliases: -
Usage: Reply to the stickers with a caption *${prefix}takestick* pack_name | author_name

_Index of [4]_
    `
}

exports.menuWeeaboo = () => {
    return `
*── 「 انمي 」 ──*

1. *${prefix}neko*
يرسل صور نيكو(قطه).
Aliases: -
Usage: *${prefix}neko*

2. *${prefix}wallpaper*
خلفيات.
Aliases: *wp*
Usage: *${prefix}wallpaper*

3. *${prefix}kemono*
صور فتيات كيمونو.
Aliases: -
Usage: *${prefix}kemono*

4. *${prefix}kusonime*
Look for anime info and batch download links on Kusonime.
Aliases: -
Usage: *${prefix}kusonime* anime's_title

5. *${prefix}komiku*
Looking for manga info and download links on Komiku.
Aliases: -
Usage: *${prefix}komiku* manga's_title

6. *${prefix}wait*
Search anime source from the screenshots scene.
Aliases: -
Usage: Send screenshots with caption *${prefix}wait* or reply to the screenshots with a caption *${prefix}wait*.

7. *${prefix}source*
يبحث عن مصدر صورة الانمي.
Aliases: *sauce*
Usage: Send images with caption *${prefix}source* or reply to the images with a caption *${prefix}source*.

8. *${prefix}waifu*
صورة زوجة عشوائية .
Aliases: -
Usage: *${prefix}waifu*

9. *${prefix}anitoki*
Anitoki fansub latest update.
Aliases: -
Usage: *${prefix}anitoki*

10. *${prefix}neonime*
Neonime fansub latest update.
Aliases: -
Usage: *${prefix}neonime*

11. *${prefix}anoboy*
On-going anime on Anoboy fansub.
Aliases: -
Usage: *${prefix}anoboy*

12. *${prefix}character*
يبحث عن شخصية انمي.
Alias: -
Usage: *${prefix}character* name_character

13. *${prefix}lolivid*
مقطع لولي عشوائي .
Aliases: -
Usage: *${prefix}lolivid

_Index of [5]_
    `
}

exports.menuFun = () => {
    return `
*── 「 FUN 」 ──*

1. *${prefix}hartatahta*
Make a picture of the "Harta Tahta Nama".
Aliases: -
Usage: *${prefix}hartatahta* name

2. *${prefix}partner*
Weton match. (Indonesian)
Aliases: *pasangan*
Usage: *${prefix}partner* name | partner

3. *${prefix}zodiac*
Weekly zodiac fortune. (Indonesian)
Aliases: *zodiak*
Usage: *${prefix}zodiac* zodiac

4. *${prefix}write*
Make notes written in a book.
Aliases: *nulis*
Usage: *${prefix}write* text

5. *${prefix}glitchtext*
Create a glitch styled text.
Aliases: *glitext*
Usage: *${prefix}glitchtext* text1 | text2

6. *${prefix}simi*
SimiSimi chat. (Indonesian)
Aliases: -
Usage: *${prefix}simi* text

7. *${prefix}blackpink*
Create a Blackpink logo styled text.
Aliases: -
Usage: *${prefix}blackpink* text

8. *${prefix}phmaker*
Create a Pornhub logo styled text.
Aliases: -
Usage: *${prefix}phmaker* left_text | right_text

9. *${prefix}galaxy*
Create a galaxy styled text.
Aliases: -
Usage: *${prefix}galaxy* text

10. *${prefix}tod*
Play truth or dare. (Indonesian)
Aliases: -
Usage: *${prefix}tod*

11. *${prefix}weton*
Weton fortune. (Indonesian)
Aliases: -
Usage: *${prefix}weton* date | month | year

12. *${prefix}triggered*
Apply a triggered effect to image.
Aliases: -
Usage: Send image with caption *${prefix}triggered* or reply to someone message with caption *${prefix}triggered* or you can directly use *${prefix}triggered*.

13. *${prefix}kiss*
Kiss someone ( ͡° ͜ʖ ͡°).
Aliases: -
Usage: Send image with caption *${prefix}kiss* or reply image with caption *${prefix}kiss*.

14. *${prefix}asupan*
Daily dose of TikTok.
Aliases: -
Usage: *${prefix}asupan*

15. *${prefix}citacita*
Cita-cita meme. (Indonesian)
Aliases: -
Usage: *${prefix}citacita*

16. *${prefix}phcomment*
Create a Pornhub comment section styled image.
Aliases: -
Usage: *${prefix}phcomment* username | text

17. *${prefix}ffbanner*
Create a Free Fire banner.
Aliases: -
Usage: *${prefix}ffbanner* text1 | text2

18. *${prefix}fflogo*
Create a Free Fire characters logo.
Aliases: -
Usage: *${prefix}fflogo* text1 | text2

19. *${prefix}neontext*
Create a neon text image
Aliases: *neon*
Usage: *${prefix}neontext* up | center | bottom

20. *${prefix}firemaker*
Create a fire text.
Aliases: -
Usage: *${prefix}firemaker* text

21. *${prefix}mlmaker*
Create ML hero image with text.
Aliases: -
Usage: *${prefix}mlmaker* hero_name | text

22. *${prefix}balloonmaker*
Create a couple balloon image.
Aliases: *blmaker*
Usage: *${prefix}balloonmaker* name1 | name2

23. *${prefix}sliding*
Create a sliding text.
Aliases: -
Usage: *${prefix}sliding* text

24. *${prefix}wasted*
Create a wasted effect.
Aliases: -
Usage: Send image with caption *${prefix}wasted* or reply image with caption *${prefix}wasted*.

25. *${prefix}caklontong*
Cak Lontong quiz.
Aliases: -
Usage: *${prefix}caklontong*

26. *${prefix}hilih*
Hilih-ify your text.
Aliases: -
Usage: *${prefix}hilih* text.

27. *${prefix}tebakgambar*
Tebak Gambar quiz.
Aliases: -
Usage: *${prefix}tebakgambar*

_Index of [6]_
    `
}

exports.menuModeration = () => {
    return `
*── 「 المشرفين 」 ──*

1. *${prefix}add*
اضافة شخص.
Aliases: -
Usage: *${prefix}add* 628xxxxxxxxxx

2. *${prefix}kick*
طرد عضو.
Aliases: -
Usage: *${prefix}kick* @member1

3. *${prefix}promote*
اعطاء اشراف لشخص.
Aliases: -
Usage: *${prefix}promote* @member1

4. *${prefix}demote*
خفض مشرف.
Aliases: -
Usage: *${prefix}demote* @member1

5. *${prefix}leave*
لخروج البوت من القروب.
Aliases: -
Usage: *${prefix}leave*

6. *${prefix}everyone*
منشن الكل.
Aliases: -
Usage: *${prefix}everyone*

7. *${prefix}nsfw*
الهنتاي.
Aliases: -
Usage: *${prefix}nsfw* enable/disable

8. *${prefix}groupicon*
صورة القروب.
Aliases: -
Usage: Send images with caption *${prefix}groupicon* or reply to the images with a caption *${prefix}groupicon*.

9. *${prefix}antilink*
طرد اي شخص يرسل رابط.
Aliases: -
Usage: *${prefix}antilink* enable/disable

10. *${prefix}welcome*
الترحيب.
Aliases: -
Usage: *${prefix}welcome* enable/disable

11. *${prefix}autosticker*
اذا شخص ارسل صورة بيحولها ستيكر تلقائي.
Aliases: *autostiker autostik*
Usage: *${prefix}autostiker* enable/disable

12. *${prefix}antinsfw*
طرد اي شخص يرسل روابط هنتاي.
Aliases: -
Usage: *${prefix}antinsfw* enable/disable

13. *${prefix}mutegc*
قفل القروب.
Aliases: -
Usage: *${prefix}mutegc* enable/disable

14. *${prefix}grouplink*
يرسل رابط القروب.
Aliases: -
Usage: *${prefix}grouplink*

15. *${prefix}revoke*
تغيير رابط القروب.
Aliases: -
Usage: *${prefix}revoke*

_Index of [7]_
    `
}

exports.menuNsfw = () => {
    return `
*── 「 NSFW 」 ──*

1. *${prefix}lewds*
Send lewd anime pict.
Aliases: *lewd*
Usage: *${prefix}lewds*

2. *${prefix}multilewds*
Send up to 5 anime lewd pics. (PREMIUM ONLY)
Aliases: *multilewds multilewd mlewd mlewds*
Usage: *${prefix}multilewds*

3. *${prefix}nhentai*
Sending doujinshi info from nHentai.
Aliases: *nh*
Usage: *${prefix}nhentai* code

4. *${prefix}nhdl*
Download doujin from nHentai as a PDF file. (PREMIUM ONLY)
Aliases: -
Usage: *${prefix}nhdl* code

5. *${prefix}nekopoi*
Send the latest video link Nekopoi.
Aliases: -
Usage: *${prefix}nekopoi*

6. *${prefix}multifetish*
Send up to 5 fetish pics. (PREMIUM ONLY)
Aliases: *mfetish*
Usage: *${prefix}multifetish* armpits/feets/thighs/ass/boobs/belly/sideboobs/ahegao

7. *${prefix}waifu18*
Send random NSFW waifu photos.
Aliases: -
Usage: *${prefix}waifu18*

8. *${prefix}fetish*
Send fetish pics.
Aliases: -
Usage: *${prefix}fetish* armpits/feets/thighs/ass/boobs/belly/sideboobs/ahegao

9. *${prefix}phdl*
Download videos from Pornhub.
Aliases: -
Usage *${prefix}phdl* link

10. *${prefix}yuri*
Send random yuri pics.
Aliases: -
Usage: *${prefix}yuri*

11. *${prefix}lewdavatar*
Send random lewd avatars.
Aliases: -
Usage: *${prefix}lewdavatar*

12. *${prefix}femdom*
Send random femdom pics.
Aliases: -
Usage: *${prefix}femdom*

13. *${prefix}nhsearch*
nHentai search.
Aliases: -
Usage: *${prefix}nhsearch* query

14. *${prefix}nekosearch*
Nekopoi search.
Aliases: -
Usage: *${prefix}nekosearch* query

15. *${prefix}cersex*
Random adult stories (Indonesian).
Aliases: -
Usage: *${prefix}cersex*

_Index of [8]_
    `
}

exports.menuOwner = () => {
    return `
*── 「 المطور 」 ──*

1. *${prefix}bc*
ارسال برودكاست.
Aliases: -
Usage: *${prefix}bc* text

2. *${prefix}clearall*
احذف كل المحادثات.
Aliases: -
Usage: *${prefix}clearall*

3. *${prefix}getses*
خذ سكرين شوت من بينات البوت.
Aliases: -
Usage: *${prefix}getses*

4. *${prefix}ban*
اضف/احذف او بلك مستخدم.
Aliases: -
Usage: *${prefix}ban* add/del @user/62812xxxxxxxx

5. *${prefix}leaveall*
اترك كل القروبات.
Aliases: -
Usage: *${prefix}leaveall*

6. *${prefix}eval*
تقييم لغة البرمجة.
Aliases: *ev*
Usage: *${prefix}eval*

7. *${prefix}shutdown*
اطفاء.
Aliases: -
Usage: *${prefix}shutdown*

8. *${prefix}premium*
اضف احذف مستخدم برايم.
Aliases: -
Usage: *${prefix}premium* add/del @user

9. *${prefix}setstatus*
ضبط عني.
Aliases: *setstatus setstat*
Usage: *${prefix}status* text

10. *${prefix}serial*
تحقق من المستخدم.
Aliases: -
Usage: *${prefix}serial* user_serial

11. *${prefix}exif*
يعدل ستيكرك.
Aliases: -
Usage: *${prefix}exif* pack_name | author_name

12. *${prefix}mute*
ميوت كل المستخدمين.
Aliases: -
Usage: Use *${prefix}mute* to mute and use *${prefix}mute* once again to unmute.

13. *${prefix}setname*
غير اسم البوت.الحد الاعلى 25 حرف.
Aliases: -
Usage: *${prefix}name* new_username

14. *${prefix}block*
بلك مستخدم.
Aliases: *blok*
Usage: *${prefix}block* @user/62812xxxxxxxx

15. *${prefix}unblock*
شيل البلوك.
Aliases: *unblok*
Usage: *${prefix}unblock* @user/62812xxxxxxxx

_Index of [9]_
    `
}

exports.menuLeveling = () => {
    return `
*── 「 التلفيل 」 ──*

1. *${prefix}level*
تاكد من مستواك.
Aliases: -
Usage: *${prefix}level*

2. *${prefix}leaderboard*
.شوف المتصدرين
Aliaases: -
Usage: *${prefix}leaderboard*

_Index of [10]_
    `
}

exports.rules = () => {
    return `
*── 「 القوانين 」 ──*

1. لاتسوي سبام. 
Penalty: *WARN/SOFT BLOCK*

2. لاتتصل على البوت.
Penalty: *SOFT BLOCK*

3. لاتنشره.
Penalty: *PERMANENT BLOCK*

اذا مافهمت القوانين رجاء اكتب *${prefix}menu* عشان تفهم.
    `
}

// Note for owner/hoster, please DO NOT edit this section.
exports.tos = (ownerNumber) => {
    return `
*── 「 TERMS OF SERVICE 」 ──*

This bot is an open-source bot, come with the name of BocchiBot which is available on GitHub for free.
The owner/hoster of this bot is independent from the responsibility and supervision of the developer (Nawaf).
If an error occurs, the first person you should contact is the owner/hoster.  

Contact person:
wa.me/${ownerNumber.replace('@c.us', '')} (Owner/hoster)
wa.me/${ownerNumber} (Developer)

You guys can also support me to keep this bot up to date with:
${ownerNumber} (OVO/Telkomsel/GoPay)

Thank you!

Nawaf.
    `
}

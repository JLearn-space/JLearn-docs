# O‘zbekcha o‘quv yo‘li — tekshiruv jurnali

> Quyidagi dastlabki yozuvlar brauzer tekshiruvidan oldin tuzilgan. Kuzatilgan natijalar jurnal oxirida va umumiy hisobotda berilgan.

Bu haqiqiy odamning tajribasi haqida da’vo emas: o‘zbekcha material bilan ishlaydigan yangi o‘quvchi vazifalarini fayllarda bajarish va tushunarsiz joylarni aniqlash mashqi. Har darsning manbasi, sxemalari va shartlari yechim yaratilishidan oldin ko‘rib chiqildi. Yechimlar o‘z mazmuni bilan tuzildi; RU/EN ishlatilmadi.

**Dalil chegarasi:** brauzer ochilmadi, tugmalar bosilmadi, ekran o‘quvchisi ishlatilmadi va Nu HTML Checker ishga tushirilmadi. Quyidagi “mavjud” so‘zi HTML manbasi yoki diskdagi fayl tekshiruvidir; “ishladi” deb brauzer natijasi uydirilmagan. Vaqt o‘lchanmagan, shuning uchun daqiqalar yoki odamning hissiy bahosi to‘qib yozilmadi. Kechiktiruvchi joylar — haqiqiy aniqlangan matn qarama-qarshiliklari yoki tashqi tekshiruv zarurati.

Har papka o‘z resurslari bilan ko‘chiriladi. Alohida mini-vazifa mini.html da; 2-dars asosiy natijasi guide.html, qolganlari index.html yoki ko‘p sahifali to‘plam. STATIC_CHECK.json lokal manzil, ankor, takroriy id va label nishonlari tekshiruvini saqlaydi. Bu HTML validator hisoboti emas.


## 1-dars

**Manba:** `Lesson-1/uz/HTML ga kirish hujjat tuzilishi.md`. Matn, misollar va ikki Mermaid sxemasi ko‘rib chiqildi; har sxemadan keyin “Chizmani qanday o‘qish kerak” izohi qo‘shildi.

**Yaratilgan fayllar:** `index.html`, `mini.html`.

**Kichik topshiriq:** Bo‘sh body li to‘liq skelet — mini.html. DevToolsdagi tashqi sayt mashqi bu muhitda bajarilmadi.

**Mezonlar va dalil:** Fayl nomi, DOCTYPE, uz, UTF-8, bitta h1 va ikkita p manbada mavjud. Saqlash/yangilash natijasini brauzerda ko‘rish kutilmoqda.

**Tushunishga to‘sqinlik va tuzatish:** “karakuzabry”, “karqas”, “yaratdiz” kabi yozuvlar yangi boshlovchini to‘xtatadi; o‘zbekcha izoh va adabiy shakllarga almashtirildi. DevTools nomi dasturchi vositalari deb aniqlandi.

**Savollarga javoblar:**

1. Element — hujjat tuzilishining qismi; ochuvchi teg uning boshlanishini belgilaydi.
2. title sahifa haqidagi xizmat ma’lumoti, p esa ko‘rinadigan mazmun.
3. DevTools joriy brauzer hujjatini o‘zgartiradi; diskdagi manba alohida saqlanadi.

**Keyingi tekshiruv:** markaziy brauzer tekshiruvi kutilmoqda. Brauzer natijasi hali tasdiqlanmagan.


## 2-dars

**Manba:** `Lesson-2/uz/Matn va semantika.md`. Matn, misollar va ikki Mermaid sxemasi ko‘rib chiqildi; har sxemadan keyin “Chizmani qanday o‘qish kerak” izohi qo‘shildi.

**Yaratilgan fayllar:** `guide.html`, `mini.html`.

**Kichik topshiriq:** Choy damlashning uch qadami — mini.html.

**Mezonlar va dalil:** guide.html: header/main/footer, ikki h2 li section, ul va ol, strong va small mavjud. DevTools taqqoslashi hamda o‘qilish ko‘rinishi kutilmoqda.

**Tushunishga to‘sqinlik va tuzatish:** “lu‘zariy” noma’lum so‘z; “atamalar lug‘ati”ga tuzatildi. Rejadagi “eski b/i” nazariyadagi “eskirmagan”ga zid edi; ma’no vazifasi deb yozildi.

**Savollarga javoblar:**

1. article mustaqil material, section sarlavhali mavzu bo‘limi, div ma’nosiz umumiy qobiq.
2. strong muhimlik, em mazmuniy urg‘u; b e’tiborni, i boshqa ohang yoki atamani bildiradi.
3. br mazmun ichidagi satr uzilishi; abzatslar p bilan ajratiladi, masofa keyin CSS orqali belgilanadi.

**Keyingi tekshiruv:** markaziy brauzer tekshiruvi kutilmoqda. Brauzer natijasi hali tasdiqlanmagan.


## 3-dars

**Manba:** `Lesson-3/uz/Havolalar va navigatsiya.md`. Matn, misollar va ikki Mermaid sxemasi ko‘rib chiqildi; har sxemadan keyin “Chizmani qanday o‘qish kerak” izohi qo‘shildi.

**Yaratilgan fayllar:** `contact.html`, `contacts.html`, `index.html`, `mini.html`, `schedule.html`.

**Kichik topshiriq:** contact.html, MDN yangi yorliq va tel havolasi — mini.html; contact.html ham mavjud.

**Mezonlar va dalil:** Uch asosiy sahifa, bir xil menyu, ikki ichki bo‘lim va boshqa sahifadan ankor, mailto/tel mavjud. To‘qqiz menyu nishoni statik topildi; haqiqiy bosish sinovi kutilmoqda.

**Tushunishga to‘sqinlik va tuzatish:** “qaltis havolalar” vazifani tushuntirmaydi; “namuna havolalar” deb yozildi. Uch sahifadagi to‘qqiz menyu yo‘li manbadan tekshirildi.

**Savollarga javoblar:**

1. about.html shu papkada, ../about.html yuqori papkada, /about.html sayt ildizida.
2. # bo‘lmasa brauzer bo‘lim emas, fayl yo‘lini izlaydi.
3. Yangi yorliq foydalanuvchini chalg‘itishi mumkin; kerak bo‘lsa matnda ogohlantiriladi.

**Keyingi tekshiruv:** markaziy brauzer tekshiruvi kutilmoqda. Brauzer natijasi hali tasdiqlanmagan.


## 4-dars

**Manba:** `Lesson-4/uz/Rasmlar va media.md`. Matn, misollar va ikki Mermaid sxemasi ko‘rib chiqildi; har sxemadan keyin “Chizmani qanday o‘qish kerak” izohi qo‘shildi.

**Yaratilgan fayllar:** `RESOURCES.md`, `audio/three-notes.wav`, `images/book.png`, `images/flower.png`, `images/logo.png`, `index.html`, `mini.html`.

**Kichik topshiriq:** 200×200 logotip, mos alt va figcaption — mini.html.

**Mezonlar va dalil:** Ikki 320×320 PNG, mos alt va figcaption, controls li WAV va alohida fayl havolasi mavjud. PNG/WAV fayllari haqiqiy formatda yaratildi. Yuklanish va ijro brauzerda tekshirilmagan.

**Tushunishga to‘sqinlik va tuzatish:** Media uchun ikki source majburiy degan talab bir manbali misolga zid edi; qo‘shimcha format zarur bo‘lganda berilishi tushuntirildi. “Beksiz” o‘rniga “Usiz” yozildi. Rasm va audio fayllarini tayyorlash HTML mavzusidan tashqaridagi resurs tayyorlash ishidir.

**Savollarga javoblar:**

1. Axborot bermaydigan bezak rasmida alt bo‘sh bo‘ladi.
2. figcaption ko‘rinadigan izoh; alt rasmni ko‘ra olmaydigan foydalanuvchiga mazmun yoki vazifani beradi.
3. SVG oddiy vektor shakllarni kattalashtirganda aniqlikni saqlaydi.

**Keyingi tekshiruv:** markaziy brauzer tekshiruvi kutilmoqda. Brauzer natijasi hali tasdiqlanmagan.


## 5-dars

**Manba:** `Lesson-5/uz/Jadvallar.md`. Matn, misollar va ikki Mermaid sxemasi ko‘rib chiqildi; har sxemadan keyin “Chizmani qanday o‘qish kerak” izohi qo‘shildi.

**Yaratilgan fayllar:** `index.html`, `mini.html`.

**Kichik topshiriq:** thead/tbody bilan ikki kun va ikki ustun — mini.html.

**Mezonlar va dalil:** Uch ustun/uch ma’lumot qatori, caption/theads/tbody va scope mavjud. Rowspan jadvali ikki ustunli: keyingi qator bitta katak bilan yozilgan. Brauzerdagi jadval ko‘rinishi kutilmoqda.

**Tushunishga to‘sqinlik va tuzatish:** tfoot ni oldin ham yozish mumkin degan eski qoida tuzatildi: thead → tbody → tfoot. Birlashtirishda o‘rinlar hisobini yozma izohsiz tushunish qiyin; yechimdagi rowspan uchun alohida izoh qo‘shildi.

**Savollarga javoblar:**

1. colspan ustunlar, rowspan qatorlar bo‘ylab o‘rin egallaydi.
2. col — ustun sarlavhasi, row — qator sarlavhasi.
3. table ma’lumotlar o‘rtasidagi qator-ustun aloqasini bildiradi, sahifa joylashuvini emas.

**Keyingi tekshiruv:** markaziy brauzer tekshiruvi kutilmoqda. Brauzer natijasi hali tasdiqlanmagan.


## 6-dars

**Manba:** `Lesson-6/uz/Formalar qism-1.md`. Matn, misollar va ikki Mermaid sxemasi ko‘rib chiqildi; har sxemadan keyin “Chizmani qanday o‘qish kerak” izohi qo‘shildi.

**Yaratilgan fayllar:** `index.html`, `mini.html`.

**Kichik topshiriq:** Bitta drink nomli uch radio va mos label lar — mini.html; fieldset hali qo‘shilmadi.

**Mezonlar va dalil:** Barcha kiritish maydonlarida label/name, radio name=mode, alohida checkbox id lar va required bor. GET yuborish, label bosish va required bloklash natijasi hali kuzatilmagan.

**Tushunishga to‘sqinlik va tuzatish:** “action atributini yozmang yozing” to‘g‘ridan-to‘g‘ri qarama-qarshi buyruq edi; atributni yozmaslik qoldirildi. “Formatlarga” forma bilan adashgan edi. Checkbox haqidagi xato satrda to‘g‘ri ish xato deb atalgan; tuzatildi.

**Savollarga javoblar:**

1. id label uchun nishon, name yuborilgan qiymatning nomi.
2. POST faqat ma’lumot joyini o‘zgartiradi; HTTPS uzatishni himoya qiladi.
3. Brauzer so‘rov yuborishga urinadi; qayta ishlovchi bo‘lmasa ma’lumot saqlanmaydi yoki server xatosi chiqadi.

**Keyingi tekshiruv:** markaziy brauzer tekshiruvi kutilmoqda. Brauzer natijasi hali tasdiqlanmagan.


## 7-dars

**Manba:** `Lesson-7/uz/Formalar qism-2.md`. Matn, misollar va ikki Mermaid sxemasi ko‘rib chiqildi; har sxemadan keyin “Chizmani qanday o‘qish kerak” izohi qo‘shildi.

**Yaratilgan fayllar:** `index.html`, `mini.html`.

**Kichik topshiriq:** Uch mamlakat, O‘zbekiston selected — mini.html.

**Mezonlar va dalil:** optgroup, selected, boshlang‘ich textarea, legend va 7 raqamli required pattern mavjud. Submit va reset aniq type bilan yozilgan. 0/6/7/harf qiymatlari uchun interaktiv sinov kutilmoqda.

**Tushunishga to‘sqinlik va tuzatish:** “subsection” mavjud HTML tegi sifatida ko‘rsatilgan edi; select ga tuzatildi. “orientationga” kabi aralash yozuvlar sodda o‘zbekcha bilan almashtirildi. Reset tekshiruvi uchun boshlang‘ich textarea va selected mavjud.

**Savollarga javoblar:**

1. reset bo‘shatishi shart emas: boshlang‘ich qiymatlarni qaytaradi.
2. required bo‘lmasa bo‘sh qiymat pattern tekshiruvidan o‘tadi.
3. title barcha foydalanuvchilarga bir xil ko‘rinmaydi; asosiy talab yonidagi ko‘rinadigan matnda beriladi.

**Keyingi tekshiruv:** markaziy brauzer tekshiruvi kutilmoqda. Brauzer natijasi hali tasdiqlanmagan.


## 8-dars

**Manba:** `Lesson-8/uz/Foydalanish qulayligi (a11y).md`. Matn, misollar va ikki Mermaid sxemasi ko‘rib chiqildi; har sxemadan keyin “Chizmani qanday o‘qish kerak” izohi qo‘shildi.

**Yaratilgan fayllar:** `images/github-icon.svg`, `index.html`, `mini.html`.

**Kichik topshiriq:** Mahalliy belgi rasmli GitHub havolasi aria-label bilan — mini.html.

**Mezonlar va dalil:** 7-darsdagi to‘g‘ri statik label/legend saqlandi; sun’iy xato kiritilmadi. Mini sahifada matnsiz havolaga aria-label qo‘shildi. Tab, Shift+Tab, Name/Role va ko‘rinadigan fokus brauzerda tekshirilishi kerak. #000/#fff nazariy kontrasti 21:1, ammo haqiqiy brauzer ranglari o‘lchanmagan.

**Tushunishga to‘sqinlik va tuzatish:** A11y oddiy foydalanish qulayligi bilan chalkashgan: turli imkoniyatdagi odamlar foydalana olishi aniq tushuntirildi. Accessibility panelidagi Name/Role ni topish qadamlari qo‘shildi. Rangli span/style faqat tayyor ko‘rgazmali namuna ekanligi aytildi.

**Savollarga javoblar:**

1. tabindex fokusga ta’sir qiladi; Enter/Space xatti-harakatini yaratmaydi.
2. Brauzerning o‘z button elementi fokus va klaviatura xatti-harakatini ta’minlaydi.
3. Faqat bezak yoki nomi boshqa element orqali berilgan dekorativ rasmda alt bo‘sh bo‘lishi mumkin.

**Keyingi tekshiruv:** markaziy brauzer tekshiruvi kutilmoqda. Brauzer natijasi hali tasdiqlanmagan.


## 9-dars

**Manba:** `Lesson-9/uz/Meta-teglar, SEO, CSS va JS bilan bog'lanish.md`. Matn, misollar va ikki Mermaid sxemasi ko‘rib chiqildi; har sxemadan keyin “Chizmani qanday o‘qish kerak” izohi qo‘shildi.

**Yaratilgan fayllar:** `about.html`, `css/style.css`, `index.html`, `js/main.js`, `mini.html`, `scripts/app.js`, `styles/main.css`.

**Kichik topshiriq:** styles/main.css va scripts/app.js defer bilan ulangan to‘liq hujjat — mini.html.

**Mezonlar va dalil:** Ikki noyob title/description, viewport; CSS/JS mavjud va manzilga mos. HTTP Status 200/304 va Nu HTML Checker hali bajarilmagan; statik fayl mavjudligi ularning o‘rnini bosmaydi.

**Tushunishga to‘sqinlik va tuzatish:** Viewport bo‘lmagandagi xatti-harakat tarjimada teskari ma’no bergan; qayta yozildi. Description haqida jadval ichiga tushgan oddiy abzats jadvalni buzgan; satr qayta tiklandi. Tayyor fayllar ko‘chirildi; ularning dasturini mustaqil yozish talab qilinmaydi.

**Savollarga javoblar:**

1. defer tahlildan keyin tartib bilan, async tayyor bo‘lganda tartib kafolatisiz bajariladi.
2. Validator ishlaydigan havolalar, to‘liq a11y va SEO sifatini kafolatlamaydi.
3. Viewport sahifa kengligi va masshtabni bildiradi, katta rasmlar/jadvallarni avtomatik moslashtirmaydi.

**Keyingi tekshiruv:** markaziy brauzer tekshiruvi kutilmoqda. Brauzer natijasi hali tasdiqlanmagan.


## 10-dars

**Manba:** `Lesson-10/uz/Yakuniy loyiha rejalashtirishdan nashr etishgacha.md`. Matn, misollar va ikki Mermaid sxemasi ko‘rib chiqildi; har sxemadan keyin “Chizmani qanday o‘qish kerak” izohi qo‘shildi.

**Yaratilgan fayllar:** `PUBLICATION.md`, `about.html`, `css/style.css`, `images/book.png`, `images/flower.png`, `images/logo.png`, `index.html`, `join.html`, `mini.html`, `schedule.html`.

**Kichik topshiriq:** Alohida mini-vazifa yo‘q: mini.html saytni rejalashtirish qadamining o‘z yechimi.

**Mezonlar va dalil:** To‘rtta sahifa, 16 menyu manzili, rasm, jadval, o‘quv forma, noyob metadata mavjud. Ichki yo‘llar statik tekshirildi. Mobil ko‘rinish, klaviatura, Nu HTML Checker va haqiqiy GitHub nashri bajarilmagan; ball berilmadi.

**Tushunishga to‘sqinlik va tuzatish:** lang=ru, alt o‘rnida text, taqqoslanadigan ma’lumoti bor/yo‘q portfolio tarjimasi tuzatildi; GET ogohlantirishining takrori olib tashlandi. Haqiqiy nashrni bajarish bu tekshiruv doirasiga kirmaydi; yakuniy imtihon nashr mezoni ochiq qoladi.

**Savollarga javoblar:**

1. Sarlavha uchun h1, navigatsiya uchun nav, uchrashuv ma’lumoti uchun caption/th li table tanlandi.
2. Forma GET orqali o‘quv qiymatlarini joriy sahifaga yuboradi; ariza yetkazilmaydi va saqlanmaydi.
3. Ikki statik tekshiruv bajarildi: barcha ichki manzillar faylga mos; label for qiymatlari mavjud id ga mos. Brauzerda o‘zaro ta’sir va nashr tekshirilmagan.

**Keyingi tekshiruv:** markaziy brauzer tekshiruvi kutilmoqda. Ochiq URL berilmadi; nashr mezoni bajarilmagan.

## Yakuniy amaliy tekshiruv

- 01: 5/5 — page and referenced resources load: index.html, page and referenced resources load: mini.html, one heading and two paragraphs, saved file change appears after reload.
- 02: 4/4 — page and referenced resources load: guide.html, page and referenced resources load: mini.html, guide uses semantic structure and two list kinds.
- 03: 19/19 — page and referenced resources load: contact.html, page and referenced resources load: contacts.html, page and referenced resources load: index.html, page and referenced resources load: mini.html, page and referenced resources load: schedule.html, menu transition index.html → index.html, menu transition index.html → schedule.html, menu transition index.html → contacts.html, anchor index.html → #about, anchor index.html → #rules, menu transition schedule.html → index.html, menu transition schedule.html → schedule.html, menu transition schedule.html → contacts.html, anchor schedule.html → #rules, menu transition contacts.html → index.html, menu transition contacts.html → schedule.html, menu transition contacts.html → contacts.html, complete navigation count.
- 04: 6/6 — page and referenced resources load: index.html, page and referenced resources load: mini.html, two images and captioned figure, media loads and plays 0, whole folder survives relocation.
- 05: 5/5 — page and referenced resources load: index.html, page and referenced resources load: mini.html, schedule has caption and column/row headers, separate merged-cell example exists.
- 06: 9/9 — page and referenced resources load: index.html, page and referenced resources load: mini.html, required fields block empty submission, email format is checked, radio group permits one selected option, checkboxes can both be selected, clicking label focuses its field, GET contains all successful named values.
- 07: 9/9 — page and referenced resources load: index.html, page and referenced resources load: mini.html, ID "" has expected validity, ID "123456" has expected validity, ID "1234567" has expected validity, ID "abcdefg" has expected validity, Space on reset restores original values, valid participant form submits with GET.
- 08: 9/9 — page and referenced resources load: index.html, page and referenced resources load: mini.html, Tab visits every control once with keyboard focus, Chrome accessibility tree contains named native controls, default text contrast is black on white canvas, arrow key changes the native selection, Space activates reset and restores initial text, Enter activates submit.
- 09: 7/7 — page and referenced resources load: about.html, page and referenced resources load: index.html, page and referenced resources load: mini.html, CSS and JS load over real local HTTP: about.html, CSS and JS load over real local HTTP: index.html, two pages have distinct title/description and viewport.
- 10: 24/24 — page and referenced resources load: about.html, page and referenced resources load: index.html, page and referenced resources load: join.html, page and referenced resources load: mini.html, page and referenced resources load: schedule.html, four independent pages, menu transition about.html → index.html, menu transition about.html → about.html, menu transition about.html → schedule.html, menu transition about.html → join.html, menu transition index.html → index.html, menu transition index.html → about.html, menu transition index.html → schedule.html, menu transition index.html → join.html, menu transition join.html → index.html, menu transition join.html → about.html, menu transition join.html → schedule.html, menu transition join.html → join.html, menu transition schedule.html → index.html, menu transition schedule.html → about.html, menu transition schedule.html → schedule.html, menu transition schedule.html → join.html, complete navigation count.

[Browser results](../evidence/browser-walkthrough.json) · [Native keyboard evidence](../evidence/native-select-check.json) · [Local Nu results](../evidence/nu-local.json) · [Progression guard](../evidence/progression-check.json)

Nu: barcha 80 HTML yechim va kursning qolgan sahifalari fayllarni yubormasdan mahalliy tekshirildi. Qulay nomlar Chrome accessibility daraxtidan olindi; haqiqiy ekran o‘quvchisi seansi o‘tkazilmadi. GitHub nashri hamda VS Code/kengaytmalarni o‘rnatish bajarilmadi.

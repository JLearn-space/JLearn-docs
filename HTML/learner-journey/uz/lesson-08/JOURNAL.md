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

# Rasmlar va media

[Mundarija](../../README.md) | [Oldingi dars](../../Lesson-3/uz/Havolalar%20va%20navigatsiya.md) | [Keyingi dars](../../Lesson-5/uz/Jadvallar.md) | [RU](../ru/%D0%98%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F%20%D0%B8%20%D0%BC%D0%B5%D0%B4%D0%B8%D0%B0.md) | [EN](../en/Images%20and%20media.md) | [UZ](../uz/Rasmlar%20va%20media.md) | [Amaliyot: namuna](../practice.html)


> **Oldingi dars bilan bog'lanish:** o'tgan darsda biz sahifalarni havolalar bilan bog'lashni o'rgandik va ko'p sahifali saytni oddiy matndan yig'dik. Bugun sahifalarga rasmlar, tovush va video qo'shamiz - sayt "faqat matn" bo'lishdan to'xtaydi.

---

## Dars oxiriga qadar nimani o'rganasiz

- `<img>` tegini orqali rasmlarni joylashtirish va `src`, `alt`, `width`, `height` atributlarini to'g'ri ishlatish.
- JPEG, PNG, SVG, WebP rasm formatlarini farqlash va qaysi holatda qaysi formatni qo'llashni tushunish.
- Rasmlarni `figure`/`figcaption` yordamiga yozish.
- `audio`/`video` teglari orqali bir yoki bir nechta `source` manbalar bilan audio va video joylashtirish.
- Favicon - brauzer tabidagi sayt belgasi qo'shish.

---

## Dars rejasi

| Bo‘lim                                | Mazmuni                                 |
| ----------------------------------- | --------------------------------------- |
| img tegi: src, alt, width, height | Asosiy sintaksis, alt ning muhimligi   |
| Rasm formatlari                  | JPEG/PNG/SVG/WebP - qachon qaysi ishlatiladi |
| figure va figcaption             | Rasmlar yorliqlari                      |
| Kichik topshiriq                 | Rasmni mustaqil joylashtirish           |
| audio va video                   | Media joylashtirish, bir nechta source  |
| Favicon                          | Sayt belgasi                            |
| Xulosalar va amaliy topshiriq    | Mustahkamlash                           |

---

## `<img>` tegi: src, alt, width, height

**Oddiy qilib aytganda:** agar `<a>` havolasi bu boshqa sahifaga eshik bo'lsa, `<img>` - bu sizning sahifangizga "kiritiladigan" rasm uchun oyna, rasm fizik jihatdan alohida faylda saqlanadi.

`<img>` tegi - **juftlikka kirmaydigan**, 2-darsdagi `<br>` va `<hr>` kabi. Unda tarkibiy qism va yopuvchi teg yo'q - barcha ma'lumotlar atributlar orqali uzatiladi.

```html
<img src="cat.jpg" alt="Sochli mushuk derazada o'tiribdi">
```

Attributlarni ketma-ket ko'rib chiqamiz.

### `src` (source) - rasm qayerdan olinadi

**Majburiy** atribut - rasm faylining yo'li. Uchlik 3-darsda ko'rgan yo'l qoidalari bo'yicha ishlaydi: o'z fayllaringiz uchun nisbiy yo'l, tashqi saytlardagi rasmlar uchun mutlaqo yo'l.

```html
<img src="images/cat.jpg" alt="Mushuk">
```

```html
<img src="https://example.com/images/cat.jpg" alt="Mushuk">
```

### `alt` (alternative text) - muqobil matn

**Majburiy** atribut, garchi rasmiy jihatdan brauzer beshiz ishlashdan bosh tortmasa ham. Bu rasmning matnli tavsifi bo'lib, quyidagilarda ko'rsatiladi:

- Agar rasm yuklanmagan bo'lsa (buzilgan havola, internet muammolari);
- Ekran o'quvchisi - ko'zi ojiz foydalanuvchi rasm o'rniga ana shu matnni eshitadi;
- Qidiruv tizimlari — `alt` rasmning qo‘shimcha matnli tavsifini beradi va uning sahifa mazmuniga aloqasini tushunishga yordam beradi. Uni kalit so‘zlar ro‘yxati sifatida emas, avvalo rasmni ko‘ra olmaydigan odamlar uchun yozing.

```html
<img src="cat.jpg" alt="Sochli mushuk derazada o'tiribdi va tashqariga qarayapti">
```

**Yaxshi `alt` qanday yoziladi:** tasvirlangan narsani qisqacha va mazmunli tavsiflang - go'yo telefonda rasmini kimga tushuntiryotgandek. Faqat "rasm" yoki "rasm1" deb yozmang - bu foydasiz.

**Maxsus holat - bezak rasmlari:** agar rasm faqat bezak maqsadida bo'lsa va ma'noli axborot o'tkazmasa (masalan, ajratuvchi naqsh), `alt` **bo'sh** qoldiriladi, lekin butunlay olib tashlanmaydi:

```html
<img src="decorative-line.png" alt="">
```

Bo'sh `alt=""` ekran o'quvchisiga "bu rasmni o'tkazib yuborish mumkin, u axborot o'tkazmaydi" degan signal beradi - bu ongli qaror, unutilgan atribut emas.

### `width` va `height` - rasm o'lchamlari

Eni va bo'yi piksellarda belgilanadi.

```html
<img src="cat.jpg" alt="Derazada o'tirgan sochli mushuk" width="400" height="300">
```

**Agar rasmni CSS orqali cho'zish mumkin bo'lsa, o'lchamlarni nima uchun ko'rsatish kerak:** brauzer rasm hali yuklanayotganda, sahifada to'g'ri o'lchovda joy ajratadi. Buning uchun atrofdagi matn rasm yuklanib o'z o'rnini egallagan paytda "sakrab tushadi" - bu hodisa CLS (sahifa joylashuvining siljishi) deb ataladi va saytning qabul qilinishini yomonlashtiradi.

**Proportsiya haqida muhim:** agar siz rasmning haqiqiy en-boyiga mos kelmaydigan `width` va `height` ko'rsatsangiz, rasm buziladi (g'ayritabiiy cho'ziladi yoki siqiladi). Ikkala qiymatni to'g'ri proporsiyada ko'rsating yoki faqat bittasini - brauzer ikkinchisini proporsiyani saqlab hisoblaydi.

```html
<img src="cat.jpg" alt="Derazada o'tirgan sochli mushuk" width="400">
```

---

### Yangi boshlovchilarning ko'p uchraydigan xatolari

| Xatolik                                                                                | Qanday tuzatish                                                                                     |
| -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `alt` ni butunlay unutish                                                             | Har doim `alt` ko'rsating - tavsif bilan yoki bezak rasmlari uchun bo'sh `alt=""`                   |
| `alt` da foydasiz matn yozish: `alt="rasm"`, `alt="img1"`                             | Rasm tarkibini mazmunli tavsiflang: `alt="Derazada o'tirgan sochli mushuk"`                        |
| `width`/`height` noto'g'ri proporsiyada ko'rsatish - rasm buziladi                     | Haqiqiy en-boy nisbatini saqlang yoki faqat bitta o'lchamni ko'rsating                              |
| `<img>` ni `<a>` o'rnida ishlatish (sahifaga o'tish uchun `onclick` yozish)            | Agar rasm havola sifatida bosilishi kerak bo'lsa - `<img>` ni `<a>` tegiga o'rab qo'ying (pastdagi misol) |

**Rasm-havola:**

```html
<a href="about.html">
    <img src="logo.png" alt="Kompaniya logotipi - Biz haqimizda sahifasiga o'tish" width="150">
</a>
```

---

## Rasm formatlari: JPEG, PNG, SVG, WebP

Turli fayl formatlari turli xil rasm turlariga mos kelishini tushunish muhim - "noto'g'ri" formatni ishlatish yoki fayl hajmini oshiradi yoki sifatni yo'qotadi.

### JPEG (.jpg, .jpeg)

**Fotografiyalar** uchun mos - silliq rang o'tishlari bor murakkab rasmlar (quyosh botishi, portretlar, manzaralar). Sifat yo'qotilgan siqishdan foydalanadi - fayl qanchalik kuchli siqilsa, shunchalik yengil bo'ladi, lekin kamchiliklar shunchalik ko'rinadi.

```html
<img src="sunset-photo.jpg" alt="Tog'lar ustidagi quyosh botishi">
```

**Mos kelmaydi:** matnga, aniq chiziqli logotip va yagona rangli hududlarga - JPEG siqilganda keskin chegaralarda "kirlanish" effektlari paydo bo'ladi.

### PNG (.png)

**Shaffof fonli rasmlar** va **aniq chiziqli grafika** uchun mos - logotip, belgilar, interfeys skrinshotlari. Sifat yo'qotilmasdan siqiladi, lekin shu evaziga fayl bir xil fotosurtdan JPEG dan og'irroq bo'ladi.

```html
<img src="logo-transparent.png" alt="Shaffof fonli kompaniya logotipi">
```

### SVG (.svg)

**Vektorli** format - JPEG/PNG dan farqli o'laroq (ularni piksel tarmog'ida saqlaydi), SVG shakllarning matematik tavsifini saqlaydi. Shu sababli SVG **sifat yo'qotmasdan** istalgan o'lchamga moslashadi - kichik va katta ekranlarda ham ko'rsatiladigan logotip va belgilar uchun ideal.

```html
<img src="icon-star.svg" alt="Yulduz belgisi">
```

**Xususiyati:** SVG fayli aslida matnli XML fayli bo'lib, uni ochib kodni ko'rish mumkin. Bu oddiy grafika uchun fayllarni juda yengil qiladi.

### WebP (.webp)

Google tomonidan yaratilgan zamonaviy format bo'lib, JPEG va PNG ning afzalliklarini birlashtiradi - fotosuratlarni yaxshi siqish **va** shaffoflikni qo'llab-quvvatlash, shu bilan birga odatda JPEG yoki PNG dan yengilroq. Barcha zamonaviy brauzerlar tomonidan qo'llab-quvvatlanadi.

```html
<img src="photo.webp" alt="Shahar manzarasining fotosurati">
```

### Taqqoslash jadvali

| Format | Eng yaxshi ishlatilishi                        | Shaffoflik | Fayl hajmi                              |
| ------ | --------------------------------------------- | ---------- | --------------------------------------- |
| JPEG   | Fotosuratlar                                  | Yo'q       | O'rtacha/kichik (sifat yo'qotilgan holda) |
| PNG    | Logotip, skrinshotlar, shaffof grafika         | Ha         | JPEG dan kattaroq                        |
| SVG    | Belgilar, logotip (vektorli grafika)           | Ha         | Oddiy grafika uchun juda kichik          |
| WebP   | Universal - foto va grafika                    | Ha         | Odatda JPEG/PNG dan kichikroq            |

```mermaid
flowchart TD
    A["Rasm"] --> B{"Oddiy vektor logotip yoki belgi?"}
    B -->|Ha| C["SVG"]
    B -->|Yo‘q| D{"Fotosuratmi?"}
    D -->|Ha| E["JPEG yoki WebP"]
    D -->|Yo‘q| F["PNG yoki WebP: sifat va fayl hajmini taqqoslang"]
```

**Chizmani qanday o‘qish kerak:** Savol tugunidan Ha yoki Yo‘q yo‘nalishini tanlab boring. Oddiy vektor belgi uchun SVG mos; boshqa rasmda foto yoki grafika ekaniga qarab format tanlab, sifat va hajmni taqqoslang.

---

### Yangi boshlovchilarning ko'p uchraydigan xatolari

| Xatolik                                                           | Qanday tuzatish                                                                                |
| ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Fotosuratlar uchun PNG ishlatish                                  | Foto uchun JPEG yoki WebP ishlating - fayl sezilarli darajada yengil bo'ladi                    |
| Shaffof fonli logotip uchun JPEG ishlatish                        | JPEG shaffoflikni qo'llab-quvvatlamaydi - PNG yoki SVG ishlating                               |
| Kameradan olingan katta fotolarni o'zgartirmasdan joylashtirish (bir nechta MB) | Saytga ishlatishdan oldin rasmlarni siqing - katta hajm sahifaning yuklanishini sekinlashtiradi |

---

## `figure` va `figcaption` - rasmlar yorliqlari

Rasimga yorliq kerak bo'lganda (kitob yoki jurnaldagi kabi - "1-rasm. Uning ishlash sxemasi"), `<figure>` va `<figcaption>` teglari juftligi ishlatiladi.

```html
<figure>
    <img src="chart.png" alt="2025-yil sotish o'sishi grafiki" width="500">
    <figcaption>1-rasm. Kompaniya sotishining 2025-yildagi o'sishi</figcaption>
</figure>
```

`<figure>` - bu "mustaqil kontent bloki" (rasm, grafik, kod va h.k.) degan ma'noni anglatuvchi semantik qobiq, `<figcaption>` - uning yorlig'i, `<figure>` ichida birinchi yoki oxirgi farzand element bo‘lishi mumkin.

**Nima uchun oddiy `<img>` + `<p>` emas:** `<figure>`/`<figcaption>` rasmni va yorliqni semantik jihatdan bir butunlik sifatida bog'laydi - bu ekran o'quvchilari va hujjat tuzilishining aniqligi uchun muhim, faqat vizual jihatdan yonma-yon turgan ikki mustaqil elementdan farqli o'laroq.

---

## Mahalliy media fayllarni tayyorlash

`Lesson-4/images` va `Lesson-4/audio` papkalaridagi tayyor fayllardan foydalanishingiz mumkin: kerakli fayllarni o‘z HTML sahifangiz yonidagi `images` va `audio` papkalariga ko‘chiring. Bular o‘quv chizmalari. Alt yozishdan oldin rasmni oching: fayl nomi uning mazmunini kafolatlamaydi. O‘zingizning foydalanishga ruxsat etilgan mediangiz ham mos keladi. Rasm chizish yoki media formatini o‘zgartirish topshiriqqa kirmaydi.

## Kichik topshiriq

Tayyor `images/logo.png` o‘quv rasmini 200 piksel kenglikda, mos alt matni va "Saytimizning o‘quv rasmi" izohi bilan joylashtiring. Boshqa rasm tanlasangiz, aynan o‘sha rasmni tasvirlang.

**Yechim:**

```html
<figure>
    <img src="images/logo.png" alt="O‘quv sahifa maketi: sarlavha va uchta gorizontal mazmun bloki" width="200">
    <figcaption>Saytimizning o‘quv rasmi</figcaption>
</figure>
```

---

## `<audio>` va `<video>` - media joylashtirish

### `<audio>` - sahifada audio

```html
<audio controls>
    <source src="music.mp3" type="audio/mpeg">
    <source src="music.ogg" type="audio/ogg">
    Sizning brauzeringiz audio ijrosini qo'llab-quvvatlamaydi.
</audio>
```

Tushuntiramiz:

- `controls` - qiymatsiz atribut bo'lib, ko'rinadigan boshqaruv panelini (play/pause, balandlik, surish) yoqadi. Usiz audio yuklanadi, lekin foydalanuvchida ko'rinadigan boshqaruv tugmalari bo'lmaydi.
- `<audio>` ichidagi juftlikka kirmaydigan `<source>` tegi faylni ko'rsatadi. Turli formatlarda bir nechta `<source>` ko'rsatish mumkin - brauzer birinchi qo'llab-quvvatlanadigan formatni tanlaydi. Bu shuning uchun zarurki, barcha brauzerlar barcha audio formatlarni bir xil qo'llab-quvvatlamaydi.
- `Sizning brauzeringiz qo'llab-quvvatlamaydi...` matni - bu **zaxira variant (fallback)**, faqat `<audio>` tegini umuman tushunmaydigan juda eski brauzerlarda ko'rsatiladi.

```mermaid
flowchart TD
    A["Brauzer manbalarni ketma-ket tekshiradi"] --> B{"Mos manba topildimi?"}
    B -->|Ha| C["Manba yuklanadi; foydalanuvchi ijroni boshlaydi"]
    B -->|Yo‘q| D["Ijro imkonsiz; faylga ko‘rinadigan havola kerak"]
```

**Chizmani qanday o‘qish kerak:** Brauzer manbalarni yozilgan tartibda ko‘rib, mosini yuklashga urinadi. Mos manba bo‘lmasa, audio ijro etilmaydi; shuning uchun faylga oddiy havolani media elementi tashqarisida ham berish foydali.

### `<video>` - sahifada video

```html
<video controls width="640" height="360">
    <source src="lesson.mp4" type="video/mp4">
    <source src="lesson.webm" type="video/webm">
    Sizning brauzeringiz video ijrosini qo'llab-quvvatlamaydi.
</video>
```

Printip `<audio>` bilan to'liq bir xil, qo'shimcha foydali atributlar mavjud:

```html
<video controls width="640" height="360" poster="preview.jpg" muted loop>
    <source src="lesson.mp4" type="video/mp4">
</video>
```

- `poster` - ijro boshlanishidan **oldin** ko'rsatiladigan almashtiruvchi rasm (YouTube dagi video muqovalariga o'xshaydi).
- `muted` - video ovozsiz boshlanadi.
- `loop` - video tugagandan keyin qayta boshlanadi.
- `autoplay` - sahifa yuklanganda avtomatik boshlash (**ehtiyotkorlik bilan ishlating**: aksariyat brauzerlar foydalanuvchining aniq harakatisiz ovozli avtomatik ijroni bloklaydi - bu saytlar foydalanuvchini to'satdan "qichqirib" yubormaslik uchun qilingan).

**Muhim qoida:** agar video muhim nutq/suhbatni o'z ichiga olasa, yaxshisi subtitrlarni ko'rish kerak (`<track>` tegi, bu kirish darsining doirasidan tashqari, lekin bunday imkoniyat mavjudligini bilish foydali).

---

### Yangi boshlovchilarning ko'p uchraydigan xatolari

| Xatolik                                                   | Qanday tuzatish                                                                                                                                                               |
| --------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `controls` atributini unutish                            | Usiz foydalanuvchida ijro boshqaruv paneli bo'lmaydi                                                                                                                       |
| Ijro etiladigan mos manba yo‘q                         | Bitta qo‘llab-quvvatlanadigan manba yetarli; zarur bo‘lsa moslik uchun boshqa formatni ham qo‘shing (masalan, mp4 va webm)                                                                                       |
| Kerak bo'lmagan holatda ovozli `autoplay` ishlatish       | Aksariyat brauzerlar buni baribir bloklaydi - haqiqatan kerak bo'lsa `autoplay` ni `muted` bilan birga ishlating                                                                |
| Katta videofayllarni to'g'ridan-to'g'ri saytga joylashtirish | Haqiqiy loyihalar uchun YouTube kabi xizmatlarni `<iframe>` bilan islatgan ma'qul (bu mavzu hozirgi dars doirasidan tashqari - zarurat bo'lganda alohida ko'rib chiqamiz)         |

---

## Favicon - sayt belgasi

Favicon - brauzer tabida `<title>` yonida, shuningdek xatcho‘plar va tashrif tarixida ko'rsatiladigan kichik belgi.

`<head>` ichidagi `<link>` tegi orqali ulanadi (`<link>` tegining o'zi 9-darsda batafsil ko'rib chiqiladi - hozir faqat favicon uchun ishlatamiz):

```html
<head>
    <meta charset="UTF-8">
    <title>Mening saytim</title>
    <link rel="icon" type="image/png" href="favicon.png">
</head>
```

- `rel="icon"` - brauzerga bu sayt belgisi ekanini bildiradi.
- `type="image/png"` - fayl formati (`.ico`, `.svg` ham bo'lishi mumkin).
- `href` - belgi faylining yo'li (odatiy kichik kvadrat rasm - 32×32 yoki 16×16 piksel).

**An'anaviy variant:** sayt ildizidagi `favicon.ico` fayli - ko'pchilik brauzerlar uni hatto aniq `<link>` tegisiz ham avtomatik topadi, lekin aniq ko'rsatish ishonchliroq va zamonaviyroq amaliyot.

---

## Dars xulosalari

Bugun siz o'rgandingiz:

- `<img>` - rasmlarni joylashtirish uchun juftlikka kirmaydigan teg, `src` va `alt` majburiy atributlar bilan, shuningdek sahifada joy ajratish uchun ixtiyoriy `width`/`height` bilan.
- To'rtta rasm formati: JPEG (foto), PNG (shaffof grafika), SVG (vektorli grafika, belgilar/logotip), WebP (universal zamonaviy format).
- `<figure>`/`figcaption` - rasmni uning yorlig'i bilan bog'laydigan semantik juftlik.
- `<audio>` va `<video>` bir yoki bir nechta `<source>` orqali media joylashtiradi, boshqaruv paneli uchun `controls` atributi bilan.
- Favicon `<head>` ichidagi `<link rel="icon">` orqali ulanadi va brauzer tabida ko'rsatiladi.


## Mustaqil ish

“Mening qiziqishlarim” sahifasini yarating: sarlavha, tavsif va ikkita rasm. Bir rasmni `figure` va `figcaption` bilan joylashtiring. O‘zingizga tegishli yoki foydalanishga ruxsat berilgan audio yoki videoni `controls` bilan qo‘shing. Rasmlar o‘lchamini va mazmunli `alt` matnini yozing; faqat bezak uchun rasmga `alt=""` bering.

### Tayyorlik mezonlari

- [ ] Barcha mediafayllar mavjud; butun papka ko‘chirilganda yo‘llar ishlaydi.
- [ ] Rasmlarda mos alt bor; figcaption alt o‘rnini bosmaydi.
- [ ] Mediani foydalanuvchi ishga tushiradi; sahifa mediasiz ham tushunarli.

### Bilimingizni tekshiring

1. Qachon alt bo‘sh bo‘lishi kerak?
2. figcaption va alt nimasi bilan farq qiladi?
3. Nima uchun SVG oddiy logotipga mos?

---

[Mundarija](../../README.md) | [Oldingi dars](../../Lesson-3/uz/Havolalar%20va%20navigatsiya.md) | [Keyingi dars](../../Lesson-5/uz/Jadvallar.md) | [RU](../ru/%D0%98%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F%20%D0%B8%20%D0%BC%D0%B5%D0%B4%D0%B8%D0%B0.md) | [EN](../en/Images%20and%20media.md) | [UZ](../uz/Rasmlar%20va%20media.md) | [Amaliyot: namuna](../practice.html)

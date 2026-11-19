# Ma’lumot turlari va operatorlar

[Mundarija](../../README.md) · [← Orqaga](../../Lesson-1/uz/JavaScript%20ga%20kirish.%20Birinchi%20dastur.md) · [Keyingi →](../../Lesson-3/uz/Shartlar.md) · [RU](../ru/%D0%A2%D0%B8%D0%BF%D1%8B%20%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D1%85%20%D0%B8%20%D0%BE%D0%BF%D0%B5%D1%80%D0%B0%D1%82%D0%BE%D1%80%D1%8B.md) · [EN](../en/Data%20types%20and%20operators.md) · [UZ](Ma%27lumot%20turlari%20va%20operatorlar.md)

> **1-dars bilan bog‘liqlik:** siz o‘zgaruvchilarga qiymat solishni o‘rgandingiz. Bugun qiymatlar *qanday* bo‘lishini, ular bilan qanday hisoblashni va nima uchun `"5" + 3` `8` bermasligini ko‘rib chiqamiz.

---

## Bu sizga nima uchun kerak

Internet-do‘kon savati narxlarni qo‘shadi, chegirmani hisoblaydi va «Jami: 121500 so‘m» deb yozadi. Ro‘yxatdan o‘tish formasi yosh so‘z emas, son ekanini tekshiradi. Bularning barchasi **ma’lumot turlari** va **operatorlar** bilan ishlash.

Turni adashtirsangiz, dastur to‘xtamaydi, balki jimgina noto‘g‘ri hisoblaydi: forma maydonidan kelgan `"45000"` narx va `5000` yetkazib berish `"450005000"` ga aylanadi. Bugun bunday xatolarni sezish va tuzatishni o‘rganamiz.

---

## Nimani o‘rganasiz

- Beshta asosiy turni ajratish: `number`, `string`, `boolean`, `null`, `undefined`.
- Qiymat turini `typeof` orqali bilish.
- `+ - * / % **` operatorlari va `+=`, `++` qisqartmalari bilan hisoblash.
- Matnni `` `Jami: ${total}` `` shablon satrlari bilan yig‘ish.
- `length` xususiyati va `toUpperCase`, `toLowerCase`, `trim`, `includes` satr metodlaridan foydalanish.
- Satrni `Number()` orqali songa aylantirish va `NaN` nima ekanini tushunish.
- Qiymatlarni qat’iy solishtirish: `===`, `!==`, `<`, `>`.

---

## Takrorlash: 1-darsdan 3 savol

1. `const` `let` dan nimasi bilan farq qiladi?
2. `let a = 2; a = a + 3; console.log(a);` nimani chiqaradi?
3. `ReferenceError` xatosi nimani anglatadi?

Javoblar - dars oxirida.

---

## Reja

| Bo‘lim | Nima qilamiz |
| --- | --- |
| Ma’lumot turlari | Qutida nima yotibdi |
| Sonlar va arifmetika | Koddagi kalkulyator |
| Satrlar | Matnni birlashtirish va shablonlar |
| Mini-topshiriq 1 | Shablon bo‘yicha salomlashuv |
| Turlarni o‘zgartirish | Nima uchun `"5" + 3 = "53"` |
| Mantiqiy tur va solishtirish | Ha yoki yo‘q |
| Mini-topshiriq 2 | Buyurtma narxini tekshirish |
| Mustaqil ish | Xarid cheki |

---

## Ma’lumot turlari

Har bir qiymatning **turi** bor - u bilan nima qilish mumkinligini belgilaydigan ma’lumot ko‘rinishi.

| Tur | Nimani saqlaydi | Misol |
| --- | --- | --- |
| `number` | Istalgan son: butun, kasr, manfiy | `42`, `3.5`, `-10` |
| `string` | Matn - qo‘shtirnoqdagi satr | `"Anna"`, `"42"` |
| `boolean` | Mantiqiy qiymat: ha yoki yo‘q | `true`, `false` |
| `undefined` | «Qiymat hali berilmagan» | `let x;` - `x` da `undefined` |
| `null` | «Qiymat ataylab yo‘q» | `let winner = null;` |

> **Muhim:** `42` va `"42"` - turli qiymatlar. Birinchisi son, u bilan hisoblash mumkin. Ikkinchisi - ikki belgidan iborat matn.

### `typeof` operatori

`typeof` tur nomini satr ko‘rinishida qaytaradi:

```js
console.log(typeof 42);        // "number"
console.log(typeof "42");      // "string"
console.log(typeof true);      // "boolean"
console.log(typeof undefined); // "undefined"

let city;
console.log(typeof city);      // "undefined"
```

> **Mashhur g‘aroyiblik:** `typeof null` `"object"` qaytaradi. Bu tilning birinchi versiyasidagi xato, uni eski saytlarni buzmasdan tuzatib bo‘lmaydi. Shunchaki eslab qoling.

---

## Sonlar va arifmetika

| Operator | Amal | Misol | Natija |
| --- | --- | --- | --- |
| `+` | Qo‘shish | `7 + 2` | `9` |
| `-` | Ayirish | `7 - 2` | `5` |
| `*` | Ko‘paytirish | `7 * 2` | `14` |
| `/` | Bo‘lish | `7 / 2` | `3.5` |
| `%` | Bo‘lishdagi qoldiq | `7 % 2` | `1` |
| `**` | Darajaga oshirish | `2 ** 3` | `8` |

Amallar tartibi matematikadagi kabi: avval `**`, keyin `*` `/` `%`, keyin `+` `-`. Qavslar tartibni o‘zgartiradi:

```js
console.log(2 + 3 * 4);   // 14
console.log((2 + 3) * 4); // 20
```

### Bo‘lishdagi qoldiq `%`

U o‘ylaganingizdan ko‘ra tez-tez kerak bo‘ladi:

```js
console.log(10 % 2); // 0 - son juft
console.log(7 % 2);  // 1 - toq
console.log(125 % 60); // 5 - 125 daqiqa = 2 soat 5 daqiqa
```

### Qisqartirilgan operatorlar

```js
let score = 10;
score += 5;   // score = score + 5; bilan bir xil → 15
score -= 3;   // score = score - 3;              → 12
score *= 2;   // score = score * 2;              → 24
score++;      // score = score + 1;              → 25
score--;      // score = score - 1;              → 24
```

Qisqartmalar faqat `let` bilan ishlaydi: `const` ni o‘zgartirib bo‘lmaydi.

### Kasr sonlar va yaxlitlash

```js
console.log(0.1 + 0.2);          // 0.30000000000000004
console.log(Math.round(4.6));    // 5
console.log(Math.round(0.1 * 3 * 100) / 100); // 0.3
```

Kompyuter kasrlarni ikkilik ko‘rinishda saqlaydi, shuning uchun `0.1 + 0.2` `0.3` dan biroz katta. Pul uchun butun birliklarda (so‘m, tiyin) hisoblash va `Math.round()` bilan yaxlitlash qulay.

---

## Satrlar

Satr - qo‘shtirnoqdagi matn. Kursda qo‘sh qo‘shtirnoqdan foydalanamiz: `"Salom"`. Bittalik `'Salom'` ham xuddi shunday ishlaydi.

### `+` bilan birlashtirish

```js
const firstName = "Anna";
const greeting = "Salom, " + firstName + "!";
console.log(greeting); // Salom, Anna!
```

Qo‘shtirnoq ichidagi bo‘sh joylarni o‘zingiz qo‘yishingiz kerak: `"Salom," + firstName` `Salom,Anna` beradi.

### Shablon satrlar

Qulayrog‘i - teskari qo‘shtirnoq `` ` `` dagi **shablon satr** (klaviaturada 1 raqami chap tomonidagi tugma). Qiymatlar `${...}` orqali qo‘yiladi:

```js
const firstName = "Anna";
const lessons = 2;
console.log(`Salom, ${firstName}! O‘tilgan darslar: ${lessons}.`);
// Salom, Anna! O‘tilgan darslar: 2.

console.log(`Bir yildan keyin ${lessons * 5} ta dars o‘tasiz`); // ${} ichida hisoblash mumkin
```

Shablon satrlar birlashtirishdan osonroq o‘qiladi, shuning uchun kursda o‘zgaruvchili matnni aynan shunday yig‘amiz.

### Uzunlik va satr metodlari

```js
const word = "  JavaScript  ";

console.log(word.length);          // 14 - bo‘sh joylar ham belgi
console.log(word.trim());          // "JavaScript" - chetlarida bo‘sh joysiz
console.log(word.toUpperCase());   // "  JAVASCRIPT  "
console.log(word.toLowerCase());   // "  javascript  "
console.log(word.includes("Script")); // true
console.log(word.trim()[0]);       // "J" - birinchi belgi, sanash 0 dan
```

`length` - **xususiyat** (qavssiz), `trim()` - **metod** (qavs bilan): satr bajara oladigan amal. Metodlar asl satrni o‘zgartirmaydi, yangisini qaytaradi:

```js
let name = "  anna ";
name.trim();          // natija hech qayerga saqlanmadi
console.log(name);    // "  anna "
name = name.trim();   // saqladik
console.log(name);    // "anna"
```

---

## Mini-topshiriq 1

`const userName = "  timur  ";` e’lon qiling. Konsolga `Xush kelibsiz, TIMUR! Ismda 5 ta harf.` chiqaring - ism bo‘sh joylarsiz va katta harflarda, harflar sonini qo‘lda emas, `length` orqali hisoblang. Shablon satrdan foydalaning. Yechim - «Javoblar» bo‘limida.

---

## Turlarni o‘zgartirish

### `+` tuzog‘i

Satr bilan `+` operatori qo‘shmaydi, **birlashtiradi**:

```js
console.log(5 + 3);     // 8
console.log("5" + 3);   // "53"
console.log("5" - 3);   // 2  - minus faqat sonlar bilan ishlaydi, satr songa aylandi
console.log("5" * "2"); // 10
```

Forma maydonlari va `prompt` dan ma’lumotlar doim **satr** bo‘lib keladi. Ularni darhol songa aylantirmasangiz, qo‘shish birlashtirishga aylanadi.

### `Number()` va `String()`

```js
const quantityText = "3";
const quantity = Number(quantityText);
console.log(quantity + 2);        // 5
console.log(typeof quantity);     // "number"

console.log(String(42) + "!");    // "42!"
```

### `NaN` - «son emas»

```js
console.log(Number("uch"));       // NaN
console.log(Number("12px"));      // NaN
console.log(Number(""));          // 0  - bo‘sh satr nolga aylanadi!
console.log(typeof NaN);          // "number"
```

`NaN` (Not a Number) - songa muvaffaqiyatsiz aylantirish natijasi. U butun hisobni «yuqtiradi»: `NaN + 5` ham `NaN`. Agar chekda summa o‘rniga `NaN` paydo bo‘lsa, songa aylanmagan satrni qidiring.

---

## Mantiqiy tur va solishtirish

Solishtirish `true` yoki `false` qaytaradi:

| Operator | Ma’nosi | Misol | Natija |
| --- | --- | --- | --- |
| `===` | Qat’iy teng (qiymat va tur) | `5 === 5` | `true` |
| `!==` | Qat’iy teng emas | `5 !== "5"` | `true` |
| `>` / `<` | Katta / kichik | `7 > 3` | `true` |
| `>=` / `<=` | Katta yoki teng / kichik yoki teng | `3 >= 3` | `true` |

```js
const age = 16;
const isAdult = age >= 18;
console.log(isAdult);           // false
console.log(typeof isAdult);    // "boolean"
```

Mantiqiy o‘zgaruvchilar nomi odatda `is`, `has`, `can` bilan boshlanadi: `isAdult`, `hasDiscount`, `canEnter`.

### Nima uchun `==` emas

JavaScript’da qat’iy bo‘lmagan `==` solishtirish ham bor. U solishtirishdan oldin turlarni o‘zgartiradi va natijalar kutilmagan bo‘ladi:

```js
console.log(5 == "5");   // true
console.log(0 == "");    // true
console.log(5 === "5");  // false - turlar har xil
```

Kurs qoidasi: **faqat `===` va `!==`**. Turlar farq qilishi mumkin bo‘lsa, avval qiymatni `Number()` orqali aniq aylantiring.

---

## Mini-topshiriq 2

Mahsulot narxi `"25000"` formadan satr bo‘lib keldi, miqdori - `4` soni. Narxni hisoblang, qiymat kamida `100000` bo‘lsa `true` ga teng `const hasFreeDelivery` e’lon qiling va ikkala o‘zgaruvchini chiqaring. Yechim - «Javoblar» bo‘limida.

---

## Dars yakuni: shpargalka

| Vazifa | Yozuv |
| --- | --- |
| Turni bilish | `typeof value` |
| Bo‘lishdagi qoldiq | `a % b` |
| 1 ga / 5 ga oshirish | `count++` / `count += 5` |
| Matnga qiymat qo‘yish | `` `Jami: ${total}` `` |
| Satr uzunligi | `text.length` |
| Bo‘sh joysiz / katta / kichik harf | `text.trim()` / `toUpperCase()` / `toLowerCase()` |
| Satr ichida bormi | `text.includes("abc")` |
| Satrni songa | `Number("42")` |
| Yaxlitlash | `Math.round(x)` |
| Solishtirish | `===`, `!==`, `>`, `<`, `>=`, `<=` |

---

## Mustaqil ish

### 1-qism. IDE topshirig‘i (platforma hisoblaydi)

Xarid chekini hisoblang. Boshlang‘ich kodda ma’lumotlar bor: narx `price`, miqdor `quantityText` - formadagidek **satr** - va chegirma `discountPercent`.

1. `quantity` - `Number()` orqali songa aylantirilgan miqdor.
2. `subtotal` - narxning miqdorga ko‘paytmasi.
3. `discount` - so‘mdagi chegirma: `subtotal` ning `discountPercent` foizi.
4. `total` - to‘lanadigan summa.
5. `isExpensive` - mantiqiy qiymat: `total` `100000` dan katta.
6. `receipt` - shablon satr bilan yig‘ilgan `Jami: <total> so‘m` satri. Uni konsolga chiqaring.

Barcha natijalarni tayyor sonlar bilan emas, ifodalar bilan hisoblang. `var` ishlatmang.

Platforma nimani tekshiradi: oltita o‘zgaruvchining qiymati va turi; `quantity` `Number(quantityText)` orqali olingan; `receipt` `${total}` li shablon satr bilan yig‘ilgan; kodga tayyor javoblar yozilmagan; chek qatori konsolga chiqarilgan.

### 2-qism. Kompyuterdagi loyiha

1. Saytingizning `main.js` faylida bitta mahsulot yoki xizmatni tasvirlang: nomi, narxi, miqdori.
2. Chegirmali narxni hisoblang va chek qatorini shablon satr bilan konsolga chiqaring.
3. Narx-satrni son bilan ataylab qo‘shib, birlashishni ko‘ring; `Number()` bilan tuzating.
4. Har bir o‘zgaruvchining `typeof` ini chiqaring va turlar kutganingizdek ekanini tekshiring.

### Tayyorlik mezonlari

- [ ] IDE topshirig‘i qabul qilindi.
- [ ] Konsolda `NaN` va birlashib ketgan sonlar yo‘q.
- [ ] O‘zgaruvchili matn shablon satrlar bilan yig‘ilgan.
- [ ] Faqat `===` va `!==` ishlatilgan.
- [ ] Mantiqiy o‘zgaruvchilar `is`, `has` yoki `can` bilan nomlangan.

---

## O‘zini tekshirish uchun savollar

1. Beshta asosiy turni va har biriga misol keltiring.
2. `42` `"42"` dan nimasi bilan farq qiladi?
3. `typeof "true"` nimani qaytaradi?
4. `17 % 5` nechaga teng va qoldiq qayerda kerak bo‘ladi?
5. `"10" + 5` nimani chiqaradi, `"10" - 5` chi? Nima uchun?
6. Forma maydonidagi sonni boshqa son bilan qanday to‘g‘ri qo‘shish mumkin?
7. `NaN` nima va u qachon paydo bo‘ladi?
8. Shablon satr `+` bilan birlashtirishdan nimasi bilan qulay?
9. Nima uchun qiymat berilmagan `name.trim();` `name` ni o‘zgartirmaydi?
10. Nima uchun kursda `==` emas, `===` ishlatiladi?

Savollardan keyin platformada **dars testini** topshiring: 12 ta savol, o‘tish chegarasi 70%.

---

## Keyin nima

Endi dastur hisoblay va solishtira oladi. Lekin u hali doim bir xil ishni qiladi. 3-darsda unga **qaror qabul qilishni** o‘rgatamiz: «agar summa 100000 dan katta bo‘lsa - yetkazib berish bepul, aks holda - 15000».

---

## Javoblar

**Takrorlash**

1. `const` qiymatini qayta tayinlab bo‘lmaydi, `let` nikini - mumkin.
2. `5`.
3. E’lon qilinmagan nomga murojaat: xato yozilgan yoki bunday o‘zgaruvchi yo‘q.

**Mini-topshiriq 1**

```js
const userName = "  timur  ";
const cleanName = userName.trim().toUpperCase();
console.log(`Xush kelibsiz, ${cleanName}! Ismda ${cleanName.length} ta harf.`);
```

**Mini-topshiriq 2**

```js
const priceText = "25000";
const quantity = 4;
const cost = Number(priceText) * quantity;
const hasFreeDelivery = cost >= 100000;
console.log(cost, hasFreeDelivery); // 100000 true
```

**O‘zini tekshirish uchun savollar**

1. `number` - `42`, `string` - `"Anna"`, `boolean` - `true`, `undefined` - qiymatsiz e’lon qilingan o‘zgaruvchi qiymati, `null` - `null`.
2. `42` - son, u bilan hisoblanadi; `"42"` - ikki belgili satr.
3. `"string"`: qiymat qo‘shtirnoqda.
4. `2`. Juftlik (`n % 2`), daqiqa va soatlar, har N-element.
5. `"105"` - birlashtirish, `5` - ayirish: minus faqat sonlar bilan ishlaydi va satrni songa aylantiradi.
6. Satrni `Number()` orqali aylantirib, keyin qo‘shish.
7. «Son emas» - muvaffaqiyatsiz aylantirish natijasi, masalan `Number("uch")`.
8. Bo‘sh joylar va `+` ni kuzatish shart emas, `${}` ichida hisoblash mumkin, matn yaxlit o‘qiladi.
9. Satr metodlari yangi satr qaytaradi, asl satrni o‘zgartirmaydi. Natijani saqlash kerak: `name = name.trim();`.
10. `==` turlarni o‘zgartiradi va kutilmagan `true` beradi, `===` qiymat va turni solishtiradi.

---

[Mundarija](../../README.md) · [← Orqaga](../../Lesson-1/uz/JavaScript%20ga%20kirish.%20Birinchi%20dastur.md) · [Keyingi →](../../Lesson-3/uz/Shartlar.md) · [RU](../ru/%D0%A2%D0%B8%D0%BF%D1%8B%20%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D1%85%20%D0%B8%20%D0%BE%D0%BF%D0%B5%D1%80%D0%B0%D1%82%D0%BE%D1%80%D1%8B.md) · [EN](../en/Data%20types%20and%20operators.md) · [UZ](Ma%27lumot%20turlari%20va%20operatorlar.md)

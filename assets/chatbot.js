/* Herb & Organics Co. — on-site assistant (chatbot)
   Fully self-contained: no external APIs, no accounts, no keys.
   Answers product questions from a verified-facts knowledge base and replies
   in the visitor's own language: English, Roman Urdu, or Urdu (اردو).
   Rules: prices are stated plainly (Shampoo Rs. 999, Beldi Black Soap Rs. 300 Small Packet / Rs. 500 Large Packet, Nabat Hair Oil Rs. 700 Small Bottle / Rs. 1,000 Big Bottle). Delivery time/charges are
   NOT published — the team confirms them on the confirmation call.
   Ordering happens ONLY through the order form on this website;
   WhatsApp (+92 343 7124768) is for questions only. */
(function () {
  "use strict";

  var WHATSAPP = "+92 343 7124768";
  var EMAIL = "info@herborganic.store";
  var INSTAGRAM = "@herbsandorganics.store";

  /* ---------------- Knowledge base (verified facts only) ---------------- */
  var KB = {
    greeting: {
      en: "Assalam-o-Alaikum! 🌿 Welcome to Herb & Organics Co. How can I help you? Ask me about our products, prices, ingredients, delivery & COD, or how to order — or tap a topic below.",
      ru: "Assalam-o-Alaikum! 🌿 Herb & Organics Co. mein khush aamdeed. Mein aap ki kya madad kar sakti hun? Products, price, ingredients, delivery & COD ya order ke baray mein poochein — ya neeche kisi topic par tap karein.",
      ur: "السلام علیکم! 🌿 ہرب اینڈ آرگینکس کمپنی میں خوش آمدید۔ میں آپ کی کیا مدد کر سکتی ہوں؟ ہماری پروڈکٹس، قیمت، اجزا، ڈیلیوری و کیش آن ڈیلیوری یا آرڈر کے بارے میں پوچھیں — یا نیچے کسی موضوع پر ٹیپ کریں۔"
    },
    products: {
      en: "We have three products:\n1) NABAT Herbal & Organic Shampoo (300 ml) — Rs. 999. Sulphate free & paraben free, made with 50+ natural ingredients.\n2) Beldi Black Soap (Traditional Moroccan) — Rs. 300 (Small Packet) / Rs. 500 (Large Packet). An olive-based paste soap for deep cleansing and gentle exfoliation.\n3) Nabat Hair Oil — Rs. 700 (Small Bottle) / Rs. 1,000 (Big Bottle). A herbal hair oil in a pump bottle, special made for you.",
      ru: "Hamari 3 products hain:\n1) NABAT Herbal & Organic Shampoo (300 ml) — Rs. 999. Sulphate aur paraben free, 50+ natural ingredients se bana.\n2) Beldi Black Soap (Traditional Moroccan) — Rs. 300 (Small Packet) / Rs. 500 (Large Packet). Zaitoon (olive) se bana paste soap, deep cleansing aur gentle exfoliation ke liye.\n3) Nabat Hair Oil — Rs. 700 (Small Bottle) / Rs. 1,000 (Big Bottle). Pump bottle mein herbal hair oil, special made for you.",
      ur: "ہماری تین پروڈکٹس ہیں:\n۱) نبات ہربل آرگینک شیمپو (300 ملی لیٹر) — 999 روپے۔ سلفیٹ فری اور پیرابن فری، 50 سے زائد قدرتی اجزا سے تیار۔\n۲) بیلدی بلیک سوپ (روایتی مراکشی) — چھوٹا پیکٹ 300 روپے / بڑا پیکٹ 500 روپے۔ زیتون سے بنا پیسٹ صابن، گہری صفائی اور نرمی سے مردہ جلد اتارنے کے لیے۔\n۳) نبات ہیئر آئل — چھوٹی بوتل 700 روپے / بڑی بوتل 1,000 روپے۔ پمپ بوتل میں ہربل ہیئر آئل، خاص آپ کے لیے بنایا گیا۔"
    },
    shampoo_info: {
      en: "NABAT Herbal & Organic Shampoo (300 ml, Rs. 999) is a gentle, plant-based shampoo — sulphate free, paraben free, and no synthetic colors. It is made with 50+ natural ingredients including Amla, Reetha, Shikakai, Hibiscus, Aloe Vera, Rosemary, Castor and Vitamin E. It helps care for dry, frizzy hair and supports a healthy scalp. Best for dry, damaged and frizzy hair, and sensitive scalps.",
      ru: "NABAT Herbal & Organic Shampoo (300 ml, Rs. 999) aik narm, plant-based shampoo hai — sulphate free, paraben free, aur koi synthetic rang nahi. Is mein 50+ natural ingredients hain: Amla, Reetha, Shikakai, Hibiscus, Aloe Vera, Rosemary, Castor aur Vitamin E. Ye khushk aur frizzy baalon ki care mein madad karta hai aur scalp ko healthy rakhne mein support karta hai. Khushk, damaged aur frizzy baalon aur sensitive scalp ke liye behtareen hai.",
      ur: "نبات ہربل آرگینک شیمپو (300 ملی لیٹر، 999 روپے) ایک نرم، نباتی شیمپو ہے — سلفیٹ فری، پیرابن فری، اور کوئی مصنوعی رنگ نہیں۔ اس میں 50 سے زائد قدرتی اجزا ہیں: آملہ، ریٹھا، شیکاکائی، ہیبسکس، ایلو ویرا، روزمیری، ارنڈی اور وٹامن ای۔ یہ خشک اور بے قابو (فریزّی) بالوں کی دیکھ بھال میں مدد دیتا ہے اور سر کی جلد کو صحت مند رکھنے میں معاون ہے۔ خشک، خراب اور فریزّی بالوں اور حساس سر کی جلد کے لیے موزوں ہے۔"
    },
    shampoo_price: {
      en: "NABAT Herbal & Organic Shampoo (300 ml) costs Rs. 999. Payment is Cash on Delivery — you pay only when your parcel arrives.",
      ru: "NABAT Herbal & Organic Shampoo (300 ml) ki price Rs. 999 hai. Payment Cash on Delivery hai — paisay sirf parcel milne par ada karein.",
      ur: "نبات ہربل آرگینک شیمپو (300 ملی لیٹر) کی قیمت 999 روپے ہے۔ ادائیگی کیش آن ڈیلیوری ہے — پیسے صرف پارسل ملنے پر دیں۔"
    },
    prices: {
      en: "Our prices:\n• NABAT Herbal & Organic Shampoo (300 ml): Rs. 999\n• Beldi Black Soap (Traditional Moroccan): Rs. 300 (Small Packet) / Rs. 500 (Large Packet)\n• Nabat Hair Oil: Rs. 700 (Small Bottle) / Rs. 1,000 (Big Bottle)\nPayment is Cash on Delivery — you pay only when your parcel arrives.",
      ru: "Hamari prices:\n• NABAT Herbal & Organic Shampoo (300 ml): Rs. 999\n• Beldi Black Soap (Traditional Moroccan): Rs. 300 (Small Packet) / Rs. 500 (Large Packet)\n• Nabat Hair Oil: Rs. 700 (Small Bottle) / Rs. 1,000 (Big Bottle)\nPayment Cash on Delivery hai — paisay sirf parcel milne par dein.",
      ur: "ہماری قیمتیں:\n• نبات ہربل آرگینک شیمپو (300 ملی لیٹر): 999 روپے\n• بیلدی بلیک سوپ (روایتی مراکشی): چھوٹا پیکٹ 300 روپے / بڑا پیکٹ 500 روپے\n• نبات ہیئر آئل: چھوٹی بوتل 700 روپے / بڑی بوتل 1,000 روپے\nادائیگی کیش آن ڈیلیوری ہے — پیسے صرف پارسل ملنے پر دیں۔"
    },
    beldi_info: {
      en: "Beldi Black Soap is a traditional Moroccan olive-based paste soap. It deep cleanses, gently exfoliates dead skin cells, unclogs pores and nourishes the skin with olive goodness and natural minerals. It is a classic step of the hammam ritual — for body, hands and feet, and the face (with caution). For best results, use 1–2 times a week.",
      ru: "Beldi Black Soap aik riwayati Moroccan sabun hai jo zaitoon (olive) se banta hai — ye aik paste ki shakal ka sabun hai. Ye gehri safai karta hai, dead skin ko narmi se exfoliate karta hai, pores ko saaf rakhta hai aur zaitoon ki khubi se skin ko nourish karta hai. Ye hammam ritual ka classic step hai — jism, hathon aur paon ke liye, aur chehre par (ehtiyaat ke saath). Behtareen results ke liye haftay mein 1–2 martaba istemal karein.",
      ur: "بیلدی بلیک سوپ ایک روایتی مراکشی صابن ہے جو زیتون سے بنتا ہے — یہ پیسٹ کی شکل کا صابن ہے۔ یہ گہری صفائی کرتا ہے، مردہ جلد کو نرمی سے صاف کرتا ہے، مسام کھولتا ہے اور زیتون کی خوبی سے جلد کو غذائیت دیتا ہے۔ یہ حمام کی رسم کا کلاسیکی حصہ ہے — جسم، ہاتھوں اور پاؤں کے لیے، اور چہرے پر (احتیاط کے ساتھ)۔ بہترین نتائج کے لیے ہفتے میں 1–2 مرتبہ استعمال کریں۔"
    },
    beldi_price: {
      en: "Beldi Black Soap costs Rs. 300 (Small Packet) / Rs. 500 (Large Packet). Payment is Cash on Delivery — you pay only when your parcel arrives. To place an order, please use the order form on this website.",
      ru: "Beldi Black Soap ki price Small Packet Rs. 300 aur Large Packet Rs. 500 hai. Payment Cash on Delivery hai — paisay sirf parcel milne par dein. Order ke liye is website ka order form istemal karein.",
      ur: "بیلدی بلیک سوپ کی قیمت چھوٹے پیکٹ کی 300 روپے اور بڑے پیکٹ کی 500 روپے ہے۔ ادائیگی کیش آن ڈیلیوری ہے — پیسے صرف پارسل ملنے پر دیں۔ آرڈر کے لیے اس ویب سائٹ کا آرڈر فارم استعمال کریں۔"
    },
    ingredients: {
      en: "NABAT Shampoo is made with 50+ natural ingredients. The key ones are: Amla, Reetha, Shikakai, Hibiscus, Aloe Vera, Rosemary, Castor and Vitamin E. It is sulphate free, paraben free and has no synthetic colors. Beldi Black Soap is an olive-based traditional Moroccan paste soap with natural minerals.",
      ru: "NABAT Shampoo 50+ natural ingredients se banta hai. Ahem ajza ye hain: Amla, Reetha, Shikakai, Hibiscus, Aloe Vera, Rosemary, Castor aur Vitamin E. Ye sulphate free, paraben free hai aur is mein koi synthetic rang nahi. Beldi Black Soap zaitoon (olive) par mabni riwayati Moroccan paste sabun hai jis mein natural minerals hain.",
      ur: "نبات شیمپو 50 سے زائد قدرتی اجزا سے بنتا ہے۔ اہم اجزا یہ ہیں: آملہ، ریٹھا، شیکاکائی، ہیبسکس، ایلو ویرا، روزمیری، ارنڈی اور وٹامن ای۔ یہ سلفیٹ فری، پیرابن فری ہے اور اس میں کوئی مصنوعی رنگ نہیں۔ بیلدی بلیک سوپ زیتون پر مبنی روایتی مراکشی پیسٹ صابن ہے جس میں قدرتی معدنیات شامل ہیں۔"
    },
    shampoo_use: {
      en: "How to use NABAT Shampoo:\n1) Apply to wet hair.\n2) Massage gently into the scalp.\n3) Work into a lather.\n4) Rinse thoroughly.\n5) Repeat if necessary.",
      ru: "NABAT Shampoo istemal ka tareeqa:\n1) Geelay baalon par lagayein.\n2) Scalp par narmi se massage karein.\n3) Jhaag banayein.\n4) Achi tarah dho lein.\n5) Zaroorat ho to dobara lagayein.",
      ur: "نبات شیمپو استعمال کا طریقہ:\n۱) گیلے بالوں پر لگائیں۔\n۲) سر کی جلد پر نرمی سے مالش کریں۔\n۳) جھاگ بنائیں۔\n۴) اچھی طرح دھو لیں۔\n۵) ضرورت ہو تو دوبارہ لگائیں۔"
    },
    beldi_use: {
      en: "How to use Beldi Black Soap:\n1) Apply to damp skin (body, or face with caution).\n2) Leave for a few minutes to soften dead skin.\n3) Scrub gently with a traditional exfoliating mitt (kessa).\n4) Rinse thoroughly.\nUse 1–2 times per week.",
      ru: "Beldi Black Soap istemal ka tareeqa:\n1) Nam (geeli) skin par lagayein — jism par, ya chehre par ehtiyaat ke saath.\n2) Chand minute chhor dein taake dead skin narm ho jaye.\n3) Riwayati exfoliating mitt (kessa) se narmi se scrub karein.\n4) Achi tarah dho lein.\nHaftay mein 1–2 martaba istemal karein.",
      ur: "بیلدی بلیک سوپ استعمال کا طریقہ:\n۱) نم جلد پر لگائیں — جسم پر، یا چہرے پر احتیاط کے ساتھ۔\n۲) چند منٹ چھوڑ دیں تاکہ مردہ جلد نرم ہو جائے۔\n۳) روایتی ایکسفولیٹنگ دستانے (کیسا) سے نرمی سے رگڑیں۔\n۴) اچھی طرح دھو لیں۔\nہفتے میں 1–2 مرتبہ استعمال کریں۔"
    },
    delivery: {
      en: "We deliver all over Pakistan and Cash on Delivery (COD) is available — you pay in cash only when your parcel arrives at your door. No advance payment and no card needed. Delivery time and delivery charges are not fixed on the website; our team confirms them on the confirmation call after you place your order.",
      ru: "Hum pure Pakistan mein delivery karte hain aur Cash on Delivery (COD) available hai — paisay sirf us waqt dein jab parcel aap ke darwaze par pahunche. Koi advance payment nahi, koi card nahi chahiye. Delivery ka time aur charges website par fixed nahi hain; order ke baad hamari team confirmation call par bata deti hai.",
      ur: "ہم پورے پاکستان میں ڈیلیوری کرتے ہیں اور کیش آن ڈیلیوری (COD) دستیاب ہے — پیسے صرف اس وقت دیں جب پارسل آپ کے دروازے پر پہنچے۔ کوئی پیشگی ادائیگی نہیں، کوئی کارڈ درکار نہیں۔ ڈیلیوری کا وقت اور چارجز ویب سائٹ پر مقرر نہیں ہیں؛ آرڈر کے بعد ہماری ٹیم تصدیقی کال پر بتا دیتی ہے۔"
    },
    order: {
      en: "Ordering is easy and happens right here on the website:\n1) Fill in the order form (name, mobile, city, complete address, product, quantity).\n2) Submit it — your order comes directly to us.\n3) Our team calls you to confirm your order.\n4) You pay Cash on Delivery when your parcel arrives.\nTap the button below to go to the order form.",
      ru: "Order karna bohat aasan hai aur is website par hi hota hai:\n1) Order form bharein (naam, mobile, sheher, mukammal pata, product, quantity).\n2) Submit karein — aap ka order seedha hamare paas aa jata hai.\n3) Hamari team call karke aap ka order confirm karti hai.\n4) Payment Cash on Delivery hai — paisay parcel milne par dein.\nNeeche button dabakar order form par jayein.",
      ur: "آرڈر کرنا بہت آسان ہے اور اسی ویب سائٹ پر ہوتا ہے:\n۱) آرڈر فارم بھریں (نام، موبائل، شہر، مکمل پتہ، پروڈکٹ، مقدار)۔\n۲) جمع کرائیں — آپ کا آرڈر سیدھا ہمارے پاس آ جاتا ہے۔\n۳) ہماری ٹیم کال کرکے آپ کے آرڈر کی تصدیق کرتی ہے۔\n۴) ادائیگی کیش آن ڈیلیوری ہے — پیسے پارسل ملنے پر دیں۔\nنیچے بٹن دبا کر آرڈر فارم پر جائیں۔"
    },
    contact: {
      en: "You can reach us here:\n• WhatsApp (questions only): " + WHATSAPP + "\n• Email: " + EMAIL + "\n• Instagram: " + INSTAGRAM + "\nFor orders, please use the order form on this website — that is the fastest way.",
      ru: "Aap hum se yahan rabta kar sakte hain:\n• WhatsApp (sirf sawalon ke liye): " + WHATSAPP + "\n• Email: " + EMAIL + "\n• Instagram: " + INSTAGRAM + "\nOrder ke liye is website ka order form istemal karein — yehi sab se tez tareeqa hai.",
      ur: "آپ ہم سے یہاں رابطہ کر سکتے ہیں:\n• واٹس ایپ (صرف سوالات کے لیے): " + WHATSAPP + "\n• ای میل: " + EMAIL + "\n• انسٹاگرام: " + INSTAGRAM + "\nآرڈر کے لیے اس ویب سائٹ کا آرڈر فارم استعمال کریں — یہی سب سے تیز طریقہ ہے۔"
    },
    reviews: {
      en: "Yes! Real customer reviews are on our homepage — review videos and quotes from our Instagram community, including customers who used NABAT for 2 months, 1 month and 3 weeks. You can also see more on our Instagram " + INSTAGRAM + ".",
      ru: "Ji haan! Asli customer reviews hamari homepage par mojood hain — Instagram community ki review videos aur quotes, jin mein wo customers bhi hain jinhon ne NABAT 2 months, 1 month aur 3 weeks istemal kiya. Mazeed reviews hamare Instagram " + INSTAGRAM + " par bhi dekh sakte hain.",
      ur: "جی ہاں! اصلی کسٹمر ریویوز ہماری ہوم پیج پر موجود ہیں — انسٹاگرام کمیونٹی کی ریویو ویڈیوز اور اقتباسات، جن میں وہ کسٹمرز بھی ہیں جنہوں نے نبات 2 ماہ، 1 ماہ اور 3 ہفتے استعمال کیا۔ مزید ریویوز ہمارے انسٹاگرام " + INSTAGRAM + " پر بھی دیکھ سکتے ہیں۔"
    },
    oil: {
      en: "Nabat Hair Oil is now available — Rs. 700 for the Small Bottle and Rs. 1,000 for the Big Bottle. It is a herbal hair oil in a handy pump bottle, special made for you. Order through the order form on this website and pay Cash on Delivery.",
      ru: "Nabat Hair Oil ab available hai — Small Bottle Rs. 700 aur Big Bottle Rs. 1,000. Ye pump bottle mein herbal hair oil hai, special made for you. Order is website ke order form se karein, payment Cash on Delivery hai.",
      ur: "نبات ہیئر آئل اب دستیاب ہے — چھوٹی بوتل 700 روپے / بڑی بوتل 1,000 روپے۔ آرڈر اسی ویب سائٹ کے آرڈر فارم سے کریں۔ مزید تصاویر ہمارے انسٹاگرام " + INSTAGRAM + " کو فالو کریں۔"
    },
    thanks: {
      en: "You're welcome! 🌿 If you have any other question — products, prices, delivery or ordering — I am right here.",
      ru: "Khush aamdeed! 🌿 Koi aur sawal ho — products, price, delivery ya order ke baray mein — to mein yahin hun.",
      ur: "خوش آمدید! 🌿 کوئی اور سوال ہو — پروڈکٹس، قیمت، ڈیلیوری یا آرڈر کے بارے میں — تو میں یہیں ہوں۔"
    },
    fallback: {
      en: "Sorry, I don't have an answer for that yet. I can help with: our products, prices, ingredients, how to use each product, delivery & COD, how to order, reviews and contact details. For anything else, WhatsApp us at " + WHATSAPP + " (questions only) — and to place an order, please use the order form on this website.",
      ru: "Maazrat, is sawal ka jawab mere paas abhi nahi hai. Mein in cheezon mein madad kar sakti hun: hamari products, prices, ingredients, har product ka istemal, delivery & COD, order ka tareeqa, reviews aur contact details. Kisi aur cheez ke liye WhatsApp par message karein: " + WHATSAPP + " (sirf sawalon ke liye) — aur order ke liye is website ka order form istemal karein.",
      ur: "معذرت، اس سوال کا جواب میرے پاس ابھی نہیں ہے۔ میں ان چیزوں میں مدد کر سکتی ہوں: ہماری پروڈکٹس، قیمتیں، اجزا، ہر پروڈکٹ کا استعمال، ڈیلیوری و کیش آن ڈیلیوری، آرڈر کا طریقہ، ریویوز اور رابطے کی تفصیل۔ کسی اور چیز کے لیے واٹس ایپ پر پیغام بھیجیں: " + WHATSAPP + " (صرف سوالات کے لیے) — اور آرڈر کے لیے اس ویب سائٹ کا آرڈر فارم استعمال کریں۔"
    }
  };

  /* ---------------- Intent matching (EN + Roman Urdu + Urdu) ---------------- */
  var INTENTS = [
    { id: "beldi_price", re: [
      /beldi[\s\S]{0,45}(price|rate|cost|qemat|qeemat|kitne|kitni)/i,
      /(price|rate|qemat|qeemat)[\s\S]{0,35}beldi/i,
      /بیلدی[\s\S]{0,30}قیمت/, /قیمت[\s\S]{0,25}بیلدی/, /بیلدی[\s\S]{0,30}کتنے/
    ]},
    { id: "shampoo_price", re: [
      /(shampoo|nabat)[\s\S]{0,45}(price|rate|cost|qemat|qeemat|kitne|kitni)/i,
      /(price|rate|qemat|qeemat)[\s\S]{0,35}(shampoo|nabat)/i,
      /شیمپو[\s\S]{0,25}قیمت/, /قیمت[\s\S]{0,25}شیمپو/, /نبات[\s\S]{0,25}قیمت/
    ]},
    { id: "beldi_use", re: [
      /(beldi|black soap|sabun)[\s\S]{0,45}(use|istemal|istimal|istamal|apply|lagana|lagayein|scrub|mitt|kessa)/i,
      /(how|kesay|kaise|kese)[\s\S]{0,35}(beldi|soap|sabun)/i,
      /بیلدی[\s\S]{0,25}استعمال/, /صابن[\s\S]{0,25}استعمال/, /استعمال[\s\S]{0,25}بیلدی/
    ]},
    { id: "shampoo_use", re: [
      /(shampoo|nabat)[\s\S]{0,45}(use|istemal|istimal|istamal|apply|lagana|lagayein|wash)/i,
      /(how|kesay|kaise|kese)[\s\S]{0,35}shampoo/i,
      /شیمپو[\s\S]{0,25}استعمال/, /استعمال[\s\S]{0,25}شیمپو/
    ]},
    { id: "ingredients", re: [
      /ingredient|ajza|contents|chemical|sulphate|sulfate|paraben|natural|اجزا|اجزاء|کیمیکل/i,
      /kya kya (hai|hota|dalta|mila)\b/i
    ]},
    { id: "prices", re: [
      /\b(price|prices|rate|rates|cost|qemat|qeemat|kitne|kitni|kitna)\b/i,
      /قیمت|قیمتیں|کتنے|کتنی/
    ]},
    { id: "delivery", re: [
      /deliver|delivery|cod|cash on|shipping|dispatch|charges|کتنے دن|ڈیلیوری|ترسیل|کیش/i,
      /kab (milega|ayega|pohnchega)/i
    ]},
    { id: "order", re: [
      /\border\b|mangwana|mangw|buy|kharid|place (an )?order|آرڈر|خرید/i,
      /order (karna|kesay|kaise|kese|karoon|karun)/i
    ]},
    { id: "reviews", re: [
      /review|feedback|rating|testimonial|ریویو|جائز/i
    ]},
    { id: "contact", re: [
      /contact|whatsapp|email|instagram|number|rabta|رابطہ|نمبر|واٹس/i
    ]},
    { id: "oil", re: [
      /hair oil|nabat oil|\boil\b|تیل/i
    ]},
    { id: "beldi_info", re: [
      /beldi|black soap|sabun|بیلدی|صابن/i
    ]},
    { id: "shampoo_info", re: [
      /nabat|shampoo|شیمپو/i
    ]},
    { id: "products", re: [
      /product|item|kya kya|سامان|پروڈکٹ/i
    ]},
    { id: "thanks", re: [
      /shukriya|thank|شکریہ|jazak/i
    ]},
    { id: "greeting", re: [
      /^\s*(hi|hii+|hello|hey|salam|assalam|aoa|السلام|ہیلو)\b/i
    ]}
  ];

  function detectLang(text) {
    if (/[\u0600-\u06FF]/.test(text)) { return "ur"; }
    if (/\b(kya|hai|hain|nahi|kitne|kitni|kitna|chahiye|mujhe|mera|meri|mere|baal|sabun|qemat|qeemat|mangwana|mangwa|batao|bata|kesay|kaise|kese|kab|kahan|kyun|acha|theek|shukriya|pooch|karna|karke|lagana|lagayein|istemal|istimal|istamal|paisay|rupay|wala|wali|aap|apke|hamari|hamara|milega|bhej|dena|lena|chahye|krna|kr|ho|hoga|gaya|liye|baray)\b/i.test(text)) { return "ru"; }
    return "en";
  }

  function matchIntent(text) {
    for (var i = 0; i < INTENTS.length; i++) {
      var res = INTENTS[i].re;
      for (var j = 0; j < res.length; j++) {
        if (res[j].test(text)) { return INTENTS[i].id; }
      }
    }
    return "fallback";
  }

  /* ---------------- Widget ---------------- */
  var lang = "en";
  var opened = false;

  var fab = document.createElement("button");
  fab.type = "button";
  fab.className = "chat-fab";
  fab.setAttribute("aria-label", "Chat with the Herb & Organics Assistant");
  fab.innerHTML = "💬";

  var panel = document.createElement("section");
  panel.className = "chat-panel";
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-label", "Herb & Organics Assistant");
  panel.innerHTML =
    '<div class="chat-head">' +
      '<div><div class="chat-title">Herb &amp; Organics Assistant</div>' +
      '<div class="chat-sub">Products • Prices • Delivery • Ordering</div></div>' +
      '<button type="button" class="chat-close" aria-label="Close chat">✕</button>' +
    "</div>" +
    '<div class="chat-chips" role="group" aria-label="Quick topics">' +
      '<button type="button" class="chat-chip" data-intent="products">Products</button>' +
      '<button type="button" class="chat-chip" data-intent="prices">Prices</button>' +
      '<button type="button" class="chat-chip" data-intent="delivery">Delivery &amp; COD</button>' +
      '<button type="button" class="chat-chip" data-intent="order">How to Order</button>' +
      '<button type="button" class="chat-chip" data-intent="ingredients">Ingredients</button>' +
      '<button type="button" class="chat-chip" data-intent="contact">Contact</button>' +
    "</div>" +
    '<div class="chat-msgs" aria-live="polite"></div>' +
    '<form class="chat-form">' +
      '<input type="text" class="chat-input" placeholder="Apna sawal likhein… / Type your question…" aria-label="Type your question" autocomplete="off">' +
      '<button type="submit" class="chat-send">Send</button>' +
    "</form>";

  document.body.appendChild(fab);
  document.body.appendChild(panel);

  var msgsEl = panel.querySelector(".chat-msgs");
  var inputEl = panel.querySelector(".chat-input");
  var formEl = panel.querySelector(".chat-form");

  function orderTarget() {
    if (document.getElementById("order-form")) { return "#order"; }
    var p = window.location.pathname;
    if (p.indexOf("/products/") !== -1 || p.indexOf("/blog/") !== -1) { return "../#order"; }
    return "./#order";
  }

  function addMsg(text, who, intentId) {
    var div = document.createElement("div");
    div.className = "chat-msg " + who;
    div.setAttribute("dir", "auto");
    div.textContent = text;
    if (who === "bot" && intentId === "order") {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "chat-order-btn";
      btn.textContent = "Go to Order Form →";
      btn.addEventListener("click", function () {
        var t = orderTarget();
        if (t === "#order") {
          closePanel();
          var el = document.getElementById("order");
          if (el) { el.scrollIntoView({ behavior: "smooth" }); }
        } else {
          window.location.href = t;
        }
      });
      div.appendChild(document.createElement("br"));
      div.appendChild(btn);
    }
    msgsEl.appendChild(div);
    msgsEl.scrollTop = msgsEl.scrollHeight;
  }

  function botReply(intentId) {
    var entry = KB[intentId] || KB.fallback;
    var text = entry[lang] || entry.en;
    window.setTimeout(function () { addMsg(text, "bot", intentId); }, 300);
  }

  function openPanel() {
    panel.classList.add("open");
    fab.setAttribute("aria-expanded", "true");
    if (!opened) {
      opened = true;
      addMsg(KB.greeting.en, "bot");
    }
    if (inputEl) { inputEl.focus(); }
  }
  function closePanel() {
    panel.classList.remove("open");
    fab.setAttribute("aria-expanded", "false");
  }

  fab.addEventListener("click", function () {
    if (panel.classList.contains("open")) { closePanel(); } else { openPanel(); }
  });
  panel.querySelector(".chat-close").addEventListener("click", closePanel);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && panel.classList.contains("open")) { closePanel(); }
  });

  var chips = panel.querySelectorAll(".chat-chip");
  for (var c = 0; c < chips.length; c++) {
    chips[c].addEventListener("click", function () {
      botReply(this.getAttribute("data-intent"));
    });
  }

  formEl.addEventListener("submit", function (e) {
    e.preventDefault();
    var text = inputEl.value.trim();
    if (!text) { return; }
    inputEl.value = "";
    lang = detectLang(text);
    addMsg(text, "user");
    botReply(matchIntent(text));
  });
})();

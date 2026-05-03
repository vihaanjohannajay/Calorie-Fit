'use strict';

// ═══════════════════════════════════════════════════════════════
//  i18n
// ═══════════════════════════════════════════════════════════════
const I18N={
  en:{search:'Search {n} foods...',sel:'{n} selected',next:'Next →',back:'← Back',optimize:'⚡ Optimize meals',save_log:'📅 Save to log',surprise:'🎲 Surprise me',clear:'Clear all',saved:'Saved to log! 📅',prof_saved:'Profile saved!',cleared:'Cleared!'},
  hi:{search:'{n} खाद्य खोजें...',sel:'{n} चुने',next:'आगे →',back:'← पीछे',optimize:'⚡ अनुकूलित करें',save_log:'📅 लॉग में सेव',surprise:'🎲 सरप्राइज़',clear:'साफ़ करें',saved:'लॉग में सेव! 📅',prof_saved:'प्रोफाइल सेव!',cleared:'साफ़!'}
};
let LANG='en';
function t(k,v={}){let s=(I18N[LANG]||I18N.en)[k]||k;Object.entries(v).forEach(([a,b])=>s=s.replace('{'+a+'}',b));return s;}

// ═══════════════════════════════════════════════════════════════
//  FOOD DATABASE
//  subs:[]: array of meal steps this food appears in
//  vit:{}: vitamins/minerals (% of daily value per serving)
//    a=VitA, c=VitC, d=VitD, b12=B12, iron=Iron, calcium=Ca,
//    potassium=K, zinc=Zinc, folate=Folate, magnesium=Mg
// ═══════════════════════════════════════════════════════════════
const BASE_FOODS=[
// ─── INDIAN BREAKFAST ───────────────────────────────────────
{id:1,  name:"Idli (2 pcs)",         hi:"इडली",            brand:"",          cal:140,p:4, c:28,f:1, sugar:1, fiber:2, cat:"indian",  subs:["breakfast"],                      emoji:"🍚",price:30, tags:["veg","gluten-free","jain"], vit:{iron:8,calcium:4,magnesium:6,folate:5}},
{id:2,  name:"Masala dosa",          hi:"मसाला दोसा",       brand:"",          cal:220,p:5, c:38,f:7, sugar:2, fiber:3, cat:"indian",  subs:["breakfast"],                      emoji:"🫓",price:60, tags:["veg"],                      vit:{iron:10,potassium:12,vitC:8,magnesium:8}},
{id:3,  name:"Plain dosa",           hi:"सादा दोसा",        brand:"",          cal:165,p:4, c:30,f:4, sugar:1, fiber:2, cat:"indian",  subs:["breakfast"],                      emoji:"🫓",price:40, tags:["veg","gluten-free"],        vit:{iron:8,calcium:3,magnesium:5}},
{id:4,  name:"Upma",                 hi:"उपमा",             brand:"",          cal:180,p:4, c:32,f:5, sugar:2, fiber:2, cat:"indian",  subs:["breakfast"],                      emoji:"🥣",price:35, tags:["veg"],                      vit:{iron:10,b12:0,magnesium:7,folate:4}},
{id:5,  name:"Poha",                 hi:"पोहा",             brand:"",          cal:160,p:3, c:30,f:4, sugar:2, fiber:2, cat:"indian",  subs:["breakfast"],                      emoji:"🍽️",price:30, tags:["veg","gluten-free"],        vit:{iron:15,vitC:5,magnesium:5}},
{id:6,  name:"Aloo paratha",         hi:"आलू पराठा",        brand:"",          cal:300,p:7, c:46,f:10,sugar:2, fiber:3, cat:"indian",  subs:["breakfast"],                      emoji:"🫓",price:50, tags:["veg"],                      vit:{vitC:10,iron:12,potassium:10,magnesium:8}},
{id:7,  name:"Plain paratha",        hi:"सादा पराठा",       brand:"",          cal:250,p:5, c:38,f:8, sugar:1, fiber:2, cat:"indian",  subs:["breakfast"],                      emoji:"🫓",price:35, tags:["veg"],                      vit:{iron:10,calcium:4,magnesium:6}},
{id:8,  name:"Puri (2 pcs)",         hi:"पूरी",             brand:"",          cal:280,p:5, c:42,f:11,sugar:1, fiber:2, cat:"indian",  subs:["breakfast"],                      emoji:"🫔",price:40, tags:["veg"],                      vit:{iron:8,calcium:3}},
{id:9,  name:"Medu vada",            hi:"मेदु वड़ा",         brand:"",          cal:190,p:6, c:28,f:7, sugar:1, fiber:3, cat:"indian",  subs:["breakfast","snack"],              emoji:"🍩",price:40, tags:["veg"],                      vit:{iron:12,zinc:5,magnesium:8}},
{id:10, name:"Uttapam",              hi:"उत्तपम",            brand:"",          cal:200,p:6, c:34,f:5, sugar:2, fiber:3, cat:"indian",  subs:["breakfast"],                      emoji:"🥞",price:50, tags:["veg"],                      vit:{vitC:6,iron:10,calcium:5,folate:6}},
{id:11, name:"Pesarattu",            hi:"पेसरट्टू",          brand:"",          cal:175,p:8, c:28,f:4, sugar:1, fiber:4, cat:"indian",  subs:["breakfast"],                      emoji:"🫓",price:40, tags:["veg","gluten-free"],        vit:{iron:14,folate:12,magnesium:10,zinc:6}},
{id:12, name:"Besan chilla",         hi:"बेसन चिल्ला",      brand:"",          cal:150,p:8, c:20,f:4, sugar:2, fiber:4, cat:"indian",  subs:["breakfast","snack"],              emoji:"🥞",price:35, tags:["veg","gluten-free"],        vit:{iron:15,folate:14,magnesium:10,zinc:7}},
{id:13, name:"Pongal",               hi:"पोंगल",             brand:"",          cal:210,p:5, c:36,f:6, sugar:1, fiber:2, cat:"indian",  subs:["breakfast"],                      emoji:"🍲",price:35, tags:["veg"],                      vit:{iron:8,magnesium:7,zinc:5}},
{id:14, name:"Appam",                hi:"अप्पम",             brand:"",          cal:160,p:3, c:30,f:3, sugar:3, fiber:1, cat:"indian",  subs:["breakfast"],                      emoji:"🫓",price:40, tags:["veg","gluten-free"],        vit:{calcium:3,iron:5}},
{id:15, name:"Egg bhurji",           hi:"एग भुर्जी",         brand:"",          cal:200,p:14,c:4, f:14,sugar:2, fiber:1, cat:"indian",  subs:["breakfast"],                      emoji:"🍳",price:50, tags:["non-veg","gluten-free"],   vit:{vitA:15,b12:20,vitD:8,zinc:10,iron:10}},
{id:16, name:"Moong dal cheela",     hi:"मूंग दाल चीला",    brand:"",          cal:140,p:9, c:18,f:3, sugar:1, fiber:4, cat:"indian",  subs:["breakfast","snack"],              emoji:"🥞",price:35, tags:["veg","gluten-free"],        vit:{iron:16,folate:18,magnesium:12,zinc:8}},
{id:17, name:"Methi paratha",        hi:"मेथी पराठा",        brand:"",          cal:260,p:7, c:38,f:8, sugar:1, fiber:4, cat:"indian",  subs:["breakfast"],                      emoji:"🫓",price:40, tags:["veg"],                      vit:{vitA:8,iron:18,calcium:8,magnesium:10,folate:10}},
{id:18, name:"Rava idli",            hi:"रवा इडली",          brand:"",          cal:155,p:4, c:28,f:3, sugar:2, fiber:2, cat:"indian",  subs:["breakfast"],                      emoji:"🍚",price:40, tags:["veg"],                      vit:{iron:8,calcium:4,magnesium:5}},
{id:19, name:"Bread omelette",       hi:"ब्रेड ऑमलेट",       brand:"",          cal:280,p:14,c:24,f:14,sugar:2, fiber:2, cat:"indian",  subs:["breakfast"],                      emoji:"🍳",price:40, tags:["non-veg"],                  vit:{vitA:12,b12:18,vitD:6,iron:12,calcium:6}},
{id:200,name:"Cornflakes + milk",    hi:"कॉर्नफ्लेक्स",      brand:"",          cal:180,p:7, c:34,f:2, sugar:8, fiber:2, cat:"western", subs:["breakfast"],                      emoji:"🥣",price:50, tags:["veg","dairy"],              vit:{vitD:15,b12:25,iron:25,calcium:15,vitA:10}},
{id:201,name:"Muesli bowl",          hi:"म्यूसली",           brand:"",          cal:280,p:9, c:48,f:6, sugar:12,fiber:6, cat:"western", subs:["breakfast"],                      emoji:"🥣",price:80, tags:["veg","dairy"],              vit:{iron:20,magnesium:15,zinc:10,folate:8}},
{id:202,name:"Sprouts salad",        hi:"स्प्राउट्स",        brand:"",          cal:120,p:8, c:16,f:1, sugar:2, fiber:5, cat:"indian",  subs:["breakfast","snack"],              emoji:"🌱",price:30, tags:["veg","gluten-free","jain"], vit:{vitC:20,folate:22,iron:14,potassium:10,magnesium:8}},
// ─── INDIAN LUNCH ───────────────────────────────────────────
{id:20, name:"Dal tadka",            hi:"दाल तड़का",          brand:"",          cal:180,p:9, c:28,f:4, sugar:3, fiber:6, cat:"indian",  subs:["lunch","dinner"],                 emoji:"🍲",price:80, tags:["veg","gluten-free"],        vit:{iron:20,folate:18,magnesium:12,zinc:8,potassium:10}},
{id:21, name:"Dal makhani",          hi:"दाल मखनी",          brand:"",          cal:260,p:10,c:32,f:11,sugar:4, fiber:7, cat:"indian",  subs:["lunch","dinner"],                 emoji:"🍲",price:120,tags:["veg","gluten-free","dairy"],  vit:{iron:22,folate:16,calcium:8,magnesium:14,zinc:10}},
{id:22, name:"Rajma",                hi:"राजमा",             brand:"",          cal:210,p:12,c:30,f:4, sugar:3, fiber:8, cat:"indian",  subs:["lunch","dinner"],                 emoji:"🫘",price:90, tags:["veg","gluten-free"],        vit:{iron:24,folate:20,potassium:18,magnesium:16,zinc:10}},
{id:23, name:"Chole",                hi:"छोले",              brand:"",          cal:230,p:11,c:32,f:6, sugar:4, fiber:7, cat:"indian",  subs:["lunch","dinner"],                 emoji:"🫘",price:90, tags:["veg","gluten-free"],        vit:{iron:20,vitC:10,folate:18,magnesium:14,zinc:9}},
{id:24, name:"Paneer butter masala", hi:"पनीर बटर मसाला",   brand:"",          cal:320,p:14,c:18,f:22,sugar:6, fiber:2, cat:"indian",  subs:["lunch","dinner"],                 emoji:"🧀",price:160,tags:["veg","gluten-free","dairy"],  vit:{vitA:12,calcium:18,vitD:5,b12:6,zinc:8}},
{id:25, name:"Palak paneer",         hi:"पालक पनीर",         brand:"",          cal:280,p:13,c:14,f:19,sugar:3, fiber:4, cat:"indian",  subs:["lunch","dinner"],                 emoji:"🥬",price:140,tags:["veg","gluten-free","dairy"],  vit:{vitA:45,vitC:18,iron:20,calcium:16,folate:16}},
{id:26, name:"Aloo gobi",            hi:"आलू गोभी",          brand:"",          cal:190,p:4, c:28,f:7, sugar:4, fiber:4, cat:"indian",  subs:["lunch","dinner"],                 emoji:"🥦",price:80, tags:["veg","gluten-free","jain"], vit:{vitC:35,vitK:20,folate:12,potassium:12}},
{id:27, name:"Baingan bharta",       hi:"बैंगन भर्ता",       brand:"",          cal:160,p:4, c:18,f:8, sugar:5, fiber:5, cat:"indian",  subs:["lunch","dinner"],                 emoji:"🍆",price:90, tags:["veg","gluten-free"],        vit:{vitB6:10,folate:10,potassium:14,magnesium:8}},
{id:28, name:"Chicken biryani",      hi:"चिकन बिरयानी",      brand:"",          cal:450,p:28,c:55,f:14,sugar:4, fiber:3, cat:"indian",  subs:["lunch","dinner"],                 emoji:"🍛",price:200,tags:["non-veg","gluten-free"],     vit:{b12:15,iron:18,zinc:20,niacin:30,magnesium:10}},
{id:29, name:"Veg biryani",          hi:"वेज बिरयानी",       brand:"",          cal:350,p:8, c:58,f:10,sugar:4, fiber:4, cat:"indian",  subs:["lunch","dinner"],                 emoji:"🍛",price:150,tags:["veg","gluten-free"],        vit:{vitA:8,iron:14,folate:10,magnesium:8}},
{id:30, name:"Jeera rice",           hi:"जीरा राइस",         brand:"",          cal:250,p:4, c:50,f:4, sugar:1, fiber:1, cat:"indian",  subs:["lunch","dinner"],                 emoji:"🍚",price:60, tags:["veg","gluten-free","jain"], vit:{iron:6,magnesium:5}},
{id:31, name:"Roti (2 pcs)",         hi:"रोटी",              brand:"",          cal:180,p:5, c:34,f:3, sugar:1, fiber:3, cat:"indian",  subs:["lunch","dinner"],                 emoji:"🫓",price:20, tags:["veg"],                      vit:{iron:12,magnesium:8,zinc:5,folate:4}},
{id:32, name:"Naan",                 hi:"नान",               brand:"",          cal:280,p:7, c:50,f:5, sugar:2, fiber:2, cat:"indian",  subs:["lunch","dinner"],                 emoji:"🫓",price:50, tags:["veg"],                      vit:{iron:10,calcium:3,folate:5}},
{id:33, name:"Sambar",               hi:"सांभर",             brand:"",          cal:90, p:4, c:14,f:2, sugar:4, fiber:5, cat:"indian",  subs:["breakfast","lunch","dinner"],     emoji:"🍲",price:30, tags:["veg","gluten-free"],        vit:{vitC:12,iron:10,folate:10,magnesium:8}},
{id:34, name:"Rasam",                hi:"रसम",               brand:"",          cal:50, p:2, c:8, f:1, sugar:3, fiber:2, cat:"indian",  subs:["lunch","dinner"],                 emoji:"🍵",price:20, tags:["veg","gluten-free"],        vit:{vitC:8,iron:5,magnesium:4}},
{id:35, name:"Curd rice",            hi:"दही चावल",          brand:"",          cal:200,p:5, c:36,f:4, sugar:4, fiber:1, cat:"indian",  subs:["lunch","dinner"],                 emoji:"🍚",price:50, tags:["veg","gluten-free","dairy"], vit:{calcium:12,b12:8,vitD:3,potassium:6}},
{id:36, name:"Pav bhaji",            hi:"पाव भाजी",          brand:"",          cal:380,p:9, c:56,f:14,sugar:8, fiber:5, cat:"indian",  subs:["lunch","dinner","snack"],         emoji:"🍞",price:100,tags:["veg"],                      vit:{vitA:15,vitC:30,iron:12,potassium:14}},
{id:37, name:"Khichdi",              hi:"खिचड़ी",             brand:"",          cal:220,p:8, c:38,f:4, sugar:2, fiber:5, cat:"indian",  subs:["lunch","dinner"],                 emoji:"🍲",price:60, tags:["veg","gluten-free"],        vit:{iron:14,folate:12,magnesium:10,zinc:7}},
{id:38, name:"Chana masala",         hi:"चना मसाला",         brand:"",          cal:240,p:12,c:35,f:6, sugar:5, fiber:8, cat:"indian",  subs:["lunch","dinner"],                 emoji:"🫘",price:90, tags:["veg","gluten-free"],        vit:{iron:22,vitC:12,folate:20,magnesium:15,zinc:10}},
{id:39, name:"Matar paneer",         hi:"मटर पनीर",          brand:"",          cal:290,p:12,c:20,f:18,sugar:5, fiber:4, cat:"indian",  subs:["lunch","dinner"],                 emoji:"🧀",price:150,tags:["veg","gluten-free","dairy"],  vit:{vitA:10,vitC:15,calcium:16,iron:12,zinc:8}},
{id:40, name:"Lemon rice",           hi:"लेमन राइस",         brand:"",          cal:220,p:4, c:40,f:5, sugar:1, fiber:2, cat:"indian",  subs:["lunch","dinner"],                 emoji:"🍚",price:50, tags:["veg","gluten-free","jain"], vit:{vitC:8,iron:6,magnesium:5}},
{id:41, name:"Kadai paneer",         hi:"कड़ाई पनीर",         brand:"",          cal:300,p:13,c:16,f:20,sugar:5, fiber:3, cat:"indian",  subs:["lunch","dinner"],                 emoji:"🧀",price:160,tags:["veg","gluten-free","dairy"],  vit:{vitA:14,vitC:25,calcium:18,iron:10,zinc:8}},
{id:42, name:"Mixed veg curry",      hi:"मिक्स सब्जी",       brand:"",          cal:180,p:4, c:22,f:8, sugar:5, fiber:5, cat:"indian",  subs:["lunch","dinner"],                 emoji:"🥘",price:80, tags:["veg","gluten-free","jain"], vit:{vitA:20,vitC:30,iron:10,folate:12,potassium:12}},
{id:43, name:"Pulao",                hi:"पुलाव",             brand:"",          cal:300,p:6, c:52,f:8, sugar:3, fiber:3, cat:"indian",  subs:["lunch","dinner"],                 emoji:"🍚",price:100,tags:["veg","gluten-free"],        vit:{vitA:8,iron:8,magnesium:8,folate:6}},
{id:44, name:"Chapati + sabzi",      hi:"चपाती + सब्जी",     brand:"",          cal:260,p:8, c:42,f:6, sugar:3, fiber:5, cat:"indian",  subs:["lunch","dinner"],                 emoji:"🍽️",price:60, tags:["veg"],                      vit:{vitA:12,vitC:15,iron:14,folate:10,magnesium:10}},
{id:45, name:"Idli + sambar",        hi:"इडली + सांभर",      brand:"",          cal:230,p:8, c:42,f:3, sugar:5, fiber:7, cat:"indian",  subs:["breakfast","lunch"],              emoji:"🍚",price:50, tags:["veg","gluten-free"],        vit:{vitC:14,iron:18,folate:14,magnesium:10}},
// ─── INDIAN DINNER ──────────────────────────────────────────
{id:50, name:"Butter chicken",       hi:"बटर चिकन",          brand:"",          cal:360,p:28,c:14,f:22,sugar:6, fiber:2, cat:"indian",  subs:["dinner","lunch"],                 emoji:"🍗",price:200,tags:["non-veg","gluten-free"],     vit:{vitA:18,b12:18,iron:15,zinc:22,niacin:28}},
{id:51, name:"Mutton curry",         hi:"मटन करी",           brand:"",          cal:400,p:30,c:10,f:28,sugar:3, fiber:2, cat:"indian",  subs:["dinner"],                         emoji:"🥩",price:250,tags:["non-veg","gluten-free"],     vit:{b12:25,iron:22,zinc:28,niacin:30,magnesium:12}},
{id:52, name:"Fish curry",           hi:"मछली करी",          brand:"",          cal:280,p:24,c:12,f:16,sugar:3, fiber:2, cat:"indian",  subs:["dinner","lunch"],                 emoji:"🐟",price:200,tags:["non-veg","gluten-free"],     vit:{vitD:20,b12:30,iron:12,omega3:40,zinc:14}},
{id:53, name:"Egg curry",            hi:"अंडा करी",          brand:"",          cal:230,p:14,c:10,f:16,sugar:3, fiber:2, cat:"indian",  subs:["dinner","lunch"],                 emoji:"🥚",price:120,tags:["non-veg","gluten-free"],     vit:{vitA:12,b12:16,vitD:6,iron:10,zinc:10}},
{id:54, name:"Tandoori chicken",     hi:"तंदूरी चिकन",       brand:"",          cal:290,p:32,c:6, f:16,sugar:2, fiber:1, cat:"indian",  subs:["dinner","lunch","snack"],         emoji:"🍗",price:220,tags:["non-veg","gluten-free"],     vit:{b12:20,niacin:35,zinc:20,iron:10,selenium:25}},
{id:55, name:"Chicken tikka",        hi:"चिकन टिक्का",       brand:"",          cal:280,p:30,c:5, f:16,sugar:2, fiber:1, cat:"indian",  subs:["dinner","lunch","snack"],         emoji:"🍢",price:200,tags:["non-veg","gluten-free"],     vit:{b12:18,niacin:32,zinc:18,iron:10,selenium:22}},
{id:56, name:"Paneer tikka",         hi:"पनीर टिक्का",       brand:"",          cal:260,p:14,c:10,f:18,sugar:3, fiber:2, cat:"indian",  subs:["dinner","lunch","snack"],         emoji:"🧀",price:180,tags:["veg","gluten-free","dairy"],  vit:{calcium:22,vitA:10,vitD:5,zinc:8,b12:8}},
{id:57, name:"Dal fry + roti",       hi:"दाल + रोटी",        brand:"",          cal:280,p:12,c:46,f:6, sugar:2, fiber:7, cat:"indian",  subs:["dinner","lunch"],                 emoji:"🍽️",price:60, tags:["veg"],                      vit:{iron:20,folate:16,magnesium:12,zinc:8}},
{id:58, name:"Prawn masala",         hi:"झींगा मसाला",       brand:"",          cal:260,p:26,c:10,f:14,sugar:3, fiber:2, cat:"indian",  subs:["dinner"],                         emoji:"🦐",price:250,tags:["non-veg","gluten-free"],     vit:{b12:22,zinc:20,iron:14,selenium:30,vitD:8}},
{id:59, name:"Chicken fried rice",   hi:"चिकन फ्राइड राइस",  brand:"",          cal:380,p:18,c:50,f:12,sugar:3, fiber:2, cat:"indian",  subs:["lunch","dinner"],                 emoji:"🍚",price:160,tags:["non-veg","gluten-free"],     vit:{b12:10,niacin:20,iron:10,zinc:12}},
{id:60, name:"Egg fried rice",       hi:"एग फ्राइड राइस",    brand:"",          cal:340,p:14,c:50,f:10,sugar:2, fiber:2, cat:"indian",  subs:["lunch","dinner"],                 emoji:"🍚",price:120,tags:["non-veg","gluten-free"],     vit:{vitA:8,b12:12,iron:10,zinc:8}},
// ─── INDIAN SNACKS ──────────────────────────────────────────
{id:61, name:"Samosa (2 pcs)",       hi:"समोसा",             brand:"",          cal:280,p:5, c:36,f:13,sugar:2, fiber:3, cat:"indian",  subs:["snack","breakfast"],              emoji:"🔺",price:30, tags:["veg"],                      vit:{iron:8,potassium:8,vitC:5}},
{id:62, name:"Pakora (6 pcs)",       hi:"पकौड़ा",            brand:"",          cal:220,p:5, c:28,f:11,sugar:2, fiber:3, cat:"indian",  subs:["snack"],                          emoji:"🍤",price:40, tags:["veg"],                      vit:{iron:8,folate:6}},
{id:63, name:"Bhel puri",            hi:"भेल पूरी",          brand:"",          cal:180,p:4, c:32,f:5, sugar:4, fiber:3, cat:"indian",  subs:["snack"],                          emoji:"🥗",price:40, tags:["veg"],                      vit:{iron:8,vitC:6}},
{id:64, name:"Dhokla",               hi:"ढोकला",             brand:"",          cal:150,p:6, c:24,f:3, sugar:4, fiber:2, cat:"indian",  subs:["breakfast","snack"],              emoji:"🟡",price:40, tags:["veg","gluten-free"],        vit:{iron:10,folate:8,calcium:4}},
{id:65, name:"Roasted chana",        hi:"भुना चना",          brand:"",          cal:130,p:8, c:20,f:2, sugar:2, fiber:5, cat:"indian",  subs:["snack"],                          emoji:"🟤",price:15, tags:["veg","gluten-free","jain"], vit:{iron:14,folate:16,magnesium:10,zinc:8,potassium:8}},
{id:66, name:"Aloo tikki",           hi:"आलू टिक्की",        brand:"",          cal:200,p:4, c:30,f:8, sugar:3, fiber:3, cat:"indian",  subs:["snack","breakfast"],              emoji:"🥔",price:30, tags:["veg","gluten-free"],        vit:{vitC:12,potassium:10,iron:6,vitB6:8}},
{id:67, name:"Haldiram Bhujia",      hi:"हल्दीराम भुजिया",   brand:"Haldiram's",cal:160,p:4, c:17,f:9, sugar:1, fiber:1, cat:"indian",  subs:["snack"],                          emoji:"🌾",price:30, tags:["veg"],                      vit:{iron:5}},
{id:68, name:"Haldiram Mixture",     hi:"हल्दीराम मिक्सचर",  brand:"Haldiram's",cal:150,p:3, c:18,f:8, sugar:2, fiber:1, cat:"indian",  subs:["snack"],                          emoji:"🥜",price:30, tags:["veg"],                      vit:{iron:4}},
{id:69, name:"Bikaji Namkeen",       hi:"बीकाजी नमकीन",      brand:"Bikaji",    cal:145,p:3, c:17,f:8, sugar:1, fiber:1, cat:"indian",  subs:["snack"],                          emoji:"🥜",price:20, tags:["veg"],                      vit:{iron:4}},
{id:70, name:"Moong dal sprouts",    hi:"मूंग दाल",          brand:"",          cal:100,p:7, c:14,f:1, sugar:2, fiber:4, cat:"indian",  subs:["snack","breakfast"],              emoji:"🌱",price:20, tags:["veg","gluten-free","jain"], vit:{vitC:15,folate:20,iron:12,magnesium:8,zinc:6}},
{id:71, name:"Vada pav",             hi:"वड़ा पाव",           brand:"",          cal:280,p:7, c:44,f:8, sugar:3, fiber:3, cat:"indian",  subs:["snack","lunch"],                  emoji:"🍔",price:30, tags:["veg"],                      vit:{vitC:8,iron:10,potassium:8}},
{id:72, name:"Chaat",                hi:"चाट",               brand:"",          cal:220,p:5, c:36,f:7, sugar:8, fiber:4, cat:"indian",  subs:["snack"],                          emoji:"🥣",price:40, tags:["veg"],                      vit:{vitC:15,iron:8,potassium:10}},
// ─── INDIAN DESSERTS ────────────────────────────────────────
{id:73, name:"Gulab jamun (2)",      hi:"गुलाब जामुन",       brand:"",          cal:280,p:4, c:46,f:9, sugar:36,fiber:1, cat:"indian",  subs:["dessert"],                        emoji:"🟤",price:40, tags:["veg"],                      vit:{calcium:8,iron:4}},
{id:74, name:"Kheer",                hi:"खीर",               brand:"",          cal:220,p:5, c:38,f:6, sugar:28,fiber:1, cat:"indian",  subs:["dessert"],                        emoji:"🍮",price:60, tags:["veg","gluten-free","dairy"], vit:{calcium:14,vitD:4,b12:6,iron:4}},
{id:75, name:"Jalebi",               hi:"जलेबी",             brand:"",          cal:260,p:3, c:50,f:6, sugar:40,fiber:0, cat:"indian",  subs:["dessert"],                        emoji:"🟠",price:30, tags:["veg"],                      vit:{iron:4}},
{id:76, name:"Besan ladoo",          hi:"बेसन लड्डू",        brand:"",          cal:240,p:6, c:32,f:10,sugar:22,fiber:2, cat:"indian",  subs:["dessert"],                        emoji:"🟡",price:20, tags:["veg","gluten-free"],        vit:{iron:12,folate:8,magnesium:8}},
{id:77, name:"Amul Kulfi",           hi:"कुल्फी",            brand:"Amul",      cal:150,p:4, c:24,f:5, sugar:20,fiber:0, cat:"indian",  subs:["dessert"],                        emoji:"🍦",price:30, tags:["veg","gluten-free","dairy"], vit:{calcium:12,vitD:4,b12:5}},
{id:78, name:"Gajar halwa",          hi:"गाजर हलवा",         brand:"",          cal:250,p:4, c:38,f:9, sugar:30,fiber:3, cat:"indian",  subs:["dessert"],                        emoji:"🟠",price:60, tags:["veg"],                      vit:{vitA:40,calcium:8,iron:8,potassium:10}},
{id:79, name:"Rasmalai",             hi:"रसमलाई",            brand:"",          cal:200,p:6, c:30,f:7, sugar:25,fiber:0, cat:"indian",  subs:["dessert"],                        emoji:"⚪",price:50, tags:["veg","gluten-free","dairy"], vit:{calcium:16,b12:8,vitD:5}},
// ─── WESTERN BREAKFAST ──────────────────────────────────────
{id:80, name:"Oatmeal with milk",    hi:"दलिया",             brand:"",          cal:190,p:8, c:32,f:4, sugar:6, fiber:4, cat:"western", subs:["breakfast"],                      emoji:"🥣",price:80, tags:["veg","gluten-free","dairy"], vit:{vitD:10,calcium:12,iron:20,magnesium:14,b12:8}},
{id:81, name:"Scrambled eggs",       hi:"अंडे",              brand:"",          cal:180,p:13,c:2, f:13,sugar:1, fiber:0, cat:"western", subs:["breakfast"],                      emoji:"🍳",price:60, tags:["non-veg","gluten-free"],   vit:{vitA:14,b12:22,vitD:8,selenium:28,zinc:10}},
{id:82, name:"Avocado toast",        hi:"एवोकाडो टोस्ट",     brand:"",          cal:280,p:7, c:28,f:16,sugar:2, fiber:7, cat:"western", subs:["breakfast"],                      emoji:"🥑",price:150,tags:["veg"],                      vit:{vitK:25,folate:20,potassium:15,vitC:12,magnesium:10}},
{id:83, name:"French omelette",      hi:"ऑमलेट",             brand:"",          cal:220,p:14,c:3, f:16,sugar:1, fiber:0, cat:"western", subs:["breakfast"],                      emoji:"🍳",price:80, tags:["non-veg","gluten-free"],   vit:{vitA:14,b12:22,vitD:8,selenium:28,zinc:10}},
{id:84, name:"Chia pudding",         hi:"चिया पुडिंग",       brand:"",          cal:200,p:7, c:28,f:8, sugar:10,fiber:10,cat:"western", subs:["breakfast"],                      emoji:"🍮",price:100,tags:["veg","gluten-free"],        vit:{calcium:18,iron:14,magnesium:20,omega3:30,zinc:8}},
{id:85, name:"Greek yogurt bowl",    hi:"दही",               brand:"",          cal:180,p:15,c:20,f:4, sugar:12,fiber:0, cat:"western", subs:["breakfast","snack"],              emoji:"🥛",price:100,tags:["veg","gluten-free","dairy"], vit:{calcium:18,b12:14,vitD:6,potassium:8,zinc:8}},
{id:86, name:"Granola bar",          hi:"ग्रेनोला बार",      brand:"",          cal:200,p:4, c:32,f:7, sugar:10,fiber:3, cat:"western", subs:["breakfast","snack"],              emoji:"🍫",price:50, tags:["veg"],                      vit:{iron:10,magnesium:8,zinc:5}},
{id:87, name:"Fruit bowl",           hi:"फ्रूट बाउल",        brand:"",          cal:150,p:2, c:36,f:1, sugar:28,fiber:5, cat:"western", subs:["breakfast","snack"],              emoji:"🍓",price:60, tags:["veg","gluten-free","jain"], vit:{vitC:60,vitA:15,folate:10,potassium:12,magnesium:6}},
// ─── WESTERN LUNCH/DINNER ───────────────────────────────────
{id:88, name:"Grilled chicken",      hi:"ग्रिल्ड चिकन",      brand:"",          cal:280,p:38,c:2, f:12,sugar:0, fiber:0, cat:"western", subs:["lunch","dinner"],                 emoji:"🍗",price:180,tags:["non-veg","gluten-free"],   vit:{niacin:60,b12:15,selenium:45,zinc:20,iron:8}},
{id:89, name:"Caesar salad",         hi:"सीज़र सलाद",         brand:"",          cal:250,p:10,c:18,f:16,sugar:4, fiber:4, cat:"western", subs:["lunch","dinner"],                 emoji:"🥗",price:150,tags:["veg"],                      vit:{vitA:30,vitC:15,vitK:50,calcium:12,folate:14}},
{id:90, name:"Grilled salmon",       hi:"सैल्मन",            brand:"",          cal:350,p:40,c:2, f:20,sugar:0, fiber:0, cat:"western", subs:["dinner","lunch"],                 emoji:"🐟",price:350,tags:["non-veg","gluten-free"],   vit:{vitD:70,b12:50,omega3:80,selenium:55,niacin:45}},
{id:91, name:"Pasta arrabiata",      hi:"पास्ता",             brand:"",          cal:380,p:12,c:62,f:8, sugar:6, fiber:4, cat:"western", subs:["lunch","dinner"],                 emoji:"🍝",price:180,tags:["veg"],                      vit:{vitC:20,iron:14,folate:15,magnesium:10}},
{id:92, name:"Quinoa salad",         hi:"क्विनोआ",           brand:"",          cal:280,p:10,c:42,f:8, sugar:4, fiber:6, cat:"western", subs:["lunch","dinner"],                 emoji:"🥗",price:180,tags:["veg","gluten-free"],        vit:{iron:16,magnesium:18,zinc:12,folate:14,potassium:10}},
{id:93, name:"Lentil soup",          hi:"दाल सूप",           brand:"",          cal:200,p:12,c:32,f:3, sugar:4, fiber:8, cat:"western", subs:["lunch","dinner"],                 emoji:"🍲",price:120,tags:["veg","gluten-free"],        vit:{iron:24,folate:22,potassium:16,magnesium:14,zinc:10}},
{id:94, name:"Chicken steak",        hi:"चिकन स्टेक",         brand:"",          cal:400,p:42,c:4, f:22,sugar:1, fiber:0, cat:"western", subs:["dinner","lunch"],                 emoji:"🥩",price:350,tags:["non-veg","gluten-free"],   vit:{b12:18,niacin:55,zinc:22,selenium:40,iron:12}},
{id:95, name:"Tomato soup",          hi:"टमाटर सूप",          brand:"",          cal:120,p:3, c:18,f:4, sugar:8, fiber:3, cat:"western", subs:["lunch","dinner"],                 emoji:"🍅",price:80, tags:["veg","gluten-free"],        vit:{vitA:20,vitC:25,vitK:10,potassium:12,folate:8}},
{id:96, name:"Peanut butter toast",  hi:"पीनट बटर",          brand:"",          cal:300,p:10,c:30,f:16,sugar:6, fiber:3, cat:"western", subs:["breakfast","snack"],              emoji:"🍞",price:60, tags:["veg","nut"],                vit:{niacin:20,magnesium:14,zinc:8,vitB6:8,folate:6}},
{id:97, name:"Chicken caesar wrap",  hi:"चिकन रैप",          brand:"",          cal:420,p:28,c:40,f:16,sugar:4, fiber:3, cat:"western", subs:["lunch","dinner"],                 emoji:"🌯",price:200,tags:["non-veg"],                  vit:{vitA:18,vitC:10,niacin:35,calcium:10,iron:12}},
// ─── WESTERN SNACKS ─────────────────────────────────────────
{id:98, name:"Protein bar",          hi:"प्रोटीन बार",        brand:"RiteBite",  cal:200,p:16,c:22,f:6, sugar:8, fiber:3, cat:"western", subs:["snack","breakfast"],              emoji:"🍫",price:60, tags:["veg"],                      vit:{b12:15,vitD:10,iron:15,calcium:10,zinc:10}},
{id:99, name:"Mixed nuts (30g)",     hi:"मिक्स नट्स",         brand:"",          cal:180,p:5, c:6, f:16,sugar:1, fiber:2, cat:"western", subs:["snack"],                          emoji:"🥜",price:40, tags:["veg","gluten-free","nut"],  vit:{vitE:20,magnesium:15,zinc:8,selenium:10,iron:6}},
{id:100,name:"Boiled eggs (2)",      hi:"उबले अंडे",          brand:"",          cal:140,p:12,c:1, f:10,sugar:0, fiber:0, cat:"western", subs:["snack","breakfast"],              emoji:"🥚",price:20, tags:["non-veg","gluten-free"],   vit:{vitA:12,b12:20,vitD:8,selenium:28,zinc:10}},
{id:101,name:"Cottage cheese",       hi:"पनीर",               brand:"",          cal:160,p:14,c:4, f:10,sugar:2, fiber:0, cat:"western", subs:["snack","breakfast"],              emoji:"🧀",price:40, tags:["veg","gluten-free","dairy"], vit:{calcium:10,b12:10,vitD:4,zinc:6,selenium:12}},
{id:102,name:"Dark chocolate (30g)", hi:"डार्क चॉकलेट",      brand:"",          cal:170,p:2, c:18,f:11,sugar:12,fiber:3, cat:"western", subs:["snack","dessert"],                emoji:"🍫",price:50, tags:["veg"],                      vit:{iron:16,magnesium:16,zinc:6}},
{id:103,name:"Rice cakes (2)",       hi:"राइस केक",           brand:"",          cal:70, p:1, c:14,f:1, sugar:1, fiber:0, cat:"western", subs:["snack"],                          emoji:"🍘",price:30, tags:["veg","gluten-free","jain"], vit:{iron:4,magnesium:2}},
// ─── FRUITS ─────────────────────────────────────────────────
{id:110,name:"Banana",               hi:"केला",               brand:"",          cal:90, p:1, c:23,f:0, sugar:12,fiber:3, cat:"fruit",   subs:["snack","breakfast"],              emoji:"🍌",price:10, tags:["veg","gluten-free","jain"], vit:{vitB6:20,vitC:10,potassium:10,magnesium:8,folate:5}},
{id:111,name:"Apple",                hi:"सेब",                brand:"",          cal:80, p:0, c:21,f:0, sugar:16,fiber:4, cat:"fruit",   subs:["snack","breakfast"],              emoji:"🍎",price:30, tags:["veg","gluten-free","jain"], vit:{vitC:8,vitK:4,potassium:5,iron:2,folate:2}},
{id:112,name:"Mango",                hi:"आम",                 brand:"",          cal:100,p:1, c:25,f:0, sugar:22,fiber:3, cat:"fruit",   subs:["snack","breakfast","dessert"],   emoji:"🥭",price:20, tags:["veg","gluten-free","jain"], vit:{vitA:15,vitC:45,vitB6:8,folate:10,potassium:8}},
{id:113,name:"Papaya",               hi:"पपीता",              brand:"",          cal:60, p:1, c:15,f:0, sugar:10,fiber:3, cat:"fruit",   subs:["snack","breakfast"],              emoji:"🍈",price:20, tags:["veg","gluten-free","jain"], vit:{vitC:75,vitA:25,folate:14,potassium:8,magnesium:5}},
{id:114,name:"Orange",               hi:"संतरा",              brand:"",          cal:65, p:1, c:16,f:0, sugar:12,fiber:3, cat:"fruit",   subs:["snack","breakfast"],              emoji:"🍊",price:20, tags:["veg","gluten-free","jain"], vit:{vitC:85,folate:10,potassium:8,calcium:5,vitB1:8}},
{id:115,name:"Watermelon (200g)",    hi:"तरबूज",              brand:"",          cal:60, p:1, c:14,f:0, sugar:12,fiber:1, cat:"fruit",   subs:["snack","breakfast"],              emoji:"🍉",price:20, tags:["veg","gluten-free","jain"], vit:{vitC:18,vitA:10,vitB6:5,potassium:5}},
{id:116,name:"Pomegranate",          hi:"अनार",               brand:"",          cal:80, p:2, c:18,f:1, sugar:14,fiber:4, cat:"fruit",   subs:["snack","breakfast"],              emoji:"🍎",price:40, tags:["veg","gluten-free","jain"], vit:{vitC:12,vitK:20,folate:8,potassium:7,iron:2}},
{id:117,name:"Pineapple (200g)",     hi:"अनानास",             brand:"",          cal:84, p:1, c:22,f:0, sugar:16,fiber:2, cat:"fruit",   subs:["snack","breakfast"],              emoji:"🍍",price:25, tags:["veg","gluten-free","jain"], vit:{vitC:80,manganese:30,vitB1:8,vitB6:8,folate:5}},
{id:118,name:"Grapes (100g)",        hi:"अंगूर",              brand:"",          cal:70, p:1, c:18,f:0, sugar:16,fiber:1, cat:"fruit",   subs:["snack"],                          emoji:"🍇",price:30, tags:["veg","gluten-free","jain"], vit:{vitK:18,vitC:5,vitB6:5,potassium:5}},
{id:119,name:"Guava",                hi:"अमरूद",              brand:"",          cal:68, p:3, c:14,f:1, sugar:9, fiber:5, cat:"fruit",   subs:["snack","breakfast"],              emoji:"🍏",price:15, tags:["veg","gluten-free","jain"], vit:{vitC:200,vitA:8,folate:10,potassium:10,magnesium:5}},
{id:120,name:"Strawberries (100g)",  hi:"स्ट्रॉबेरी",         brand:"",          cal:33, p:1, c:8, f:0, sugar:5, fiber:2, cat:"fruit",   subs:["snack","breakfast","dessert"],   emoji:"🍓",price:60, tags:["veg","gluten-free","jain"], vit:{vitC:98,folate:6,potassium:4,manganese:15}},
{id:121,name:"Kiwi",                 hi:"कीवी",               brand:"",          cal:61, p:1, c:15,f:1, sugar:9, fiber:3, cat:"fruit",   subs:["snack","breakfast"],              emoji:"🥝",price:40, tags:["veg","gluten-free","jain"], vit:{vitC:115,vitK:38,vitE:8,folate:6,potassium:8}},
{id:122,name:"Pear",                 hi:"नाशपाती",            brand:"",          cal:58, p:0, c:15,f:0, sugar:10,fiber:3, cat:"fruit",   subs:["snack"],                          emoji:"🍐",price:30, tags:["veg","gluten-free","jain"], vit:{vitC:8,vitK:5,potassium:4,folate:2}},
{id:123,name:"Chikoo (2 pcs)",       hi:"चीकू",               brand:"",          cal:83, p:1, c:20,f:1, sugar:14,fiber:5, cat:"fruit",   subs:["snack","dessert"],                emoji:"🟤",price:15, tags:["veg","gluten-free","jain"], vit:{vitC:10,vitA:5,iron:4,potassium:8,magnesium:4}},
// ─── ASIAN ──────────────────────────────────────────────────
{id:130,name:"Sushi (6 pcs)",        hi:"सुशी",               brand:"",          cal:300,p:14,c:48,f:4, sugar:6, fiber:2, cat:"asian",   subs:["lunch","dinner"],                 emoji:"🍣",price:400,tags:["non-veg","gluten-free"],   vit:{b12:12,vitD:8,iron:8,omega3:20,zinc:8}},
{id:131,name:"Ramen",                hi:"रामेन",               brand:"",          cal:450,p:20,c:60,f:14,sugar:4, fiber:3, cat:"asian",   subs:["lunch","dinner"],                 emoji:"🍜",price:300,tags:["non-veg"],                  vit:{b12:8,iron:14,zinc:12,niacin:18}},
{id:132,name:"Pad thai",             hi:"पैड थाई",             brand:"",          cal:400,p:18,c:54,f:14,sugar:8, fiber:3, cat:"asian",   subs:["lunch","dinner"],                 emoji:"🍜",price:250,tags:["non-veg"],                  vit:{vitA:8,iron:12,zinc:10,niacin:15,vitB6:8}},
{id:133,name:"Miso soup",            hi:"मिसो सूप",           brand:"",          cal:50, p:3, c:6, f:2, sugar:1, fiber:2, cat:"asian",   subs:["breakfast","lunch","dinner"],     emoji:"🍵",price:80, tags:["veg","gluten-free"],        vit:{vitK:8,manganese:10,zinc:4,folate:4}},
{id:134,name:"Teriyaki chicken",     hi:"तेरियाकी चिकन",      brand:"",          cal:350,p:36,c:22,f:12,sugar:14,fiber:1, cat:"asian",   subs:["dinner","lunch"],                 emoji:"🍗",price:300,tags:["non-veg","gluten-free"],   vit:{niacin:50,b12:12,selenium:35,zinc:18,iron:8}},
{id:135,name:"Edamame",              hi:"एडामामे",             brand:"",          cal:120,p:11,c:10,f:5, sugar:2, fiber:5, cat:"asian",   subs:["snack","lunch"],                  emoji:"🫘",price:120,tags:["veg","gluten-free"],        vit:{vitK:26,folate:22,magnesium:14,iron:12,zinc:10}},
{id:136,name:"Gyoza (5 pcs)",        hi:"ग्योज़ा",             brand:"",          cal:260,p:10,c:30,f:12,sugar:3, fiber:2, cat:"asian",   subs:["snack","lunch","dinner"],         emoji:"🥟",price:200,tags:["non-veg"],                  vit:{iron:10,zinc:8,vitB6:6}},
{id:137,name:"Spring rolls (3)",     hi:"स्प्रिंग रोल्स",      brand:"",          cal:280,p:6, c:36,f:12,sugar:4, fiber:2, cat:"asian",   subs:["snack","lunch"],                  emoji:"🌯",price:150,tags:["veg"],                      vit:{vitA:8,vitC:6,iron:8}},
{id:138,name:"Fried rice",           hi:"फ्राइड राइस",         brand:"",          cal:360,p:10,c:60,f:10,sugar:3, fiber:2, cat:"asian",   subs:["lunch","dinner"],                 emoji:"🍚",price:150,tags:["veg","gluten-free"],        vit:{iron:10,zinc:8,niacin:10,folate:6}},
{id:139,name:"Bibimbap",             hi:"बिबिम्बाप",           brand:"",          cal:550,p:22,c:80,f:14,sugar:6, fiber:5, cat:"asian",   subs:["lunch","dinner"],                 emoji:"🍲",price:350,tags:["non-veg","gluten-free"],   vit:{vitA:30,vitC:20,iron:20,calcium:8,zinc:15}},
{id:140,name:"Tom yum soup",         hi:"टॉम यम सूप",         brand:"",          cal:120,p:8, c:10,f:5, sugar:3, fiber:2, cat:"asian",   subs:["lunch","dinner"],                 emoji:"🍲",price:200,tags:["non-veg","gluten-free"],   vit:{vitC:12,vitA:8,iron:8,zinc:6}},
// ─── FAST FOOD ───────────────────────────────────────────────
{id:150,name:"McAloo Tikki",         hi:"मैकआलू टिक्की",      brand:"McDonald's",cal:338,p:7, c:44,f:15,sugar:6, fiber:3, cat:"fastfood",subs:["lunch","dinner"],                 emoji:"🍔",price:99, tags:["veg"],                      vit:{vitC:8,iron:10,calcium:6,potassium:8}},
{id:151,name:"McChicken Burger",     hi:"मैक चिकन",           brand:"McDonald's",cal:400,p:18,c:40,f:18,sugar:6, fiber:2, cat:"fastfood",subs:["lunch","dinner"],                 emoji:"🍔",price:129,tags:["non-veg"],                  vit:{b12:8,niacin:20,iron:12,calcium:8,zinc:10}},
{id:152,name:"Maharaja Mac",         hi:"महाराजा मैक",        brand:"McDonald's",cal:490,p:22,c:44,f:24,sugar:8, fiber:2, cat:"fastfood",subs:["lunch","dinner"],                 emoji:"🍔",price:189,tags:["non-veg"],                  vit:{b12:10,niacin:25,iron:14,calcium:10,zinc:12}},
{id:153,name:"McVeggie",             hi:"मैकवेजी",            brand:"McDonald's",cal:370,p:8, c:48,f:16,sugar:6, fiber:3, cat:"fastfood",subs:["lunch","dinner"],                 emoji:"🍔",price:109,tags:["veg"],                      vit:{vitC:6,iron:10,calcium:8,folate:6}},
{id:154,name:"Medium Fries",         hi:"फ्राइज़",             brand:"McDonald's",cal:320,p:4, c:44,f:15,sugar:1, fiber:3, cat:"fastfood",subs:["snack","lunch"],                  emoji:"🍟",price:89, tags:["veg","gluten-free"],        vit:{vitC:6,potassium:10,vitB6:8}},
{id:155,name:"Chicken McNuggets 6",  hi:"मैकनगेट्स",          brand:"McDonald's",cal:270,p:16,c:18,f:14,sugar:0, fiber:1, cat:"fastfood",subs:["snack","lunch","dinner"],         emoji:"🍗",price:119,tags:["non-veg"],                  vit:{niacin:20,b12:6,selenium:15,zinc:8}},
{id:156,name:"McFlurry",             hi:"मैकफ्लरी",           brand:"McDonald's",cal:340,p:8, c:56,f:10,sugar:44,fiber:0, cat:"fastfood",subs:["dessert"],                        emoji:"🍦",price:99, tags:["veg","dairy"],              vit:{calcium:20,b12:12,vitD:6}},
{id:157,name:"KFC Zinger Burger",    hi:"KFC ज़िंगर",          brand:"KFC",       cal:450,p:24,c:42,f:20,sugar:6, fiber:2, cat:"fastfood",subs:["lunch","dinner"],                 emoji:"🍔",price:179,tags:["non-veg"],                  vit:{niacin:25,b12:8,iron:14,calcium:8,zinc:12}},
{id:158,name:"KFC Hot Wings 4",      hi:"KFC विंग्स",         brand:"KFC",       cal:380,p:22,c:18,f:24,sugar:2, fiber:1, cat:"fastfood",subs:["snack","dinner","lunch"],         emoji:"🍗",price:149,tags:["non-veg"],                  vit:{niacin:28,b12:8,selenium:20,zinc:12,iron:8}},
{id:159,name:"KFC Rice Bowl",        hi:"KFC राइस बाउल",      brand:"KFC",       cal:410,p:16,c:56,f:14,sugar:4, fiber:2, cat:"fastfood",subs:["lunch","dinner"],                 emoji:"🍚",price:159,tags:["non-veg"],                  vit:{niacin:18,b12:6,iron:8,zinc:10}},
{id:160,name:"Domino's Margherita",  hi:"मार्गेरिटा",         brand:"Domino's",  cal:570,p:22,c:68,f:22,sugar:8, fiber:3, cat:"fastfood",subs:["dinner","lunch"],                 emoji:"🍕",price:199,tags:["veg","dairy"],              vit:{calcium:22,vitA:10,iron:14,zinc:12,b12:8}},
{id:161,name:"Domino's Peppy Paneer",hi:"पेप्पी पनीर",        brand:"Domino's",  cal:640,p:26,c:72,f:26,sugar:8, fiber:3, cat:"fastfood",subs:["dinner","lunch"],                 emoji:"🍕",price:329,tags:["veg","dairy"],              vit:{calcium:28,vitA:12,iron:16,zinc:14,b12:10}},
{id:162,name:"Domino's Chicken BBQ", hi:"चिकन BBQ",           brand:"Domino's",  cal:680,p:32,c:70,f:28,sugar:10,fiber:3, cat:"fastfood",subs:["dinner","lunch"],                 emoji:"🍕",price:399,tags:["non-veg"],                  vit:{niacin:30,b12:12,iron:16,calcium:18,zinc:15}},
{id:163,name:"Domino's Chicken Wings",hi:"डोमिनो'स विंग्स",   brand:"Domino's",  cal:380,p:28,c:16,f:24,sugar:4, fiber:1, cat:"fastfood",subs:["snack","dinner"],                 emoji:"🍗",price:299,tags:["non-veg"],                  vit:{niacin:28,b12:10,selenium:20,zinc:14,iron:8}},
{id:164,name:"Subway Veggie Delight",hi:"वेजी डिलाइट",        brand:"Subway",    cal:230,p:9, c:40,f:3, sugar:6, fiber:4, cat:"fastfood",subs:["lunch","dinner"],                 emoji:"🥖",price:179,tags:["veg"],                      vit:{vitA:15,vitC:20,iron:14,calcium:8,folate:12}},
{id:165,name:"Subway BMT",           hi:"सबवे BMT",           brand:"Subway",    cal:420,p:22,c:46,f:16,sugar:6, fiber:4, cat:"fastfood",subs:["lunch","dinner"],                 emoji:"🥖",price:329,tags:["non-veg"],                  vit:{vitA:10,niacin:22,iron:16,calcium:8,zinc:12}},
{id:166,name:"BK Whopper",           hi:"व्हॉपर",              brand:"Burger King",cal:650,p:30,c:50,f:36,sugar:10,fiber:3,cat:"fastfood",subs:["lunch","dinner"],                 emoji:"🍔",price:219,tags:["non-veg"],                  vit:{niacin:30,b12:10,iron:18,calcium:10,zinc:14}},
{id:167,name:"BK Veg Whopper",       hi:"वेज व्हॉपर",         brand:"Burger King",cal:500,p:12,c:56,f:24,sugar:8,fiber:4, cat:"fastfood",subs:["lunch","dinner"],                 emoji:"🍔",price:199,tags:["veg"],                      vit:{vitC:8,iron:14,calcium:10,folate:8}},
{id:168,name:"Pizza Hut Margherita", hi:"पिज्जा हट",          brand:"Pizza Hut", cal:600,p:24,c:72,f:22,sugar:8, fiber:3, cat:"fastfood",subs:["dinner","lunch"],                 emoji:"🍕",price:349,tags:["veg","dairy"],              vit:{calcium:24,vitA:12,iron:14,zinc:14,b12:8}},
{id:169,name:"Lay's Classic",        hi:"लेज़",                brand:"Lay's",     cal:130,p:2, c:16,f:7, sugar:1, fiber:1, cat:"fastfood",subs:["snack"],                          emoji:"🥔",price:20, tags:["veg","gluten-free"],        vit:{vitC:5,vitB6:5,potassium:4}},
{id:170,name:"Kurkure",              hi:"कुरकुरे",            brand:"Kurkure",   cal:150,p:2, c:20,f:7, sugar:2, fiber:1, cat:"fastfood",subs:["snack"],                          emoji:"🌽",price:20, tags:["veg"],                      vit:{iron:4}},
{id:171,name:"Maggi Noodles",        hi:"मैगी",               brand:"Maggi",     cal:330,p:8, c:50,f:12,sugar:2, fiber:2, cat:"fastfood",subs:["snack","lunch","dinner"],         emoji:"🍜",price:14, tags:["veg"],                      vit:{iron:15,calcium:6,vitB2:8,vitB6:6}},
// ─── BEVERAGES ───────────────────────────────────────────────
{id:180,name:"Black coffee",         hi:"ब्लैक कॉफ़ी",        brand:"",          cal:5,  p:0, c:1, f:0, sugar:0, fiber:0, cat:"beverage",subs:["drink","breakfast"],              emoji:"☕",price:20, tags:["veg","gluten-free","jain"], vit:{magnesium:2,potassium:2}},
{id:181,name:"Masala chai",          hi:"मसाला चाय",          brand:"",          cal:90, p:2, c:14,f:3, sugar:10,fiber:0, cat:"beverage",subs:["drink","breakfast"],              emoji:"🫖",price:20, tags:["veg","gluten-free","dairy"], vit:{calcium:6,iron:4,magnesium:3}},
{id:182,name:"Green tea",            hi:"ग्रीन टी",           brand:"",          cal:5,  p:0, c:1, f:0, sugar:0, fiber:0, cat:"beverage",subs:["drink","breakfast"],              emoji:"🍵",price:10, tags:["veg","gluten-free","jain"], vit:{vitK:8,folate:2,manganese:5}},
{id:183,name:"Mango lassi",          hi:"मैंगो लस्सी",        brand:"",          cal:200,p:5, c:38,f:3, sugar:30,fiber:1, cat:"beverage",subs:["drink","breakfast"],              emoji:"🥤",price:60, tags:["veg","gluten-free","dairy"], vit:{vitA:12,calcium:14,vitC:8,b12:6}},
{id:184,name:"Buttermilk",           hi:"छाछ",                brand:"",          cal:60, p:3, c:5, f:2, sugar:4, fiber:0, cat:"beverage",subs:["drink","lunch","dinner"],         emoji:"🥛",price:20, tags:["veg","gluten-free","dairy"], vit:{calcium:8,b12:5,vitD:3,potassium:5}},
{id:185,name:"Protein shake",        hi:"प्रोटीन शेक",        brand:"",          cal:180,p:25,c:8, f:4, sugar:4, fiber:0, cat:"beverage",subs:["drink","breakfast"],              emoji:"💪",price:80, tags:["veg","gluten-free"],        vit:{b12:20,vitD:15,calcium:15,iron:15,zinc:15}},
{id:186,name:"Coconut water",        hi:"नारियल पानी",        brand:"",          cal:45, p:2, c:9, f:0, sugar:6, fiber:0, cat:"beverage",subs:["drink"],                          emoji:"🥥",price:30, tags:["veg","gluten-free","jain"], vit:{potassium:12,magnesium:6,vitC:5,manganese:8}},
{id:187,name:"Turmeric milk",        hi:"हल्दी दूध",          brand:"",          cal:130,p:5, c:16,f:5, sugar:12,fiber:0, cat:"beverage",subs:["drink","breakfast"],              emoji:"🥛",price:30, tags:["veg","gluten-free","dairy"], vit:{calcium:16,vitD:8,b12:10,iron:4,magnesium:4}},
{id:188,name:"Sattu drink",          hi:"सत्तू",               brand:"",          cal:120,p:6, c:20,f:2, sugar:2, fiber:2, cat:"beverage",subs:["drink","breakfast"],              emoji:"🥤",price:20, tags:["veg","gluten-free"],        vit:{iron:16,calcium:6,magnesium:12,folate:8}},
{id:189,name:"Amul Kool",            hi:"अमूल कूल",           brand:"Amul",      cal:140,p:4, c:26,f:3, sugar:22,fiber:0, cat:"beverage",subs:["drink"],                          emoji:"🥛",price:25, tags:["veg","gluten-free","dairy"], vit:{calcium:14,b12:8,vitD:5}},
{id:190,name:"Banana smoothie",      hi:"स्मूदी",              brand:"",          cal:220,p:5, c:44,f:2, sugar:28,fiber:3, cat:"beverage",subs:["drink","breakfast"],              emoji:"🥤",price:60, tags:["veg","gluten-free"],        vit:{vitC:12,vitB6:16,potassium:10,magnesium:8,folate:5}},
{id:191,name:"Cold brew coffee",     hi:"कोल्ड ब्रू",          brand:"",          cal:15, p:0, c:2, f:0, sugar:0, fiber:0, cat:"beverage",subs:["drink","breakfast"],              emoji:"☕",price:80, tags:["veg","gluten-free","jain"], vit:{magnesium:3,potassium:3}},
{id:192,name:"Matcha latte",         hi:"माचा लाट्टे",         brand:"",          cal:120,p:4, c:16,f:4, sugar:10,fiber:0, cat:"beverage",subs:["drink","breakfast"],              emoji:"🍵",price:120,tags:["veg","gluten-free","dairy"], vit:{vitK:12,vitA:6,calcium:10,iron:4,magnesium:4}},
{id:193,name:"Sugarcane juice",      hi:"गन्ने का रस",        brand:"",          cal:120,p:0, c:30,f:0, sugar:28,fiber:0, cat:"beverage",subs:["drink"],                          emoji:"🥤",price:20, tags:["veg","gluten-free","jain"], vit:{iron:4,calcium:4,potassium:6}},
{id:194,name:"Watermelon juice",     hi:"तरबूज जूस",          brand:"",          cal:80, p:1, c:20,f:0, sugar:18,fiber:1, cat:"beverage",subs:["drink"],                          emoji:"🍉",price:20, tags:["veg","gluten-free","jain"], vit:{vitC:15,vitA:8,potassium:5,vitB6:4}},
{id:195,name:"Rose milk",            hi:"रोज़ मिल्क",          brand:"",          cal:160,p:5, c:26,f:4, sugar:22,fiber:0, cat:"beverage",subs:["drink"],                          emoji:"🥛",price:30, tags:["veg","gluten-free","dairy"], vit:{calcium:16,b12:8,vitD:5}},
{id:196,name:"Chaas",                hi:"चास",                brand:"",          cal:50, p:2, c:4, f:2, sugar:3, fiber:0, cat:"beverage",subs:["drink","lunch","dinner"],         emoji:"🥛",price:15, tags:["veg","gluten-free","dairy"], vit:{calcium:8,b12:4,vitD:2,potassium:4}},
];
// ═══════════════════════════════════════════════════════════════
//  STATE
// ═══════════════════════════════════════════════════════════════
// MEAL STEPS: each step has its own selection (id -> portions)
// Same food can be selected in multiple steps independently
const MEAL_STEPS=[
  {id:'breakfast',label:'Breakfast',emoji:'☀️',pct:0.25},
  {id:'lunch',    label:'Lunch',    emoji:'🌿',pct:0.35},
  {id:'dinner',   label:'Dinner',   emoji:'🌙',pct:0.30},
  {id:'snacks',   label:'Snacks',   emoji:'⚡',pct:0.10},
];

const ST={
  theme:'dark', lang:'en', onboarded:false, obStep:0,
  profile:{name:'User',goal:'maintain',calories:2000,budget:500,age:20,weight:65,height:170,sex:'male',activity:'1.55',dietType:'veg',allergies:[]},
  // Per-meal selections: {breakfast:{id:portions,...}, lunch:{...}, dinner:{...}, snacks:{...}}
  mealSel:{breakfast:{},lunch:{},dinner:{},snacks:{}},
  activeMealStep:'breakfast',  // current wizard step
  activeCat:'all',
  query:'',
  accordOpen:{},
  results:null,
  log:[],water:0,waterDate:'',
  templates:[],customFoods:[],
  sensW:{protein:3,carb:1,fat:1,sugar:2,fiber:2},
  dpAnim:{running:false,speed:80,timer:null},
};

function getAllFoods(){return[...BASE_FOODS,...(ST.customFoods||[])];}

// ═══════════════════════════════════════════════════════════════
//  PERSISTENCE
// ═══════════════════════════════════════════════════════════════
function save(){try{localStorage.setItem('cf4',JSON.stringify({theme:ST.theme,lang:ST.lang,onboarded:ST.onboarded,profile:ST.profile,mealSel:ST.mealSel,log:ST.log,water:ST.water,waterDate:ST.waterDate,templates:ST.templates,customFoods:ST.customFoods,sensW:ST.sensW}));}catch(e){}}
function load(){try{const d=JSON.parse(localStorage.getItem('cf4')||'{}');if(d.theme)ST.theme=d.theme;if(d.lang)ST.lang=LANG=d.lang;if(d.onboarded)ST.onboarded=d.onboarded;if(d.profile)ST.profile={...ST.profile,...d.profile};if(d.mealSel)ST.mealSel={...ST.mealSel,...d.mealSel};if(d.log)ST.log=d.log;if(d.water!=null)ST.water=d.water;if(d.waterDate)ST.waterDate=d.waterDate;if(d.templates)ST.templates=d.templates;if(d.customFoods)ST.customFoods=d.customFoods;if(d.sensW)ST.sensW={...ST.sensW,...d.sensW};}catch(e){}}

// ═══════════════════════════════════════════════════════════════
//  UTILS
// ═══════════════════════════════════════════════════════════════
function cap(s){return s.charAt(0).toUpperCase()+s.slice(1)}
function fname(f){return LANG==='hi'&&f.hi?f.hi:f.name;}
function today(){return new Date().toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'})}
function vibrate(ms=8){try{navigator.vibrate&&navigator.vibrate(ms)}catch(e){}}
function toast(msg){const el=document.getElementById('toast');el.textContent=msg;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),2500);}
function por(mealId,foodId){return ST.mealSel[mealId]?.[foodId]||1;}
function isSel(mealId,foodId){return !!(ST.mealSel[mealId]&&foodId in ST.mealSel[mealId]);}
function totalSelected(){return Object.values(ST.mealSel).reduce((s,m)=>s+Object.keys(m).length,0);}
function mealCalories(mealId){
  const sel=ST.mealSel[mealId]||{};
  return Object.entries(sel).reduce((s,[id,pt])=>{const f=getAllFoods().find(x=>x.id==id);return s+(f?f.cal*pt:0);},0);
}

// ═══════════════════════════════════════════════════════════════
//  THEME / LANG
// ═══════════════════════════════════════════════════════════════
function applyTheme(){document.documentElement.setAttribute('data-theme',ST.theme);const b=document.getElementById('theme-btn');if(b)b.textContent=ST.theme==='dark'?'☀️':'🌙';}
function toggleTheme(){ST.theme=ST.theme==='dark'?'light':'dark';applyTheme();save();}
function toggleLang(){ST.lang=LANG=LANG==='en'?'hi':'en';const b=document.getElementById('lang-btn');if(b)b.textContent=LANG==='en'?'🇮🇳':'🇬🇧';renderBuild();save();}

// ═══════════════════════════════════════════════════════════════
//  NAVIGATION
// ═══════════════════════════════════════════════════════════════
function goTo(page){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(t=>t.classList.remove('active'));
  const pg=document.getElementById('pg-'+page),tab=document.getElementById('tab-'+page);
  if(pg)pg.classList.add('active');if(tab)tab.classList.add('active');
  ST.activePage=page;
  if(page==='build')renderBuild();
  if(page==='results')renderResults();
  if(page==='log')renderLog();
  if(page==='algo')renderAlgo();
  if(page==='profile')renderProfile();
  updateTopPill();
}

// ═══════════════════════════════════════════════════════════════
//  ONBOARDING
// ═══════════════════════════════════════════════════════════════
const OB=[{title:'👋 About you'},{title:'🎯 Goal & budget'},{title:'🥗 Diet preferences'}];
const DIET_TYPES=['veg','non-veg','vegan','jain','gluten-free'];
const ALLERGIES=['dairy','nuts','egg','gluten','soy'];
const ACT=[['1.2','Sedentary'],['1.375','Lightly active'],['1.55','Moderately active'],['1.725','Very active'],['1.9','Athlete']];

function renderOnboard(){
  const pg=document.getElementById('pg-onboard');
  pg.style.display='flex';document.getElementById('main-shell').style.display='none';
  const p=ST.profile;
  const dots=OB.map((_,i)=>`<div class="ob-dot ${i===ST.obStep?'active':''}"></div>`).join('');
  let fields='';
  if(ST.obStep===0)fields=`
    <div class="ob-field"><div class="ob-label">Name</div><input class="ob-input" id="ob-name" type="text" placeholder="e.g. Vihaan" value="${p.name||''}"/></div>
    <div class="ob-row2">
      <div class="ob-field"><div class="ob-label">Age</div><input class="ob-input" id="ob-age" type="number" value="${p.age}" min="10" max="90"/></div>
      <div class="ob-field"><div class="ob-label">Sex</div><select class="ob-input" id="ob-sex"><option value="male" ${p.sex==='male'?'selected':''}>Male</option><option value="female" ${p.sex==='female'?'selected':''}>Female</option></select></div>
    </div>
    <div class="ob-row2">
      <div class="ob-field"><div class="ob-label">Weight (kg)</div><input class="ob-input" id="ob-weight" type="number" value="${p.weight}"/></div>
      <div class="ob-field"><div class="ob-label">Height (cm)</div><input class="ob-input" id="ob-height" type="number" value="${p.height}"/></div>
    </div>
    <div class="ob-field"><div class="ob-label">Activity</div><select class="ob-input" id="ob-act">${ACT.map(([v,l])=>`<option value="${v}" ${p.activity===v?'selected':''}>${l}</option>`).join('')}</select></div>`;
  else if(ST.obStep===1)fields=`
    <div class="ob-field"><div class="ob-label">Goal</div><select class="ob-input" id="ob-goal" onchange="obGoalChange()">
      <option value="lose" ${p.goal==='lose'?'selected':''}>Lose weight</option>
      <option value="maintain" ${p.goal==='maintain'?'selected':''}>Maintain weight</option>
      <option value="gain" ${p.goal==='gain'?'selected':''}>Gain muscle</option>
      <option value="custom" ${p.goal==='custom'?'selected':''}>Custom calories</option>
    </select></div>
    <div class="ob-field" id="ob-cw" style="${p.goal==='custom'?'':'display:none'}"><div class="ob-label">Daily calories</div><input class="ob-input" id="ob-custom" type="number" value="${p.calories}" min="800" max="5000"/></div>
    <div class="ob-field"><div class="ob-label">Daily food budget (₹)</div><input class="ob-input" id="ob-budget" type="number" value="${p.budget}" min="50" max="5000"/></div>`;
  else fields=`
    <div class="ob-field"><div class="ob-label">Diet type</div><div class="chip-row">${DIET_TYPES.map(d=>`<div class="chip ${p.dietType===d?'on':''}" onclick="obDiet('${d}')">${cap(d)}</div>`).join('')}</div></div>
    <div class="ob-field" style="margin-top:12px"><div class="ob-label">Allergies / avoid</div><div class="chip-row">${ALLERGIES.map(a=>`<div class="chip ${(p.allergies||[]).includes(a)?'on-red':''}" onclick="obAllergy('${a}')">${cap(a)}</div>`).join('')}</div></div>`;
  pg.innerHTML=`<div class="ob-hero">🥗</div><div class="ob-title">CalorieFit</div><div class="ob-sub">Step-by-step meal planner powered by the 0-1 Knapsack algorithm</div><div class="ob-stepper">${dots}</div><div class="ob-card"><div class="ob-card-title">${OB[ST.obStep].title}</div>${fields}</div><button class="ob-btn" onclick="obNext()">${ST.obStep<2?'Continue →':'Get Started 🚀'}</button><div class="ob-link" onclick="${ST.obStep>0?'obBack()':'skipOb()'}">${ST.obStep>0?'← Back':'Skip setup'}</div>`;
}
function obGoalChange(){const v=document.getElementById('ob-goal').value;document.getElementById('ob-cw').style.display=v==='custom'?'':'none';}
function obDiet(d){ST.profile.dietType=d;renderOnboard();}
function obAllergy(a){const arr=ST.profile.allergies||[];const i=arr.indexOf(a);i===-1?arr.push(a):arr.splice(i,1);ST.profile.allergies=arr;renderOnboard();}
function obSave(){
  if(ST.obStep===0){ST.profile.name=document.getElementById('ob-name')?.value||'User';ST.profile.age=+document.getElementById('ob-age')?.value||20;ST.profile.sex=document.getElementById('ob-sex')?.value||'male';ST.profile.weight=+document.getElementById('ob-weight')?.value||65;ST.profile.height=+document.getElementById('ob-height')?.value||170;ST.profile.activity=document.getElementById('ob-act')?.value||'1.55';}
  if(ST.obStep===1){const g=document.getElementById('ob-goal')?.value||'maintain';ST.profile.goal=g;ST.profile.calories=g==='custom'?(+document.getElementById('ob-custom')?.value||2000):calcTDEE(ST.profile);ST.profile.budget=+document.getElementById('ob-budget')?.value||500;}
}
function obNext(){obSave();if(ST.obStep<2){ST.obStep++;renderOnboard();}else finishOb();}
function obBack(){obSave();ST.obStep--;renderOnboard();}
function skipOb(){finishOb();}
function finishOb(){ST.onboarded=true;save();document.getElementById('pg-onboard').style.display='none';document.getElementById('main-shell').style.display='flex';goTo('build');}

// ═══════════════════════════════════════════════════════════════
//  TDEE + SCORE + GRADE
// ═══════════════════════════════════════════════════════════════
function calcTDEE(p){
  const bmr=p.sex==='female'?10*p.weight+6.25*p.height-5*p.age-161:10*p.weight+6.25*p.height-5*p.age+5;
  let t=Math.round(bmr*(parseFloat(p.activity)||1.55));
  if(p.goal==='lose')t-=500;if(p.goal==='gain')t+=300;
  return Math.max(1200,t);
}
function nutritionScore(f){
  const w=ST.sensW;let s=0;
  s+=Math.min(f.p*(w.protein||3),40);
  s+=f.c<50?(w.carb||1)*8:f.c<80?(w.carb||1)*4:0;
  s-=Math.min(f.sugar*(w.sugar||2),30);
  s+=Math.min(f.fiber*(w.fiber||2),20);
  s+=f.cal<300?8:0;
  return Math.max(2,Math.round(s));
}
function calcGrade(r){
  const tP=Math.round(r.budget*0.25/4),tC=Math.round(r.budget*0.5/4),tF=Math.round(r.budget*0.25/9);
  let pts=100;
  pts-=Math.abs(r.totalP-tP)*0.8;pts-=Math.abs(r.totalC-tC)*0.3;pts-=Math.abs(r.totalF-tF)*0.5;
  pts-=r.totalSugar*0.6;pts+=r.totalFiber*1.2;
  if(pts>=85)return'A';if(pts>=70)return'B';if(pts>=55)return'C';if(pts>=40)return'D';return'F';
}
function gradeClass(g){return'grade-'+g;}
function gradeEmoji(g){return{A:'🏆',B:'✅',C:'⚠️',D:'❗',F:'💀'}[g]||'';}
function whyPicked(f){
  const r=[];
  if(f.p>=20)r.push('high protein');else if(f.p>=10)r.push('good protein');
  if(f.sugar<=3)r.push('low sugar');if(f.fiber>=5)r.push('high fiber');
  if(f.cal<200)r.push('calorie efficient');
  return'Why: '+(r.length?r.join(', '):'fits your budget');
}

// ═══════════════════════════════════════════════════════════════
//  0-1 KNAPSACK
// ═══════════════════════════════════════════════════════════════
function knapsack01(items,capacity){
  const n=items.length,W=Math.min(Math.floor(capacity),4000);
  if(n===0||W<=0)return{chosen:[],totalScore:0,dpTable:null,W,n};
  const dp=Array.from({length:n+1},()=>new Int32Array(W+1));
  for(let i=1;i<=n;i++){
    const w=Math.min(Math.floor(items[i-1]._cal),W),v=items[i-1]._score;
    for(let j=0;j<=W;j++){dp[i][j]=dp[i-1][j];if(w<=j&&dp[i-1][j-w]+v>dp[i][j])dp[i][j]=dp[i-1][j-w]+v;}
  }
  let j=W;const chosen=[];
  for(let i=n;i>=1;i--){if(dp[i][j]!==dp[i-1][j]){chosen.push(items[i-1]);j-=Math.floor(items[i-1]._cal);}}
  return{chosen,totalScore:dp[n][W],dpTable:dp,W,n};
}
function greedyKnapsack(items,capacity){
  const sorted=[...items].sort((a,b)=>(b._score/b._cal)-(a._score/a._cal));
  let rem=capacity,chosen=[],score=0;
  for(const f of sorted){if(f._cal<=rem){chosen.push(f);rem-=f._cal;score+=f._score;}}
  return{chosen,totalScore:score};
}

// ═══════════════════════════════════════════════════════════════
//  FILTERING
// ═══════════════════════════════════════════════════════════════
const CATS=[{id:'all',label:'All',emoji:'🍽️'},{id:'indian',label:'Indian',emoji:'🇮🇳'},{id:'western',label:'Western',emoji:'🌍'},{id:'asian',label:'Asian',emoji:'🥢'},{id:'fastfood',label:'Fast Food',emoji:'🏪'},{id:'fruit',label:'Fruits',emoji:'🍎'},{id:'beverage',label:'Drinks',emoji:'☕'},{id:'custom',label:'Custom',emoji:'⭐'}];
// Sub-groups to show as accordions within each meal step
const SUB_GROUPS={
  breakfast:['breakfast','snack','fruit','drink'],
  lunch:['lunch','snack','fruit','drink'],
  dinner:['dinner','lunch','snack','fruit','drink'],
  snacks:['snack','dessert','fruit','drink'],
};
const SUB_META={breakfast:{label:'Breakfast',emoji:'☀️'},lunch:{label:'Lunch',emoji:'🌿'},dinner:{label:'Dinner',emoji:'🌙'},snack:{label:'Snacks',emoji:'⚡'},dessert:{label:'Desserts',emoji:'🍮'},drink:{label:'Drinks',emoji:'💧'},fruit:{label:'Fruits',emoji:'🍎'}};

function getFiltered(mealStepId){
  const dt=ST.profile.dietType||'veg',al=ST.profile.allergies||[];
  const allowedSubs=SUB_GROUPS[mealStepId]||['breakfast','lunch','dinner','snack','drink'];
  return getAllFoods().filter(f=>{
    const foodSubs=f.subs||[f.sub];
    if(!foodSubs.some(s=>allowedSubs.includes(s)))return false;
    if(ST.activeCat!=='all'&&ST.activeCat!=='custom'&&f.cat!==ST.activeCat)return false;
    if(ST.activeCat==='custom'&&f.cat!=='custom')return false;
    if(ST.query&&!f.name.toLowerCase().includes(ST.query)&&!(f.hi||'').includes(ST.query)&&!(f.brand||'').toLowerCase().includes(ST.query))return false;
    if(f.cat==='custom')return true;
    if(dt==='veg'&&!f.tags.includes('veg'))return false;
    if(dt==='vegan'&&!f.tags.includes('veg'))return false;
    if(dt==='jain'&&!f.tags.includes('jain'))return false;
    if(dt==='gluten-free'&&!f.tags.includes('gluten-free'))return false;
    if(al.includes('dairy')&&f.tags.includes('dairy'))return false;
    if(al.includes('nuts')&&f.tags.includes('nut'))return false;
    if(al.includes('gluten')&&!f.tags.includes('gluten-free'))return false;
    return true;
  });
}

// ═══════════════════════════════════════════════════════════════
//  BUILD PAGE — step-by-step meal wizard
// ═══════════════════════════════════════════════════════════════
function renderBuild(){
  const pg=document.getElementById('pg-build');
  const mealId=ST.activeMealStep;
  const stepIdx=MEAL_STEPS.findIndex(s=>s.id===mealId);
  const step=MEAL_STEPS[stepIdx];
  const subBudget=Math.round(ST.profile.calories*step.pct);
  const usedCal=mealCalories(mealId);
  const pct=Math.min(100,Math.round(usedCal/subBudget*100));
  const pbarCls=pct>=100?'over':pct>=85?'warn':'';
  const isLast=stepIdx===MEAL_STEPS.length-1;
  const selCnt=Object.keys(ST.mealSel[mealId]||{}).length;

  // Step tabs
  const stepTabs=MEAL_STEPS.map((s,i)=>{
    const selN=Object.keys(ST.mealSel[s.id]||{}).length;
    const isDone=i<stepIdx;
    return`<div class="wizard-step ${s.id===mealId?'active':''} ${isDone?'done':''}" onclick="goToMealStep('${s.id}')">
      ${s.emoji} ${s.label}
      ${selN>0?`<span class="step-badge">${selN}</span>`:''}
    </div>`;
  }).join('');

  pg.innerHTML=`
    <div class="meal-wizard">
      <div class="wizard-steps">${stepTabs}</div>
      <div class="wizard-body">
        <div class="wizard-header">
          <div class="wizard-title">${step.emoji} ${step.label}</div>
          <div class="wizard-budget">${usedCal} / ${subBudget} kcal</div>
        </div>
        <div class="pbar-wrap" style="margin-bottom:12px">
          <div class="pbar ${pbarCls}" style="width:${pct}%"></div>
        </div>
        <div class="search-wrap">
          <span class="search-icon">🔍</span>
          <input type="search" placeholder="${t('search',{n:getFiltered(mealId).length})}" value="${ST.query}" oninput="onSearch(this.value)"/>
        </div>
        <div class="pills" id="cat-pills">
          ${CATS.map(c=>`<div class="pill ${c.id===ST.activeCat?'active':''}" onclick="setCat('${c.id}')">${c.emoji} ${c.label}</div>`).join('')}
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:9px">
          <span style="font-size:12px;color:var(--text3)">${t('sel',{n:selCnt})} for ${step.label}</span>
          <div style="display:flex;gap:7px">
            <button class="btn-ghost" style="padding:4px 10px;font-size:11px" onclick="surpriseStep('${mealId}')">🎲</button>
            <button class="btn-ghost" style="padding:4px 10px;font-size:11px;color:var(--red)" onclick="clearStep('${mealId}')">${t('clear')}</button>
          </div>
        </div>
        <div id="accord-wrap"></div>
        <div class="${isLast?'wizard-nav-full':'wizard-nav'}">
          ${!isLast?`<button class="btn-ghost" onclick="prevMealStep()" ${stepIdx===0?'disabled style="opacity:.4"':''}>← Back</button>`:''}
          ${isLast
            ?`<button class="btn-primary" onclick="runOptimize()">⚡ Optimize meals</button>`
            :`<button class="btn-primary" onclick="nextMealStep()">Next: ${MEAL_STEPS[stepIdx+1].label} →</button>`
          }
        </div>
      </div>
    </div>
    <div class="card" style="margin-top:4px">
      <div class="card-title" style="font-size:13px;margin-bottom:8px">Daily totals across all meals</div>
      ${MEAL_STEPS.map(s=>{const cal=mealCalories(s.id);const sub=Math.round(ST.profile.calories*s.pct);const p=Math.min(100,Math.round(cal/sub*100));return`<div style="display:flex;align-items:center;gap:8px;margin-bottom:7px"><span style="font-size:14px;width:22px">${s.emoji}</span><div style="flex:1"><div class="pbar-wrap"><div class="pbar ${p>=100?'over':p>=85?'warn':''}" style="width:${p}%"></div></div></div><span style="font-size:11px;font-family:var(--mono);color:var(--text3);width:80px;text-align:right">${cal}/${sub}kcal</span></div>`;}).join('')}
    </div>
  `;
  renderAccordions(mealId);
  updateTopPill();
}

function goToMealStep(id){ST.activeMealStep=id;ST.query='';ST.activeCat='all';renderBuild();}
function nextMealStep(){
  const idx=MEAL_STEPS.findIndex(s=>s.id===ST.activeMealStep);
  if(idx<MEAL_STEPS.length-1){ST.activeMealStep=MEAL_STEPS[idx+1].id;ST.query='';ST.activeCat='all';renderBuild();}
}
function prevMealStep(){
  const idx=MEAL_STEPS.findIndex(s=>s.id===ST.activeMealStep);
  if(idx>0){ST.activeMealStep=MEAL_STEPS[idx-1].id;ST.query='';ST.activeCat='all';renderBuild();}
}
function onSearch(v){ST.query=v.toLowerCase();renderBuild();}
function setCat(c){ST.activeCat=c;ST.query='';renderBuild();}

function renderAccordions(mealId){
  const foods=getFiltered(mealId);
  const grouped={};
  foods.forEach(f=>{const foodSubs=f.subs||[f.sub];const allowedSubs=SUB_GROUPS[mealId]||[];foodSubs.filter(s=>allowedSubs.includes(s)).forEach(s=>{grouped[s]=grouped[s]||[];if(!grouped[s].find(x=>x.id===f.id))grouped[s].push(f);});});
  const subOrder=SUB_GROUPS[mealId]||['breakfast','lunch','dinner','snack','drink'];
  let html='';
  if(!foods.length){html=`<div style="text-align:center;padding:30px 20px;color:var(--text3)">🔍 No foods match your filters.</div>`;}
  else{
    subOrder.forEach(sub=>{
      if(!grouped[sub]?.length)return;
      const items=grouped[sub];
      const selN=items.filter(f=>isSel(mealId,f.id)).length;
      const isOpen=ST.accordOpen[mealId+'_'+sub]!==false;
      const m=SUB_META[sub]||{label:cap(sub),emoji:'🍽️'};
      html+=`<div class="accord ${isOpen?'open':''}" id="acc-${sub}">
        <div class="accord-head" onclick="toggleAccord('${mealId}','${sub}')">
          <div class="accord-left"><span class="accord-emoji">${m.emoji}</span><span class="accord-title">${m.label}</span><span class="accord-count">(${items.length})</span></div>
          <div class="accord-right">${selN?`<span class="accord-badge">${selN} ✓</span>`:''}<span class="accord-arrow">▼</span></div>
        </div>
        <div class="accord-body">${items.map(f=>foodItemHTML(f,mealId)).join('')}</div>
      </div>`;
    });
  }
  const wrap=document.getElementById('accord-wrap');if(wrap)wrap.innerHTML=html;
}

function foodItemHTML(f,mealId){
  const sel=isSel(mealId,f.id);const pts=por(mealId,f.id);
  const isVeg=f.tags.includes('veg');
  return`<div class="food-item ${sel?'sel':''}" id="fi-${mealId}-${f.id}">
    <div class="food-emoji" onclick="showFoodModal(${f.id},'${mealId}')">${f.emoji}</div>
    <div class="food-info" onclick="toggleFood('${mealId}',${f.id})">
      <div class="food-name">${fname(f)} <span style="font-size:9px;color:${isVeg?'#22c55e':'#ef4444'}">${isVeg?'●V':'●NV'}</span></div>
      ${f.brand?`<div class="food-brand">${f.brand}</div>`:''}
      <div class="food-tags">
        <span class="tag tag-cal">${f.cal}kcal</span>
        <span class="tag tag-p">P:${f.p}g</span>
        <span class="tag tag-c">C:${f.c}g</span>
        <span class="tag tag-f">F:${f.f}g</span>
        <span class="tag tag-s">S:${f.sugar}g</span>
        <span class="tag tag-fiber">Fi:${f.fiber}g</span>
      </div>
      ${sel?`<div class="portion-row" onclick="event.stopPropagation()">
        <button class="p-btn" onclick="chgPor('${mealId}',${f.id},-1)">−</button>
        <span class="p-num">${pts}×</span>
        <button class="p-btn" onclick="chgPor('${mealId}',${f.id},1)">+</button>
      </div>`:''}
    </div>
    <div class="food-right">
      <div class="food-price">₹${f.price}</div>
      <div class="check-circle" onclick="toggleFood('${mealId}',${f.id})"></div>
    </div>
  </div>`;
}

function toggleAccord(mealId,sub){
  const key=mealId+'_'+sub;
  ST.accordOpen[key]=ST.accordOpen[key]===false?true:false;
  const el=document.getElementById('acc-'+sub);
  if(el){el.classList.toggle('open');const a=el.querySelector('.accord-arrow');if(a)a.style.transform=el.classList.contains('open')?'rotate(180deg)':'';}
}
function toggleFood(mealId,id){
  vibrate();
  if(!ST.mealSel[mealId])ST.mealSel[mealId]={};
  if(isSel(mealId,id))delete ST.mealSel[mealId][id];
  else ST.mealSel[mealId][id]=1;
  save();
  // re-render just this food item + header
  const f=getAllFoods().find(x=>x.id===id);
  const el=document.getElementById(`fi-${mealId}-${id}`);
  if(el&&f)el.outerHTML=foodItemHTML(f,mealId);
  updateAccordBadge(mealId,f?.sub);
  updateTopPill();
  // update mini progress bar in wizard header
  updateWizardBudget(mealId);
}
function chgPor(mealId,id,d){
  if(!isSel(mealId,id))return;
  ST.mealSel[mealId][id]=Math.max(1,Math.min(10,(ST.mealSel[mealId][id]||1)+d));
  save();
  const f=getAllFoods().find(x=>x.id===id);
  const el=document.getElementById(`fi-${mealId}-${id}`);
  if(el&&f)el.outerHTML=foodItemHTML(f,mealId);
  updateTopPill();updateWizardBudget(mealId);
}
function updateAccordBadge(mealId,sub){
  const acc=document.getElementById('acc-'+sub);if(!acc)return;
  const items=getFiltered(mealId).filter(f=>f.sub===sub);
  const n=items.filter(f=>isSel(mealId,f.id)).length;
  let badge=acc.querySelector('.accord-badge');
  if(n>0){if(badge)badge.textContent=`${n} ✓`;else acc.querySelector('.accord-right').insertAdjacentHTML('afterbegin',`<span class="accord-badge">${n} ✓</span>`);}
  else if(badge)badge.remove();
}
function updateWizardBudget(mealId){
  const step=MEAL_STEPS.find(s=>s.id===mealId);if(!step)return;
  const subBudget=Math.round(ST.profile.calories*step.pct);
  const usedCal=mealCalories(mealId);
  const pct=Math.min(100,Math.round(usedCal/subBudget*100));
  const badge=document.querySelector('.wizard-budget');
  if(badge)badge.textContent=`${usedCal} / ${subBudget} kcal`;
  const pbar=document.querySelector('.wizard-body .pbar');
  if(pbar){pbar.style.width=pct+'%';pbar.className='pbar'+(pct>=100?' over':pct>=85?' warn':'');}
}
function updateTopPill(){
  const pill=document.getElementById('top-pill');if(!pill)return;
  const total=MEAL_STEPS.reduce((s,ms)=>s+mealCalories(ms.id),0);
  const budget=ST.profile.calories;
  pill.textContent=`${total}/${budget}kcal`;
  pill.style.color=total>budget?'var(--red)':total>budget*0.85?'var(--amber)':'var(--accent)';
}
function clearStep(mealId){ST.mealSel[mealId]={};save();renderBuild();toast(t('cleared'));}
function surpriseStep(mealId){
  const foods=getFiltered(mealId);
  if(foods.length<3){toast('Too few foods!');return;}
  const shuffled=[...foods].sort(()=>Math.random()-.5).slice(0,8);
  ST.mealSel[mealId]={};shuffled.forEach(f=>{ST.mealSel[mealId][f.id]=1;});
  save();toast('🎲 Random selection!');renderBuild();
}

// FOOD DETAIL MODAL
function showFoodModal(id,mealId){
  const f=getAllFoods().find(x=>x.id===id);if(!f)return;
  const score=nutritionScore(f);
  const total=f.p*4+f.c*4+f.f*9||1;
  const pP=Math.round(f.p*4/total*100),pC=Math.round(f.c*4/total*100),pF=Math.round(f.f*9/total*100);
  const sel=isSel(mealId,id);
  openModal(`
    <div class="modal-handle"></div>
    <div style="font-size:36px;text-align:center;margin-bottom:6px">${f.emoji}</div>
    <div class="modal-title" style="text-align:center">${fname(f)}</div>
    ${f.brand?`<div style="text-align:center;font-size:11px;color:var(--text3);margin-bottom:12px">${f.brand}</div>`:''}
    <div class="metrics4" style="margin-bottom:11px">
      <div class="m4"><div class="m4-val">${f.cal}</div><div class="m4-lbl">kcal</div></div>
      <div class="m4"><div class="m4-val" style="color:#3b82f6">${f.p}g</div><div class="m4-lbl">Protein</div></div>
      <div class="m4"><div class="m4-val" style="color:#22c55e">${f.c}g</div><div class="m4-lbl">Carbs</div></div>
      <div class="m4"><div class="m4-val" style="color:#ef4444">${f.f}g</div><div class="m4-lbl">Fat</div></div>
    </div>
    <div class="metrics4" style="margin-bottom:11px">
      <div class="m4"><div class="m4-val" style="color:#a855f7">${f.sugar}g</div><div class="m4-lbl">Sugar</div></div>
      <div class="m4"><div class="m4-val" style="color:#10b981">${f.fiber}g</div><div class="m4-lbl">Fiber</div></div>
      <div class="m4"><div class="m4-val">₹${f.price}</div><div class="m4-lbl">Price</div></div>
      <div class="m4"><div class="m4-val" style="color:var(--accent)">${score}</div><div class="m4-lbl">Score</div></div>
    </div>
    <div style="font-size:11px;font-weight:600;color:var(--text3);margin-bottom:6px">MACRO SPLIT</div>
    <div style="display:flex;gap:3px;margin-bottom:10px;height:8px">
      <div style="flex:${pP};background:#3b82f6;border-radius:3px 0 0 3px"></div>
      <div style="flex:${pC};background:#22c55e"></div>
      <div style="flex:${pF};background:#ef4444;border-radius:0 3px 3px 0"></div>
    </div>
    <div style="font-size:11px;color:var(--text3);margin-bottom:10px">${whyPicked(f)}</div>
    ${f.vit&&Object.keys(f.vit).length?`<div style="font-size:10px;font-weight:700;color:var(--text3);letter-spacing:.06em;margin-bottom:6px">VITAMINS & MINERALS</div><div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:12px">${Object.entries(f.vit).map(([k,v])=>{const m=VIT_META[k];if(!m||v<=0)return'';return`<span style="font-size:10px;padding:2px 8px;border-radius:999px;background:${m.color}22;color:${m.color};font-weight:600">${m.label} ${v}%</span>`;}).join('')}</div>`:''}
    <button class="btn-primary" onclick="toggleFood('${mealId}',${id});closeModal()">${sel?'Remove from '+cap(mealId):'Add to '+cap(mealId)}</button>
  `);
}

// ═══════════════════════════════════════════════════════════════
//  OPTIMIZE — runs knapsack per meal step, combines results
// ═══════════════════════════════════════════════════════════════
function runOptimize(){
  const allFoods=getAllFoods();
  let totalChosen=[],totalScore=0,dpInfo={};
  const budget=ST.profile.calories;

  MEAL_STEPS.forEach(step=>{
    const subBudget=Math.round(budget*step.pct);
    const sel=ST.mealSel[step.id]||{};
    const candidates=Object.entries(sel).map(([id,pt])=>{
      const f=allFoods.find(x=>x.id==id);
      if(!f)return null;
      return{...f,_cal:f.cal*pt,_score:nutritionScore(f),_por:pt,_meal:step.id,_mealLabel:step.label,_mealEmoji:step.emoji};
    }).filter(Boolean);

    if(candidates.length===0)return;
    const {chosen,totalScore:s,dpTable,W,n}=knapsack01(candidates,subBudget);
    chosen.forEach(f=>totalChosen.push(f));
    totalScore+=s;
    dpInfo[step.id]={dpTable,W,n,candidates,chosen,subBudget};
  });

  if(totalChosen.length===0){toast('Please select foods in at least one meal step!');return;}

  const totalCal=totalChosen.reduce((s,f)=>s+f._cal,0);
  const totalP=Math.round(totalChosen.reduce((s,f)=>s+f.p*f._por,0));
  const totalC=Math.round(totalChosen.reduce((s,f)=>s+f.c*f._por,0));
  const totalF=Math.round(totalChosen.reduce((s,f)=>s+f.f*f._por,0));
  const totalSugar=Math.round(totalChosen.reduce((s,f)=>s+f.sugar*f._por,0));
  const totalFiber=Math.round(totalChosen.reduce((s,f)=>s+f.fiber*f._por,0));
  const totalCost=totalChosen.reduce((s,f)=>s+f.price*f._por,0);

  // Greedy on full combined pool for comparison
  const allCandidates=MEAL_STEPS.flatMap(step=>{
    const sel=ST.mealSel[step.id]||{};
    return Object.entries(sel).map(([id,pt])=>{
      const f=allFoods.find(x=>x.id==id);
      return f?{...f,_cal:f.cal*pt,_score:nutritionScore(f),_por:pt}:null;
    }).filter(Boolean);
  });
  const gr=greedyKnapsack(allCandidates,budget);

  // Compute vitamin totals (sum % daily value across all chosen foods * portions)
  const vitKeys=['vitA','vitC','vitD','vitB6','b12','iron','calcium','potassium','zinc','folate','magnesium','omega3','niacin','selenium','manganese'];
  const totalVit={};
  vitKeys.forEach(k=>{totalVit[k]=Math.round(totalChosen.reduce((s,f)=>s+((f.vit&&f.vit[k]||0)*f._por),0));});
  ST.results={chosen:totalChosen,totalScore,totalCal,totalP,totalC,totalF,totalSugar,totalFiber,totalCost,budget,dpInfo,greedyChosen:gr.chosen,greedyScore:gr.totalScore,totalVit};
  ST.results.grade=calcGrade(ST.results);
  ST._dpInfo=dpInfo;

  goTo('results');
}

// ═══════════════════════════════════════════════════════════════
//  RESULTS PAGE
// ═══════════════════════════════════════════════════════════════
function renderResults(){
  const pg=document.getElementById('pg-results');
  if(!ST.results){
    pg.innerHTML=`<div style="text-align:center;padding:60px 20px;color:var(--text3)"><div style="font-size:44px;margin-bottom:10px">⚡</div><div>Build your meals in the Build tab, then optimize!</div><button class="btn-primary" style="margin-top:20px;max-width:220px;margin-left:auto;margin-right:auto;display:block" onclick="goTo('build')">← Go to Build</button></div>`;
    return;
  }
  const r=ST.results;
  const pct=Math.min(100,Math.round(r.totalCal/r.budget*100));
  const pbarCls=pct>=100?'over':pct>=85?'warn':'';
  const tP=Math.round(r.budget*0.25/4),tC=Math.round(r.budget*0.5/4),tF=Math.round(r.budget*0.25/9);

  // Group chosen foods by meal
  const byMeal={};
  r.chosen.forEach(f=>{byMeal[f._meal]=byMeal[f._meal]||[];byMeal[f._meal].push(f);});

  let slotsHtml='';
  MEAL_STEPS.forEach(step=>{
    const items=byMeal[step.id];
    if(!items||!items.length)return;
    const slotCal=items.reduce((s,f)=>s+f._cal,0);
    const slotP=Math.round(items.reduce((s,f)=>s+f.p*f._por,0));
    const slotC=Math.round(items.reduce((s,f)=>s+f.c*f._por,0));
    const slotF=Math.round(items.reduce((s,f)=>s+f.f*f._por,0));
    slotsHtml+=`<div class="slot-card">
      <div class="slot-card-head">
        <div class="slot-card-title">${step.emoji} ${step.label}</div>
        <div class="slot-cal-badge">${slotCal}kcal</div>
      </div>
      ${items.map(f=>{
        const allF=getAllFoods();
        const swaps=allF.filter(x=>x.id!==f.id&&x.sub===f.sub&&Math.abs(x.cal-f.cal)<120).sort((a,b)=>nutritionScore(b)-nutritionScore(a)).slice(0,3);
        return`<div class="ritem">
          <div class="ritem-emoji">${f.emoji}</div>
          <div class="ritem-body">
            <div class="ritem-name">${fname(f)}${f._por>1?` ×${f._por}`:''}</div>
            <div class="ritem-macros">P${f.p*f._por}g · C${f.c*f._por}g · F${f.f*f._por}g · S${f.sugar*f._por}g · Fi${f.fiber*f._por}g</div>
            <div class="ritem-why" onclick="toast('${whyPicked(f).replace(/'/g,'')}')">${whyPicked(f)}</div>
            ${swaps.length?`<div class="swap-row">${swaps.map(sw=>`<div class="swap-chip" onclick="swapFood('${f._meal}',${f.id},${sw.id})">↔ ${sw.emoji} ${fname(sw).split(' ')[0]}</div>`).join('')}</div>`:''}
          </div>
          <div class="ritem-right"><div class="ritem-cal">${f._cal}kcal</div><div class="ritem-price">₹${f.price*f._por}</div></div>
        </div>`;
      }).join('')}
      <div style="padding:8px 13px;font-size:11px;color:var(--text3);border-top:1px solid var(--border)">P${slotP}g · C${slotC}g · F${slotF}g</div>
    </div>`;
  });

  pg.innerHTML=`
    <div class="budget-card">
      <div class="row-sb" style="margin-bottom:3px">
        <div style="display:flex;align-items:baseline"><span class="big-cal">${r.totalCal}</span><span class="big-cal-of">/ ${r.budget}kcal (${pct}%)</span></div>
        <div class="grade-badge ${gradeClass(r.grade)}">${r.grade}</div>
      </div>
      <div class="pbar-wrap" style="margin-bottom:10px"><div class="pbar ${pbarCls}" style="width:${pct}%"></div></div>
      <div class="metrics4">
        <div class="m4"><div class="m4-val">${r.chosen.length}</div><div class="m4-lbl">Items</div></div>
        <div class="m4"><div class="m4-val">${r.budget-r.totalCal}</div><div class="m4-lbl">Left</div></div>
        <div class="m4"><div class="m4-val">₹${r.totalCost}</div><div class="m4-lbl">Cost</div></div>
        <div class="m4"><div class="m4-val">${r.totalScore}</div><div class="m4-lbl">Score</div></div>
      </div>
    </div>
    <div class="card">
      <div class="card-title">Macro breakdown</div>
      <div class="macro-bars" style="margin-top:9px">
        ${mbarHTML('Protein',r.totalP,tP,'bar-p','g')}
        ${mbarHTML('Carbs',r.totalC,tC,'bar-c','g')}
        ${mbarHTML('Fats',r.totalF,tF,'bar-f','g')}
        ${mbarHTML('Sugar',r.totalSugar,Math.round(tC*0.08),'bar-s','g')}
        ${mbarHTML('Fiber',r.totalFiber,25,'bar-fiber','g')}
      </div>
      <div class="macro-totals">
        <div class="mt"><div class="mt-val" style="color:#3b82f6">${r.totalP}g</div><div class="mt-lbl">Protein</div></div>
        <div class="mt"><div class="mt-val" style="color:#22c55e">${r.totalC}g</div><div class="mt-lbl">Carbs</div></div>
        <div class="mt"><div class="mt-val" style="color:#ef4444">${r.totalF}g</div><div class="mt-lbl">Fats</div></div>
        <div class="mt"><div class="mt-val" style="color:#a855f7">${r.totalSugar}g</div><div class="mt-lbl">Sugar</div></div>
      </div>
    </div>
    ${slotsHtml}
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px">
      ${buildVitaminPanel(r)}
    <button class="btn-primary" onclick="saveToLog()">📅 Save to log</button>
      <button class="btn-ghost" onclick="shareAsPNG()">📤 Share</button>
    </div>
    <button class="btn-ghost" style="width:100%;margin-bottom:10px" onclick="saveTemplate()">💾 Save as template</button>
    <div class="algo-box">
      <div class="algo-title">Algorithm summary</div>
      <div class="algo-text">Ran 0-1 Knapsack independently for each meal slot with its calorie sub-budget. ${MEAL_STEPS.map(s=>{const d=r.dpInfo?.[s.id];return d?`${s.label}: ${d.candidates.length} candidates → ${d.chosen.length} chosen (${d.subBudget}kcal budget)`:null;}).filter(Boolean).join(' | ')}. Total score: ${r.totalScore}pts vs Greedy: ${r.greedyScore}pts. See Algo tab for DP visualizer.</div>
    </div>
  `;
  if(['A','B'].includes(r.grade))setTimeout(()=>confetti(),300);
}
function mbarHTML(lbl,actual,target,cls,unit){
  const pct=target>0?Math.min(100,Math.round(actual/target*100)):0,over=actual>target*1.2;
  return`<div class="mbar-row"><span class="mbar-lbl">${lbl}</span><div class="mbar-track"><div class="mbar-fill ${cls}" style="width:${pct}%"></div></div><span class="mbar-val" style="${over?'color:var(--red)':''}">${actual}${unit}</span></div>`;
}

// ═══════════════════════════════════════════════════════════════
//  VITAMIN & MINERAL PANEL (visual only, not part of optimization)
// ═══════════════════════════════════════════════════════════════
const VIT_META={
  vitA:  {label:'Vitamin A',  emoji:'🟠', color:'#f97316', dv:100, unit:'%DV'},
  vitC:  {label:'Vitamin C',  emoji:'🟡', color:'#eab308', dv:100, unit:'%DV'},
  vitD:  {label:'Vitamin D',  emoji:'☀️',  color:'#facc15', dv:100, unit:'%DV'},
  vitB6: {label:'Vitamin B6', emoji:'🟢', color:'#22c55e', dv:100, unit:'%DV'},
  b12:   {label:'Vitamin B12',emoji:'🔵', color:'#3b82f6', dv:100, unit:'%DV'},
  iron:  {label:'Iron',       emoji:'🔴', color:'#ef4444', dv:100, unit:'%DV'},
  calcium:{label:'Calcium',   emoji:'⚪', color:'#94a3b8', dv:100, unit:'%DV'},
  potassium:{label:'Potassium',emoji:'🟣',color:'#a855f7', dv:100, unit:'%DV'},
  zinc:  {label:'Zinc',       emoji:'🔷', color:'#06b6d4', dv:100, unit:'%DV'},
  folate:{label:'Folate',     emoji:'🟤', color:'#84cc16', dv:100, unit:'%DV'},
  magnesium:{label:'Magnesium',emoji:'🩶',color:'#6b7280',dv:100, unit:'%DV'},
  niacin:{label:'Niacin',     emoji:'🧡', color:'#f59e0b', dv:100, unit:'%DV'},
  selenium:{label:'Selenium', emoji:'🟫', color:'#78716c', dv:100, unit:'%DV'},
  omega3:{label:'Omega-3',    emoji:'🐟', color:'#0ea5e9', dv:100, unit:'%DV'},
};

function buildVitaminPanel(r){
  if(!r.totalVit)return'';
  const vit=r.totalVit;
  // Only show vitamins that have at least some value in the plan
  const active=Object.entries(VIT_META).filter(([k])=>vit[k]>0);
  if(!active.length)return'';
  const rows=active.map(([k,m])=>{
    const val=vit[k]||0;
    const pct=Math.min(100,val);
    const status=val>=100?'✅':val>=50?'⚠️':'❗';
    const statusColor=val>=100?'var(--accent)':val>=50?'var(--amber)':'var(--red)';
    return`<div class="mbar-row">
      <span class="mbar-lbl" style="font-size:10px;width:70px">${m.label}</span>
      <div class="mbar-track"><div class="mbar-fill" style="width:${pct}%;background:${m.color}"></div></div>
      <span style="font-size:10px;width:50px;text-align:right;font-family:var(--mono);color:${statusColor}">${val}% <span style="font-size:9px">${status}</span></span>
    </div>`;
  }).join('');
  return`<div class="card">
    <div class="card-title">🧬 Vitamins & Minerals</div>
    <div class="card-sub" style="margin-bottom:10px">% of recommended daily value from your meal plan. Visual reference only — not used in optimization.</div>
    <div class="macro-bars">${rows}</div>
    <div style="display:flex;gap:12px;font-size:10px;color:var(--text3);margin-top:10px;flex-wrap:wrap">
      <span><span style="color:var(--accent)">✅</span> ≥100% DV met</span>
      <span><span style="color:var(--amber)">⚠️</span> 50–99% DV</span>
      <span><span style="color:var(--red)">❗</span> &lt;50% DV</span>
    </div>
  </div>`;
}

function swapFood(mealId,oldId,newId){
  if(!ST.results)return;
  const oi=ST.results.chosen.findIndex(f=>f.id===oldId&&f._meal===mealId);if(oi<0)return;
  const nf=getAllFoods().find(f=>f.id===newId);if(!nf)return;
  const old=ST.results.chosen[oi];
  ST.results.chosen[oi]={...nf,_cal:nf.cal,_score:nutritionScore(nf),_por:1,_meal:mealId,_mealLabel:old._mealLabel,_mealEmoji:old._mealEmoji};
  // recalc totals
  const r=ST.results;
  r.totalCal=r.chosen.reduce((s,f)=>s+f._cal,0);
  r.totalP=Math.round(r.chosen.reduce((s,f)=>s+f.p*f._por,0));
  r.totalC=Math.round(r.chosen.reduce((s,f)=>s+f.c*f._por,0));
  r.totalF=Math.round(r.chosen.reduce((s,f)=>s+f.f*f._por,0));
  r.totalSugar=Math.round(r.chosen.reduce((s,f)=>s+f.sugar*f._por,0));
  r.totalFiber=Math.round(r.chosen.reduce((s,f)=>s+f.fiber*f._por,0));
  r.totalCost=r.chosen.reduce((s,f)=>s+f.price*f._por,0);
  const vitKeys2=['vitA','vitC','vitD','vitB6','b12','iron','calcium','potassium','zinc','folate','magnesium','omega3','niacin','selenium','manganese'];
  const tv={};vitKeys2.forEach(k=>{tv[k]=Math.round(r.chosen.reduce((s,f)=>s+((f.vit&&f.vit[k]||0)*f._por),0));});r.totalVit=tv;
  r.grade=calcGrade(r);
  renderResults();toast('Swapped!');vibrate(15);
}

// SHARE as PNG
function shareAsPNG(){
  if(!ST.results){toast('No results yet!');return;}
  const r=ST.results;
  const canvas=document.getElementById('share-canvas');
  canvas.width=600;canvas.height=Math.min(900,200+r.chosen.length*50);
  const ctx=canvas.getContext('2d');
  const dark=ST.theme==='dark';
  const bg=dark?'#0d1f12':'#f0f7f2',fg=dark?'#e2f0e8':'#0d2a18',acc='#22c55e';
  ctx.fillStyle=bg;ctx.fillRect(0,0,600,canvas.height);
  ctx.fillStyle=acc;ctx.font='bold 28px Arial';ctx.fillText('CalorieFit',30,45);
  ctx.fillStyle=fg;ctx.font='14px Arial';ctx.fillText(`${today()} • ${r.totalCal}/${r.budget}kcal • Grade: ${r.grade}`,30,68);
  ctx.fillStyle=dark?'#243d2c':'#c8dece';ctx.fillRect(30,78,540,1);
  const macros=[['Cal',r.totalCal,'kcal'],['P',r.totalP,'g'],['C',r.totalC,'g'],['F',r.totalF,'g']];
  macros.forEach(([l,v,u],i)=>{const x=30+i*135;ctx.fillStyle=dark?'#1a3322':'#fff';rRect(ctx,x,88,128,58,6);ctx.fill();ctx.fillStyle=acc;ctx.font='bold 18px Arial';ctx.fillText(v+u,x+10,118);ctx.fillStyle=dark?'#7aab8a':'#3d6b50';ctx.font='11px Arial';ctx.fillText(l,x+10,134);});
  let y=165;
  MEAL_STEPS.forEach(step=>{
    const items=r.chosen.filter(f=>f._meal===step.id);if(!items.length)return;
    ctx.fillStyle=dark?'#7aab8a':'#3d6b50';ctx.font='bold 13px Arial';ctx.fillText(step.emoji+' '+step.label,30,y);y+=18;
    items.forEach(f=>{
      ctx.fillStyle=dark?'#182e20':'#fff';rRect(ctx,30,y,540,38,5);ctx.fill();
      ctx.fillStyle=fg;ctx.font='13px Arial';ctx.fillText(`${f.emoji} ${fname(f)}${f._por>1?` ×${f._por}`:''}`,46,y+24);
      ctx.fillStyle=dark?'#7aab8a':'#3d6b50';ctx.font='11px Arial';ctx.fillText(`${f._cal}kcal P${f.p*f._por}g`,420,y+24);
      y+=46;
    });
  });
  canvas.toBlob(b=>{const url=URL.createObjectURL(b);const a=document.createElement('a');a.href=url;a.download=`caloriefit-${today().replace(/\s/g,'')}.png`;a.click();URL.revokeObjectURL(url);toast('Image saved!');});
}
function rRect(ctx,x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.lineTo(x+w-r,y);ctx.quadraticCurveTo(x+w,y,x+w,y+r);ctx.lineTo(x+w,y+h-r);ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);ctx.lineTo(x+r,y+h);ctx.quadraticCurveTo(x,y+h,x,y+h-r);ctx.lineTo(x,y+r);ctx.quadraticCurveTo(x,y,x+r,y);ctx.closePath();}

// ═══════════════════════════════════════════════════════════════
//  LOG PAGE
// ═══════════════════════════════════════════════════════════════
function saveToLog(){
  if(!ST.results)return;
  const r=ST.results;
  const entry={date:today(),grade:r.grade,cal:r.totalCal,p:r.totalP,c:r.totalC,f:r.totalF,sugar:r.totalSugar,fiber:r.totalFiber,budget:r.budget,cost:r.totalCost,score:r.totalScore,vit:r.totalVit||{},foods:r.chosen.map(f=>fname(f))};
  const ei=ST.log.findIndex(e=>e.date===entry.date);
  if(ei>=0)ST.log[ei]=entry;else ST.log.unshift(entry);
  if(ST.log.length>60)ST.log.pop();
  save();toast(t('saved_log'));confetti();
}
function renderLog(){
  const pg=document.getElementById('pg-log');
  if(ST.waterDate!==today()){ST.water=0;ST.waterDate=today();save();}
  const waterHtml=`<div class="water-card"><div class="row-sb"><span class="card-title">💧 Water</span><span style="font-size:12px;color:var(--accent);font-family:var(--mono)">${ST.water}/8 glasses</span></div><div class="water-glasses">${Array.from({length:8},(_,i)=>`<span class="water-glass ${i<ST.water?'filled':''}" onclick="addWater(${i+1})">💧</span>`).join('')}</div><div class="pbar-wrap" style="margin-top:9px"><div class="pbar" style="width:${Math.min(100,ST.water/8*100)}%"></div></div></div>`;
  const heatHtml=buildHeatmap();
  const trendHtml=buildTrendChart();
  const bestsHtml=buildBests();
  const defHtml=buildDeficit();
  if(!ST.log.length){pg.innerHTML=waterHtml+defHtml+bestsHtml+heatHtml+trendHtml+`<div style="text-align:center;padding:40px 20px;color:var(--text3)"><div style="font-size:36px;margin-bottom:8px">📅</div>No log entries yet!</div>`;return;}
  const logHtml=ST.log.map(e=>`<div class="log-entry"><div class="row-sb"><span class="log-date">${e.date}</span><span class="${gradeClass(e.grade)}" style="font-size:14px;font-weight:700">${gradeEmoji(e.grade)} ${e.grade}</span></div><div class="log-macros"><span style="color:#3b82f6">P${e.p}g</span><span style="color:#22c55e">C${e.c}g</span><span style="color:#ef4444">F${e.f}g</span><span style="color:var(--accent)">${e.cal}kcal</span><span style="color:var(--text3)">₹${e.cost||0}</span></div><div class="log-foods">${e.foods.slice(0,5).join(', ')}${e.foods.length>5?` +${e.foods.length-5} more`:''}</div></div>`).join('');
  pg.innerHTML=waterHtml+defHtml+bestsHtml+heatHtml+trendHtml+`<div class="row-sb" style="margin-bottom:8px"><div class="sec" style="margin:0">History (${ST.log.length})</div><button class="btn-ghost" style="padding:5px 10px;font-size:11px" onclick="loadYesterday()">↩ Yesterday</button></div>`+logHtml+`<button class="btn-ghost" style="width:100%;margin-top:8px;color:var(--red)" onclick="clearLog()">Clear log</button>`;
}
function addWater(n){ST.water=n;ST.waterDate=today();save();renderLog();vibrate(5);}
function buildHeatmap(){
  const last28=[],now=new Date();
  for(let i=27;i>=0;i--){const d=new Date(now);d.setDate(d.getDate()-i);last28.push(d.toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'}));}
  const cells=last28.map(d=>{const e=ST.log.find(x=>x.date===d);if(!e)return`<div class="heat-cell heat-0" title="${d}"></div>`;const p=e.cal/e.budget,l=p>0.9?3:p>0.6?2:1;return`<div class="heat-cell heat-${l}" title="${d}: ${e.cal}kcal (${e.grade})" onclick="toast('${d}: Grade ${e.grade}')">${e.grade}</div>`;}).join('');
  return`<div class="sec">28-day heatmap</div><div class="heatmap">${cells}</div>`;
}
function buildTrendChart(){
  if(ST.log.length<2)return'';
  const last7=ST.log.slice(0,7).reverse();
  const W=320,H=90,pad=18;
  function line(vals){const mv=Math.max(...vals)||1;return vals.map((v,i)=>{const x=pad+i*(W-pad*2)/(vals.length-1),y=H-pad-(v/mv)*(H-pad*2);return`${x},${y}`;}).join(' ');}
  return`<div class="sec">7-day macro trends</div><div class="card" style="padding:12px"><svg width="100%" viewBox="0 0 ${W} ${H}" class="trend-svg"><polyline points="${line(last7.map(e=>e.p))}" fill="none" stroke="#3b82f6" stroke-width="2" stroke-linecap="round"/><polyline points="${line(last7.map(e=>e.c))}" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round"/><polyline points="${line(last7.map(e=>e.f))}" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round"/></svg><div style="display:flex;gap:14px;font-size:11px;color:var(--text3)"><span><span style="color:#3b82f6">■</span> Protein</span><span><span style="color:#22c55e">■</span> Carbs</span><span><span style="color:#ef4444">■</span> Fats</span></div></div>`;
}
function buildBests(){
  if(!ST.log.length)return'';
  const bestG=ST.log.reduce((b,e)=>{'ABCDF'.indexOf(e.grade)<'ABCDF'.indexOf(b)?b=e.grade:null;return b;},'F');
  const streak=calcStreak();
  return`<div class="sec">Personal bests</div><div class="bests-grid"><div class="best-card"><div class="best-val">${bestG}</div><div class="best-lbl">Best grade</div></div><div class="best-card"><div class="best-val">${Math.max(...ST.log.map(e=>e.score||0))}</div><div class="best-lbl">Highest score</div></div><div class="best-card"><div class="best-val">${streak} 🔥</div><div class="best-lbl">Day streak</div></div><div class="best-card"><div class="best-val">${Math.max(...ST.log.map(e=>e.fiber||0))}g</div><div class="best-lbl">Most fiber</div></div></div>`;
}
function calcStreak(){let s=0,prev=new Date();for(const e of ST.log){const d=new Date(e.date);if(Math.round((prev-d)/86400000)<=1){s++;prev=d;}else break;}return s;}
function buildDeficit(){
  if(!ST.log.length||ST.profile.goal==='maintain')return'';
  const last7=ST.log.slice(0,7);
  const def=last7.reduce((s,e)=>s+(e.budget-e.cal),0);
  const isLose=ST.profile.goal==='lose';
  const color=isLose&&def>0?'var(--accent)':isLose?'var(--red)':'var(--blue)';
  return`<div class="deficit-card"><div class="row-sb"><div><div class="card-title">${isLose?'Weekly deficit':'Weekly surplus'}</div><div style="font-size:11px;color:var(--text3);margin-top:2px">Last 7 logged days</div></div><div style="font-size:22px;font-weight:700;font-family:var(--mono);color:${color}">${def>0?'+':''}${def}kcal</div></div><div style="font-size:12px;color:var(--text3);margin-top:8px">~${Math.abs(def/7700).toFixed(2)}kg ${isLose?'weight loss':'muscle gain'} this week</div></div>`;
}
function loadYesterday(){
  const now=new Date();now.setDate(now.getDate()-1);
  const yest=now.toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'});
  const entry=ST.log.find(e=>e.date===yest);
  if(!entry){toast("No log for yesterday!");return;}
  // load foods into breakfast as approximation
  ST.mealSel={breakfast:{},lunch:{},dinner:{},snacks:{}};
  const allF=getAllFoods();
  entry.foods.forEach(name=>{
    const f=allF.find(x=>x.name===name||x.hi===name);
    if(f){const mealId=f.sub==='breakfast'?'breakfast':f.sub==='lunch'?'lunch':f.sub==='dinner'?'dinner':'snacks';ST.mealSel[mealId][f.id]=1;}
  });
  save();toast("Yesterday's plan loaded!");goTo('build');
}
function clearLog(){if(confirm('Clear all log entries?')){ST.log=[];save();renderLog();}}

// ═══════════════════════════════════════════════════════════════
//  ALGO PAGE
// ═══════════════════════════════════════════════════════════════
function renderAlgo(){
  const pg=document.getElementById('pg-algo');
  const r=ST.results;
  const budget=ST.profile.calories;
  const w=ST.sensW;
  // Pick the meal with most candidates for DP display
  const bestMeal=r&&ST._dpInfo?Object.entries(ST._dpInfo).sort((a,b)=>b[1].candidates.length-a[1].candidates.length)[0]:null;
  const dpInfo=bestMeal?bestMeal[1]:null;
  const n=dpInfo?dpInfo.candidates.length:0,W=dpInfo?dpInfo.subBudget:budget;
  pg.innerHTML=`
    <div class="sec">Complexity analysis</div>
    <div class="complexity-grid">
      <div class="cx-card"><div class="cx-val">O(n·W)</div><div class="cx-lbl">Time (per meal)</div></div>
      <div class="cx-card"><div class="cx-val">O(W)</div><div class="cx-lbl">Space (1D opt)</div></div>
      <div class="cx-card"><div class="cx-val">${n}</div><div class="cx-lbl">n (foods)</div></div>
      <div class="cx-card"><div class="cx-val">${W}</div><div class="cx-lbl">W (kcal cap)</div></div>
    </div>
    <div class="algo-box" style="margin-bottom:12px">
      <div class="algo-title">How it works</div>
      <div class="algo-text">CalorieFit runs 0-1 Knapsack <strong>once per meal slot</strong> (Breakfast, Lunch, Dinner, Snacks) with its own calorie sub-budget (25%/35%/30%/10% split). Each run fills a dp[n+1][W+1] table where dp[i][j] = max nutrition score using first i foods within j kcal. Total operations this run: ~${Object.values(ST._dpInfo||{}).reduce((s,d)=>s+d.candidates.length*(d.subBudget||0),0).toLocaleString()}.</div>
    </div>
    <div class="sec">Recurrence relation</div>
    <div class="recurrence-box">
      <div class="rec-formula" style="font-size:12px">dp[i][j] = <span style="color:#3b82f6">max</span>( dp[i−1][j], dp[i−1][j−w<sub>i</sub>] + v<sub>i</sub> )</div>
      <div style="font-size:11px;color:var(--text3);margin-top:4px">where w = calories, v = nutrition score</div>
      <div class="rec-live" id="rec-live">Click a cell in the DP table to see live values</div>
    </div>
    <div class="sec">Pseudocode</div>
    <div class="card" style="padding:10px"><div class="pseudocode">${buildPseudocode()}</div></div>
    ${dpInfo?`
    <div class="sec">DP Table visualizer — ${bestMeal[0]} (${n} foods × ${W}kcal)</div>
    <div class="dp-vis-card">
      <div class="dp-controls">
        <button class="dp-btn" id="dp-play-btn" onclick="dpTogglePlay()">▶ Play</button>
        <button class="dp-btn" onclick="dpReset()">↺ Reset</button>
        <button class="dp-btn" onclick="dpStep()">→ Step</button>
        <div style="display:flex;align-items:center;gap:6px;flex:1"><label style="font-size:11px;color:var(--text3)">Speed</label><input type="range" class="slider-inp" min="20" max="400" value="${ST.dpAnim.speed}" oninput="dpSetSpeed(this.value)"/></div>
      </div>
      <div style="font-size:12px;color:var(--text3);margin-bottom:8px" id="dp-status">Press Play to animate.</div>
      <div class="dp-table-wrap" id="dp-table-wrap">${buildDPTableHTML(dpInfo)}</div>
      <div style="display:flex;gap:8px;font-size:10px;color:var(--text3);margin-top:6px;flex-wrap:wrap">
        <span><span style="background:var(--accent-dim2);color:var(--accent);padding:1px 5px;border-radius:3px">Green</span> improved</span>
        <span><span style="background:#fef9c330;color:var(--amber);padding:1px 5px;border-radius:3px">Yellow</span> computing</span>
        <span><span style="background:#3b82f620;color:var(--blue);padding:1px 5px;border-radius:3px">Blue</span> traceback</span>
      </div>
    </div>
    <div class="sec">Knapsack vs Greedy comparison</div>
    <div class="card" style="padding:12px">
      <div style="display:flex;gap:8px;margin-bottom:10px">
        <button class="dp-btn" onclick="animCompare()">▶ Animate</button>
        <button class="dp-btn" onclick="resetCompare()">↺ Reset</button>
      </div>
      <div class="compare-grid" id="compare-grid">${buildStaticCompare()}</div>
      <div class="algo-box" style="margin-top:0">
        <div class="algo-title">Why DP wins</div>
        <div class="algo-text">Greedy selects by score/calorie ratio — O(n log n) but misses global optimum. DP considers ALL subsets implicitly. Here DP scored <strong style="color:var(--accent)">${r.totalScore-r.greedyScore}pts more</strong>.</div>
      </div>
    </div>`:'<div style="text-align:center;padding:30px;color:var(--text3)">Run an optimization first to see the DP visualizer.</div>'}
    <div class="sec">Sensitivity weights</div>
    <div class="card">
      <div class="card-sub">Adjust how the score formula weighs each nutrient. Re-optimize to apply.</div>
      <div class="slider-wrap">
        ${sliderHTML('Protein','protein',w.protein)}
        ${sliderHTML('Carb mod','carb',w.carb)}
        ${sliderHTML('Sugar −','sugar',w.sugar)}
        ${sliderHTML('Fiber +','fiber',w.fiber)}
      </div>
    </div>
    ${r?`<div class="sec">Algorithm report</div><div class="card"><div class="report-preview">${buildReport()}</div><button class="btn-primary" style="margin-top:10px" onclick="downloadReport()">⬇ Download report</button></div>`:''}
  `;
  ST._dpInfo_active=dpInfo;ST._dpAnimI=1;ST._dpAnimJ=0;
}
function buildPseudocode(){
  return[
    {n:1,c:`<span class="pc-kw">function</span> <span class="pc-fn">knapsack01</span>(foods, capacity):`},
    {n:2,c:`  dp ← new Array(n+1, W+1, 0)`},
    {n:3,c:`  <span class="pc-kw">for</span> i = 1 <span class="pc-kw">to</span> n:`},
    {n:4,c:`    w ← foods[i].calories`},
    {n:5,c:`    v ← foods[i].nutritionScore`},
    {n:6,c:`    <span class="pc-kw">for</span> j = 0 <span class="pc-kw">to</span> capacity:`},
    {n:7,c:`      dp[i][j] ← dp[i−1][j]  <span class="pc-comment">// skip food</span>`},
    {n:8,c:`      <span class="pc-kw">if</span> w ≤ j <span class="pc-kw">and</span> dp[i−1][j−w]+v > dp[i][j]:`},
    {n:9,c:`        dp[i][j] ← dp[i−1][j−w]+v  <span class="pc-comment">// take food</span>`},
    {n:10,c:`  <span class="pc-kw">return</span> traceback(dp)`},
  ].map(l=>`<div class="pc-line" id="pc-${l.n}">${String(l.n).padStart(2,' ')}  ${l.c}</div>`).join('');
}
function hPCLine(n){document.querySelectorAll('.pc-line').forEach(el=>el.classList.remove('active'));const el=document.getElementById('pc-'+n);if(el){el.classList.add('active');el.scrollIntoView({block:'nearest'});}}
function buildDPTableHTML(di){
  if(!di||!di.dpTable)return'<div style="padding:10px;color:var(--text3)">No data.</div>';
  const items=di.candidates.slice(0,8),W=di.W;
  const step=Math.max(1,Math.round(W/12));
  const cols=[0,...Array.from({length:12},(_,i)=>(i+1)*step).filter(c=>c<=W)];
  let html=`<table class="dp-table" id="dp-tbl"><thead><tr><th>i\\W</th>${cols.map(c=>`<th>${c}</th>`).join('')}</tr></thead><tbody>`;
  for(let i=0;i<=items.length;i++){
    html+=`<tr><th style="text-align:left;color:var(--text2);max-width:80px;overflow:hidden">${i===0?'∅':(items[i-1].emoji+' '+fname(items[i-1]).slice(0,8))}</th>`;
    cols.forEach(cw=>{const v=di.dpTable[i]?.[Math.min(cw,W)]||0;html+=`<td class="dp-cell-same" id="dpc-${i}-${cw}" onclick="dpCellClick(${i},${cw})">${v}</td>`;});
    html+='</tr>';
  }
  return html+'</tbody></table>';
}
let _dpTimer=null,_dpI=1,_dpJ=0,_dpCols=[];
function dpTogglePlay(){if(ST.dpAnim.running)dpPause();else dpPlay();}
function dpPlay(){
  if(!ST._dpInfo_active)return;
  ST.dpAnim.running=true;
  const btn=document.getElementById('dp-play-btn');if(btn){btn.textContent='⏸ Pause';btn.classList.add('running');}
  _dpAnimate();
}
function dpPause(){
  ST.dpAnim.running=false;clearTimeout(_dpTimer);
  const btn=document.getElementById('dp-play-btn');if(btn){btn.textContent='▶ Play';btn.classList.remove('running');}
}
function dpReset(){
  dpPause();_dpI=1;_dpJ=0;_dpCols=[];
  const wrap=document.getElementById('dp-table-wrap');
  if(wrap&&ST._dpInfo_active)wrap.innerHTML=buildDPTableHTML(ST._dpInfo_active);
  const s=document.getElementById('dp-status');if(s)s.textContent='Reset. Press Play to animate.';
  document.querySelectorAll('.pc-line').forEach(el=>el.classList.remove('active'));
}
function dpStep(){if(!ST.dpAnim.running)_dpAnimate(true);}
function dpSetSpeed(v){ST.dpAnim.speed=+v;}
function _dpAnimate(once=false){
  const di=ST._dpInfo_active;if(!di)return;
  const items=di.candidates.slice(0,8),W=di.W;
  if(!_dpCols.length){const step=Math.max(1,Math.round(W/12));_dpCols=[0,...Array.from({length:12},(_,i)=>(i+1)*step).filter(c=>c<=W)];}
  if(_dpI>items.length){hPCLine(10);const s=document.getElementById('dp-status');if(s)s.textContent='Complete! Traceback highlighted in blue.';
    let j=W;for(let i=items.length;i>=1;i--){const prev=di.dpTable[i-1]?.[j]||0,cur=di.dpTable[i]?.[j]||0;if(cur!==prev){const nc=_dpCols.reduce((a,b)=>Math.abs(b-j)<Math.abs(a-j)?b:a);const el=document.getElementById(`dpc-${i}-${nc}`);if(el)el.className='dp-cell-trace';j-=Math.floor(items[i-1]._cal);}}
    dpPause();return;
  }
  const jCol=_dpCols[_dpJ%_dpCols.length];
  const item=items[_dpI-1];const w=Math.min(Math.floor(item._cal),W),v=item._score;
  const prev=di.dpTable[_dpI-1]?.[Math.min(jCol,W)]||0,newv=di.dpTable[_dpI]?.[Math.min(jCol,W)]||0;
  const el=document.getElementById(`dpc-${_dpI}-${jCol}`);
  if(el){el.className='dp-cell-computing';el.textContent='…';setTimeout(()=>{if(el){el.textContent=newv;el.className=newv>prev?'dp-cell-updated':'dp-cell-same';}},ST.dpAnim.speed/2);}
  hPCLine(_dpJ===0?3:w<=jCol?(newv>prev?9:7):7);
  const s=document.getElementById('dp-status');if(s)s.textContent=`i=${_dpI} (${fname(item).slice(0,12)}) j=${jCol} → ${newv} ${newv>prev?'✓':'='}`;
  const rl=document.getElementById('rec-live');if(rl)rl.textContent=`i=${_dpI}, j=${jCol}, w=${w}, v=${v} → max(${prev}, ${w<=jCol?(di.dpTable[_dpI-1]?.[Math.min(jCol-w,W)]||0)+v:'n/a'}) = ${newv}`;
  _dpJ++;if(_dpJ>=_dpCols.length){_dpJ=0;_dpI++;}
  if(!once)_dpTimer=setTimeout(_dpAnimate,ST.dpAnim.speed);
}
function dpCellClick(i,j){
  const di=ST._dpInfo_active;if(!di)return;
  const items=di.candidates.slice(0,8),W=di.W;
  const v=di.dpTable[i]?.[Math.min(j,W)]||0,prev=di.dpTable[i-1]?.[Math.min(j,W)]||0;
  const item=i>0?items[i-1]:null;const w=item?Math.min(Math.floor(item._cal),W):0,sc=item?item._score:0;
  const rl=document.getElementById('rec-live');
  if(rl)rl.textContent=`Cell [${i}][${j}]=${v}. ${item?`${fname(item)} (w=${w}, v=${sc}). max(dp[${i-1}][${j}]=${prev}, dp[${i-1}][${j-w}]+${sc}=${w<=j?(di.dpTable[i-1]?.[Math.min(j-w,W)]||0)+sc:'n/a'}) = ${v}`:'Base row.'}`;
}
function buildStaticCompare(){
  if(!ST.results)return'';
  const r=ST.results;
  return`<div class="compare-col"><div class="compare-col-title ${r.totalScore>=r.greedyScore?'compare-winner':''}">⚡ Knapsack DP ${r.totalScore>=r.greedyScore?'🏆':''}</div><div class="compare-score" style="color:var(--accent)">${r.totalScore}pts</div>${r.chosen.slice(0,6).map(f=>`<div class="compare-item">${f.emoji} ${fname(f).slice(0,14)}</div>`).join('')}</div><div class="compare-col"><div class="compare-col-title ${r.greedyScore>r.totalScore?'compare-winner':''}">📊 Greedy ${r.greedyScore>r.totalScore?'🏆':''}</div><div class="compare-score" style="color:var(--amber)">${r.greedyScore}pts</div><div id="greedy-items">${r.greedyChosen.slice(0,6).map(f=>`<div class="compare-item">${f.emoji} ${fname(f).slice(0,14)}</div>`).join('')}</div></div>`;
}
let _cmpTimer=null;
function animCompare(){
  if(!ST.results||!ST._dpInfo_active)return;
  resetCompare();
  const di=ST._dpInfo_active;
  const sorted=[...di.candidates].sort((a,b)=>(b._score/b._cal)-(a._score/a._cal));
  const picked=new Set(ST.results.greedyChosen.map(f=>f.id));
  const greedyEl=document.getElementById('greedy-items');
  if(greedyEl)greedyEl.innerHTML='';
  let step=0;
  function next(){
    if(step>=sorted.length)return;
    const f=sorted[step];const ok=picked.has(f.id);
    if(greedyEl){const d=document.createElement('div');d.className=`compare-item ${ok?'picked':'skipped'}`;d.innerHTML=`${f.emoji} ${fname(f).slice(0,14)} ${ok?'✓':'✗'}`;greedyEl.appendChild(d);}
    step++;_cmpTimer=setTimeout(next,180);
  }
  setTimeout(next,300);
}
function resetCompare(){clearTimeout(_cmpTimer);const g=document.getElementById('compare-grid');if(g)g.innerHTML=buildStaticCompare();}
function sliderHTML(lbl,key,val){return`<div class="slider-row"><span class="slider-lbl">${lbl}</span><input class="slider-inp" type="range" min="0" max="5" step="0.5" value="${val}" oninput="updateSens('${key}',this.value)"/><span class="slider-val" id="sv-${key}">${val}</span></div>`;}
function updateSens(key,val){ST.sensW[key]=parseFloat(val);const el=document.getElementById('sv-'+key);if(el)el.textContent=val;save();}
function buildReport(){
  if(!ST.results)return'';const r=ST.results;
  return`CalorieFit Algorithm Report\nDate: ${new Date().toLocaleString()}\nProfile: ${ST.profile.name} | ${ST.profile.goal} | ${ST.profile.calories}kcal\n\n— ALGORITHM: 0-1 Knapsack DP (per meal slot) —\nMeal slots: ${MEAL_STEPS.map(s=>`${s.label}(${Math.round(ST.profile.calories*s.pct)}kcal)`).join(', ')}\nTime: O(n·W) per slot\nSpace: O(n·W) reducible to O(W)\n\n— RESULTS —\nItems: ${r.chosen.length} | Total: ${r.totalCal}/${r.budget}kcal\nProtein: ${r.totalP}g | Carbs: ${r.totalC}g | Fat: ${r.totalF}g\nSugar: ${r.totalSugar}g | Fiber: ${r.totalFiber}g\nGrade: ${r.grade} ${gradeEmoji(r.grade)}\nCost: ₹${r.totalCost}\n\n— COMPARISON —\nKnapsack: ${r.totalScore}pts\nGreedy: ${r.greedyScore}pts\nDP advantage: +${r.totalScore-r.greedyScore}pts\n\n— CHOSEN FOODS —\n${r.chosen.map((f,i)=>`${i+1}. [${f._mealLabel}] ${fname(f)}${f._por>1?` ×${f._por}`:''} | ${f._cal}kcal | P:${f.p*f._por}g C:${f.c*f._por}g`).join('\n')}`;
}
function downloadReport(){const text=buildReport();const blob=new Blob([text],{type:'text/plain'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=`caloriefit-report-${today().replace(/\s/g,'')}.txt`;a.click();URL.revokeObjectURL(url);toast('Report downloaded!');}

// ═══════════════════════════════════════════════════════════════
//  PROFILE PAGE
// ═══════════════════════════════════════════════════════════════
function renderProfile(){
  const p=ST.profile,pg=document.getElementById('pg-profile');
  pg.innerHTML=`
    <div id="install-area"></div>
    <div class="profile-hero">
      <div class="p-avatar">🥗</div>
      <div><div class="p-name">${p.name}</div><div class="p-goal">${cap(p.goal)} · ${p.dietType} · ${p.sex}</div><div class="p-cal">${p.calories}kcal · ₹${p.budget}/day</div></div>
    </div>
    <div class="sec">Personal info</div>
    <div class="field-card">
      <div class="field-row"><div class="field-lbl">Name</div><input class="field-inp" id="f-name" type="text" value="${p.name}"/></div>
      <div class="field-row"><div class="field-lbl">Age</div><input class="field-inp" id="f-age" type="number" value="${p.age}" min="10" max="90"/></div>
      <div class="field-row"><div class="field-lbl">Sex</div><select class="field-inp" id="f-sex"><option value="male" ${p.sex==='male'?'selected':''}>Male</option><option value="female" ${p.sex==='female'?'selected':''}>Female</option></select></div>
      <div class="field-row"><div class="field-lbl">Weight (kg)</div><input class="field-inp" id="f-weight" type="number" value="${p.weight}"/></div>
      <div class="field-row"><div class="field-lbl">Height (cm)</div><input class="field-inp" id="f-height" type="number" value="${p.height}"/></div>
      <div class="field-row"><div class="field-lbl">Activity</div><select class="field-inp" id="f-act">${ACT.map(([v,l])=>`<option value="${v}" ${p.activity===v?'selected':''}>${l}</option>`).join('')}</select></div>
    </div>
    <div class="sec">Goal & budget</div>
    <div class="field-card">
      <div class="field-row"><div class="field-lbl">Goal</div><select class="field-inp" id="f-goal" onchange="profGoalChange()">
        <option value="lose" ${p.goal==='lose'?'selected':''}>Lose weight</option>
        <option value="maintain" ${p.goal==='maintain'?'selected':''}>Maintain</option>
        <option value="gain" ${p.goal==='gain'?'selected':''}>Gain muscle</option>
        <option value="custom" ${p.goal==='custom'?'selected':''}>Custom</option>
      </select></div>
      <div class="field-row" id="custom-cal-row" style="${p.goal==='custom'?'':'display:none'}"><div class="field-lbl">Calories</div><input class="field-inp" id="f-custom" type="number" value="${p.calories}" min="800" max="5000"/></div>
      <div class="field-row"><div class="field-lbl">Budget (₹)</div><input class="field-inp" id="f-budget" type="number" value="${p.budget}"/></div>
    </div>
    <div class="sec">Dietary preferences</div>
    <div class="field-card" style="padding:12px">
      <div style="font-size:10px;color:var(--text3);font-weight:700;letter-spacing:.06em;margin-bottom:7px">DIET TYPE</div>
      <div class="chip-row" style="margin-bottom:12px">${DIET_TYPES.map(d=>`<div class="chip ${p.dietType===d?'on':''}" onclick="setDietType('${d}')">${cap(d)}</div>`).join('')}</div>
      <div style="font-size:10px;color:var(--text3);font-weight:700;letter-spacing:.06em;margin-bottom:7px">ALLERGIES / AVOID</div>
      <div class="chip-row">${ALLERGIES.map(a=>`<div class="chip ${(p.allergies||[]).includes(a)?'on-red':''}" onclick="toggleAllergy('${a}')">${cap(a)}</div>`).join('')}</div>
    </div>
    <div class="sec">Custom foods</div>
    <div id="custom-foods-list">${(ST.customFoods||[]).map((f,i)=>`<div class="cf-item"><div><div class="cf-name">${f.emoji} ${f.name}</div><div class="cf-meta">${f.cal}kcal · P${f.p}g C${f.c}g F${f.f}g · ₹${f.price}</div></div><button class="cf-del" onclick="delCustomFood(${i})">✕</button></div>`).join('')||'<div style="font-size:12px;color:var(--text3);margin-bottom:8px">No custom foods.</div>'}</div>
    <button class="btn-ghost" style="width:100%;margin-bottom:12px" onclick="showAddCustomFood()">+ Add custom food</button>
    <div class="sec">Meal templates</div>
    ${ST.templates.length?`<div class="templates-grid">${ST.templates.map((tp,i)=>`<div class="template-card" onclick="loadTemplate(${i})"><button class="template-del" onclick="event.stopPropagation();delTemplate(${i})">✕</button><div class="template-name">${tp.name}</div><div class="template-meta">${Object.values(tp.mealSel||{}).reduce((s,m)=>s+Object.keys(m).length,0)} foods</div></div>`).join('')}</div>`:'<div style="font-size:12px;color:var(--text3);margin-bottom:10px">No templates yet.</div>'}
    <button class="btn-primary" onclick="saveProfile()" style="margin-top:4px">Save profile</button>
  `;
  renderInstallBanner();
}
function profGoalChange(){document.getElementById('custom-cal-row').style.display=document.getElementById('f-goal').value==='custom'?'':'none';}
function setDietType(d){ST.profile.dietType=d;renderProfile();}
function toggleAllergy(a){const arr=ST.profile.allergies||[];const i=arr.indexOf(a);i===-1?arr.push(a):arr.splice(i,1);ST.profile.allergies=arr;renderProfile();}
function saveProfile(){
  const goal=document.getElementById('f-goal').value;
  const np={...ST.profile,name:document.getElementById('f-name').value||'User',age:+document.getElementById('f-age').value||20,sex:document.getElementById('f-sex').value,weight:+document.getElementById('f-weight').value||65,height:+document.getElementById('f-height').value||170,activity:document.getElementById('f-act').value,goal,budget:+document.getElementById('f-budget').value||500};
  np.calories=goal==='custom'?(+document.getElementById('f-custom')?.value||2000):calcTDEE(np);
  ST.profile=np;save();toast(t('prof_saved'));renderProfile();updateTopPill();
}
function saveTemplate(){const name=prompt('Template name (e.g. Gym Day):');if(!name)return;ST.templates.push({name,mealSel:JSON.parse(JSON.stringify(ST.mealSel))});if(ST.templates.length>12)ST.templates.shift();save();toast('Template saved!');}
function loadTemplate(i){const tp=ST.templates[i];if(!tp)return;ST.mealSel=JSON.parse(JSON.stringify(tp.mealSel||{breakfast:{},lunch:{},dinner:{},snacks:{}}));save();toast('Template loaded!');goTo('build');}
function delTemplate(i){ST.templates.splice(i,1);save();renderProfile();}

function showAddCustomFood(){
  openModal(`
    <div class="modal-handle"></div>
    <div class="modal-title">Add custom food</div>
    <div class="ob-field"><div class="ob-label">Name</div><input class="ob-input" id="cf-name" type="text" placeholder="My protein shake"/></div>
    <div class="ob-row2"><div class="ob-field"><div class="ob-label">Emoji</div><input class="ob-input" id="cf-emoji" type="text" placeholder="🥤" maxlength="2"/></div><div class="ob-field"><div class="ob-label">Price (₹)</div><input class="ob-input" id="cf-price" type="number" placeholder="50"/></div></div>
    <div class="ob-row2"><div class="ob-field"><div class="ob-label">Calories</div><input class="ob-input" id="cf-cal" type="number" placeholder="200"/></div><div class="ob-field"><div class="ob-label">Protein (g)</div><input class="ob-input" id="cf-p" type="number" placeholder="20"/></div></div>
    <div class="ob-row2"><div class="ob-field"><div class="ob-label">Carbs (g)</div><input class="ob-input" id="cf-c" type="number" placeholder="15"/></div><div class="ob-field"><div class="ob-label">Fat (g)</div><input class="ob-input" id="cf-f" type="number" placeholder="5"/></div></div>
    <div class="ob-row2"><div class="ob-field"><div class="ob-label">Sugar (g)</div><input class="ob-input" id="cf-s" type="number" placeholder="3"/></div><div class="ob-field"><div class="ob-label">Fiber (g)</div><input class="ob-input" id="cf-fiber" type="number" placeholder="2"/></div></div>
    <div class="ob-field"><div class="ob-label">Meal type</div><select class="ob-input" id="cf-sub"><option value="breakfast">Breakfast</option><option value="lunch">Lunch</option><option value="dinner">Dinner</option><option value="snack">Snack</option><option value="drink">Drink</option></select></div>
    <button class="btn-primary" style="margin-top:12px" onclick="addCustomFood()">Add food</button>
  `);
}
function addCustomFood(){
  const name=document.getElementById('cf-name')?.value.trim();
  if(!name){toast('Enter a name!');return;}
  if(!ST.customFoods)ST.customFoods=[];
  ST.customFoods.push({id:Date.now(),name,hi:name,brand:'Custom',cal:+document.getElementById('cf-cal')?.value||100,p:+document.getElementById('cf-p')?.value||0,c:+document.getElementById('cf-c')?.value||0,f:+document.getElementById('cf-f')?.value||0,sugar:+document.getElementById('cf-s')?.value||0,fiber:+document.getElementById('cf-fiber')?.value||0,price:+document.getElementById('cf-price')?.value||0,emoji:document.getElementById('cf-emoji')?.value||'⭐',cat:'custom',sub:document.getElementById('cf-sub')?.value||'snack',tags:['veg']});
  save();closeModal();toast('Custom food added!');renderProfile();
}
function delCustomFood(i){ST.customFoods.splice(i,1);save();renderProfile();}

// ═══════════════════════════════════════════════════════════════
//  MODAL
// ═══════════════════════════════════════════════════════════════
function openModal(html){document.getElementById('modal-box').innerHTML=html;document.getElementById('modal-overlay').classList.add('open');document.getElementById('modal-box').classList.add('open');}
function closeModal(){document.getElementById('modal-overlay').classList.remove('open');document.getElementById('modal-box').classList.remove('open');}

// ═══════════════════════════════════════════════════════════════
//  CONFETTI
// ═══════════════════════════════════════════════════════════════
function confetti(){
  const colors=['#22c55e','#3b82f6','#a855f7','#f59e0b','#ef4444','#ec4899'];
  const canvas=document.createElement('canvas');
  canvas.id='confetti-canvas';canvas.style.cssText='position:fixed;inset:0;pointer-events:none;z-index:9999';
  canvas.width=window.innerWidth;canvas.height=window.innerHeight;
  document.body.appendChild(canvas);
  const ctx=canvas.getContext('2d');
  const particles=Array.from({length:50},()=>({x:Math.random()*canvas.width,y:-10,vx:(Math.random()-.5)*8,vy:Math.random()*4+3,rot:Math.random()*360,rotV:(Math.random()-.5)*15,color:colors[Math.floor(Math.random()*colors.length)],size:Math.random()*8+4,opacity:1}));
  let frame=0;
  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    let alive=false;
    particles.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=0.15;p.rot+=p.rotV;p.opacity-=0.008;if(p.opacity>0&&p.y<canvas.height)alive=true;ctx.save();ctx.globalAlpha=Math.max(0,p.opacity);ctx.translate(p.x,p.y);ctx.rotate(p.rot*Math.PI/180);ctx.fillStyle=p.color;ctx.fillRect(-p.size/2,-p.size/2,p.size,p.size);ctx.restore();});
    if(alive&&frame<200){frame++;requestAnimationFrame(draw);}else canvas.remove();
  }
  requestAnimationFrame(draw);
}

// ═══════════════════════════════════════════════════════════════
//  PWA INSTALL
// ═══════════════════════════════════════════════════════════════
let deferredPrompt=null;
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;renderInstallBanner();});
function renderInstallBanner(){const a=document.getElementById('install-area');if(!a)return;a.innerHTML=deferredPrompt?`<div class="install-card"><p>Install CalorieFit on your device for offline use!</p><button onclick="installPWA()">Install</button></div>`:'';};
function installPWA(){if(!deferredPrompt)return;deferredPrompt.prompt();deferredPrompt.userChoice.then(()=>{deferredPrompt=null;renderInstallBanner();});}

// ═══════════════════════════════════════════════════════════════
//  CUISINE OF THE DAY
// ═══════════════════════════════════════════════════════════════
function setCuisineOfDay(){
  const msgs=['🌶️ Explore South Indian!','🍛 North Indian classics!','🥢 Go Asian today!','🌍 Western vibes!','🏪 Fast food day?','🥗 Healthy greens!'];
  const el=document.getElementById('cuisine-tag');
  if(el)el.textContent=msgs[new Date().getDate()%msgs.length];
}

// ═══════════════════════════════════════════════════════════════
//  BOOT
// ═══════════════════════════════════════════════════════════════
load();
LANG=ST.lang||'en';
applyTheme();
setCuisineOfDay();
const lb=document.getElementById('lang-btn');if(lb)lb.textContent=LANG==='en'?'🇮🇳':'🇬🇧';
const tb=document.getElementById('theme-btn');if(tb)tb.textContent=ST.theme==='dark'?'☀️':'🌙';
if(!ST.onboarded){renderOnboard();}
else{document.getElementById('pg-onboard').style.display='none';document.getElementById('main-shell').style.display='flex';goTo('build');}
if('serviceWorker'in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{});

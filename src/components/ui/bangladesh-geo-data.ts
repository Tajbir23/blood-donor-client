// Bangladesh Geographic Data
// Contains divisions, districts, and thanas of Bangladesh

interface Thana {
  id: string;
  name: string;
}

interface District {
  id: string;
  name: string;
  thanas: Thana[];
}

interface Division {
  id: string;
  name: string;
  districts: District[];
}

interface BangladeshGeoData {
  divisions: Division[];
}

export const bangladeshGeoData: BangladeshGeoData = {
  divisions: [
    {
      id: "dhaka",
      name: "ঢাকা",
      districts: [
        {
          id: "dhaka",
          name: "ঢাকা",
          thanas: [
            { id: "adabor", name: "আদাবর" },
            { id: "badda", name: "বাড্ডা" },
            { id: "banani", name: "বনানী" },
            { id: "dhanmondi", name: "ধানমন্ডি" },
            { id: "gulshan", name: "গুলশান" },
            { id: "mirpur", name: "মিরপুর" },
            { id: "mohammadpur", name: "মোহাম্মদপুর" },
            { id: "motijheel", name: "মতিঝিল" },
            { id: "paltan", name: "পল্টন" },
            { id: "ramna", name: "রমনা" },
            { id: "tejgaon", name: "তেজগাঁও" },
            { id: "uttara", name: "উত্তরা" }
          ]
        },
        {
          id: "gazipur",
          name: "গাজীপুর",
          thanas: [
            { id: "gazipur_sadar", name: "গাজীপুর সদর" },
            { id: "kaliakair", name: "কালিয়াকৈর" },
            { id: "kaliganj", name: "কালীগঞ্জ" },
            { id: "kapasia", name: "কাপাসিয়া" },
            { id: "sreepur", name: "শ্রীপুর" }
          ]
        },
        {
          id: "narayanganj",
          name: "নারায়ণগঞ্জ",
          thanas: [
            { id: "narayanganj_sadar", name: "নারায়ণগঞ্জ সদর" },
            { id: "araihazar", name: "আড়াইহাজার" },
            { id: "bandar", name: "বন্দর" },
            { id: "rupganj", name: "রূপগঞ্জ" },
            { id: "sonargaon", name: "সোনারগাঁও" }
          ]
        },
        {
          id: "narsingdi",
          name: "নরসিংদী",
          thanas: [
            { id: "narsingdi_sadar", name: "নরসিংদী সদর" },
            { id: "belabo", name: "বেলাবো" },
            { id: "monohardi", name: "মনোহরদী" },
            { id: "palash", name: "পলাশ" },
            { id: "raipura", name: "রায়পুরা" },
            { id: "shibpur", name: "শিবপুর" }
          ]
        },
        {
          id: "tangail",
          name: "টাঙ্গাইল",
          thanas: [
            { id: "tangail_sadar", name: "টাঙ্গাইল সদর" },
            { id: "basail", name: "বাসাইল" },
            { id: "bhuapur", name: "ভুয়াপুর" },
            { id: "delduar", name: "দেলদুয়ার" },
            { id: "ghatail", name: "ঘাটাইল" },
            { id: "gopalpur", name: "গোপালপুর" },
            { id: "kalihati", name: "কালিহাতি" },
            { id: "madhupur", name: "মধুপুর" },
            { id: "mirzapur", name: "মির্জাপুর" },
            { id: "nagarpur", name: "নাগরপুর" },
            { id: "shakhipur", name: "সখিপুর" }
          ]
        },
        {
          id: "munshiganj",
          name: "মুন্সিগঞ্জ",
          thanas: [
            { id: "munshiganj_sadar", name: "মুন্সিগঞ্জ সদর" },
            { id: "gazaria", name: "গজারিয়া" },
            { id: "louhajang", name: "লৌহজং" },
            { id: "sirajdikhan", name: "সিরাজদিখান" },
            { id: "sreenagar", name: "শ্রীনগর" },
            { id: "tongibari", name: "টঙ্গিবাড়ি" }
          ]
        },
        {
          id: "kishoreganj",
          name: "কিশোরগঞ্জ",
          thanas: [
            { id: "kishoreganj_sadar", name: "কিশোরগঞ্জ সদর" },
            { id: "austagram", name: "অষ্টগ্রাম" },
            { id: "bajitpur", name: "বাজিতপুর" },
            { id: "bhairab", name: "ভৈরব" },
            { id: "hossainpur", name: "হোসেনপুর" },
            { id: "karimganj", name: "করিমগঞ্জ" }
          ]
        }
      ]
    },
    {
      id: "rangpur",
      name: "রংপুর",
      districts: [
        {
          id: "rangpur",
          name: "রংপুর",
          thanas: [
            { id: "rangpur_sadar", name: "রংপুর সদর" },
            { id: "badarganj", name: "বদরগঞ্জ" },
            { id: "gangachara", name: "গঙ্গাচড়া" },
            { id: "kaunia", name: "কাউনিয়া" },
            { id: "mithapukur", name: "মিঠাপুকুর" },
            { id: "pirgacha", name: "পীরগাছা" },
            { id: "pirganj", name: "পীরগঞ্জ" },
            { id: "taraganj", name: "তারাগঞ্জ" }
          ]
        },
        {
          id: "dinajpur",
          name: "দিনাজপুর",
          thanas: [
            { id: "dinajpur_sadar", name: "দিনাজপুর সদর" },
            { id: "birampur", name: "বিরামপুর" },
            { id: "birganj", name: "বীরগঞ্জ" },
            { id: "bochaganj", name: "বোচাগঞ্জ" },
            { id: "chirirbandar", name: "চিরিরবন্দর" },
            { id: "fulbari", name: "ফুলবাড়ী" },
            { id: "ghoraghat", name: "ঘোড়াঘাট" },
            { id: "hakimpur", name: "হাকিমপুর" },
            { id: "kaharole", name: "কাহারোল" },
            { id: "khansama", name: "খানসামা" },
            { id: "nawabganj", name: "নবাবগঞ্জ" },
            { id: "parbatipur", name: "পার্বতীপুর" }
          ]
        },
        {
          id: "kurigram",
          name: "কুড়িগ্রাম",
          thanas: [
            { id: "kurigram_sadar", name: "কুড়িগ্রাম সদর" },
            { id: "bhurungamari", name: "ভুরুঙ্গামারী" },
            { id: "char_rajibpur", name: "চর রাজিবপুর" },
            { id: "chilmari", name: "চিলমারী" },
            { id: "phulbari", name: "ফুলবাড়ী" },
            { id: "nageshwari", name: "নাগেশ্বরী" },
            { id: "rajarhat", name: "রাজারহাট" },
            { id: "rowmari", name: "রৌমারী" },
            { id: "ulipur", name: "উলিপুর" }
          ]
        },
        {
          id: "gaibandha",
          name: "গাইবান্ধা",
          thanas: [
            { id: "gaibandha_sadar", name: "গাইবান্ধা সদর" },
            { id: "fulchhari", name: "ফুলছড়ি" },
            { id: "gobindaganj", name: "গোবিন্দগঞ্জ" },
            { id: "palashbari", name: "পলাশবাড়ী" },
            { id: "sadullapur", name: "সাদুল্লাপুর" },
            { id: "saghata", name: "সাঘাটা" },
            { id: "sundarganj", name: "সুন্দরগঞ্জ" }
          ]
        },
        {
          id: "lalmonirhat",
          name: "লালমনিরহাট",
          thanas: [
            { id: "lalmonirhat_sadar", name: "লালমনিরহাট সদর" },
            { id: "aditmari", name: "আদিতমারী" },
            { id: "hatibandha", name: "হাতীবান্ধা" },
            { id: "kaliganj", name: "কালীগঞ্জ" },
            { id: "patgram", name: "পাটগ্রাম" }
          ]
        },
        {
          id: "nilphamari",
          name: "নীলফামারী",
          thanas: [
            { id: "nilphamari_sadar", name: "নীলফামারী সদর" },
            { id: "dimla", name: "ডিমলা" },
            { id: "domar", name: "ডোমার" },
            { id: "jaldhaka", name: "জলঢাকা" },
            { id: "kishoreganj", name: "কিশোরগঞ্জ" },
            { id: "saidpur", name: "সৈয়দপুর" }
          ]
        },
        {
          id: "thakurgaon",
          name: "ঠাকুরগাঁও",
          thanas: [
            { id: "thakurgaon_sadar", name: "ঠাকুরগাঁও সদর" },
            { id: "baliadangi", name: "বালিয়াডাঙ্গী" },
            { id: "haripur", name: "হরিপুর" },
            { id: "pirganj", name: "পীরগঞ্জ" },
            { id: "ranisankail", name: "রাণীশংকৈল" }
          ]
        }
      ]
    },
    {
      id: "chittagong",
      name: "চট্টগ্রাম",
      districts: [
        {
          id: "chittagong",
          name: "চট্টগ্রাম",
          thanas: [
            { id: "chittagong_city", name: "চট্টগ্রাম সিটি" },
            { id: "anwara", name: "আনোয়ারা" },
            { id: "banshkhali", name: "বাঁশখালী" },
            { id: "boalkhali", name: "বোয়ালখালী" },
            { id: "chandanaish", name: "চন্দনাইশ" },
            { id: "fatikchhari", name: "ফটিকছড়ি" },
            { id: "hathazari", name: "হাটহাজারী" },
            { id: "lohagara", name: "লোহাগাড়া" },
            { id: "mirsharai", name: "মীরসরাই" },
            { id: "patiya", name: "পটিয়া" },
            { id: "rangunia", name: "রাঙ্গুনিয়া" },
            { id: "raozan", name: "রাউজান" },
            { id: "sandwip", name: "সন্দ্বীপ" },
            { id: "satkania", name: "সাতকানিয়া" },
            { id: "sitakunda", name: "সীতাকুন্ড" }
          ]
        },
        {
          id: "coxs_bazar",
          name: "কক্সবাজার",
          thanas: [
            { id: "coxs_bazar_sadar", name: "কক্সবাজার সদর" },
            { id: "chakaria", name: "চকরিয়া" },
            { id: "kutubdia", name: "কুতুবদিয়া" },
            { id: "maheshkhali", name: "মহেশখালী" },
            { id: "pekua", name: "পেকুয়া" },
            { id: "ramu", name: "রামু" },
            { id: "teknaf", name: "টেকনাফ" },
            { id: "ukhia", name: "উখিয়া" }
          ]
        },
        {
          id: "bandarban",
          name: "বান্দরবান",
          thanas: [
            { id: "bandarban_sadar", name: "বান্দরবান সদর" },
            { id: "alikadam", name: "আলীকদম" },
            { id: "lama", name: "লামা" },
            { id: "naikhongchhari", name: "নাইক্ষ্যংছড়ি" },
            { id: "rowangchhari", name: "রোয়াংছড়ি" },
            { id: "ruma", name: "রুমা" },
            { id: "thanchi", name: "থানচি" }
          ]
        },
        {
          id: "rangamati",
          name: "রাঙ্গামাটি",
          thanas: [
            { id: "rangamati_sadar", name: "রাঙ্গামাটি সদর" },
            { id: "baghaichhari", name: "বাঘাইছড়ি" },
            { id: "barkal", name: "বরকল" },
            { id: "juraichhari", name: "জুরাছড়ি" },
            { id: "kaptai", name: "কাপ্তাই" },
            { id: "kawkhali", name: "কাউখালী" },
            { id: "langadu", name: "লংগদু" },
            { id: "naniarchar", name: "নানিয়ারচর" }
          ]
        },
        {
          id: "khagrachhari",
          name: "খাগড়াছড়ি",
          thanas: [
            { id: "khagrachhari_sadar", name: "খাগড়াছড়ি সদর" },
            { id: "dighinala", name: "দিঘীনালা" },
            { id: "lakshmichhari", name: "লক্ষ্মীছড়ি" },
            { id: "mahalchhari", name: "মহালছড়ি" },
            { id: "manikchhari", name: "মানিকছড়ি" },
            { id: "matiranga", name: "মাটিরাঙ্গা" },
            { id: "panchhari", name: "পানছড়ি" },
            { id: "ramgarh", name: "রামগড়" }
          ]
        }
      ]
    },
    {
      id: "khulna",
      name: "খুলনা",
      districts: [
        {
          id: "khulna",
          name: "খুলনা",
          thanas: [
            { id: "khulna_sadar", name: "খুলনা সদর" },
            { id: "batiaghata", name: "বটিয়াঘাটা" },
            { id: "dacope", name: "দাকোপ" },
            { id: "dumuria", name: "ডুমুরিয়া" },
            { id: "dighalia", name: "দিঘলিয়া" },
            { id: "koyra", name: "কয়রা" },
            { id: "paikgachha", name: "পাইকগাছা" },
            { id: "phultala", name: "ফুলতলা" },
            { id: "rupsha", name: "রূপসা" },
            { id: "terokhada", name: "তেরখাদা" }
          ]
        },
        {
          id: "bagerhat",
          name: "বাগেরহাট",
          thanas: [
            { id: "bagerhat_sadar", name: "বাগেরহাট সদর" },
            { id: "chitalmari", name: "চিতলমারী" },
            { id: "fakirhat", name: "ফকিরহাট" },
            { id: "kachua", name: "কচুয়া" },
            { id: "mollahat", name: "মোল্লাহাট" },
            { id: "mongla", name: "মোংলা" },
            { id: "morrelganj", name: "মোড়েলগঞ্জ" },
            { id: "rampal", name: "রামপাল" },
            { id: "sarankhola", name: "শরণখোলা" }
          ]
        },
        {
          id: "satkhira",
          name: "সাতক্ষীরা",
          thanas: [
            { id: "satkhira_sadar", name: "সাতক্ষীরা সদর" },
            { id: "assasuni", name: "আশাশুনি" },
            { id: "debhata", name: "দেবহাটা" },
            { id: "kalaroa", name: "কলারোয়া" },
            { id: "kaliganj", name: "কালীগঞ্জ" },
            { id: "shyamnagar", name: "শ্যামনগর" },
            { id: "tala", name: "তালা" }
          ]
        },
        {
          id: "jessore",
          name: "যশোর",
          thanas: [
            { id: "jessore_sadar", name: "যশোর সদর" },
            { id: "abhaynagar", name: "অভয়নগর" },
            { id: "bagherpara", name: "বাঘারপাড়া" },
            { id: "chaugachha", name: "চৌগাছা" },
            { id: "jhikargachha", name: "ঝিকরগাছা" },
            { id: "keshabpur", name: "কেশবপুর" },
            { id: "manirampur", name: "মণিরামপুর" },
            { id: "sharsha", name: "শার্শা" }
          ]
        }
      ]
    },
    {
      id: "rajshahi",
      name: "রাজশাহী",
      districts: [
        {
          id: "rajshahi",
          name: "রাজশাহী",
          thanas: [
            { id: "rajshahi_city", name: "রাজশাহী সিটি" },
            { id: "bagha", name: "বাঘা" },
            { id: "bagmara", name: "বাগমারা" },
            { id: "charghat", name: "চারঘাট" },
            { id: "durgapur", name: "দুর্গাপুর" },
            { id: "godagari", name: "গোদাগাড়ী" },
            { id: "mohanpur", name: "মোহনপুর" },
            { id: "paba", name: "পবা" },
            { id: "puthia", name: "পুঠিয়া" },
            { id: "tanore", name: "তানোর" }
          ]
        },
        {
          id: "bogra",
          name: "বগুড়া",
          thanas: [
            { id: "bogra_sadar", name: "বগুড়া সদর" },
            { id: "adamdighi", name: "আদমদিঘী" },
            { id: "dhunat", name: "ধুনট" },
            { id: "dhupchanchia", name: "ধুপচাঁচিয়া" },
            { id: "gabtali", name: "গাবতলী" },
            { id: "kahaloo", name: "কাহালু" },
            { id: "nandigram", name: "নন্দীগ্রাম" },
            { id: "shajahanpur", name: "শাজাহানপুর" },
            { id: "sherpur", name: "শেরপুর" },
            { id: "shibganj", name: "শিবগঞ্জ" },
            { id: "sonatala", name: "সোনাতলা" }
          ]
        },
        {
          id: "pabna",
          name: "পাবনা",
          thanas: [
            { id: "pabna_sadar", name: "পাবনা সদর" },
            { id: "atgharia", name: "আটঘরিয়া" },
            { id: "bera", name: "বেড়া" },
            { id: "bhangura", name: "ভাঙ্গুড়া" },
            { id: "chatmohar", name: "চাটমোহর" },
            { id: "faridpur", name: "ফরিদপুর" },
            { id: "ishwardi", name: "ঈশ্বরদী" },
            { id: "santhia", name: "সাঁথিয়া" },
            { id: "sujanagar", name: "সুজানগর" }
          ]
        },
        {
          id: "sirajganj",
          name: "সিরাজগঞ্জ",
          thanas: [
            { id: "sirajganj_sadar", name: "সিরাজগঞ্জ সদর" },
            { id: "belkuchi", name: "বেলকুচি" },
            { id: "chauhali", name: "চৌহালি" },
            { id: "kamarkhanda", name: "কামারখন্দ" },
            { id: "kazipur", name: "কাজীপুর" },
            { id: "raiganj", name: "রায়গঞ্জ" },
            { id: "shahjadpur", name: "শাহজাদপুর" },
            { id: "tarash", name: "তাড়াশ" },
            { id: "ullapara", name: "উল্লাপাড়া" }
          ]
        }
      ]
    },
    {
      id: "barisal",
      name: "বরিশাল",
      districts: [
        {
          id: "barisal",
          name: "বরিশাল",
          thanas: [
            { id: "barisal_sadar", name: "বরিশাল সদর" },
            { id: "agailjhara", name: "আগৈলঝাড়া" },
            { id: "babuganj", name: "বাবুগঞ্জ" },
            { id: "bakerganj", name: "বাকেরগঞ্জ" },
            { id: "banaripara", name: "বানারীপাড়া" },
            { id: "gaurnadi", name: "গৌরনদী" },
            { id: "hizla", name: "হিজলা" },
            { id: "mehendiganj", name: "মেহেন্দিগঞ্জ" },
            { id: "muladi", name: "মুলাদী" },
            { id: "wazirpur", name: "উজিরপুর" }
          ]
        },
        {
          id: "bhola",
          name: "ভোলা",
          thanas: [
            { id: "bhola_sadar", name: "ভোলা সদর" },
            { id: "borhanuddin", name: "বোরহানউদ্দিন" },
            { id: "charfasson", name: "চরফ্যাশন" },
            { id: "daulatkhan", name: "দৌলতখান" },
            { id: "lalmohan", name: "লালমোহন" },
            { id: "manpura", name: "মনপুরা" },
            { id: "tazumuddin", name: "তজুমুদ্দিন" }
          ]
        },
        {
          id: "patuakhali",
          name: "পটুয়াখালী",
          thanas: [
            { id: "patuakhali_sadar", name: "পটুয়াখালী সদর" },
            { id: "bauphal", name: "বাউফল" },
            { id: "dashmina", name: "দশমিনা" },
            { id: "dumki", name: "দুমকি" },
            { id: "galachipa", name: "গলাচিপা" },
            { id: "kalapara", name: "কলাপাড়া" },
            { id: "mirzaganj", name: "মির্জাগঞ্জ" },
            { id: "rangabali", name: "রাঙ্গাবালী" }
          ]
        }
      ]
    },
    {
      id: "sylhet",
      name: "সিলেট",
      districts: [
        {
          id: "sylhet",
          name: "সিলেট",
          thanas: [
            { id: "sylhet_sadar", name: "সিলেট সদর" },
            { id: "balaganj", name: "বালাগঞ্জ" },
            { id: "beanibazar", name: "বিয়ানীবাজার" },
            { id: "bishwanath", name: "বিশ্বনাথ" },
            { id: "companiganj", name: "কোম্পানীগঞ্জ" },
            { id: "fenchuganj", name: "ফেঞ্চুগঞ্জ" },
            { id: "golapganj", name: "গোলাপগঞ্জ" },
            { id: "gowainghat", name: "গোয়াইনঘাট" },
            { id: "jaintiapur", name: "জৈন্তাপুর" },
            { id: "kanaighat", name: "কানাইঘাট" },
            { id: "zakiganj", name: "জকিগঞ্জ" },
            { id: "south_surma", name: "দক্ষিণ সুরমা" }
          ]
        },
        {
          id: "moulvibazar",
          name: "মৌলভীবাজার",
          thanas: [
            { id: "moulvibazar_sadar", name: "মৌলভীবাজার সদর" },
            { id: "barlekha", name: "বড়লেখা" },
            { id: "juri", name: "জুড়ি" },
            { id: "kamalganj", name: "কমলগঞ্জ" },
            { id: "kulaura", name: "কুলাউড়া" },
            { id: "rajnagar", name: "রাজনগর" },
            { id: "sreemangal", name: "শ্রীমঙ্গল" }
          ]
        },
        {
          id: "habiganj",
          name: "হবিগঞ্জ",
          thanas: [
            { id: "habiganj_sadar", name: "হবিগঞ্জ সদর" },
            { id: "ajmiriganj", name: "আজমিরীগঞ্জ" },
            { id: "bahubal", name: "বাহুবল" },
            { id: "baniyachong", name: "বানিয়াচং" },
            { id: "chunarughat", name: "চুনারুঘাট" },
            { id: "lakhai", name: "লাখাই" },
            { id: "madhabpur", name: "মাধবপুর" },
            { id: "nabiganj", name: "নবীগঞ্জ" },
            { id: "shaistagonj", name: "শায়েস্তাগঞ্জ" }
          ]
        },
        {
          id: "sunamganj",
          name: "সুনামগঞ্জ",
          thanas: [
            { id: "sunamganj_sadar", name: "সুনামগঞ্জ সদর" },
            { id: "bishwamvarpur", name: "বিশ্বম্ভরপুর" },
            { id: "chhatak", name: "ছাতক" },
            { id: "derai", name: "দিরাই" },
            { id: "dharampasha", name: "ধরমপাশা" },
            { id: "dowarabazar", name: "দোয়ারাবাজার" },
            { id: "jagannathpur", name: "জগন্নাথপুর" },
            { id: "jamalganj", name: "জামালগঞ্জ" },
            { id: "sullah", name: "শাল্লা" },
            { id: "tahirpur", name: "তাহিরপুর" }
          ]
        }
      ]
    },
    {
      id: "mymensingh",
      name: "ময়মনসিংহ",
      districts: [
        {
          id: "mymensingh",
          name: "ময়মনসিংহ",
          thanas: [
            { id: "mymensingh_sadar", name: "ময়মনসিংহ সদর" },
            { id: "bhaluka", name: "ভালুকা" },
            { id: "dhobaura", name: "ধোবাউড়া" },
            { id: "fulbaria", name: "ফুলবাড়ীয়া" },
            { id: "gafargaon", name: "গফরগাঁও" },
            { id: "gauripur", name: "গৌরীপুর" },
            { id: "haluaghat", name: "হালুয়াঘাট" },
            { id: "ishwarganj", name: "ঈশ্বরগঞ্জ" },
            { id: "muktagachha", name: "মুক্তাগাছা" },
            { id: "nandail", name: "নান্দাইল" },
            { id: "phulpur", name: "ফুলপুর" },
            { id: "trishal", name: "ত্রিশাল" }
          ]
        },
        {
          id: "netrokona",
          name: "নেত্রকোণা",
          thanas: [
            { id: "netrokona_sadar", name: "নেত্রকোণা সদর" },
            { id: "atpara", name: "আটপাড়া" },
            { id: "barhatta", name: "বারহাট্টা" },
            { id: "durgapur", name: "দুর্গাপুর" },
            { id: "kalmakanda", name: "কলমাকান্দা" },
            { id: "kendua", name: "কেন্দুয়া" },
            { id: "khaliajuri", name: "খালিয়াজুরী" },
            { id: "madan", name: "মদন" },
            { id: "mohanganj", name: "মোহনগঞ্জ" },
            { id: "purbadhala", name: "পূর্বধলা" }
          ]
        },
        {
          id: "jamalpur",
          name: "জামালপুর",
          thanas: [
            { id: "jamalpur_sadar", name: "জামালপুর সদর" },
            { id: "bakshiganj", name: "বকশীগঞ্জ" },
            { id: "dewanganj", name: "দেওয়ানগঞ্জ" },
            { id: "islampur", name: "ইসলামপুর" },
            { id: "madarganj", name: "মাদারগঞ্জ" },
            { id: "melandaha", name: "মেলান্দহ" },
            { id: "sarishabari", name: "সরিষাবাড়ী" }
          ]
        },
        {
          id: "sherpur",
          name: "শেরপুর",
          thanas: [
            { id: "sherpur_sadar", name: "শেরপুর সদর" },
            { id: "jhenaigati", name: "ঝিনাইগাতী" },
            { id: "nakla", name: "নকলা" },
            { id: "nalitabari", name: "নালিতাবাড়ী" },
            { id: "sreebardi", name: "শ্রীবরদী" }
          ]
        }
      ]
    }
  ]
}; 
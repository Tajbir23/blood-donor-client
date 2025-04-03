// Bangladesh Geographic Data
// Contains divisions, districts, and thanas of Bangladesh with latitude and longitude

interface Thana {
  id: string;
  name: string;
  latitude: string;
  longitude: string;
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
            { id: "adabor", name: "আদাবর", latitude: "23.7746", longitude: "90.3493" },
            { id: "badda", name: "বাড্ডা", latitude: "23.7860", longitude: "90.4252" },
            { id: "banani", name: "বনানী", latitude: "23.7937", longitude: "90.4066" },
            { id: "dhanmondi", name: "ধানমন্ডি", latitude: "23.7479", longitude: "90.3742" },
            { id: "gulshan", name: "গুলশান", latitude: "23.7925", longitude: "90.4158" },
            { id: "mirpur", name: "মিরপুর", latitude: "23.8041", longitude: "90.3630" },
            { id: "mohammadpur", name: "মোহাম্মদপুর", latitude: "23.7650", longitude: "90.3586" },
            { id: "motijheel", name: "মতিঝিল", latitude: "23.7328", longitude: "90.4175" },
            { id: "paltan", name: "পল্টন", latitude: "23.7350", longitude: "90.4143" },
            { id: "ramna", name: "রমনা", latitude: "23.7415", longitude: "90.3960" },
            { id: "tejgaon", name: "তেজগাঁও", latitude: "23.7639", longitude: "90.3910" },
            { id: "uttara", name: "উত্তরা", latitude: "23.8760", longitude: "90.3900" }
          ]
        },
        {
          id: "gazipur",
          name: "গাজীপুর",
          thanas: [
            { id: "gazipur_sadar", name: "গাজীপুর সদর", latitude: "24.0000", longitude: "90.4200" },
            { id: "kaliakair", name: "কালিয়াকৈর", latitude: "24.0667", longitude: "90.2167" },
            { id: "kaliganj", name: "কালীগঞ্জ", latitude: "23.9167", longitude: "90.5667" },
            { id: "kapasia", name: "কাপাসিয়া", latitude: "24.1167", longitude: "90.5667" },
            { id: "sreepur", name: "শ্রীপুর", latitude: "24.2000", longitude: "90.4667" }
          ]
        },
        {
          id: "narayanganj",
          name: "নারায়ণগঞ্জ",
          thanas: [
            { id: "narayanganj_sadar", name: "নারায়ণগঞ্জ সদর", latitude: "23.6238", longitude: "90.5010" },
            { id: "araihazar", name: "আড়াইহাজার", latitude: "23.7917", longitude: "90.6533" },
            { id: "bandar", name: "বন্দর", latitude: "23.5940", longitude: "90.5210" },
            { id: "rupganj", name: "রূপগঞ্জ", latitude: "23.7930", longitude: "90.5630" },
            { id: "sonargaon", name: "সোনারগাঁও", latitude: "23.6500", longitude: "90.6167" }
          ]
        },
        {
          id: "narsingdi",
          name: "নরসিংদী",
          thanas: [
            { id: "narsingdi_sadar", name: "নরসিংদী সদর", latitude: "23.9200", longitude: "90.7167" },
            { id: "belabo", name: "বেলাবো", latitude: "24.0833", longitude: "90.8333" },
            { id: "monohardi", name: "মনোহরদী", latitude: "24.1333", longitude: "90.7000" },
            { id: "palash", name: "পলাশ", latitude: "23.9500", longitude: "90.6167" },
            { id: "raipura", name: "রায়পুরা", latitude: "24.0167", longitude: "90.7667" },
            { id: "shibpur", name: "শিবপুর", latitude: "24.0333", longitude: "90.7333" }
          ]
        },
        {
          id: "tangail",
          name: "টাঙ্গাইল",
          thanas: [
            { id: "tangail_sadar", name: "টাঙ্গাইল সদর", latitude: "24.2500", longitude: "89.9167" },
            { id: "basail", name: "বাসাইল", latitude: "24.2167", longitude: "90.0500" },
            { id: "bhuapur", name: "ভুয়াপুর", latitude: "24.4667", longitude: "89.8667" },
            { id: "delduar", name: "দেলদুয়ার", latitude: "24.1833", longitude: "89.9667" },
            { id: "ghatail", name: "ঘাটাইল", latitude: "24.4833", longitude: "90.0167" },
            { id: "gopalpur", name: "গোপালপুর", latitude: "24.5667", longitude: "89.9167" },
            { id: "kalihati", name: "কালিহাতি", latitude: "24.3833", longitude: "90.0000" },
            { id: "madhupur", name: "মধুপুর", latitude: "24.6167", longitude: "90.0333" },
            { id: "mirzapur", name: "মির্জাপুর", latitude: "24.1167", longitude: "90.1000" },
            { id: "nagarpur", name: "নাগরপুর", latitude: "24.0500", longitude: "89.8667" },
            { id: "shakhipur", name: "সখিপুর", latitude: "24.3167", longitude: "90.1667" }
          ]
        },
        {
          id: "munshiganj",
          name: "মুন্সিগঞ্জ",
          thanas: [
            { id: "munshiganj_sadar", name: "মুন্সিগঞ্জ সদর", latitude: "23.5500", longitude: "90.5333" },
            { id: "gazaria", name: "গজারিয়া", latitude: "23.5333", longitude: "90.6333" },
            { id: "louhajang", name: "লৌহজং", latitude: "23.4667", longitude: "90.3500" },
            { id: "sirajdikhan", name: "সিরাজদিখান", latitude: "23.5667", longitude: "90.3833" },
            { id: "sreenagar", name: "শ্রীনগর", latitude: "23.5333", longitude: "90.3000" },
            { id: "tongibari", name: "টঙ্গিবাড়ি", latitude: "23.5000", longitude: "90.4667" }
          ]
        },
        {
          id: "kishoreganj",
          name: "কিশোরগঞ্জ",
          thanas: [
            { id: "kishoreganj_sadar", name: "কিশোরগঞ্জ সদর", latitude: "24.4333", longitude: "90.7833" },
            { id: "austagram", name: "অষ্টগ্রাম", latitude: "24.2833", longitude: "91.1167" },
            { id: "bajitpur", name: "বাজিতপুর", latitude: "24.2167", longitude: "90.9500" },
            { id: "bhairab", name: "ভৈরব", latitude: "24.0500", longitude: "90.9833" },
            { id: "hossainpur", name: "হোসেনপুর", latitude: "24.4167", longitude: "90.6500" },
            { id: "karimganj", name: "করিমগঞ্জ", latitude: "24.4667", longitude: "90.8833" }
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
            { id: "rangpur_sadar", name: "রংপুর সদর", latitude: "25.7439", longitude: "89.2752" },
            { id: "badarganj", name: "বদরগঞ্জ", latitude: "25.6742", longitude: "89.0538" },
            { id: "gangachara", name: "গঙ্গাচড়া", latitude: "25.8500", longitude: "89.2167" },
            { id: "kaunia", name: "কাউনিয়া", latitude: "25.7667", longitude: "89.4167" },
            { id: "mithapukur", name: "মিঠাপুকুর", latitude: "25.5667", longitude: "89.2833" },
            { id: "pirgacha", name: "পীরগাছা", latitude: "25.6667", longitude: "89.3833" },
            { id: "pirganj", name: "পীরগঞ্জ", latitude: "25.4167", longitude: "89.3167" },
            { id: "taraganj", name: "তারাগঞ্জ", latitude: "25.8167", longitude: "89.0167" }
          ]
        },
        {
          id: "dinajpur",
          name: "দিনাজপুর",
          thanas: [
            { id: "dinajpur_sadar", name: "দিনাজপুর সদর", latitude: "25.6279", longitude: "88.6378" },
            { id: "birampur", name: "বিরামপুর", latitude: "25.3833", longitude: "88.9833" },
            { id: "birganj", name: "বীরগঞ্জ", latitude: "25.8833", longitude: "88.6500" },
            { id: "bochaganj", name: "বোচাগঞ্জ", latitude: "25.8000", longitude: "88.4667" },
            { id: "chirirbandar", name: "চিরিরবন্দর", latitude: "25.6667", longitude: "88.7167" },
            { id: "fulbari", name: "ফুলবাড়ী", latitude: "25.5000", longitude: "88.9167" },
            { id: "ghoraghat", name: "ঘোড়াঘাট", latitude: "25.2500", longitude: "89.2167" },
            { id: "hakimpur", name: "হাকিমপুর", latitude: "25.2833", longitude: "89.0167" },
            { id: "kaharole", name: "কাহারোল", latitude: "25.8000", longitude: "88.6000" },
            { id: "khansama", name: "খানসামা", latitude: "25.9333", longitude: "88.7333" },
            { id: "nawabganj", name: "নবাবগঞ্জ", latitude: "25.4167", longitude: "88.6167" },
            { id: "parbatipur", name: "পার্বতীপুর", latitude: "25.6633", longitude: "88.9167" }
          ]
        },
        {
          id: "kurigram",
          name: "কুড়িগ্রাম",
          thanas: [
            { id: "kurigram_sadar", name: "কুড়িগ্রাম সদর", latitude: "25.8167", longitude: "89.6500" },
            { id: "bhurungamari", name: "ভুরুঙ্গামারী", latitude: "26.0333", longitude: "89.6667" },
            { id: "char_rajibpur", name: "চর রাজিবপুর", latitude: "25.7000", longitude: "89.7000" },
            { id: "chilmari", name: "চিলমারী", latitude: "25.5667", longitude: "89.6667" },
            { id: "phulbari", name: "ফুলবাড়ী", latitude: "25.9500", longitude: "89.5667" },
            { id: "nageshwari", name: "নাগেশ্বরী", latitude: "25.9667", longitude: "89.7167" },
            { id: "rajarhat", name: "রাজারহাট", latitude: "25.8000", longitude: "89.5667" },
            { id: "rowmari", name: "রৌমারী", latitude: "25.5667", longitude: "89.8500" },
            { id: "ulipur", name: "উলিপুর", latitude: "25.6667", longitude: "89.6333" }
          ]
        },
        // Placeholder coordinates for remaining districts
        {
          id: "gaibandha",
          name: "গাইবান্ধা",
          thanas: [
            { id: "gaibandha_sadar", name: "গাইবান্ধা সদর", latitude: "0", longitude: "0" },
            { id: "fulchhari", name: "ফুলছড়ি", latitude: "0", longitude: "0" },
            { id: "gobindaganj", name: "গোবিন্দগঞ্জ", latitude: "0", longitude: "0" },
            { id: "palashbari", name: "পলাশবাড়ী", latitude: "0", longitude: "0" },
            { id: "sadullapur", name: "সাদুল্লাপুর", latitude: "0", longitude: "0" },
            { id: "saghata", name: "সাঘাটা", latitude: "0", longitude: "0" },
            { id: "sundarganj", name: "সুন্দরগঞ্জ", latitude: "0", longitude: "0" }
          ]
        },
        {
          id: "lalmonirhat",
          name: "লালমনিরহাট",
          thanas: [
            { id: "lalmonirhat_sadar", name: "লালমনিরহাট সদর", latitude: "0", longitude: "0" },
            { id: "aditmari", name: "আদিতমারী", latitude: "0", longitude: "0" },
            { id: "hatibandha", name: "হাতীবান্ধা", latitude: "0", longitude: "0" },
            { id: "kaliganj", name: "কালীগঞ্জ", latitude: "0", longitude: "0" },
            { id: "patgram", name: "পাটগ্রাম", latitude: "0", longitude: "0" }
          ]
        },
        {
          id: "nilphamari",
          name: "নীলফামারী",
          thanas: [
            { id: "nilphamari_sadar", name: "নীলফামারী সদর", latitude: "0", longitude: "0" },
            { id: "dimla", name: "ডিমলা", latitude: "0", longitude: "0" },
            { id: "domar", name: "ডোমার", latitude: "0", longitude: "0" },
            { id: "jaldhaka", name: "জলঢাকা", latitude: "0", longitude: "0" },
            { id: "kishoreganj", name: "কিশোরগঞ্জ", latitude: "0", longitude: "0" },
            { id: "saidpur", name: "সৈয়দপুর", latitude: "0", longitude: "0" }
          ]
        },
        {
          id: "thakurgaon",
          name: "ঠাকুরগাঁও",
          thanas: [
            { id: "thakurgaon_sadar", name: "ঠাকুরগাঁও সদর", latitude: "0", longitude: "0" },
            { id: "baliadangi", name: "বালিয়াডাঙ্গী", latitude: "0", longitude: "0" },
            { id: "haripur", name: "হরিপুর", latitude: "0", longitude: "0" },
            { id: "pirganj", name: "পীরগঞ্জ", latitude: "0", longitude: "0" },
            { id: "ranisankail", name: "রাণীশংকৈল", latitude: "0", longitude: "0" }
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
            { id: "chittagong_city", name: "চট্টগ্রাম সিটি", latitude: "22.3475", longitude: "91.8123" },
            { id: "anwara", name: "আনোয়ারা", latitude: "22.2000", longitude: "91.9167" },
            { id: "banshkhali", name: "বাঁশখালী", latitude: "22.0333", longitude: "91.9500" },
            { id: "boalkhali", name: "বোয়ালখালী", latitude: "22.3833", longitude: "91.9167" },
            { id: "chandanaish", name: "চন্দনাইশ", latitude: "22.2167", longitude: "92.0167" },
            { id: "fatikchhari", name: "ফটিকছড়ি", latitude: "22.6833", longitude: "91.7833" },
            { id: "hathazari", name: "হাটহাজারী", latitude: "22.5000", longitude: "91.8000" },
            { id: "lohagara", name: "লোহাগাড়া", latitude: "22.0167", longitude: "92.1000" },
            { id: "mirsharai", name: "মীরসরাই", latitude: "22.7667", longitude: "91.5833" },
            { id: "patiya", name: "পটিয়া", latitude: "22.3000", longitude: "91.9833" },
            { id: "rangunia", name: "রাঙ্গুনিয়া", latitude: "22.4667", longitude: "92.0833" },
            { id: "raozan", name: "রাউজান", latitude: "22.5333", longitude: "91.9333" },
            { id: "sandwip", name: "সন্দ্বীপ", latitude: "22.4833", longitude: "91.4333" },
            { id: "satkania", name: "সাতকানিয়া", latitude: "22.0833", longitude: "92.0833" },
            { id: "sitakunda", name: "সীতাকুন্ড", latitude: "22.6167", longitude: "91.6667" }
          ]
        },
        // Placeholder coordinates for remaining districts
        {
          id: "coxs_bazar",
          name: "কক্সবাজার",
          thanas: [
            { id: "coxs_bazar_sadar", name: "কক্সবাজার সদর", latitude: "21.4395", longitude: "91.9757" },
            { id: "chakaria", name: "চকরিয়া", latitude: "0", longitude: "0" },
            { id: "kutubdia", name: "কুতুবদিয়া", latitude: "0", longitude: "0" },
            { id: "maheshkhali", name: "মহেশখালী", latitude: "0", longitude: "0" },
            { id: "pekua", name: "পেকুয়া", latitude: "0", longitude: "0" },
            { id: "ramu", name: "রামু", latitude: "0", longitude: "0" },
            { id: "teknaf", name: "টেকনাফ", latitude: "0", longitude: "0" },
            { id: "ukhia", name: "উখিয়া", latitude: "0", longitude: "0" }
          ]
        },
        {
          id: "bandarban",
          name: "বান্দরবান",
          thanas: [
            { id: "bandarban_sadar", name: "বান্দরবান সদর", latitude: "0", longitude: "0" },
            { id: "alikadam", name: "আলীকদম", latitude: "0", longitude: "0" },
            { id: "lama", name: "লামা", latitude: "0", longitude: "0" },
            { id: "naikhongchhari", name: "নাইক্ষ্যংছড়ি", latitude: "0", longitude: "0" },
            { id: "rowangchhari", name: "রোয়াংছড়ি", latitude: "0", longitude: "0" },
            { id: "ruma", name: "রুমা", latitude: "0", longitude: "0" },
            { id: "thanchi", name: "থানচি", latitude: "0", longitude: "0" }
          ]
        },
        {
          id: "rangamati",
          name: "রাঙ্গামাটি",
          thanas: [
            { id: "rangamati_sadar", name: "রাঙ্গামাটি সদর", latitude: "0", longitude: "0" },
            { id: "baghaichhari", name: "বাঘাইছড়ি", latitude: "0", longitude: "0" },
            { id: "barkal", name: "বরকল", latitude: "0", longitude: "0" },
            { id: "juraichhari", name: "জুরাছড়ি", latitude: "0", longitude: "0" },
            { id: "kaptai", name: "কাপ্তাই", latitude: "0", longitude: "0" },
            { id: "kawkhali", name: "কাউখালী", latitude: "0", longitude: "0" },
            { id: "langadu", name: "লংগদু", latitude: "0", longitude: "0" },
            { id: "naniarchar", name: "নানিয়ারচর", latitude: "0", longitude: "0" }
          ]
        },
        {
          id: "khagrachhari",
          name: "খাগড়াছড়ি",
          thanas: [
            { id: "khagrachhari_sadar", name: "খাগড়াছড়ি সদর", latitude: "0", longitude: "0" },
            { id: "dighinala", name: "দিঘীনালা", latitude: "0", longitude: "0" },
            { id: "lakshmichhari", name: "লক্ষ্মীছড়ি", latitude: "0", longitude: "0" },
            { id: "mahalchhari", name: "মহালছড়ি", latitude: "0", longitude: "0" },
            { id: "manikchhari", name: "মানিকছড়ি", latitude: "0", longitude: "0" },
            { id: "matiranga", name: "মাটিরাঙ্গা", latitude: "0", longitude: "0" },
            { id: "panchhari", name: "পানছড়ি", latitude: "0", longitude: "0" },
            { id: "ramgarh", name: "রামগড়", latitude: "0", longitude: "0" }
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
            { id: "khulna_sadar", name: "খুলনা সদর", latitude: "22.8150", longitude: "89.5680" },
            { id: "batiaghata", name: "বটিয়াঘাটা", latitude: "22.7167", longitude: "89.5167" },
            { id: "dacope", name: "দাকোপ", latitude: "22.5833", longitude: "89.5167" },
            { id: "dumuria", name: "ডুমুরিয়া", latitude: "22.8167", longitude: "89.4167" },
            { id: "dighalia", name: "দিঘলিয়া", latitude: "22.9000", longitude: "89.5333" },
            { id: "koyra", name: "কয়রা", latitude: "22.3500", longitude: "89.3000" },
            { id: "paikgachha", name: "পাইকগাছা", latitude: "22.5833", longitude: "89.3333" },
            { id: "phultala", name: "ফুলতলা", latitude: "22.9833", longitude: "89.4667" },
            { id: "rupsha", name: "রূপসা", latitude: "22.8333", longitude: "89.6333" },
            { id: "terokhada", name: "তেরখাদা", latitude: "22.9333", longitude: "89.6667" }
          ]
        },
        // Placeholder coordinates for remaining districts
        {
          id: "bagerhat",
          name: "বাগেরহাট",
          thanas: [
            { id: "bagerhat_sadar", name: "বাগেরহাট সদর", latitude: "0", longitude: "0" },
            { id: "chitalmari", name: "চিতলমারী", latitude: "0", longitude: "0" },
            { id: "fakirhat", name: "ফকিরহাট", latitude: "0", longitude: "0" },
            { id: "kachua", name: "কচুয়া", latitude: "0", longitude: "0" },
            { id: "mollahat", name: "মোল্লাহাট", latitude: "0", longitude: "0" },
            { id: "mongla", name: "মোংলা", latitude: "0", longitude: "0" },
            { id: "morrelganj", name: "মোড়েলগঞ্জ", latitude: "0", longitude: "0" },
            { id: "rampal", name: "রামপাল", latitude: "0", longitude: "0" },
            { id: "sarankhola", name: "শরণখোলা", latitude: "0", longitude: "0" }
          ]
        },
        {
          id: "satkhira",
          name: "সাতক্ষীরা",
          thanas: [
            { id: "satkhira_sadar", name: "সাতক্ষীরা সদর", latitude: "0", longitude: "0" },
            { id: "assasuni", name: "আশাশুনি", latitude: "0", longitude: "0" },
            { id: "debhata", name: "দেবহাটা", latitude: "0", longitude: "0" },
            { id: "kalaroa", name: "কলারোয়া", latitude: "0", longitude: "0" },
            { id: "kaliganj", name: "কালীগঞ্জ", latitude: "0", longitude: "0" },
            { id: "shyamnagar", name: "শ্যামনগর", latitude: "0", longitude: "0" },
            { id: "tala", name: "তালা", latitude: "0", longitude: "0" }
          ]
        },
        {
          id: "jessore",
          name: "যশোর",
          thanas: [
            { id: "jessore_sadar", name: "যশোর সদর", latitude: "0", longitude: "0" },
            { id: "abhaynagar", name: "অভয়নগর", latitude: "0", longitude: "0" },
            { id: "bagherpara", name: "বাঘারপাড়া", latitude: "0", longitude: "0" },
            { id: "chaugachha", name: "চৌগাছা", latitude: "0", longitude: "0" },
            { id: "jhikargachha", name: "ঝিকরগাছা", latitude: "0", longitude: "0" },
            { id: "keshabpur", name: "কেশবপুর", latitude: "0", longitude: "0" },
            { id: "manirampur", name: "মণিরামপুর", latitude: "0", longitude: "0" },
            { id: "sharsha", name: "শার্শা", latitude: "0", longitude: "0" }
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
            { id: "rajshahi_city", name: "রাজশাহী সিটি", latitude: "24.3745", longitude: "88.6042" },
            { id: "bagha", name: "বাঘা", latitude: "24.2000", longitude: "88.8333" },
            { id: "bagmara", name: "বাগমারা", latitude: "24.5667", longitude: "88.8167" },
            { id: "charghat", name: "চারঘাট", latitude: "24.2833", longitude: "88.7667" },
            { id: "durgapur", name: "দুর্গাপুর", latitude: "24.4500", longitude: "88.7667" },
            { id: "godagari", name: "গোদাগাড়ী", latitude: "24.4667", longitude: "88.3333" },
            { id: "mohanpur", name: "মোহনপুর", latitude: "24.5667", longitude: "88.6500" },
            { id: "paba", name: "পবা", latitude: "24.4167", longitude: "88.6167" },
            { id: "puthia", name: "পুঠিয়া", latitude: "24.3667", longitude: "88.8500" },
            { id: "tanore", name: "তানোর", latitude: "24.6000", longitude: "88.5833" }
          ]
        },
        // Placeholder coordinates for remaining districts
        {
          id: "bogra",
          name: "বগুড়া",
          thanas: [
            { id: "bogra_sadar", name: "বগুড়া সদর", latitude: "0", longitude: "0" },
            { id: "adamdighi", name: "আদমদিঘী", latitude: "0", longitude: "0" },
            { id: "dhunat", name: "ধুনট", latitude: "0", longitude: "0" },
            { id: "dhupchanchia", name: "ধুপচাঁচিয়া", latitude: "0", longitude: "0" },
            { id: "gabtali", name: "গাবতলী", latitude: "0", longitude: "0" },
            { id: "kahaloo", name: "কাহালু", latitude: "0", longitude: "0" },
            { id: "nandigram", name: "নন্দীগ্রাম", latitude: "0", longitude: "0" },
            { id: "shajahanpur", name: "শাজাহানপুর", latitude: "0", longitude: "0" },
            { id: "sherpur", name: "শেরপুর", latitude: "0", longitude: "0" },
            { id: "shibganj", name: "শিবগঞ্জ", latitude: "0", longitude: "0" },
            { id: "sonatala", name: "সোনাতলা", latitude: "0", longitude: "0" }
          ]
        },
        {
          id: "pabna",
          name: "পাবনা",
          thanas: [
            { id: "pabna_sadar", name: "পাবনা সদর", latitude: "0", longitude: "0" },
            { id: "atgharia", name: "আটঘরিয়া", latitude: "0", longitude: "0" },
            { id: "bera", name: "বেড়া", latitude: "0", longitude: "0" },
            { id: "bhangura", name: "ভাঙ্গুড়া", latitude: "0", longitude: "0" },
            { id: "chatmohar", name: "চাটমোহর", latitude: "0", longitude: "0" },
            { id: "faridpur", name: "ফরিদপুর", latitude: "0", longitude: "0" },
            { id: "ishwardi", name: "ঈশ্বরদী", latitude: "0", longitude: "0" },
            { id: "santhia", name: "সাঁথিয়া", latitude: "0", longitude: "0" },
            { id: "sujanagar", name: "সুজানগর", latitude: "0", longitude: "0" }
          ]
        },
        {
          id: "sirajganj",
          name: "সিরাজগঞ্জ",
          thanas: [
            { id: "sirajganj_sadar", name: "সিরাজগঞ্জ সদর", latitude: "0", longitude: "0" },
            { id: "belkuchi", name: "বেলকুচি", latitude: "0", longitude: "0" },
            { id: "chauhali", name: "চৌহালি", latitude: "0", longitude: "0" },
            { id: "kamarkhanda", name: "কামারখন্দ", latitude: "0", longitude: "0" },
            { id: "kazipur", name: "কাজীপুর", latitude: "0", longitude: "0" },
            { id: "raiganj", name: "রায়গঞ্জ", latitude: "0", longitude: "0" },
            { id: "shahjadpur", name: "শাহজাদপুর", latitude: "0", longitude: "0" },
            { id: "tarash", name: "তাড়াশ", latitude: "0", longitude: "0" },
            { id: "ullapara", name: "উল্লাপাড়া", latitude: "0", longitude: "0" }
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
            { id: "barisal_sadar", name: "বরিশাল সদর", latitude: "22.7010", longitude: "90.3535" },
            { id: "agailjhara", name: "আগৈলঝাড়া", latitude: "22.9667", longitude: "90.1500" },
            { id: "babuganj", name: "বাবুগঞ্জ", latitude: "22.8333", longitude: "90.3333" },
            { id: "bakerganj", name: "বাকেরগঞ্জ", latitude: "22.5500", longitude: "90.3333" },
            { id: "banaripara", name: "বানারীপাড়া", latitude: "22.7833", longitude: "90.1667" },
            { id: "gaurnadi", name: "গৌরনদী", latitude: "22.9667", longitude: "90.2333" },
            { id: "hizla", name: "হিজলা", latitude: "22.9167", longitude: "90.5000" },
            { id: "mehendiganj", name: "মেহেন্দিগঞ্জ", latitude: "22.8167", longitude: "90.5333" },
            { id: "muladi", name: "মুলাদী", latitude: "22.9167", longitude: "90.4167" },
            { id: "wazirpur", name: "উজিরপুর", latitude: "22.8333", longitude: "90.2500" }
          ]
        },
        // Placeholder coordinates for remaining districts
        {
          id: "bhola",
          name: "ভোলা",
          thanas: [
            { id: "bhola_sadar", name: "ভোলা সদর", latitude: "0", longitude: "0" },
            { id: "borhanuddin", name: "বোরহানউদ্দিন", latitude: "0", longitude: "0" },
            { id: "charfasson", name: "চরফ্যাশন", latitude: "0", longitude: "0" },
            { id: "daulatkhan", name: "দৌলতখান", latitude: "0", longitude: "0" },
            { id: "lalmohan", name: "লালমোহন", latitude: "0", longitude: "0" },
            { id: "manpura", name: "মনপুরা", latitude: "0", longitude: "0" },
            { id: "tazumuddin", name: "তজুমুদ্দিন", latitude: "0", longitude: "0" }
          ]
        },
        {
          id: "patuakhali",
          name: "পটুয়াখালী",
          thanas: [
            { id: "patuakhali_sadar", name: "পটুয়াখালী সদর", latitude: "0", longitude: "0" },
            { id: "bauphal", name: "বাউফল", latitude: "0", longitude: "0" },
            { id: "dashmina", name: "দশমিনা", latitude: "0", longitude: "0" },
            { id: "dumki", name: "দুমকি", latitude: "0", longitude: "0" },
            { id: "galachipa", name: "গলাচিপা", latitude: "0", longitude: "0" },
            { id: "kalapara", name: "কলাপাড়া", latitude: "0", longitude: "0" },
            { id: "mirzaganj", name: "মির্জাগঞ্জ", latitude: "0", longitude: "0" },
            { id: "rangabali", name: "রাঙ্গাবালী", latitude: "0", longitude: "0" }
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
            { id: "sylhet_sadar", name: "সিলেট সদর", latitude: "24.8917", longitude: "91.8833" },
            { id: "balaganj", name: "বালাগঞ্জ", latitude: "24.6667", longitude: "91.8333" },
            { id: "beanibazar", name: "বিয়ানীবাজার", latitude: "24.8167", longitude: "92.1500" },
            { id: "bishwanath", name: "বিশ্বনাথ", latitude: "24.7833", longitude: "91.7333" },
            { id: "companiganj", name: "কোম্পানীগঞ্জ", latitude: "25.1167", longitude: "91.6833" },
            { id: "fenchuganj", name: "ফেঞ্চুগঞ্জ", latitude: "24.7000", longitude: "91.9167" },
            { id: "golapganj", name: "গোলাপগঞ্জ", latitude: "24.8667", longitude: "92.0333" },
            { id: "gowainghat", name: "গোয়াইনঘাট", latitude: "25.1000", longitude: "91.7333" },
            { id: "jaintiapur", name: "জৈন্তাপুর", latitude: "25.1333", longitude: "92.1167" },
            { id: "kanaighat", name: "কানাইঘাট", latitude: "25.0167", longitude: "92.2500" },
            { id: "zakiganj", name: "জকিগঞ্জ", latitude: "24.8667", longitude: "92.3667" },
            { id: "south_surma", name: "দক্ষিণ সুরমা", latitude: "24.8500", longitude: "91.8833" }
          ]
        },
        // Placeholder coordinates for remaining districts
        {
          id: "moulvibazar",
          name: "মৌলভীবাজার",
          thanas: [
            { id: "moulvibazar_sadar", name: "মৌলভীবাজার সদর", latitude: "0", longitude: "0" },
            { id: "barlekha", name: "বড়লেখা", latitude: "0", longitude: "0" },
            { id: "juri", name: "জুড়ি", latitude: "0", longitude: "0" },
            { id: "kamalganj", name: "কমলগঞ্জ", latitude: "0", longitude: "0" },
            { id: "kulaura", name: "কুলাউড়া", latitude: "0", longitude: "0" },
            { id: "rajnagar", name: "রাজনগর", latitude: "0", longitude: "0" },
            { id: "sreemangal", name: "শ্রীমঙ্গল", latitude: "0", longitude: "0" }
          ]
        },
        {
          id: "habiganj",
          name: "হবিগঞ্জ",
          thanas: [
            { id: "habiganj_sadar", name: "হবিগঞ্জ সদর", latitude: "0", longitude: "0" },
            { id: "ajmiriganj", name: "আজমিরীগঞ্জ", latitude: "0", longitude: "0" },
            { id: "bahubal", name: "বাহুবল", latitude: "0", longitude: "0" },
            { id: "baniyachong", name: "বানিয়াচং", latitude: "0", longitude: "0" },
            { id: "chunarughat", name: "চুনারুঘাট", latitude: "0", longitude: "0" },
            { id: "lakhai", name: "লাখাই", latitude: "0", longitude: "0" },
            { id: "madhabpur", name: "মাধবপুর", latitude: "0", longitude: "0" },
            { id: "nabiganj", name: "নবীগঞ্জ", latitude: "0", longitude: "0" },
            { id: "shaistagonj", name: "শায়েস্তাগঞ্জ", latitude: "0", longitude: "0" }
          ]
        },
        {
          id: "sunamganj",
          name: "সুনামগঞ্জ",
          thanas: [
            { id: "sunamganj_sadar", name: "সুনামগঞ্জ সদর", latitude: "0", longitude: "0" },
            { id: "bishwamvarpur", name: "বিশ্বম্ভরপুর", latitude: "0", longitude: "0" },
            { id: "chhatak", name: "ছাতক", latitude: "0", longitude: "0" },
            { id: "derai", name: "দিরাই", latitude: "0", longitude: "0" },
            { id: "dharampasha", name: "ধরমপাশা", latitude: "0", longitude: "0" },
            { id: "dowarabazar", name: "দোয়ারাবাজার", latitude: "0", longitude: "0" },
            { id: "jagannathpur", name: "জগন্নাথপুর", latitude: "0", longitude: "0" },
            { id: "jamalganj", name: "জামালগঞ্জ", latitude: "0", longitude: "0" },
            { id: "sullah", name: "শাল্লা", latitude: "0", longitude: "0" },
            { id: "tahirpur", name: "তাহিরপুর", latitude: "0", longitude: "0" }
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
            { id: "mymensingh_sadar", name: "ময়মনসিংহ সদর", latitude: "24.7539", longitude: "90.4065" },
            { id: "bhaluka", name: "ভালুকা", latitude: "24.3833", longitude: "90.3833" },
            { id: "dhobaura", name: "ধোবাউড়া", latitude: "25.0833", longitude: "90.5333" },
            { id: "fulbaria", name: "ফুলবাড়ীয়া", latitude: "24.6333", longitude: "90.2667" },
            { id: "gafargaon", name: "গফরগাঁও", latitude: "24.4333", longitude: "90.5500" },
            { id: "gauripur", name: "গৌরীপুর", latitude: "24.7667", longitude: "90.5667" },
            { id: "haluaghat", name: "হালুয়াঘাট", latitude: "25.1333", longitude: "90.3500" },
            { id: "ishwarganj", name: "ঈশ্বরগঞ্জ", latitude: "24.6833", longitude: "90.6167" },
            { id: "muktagachha", name: "মুক্তাগাছা", latitude: "24.7667", longitude: "90.2667" },
            { id: "nandail", name: "নান্দাইল", latitude: "24.5667", longitude: "90.6833" },
            { id: "phulpur", name: "ফুলপুর", latitude: "24.9500", longitude: "90.3500" },
            { id: "trishal", name: "ত্রিশাল", latitude: "24.5833", longitude: "90.3833" }
          ]
        },
        // Placeholder coordinates for remaining districts
        {
          id: "netrokona",
          name: "নেত্রকোণা",
          thanas: [
            { id: "netrokona_sadar", name: "নেত্রকোণা সদর", latitude: "0", longitude: "0" },
            { id: "atpara", name: "আটপাড়া", latitude: "0", longitude: "0" },
            { id: "barhatta", name: "বারহাট্টা", latitude: "0", longitude: "0" },
            { id: "durgapur", name: "দুর্গাপুর", latitude: "0", longitude: "0" },
            { id: "kalmakanda", name: "কলমাকান্দা", latitude: "0", longitude: "0" },
            { id: "kendua", name: "কেন্দুয়া", latitude: "0", longitude: "0" },
            { id: "khaliajuri", name: "খালিয়াজুরী", latitude: "0", longitude: "0" },
            { id: "madan", name: "মদন", latitude: "0", longitude: "0" },
            { id: "mohanganj", name: "মোহনগঞ্জ", latitude: "0", longitude: "0" },
            { id: "purbadhala", name: "পূর্বধলা", latitude: "0", longitude: "0" }
          ]
        },
        {
          id: "jamalpur",
          name: "জামালপুর",
          thanas: [
            { id: "jamalpur_sadar", name: "জামালপুর সদর", latitude: "0", longitude: "0" },
            { id: "bakshiganj", name: "বকশীগঞ্জ", latitude: "0", longitude: "0" },
            { id: "dewanganj", name: "দেওয়ানগঞ্জ", latitude: "0", longitude: "0" },
            { id: "islampur", name: "ইসলামপুর", latitude: "0", longitude: "0" },
            { id: "madarganj", name: "মাদারগঞ্জ", latitude: "0", longitude: "0" },
            { id: "melandaha", name: "মেলান্দহ", latitude: "0", longitude: "0" },
            { id: "sarishabari", name: "সরিষাবাড়ী", latitude: "0", longitude: "0" }
          ]
        },
        {
          id: "sherpur",
          name: "শেরপুর",
          thanas: [
            { id: "sherpur_sadar", name: "শেরপুর সদর", latitude: "0", longitude: "0" },
            { id: "jhenaigati", name: "ঝিনাইগাতী", latitude: "0", longitude: "0" },
            { id: "nakla", name: "নকলা", latitude: "0", longitude: "0" },
            { id: "nalitabari", name: "নালিতাবাড়ী", latitude: "0", longitude: "0" },
            { id: "sreebardi", name: "শ্রীবরদী", latitude: "0", longitude: "0" }
          ]
        }
      ]
    }
  ]
};
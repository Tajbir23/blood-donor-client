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
    // ==================== ঢাকা বিভাগ (Dhaka Division) ====================
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
            { id: "uttara", name: "উত্তরা", latitude: "23.8760", longitude: "90.3900" },
            { id: "savar", name: "সাভার", latitude: "23.8583", longitude: "90.2667" },
            { id: "keraniganj", name: "কেরানীগঞ্জ", latitude: "23.6983", longitude: "90.3450" },
            { id: "dhamrai", name: "ধামরাই", latitude: "23.9167", longitude: "90.2000" },
            { id: "dohar", name: "দোহার", latitude: "23.5833", longitude: "90.1333" },
            { id: "nawabganj", name: "নবাবগঞ্জ", latitude: "23.6667", longitude: "90.1833" }
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
            { id: "dhanbari", name: "ধনবাড়ী", latitude: "24.6833", longitude: "90.0167" },
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
            { id: "itna", name: "ইটনা", latitude: "24.3500", longitude: "91.0833" },
            { id: "karimganj", name: "করিমগঞ্জ", latitude: "24.4667", longitude: "90.8833" },
            { id: "katiadi", name: "কটিয়াদি", latitude: "24.3333", longitude: "90.8333" },
            { id: "kuliarchar", name: "কুলিয়ারচর", latitude: "24.2667", longitude: "90.8500" },
            { id: "mithamain", name: "মিঠামইন", latitude: "24.3667", longitude: "91.0167" },
            { id: "nikli", name: "নিকলী", latitude: "24.3833", longitude: "90.9500" },
            { id: "pakundia", name: "পাকুন্দিয়া", latitude: "24.3333", longitude: "90.6833" },
            { id: "tarail", name: "তাড়াইল", latitude: "24.5000", longitude: "90.9000" }
          ]
        },
        {
          id: "manikganj",
          name: "মানিকগঞ্জ",
          thanas: [
            { id: "manikganj_sadar", name: "মানিকগঞ্জ সদর", latitude: "23.8617", longitude: "90.0047" },
            { id: "daulatpur", name: "দৌলতপুর", latitude: "23.9833", longitude: "89.9500" },
            { id: "ghior", name: "ঘিওর", latitude: "23.8833", longitude: "89.8833" },
            { id: "harirampur", name: "হরিরামপুর", latitude: "23.7000", longitude: "89.9667" },
            { id: "saturia", name: "সাটুরিয়া", latitude: "23.8500", longitude: "90.0833" },
            { id: "shivalaya", name: "শিবালয়", latitude: "23.8333", longitude: "89.7833" },
            { id: "singair", name: "সিংগাইর", latitude: "23.7833", longitude: "90.1167" }
          ]
        },
        {
          id: "madaripur",
          name: "মাদারীপুর",
          thanas: [
            { id: "madaripur_sadar", name: "মাদারীপুর সদর", latitude: "23.1667", longitude: "90.1833" },
            { id: "kalkini", name: "কালকিনি", latitude: "23.0667", longitude: "90.2167" },
            { id: "rajoir", name: "রাজৈর", latitude: "23.1500", longitude: "90.0833" },
            { id: "shibchar", name: "শিবচর", latitude: "23.2833", longitude: "90.1833" }
          ]
        },
        {
          id: "shariatpur",
          name: "শরীয়তপুর",
          thanas: [
            { id: "shariatpur_sadar", name: "শরীয়তপুর সদর", latitude: "23.2333", longitude: "90.4333" },
            { id: "bhedarganj", name: "ভেদরগঞ্জ", latitude: "23.2833", longitude: "90.4833" },
            { id: "damudya", name: "ডামুড্যা", latitude: "23.1833", longitude: "90.3333" },
            { id: "gosairhat", name: "গোসাইরহাট", latitude: "23.1333", longitude: "90.4333" },
            { id: "naria", name: "নড়িয়া", latitude: "23.3167", longitude: "90.3833" },
            { id: "zajira", name: "জাজিরা", latitude: "23.2667", longitude: "90.3167" }
          ]
        },
        {
          id: "faridpur",
          name: "ফরিদপুর",
          thanas: [
            { id: "faridpur_sadar", name: "ফরিদপুর সদর", latitude: "23.6000", longitude: "89.8500" },
            { id: "alfadanga", name: "আলফাডাঙ্গা", latitude: "23.4833", longitude: "89.7167" },
            { id: "bhanga", name: "ভাঙ্গা", latitude: "23.3833", longitude: "90.0000" },
            { id: "boalmari", name: "বোয়ালমারী", latitude: "23.3833", longitude: "89.6833" },
            { id: "charbhadrasan", name: "চরভদ্রাসন", latitude: "23.5833", longitude: "89.9667" },
            { id: "madhukhali", name: "মধুখালী", latitude: "23.5167", longitude: "89.7167" },
            { id: "nagarkanda", name: "নগরকান্দা", latitude: "23.4500", longitude: "89.8333" },
            { id: "sadarpur", name: "সদরপুর", latitude: "23.4833", longitude: "90.1333" },
            { id: "saltha", name: "সালথা", latitude: "23.4167", longitude: "89.6167" }
          ]
        },
        {
          id: "rajbari",
          name: "রাজবাড়ী",
          thanas: [
            { id: "rajbari_sadar", name: "রাজবাড়ী সদর", latitude: "23.7500", longitude: "89.6333" },
            { id: "baliakandi", name: "বালিয়াকান্দি", latitude: "23.6167", longitude: "89.6333" },
            { id: "goalandaghat", name: "গোয়ালন্দঘাট", latitude: "23.7667", longitude: "89.7833" },
            { id: "kalukhali", name: "কালুখালী", latitude: "23.6333", longitude: "89.5500" },
            { id: "pangsha", name: "পাংশা", latitude: "23.6500", longitude: "89.4667" }
          ]
        },
        {
          id: "gopalganj",
          name: "গোপালগঞ্জ",
          thanas: [
            { id: "gopalganj_sadar", name: "গোপালগঞ্জ সদর", latitude: "23.0167", longitude: "89.8167" },
            { id: "kashiani", name: "কাশিয়ানী", latitude: "23.1000", longitude: "89.7333" },
            { id: "kotalipara", name: "কোটালীপাড়া", latitude: "23.0333", longitude: "89.9833" },
            { id: "muksudpur", name: "মুকসুদপুর", latitude: "23.1833", longitude: "89.9167" },
            { id: "tungipara", name: "টুঙ্গিপাড়া", latitude: "22.9500", longitude: "89.8833" }
          ]
        }
      ]
    },
    // ==================== রংপুর বিভাগ (Rangpur Division) ====================
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
            { id: "birol", name: "বিরল", latitude: "25.7167", longitude: "88.5500" },
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
        {
          id: "gaibandha",
          name: "গাইবান্ধা",
          thanas: [
            { id: "gaibandha_sadar", name: "গাইবান্ধা সদর", latitude: "25.3333", longitude: "89.5333" },
            { id: "fulchhari", name: "ফুলছড়ি", latitude: "25.2000", longitude: "89.6333" },
            { id: "gobindaganj", name: "গোবিন্দগঞ্জ", latitude: "25.1333", longitude: "89.3833" },
            { id: "palashbari", name: "পলাশবাড়ী", latitude: "25.2333", longitude: "89.3000" },
            { id: "sadullapur", name: "সাদুল্লাপুর", latitude: "25.4000", longitude: "89.4167" },
            { id: "saghata", name: "সাঘাটা", latitude: "25.2167", longitude: "89.4833" },
            { id: "sundarganj", name: "সুন্দরগঞ্জ", latitude: "25.5167", longitude: "89.5333" }
          ]
        },
        {
          id: "lalmonirhat",
          name: "লালমনিরহাট",
          thanas: [
            { id: "lalmonirhat_sadar", name: "লালমনিরহাট সদর", latitude: "25.9167", longitude: "89.4500" },
            { id: "aditmari", name: "আদিতমারী", latitude: "25.8833", longitude: "89.3833" },
            { id: "hatibandha", name: "হাতীবান্ধা", latitude: "26.0333", longitude: "89.2833" },
            { id: "kaliganj", name: "কালীগঞ্জ", latitude: "25.8667", longitude: "89.3000" },
            { id: "patgram", name: "পাটগ্রাম", latitude: "26.0667", longitude: "89.1500" }
          ]
        },
        {
          id: "nilphamari",
          name: "নীলফামারী",
          thanas: [
            { id: "nilphamari_sadar", name: "নীলফামারী সদর", latitude: "25.9333", longitude: "88.8500" },
            { id: "dimla", name: "ডিমলা", latitude: "26.1167", longitude: "88.9000" },
            { id: "domar", name: "ডোমার", latitude: "25.9833", longitude: "88.7000" },
            { id: "jaldhaka", name: "জলঢাকা", latitude: "25.8833", longitude: "89.0000" },
            { id: "kishoreganj", name: "কিশোরগঞ্জ", latitude: "25.9833", longitude: "88.9667" },
            { id: "saidpur", name: "সৈয়দপুর", latitude: "25.7833", longitude: "88.9000" }
          ]
        },
        {
          id: "thakurgaon",
          name: "ঠাকুরগাঁও",
          thanas: [
            { id: "thakurgaon_sadar", name: "ঠাকুরগাঁও সদর", latitude: "26.0333", longitude: "88.4500" },
            { id: "baliadangi", name: "বালিয়াডাঙ্গী", latitude: "25.8833", longitude: "88.3500" },
            { id: "haripur", name: "হরিপুর", latitude: "25.8833", longitude: "88.5333" },
            { id: "pirganj", name: "পীরগঞ্জ", latitude: "26.1500", longitude: "88.3667" },
            { id: "ranisankail", name: "রাণীশংকৈল", latitude: "25.9167", longitude: "88.3333" }
          ]
        },
        {
          id: "panchagarh",
          name: "পঞ্চগড়",
          thanas: [
            { id: "panchagarh_sadar", name: "পঞ্চগড় সদর", latitude: "26.3333", longitude: "88.5500" },
            { id: "atwari", name: "আটোয়ারী", latitude: "26.3333", longitude: "88.4667" },
            { id: "boda", name: "বোদা", latitude: "26.2167", longitude: "88.3833" },
            { id: "debiganj", name: "দেবীগঞ্জ", latitude: "26.1333", longitude: "88.7333" },
            { id: "tetulia", name: "তেতুলিয়া", latitude: "26.4833", longitude: "88.3667" }
          ]
        }
      ]
    },
    // ==================== চট্টগ্রাম বিভাগ (Chittagong Division) ====================
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
        {
          id: "coxs_bazar",
          name: "কক্সবাজার",
          thanas: [
            { id: "coxs_bazar_sadar", name: "কক্সবাজার সদর", latitude: "21.4395", longitude: "91.9757" },
            { id: "chakaria", name: "চকরিয়া", latitude: "21.6667", longitude: "92.0667" },
            { id: "kutubdia", name: "কুতুবদিয়া", latitude: "21.8167", longitude: "91.8500" },
            { id: "maheshkhali", name: "মহেশখালী", latitude: "21.5500", longitude: "91.8833" },
            { id: "pekua", name: "পেকুয়া", latitude: "21.7167", longitude: "91.9833" },
            { id: "ramu", name: "রামু", latitude: "21.3833", longitude: "92.1000" },
            { id: "teknaf", name: "টেকনাফ", latitude: "20.8500", longitude: "92.2833" },
            { id: "ukhia", name: "উখিয়া", latitude: "21.2167", longitude: "92.1333" }
          ]
        },
        {
          id: "bandarban",
          name: "বান্দরবান",
          thanas: [
            { id: "bandarban_sadar", name: "বান্দরবান সদর", latitude: "22.2000", longitude: "92.2167" },
            { id: "alikadam", name: "আলীকদম", latitude: "21.6667", longitude: "92.2833" },
            { id: "lama", name: "লামা", latitude: "21.7833", longitude: "92.1833" },
            { id: "naikhongchhari", name: "নাইক্ষ্যংছড়ি", latitude: "21.4833", longitude: "92.1500" },
            { id: "rowangchhari", name: "রোয়াংছড়ি", latitude: "22.2667", longitude: "92.2833" },
            { id: "ruma", name: "রুমা", latitude: "21.9833", longitude: "92.4000" },
            { id: "thanchi", name: "থানচি", latitude: "21.8333", longitude: "92.4667" }
          ]
        },
        {
          id: "rangamati",
          name: "রাঙ্গামাটি",
          thanas: [
            { id: "rangamati_sadar", name: "রাঙ্গামাটি সদর", latitude: "22.6333", longitude: "92.2000" },
            { id: "baghaichhari", name: "বাঘাইছড়ি", latitude: "23.2500", longitude: "92.2167" },
            { id: "barkal", name: "বরকল", latitude: "22.8333", longitude: "92.3333" },
            { id: "belaichhari", name: "বিলাইছড়ি", latitude: "22.5833", longitude: "92.3667" },
            { id: "juraichhari", name: "জুরাছড়ি", latitude: "22.6833", longitude: "92.2667" },
            { id: "kaptai", name: "কাপ্তাই", latitude: "22.5000", longitude: "92.2167" },
            { id: "kawkhali", name: "কাউখালী", latitude: "22.4000", longitude: "92.2833" },
            { id: "langadu", name: "লংগদু", latitude: "22.9833", longitude: "92.1333" },
            { id: "naniarchar", name: "নানিয়ারচর", latitude: "22.5167", longitude: "92.2500" },
            { id: "rajasthali", name: "রাজস্থলী", latitude: "22.3167", longitude: "92.1833" }
          ]
        },
        {
          id: "khagrachhari",
          name: "খাগড়াছড়ি",
          thanas: [
            { id: "khagrachhari_sadar", name: "খাগড়াছড়ি সদর", latitude: "23.1333", longitude: "91.9667" },
            { id: "dighinala", name: "দিঘীনালা", latitude: "23.2667", longitude: "92.0333" },
            { id: "guimara", name: "গুইমারা", latitude: "23.0333", longitude: "92.0167" },
            { id: "lakshmichhari", name: "লক্ষ্মীছড়ি", latitude: "22.9667", longitude: "92.0500" },
            { id: "mahalchhari", name: "মহালছড়ি", latitude: "23.1500", longitude: "92.0667" },
            { id: "manikchhari", name: "মানিকছড়ি", latitude: "23.0167", longitude: "91.8833" },
            { id: "matiranga", name: "মাটিরাঙ্গা", latitude: "23.0333", longitude: "91.9167" },
            { id: "panchhari", name: "পানছড়ি", latitude: "23.3500", longitude: "92.0333" },
            { id: "ramgarh", name: "রামগড়", latitude: "23.1000", longitude: "91.8333" }
          ]
        },
        {
          id: "comilla",
          name: "কুমিল্লা",
          thanas: [
            { id: "comilla_sadar", name: "কুমিল্লা সদর", latitude: "23.4607", longitude: "91.1809" },
            { id: "comilla_sadar_south", name: "কুমিল্লা সদর দক্ষিণ", latitude: "23.4167", longitude: "91.1667" },
            { id: "barura", name: "বরুড়া", latitude: "23.3167", longitude: "91.0667" },
            { id: "brahmanpara", name: "ব্রাহ্মণপাড়া", latitude: "23.6333", longitude: "91.1000" },
            { id: "burichong", name: "বুড়িচং", latitude: "23.5500", longitude: "91.1167" },
            { id: "chandina", name: "চান্দিনা", latitude: "23.5000", longitude: "91.0333" },
            { id: "chauddagram", name: "চৌদ্দগ্রাম", latitude: "23.2333", longitude: "91.2667" },
            { id: "daudkandi", name: "দাউদকান্দি", latitude: "23.5333", longitude: "90.7333" },
            { id: "debidwar", name: "দেবিদ্বার", latitude: "23.6667", longitude: "91.0333" },
            { id: "homna", name: "হোমনা", latitude: "23.6167", longitude: "90.7833" },
            { id: "laksam", name: "লাকসাম", latitude: "23.2333", longitude: "91.1167" },
            { id: "lalmai", name: "লালমাই", latitude: "23.3833", longitude: "91.2333" },
            { id: "meghna", name: "মেঘনা", latitude: "23.5333", longitude: "90.8167" },
            { id: "monohorgonj", name: "মনোহরগঞ্জ", latitude: "23.2500", longitude: "91.3833" },
            { id: "muradnagar", name: "মুরাদনগর", latitude: "23.7333", longitude: "90.9333" },
            { id: "nangalkot", name: "নাঙ্গলকোট", latitude: "23.3167", longitude: "91.2667" },
            { id: "titas", name: "তিতাস", latitude: "23.5667", longitude: "90.8667" }
          ]
        },
        {
          id: "chandpur",
          name: "চাঁদপুর",
          thanas: [
            { id: "chandpur_sadar", name: "চাঁদপুর সদর", latitude: "23.2333", longitude: "90.6667" },
            { id: "faridganj", name: "ফরিদগঞ্জ", latitude: "23.1000", longitude: "90.7167" },
            { id: "haimchar", name: "হাইমচর", latitude: "23.2167", longitude: "90.5833" },
            { id: "haziganj", name: "হাজীগঞ্জ", latitude: "23.3833", longitude: "90.8333" },
            { id: "kachua", name: "কচুয়া", latitude: "23.3500", longitude: "90.7667" },
            { id: "matlab_dakshin", name: "মতলব দক্ষিণ", latitude: "23.2667", longitude: "90.7167" },
            { id: "matlab_uttar", name: "মতলব উত্তর", latitude: "23.3500", longitude: "90.6833" },
            { id: "shahrasti", name: "শাহরাস্তি", latitude: "23.2333", longitude: "90.8500" }
          ]
        },
        {
          id: "brahmanbaria",
          name: "ব্রাহ্মণবাড়িয়া",
          thanas: [
            { id: "brahmanbaria_sadar", name: "ব্রাহ্মণবাড়িয়া সদর", latitude: "23.9667", longitude: "91.1000" },
            { id: "akhaura", name: "আখাউড়া", latitude: "23.8833", longitude: "91.1833" },
            { id: "ashuganj", name: "আশুগঞ্জ", latitude: "24.0333", longitude: "90.8833" },
            { id: "bancharampur", name: "বাঞ্ছারামপুর", latitude: "23.7667", longitude: "90.7833" },
            { id: "bijoynagar", name: "বিজয়নগর", latitude: "23.9833", longitude: "91.1333" },
            { id: "kasba", name: "কসবা", latitude: "23.8167", longitude: "91.1833" },
            { id: "nabinagar", name: "নবীনগর", latitude: "23.8833", longitude: "90.8833" },
            { id: "nasirnagar", name: "নাসিরনগর", latitude: "24.0167", longitude: "91.0667" },
            { id: "sarail", name: "সরাইল", latitude: "24.0333", longitude: "91.1167" }
          ]
        },
        {
          id: "feni",
          name: "ফেনী",
          thanas: [
            { id: "feni_sadar", name: "ফেনী সদর", latitude: "23.0167", longitude: "91.3833" },
            { id: "chhagalnaiya", name: "ছাগলনাইয়া", latitude: "23.0500", longitude: "91.5167" },
            { id: "daganbhuiyan", name: "দাগনভূঞা", latitude: "23.0667", longitude: "91.4167" },
            { id: "parshuram", name: "পরশুরাম", latitude: "23.1333", longitude: "91.4500" },
            { id: "fulgazi", name: "ফুলগাজী", latitude: "23.0000", longitude: "91.4333" },
            { id: "sonagazi", name: "সোনাগাজী", latitude: "22.8333", longitude: "91.4500" }
          ]
        },
        {
          id: "noakhali",
          name: "নোয়াখালী",
          thanas: [
            { id: "noakhali_sadar", name: "নোয়াখালী সদর", latitude: "22.8833", longitude: "91.1000" },
            { id: "begumganj", name: "বেগমগঞ্জ", latitude: "22.8000", longitude: "91.1000" },
            { id: "chatkhil", name: "চাটখিল", latitude: "22.9167", longitude: "91.2333" },
            { id: "companiganj", name: "কোম্পানীগঞ্জ", latitude: "22.6667", longitude: "91.1833" },
            { id: "hatiya", name: "হাতিয়া", latitude: "22.4500", longitude: "91.1000" },
            { id: "kabirhat", name: "কবিরহাট", latitude: "22.7833", longitude: "91.2333" },
            { id: "senbagh", name: "সেনবাগ", latitude: "22.9667", longitude: "91.1667" },
            { id: "sonaimuri", name: "সোনাইমুড়ী", latitude: "22.9833", longitude: "91.0500" },
            { id: "subarnachar", name: "সুবর্ণচর", latitude: "22.6333", longitude: "91.0333" }
          ]
        },
        {
          id: "lakshmipur",
          name: "লক্ষ্মীপুর",
          thanas: [
            { id: "lakshmipur_sadar", name: "লক্ষ্মীপুর সদর", latitude: "22.9500", longitude: "90.8333" },
            { id: "kamalnagar", name: "কমলনগর", latitude: "22.6500", longitude: "90.8833" },
            { id: "raipur", name: "রায়পুর", latitude: "22.8333", longitude: "90.7500" },
            { id: "ramganj", name: "রামগঞ্জ", latitude: "23.0833", longitude: "90.8333" },
            { id: "ramgati", name: "রামগতি", latitude: "22.5833", longitude: "90.9667" }
          ]
        }
      ]
    },
    // ==================== খুলনা বিভাগ (Khulna Division) ====================
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
        {
          id: "bagerhat",
          name: "বাগেরহাট",
          thanas: [
            { id: "bagerhat_sadar", name: "বাগেরহাট সদর", latitude: "22.6557", longitude: "89.7847" },
            { id: "chitalmari", name: "চিতলমারী", latitude: "22.7167", longitude: "89.8167" },
            { id: "fakirhat", name: "ফকিরহাট", latitude: "22.7333", longitude: "89.7333" },
            { id: "kachua", name: "কচুয়া", latitude: "22.7833", longitude: "89.8500" },
            { id: "mollahat", name: "মোল্লাহাট", latitude: "22.8833", longitude: "89.7500" },
            { id: "mongla", name: "মোংলা", latitude: "22.4833", longitude: "89.6000" },
            { id: "morrelganj", name: "মোড়েলগঞ্জ", latitude: "22.4500", longitude: "89.8500" },
            { id: "rampal", name: "রামপাল", latitude: "22.5000", longitude: "89.7000" },
            { id: "sarankhola", name: "শরণখোলা", latitude: "22.3000", longitude: "89.7833" }
          ]
        },
        {
          id: "satkhira",
          name: "সাতক্ষীরা",
          thanas: [
            { id: "satkhira_sadar", name: "সাতক্ষীরা সদর", latitude: "22.7167", longitude: "89.0833" },
            { id: "assasuni", name: "আশাশুনি", latitude: "22.5500", longitude: "89.1833" },
            { id: "debhata", name: "দেবহাটা", latitude: "22.6667", longitude: "88.9833" },
            { id: "kalaroa", name: "কলারোয়া", latitude: "22.8833", longitude: "89.0500" },
            { id: "kaliganj", name: "কালীগঞ্জ", latitude: "22.4333", longitude: "89.0833" },
            { id: "shyamnagar", name: "শ্যামনগর", latitude: "22.3333", longitude: "89.1500" },
            { id: "tala", name: "তালা", latitude: "22.7500", longitude: "89.2167" }
          ]
        },
        {
          id: "jessore",
          name: "যশোর",
          thanas: [
            { id: "jessore_sadar", name: "যশোর সদর", latitude: "23.1667", longitude: "89.2167" },
            { id: "abhaynagar", name: "অভয়নগর", latitude: "23.0167", longitude: "89.4167" },
            { id: "bagherpara", name: "বাঘারপাড়া", latitude: "23.2833", longitude: "89.2500" },
            { id: "chaugachha", name: "চৌগাছা", latitude: "23.1000", longitude: "89.0667" },
            { id: "jhikargachha", name: "ঝিকরগাছা", latitude: "22.8333", longitude: "89.0833" },
            { id: "keshabpur", name: "কেশবপুর", latitude: "22.9167", longitude: "89.2333" },
            { id: "manirampur", name: "মণিরামপুর", latitude: "22.9333", longitude: "89.3833" },
            { id: "sharsha", name: "শার্শা", latitude: "23.1167", longitude: "88.9667" }
          ]
        },
        {
          id: "narail",
          name: "নড়াইল",
          thanas: [
            { id: "narail_sadar", name: "নড়াইল সদর", latitude: "23.1167", longitude: "89.5833" },
            { id: "kalia", name: "কালিয়া", latitude: "23.0333", longitude: "89.6167" },
            { id: "lohagara", name: "লোহাগড়া", latitude: "23.0833", longitude: "89.7167" }
          ]
        },
        {
          id: "magura",
          name: "মাগুরা",
          thanas: [
            { id: "magura_sadar", name: "মাগুরা সদর", latitude: "23.4333", longitude: "89.4333" },
            { id: "mohammadpur", name: "মোহাম্মদপুর", latitude: "23.4833", longitude: "89.5667" },
            { id: "shalikha", name: "শালিখা", latitude: "23.4333", longitude: "89.5333" },
            { id: "sreepur", name: "শ্রীপুর", latitude: "23.5333", longitude: "89.4000" }
          ]
        },
        {
          id: "kushtia",
          name: "কুষ্টিয়া",
          thanas: [
            { id: "kushtia_sadar", name: "কুষ্টিয়া সদর", latitude: "23.9000", longitude: "89.1167" },
            { id: "bheramara", name: "ভেড়ামারা", latitude: "24.0333", longitude: "89.0000" },
            { id: "daulatpur", name: "দৌলতপুর", latitude: "23.8667", longitude: "89.0167" },
            { id: "khoksa", name: "খোকসা", latitude: "23.7833", longitude: "89.1667" },
            { id: "kumarkhali", name: "কুমারখালী", latitude: "23.7667", longitude: "89.2500" },
            { id: "mirpur", name: "মিরপুর", latitude: "23.9333", longitude: "89.2333" }
          ]
        },
        {
          id: "meherpur",
          name: "মেহেরপুর",
          thanas: [
            { id: "meherpur_sadar", name: "মেহেরপুর সদর", latitude: "23.7667", longitude: "88.6333" },
            { id: "gangni", name: "গাংনী", latitude: "23.8000", longitude: "88.7500" },
            { id: "mujibnagar", name: "মুজিবনগর", latitude: "23.7167", longitude: "88.5333" }
          ]
        },
        {
          id: "chuadanga",
          name: "চুয়াডাঙ্গা",
          thanas: [
            { id: "chuadanga_sadar", name: "চুয়াডাঙ্গা সদর", latitude: "23.6333", longitude: "88.8500" },
            { id: "alamdanga", name: "আলমডাঙ্গা", latitude: "23.7667", longitude: "88.9500" },
            { id: "damurhuda", name: "দামুড়হুদা", latitude: "23.5833", longitude: "88.7667" },
            { id: "jibannagar", name: "জীবননগর", latitude: "23.5500", longitude: "88.8000" }
          ]
        },
        {
          id: "jhenaidah",
          name: "ঝিনাইদহ",
          thanas: [
            { id: "jhenaidah_sadar", name: "ঝিনাইদহ সদর", latitude: "23.5500", longitude: "89.1667" },
            { id: "harinakunda", name: "হরিণাকুন্ডু", latitude: "23.5833", longitude: "89.0333" },
            { id: "kaliganj", name: "কালীগঞ্জ", latitude: "23.4167", longitude: "89.2833" },
            { id: "kotchandpur", name: "কোটচাঁদপুর", latitude: "23.4333", longitude: "89.0167" },
            { id: "maheshpur", name: "মহেশপুর", latitude: "23.3833", longitude: "89.1333" },
            { id: "shailkupa", name: "শৈলকুপা", latitude: "23.6500", longitude: "89.3500" }
          ]
        }
      ]
    },
    // ==================== রাজশাহী বিভাগ (Rajshahi Division) ====================
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
        {
          id: "bogra",
          name: "বগুড়া",
          thanas: [
            { id: "bogra_sadar", name: "বগুড়া সদর", latitude: "24.8500", longitude: "89.3667" },
            { id: "adamdighi", name: "আদমদিঘী", latitude: "24.7333", longitude: "89.0500" },
            { id: "dhunat", name: "ধুনট", latitude: "24.6833", longitude: "89.5333" },
            { id: "dhupchanchia", name: "ধুপচাঁচিয়া", latitude: "24.9333", longitude: "89.1667" },
            { id: "gabtali", name: "গাবতলী", latitude: "25.0000", longitude: "89.5333" },
            { id: "kahaloo", name: "কাহালু", latitude: "24.9333", longitude: "89.2667" },
            { id: "nandigram", name: "নন্দীগ্রাম", latitude: "24.7333", longitude: "89.2333" },
            { id: "sariakandi", name: "সারিয়াকান্দি", latitude: "24.9167", longitude: "89.6000" },
            { id: "shajahanpur", name: "শাজাহানপুর", latitude: "24.7833", longitude: "89.2833" },
            { id: "sherpur", name: "শেরপুর", latitude: "24.6500", longitude: "89.3833" },
            { id: "shibganj", name: "শিবগঞ্জ", latitude: "24.8000", longitude: "89.1500" },
            { id: "sonatala", name: "সোনাতলা", latitude: "25.0167", longitude: "89.4333" }
          ]
        },
        {
          id: "pabna",
          name: "পাবনা",
          thanas: [
            { id: "pabna_sadar", name: "পাবনা সদর", latitude: "24.0000", longitude: "89.2500" },
            { id: "atgharia", name: "আটঘরিয়া", latitude: "24.0833", longitude: "89.2333" },
            { id: "bera", name: "বেড়া", latitude: "24.0333", longitude: "89.6333" },
            { id: "bhangura", name: "ভাঙ্গুড়া", latitude: "24.1833", longitude: "89.5333" },
            { id: "chatmohar", name: "চাটমোহর", latitude: "24.2167", longitude: "89.2333" },
            { id: "faridpur", name: "ফরিদপুর", latitude: "24.1833", longitude: "89.3833" },
            { id: "ishwardi", name: "ঈশ্বরদী", latitude: "24.1333", longitude: "89.0833" },
            { id: "santhia", name: "সাঁথিয়া", latitude: "24.1833", longitude: "89.3333" },
            { id: "sujanagar", name: "সুজানগর", latitude: "23.9333", longitude: "89.5833" }
          ]
        },
        {
          id: "sirajganj",
          name: "সিরাজগঞ্জ",
          thanas: [
            { id: "sirajganj_sadar", name: "সিরাজগঞ্জ সদর", latitude: "24.4500", longitude: "89.7000" },
            { id: "belkuchi", name: "বেলকুচি", latitude: "24.4167", longitude: "89.7500" },
            { id: "chauhali", name: "চৌহালি", latitude: "24.3833", longitude: "89.6167" },
            { id: "kamarkhanda", name: "কামারখন্দ", latitude: "24.3833", longitude: "89.8833" },
            { id: "kazipur", name: "কাজীপুর", latitude: "24.6500", longitude: "89.6333" },
            { id: "raiganj", name: "রায়গঞ্জ", latitude: "24.5667", longitude: "89.7500" },
            { id: "shahjadpur", name: "শাহজাদপুর", latitude: "24.1667", longitude: "89.6000" },
            { id: "tarash", name: "তাড়াশ", latitude: "24.3000", longitude: "89.5833" },
            { id: "ullapara", name: "উল্লাপাড়া", latitude: "24.3167", longitude: "89.6667" }
          ]
        },
        {
          id: "natore",
          name: "নাটোর",
          thanas: [
            { id: "natore_sadar", name: "নাটোর সদর", latitude: "24.4167", longitude: "89.0000" },
            { id: "bagatipara", name: "বাগাতিপাড়া", latitude: "24.4167", longitude: "89.0667" },
            { id: "baraigram", name: "বড়াইগ্রাম", latitude: "24.4833", longitude: "89.0833" },
            { id: "gurudaspur", name: "গুরুদাসপুর", latitude: "24.3833", longitude: "88.7500" },
            { id: "lalpur", name: "লালপুর", latitude: "24.3500", longitude: "88.8833" },
            { id: "naldanga", name: "নলডাঙ্গা", latitude: "24.5167", longitude: "89.1833" },
            { id: "singra", name: "সিংড়া", latitude: "24.5000", longitude: "89.1500" }
          ]
        },
        {
          id: "naogaon",
          name: "নওগাঁ",
          thanas: [
            { id: "naogaon_sadar", name: "নওগাঁ সদর", latitude: "24.7833", longitude: "88.9333" },
            { id: "atrai", name: "আত্রাই", latitude: "24.7167", longitude: "89.0833" },
            { id: "badalgachhi", name: "বদলগাছী", latitude: "24.8333", longitude: "88.7833" },
            { id: "dhamoirhat", name: "ধামইরহাট", latitude: "25.0667", longitude: "88.7833" },
            { id: "manda", name: "মান্দা", latitude: "24.6667", longitude: "88.8167" },
            { id: "mahadebpur", name: "মহাদেবপুর", latitude: "24.8333", longitude: "88.6333" },
            { id: "niamatpur", name: "নিয়ামতপুর", latitude: "24.9833", longitude: "88.5833" },
            { id: "patnitala", name: "পত্নীতলা", latitude: "24.9167", longitude: "88.8167" },
            { id: "porsha", name: "পোরশা", latitude: "25.0000", longitude: "88.5333" },
            { id: "raninagar", name: "রাণীনগর", latitude: "24.7667", longitude: "89.0000" },
            { id: "sapahar", name: "সাপাহার", latitude: "25.1000", longitude: "88.5667" }
          ]
        },
        {
          id: "chapainawabganj",
          name: "চাঁপাইনবাবগঞ্জ",
          thanas: [
            { id: "chapainawabganj_sadar", name: "চাঁপাইনবাবগঞ্জ সদর", latitude: "24.6833", longitude: "88.2833" },
            { id: "bholahat", name: "ভোলাহাট", latitude: "24.8000", longitude: "88.2500" },
            { id: "gomastapur", name: "গোমস্তাপুর", latitude: "24.7667", longitude: "88.1500" },
            { id: "nachole", name: "নাচোল", latitude: "24.7500", longitude: "88.3167" },
            { id: "shibganj", name: "শিবগঞ্জ", latitude: "24.5667", longitude: "88.2333" }
          ]
        },
        {
          id: "joypurhat",
          name: "জয়পুরহাট",
          thanas: [
            { id: "joypurhat_sadar", name: "জয়পুরহাট সদর", latitude: "25.0833", longitude: "89.0333" },
            { id: "akkelpur", name: "আক্কেলপুর", latitude: "25.0667", longitude: "89.0333" },
            { id: "kalai", name: "কালাই", latitude: "25.0833", longitude: "89.1333" },
            { id: "khetlal", name: "ক্ষেতলাল", latitude: "25.1333", longitude: "88.9333" },
            { id: "panchbibi", name: "পাঁচবিবি", latitude: "25.1833", longitude: "89.0500" }
          ]
        }
      ]
    },
    // ==================== বরিশাল বিভাগ (Barisal Division) ====================
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
        {
          id: "bhola",
          name: "ভোলা",
          thanas: [
            { id: "bhola_sadar", name: "ভোলা সদর", latitude: "22.6833", longitude: "90.6500" },
            { id: "borhanuddin", name: "বোরহানউদ্দিন", latitude: "22.6333", longitude: "90.7000" },
            { id: "charfasson", name: "চরফ্যাশন", latitude: "22.2333", longitude: "90.7667" },
            { id: "daulatkhan", name: "দৌলতখান", latitude: "22.6167", longitude: "90.7500" },
            { id: "lalmohan", name: "লালমোহন", latitude: "22.3333", longitude: "90.7333" },
            { id: "manpura", name: "মনপুরা", latitude: "22.3500", longitude: "90.6333" },
            { id: "tazumuddin", name: "তজুমুদ্দিন", latitude: "22.4833", longitude: "90.6500" }
          ]
        },
        {
          id: "patuakhali",
          name: "পটুয়াখালী",
          thanas: [
            { id: "patuakhali_sadar", name: "পটুয়াখালী সদর", latitude: "22.3500", longitude: "90.3333" },
            { id: "bauphal", name: "বাউফল", latitude: "22.4000", longitude: "90.5500" },
            { id: "dashmina", name: "দশমিনা", latitude: "22.2000", longitude: "90.5833" },
            { id: "dumki", name: "দুমকি", latitude: "22.4333", longitude: "90.3667" },
            { id: "galachipa", name: "গলাচিপা", latitude: "22.0667", longitude: "90.4167" },
            { id: "kalapara", name: "কলাপাড়া", latitude: "21.9833", longitude: "90.2500" },
            { id: "mirzaganj", name: "মির্জাগঞ্জ", latitude: "22.4167", longitude: "90.2333" },
            { id: "rangabali", name: "রাঙ্গাবালী", latitude: "21.9167", longitude: "90.4500" }
          ]
        },
        {
          id: "barguna",
          name: "বরগুনা",
          thanas: [
            { id: "barguna_sadar", name: "বরগুনা সদর", latitude: "22.1500", longitude: "90.1167" },
            { id: "amtali", name: "আমতলী", latitude: "22.1000", longitude: "90.2500" },
            { id: "bamna", name: "বামনা", latitude: "22.3167", longitude: "90.0333" },
            { id: "betagi", name: "বেতাগী", latitude: "22.3833", longitude: "90.1833" },
            { id: "patharghata", name: "পাথরঘাটা", latitude: "21.9833", longitude: "90.1000" },
            { id: "taltali", name: "তালতলী", latitude: "21.9500", longitude: "90.2333" }
          ]
        },
        {
          id: "jhalokathi",
          name: "ঝালকাঠি",
          thanas: [
            { id: "jhalokathi_sadar", name: "ঝালকাঠি সদর", latitude: "22.6333", longitude: "90.2000" },
            { id: "kathalia", name: "কাঠালিয়া", latitude: "22.4667", longitude: "90.1833" },
            { id: "nalchity", name: "নলছিটি", latitude: "22.5833", longitude: "90.2500" },
            { id: "rajapur", name: "রাজাপুর", latitude: "22.5500", longitude: "90.0833" }
          ]
        },
        {
          id: "pirojpur",
          name: "পিরোজপুর",
          thanas: [
            { id: "pirojpur_sadar", name: "পিরোজপুর সদর", latitude: "22.5783", longitude: "89.9750" },
            { id: "bhandaria", name: "ভান্ডারিয়া", latitude: "22.4833", longitude: "90.0667" },
            { id: "kawkhali", name: "কাউখালী", latitude: "22.6167", longitude: "89.8833" },
            { id: "mathbaria", name: "মঠবাড়িয়া", latitude: "22.2833", longitude: "89.9667" },
            { id: "nazirpur", name: "নাজিরপুর", latitude: "22.6500", longitude: "90.0000" },
            { id: "nesarabad", name: "নেছারাবাদ (স্বরূপকাঠি)", latitude: "22.5333", longitude: "90.0500" },
            { id: "zianagar", name: "জিয়ানগর", latitude: "22.5833", longitude: "89.8833" }
          ]
        }
      ]
    },
    // ==================== সিলেট বিভাগ (Sylhet Division) ====================
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
            { id: "osmani_nagar", name: "ওসমানীনগর", latitude: "24.7167", longitude: "91.8667" },
            { id: "zakiganj", name: "জকিগঞ্জ", latitude: "24.8667", longitude: "92.3667" },
            { id: "south_surma", name: "দক্ষিণ সুরমা", latitude: "24.8500", longitude: "91.8833" }
          ]
        },
        {
          id: "moulvibazar",
          name: "মৌলভীবাজার",
          thanas: [
            { id: "moulvibazar_sadar", name: "মৌলভীবাজার সদর", latitude: "24.4833", longitude: "91.7833" },
            { id: "barlekha", name: "বড়লেখা", latitude: "24.3167", longitude: "92.1500" },
            { id: "juri", name: "জুড়ি", latitude: "24.2833", longitude: "92.1000" },
            { id: "kamalganj", name: "কমলগঞ্জ", latitude: "24.3500", longitude: "91.8500" },
            { id: "kulaura", name: "কুলাউড়া", latitude: "24.4167", longitude: "92.0000" },
            { id: "rajnagar", name: "রাজনগর", latitude: "24.4833", longitude: "91.8333" },
            { id: "sreemangal", name: "শ্রীমঙ্গল", latitude: "24.3000", longitude: "91.7333" }
          ]
        },
        {
          id: "habiganj",
          name: "হবিগঞ্জ",
          thanas: [
            { id: "habiganj_sadar", name: "হবিগঞ্জ সদর", latitude: "24.3833", longitude: "91.4167" },
            { id: "ajmiriganj", name: "আজমিরীগঞ্জ", latitude: "24.6000", longitude: "91.4167" },
            { id: "bahubal", name: "বাহুবল", latitude: "24.3500", longitude: "91.6500" },
            { id: "baniyachong", name: "বানিয়াচং", latitude: "24.5167", longitude: "91.3500" },
            { id: "chunarughat", name: "চুনারুঘাট", latitude: "24.2000", longitude: "91.5167" },
            { id: "lakhai", name: "লাখাই", latitude: "24.5167", longitude: "91.2500" },
            { id: "madhabpur", name: "মাধবপুর", latitude: "24.3500", longitude: "91.5833" },
            { id: "nabiganj", name: "নবীগঞ্জ", latitude: "24.5833", longitude: "91.2667" },
            { id: "shaistagonj", name: "শায়েস্তাগঞ্জ", latitude: "24.3500", longitude: "91.3833" }
          ]
        },
        {
          id: "sunamganj",
          name: "সুনামগঞ্জ",
          thanas: [
            { id: "sunamganj_sadar", name: "সুনামগঞ্জ সদর", latitude: "25.0500", longitude: "91.4000" },
            { id: "bishwamvarpur", name: "বিশ্বম্ভরপুর", latitude: "25.2667", longitude: "91.1667" },
            { id: "chhatak", name: "ছাতক", latitude: "25.0333", longitude: "91.6667" },
            { id: "derai", name: "দিরাই", latitude: "24.8833", longitude: "91.2833" },
            { id: "dharampasha", name: "ধরমপাশা", latitude: "24.9667", longitude: "91.1500" },
            { id: "dowarabazar", name: "দোয়ারাবাজার", latitude: "25.1500", longitude: "91.5500" },
            { id: "jagannathpur", name: "জগন্নাথপুর", latitude: "24.8667", longitude: "91.5833" },
            { id: "jamalganj", name: "জামালগঞ্জ", latitude: "24.9333", longitude: "91.0833" },
            { id: "south_sunamganj", name: "দক্ষিণ সুনামগঞ্জ", latitude: "25.0167", longitude: "91.3833" },
            { id: "sullah", name: "শাল্লা", latitude: "24.8333", longitude: "91.1833" },
            { id: "tahirpur", name: "তাহিরপুর", latitude: "25.2000", longitude: "91.0167" }
          ]
        }
      ]
    },
    // ==================== ময়মনসিংহ বিভাগ (Mymensingh Division) ====================
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
            { id: "tarakanda", name: "তারাকান্দা", latitude: "24.8500", longitude: "90.1833" },
            { id: "trishal", name: "ত্রিশাল", latitude: "24.5833", longitude: "90.3833" }
          ]
        },
        {
          id: "netrokona",
          name: "নেত্রকোণা",
          thanas: [
            { id: "netrokona_sadar", name: "নেত্রকোণা সদর", latitude: "24.8667", longitude: "90.7333" },
            { id: "atpara", name: "আটপাড়া", latitude: "24.8333", longitude: "90.8000" },
            { id: "barhatta", name: "বারহাট্টা", latitude: "24.9167", longitude: "90.8167" },
            { id: "durgapur", name: "দুর্গাপুর", latitude: "25.1167", longitude: "90.6667" },
            { id: "kalmakanda", name: "কলমাকান্দা", latitude: "25.0667", longitude: "90.7500" },
            { id: "kendua", name: "কেন্দুয়া", latitude: "24.6667", longitude: "90.8333" },
            { id: "khaliajuri", name: "খালিয়াজুরী", latitude: "24.7167", longitude: "91.0500" },
            { id: "madan", name: "মদন", latitude: "24.7167", longitude: "90.9833" },
            { id: "mohanganj", name: "মোহনগঞ্জ", latitude: "24.7833", longitude: "90.9333" },
            { id: "purbadhala", name: "পূর্বধলা", latitude: "24.7333", longitude: "90.7000" }
          ]
        },
        {
          id: "jamalpur",
          name: "জামালপুর",
          thanas: [
            { id: "jamalpur_sadar", name: "জামালপুর সদর", latitude: "24.9167", longitude: "89.9500" },
            { id: "bakshiganj", name: "বকশীগঞ্জ", latitude: "25.1500", longitude: "90.0500" },
            { id: "dewanganj", name: "দেওয়ানগঞ্জ", latitude: "25.0833", longitude: "89.9500" },
            { id: "islampur", name: "ইসলামপুর", latitude: "25.0500", longitude: "89.8667" },
            { id: "madarganj", name: "মাদারগঞ্জ", latitude: "24.9500", longitude: "89.7500" },
            { id: "melandaha", name: "মেলান্দহ", latitude: "24.8000", longitude: "89.8333" },
            { id: "sarishabari", name: "সরিষাবাড়ী", latitude: "24.8333", longitude: "89.7833" }
          ]
        },
        {
          id: "sherpur",
          name: "শেরপুর",
          thanas: [
            { id: "sherpur_sadar", name: "শেরপুর সদর", latitude: "25.0167", longitude: "90.0167" },
            { id: "jhenaigati", name: "ঝিনাইগাতী", latitude: "25.1833", longitude: "90.0167" },
            { id: "nakla", name: "নকলা", latitude: "24.9833", longitude: "89.9333" },
            { id: "nalitabari", name: "নালিতাবাড়ী", latitude: "25.1000", longitude: "90.1500" },
            { id: "sreebardi", name: "শ্রীবরদী", latitude: "25.0833", longitude: "90.2000" }
          ]
        }
      ]
    }
  ]
};

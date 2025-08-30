import type { Language, WordHuntItem, ReadAloudItem, FillBlankItem, WordBuilderItem } from './types';

export const uiStrings = {
  en: {
    appTitle: 'BulaBooks',
    tagline: 'Gamified reading for Grades 3–6',
    games: {
      wordHunt: { title: 'Word Hunt Adventure', description: 'Find words by meaning in stories' },
      readAloud: { title: 'Read-Aloud', description: 'Practice reading with instant feedback' },
      fillBlank: { title: 'Fill-in-the-Blank Quest', description: 'Complete sentences with correct words' },
      wordBuilder: { title: 'Word Builder', description: 'Build words from syllable pieces' }
    },
    levels: {
      beginner: 'Beginner',
      intermediate: 'Intermediate', 
      advanced: 'Advanced'
    },
    buttons: {
      start: 'Start',
      continue: 'Continue',
      next: 'Next',
      check: 'Check',
      skip: 'Skip',
      hint: 'Hint',
      back: 'Back',
      reset: 'Reset Progress',
      dashboard: 'Dashboard'
    },
    feedback: {
      correct: 'Great!',
      incorrect: 'Try again',
      perfect: 'Great reading! ⭐⭐⭐',
      okay: 'Almost there. ⭐⭐',
      tryAgain: "Let's try once more.",
      progressSaved: 'Progress saved'
    }
  },
  zu: {
    appTitle: 'BulaBooks',
    tagline: 'Imidlalo yokufunda kumabanga 3–6',
    games: {
      wordHunt: { title: 'Ukuzingela Amagama', description: 'Thola amagama ngencazelo ezindabeni' },
      readAloud: { title: 'Fundela Phezulu', description: 'Zilolonge ukufunda ngesiluleko eseshesha' },
      fillBlank: { title: 'Gcwalisa Izikhala', description: 'Qedela imisho ngamagama afanele' },
      wordBuilder: { title: 'Umakhi Wamagama', description: 'Yakha amagama ngezingxenye' }
    },
    levels: {
      beginner: 'Isiqalo',
      intermediate: 'Phakathi',
      advanced: 'Phezulu'
    },
    buttons: {
      start: 'Qala',
      continue: 'Qhubeka',
      next: 'Okulandelayo',
      check: 'Hlola',
      skip: 'Yeqa',
      hint: 'Isiphakamiso',
      back: 'Emuva',
      reset: 'Setha Kabusha',
      dashboard: 'Ibhodi'
    },
    feedback: {
      correct: 'Kulungile!',
      incorrect: 'Zama futhi',
      perfect: 'Ufunde kahle! ⭐⭐⭐',
      okay: 'Cishe lapho. ⭐⭐',
      tryAgain: 'Asizame futhi.',
      progressSaved: 'Inqubekelaphambili ilondoloziwe'
    }
  },
  af: {
    appTitle: 'BulaBooks',
    tagline: 'Spelgebaseerde lees vir Grade 3–6',
    games: {
      wordHunt: { title: 'Woordjag Avontuur', description: 'Vind woorde volgens betekenis in stories' },
      readAloud: { title: 'Lees Hardop', description: 'Oefen lees met onmiddellike terugvoer' },
      fillBlank: { title: 'Vul-in-die-Leemte', description: 'Voltooi sinne met regte woorde' },
      wordBuilder: { title: 'Woordbouer', description: 'Bou woorde uit lettergreep stukke' }
    },
    levels: {
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      advanced: 'Gevorderd'
    },
    buttons: {
      start: 'Begin',
      continue: 'Gaan voort',
      next: 'Volgende',
      check: 'Kyk',
      skip: 'Slaan oor',
      hint: 'Wenk',
      back: 'Terug',
      reset: 'Herstel Vordering',
      dashboard: 'Dashboard'
    },
    feedback: {
      correct: 'Fantasties!',
      incorrect: 'Probeer weer',
      perfect: 'Goeie lees! ⭐⭐⭐',
      okay: 'Amper daar. ⭐⭐',
      tryAgain: 'Kom ons probeer weer.',
      progressSaved: 'Vordering gestoor'
    }
  },
  tn: {
    appTitle: 'BulaBooks',
    tagline: 'Metshameko ya go bala mo dikarolwaneng 3–6',
    games: {
      wordHunt: { title: 'Tsoma ya Mafoko', description: 'Batla mafoko ka bokao mo dipukeng' },
      readAloud: { title: 'Bala ka Lentswe', description: 'Itlhatlhobe go bala ka kaelo e e bonako' },
      fillBlank: { title: 'Tlatsa Sekgala', description: 'Fetsa mafoko ka mafoko a a siameng' },
      wordBuilder: { title: 'Moagi wa Mafoko', description: 'Aga mafoko go tswa mo dikarolo' }
    },
    levels: {
      beginner: 'Simolodi',
      intermediate: 'Fa gare',
      advanced: 'Tsweletse'
    },
    buttons: {
      start: 'Simolola',
      continue: 'Tswelela',
      next: 'Se se latelang',
      check: 'Tlhola',
      skip: 'Tlola',
      hint: 'Kaelo',
      back: 'Morago',
      reset: 'Seta Sesha',
      dashboard: 'Boto'
    },
    feedback: {
      correct: 'Siame!',
      incorrect: 'Leka gape',
      perfect: 'O badile sentle! ⭐⭐⭐',
      okay: 'Gaufi mo. ⭐⭐',
      tryAgain: 'A re lekeng gape.',
      progressSaved: 'Tswelelopele e bolokilwe'
    }
  }
} as const;

export const wordHunt: Record<Language, WordHuntItem[]> = {
  en: [
    { passage: "The happy child ran to the big tree.", prompt: "Tap the word that means joyful.", answers: ["happy"], distractors: ["big", "tree"] },
    { passage: "A quick fox jumped over a small log.", prompt: "Tap the synonym of fast.", answers: ["quick"], distractors: ["small", "log"] },
    { passage: "It was a light meal before the race.", prompt: "In this sentence, what does 'light' mean?", answers: ["light"], distractors: ["meal", "race"] },
    { passage: "The bright sun shone through the window.", prompt: "Find the word that means shining.", answers: ["bright"], distractors: ["sun", "window"] },
    { passage: "She felt sad when her friend moved away.", prompt: "Which word shows an emotion?", answers: ["sad"], distractors: ["friend", "moved"] }
  ],
  zu: [
    { passage: "Ingane ejabulile yagijima iya esihlahleni esikhulu.", prompt: "Khetha igama elisho 'joyful'.", answers: ["ejabulile"], distractors: ["esikhulu", "isihlahla"] },
    { passage: "Ifosi esheshayo yagxuma phezu kweplanga elincane.", prompt: "Khetha igama elisho 'fast'.", answers: ["esheshayo"], distractors: ["elincane", "iplanga"] },
    { passage: "Bekungukudla okulula ngaphambi komjaho.", prompt: "Lapha 'okulula' kusho ini?", answers: ["okulula"], distractors: ["ukudla", "umjaho"] },
    { passage: "Ilanga elikhanyayo lakhanya ngefasitela.", prompt: "Thola igama elisho 'shining'.", answers: ["elikhanyayo"], distractors: ["ilanga", "ifasitela"] },
    { passage: "Wazizwa elusizi lapho umngane wakhe ehamba.", prompt: "Yiliphi igama elikhombisa umuzwa?", answers: ["elusizi"], distractors: ["umngane", "ehamba"] }
  ],
  af: [
    { passage: "Die bly kind hardloop na die groot boom.", prompt: "Tik die woord wat 'joyful' beteken.", answers: ["bly"], distractors: ["groot", "boom"] },
    { passage: "'n Vinnige jakkals spring oor 'n klein stomp.", prompt: "Tik die sinoniem vir 'fast'.", answers: ["Vinnige"], distractors: ["klein", "stomp"] },
    { passage: "Dit was 'n ligte ete voor die wedren.", prompt: "Wat beteken 'ligte' hier?", answers: ["ligte"], distractors: ["ete", "wedren"] },
    { passage: "Die helder son skyn deur die venster.", prompt: "Vind die woord wat 'shining' beteken.", answers: ["helder"], distractors: ["son", "venster"] },
    { passage: "Sy was hartseer toe haar vriend wegtrek.", prompt: "Watter woord wys 'n emosie?", answers: ["hartseer"], distractors: ["vriend", "wegtrek"] }
  ],
  tn: [
    { passage: "Ngwana yo o itumeleng o ne a tabogela setlhareng se segolo.", prompt: "Tobetsa lefoko le le rayang 'joyful'.", answers: ["itumeleng"], distractors: ["segolo", "setlhare"] },
    { passage: "Phokojwe e e bonako e ne ya tlola godimo ga logong lo lonnye.", prompt: "Tobetsa lefoko le le tshwanang le 'fast'.", answers: ["bonako"], distractors: ["lonnye", "logong"] },
    { passage: "E ne e le dijo tse di bobebe pele ga lebelo.", prompt: "Mo polelong eno, 'bobebe' e kaya eng?", answers: ["bobebe"], distractors: ["dijo", "lebelo"] },
    { passage: "Letsatsi le le phadimang le ne la phatsima mo fensthereng.", prompt: "Bona lefoko le le rayang 'shining'.", answers: ["phadimang"], distractors: ["letsatsi", "fensthering"] },
    { passage: "O ne a utlwa bohutsana fa tsala ya gagwe e ne ya tsamaya.", prompt: "Ke lefoko lefe le le bontshang maikutlo?", answers: ["bohutsana"], distractors: ["tsala", "tsamaya"] }
  ]
};

export const readAloud: Record<Language, ReadAloudItem[]> = {
  en: [
    { text: "The cat sits on the mat.", syllables: "The cat sits on the mat." },
    { text: "The baker bakes fresh bread.", syllables: "The ba-ker bakes fresh bread." },
    { text: "After the rain, the bright rainbow appeared.", syllables: "Af-ter the rain, the bright rain-bow ap-peared." },
    { text: "Children play in the sunny garden.", syllables: "Chil-dren play in the sun-ny gar-den." },
    { text: "The blue bird sings sweetly in the morning.", syllables: "The blue bird sings sweet-ly in the mor-ning." }
  ],
  zu: [
    { text: "Ikati ihlezi emacansini.", syllables: "I-ka-ti i-hle-zi e-ma-can-si-ni." },
    { text: "Umbhaki ubhaka isinkwa esisha.", syllables: "U-mbha-ki u-bha-ka i-sin-kwa e-si-sha." },
    { text: "Ngemva kwemvula, kwavela uthingo lwenkosazana.", syllables: "Nge-mva kwe-mvu-la, kwa-ve-la u-thin-go lwen-ko-sa-za-na." },
    { text: "Izingane zidlala engadini enelanga.", syllables: "I-zi-nga-ne zi-dla-la e-nga-di-ni e-ne-la-nga." },
    { text: "Inyoni eluhlaza icula kahle ekuseni.", syllables: "I-nyo-ni e-lu-hla-za i-cu-la ka-hle e-ku-se-ni." }
  ],
  af: [
    { text: "Die kat sit op die mat.", syllables: "Die kat sit op die mat." },
    { text: "Die bakker bak vars brood.", syllables: "Die bak-ker bak vars brood." },
    { text: "Na die reën het 'n helder reënboog verskyn.", syllables: "Na die reën het 'n hel-der reën-boog ver-skyn." },
    { text: "Kinders speel in die sonnige tuin.", syllables: "Kin-ders speel in die son-ni-ge tuin." },
    { text: "Die blou voël sing mooi in die oggend.", syllables: "Die blou vo-ël sing mooi in die og-gend." }
  ],
  tn: [
    { text: "Katse e dule mo mateng.", syllables: "Ka-tse e du-le mo ma-te-ng." },
    { text: "Mobaki o baka senkgwe se sesha.", syllables: "Mo-ba-ki o ba-ka sen-kgwe se se-sha." },
    { text: "Morago ga pula, go ne ga tlhaga mowa o o phadimang.", syllables: "Mo-ra-go ga pu-la, go ne ga tlha-ga mo-wa o o pha-di-mang." },
    { text: "Bana ba tshameka mo tshimong e e nang le letsatsi.", syllables: "Ba-na ba tsha-me-ka mo tshi-mo-ng e e na-ng le le-tsa-tsi." },
    { text: "Nonyane e e talasetso e opela sentle mo mosong.", syllables: "No-nya-ne e e ta-la-se-tso e o-pe-la sen-tle mo mo-so-ng." }
  ]
};

export const fillBlank: Record<Language, FillBlankItem[]> = {
  en: [
    { sentence: "The boy is ___ to school.", options: ["walking", "walk", "walked"], answer: "walking", hint: "Think about action happening now" },
    { sentence: "The dog drank ___.", options: ["water", "waters", "watering"], answer: "water", hint: "What do animals drink?" },
    { sentence: "She sat ___ the tree for shade.", options: ["under", "over", "behind"], answer: "under", hint: "Where do you go for shade?" },
    { sentence: "The ___ is shining brightly today.", options: ["sun", "moon", "star"], answer: "sun", hint: "What shines during the day?" },
    { sentence: "I need to ___ my homework.", options: ["do", "did", "doing"], answer: "do", hint: "What comes after 'need to'?" }
  ],
  zu: [
    { sentence: "Umfana uya ___ esikoleni.", options: ["ngokuhamba", "ukuhamba", "wahamba"], answer: "ngokuhamba", hint: "Cabanga ngento eyenzeka manje" },
    { sentence: "Inja iphuza ___.", options: ["amanzi", "amanzi amaningi", "isinkwa"], answer: "amanzi", hint: "Yini ezilwane eziyiphuzayo?" },
    { sentence: "Uhleli ___ isihlahla ukuze athole umthunzi.", options: ["ngaphansi", "phezulu", "ngemuva"], answer: "ngaphansi", hint: "Uyaphi uma ufuna umthunzi?" },
    { sentence: "___ likhanya kakhulu namuhla.", options: ["Ilanga", "Inyanga", "Inkanyezi"], answer: "Ilanga", hint: "Yini ekhanya emini?" },
    { sentence: "Ngidinga ___ umsebenzi wesikole.", options: ["ukwenza", "ngenza", "ngizokwenza"], answer: "ukwenza", hint: "Yini elandela 'ngidinga'?" }
  ],
  af: [
    { sentence: "Die seun ___ skool toe.", options: ["loop", "looping", "geloop"], answer: "loop", hint: "Dink aan aksie wat nou gebeur" },
    { sentence: "Die hond het ___ gedrink.", options: ["water", "waters", "waterig"], answer: "water", hint: "Wat drink diere?" },
    { sentence: "Sy sit ___ die boom vir koelte.", options: ["onder", "oor", "agter"], answer: "onder", hint: "Waar gaan jy vir skaduwee?" },
    { sentence: "Die ___ skyn helder vandag.", options: ["son", "maan", "ster"], answer: "son", hint: "Wat skyn gedurende die dag?" },
    { sentence: "Ek moet my huiswerk ___.", options: ["doen", "gedoen", "aan die doen"], answer: "doen", hint: "Wat kom na 'moet'?" }
  ],
  tn: [
    { sentence: "Mosimane o ___ sekolong.", options: ["ya", "ne a ya", "ile"], answer: "ya", hint: "Akanya ka tiro e e diragalang jaanong" },
    { sentence: "Ntsa e nwile ___.", options: ["metsi", "metsi a mantsi", "senkgwe"], answer: "metsi", hint: "Diphoofolo di nwa eng?" },
    { sentence: "O ne a dula ___ setlhare go batla moriti.", options: ["fa tlase", "fa godimo", "kwa morago"], answer: "fa tlase", hint: "O ya kae fa o batla moriti?" },
    { sentence: "___ le a phatsima thata gompieno.", options: ["Letsatsi", "Ngwedi", "Naledi"], answer: "Letsatsi", hint: "Ke eng se se phatshimang motshegare?" },
    { sentence: "Ke tlhoka go ___ tiro ya sekolo.", options: ["dira", "dirile", "dirang"], answer: "dira", hint: "Ke eng se se latelang 'tlhoka go'?" }
  ]
};

export const wordBuilder: Record<Language, WordBuilderItem[]> = {
  en: [
    { hint: "A fruit that is red or green", tiles: ["ap", "ple"], answer: "apple" },
    { hint: "You drink this", tiles: ["wa", "ter"], answer: "water" },
    { hint: "Opposite of slow", tiles: ["fast"], answer: "fast" },
    { hint: "A place where you learn", tiles: ["sch", "ool"], answer: "school" },
    { hint: "Something you read", tiles: ["bo", "ok"], answer: "book" }
  ],
  zu: [
    { hint: "Isithelo esibomvu noma esiluhlaza", tiles: ["i", "a", "pu", "la"], answer: "iapula" },
    { hint: "Okujwayelekile ukuphuza", tiles: ["a", "ma", "nzi"], answer: "amanzi" },
    { hint: "Okuphambene nokuhamba kancane", tiles: ["she", "sha"], answer: "shesha" },
    { hint: "Indawo lapho ufunda khona", tiles: ["i", "si", "ko", "le"], answer: "isikole" },
    { hint: "Into oyifundayo", tiles: ["in", "cwa", "di"], answer: "incwadi" }
  ],
  af: [
    { hint: "'n Vrug wat rooi of groen is", tiles: ["ap", "pel"], answer: "appel" },
    { hint: "Jy drink dit", tiles: ["wa", "ter"], answer: "water" },
    { hint: "Teenoorgestelde van stadig", tiles: ["vin", "nig"], answer: "vinnig" },
    { hint: "'n Plek waar jy leer", tiles: ["sk", "ool"], answer: "skool" },
    { hint: "Iets wat jy lees", tiles: ["bo", "ek"], answer: "boek" }
  ],
  tn: [
    { hint: "Maungo a a khibidu kgotsa a a talasetso", tiles: ["a", "pe", "le"], answer: "apele" },
    { hint: "Se o se nwang", tiles: ["me", "tsi"], answer: "metsi" },
    { hint: "Se se farologaneng le go nna bonya", tiles: ["bo", "na", "ko"], answer: "bonako" },
    { hint: "Lefelo le o ithutang gone", tiles: ["se", "ko", "lo"], answer: "sekolo" },
    { hint: "Selo se o se buisang", tiles: ["bu", "ka"], answer: "buka" }
  ]
};
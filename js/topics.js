// Question library: which tree nodes make up each topic page.
//
// `answer` is the one-line answer shown under the question on the home page
// and at the top of its page, and `sources` link to what backs it up: every
// factual claim in an answer needs one. Each topic page then shows its `main` nodes (the
// evidence), then one section
// per `objections` node, headed by the answer option that leads to it in the
// journey. `contactNode` swaps in a dead end's message above the contact
// form, and `stepsFrom` shows a conclusion's next-step links.
//
// Run `node scripts/build-library.mjs` after editing this file or the tree
// to regenerate index.html, ar/index.html and the q/ pages.

export const SECTIONS = [
  {
    id: "god",
    title: { en: "Is there a Creator?", ar: "هل للكون خالق؟" },
    topics: ["reality", "beginning", "cause", "one-god", "suffering"],
  },
  {
    id: "revelation",
    title: { en: "Revelation and the Prophet ﷺ", ar: "الوحي والنبي ﷺ" },
    topics: ["revelation", "muhammad"],
  },
  {
    id: "quran",
    title: { en: "The Quran", ar: "القرآن الكريم" },
    topics: ["quran-preserved", "quran-science", "quran-literary"],
  },
  {
    id: "meaning",
    title: { en: "Meaning", ar: "المعنى" },
    topics: ["purpose"],
  },
];

export const TOPICS = {
  "reality": {
    title: { en: "Can we know that anything is real?", ar: "هل يمكننا أن نعرف أن شيئًا ما حقيقي؟" },
    answer: {
      en: "Yes. Even doubting proves that something is real, and no one lives as if nothing is.",
      ar: "نعم. فالشكّ نفسه دليل على أن شيئًا ما موجود، ولا أحد يعيش كأن لا شيء حقيقي.",
    },
    summary: {
      en: "Before asking where the universe came from, it is fair to ask whether we can trust that it exists at all.",
      ar: "قبل أن نسأل من أين جاء الكون، من الإنصاف أن نسأل: هل يمكننا الوثوق بأنه موجود أصلًا؟",
    },
    main: [],
    objections: ["atheist_reality_doubt", "atheist_reality_skeptic", "atheist_reality_simulation"],
  },
  "beginning": {
    title: { en: "Did the universe have a beginning?", ar: "هل كان للكون بداية؟" },
    answer: {
      en: "Yes. Planck’s measurements put its age at about 13.8 billion years.",
      ar: "نعم. تُقدّر قياسات مرصد بلانك عمره بنحو 13.8 مليار سنة.",
    },
    sources: [
      { label: { en: "ESA, Planck 2013", ar: "وكالة الفضاء الأوروبية، بلانك 2013" }, url: "https://www.esa.int/Science_Exploration/Space_Science/Planck/Planck_reveals_an_almost_perfect_Universe" },
    ],
    summary: {
      en: "What modern cosmology says about whether the universe has always existed.",
      ar: "ماذا يقول علم الكونيات الحديث عن كون الكون أزليًا أم لا.",
    },
    main: ["atheist_beginning"],
    objections: ["atheist_eternal_rebuttal", "atheist_science_beginning"],
  },
  "cause": {
    title: { en: "Does the universe need a cause?", ar: "هل يحتاج الكون إلى سبب؟" },
    answer: {
      en: "Yes. Nothing begins without a cause, so something outside space and time caused it.",
      ar: "نعم. لا شيء يبدأ بلا سبب، فلا بد أن سببه شيء خارج المكان والزمان.",
    },
    summary: {
      en: "If the universe began, what could explain its beginning? Quantum physics, infinite chains and simulations, examined one by one.",
      ar: "إن كان للكون بداية، فما الذي يفسّر بدايته؟ نتناول فيزياء الكم والسلاسل اللانهائية والمحاكاة واحدةً تلو الأخرى.",
    },
    main: ["atheist_cause", "atheist_creator_exists"],
    objections: [
      "atheist_quantum_rebuttal",
      "atheist_self_cause_rebuttal",
      "atheist_infinite_regress",
      "atheist_simulation",
      "atheist_we_dont_know",
    ],
  },
  "one-god": {
    title: { en: "One Creator or many?", ar: "خالق واحد أم خالقون متعددون؟" },
    answer: {
      en: "One. The same laws hold everywhere, which points to one will, not rival gods.",
      ar: "خالق واحد. فالقوانين نفسها تسري في كل مكان، وهذا يدل على إرادة واحدة لا على آلهة متنازعة.",
    },
    sources: [
      { label: { en: "Quran 21:22", ar: "سورة الأنبياء 22" }, url: "https://quran.com/21/22" },
    ],
    summary: {
      en: "Why the unity of natural law points to a single source.",
      ar: "لماذا تشير وحدة القوانين الطبيعية إلى مصدر واحد.",
    },
    main: ["atheist_one_or_many", "polytheist_start"],
    objections: ["multiple_creators_rebuttal", "polytheist_rebuttal"],
  },
  "suffering": {
    title: { en: "If God exists, why is there suffering?", ar: "إن كان الله موجودًا، فلماذا يوجد الألم والمعاناة؟" },
    answer: {
      en: "Suffering doesn’t disprove God. The Quran says this life is a test.",
      ar: "الألم لا ينفي وجود الله. والقرآن يقول إن هذه الحياة اختبار.",
    },
    sources: [
      { label: { en: "Quran 67:2", ar: "سورة الملك 2" }, url: "https://quran.com/67/2" },
    ],
    summary: {
      en: "The hardest question many people ask, taken seriously.",
      ar: "أصعب سؤال يطرحه كثير من الناس، نتناوله بجدية.",
    },
    main: [],
    objections: ["agnostic_evil", "agnostic_evil_innocent", "agnostic_evil_design"],
    contactNode: "agnostic_evil_personal",
  },
  "revelation": {
    title: { en: "Would the Creator communicate with us?", ar: "هل يتواصل الخالق معنا؟" },
    answer: {
      en: "Yes. A Creator who gave us reason and a conscience would not leave us without guidance.",
      ar: "نعم. فالخالق الذي منحنا العقل والضمير لا يتركنا بلا هداية.",
    },
    summary: {
      en: "If there is a Creator, would it leave us without guidance? And how would we recognise guidance if it came?",
      ar: "إن كان هناك خالق، فهل يتركنا بلا هداية؟ وكيف نتعرّف على الهداية إن جاءت؟",
    },
    main: ["creator_communicates"],
    objections: ["creator_no_communicate_rebuttal", "how_to_know_messenger", "agnostic_too_many"],
  },
  "muhammad": {
    title: { en: "Who was Muhammad ﷺ?", ar: "من هو محمد ﷺ؟" },
    answer: {
      en: "A man his own people said they had never found telling anything but the truth. He began receiving revelation at forty.",
      ar: "رجل قال عنه قومه: «ما جرّبنا عليك إلا صدقًا». وبدأ الوحي ينزل عليه في الأربعين.",
    },
    sources: [
      { label: { en: "Sahih al-Bukhari 4770", ar: "صحيح البخاري 4770" }, url: "https://sunnah.com/bukhari:4770" },
      { label: { en: "Sahih al-Bukhari 3902", ar: "صحيح البخاري 3902" }, url: "https://sunnah.com/bukhari:3902" },
    ],
    summary: {
      en: "How to evaluate someone who claims to be a messenger, and what history records about Muhammad ﷺ.",
      ar: "كيف نقيّم من يدّعي أنه رسول، وماذا يسجّل التاريخ عن محمد ﷺ.",
    },
    main: ["which_messenger", "prophet_character", "prophet_message", "prophet_miracles"],
    objections: ["prophet_illiterate"],
  },
  "quran-preserved": {
    title: { en: "Is the Quran preserved?", ar: "هل القرآن محفوظ؟" },
    answer: {
      en: "Yes. Pages radiocarbon-dated to 568–645, close to the Prophet’s ﷺ lifetime, are “very close to the form of the Qur’an read today.”",
      ar: "نعم. صفحات أُرّخت بالكربون المشع بين 568 و645م، قريبًا من زمن النبي ﷺ، «قريبة جدًا من صورة القرآن الذي يُقرأ اليوم».",
    },
    sources: [
      { label: { en: "University of Birmingham, 2015", ar: "جامعة برمنغهام، 2015" }, url: "https://www.birmingham.ac.uk/news/2015/birmingham-quran-manuscript-dated-among-the-oldest-in-the-world" },
    ],
    summary: {
      en: "How the Quran has been transmitted, and how that can be checked.",
      ar: "كيف نُقل القرآن، وكيف يمكن التحقق من ذلك.",
    },
    main: ["quran_intro"],
    objections: ["quran_preservation_evidence"],
  },
  "quran-science": {
    title: { en: "Does the Quran contain knowledge ahead of its time?", ar: "هل يحتوي القرآن على معارف سبقت عصرها؟" },
    answer: {
      en: "Revealed in the 7th century, it describes the embryo growing in stages and the universe expanding.",
      ar: "نزل في القرن السابع، ويصف نموّ الجنين على مراحل، وتوسّع الكون.",
    },
    sources: [
      { label: { en: "Quran 23:12–14", ar: "سورة المؤمنون 12–14" }, url: "https://quran.com/23/12-14" },
      { label: { en: "Quran 51:47", ar: "سورة الذاريات 47" }, url: "https://quran.com/51/47" },
    ],
    summary: {
      en: "The descriptions of nature in the Quran, and the most common objections to them.",
      ar: "أوصاف الطبيعة في القرآن، وأكثر الاعتراضات شيوعًا عليها.",
    },
    main: ["quran_scientific", "quran_scientific_more"],
    objections: ["embryo_rebuttal", "quran_borrowed_rebuttal", "quran_coincidence_rebuttal"],
  },
  "quran-literary": {
    title: { en: "The Quran's literary challenge", ar: "التحدي البلاغي للقرآن" },
    answer: {
      en: "It challenges anyone who doubts it to produce one chapter like it. The challenge still stands.",
      ar: "يتحدّى كل من يشكّ فيه أن يأتي بسورة من مثله، وما زال التحدي قائمًا.",
    },
    sources: [
      { label: { en: "Quran 2:23", ar: "سورة البقرة 23" }, url: "https://quran.com/2/23" },
    ],
    summary: {
      en: "The Quran challenged its audience to produce a single chapter like it. What exactly is that challenge?",
      ar: "تحدّى القرآن مخاطَبيه أن يأتوا بسورة من مثله. فما طبيعة هذا التحدي بالضبط؟",
    },
    main: ["quran_literary"],
    objections: ["literary_rebuttal"],
  },
  "purpose": {
    title: { en: "What is the purpose of life?", ar: "ما الغاية من الحياة؟" },
    answer: {
      en: "To know and worship God, and to live by His guidance.",
      ar: "أن نعرف الله ونعبده، ونعيش بهدايته.",
    },
    sources: [
      { label: { en: "Quran 51:56", ar: "سورة الذاريات 56" }, url: "https://quran.com/51/56" },
    ],
    summary: {
      en: "Islam's answer, and what follows if life has no given purpose.",
      ar: "جواب الإسلام، وما الذي يترتب إن لم يكن للحياة غاية محددة.",
    },
    main: ["purpose_of_life", "islam_purpose_answer"],
    objections: ["no_purpose_rebuttal", "self_purpose_rebuttal"],
    stepsFrom: "conclusion_positive",
  },
};

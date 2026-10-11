// Question library: which tree nodes make up each topic page.
//
// Each topic page shows its `main` nodes first (the case), then one section
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
    summary: {
      en: "Before asking where the universe came from, it is fair to ask whether we can trust that it exists at all.",
      ar: "قبل أن نسأل من أين جاء الكون، من الإنصاف أن نسأل: هل يمكننا الوثوق بأنه موجود أصلًا؟",
    },
    main: [],
    objections: ["atheist_reality_doubt", "atheist_reality_skeptic", "atheist_reality_simulation"],
  },
  "beginning": {
    title: { en: "Did the universe have a beginning?", ar: "هل كان للكون بداية؟" },
    summary: {
      en: "What modern cosmology says about whether the universe has always existed.",
      ar: "ماذا يقول علم الكونيات الحديث عن كون الكون أزليًا أم لا.",
    },
    main: ["atheist_beginning"],
    objections: ["atheist_eternal_rebuttal", "atheist_science_beginning"],
  },
  "cause": {
    title: { en: "Does the universe need a cause?", ar: "هل يحتاج الكون إلى سبب؟" },
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
    summary: {
      en: "Why the unity of natural law points to a single source.",
      ar: "لماذا تشير وحدة القوانين الطبيعية إلى مصدر واحد.",
    },
    main: ["atheist_one_or_many", "polytheist_start"],
    objections: ["multiple_creators_rebuttal", "polytheist_rebuttal"],
  },
  "suffering": {
    title: { en: "If God exists, why is there suffering?", ar: "إن كان الله موجودًا، فلماذا يوجد الألم والمعاناة؟" },
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
    summary: {
      en: "If there is a Creator, would it leave us without guidance? And how would we recognise guidance if it came?",
      ar: "إن كان هناك خالق، فهل يتركنا بلا هداية؟ وكيف نتعرّف على الهداية إن جاءت؟",
    },
    main: ["creator_communicates"],
    objections: ["creator_no_communicate_rebuttal", "how_to_know_messenger", "agnostic_too_many"],
  },
  "muhammad": {
    title: { en: "Who was Muhammad ﷺ?", ar: "من هو محمد ﷺ؟" },
    summary: {
      en: "How to evaluate someone who claims to be a messenger, and what history records about Muhammad ﷺ.",
      ar: "كيف نقيّم من يدّعي أنه رسول، وماذا يسجّل التاريخ عن محمد ﷺ.",
    },
    main: ["which_messenger", "prophet_character", "prophet_message", "prophet_miracles"],
    objections: ["prophet_illiterate"],
  },
  "quran-preserved": {
    title: { en: "Is the Quran preserved?", ar: "هل القرآن محفوظ؟" },
    summary: {
      en: "How the Quran has been transmitted, and how that can be checked.",
      ar: "كيف نُقل القرآن، وكيف يمكن التحقق من ذلك.",
    },
    main: ["quran_intro"],
    objections: ["quran_preservation_evidence"],
  },
  "quran-science": {
    title: { en: "Does the Quran contain knowledge ahead of its time?", ar: "هل يحتوي القرآن على معارف سبقت عصرها؟" },
    summary: {
      en: "The descriptions of nature in the Quran, and the most common objections to them.",
      ar: "أوصاف الطبيعة في القرآن، وأكثر الاعتراضات شيوعًا عليها.",
    },
    main: ["quran_scientific", "quran_scientific_more"],
    objections: ["embryo_rebuttal", "quran_borrowed_rebuttal", "quran_coincidence_rebuttal"],
  },
  "quran-literary": {
    title: { en: "The Quran's literary challenge", ar: "التحدي البلاغي للقرآن" },
    summary: {
      en: "The Quran challenged its audience to produce a single chapter like it. What exactly is that challenge?",
      ar: "تحدّى القرآن مخاطَبيه أن يأتوا بسورة من مثله. فما طبيعة هذا التحدي بالضبط؟",
    },
    main: ["quran_literary"],
    objections: ["literary_rebuttal"],
  },
  "purpose": {
    title: { en: "What is the purpose of life?", ar: "ما الغاية من الحياة؟" },
    summary: {
      en: "Islam's answer, and what follows if life has no given purpose.",
      ar: "جواب الإسلام، وما الذي يترتب إن لم يكن للحياة غاية محددة.",
    },
    main: ["purpose_of_life", "islam_purpose_answer"],
    objections: ["no_purpose_rebuttal", "self_purpose_rebuttal"],
    stepsFrom: "conclusion_positive",
  },
};

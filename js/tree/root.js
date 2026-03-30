export const rootNodes = {
  "start": {
    "id": "start",
    "type": "question",
    "status": "live",
    "content": {
      "en": {
        "question": "Before we begin, how would you describe yourself?",
        "subtitle": "This helps us tailor the journey to where you are right now."
      },
      "ar": {
        "question": "قبل أن نبدأ، كيف تصف نفسك؟",
        "subtitle": "سيساعدنا ذلك في تخصيص الرحلة لتناسب موقفك الآن."
      }
    },
    "options": [
      {
        "label": {
          "en": "I don't believe in any God",
          "ar": "لا أؤمن بوجود إله"
        },
        "next": "atheist_universe"
      },
      {
        "label": {
          "en": "I believe in many gods",
          "ar": "أؤمن بوجود آلهة متعددة"
        },
        "next": "polytheist_start"
      },
      {
        "label": {
          "en": "I believe in one God, but not Islam",
          "ar": "أؤمن بإله واحد، لكنني لست مسلمًا"
        },
        "next": "monotheist_start"
      },
      {
        "label": {
          "en": "I'm not sure what I believe",
          "ar": "لست متأكدًا مما أؤمن به"
        },
        "next": "agnostic_start"
      },
      {
        "label": {
          "en": "I'm Muslim but have questions",
          "ar": "أنا مسلم لكن لديّ تساؤلات"
        },
        "next": "muslim_doubts"
      }
    ],
    "evidence": null,
    "steps": [],
    "showContact": false,
    "notes": ""
  },
  "muslim_doubts": {
    "id": "muslim_doubts",
    "type": "question",
    "status": "draft",
    "content": {
      "en": {
        "question": "What area do your questions relate to? test",
        "subtitle": "Having questions is a sign of a thinking mind — not weak faith."
      },
      "ar": {
        "question": "في أي مجال تقع تساؤلاتك؟",
        "subtitle": "التساؤل علامة على عقل متفكر — لا على ضعف الإيمان."
      }
    },
    "options": [
      {
        "label": {
          "en": "Scientific questions about Islam",
          "ar": "تساؤلات علمية حول الإسلام"
        },
        "next": "quran_scientific"
      },
      {
        "label": {
          "en": "Historical questions about the Prophet ﷺ",
          "ar": "تساؤلات تاريخية حول النبي ﷺ"
        },
        "next": "muhammad_intro"
      },
      {
        "label": {
          "en": "Personal — I struggle to feel connected to God",
          "ar": "شخصي — أجد صعوبة في الشعور بالارتباط بالله"
        },
        "next": "muslim_personal"
      },
      {
        "label": {
          "en": "Questions about Islamic law or practice",
          "ar": "تساؤلات حول الشريعة الإسلامية أو الممارسة الدينية"
        },
        "next": "muslim_law"
      }
    ],
    "evidence": null,
    "steps": [],
    "showContact": false,
    "notes": ""
  }
};

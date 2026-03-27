import { rootNodes } from "./root.js";
import { atheistNodes } from "./atheist.js";
import { agnosticNodes } from "./agnostic.js";
import { monotheistNodes } from "./monotheist.js";
import { polytheistNodes } from "./polytheist.js";
import { messengerNodes } from "./messenger.js";
import { quranNodes } from "./quran.js";
import { purposeNodes } from "./purpose.js";
import { conclusionNodes } from "./conclusions.js";
import { deadEndNodes } from "./dead_ends.js";

export const TREE = {
  ...rootNodes,
  ...atheistNodes,
  ...agnosticNodes,
  ...monotheistNodes,
  ...polytheistNodes,
  ...messengerNodes,
  ...quranNodes,
  ...purposeNodes,
  ...conclusionNodes,
  ...deadEndNodes,
};

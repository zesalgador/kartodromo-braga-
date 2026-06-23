import { pt } from "./pt";
import { en } from "./en";
import { es } from "./es";
import { fr } from "./fr";
import type { Locale, Translations } from "../types";

export const translations: Record<Locale, Translations> = { pt, en, es, fr };

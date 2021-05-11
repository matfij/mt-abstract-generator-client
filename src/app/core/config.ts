import { AnswerModel, SummaryModel } from "../client/constants";

/**
 * Internationalization
 */
export const DEFAULT_LANG = 'en';
export const AVAILABLE_LANGS = ['en'];

/**
 * Abstract generation
 */
export const MIN_KEY_LENGTH = 3;
export const MAX_KEY_LENGTH = 255;

export const MIN_PHRASE_LENGTH = 3;
export const MAX_PHRASE_LENGTH = 127;

export const MIN_PAGE_NUMBER = 10;
export const MAX_PAGE_NUMBER = 50;
export const DEFAULT_PAGE_NUMBER = 25;

export const DEFAULT_ANSWER_MODEL = AnswerModel.ElectraSquad;
export const DEFAULT_SUMMARY_MODEL = SummaryModel.DistillBartCnn;

/**
 * Poll rating
 */
export const MIN_SCORE = 0;
export const MAX_SCORE = 10;
export const DEFAULT_SCORE = 0;

export const MAX_COMMENT_LENGTH = 511;

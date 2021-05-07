export const DEFAULT_LANG = 'en';
export const AVAILABLE_LANGS = ['en'];

export const MIN_PAGE_NUMBER = 10;
export const MAX_PAGE_NUMBER = 50;
export const DEFAULT_PAGE_NUMBER = 25;

export enum AnswerModel {
  SpanBertSquad = 1,
  ElectraSquad = 2
}

export enum SummaryModel {
  DistillBartCnn = 1,
  DistillPegasusCnn = 2
}

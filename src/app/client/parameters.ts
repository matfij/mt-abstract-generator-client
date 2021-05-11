import { AnswerModel, SummaryModel, TesterClass } from "./constants";

export interface GenerateAbstractParams {
  phrase: string;
  page_number: number;
  answer_model: AnswerModel;
  summary_model: SummaryModel
}

export interface PollParams {
  key: string;
  phrase: string;
  answer_model: AnswerModel;
  summary_model: SummaryModel;
  page_number: number;
  answer_score: number;
  summary_score: number;
  time_score: number;
  answer: string;
  summary: string;
  comment: string;
}

export interface KeyParams {
  key: string;
  tester_name: string;
  tester_class: TesterClass;
  active: boolean;
  use_limit?: number;
}

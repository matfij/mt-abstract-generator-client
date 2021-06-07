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
  answer_score_logical: number;
  answer_score_grammatical: number;
  summary_score_logical: number;
  summary_score_grammatical: number;
  time_score: number;
  execution_time: number;
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

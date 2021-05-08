import { AnswerModel, SummaryModel } from "../core/config";

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

import { AnswerModel, SummaryModel } from "../core/config";

export interface AbstractModel {
  answer: string;
  summary: string;
}

export interface PollModel {
  key: string;
  date: string;
  phrase: string;
  answer_model: AnswerModel;
  summary_model: SummaryModel;
  page_number: number;
  answer_score: number;
  summary_score: number;
  time_score: number;
  answer: string;
  summary: string
  comment: string;
}

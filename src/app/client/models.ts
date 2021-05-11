import { AnswerModel, SummaryModel, TesterClass } from "./constants";

export interface ResponseMessage {
  status?: number;
  message?: string;
}

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

export interface KeyModel {
  id: number;
  key: string;
  tester_name: string;
  tester_class: TesterClass;
  active: boolean;
  use_count: number;
  use_limit: number;
  creation_date: string;
}

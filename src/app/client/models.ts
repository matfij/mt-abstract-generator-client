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
  id?: number;
  key: string;
  date: string;
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
  summary: string
  comment: string;
}

export interface KeyModel {
  id?: number;
  key: string;
  tester_name: string;
  tester_class?: TesterClass;
  active?: boolean;
  use_count?: number;
  use_limit?: number;
  creation_date?: string;
  last_used?: string;
}

export interface PollsStatistics {
  meanPageNumber: number;
  meanAnswerScoreLogical: number;
  meanAnswerScoreGrammatical: number;
  meanSummaryScoreLogical: number;
  meanSummaryScoreGrammatical: number;
}

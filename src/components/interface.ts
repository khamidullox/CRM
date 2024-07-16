export interface LoaderHome {
  comment: any[];
  designer: {
    results: [];
  };
  issue: any[];
}

export interface CommentItem {
  id: number;
  issue: string;
  designer: {
    username: string;
    avatar: string;
    thumbnails: {
      avatar: string;
      avatar_2x: string;
    };
  };
  date_created: string;
  message: string;
  newDate: string;
}

export interface Language {
  lang: string;
}

export interface DesingerItem {
  avatar: string;
  username: string;
  email: string;
  issues: [];
  counterDone: number;
  counterProgres: number;
}
export interface DesingerIssues {
  key: string;
  date_created: string;
  status: string;
}
export interface Task {
  id: number;
  status: string;
  date_finished: string;
  received_from_client: number;
  send_to_project_manager: number;
  send_to_account_manager: number;
  send_to_designer: number;
}

export interface ProcessedData {
  week: number;
  profit: number;
  expenses: number;
  difference: number;
}

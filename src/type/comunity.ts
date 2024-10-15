export type comment = {
  User_ID: string;
  feed_ID: string;
  Comment_ID: string | null;
  Comment_Content: string | null;
};

export type user = {
  NickName: string | null;
  UserID: string | null;
  UserImage: string | null;
  User_Challenge: string | null;
  User_Introduction: string | null;
};

export type feed = {
  User_ID: string;
  User_feed_ID: string;
  Category: string | null;
  Challenge_Comment: string | null;
  Challenge_Images: string | null;
  Challenge_end_progress: string | null;
  Challenge_start_progress: string | null;
  Feed_Content: string | null;
  progress_icon: string | null;
  Comment: comment[];
  User: user;
};

export type comment = {
  User_ID: string;
  feed_ID: string;
  Comment_ID: number;
  Comment_Content: string;
  Challenge_ID: string;
};

export type user = {
  NickName: string | null;
  UserID: string | null;
  UserImage: string | null;
  User_Challenge: string | null;
  User_Introduction: string | null;
};

export type feed = {
  Title: string;
  User_ID: string;
  User_feed_ID: string;
  Category: string | null;
  Challenge_Comment: string | null;
  Challenge_Images: string | null;
  End_Date: string;
  Start_Date: string;
  Feed_Content: string | null;
  progress_icon: string | null;
  Comment: comment[];
  Challenge_ID: string;
  User: user;
};

export type searchData = {
  mySearch: string;
  setSearch: Function;
  refetch: Function;
};

export type commentButton = {
  id: number;
  userID: string;
  comentContent: string;
};

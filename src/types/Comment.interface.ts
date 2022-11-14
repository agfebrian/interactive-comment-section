import { User } from "./User.interface";

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: {
    image: Image;
    username: string;
  };
  replies: Reply[];
}

export interface Image {
  png: string;
  webp: string;
}

export interface Reply {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  replyingTo: string;
  user: User;
}

export interface RootObject {
  posts: Post[];
  filters: any[];
}

export interface NewPost {
  file: File | null,
  content: string,
  type: 'image' | 'video'| 'text'| null,
  file_url: string,
}

export interface NewComment {
  post_id: number,
  parent_id: number,
  comment: string,
}

export interface Post {
  id: number;
  content : string;
  image : string;
  image_height : number;
  image_width : number;
  type : 'image' | 'video'| 'text'| null;
  likes_count : number;
  comments_count : number;
  creatd_at : string;
  created_at_formatted : string;
  attendee_id: number;
  attendee: Attendee;
  likes: Like[];
  comments: Comment[];
}

export interface Attendee {
  id: number;
  email: string;
  full_name: string;
  first_name: string;
  last_name: string;
  image: string;
  status: number;
}

export interface Like {
  id: number;
  attendee_id: number;
  attendee: Attendee;
}

export interface Comment {
  id: number;
  comment: string;
  attendee_id: number;
  attendee: Attendee;
  parent_id: number;
  created_at: string;
  created_at_formatted : string;
  replies: Comment[];
  likes: Like[];
}
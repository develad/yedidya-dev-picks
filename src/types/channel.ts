export interface YouTubeChannel {
  name: string;
  url: string;
  description?: string;
  thumbnail?: string;
  subscriberCount?: string;
  category: string;
  subcategory?: string;
  title: string;
  avatar_thumbnail: string;
}

export interface Category {
  name: string;
  subcategories: {
    name: string;
    channels: YouTubeChannel[];
  }[];
}

export interface Channel {
  name: string;
  url: string;
  description?: string;
  subscribers?: string;
  language?: string;
  thumbnail?: string;
  subscriberCount?: string;
  videoCount?: string;
  category?: string;
  subcategory?: string;
  title: string;
  avatar_thumbnail: string;
}

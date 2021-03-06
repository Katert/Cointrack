/** --------------------------------------- Interface for news data --------------------------------------- */

export interface NewsData {
  status: string;
  total_hits: number;
  page: number;
  total_pages: number;
  page_size: number;
  articles: [
    {
      title: string;
      author: string;
      published_date: string;
      published_date_precision: string;
      link: string;
      clean_url: string;
      excerpt: string;
      summary: string;
      rights: string;
      rank: number;
      topic: string;
      country: string;
      language: string;
      authors: string;
      media: string;
      is_opinion: boolean;
      twitter_account: string;
      _score: number;
      id: string;
    }
  ];
}

/** --------------------------------------------------------------------------------------------------------------- */

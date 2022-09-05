export interface AllTagsDto {
  tags: string[];
}
export interface AllArticlesDto {
  articles: ArticleDto[];
  articlesCount: number;
}

export interface CreateArticleDto {
  article: ArticleDto;
}

export interface ArticleDto {
  slug?: string | null;
  title: string | null;
  description: string | null;
  body: string | null;
  tagList: string[] | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  favorited?: boolean | null;
  favoritesCount?: Number | null;
  author?: AuthorDto | null;
}

export interface AuthorDto {
  username: string;
  bio: string;
  image: string;
  following: false;
}

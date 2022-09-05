export interface AllTagsDto {
  tags: string[];
}
export interface AllArticlesDto {
  articles: ArticleDto[];
  articlesCount: number;
}

export interface ArticleBySlugDto {
  article: ArticleDto;
}

export interface CreateArticleDto {
  article: ArticleDto;
}

export interface ArticleDto {
  id?: number;
  slug?: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt?: Date;
  updatedAt?: Date;
  favorited?: boolean;
  favoritesCount?: Number;
  author?: AuthorDto;
}

export interface AuthorDto {
  username: string;
  bio: string;
  image: string;
  following: false;
}

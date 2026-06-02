export interface HeroSectionDto {
  __component: 'sections.hero';
  heading: string;
  subheading?: string;
  badge_text?: string;
  highlighted_text?: string;
  active_learners?: string | number;
  success_rate?: string | number;
  daily_lessons?: string | number;
  hero_image?: { url: string } | null;
  primary_button_text?: string;
  primary_button_link?: string;
  secondary_button_text?: string;
  secondary_button_link?: string;
}

export interface ProductCardDto {
  id: string | number;
  title: string;
  slug: string;
  price: string | number;
  old_price?: string | number;
  thumbnail?: { url: string } | null;
  badge?: string;
  author_name?: string;
  class?: string;
  subject?: string;
  short_description?: string;
  is_best_seller?: boolean;
}

export interface UpdateCardDto {
  id: string | number;
  title: string;
  slug: string;
  publish_date: string;
  type?: string;
  excerpt?: string;
}

export interface JobCardDto {
  id: string | number;
  title: string;
  short_description?: string;
  badge_date?: string;
  link?: string;
}

export interface LatestUpdatesSectionDto {
  __component: 'sections.latest-updates';
  title: string;
  subtitle?: string | null;
  updates: UpdateCardDto[];
  button_text?: string | null;
  button_link?: string | null;
}

export interface BestSellersSectionDto {
  __component: 'sections.best-sellers';
  title: string;
  subtitle?: string | null;
  products: ProductCardDto[];
  button_text?: string | null;
  button_link?: string | null;
}

export interface JobHighlightsSectionDto {
  __component: 'sections.job-highlights';
  title: string;
  jobs: JobCardDto[];
}

export interface CtaBannerSectionDto {
  __component: 'sections.cta-banner';
  heading: string;
  subheading?: string | null;
  primary_button_text?: string | null;
  primary_button_link?: string | null;
  secondary_button_text?: string | null;
  secondary_button_link?: string | null;
}

export interface HomepageResponseDto {
  id: number;
  documentId: string;
  seo_title?: string;
  seo_description?: string;
  sections: Array<
    | HeroSectionDto
    | LatestUpdatesSectionDto
    | BestSellersSectionDto
    | JobHighlightsSectionDto
    | CtaBannerSectionDto
  >;
  globalSettings?: unknown;
}

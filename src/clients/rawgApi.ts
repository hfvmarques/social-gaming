import { AxiosStatic } from 'axios';

export interface RawgApiPlatform {
  readonly name: string;
}

export interface RawgApiGenre {
  readonly id: number;
  readonly name: string;
}

export interface RawgApiEsrbRating {
  readonly id: number;
  readonly name: string;
}

export interface RawgApiGame {
  readonly id: number;
  readonly slug: string;
  readonly name: string;
  readonly released: string;
  readonly background_image: string;
  readonly rating: number;
  readonly rating_top: number;
  readonly rating_count: number;
  readonly metacritic: number;
  readonly updated: Date;
  readonly platforms: RawgApiPlatform[];
  readonly genres: RawgApiGenre[];
  readonly esrb_rating: RawgApiEsrbRating;
}

// export interface RawgApiResponse {
//   readonly data: RawgApiGame[];
// }

export interface Rating {
    id: number;
    title: string;
    count: number;
    percent: number;
}

export interface AddedByStatus {
    yet: number;
    owned: number;
    beaten: number;
    toplay: number;
    dropped: number;
    playing: number;
}

export interface Platform2 {
    id: number;
    name: string;
    slug: string;
    image?: any;
    year_end?: any;
    year_start?: number;
    games_count: number;
    image_background: string;
}

export interface RequirementsEn {
    minimum: string;
    recommended: string;
}

export interface RequirementsRu {
    minimum: string;
    recommended: string;
}

export interface Platform {
    platform: Platform2;
    released_at: string;
    requirements_en: RequirementsEn;
    requirements_ru: RequirementsRu;
}

export interface Platform3 {
    id: number;
    name: string;
    slug: string;
}

export interface ParentPlatform {
    platform: Platform3;
}

export interface Genre {
    id: number;
    name: string;
    slug: string;
    games_count: number;
    image_background: string;
}

export interface Store2 {
    id: number;
    name: string;
    slug: string;
    domain: string;
    games_count: number;
    image_background: string;
}

export interface Store {
    id: number;
    store: Store2;
}

export interface Tag {
    id: number;
    name: string;
    slug: string;
    language: string;
    games_count: number;
    image_background: string;
}

export interface EsrbRating {
    id: number;
    name: string;
    slug: string;
}

export interface ShortScreenshot {
    id: number;
    image: string;
}

export interface Result {
    id: number;
    slug: string;
    name: string;
    released: string;
    tba: boolean;
    background_image: string;
    rating: number;
    rating_top: number;
    ratings: Rating[];
    ratings_count: number;
    reviews_text_count: number;
    added: number;
    added_by_status: AddedByStatus;
    metacritic?: number;
    playtime: number;
    suggestions_count: number;
    updated: Date;
    user_game?: any;
    reviews_count: number;
    saturated_color: string;
    dominant_color: string;
    platforms: Platform[];
    parent_platforms: ParentPlatform[];
    genres: Genre[];
    stores: Store[];
    clip?: any;
    tags: Tag[];
    esrb_rating: EsrbRating;
    short_screenshots: ShortScreenshot[];
}

export interface Year2 {
    year: number;
    count: number;
    nofollow: boolean;
}

export interface Year {
    from: number;
    to: number;
    filter: string;
    decade: number;
    years: Year2[];
    nofollow: boolean;
    count: number;
}

export interface Filters {
    years: Year[];
}

export interface ApiResponseObject {
    count: number;
    next: string;
    previous?: any;
    results: Result[];
    seo_title: string;
    seo_description: string;
    seo_keywords: string;
    seo_h1: string;
    noindex: boolean;
    nofollow: boolean;
    description: string;
    filters: Filters;
    nofollow_collections: string[];
}

export class RawgApi {

  constructor(protected request: AxiosStatic) {}

  public async getGames(key: string): Promise<RawgApiGame[]> {
    const response = await this.request.get<ApiResponseObject>(
      `https://api.rawg.io/api/games?key=${key}`, {}
    );
    return this.normalizeResponse((await response.data));
  }

  private normalizeResponse(games: ApiResponseObject): any {
    
    return games.results.filter(this.isValidGame.bind(this)).map((game:any) => {
      return {
        id: game.id,
        slug: game.slug,
        name: game.name,
        released: game.released,
        background_image: game.background_image,
        rating: game.rating,
        rating_top: game.rating_top,
        rating_count: game.ratings_count,
        metacritic: game?.metacritic,
        updated: game.updated,
        platforms: game.platforms,
        genres: game.genres,
        esrb_rating: game.esrb_rating
      }
    });
  }

  private isValidGame(game: Partial<Result>): boolean {
    return !!(
      game.id &&
      game.slug &&
      game.name &&
      game.released &&
      game.background_image &&
      game.rating &&
      game.rating_top &&
      game.ratings_count &&
      game.metacritic &&
      game.updated &&
      game.platforms &&
      game.genres &&
      game.esrb_rating
    );
  }
}
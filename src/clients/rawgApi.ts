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
  readonly ratings_count: number;
  readonly metacritic: number;
  readonly updated: Date;
  readonly platforms: RawgApiPlatform[];
  readonly genres: RawgApiGenre[];
  readonly esrb_rating: RawgApiEsrbRating;
}

export interface RawgApiResponse {
  readonly data: RawgApiGame[];
}

export class RawgApi {
  constructor(protected request: AxiosStatic) {}

  public async getGames(key: string): Promise<RawgApiGame[]> {
    const response = await this.request.get<RawgApiResponse>(
      `https://api.rawg.io/api/games?key=${key}`,
      {}
    );

    return this.normalizeResponse((await response).data);
  }

  private normalizeResponse(games: RawgApiResponse): RawgApiGame[] {
    return games.data.filter(this.isValidGame.bind(this)).map((game) => ({
      id: game.id,
      slug: game.slug,
      name: game.name,
      released: game.released,
      background_image: game.background_image,
      rating: game.rating,
      rating_top: game.rating_top,
      ratings_count: game.ratings_count,
      metacritic: game.metacritic,
      updated: game.updated,
      platforms: game.platforms,
      genres: game.genres,
      esrb_rating: game.esrb_rating,
    }));
  }

  private isValidGame(game: Partial<RawgApiGame>): boolean {
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

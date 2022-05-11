import { RawgApi } from '../rawgApi';
import axios from 'axios';
import rawgApiDataFixture from '../../../test/fixtures/rawgApi_data.json';
import rawgApiNormalizedFixture from '../../../test/fixtures/rawgApi_normalized.json';

jest.mock('axios');

describe('RawgApi client', () => {
  it('should return the normalized games from the Rawg service', async () => {
    const key = '4bcff6f8700743958a882243e4058e2c';

    axios.get = jest.fn().mockResolvedValue({ data: rawgApiDataFixture });

    const rawgApi = new RawgApi(axios);
    const response = await rawgApi.getGames(key);

    expect(response).toEqual(rawgApiNormalizedFixture);
  });
});

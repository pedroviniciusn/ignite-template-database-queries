import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return this.repository
      .createQueryBuilder('games')
      .where(`games.title ILIKE '%${param}%'`)
      .getMany()
      // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query(
      'SELECT count(id) FROM games'
    );
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    return this.repository
    .createQueryBuilder('games')
    .relation('users')
    .of(id)
    .loadMany()
  }
}

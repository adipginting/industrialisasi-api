import { Inject } from '@nestjs/common';
import { PG_CONNECTION } from '../constants';
import * as argon2 from 'argon2';

export class DbService {
  constructor(@Inject(PG_CONNECTION) private conn: any) {}
  async seedUsers() {
    try {
      const hash = await argon2.hash('password');
      const res = await this.conn.query(
        `INSERT INTO users (username, email, hashed_password) VALUES ('user', 'email1@example.com', $1)`,
        [hash],
      );
      return res;
    } catch (error) {
      console.error(error);
    }
  }
}

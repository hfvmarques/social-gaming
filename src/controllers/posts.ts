import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';

@Controller('posts')
export class PostsController {

  @Get('')
  public getPostsForLoggedUser(_: Request, res: Response): void {
    res.send([{ id: 1, title: 'Post 1' }, { id: 2, title: 'Post 2' }]);
  }
}
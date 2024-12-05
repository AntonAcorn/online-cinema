import { Module } from '@nestjs/common';
import MovieController from './movie.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { MovieModel } from './movie.model';
import { UserModule } from 'src/user/user.module';
import { MovieService } from './movie.service';

@Module({
  controllers: [MovieController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: MovieModel,
        schemaOptions: {
          collection: 'Movie',
        },
      },
    ]),
    UserModule,
  ],
  providers: [MovieService],
  exports: [MovieService],
})
export class MovieModule {}

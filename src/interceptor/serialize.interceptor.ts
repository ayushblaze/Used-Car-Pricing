import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { plainToClass } from 'class-transformer';
import { UserDto } from 'src/users/dtos/user.dto'; // not needed anymore

export class SerializeInterceptor implements NestInterceptor{
  constructor(private dto: any) {}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
     // Run something before a request is handled by the
     // request handler
    //  console.log("Running before the handler", context);

     return handler.handle().pipe(
      map((data: any) => {
        // Run something before the response is sent out 
        // console.log("I'm running before the response is sent out", data);
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true, // ensures when we have the dto and turn it into JSON it is only going to share or expose different properties that are specifically marked with that "Exclude" keyword
        });
      })
     );
  }
}
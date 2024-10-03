import { Controller } from '@nestjs/common';
import {  EventPattern, Payload,  } from '@nestjs/microservices';
import { UserService } from './user.service';
import { IUser } from './user.dto';

@Controller('user')
export class UserController {

    constructor(private readonly userService : UserService){}

    @EventPattern('convenio')
    async handleConvenioData(@Payload() data: IUser) {
        console.log("consumer started")
        

        data.users.forEach(async user => {
           await this.userService.save(user);
        })

        return true
    }

}

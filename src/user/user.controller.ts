import { Controller, HttpException, HttpStatus } from '@nestjs/common';
import { Ctx,  MessagePattern, Payload,  } from '@nestjs/microservices';
import { UserService } from './user.service';
import { IUser } from './user.dto';
import { GCPubSubContext } from 'nestjs-google-pubsub-microservice';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @MessagePattern(process.env.PUBSUB_CADASTRO_TOPIC || 'dev-cadastro-mock-topic')
    async handleUserMessage(@Payload() data: IUser, @Ctx() context: GCPubSubContext) {

        const originalMsg = context.getMessage();

        console.log('Mensagem:', data);

        try{
            const parsedData = JSON.parse(data.payload);

            console.log(parsedData)

            parsedData.users.forEach(async user => {
                await this.userService.save(user);
            })

            context.getMessage().ack();
        }
        catch (error){
            console.error('Erro ao processar a mensagem:', error);

            originalMsg.nack();

            console.log('Mensagem não processada.', originalMsg.id);
        }
    }

}

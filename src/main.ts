import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
import { GCPubSubServer } from 'nestjs-google-pubsub-microservice';
import { Duration } from '@google-cloud/pubsub';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configura um microservice Google Pub/Sub
  const microservice = app.connectMicroservice<MicroserviceOptions>({
    strategy: new GCPubSubServer({
      topic: process.env.PUBSUB_CADASTRO_TOPIC || "dev-cadastro-mock-topic",
      client: {
        projectId: process.env.PUBSUB_PROJECT_ID || "devplayground-250020",
        keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS || "./keys/devplayground-250020-88bf62d91f50.json",
      },
      subscription: "dev-cadastro-mock-sub",
      init: false,
      checkExistence: true,
      noAck: false
    }),
  });

  await app.startAllMicroservices();

  await app.listen(3000);
}
bootstrap();

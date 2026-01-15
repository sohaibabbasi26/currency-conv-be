import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for frontend
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:5173'], // Add your frontend URLs
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  
  // Set global prefix for all routes
  app.setGlobalPrefix('api');
  
  await app.listen(3001);
  console.log('🚀 Backend is running on http://localhost:3001');
  console.log('📡 API endpoints available at http://localhost:3001/api');
}
bootstrap();
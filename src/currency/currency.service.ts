import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CurrencyService {
  private readonly API_KEY = process.env.CURRENCY_API_KEY;
  private readonly BASE_URL = process.env.BASE_URL;

  constructor(private readonly httpService: HttpService) {}

  async getCurrencies() {
    try {
      const url = `${this.BASE_URL}/currencies?apikey=${this.API_KEY}`;
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      console.error('Error fetching currencies:', error.message);
      throw new HttpException(
        'Failed to fetch currencies',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getLatestRates(baseCurrency: string, currencies: string) {
    try {
      const url = `${this.BASE_URL}/latest?apikey=${this.API_KEY}&base_currency=${baseCurrency}&currencies=${currencies}`;
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      console.error('Error fetching latest rates:', error.message);
      throw new HttpException(
        'Failed to fetch exchange rates',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getHistoricalRates(
    date: string,
    baseCurrency: string,
    currencies: string,
  ) {
    try {
      const url = `${this.BASE_URL}/historical?apikey=${this.API_KEY}&date=${date}&base_currency=${baseCurrency}&currencies=${currencies}`;
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      console.error('Error fetching historical rates:', error.message);
      throw new HttpException(
        'Failed to fetch historical rates',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
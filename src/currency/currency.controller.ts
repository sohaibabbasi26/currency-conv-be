import { Controller, Get, Query } from '@nestjs/common';
import { CurrencyService } from './currency.service';

@Controller('currencies')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get()
  async getCurrencies() {
    return this.currencyService.getCurrencies();
  }

  @Get('latest')
  async getLatestRates(
    @Query('base_currency') baseCurrency: string = 'USD',
    @Query('currencies') currencies: string = 'EUR',
  ) {
    return this.currencyService.getLatestRates(baseCurrency, currencies);
  }

  @Get('historical')
  async getHistoricalRates(
    @Query('date') date: string,
    @Query('base_currency') baseCurrency: string = 'USD',
    @Query('currencies') currencies: string = 'EUR',
  ) {
    if (!date) {
      return { error: 'Date parameter is required' };
    }
    return this.currencyService.getHistoricalRates(
      date,
      baseCurrency,
      currencies,
    );
  }
}
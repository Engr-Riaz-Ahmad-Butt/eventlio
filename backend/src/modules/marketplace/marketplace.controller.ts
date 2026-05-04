import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../../common/decorators';
import { SearchVendorsDto } from './dto/search-vendors.dto';
import { MarketplaceService } from './marketplace.service';

@ApiTags('Marketplace')
@Controller('marketplace')
export class MarketplaceController {
  constructor(private readonly marketplaceService: MarketplaceService) {}

  @Public()
  @Get('vendors')
  @ApiOperation({ summary: 'Search, filter, and paginate marketplace vendors' })
  getVendors(@Query() query: SearchVendorsDto) {
    return this.marketplaceService.getVendors(query);
  }

  @Public()
  @Get('featured')
  @ApiOperation({ summary: 'Get featured marketplace vendors' })
  getFeatured() {
    return this.marketplaceService.getFeaturedVendors();
  }

  @Public()
  @Get('categories')
  @ApiOperation({ summary: 'Get marketplace categories with active vendor counts' })
  getCategories() {
    return this.marketplaceService.getCategories();
  }

  @Public()
  @Get('cities')
  @ApiOperation({ summary: 'Get marketplace cities with active vendor counts' })
  getCities() {
    return this.marketplaceService.getCities();
  }

  @Public()
  @Get('vendors/:slug/related')
  @ApiOperation({ summary: 'Get related public vendors from same city/category' })
  getRelated(@Param('slug') slug: string) {
    return this.marketplaceService.getRelatedVendors(slug);
  }

  @Public()
  @Post('vendors/:slug/view')
  @ApiOperation({ summary: 'Increment public vendor profile view count' })
  incrementView(@Param('slug') slug: string) {
    return this.marketplaceService.incrementProfileView(slug);
  }

  @Public()
  @Get('vendors/:slug')
  @ApiOperation({ summary: 'Get a public vendor profile by slug' })
  getVendor(@Param('slug') slug: string) {
    return this.marketplaceService.getVendorBySlug(slug);
  }
}

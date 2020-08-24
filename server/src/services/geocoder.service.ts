import {getService} from '@loopback/service-proxy';
import {inject, Provider} from '@loopback/core';
import {NominatimDataSource} from '../datasources';

export interface GeoPoint {
  lat: number;
  lon: number;
}

export interface Geocoder {
  geocode(address: string): Promise<GeoPoint[]>;
}

export class GeocoderProvider implements Provider<Geocoder> {
  constructor(
    // nominatim must match the name property in the datasource json file
    @inject('datasources.nominatim')
    protected dataSource: NominatimDataSource = new NominatimDataSource(),
  ) {}

  value(): Promise<Geocoder> {
    return getService(this.dataSource);
  }
}

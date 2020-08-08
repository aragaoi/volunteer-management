import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'nominatim',
  connector: 'rest',
  debug: false,
  crud: false,
  operations: [{
    template: {
      "method": "GET",
      "url": "https://nominatim.openstreetmap.org/search?format=json",
      "headers": {
        "accepts": "application/json",
        "content-type": "application/json",
        "referer": "plataforma.voluntariado.app.c29Mw"
      },
      "query": {
        "q": "{street},{city},{state}"
      },
      "responsePath": "$[0]"
    },
    functions: {
      "geocode": ["street", "city", "state"]
    }
  }]
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class NominatimDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'nominatim';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.nominatim', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}

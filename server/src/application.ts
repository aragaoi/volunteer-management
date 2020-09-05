import {BootMixin} from '@loopback/boot';
import {ApplicationConfig, Binding} from '@loopback/core';
import {RestExplorerBindings, RestExplorerComponent,} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MySequence} from './sequence';
import {AuthenticationComponent} from '@loopback/authentication';
import {JWTAuthenticationComponent, TokenServiceBindings, UserServiceBindings,} from '@loopback/authentication-jwt';
import {DbDataSource} from './datasources';
import {AuthorizationComponent, AuthorizationDecision, AuthorizationTags} from "@loopback/authorization";
import {AuthorizationProvider} from './providers';
import {LoginService} from "./services/login.service";
import {UserRepository} from "./repositories";
import {JWTService} from "./services/jwt.service";
import {TokenServiceConstants} from "@loopback/authentication-jwt/src/keys";

export {ApplicationConfig};

export class VoluntariadoServerApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };

    // Mount authentication system
    this.component(AuthenticationComponent);
    // Mount jwt component
    this.component(JWTAuthenticationComponent);
    // Bind datasource
    this.dataSource(DbDataSource, UserServiceBindings.DATASOURCE_NAME);

    // Bind user service
    // @ts-ignore
    this.bind(UserServiceBindings.USER_SERVICE).toClass(LoginService);
    // Bind user and credentials repository
    this.bind(UserServiceBindings.USER_REPOSITORY).toClass(UserRepository);
    // Bind custom token service
    this.bind(TokenServiceBindings.TOKEN_SERVICE).toClass(JWTService);

    this.bind(TokenServiceBindings.TOKEN_SECRET).to('v01un74r14d0jwt');
    this.bind(TokenServiceBindings.TOKEN_EXPIRES_IN).to('21600');

    const binding = this.component(AuthorizationComponent);
    this.configure(binding.key).to({
      precedence: AuthorizationDecision.DENY,
      defaultDecision: AuthorizationDecision.DENY,
    });

    this.bind('authorizationProviders.my-authorizer-provider')
      .toProvider(AuthorizationProvider)
      .tag(AuthorizationTags.AUTHORIZER);
  }
}

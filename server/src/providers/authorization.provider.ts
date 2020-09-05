import {Provider} from '@loopback/core';
import {AuthorizationContext, AuthorizationDecision, AuthorizationMetadata, Authorizer} from "@loopback/authorization";
import * as _ from 'lodash';

export class AuthorizationProvider implements Provider<Authorizer> {
  constructor() {}

  /**
   * @returns authenticateFn
   */
  value(): Authorizer {
    return this.authorize.bind(this);
  }

  async authorize(
    authorizationCtx: AuthorizationContext,
    metadata: AuthorizationMetadata,
  ) {
    const clientRole = _.get(authorizationCtx, 'principals[0].role');
    const allowedRoles = metadata.allowedRoles;
    return (!allowedRoles || allowedRoles.length === 0 || allowedRoles.includes(clientRole))
      ? AuthorizationDecision.ALLOW
      : AuthorizationDecision.DENY;
  }
}

import {UserService} from '@loopback/authentication';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import {compare} from 'bcryptjs';
import {Login} from '../models';
import {InstitutionRepository, UserRepository} from '../repositories';

export type Credentials = {
  email: string;
  password: string;
};

export declare enum ROLES {
  ADMIN = 'ADMIN',
  USER = 'USER',
  ENTITY = 'ENTITY'
}

export class LoginService implements UserService<Login, Credentials> {
  constructor(
    @repository(UserRepository) public userRepository: UserRepository,
    @repository(InstitutionRepository) public institutionRepository: InstitutionRepository,
  ) {
  }

  async verifyCredentials(credentials: Credentials): Promise<Login> {
    const invalidCredentialsError = 'Invalid email or password.';

    let foundUser = await this.userRepository.findOne({
      where: {email: credentials.email},
    });
    foundUser = foundUser || await this.institutionRepository.findOne({
      where: {email: credentials.email},
    });

    if (!foundUser || !foundUser.password) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    const passwordMatched = await compare(
      credentials.password,
      foundUser.password,
    );

    if (!passwordMatched) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    return foundUser;
  }

  convertToUserProfile(user: Login): UserProfile {
    return {
      [securityId]: user.id.toString(),
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }

  validateIdConsistency(id: string, currentLogin: UserProfile) {
    if(currentLogin.role != ROLES.ADMIN && currentLogin.id != id) {
      throw new HttpErrors.Forbidden('Você não tem acesso a esse ID.');
    }
  }
}
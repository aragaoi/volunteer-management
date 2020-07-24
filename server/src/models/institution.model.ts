import {Entity, model, property, hasOne} from '@loopback/repository';
import {Address} from './address.model';

@model({settings: {strict: false}})
export class Institution extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  uuid: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
    required: true,
  })
  type: number;

  @property({
    type: 'string',
    required: true,
  })
  document: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
  })
  phone?: string;

  @property({
    type: 'object',
  })
  calendar?: object;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'string',
  })
  avatarUrl?: string;

  @property({
    type: 'object',
  })
  rating?: object;

  @hasOne(() => Address)
  address: Address;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Institution>) {
    super(data);
  }
}

export interface InstitutionRelations {
  // describe navigational properties here
}

export type InstitutionWithRelations = Institution & InstitutionRelations;

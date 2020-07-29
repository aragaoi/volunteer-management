import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Institution extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  typeId?: string;

  @property({
    type: 'string',
  })
  document?: string;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'string',
  })
  phone?: string;

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
  address?: object;

  @property({
    type: 'object',
  })
  calendar?: object;

  @property({
    type: 'object',
  })
  rating?: object;

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

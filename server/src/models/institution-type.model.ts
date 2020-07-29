import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    strict: false,
    scope: {
      where: {active: true},
      order: "name ASC"
    },
  }
})
export class InstitutionType extends Entity {
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
    type: 'boolean',
    required: false,
    default: true,
  })
  active: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<InstitutionType>) {
    super(data);
  }
}

export interface InstitutionTypeRelations {
  // describe navigational properties here
}

export type InstitutionTypeWithRelations = InstitutionType & InstitutionTypeRelations;

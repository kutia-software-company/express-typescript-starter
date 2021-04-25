import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType({
  description: 'User object.',
})
export class Users {
  @Field((type) => ID)
  public id: string;

  @Field({
    description: 'The first name of the user.',
  })
  public first_name: string;

  @Field({
    description: 'The last name of the user.',
  })
  public last_name: string;

  @Field({
    description: 'The email of the user.',
  })
  public email: string;
}

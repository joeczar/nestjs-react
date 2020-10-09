import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import User from '../user/user.entity';
import { UserService } from '../user/user.service';
 
describe('The UserService', () => {
  let userService: UserService;
  let findOne: jest.Mock;
  beforeEach(async () => {
    findOne = jest.fn();
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne
          }
        }
      ],
    })
      .compile();
    userService = await module.get(UserService);
  })
  describe('when getting a user by email', () => {
    describe('and the user is matched', () => {
      let user: User;
      beforeEach(() => {
        user = new User();
        findOne.mockReturnValue(Promise.resolve(user));
      })
      it('should return the user', async () => {
        const fetchedUser = await userService.getByEmail('test@test.com');
        expect(fetchedUser).toEqual(user);
      })
    })
    describe('and the user is not matched', () => {
      beforeEach(() => {
        findOne.mockReturnValue(undefined);
      })
      it('should throw an error', async () => {
        await expect(userService.getByEmail('test@test.com')).rejects.toThrow();
      })
    })
  })
});
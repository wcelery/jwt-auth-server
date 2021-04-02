import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { createMock } from '@golevelup/nestjs-testing';
import { Model, Query, Document } from 'mongoose';

import { UsersService } from './users.service';

interface User {
  roles: Array<string>;
  username: string;
  email: string;
  password: string;
}

interface UserDoc extends Document {
  roles: Array<string>;
  username: string;
  email: string;
  password: string;
  id: number;
}

const mockUser = (
  roles = [],
  username = 'myUser',
  email = 'example@gmail.com',
  password = 'some hash',
): User => ({ roles, username, email, password });

const mockUserDoc = (mock?: User): Partial<UserDoc> => ({
  roles: [],
  username: mock?.username || 'myUser',
  email: mock?.email || 'example@gmail.com',
  password: mock?.password || 'some hash',
  id: 123456789,
});

const usersArray = [
  mockUser([], 'daym', 'testemail@yandex.ru', 'strongpassword'),
  mockUser(),
  mockUser(null, null, 'anotheremail@yahoo.com'),
  mockUser(null, 'test', 'wwwwwwww@gmail.com'),
];

const usersDocArray = [
  mockUserDoc({
    roles: [],
    username: 'daym',
    email: 'testemail@yandex.ru',
    password: 'strongpassword',
  }),
  mockUserDoc(),
  mockUserDoc({
    roles: null,
    username: null,
    email: 'anotheremail@yahoo.com',
    password: null,
  }),
  mockUserDoc({
    roles: null,
    username: 'test',
    email: 'wwwwwwww@gmail.com',
    password: null,
  }),
];

describe('UsersService', () => {
  let service: UsersService;
  let model: Model<UserDoc>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken('User'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockUser()),
            constructor: jest.fn().mockResolvedValue(mockUser()),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            create: jest.fn(),
            remove: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get<Model<UserDoc>>(getModelToken('User'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all users', async () => {
    jest.spyOn(model, 'findOne').mockReturnValueOnce(
      createMock<Query<UserDoc, UserDoc>>({
        exec: jest.fn().mockResolvedValueOnce(
          mockUserDoc({
            roles: null,
            username: 'myUser',
            email: 'example@gmail.com',
            password: 'some hash',
          }),
        ),
      }),
    );
    const findMockUser = mockUser();
    const foundUser = await service.findOne('myUser');
    expect(foundUser).toEqual(findMockUser);
  });
});

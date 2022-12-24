import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Employee, Search } from '../pages/model/employee.model';

export const employees: Employee[] = [
  {
    id: 1,
    username: 'fadhil',
    firstName: 'fadhil yusni',
    lastName: 'ramadhan',
    email: 'test@gmail.com',
    birthDate: new Date(10-12-1999),
    basicSalary: 100000,
    status: 'Permanent',
    group: 'Digital Developer Program',
    description:
      'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum',
  },
  {
    id: 2,
    username: 'fadhil',
    firstName: 'fadhil yusni',
    lastName: 'ramadhan',
    email: 'test@gmail.com',
    birthDate: new Date('1999/12/10'),
    basicSalary: 100000,
    status: 'Permanent',
    group: 'Digital Developer Program',
    description:
      'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum',
  },
];

export const search: Search[] = [
  {
    name: 'digital',
  },
];

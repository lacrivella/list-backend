require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Habit = require('../lib/models/Habit');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates a new habit', () => {
    return request(app)
      .post('/api/v1/habits')
      .send({
        habit: 'drink water',
        description: 'drink 64oz of H2O daily',
        user: 'LAC'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          habit: 'drink water',
          description: 'drink 64oz of H2O daily',
          user: 'LAC',
          __v: 0,
          createdAt: expect.any(String),
          updatedAt: expect.any(String)
        });
      });
  });

  it('can get all habits', async() => {
    const habits = await Habit.create([
      {
        habit: 'drink water',
        description: 'drink 64oz of H2O daily',
        user: 'LAC'
      }, 
      {
        habit: 'run',
        description: 'run 5k every other day',
        user: 'LAC'
      },
      {
        habit: 'sleep',
        description: 'get 8hrs of sleep',
        user: 'LAC'
      }
    ]);
    return request(app)
      .get('/api/v1/habits')
      .then(res => {
        const habitJSON = JSON.parse(JSON.stringify(habits));
        habitJSON.forEach((habit) => {
          expect(res.body).toContainEqual({
            _id: expect.any(String),
            habit: 'drink water',
            description: 'drink 64oz of H2O daily',
            user: 'LAC',
            __v: 0,
            createdAt: expect.any(String),
            updatedAt: expect.any(String)
          });
        });
      });
  });
  it('can get habit by id', async() => {
    const habit = await Habit.create({
      habit: 'run',
      description: 'run 5k every other day',
      user: 'LAC'
    });
    return request(app)
      .get(`/api/v1/habits/${habit._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          habit: habit.habit,
          description: habit.description,
          user: habit.user,
          __v: 0,
          createdAt: expect.any(String),
          updatedAt: expect.any(String) 
        });
      });
  });
  it('can update the habit and description', () => {
    return request(app)
      .patch('/api/v1/habits/0')
      .send({
        habit: 'drink coffee',
        description: 'drink only one cup',
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          habit: 'drink coffee',
          description: 'drink only one cup',
          user: habit.user,
          __v: 0,
          createdAt: expect.any(String),
          updatedAt: expect.any(String) 
        });
      });
  });

  it('deletes a habit by id', async() => {
    const habit = await Habit.create({
      habit: 'drink water',
      description: 'drink 64oz of H2O daily',
      user: 'LAC'
    });
    return request(app)
      .delete(`/api/v1/habits/${habit._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          habit: 'drink water',
          description: 'drink 64oz of H2O daily',
          user: 'LAC',
          __v: 0,
          createdAt: expect.any(String),
          updatedAt: expect.any(String)
        });
      });
  });
});

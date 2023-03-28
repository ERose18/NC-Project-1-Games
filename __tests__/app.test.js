const db = require('../db/connection');
const app = require('../app');
const request = require('supertest');
const data = require('../db/data/test-data/index');
const seed = require('../db/seeds/seed');
const { afterAll } = require('@jest/globals');

beforeEach(() => {return seed(data)});
afterAll(() => {db.end()});

describe('GET /api/categories', () => {
    test('200: Returns an array with category objects with properties of a slug and a description', () =>{
        return request(app)
        .get('/api/categories')
        .expect(200)
        .then(({body}) => {
            const categories = body.categories;
            expect(categories.length).toBe(4);
        });
    });
    test('200: Ensures that what is passed IS an Array', () =>{
        return request(app)
        .get('/api/categories')
        .expect(200)
        .then(({body}) => {
            const categories = body.categories;
            expect(categories).toBeInstanceOf(Array);
        });
    });
    test('200: Ensures that the Array passed contains an Object', () =>{
        return request(app)
        .get('/api/categories')
        .expect(200)
        .then(({body}) => {
            const categories = body.categories;
            categories.forEach((category) => {
                expect.objectContaining({
                    slug: expect.any(String),
                    description: expect.any(String),
                });
            });
        });
    });
    test('404: Returns "End-point Not Found" when an invalid end-point is entered ', () =>{
        return request(app)
        .get('/api/categories/wrongendpoint')
        .expect(404)
        .then(({body: {msg}}) => {
            // const categories = body.categories;
            expect(msg).toBe('End-point Not Found');
        });
    });
});

describe('GET /api/reviews/:review_id', () => {
    test('200: Accepts the review with the given id', () => {
        return request(app)
        .get('/api/reviews/2')
        .then(({body}) => {
            const review = body.review;
            console.log(review);
            (review) => {
                expect.toMatchObject({
                    review_id: 2,
                    title: expect.any(String),
                    designer: expect.any(String),
                    owner: expect.any(String),
                    review_img_url: expect.any(String),
                    review_body: expect.any(String),
                    category: expect.any(String),
                    created_at: expect.any(Number),
                    votes: expect.any(Number),
                })
            }
        })
    })
    test('404: Returns "End-point Not Found" if given an "ID" that isnt in the database', () =>{
        return request(app)
        .get('/api/reviews/9000')
        .expect(404)
        .then(({body}) => {
            expect(body.msg).toBe('ID Not Found');
        });
    });
    test('400: Returns "Invalid ID" if given an "ID" that is not a number', () =>{
        return request(app)
        .get('/api/reviews/nonum')
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe('Invalid ID');
        });
    });
})

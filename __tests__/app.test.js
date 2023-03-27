const db = require('../db/connection');
const app = require('../app');
const request = require('supertest');
const data = require('../db/data/test-data/index');
const seed = require('../db/seeds/seed');


beforeEach(() => {return seed(data)});
afterAll(() => {db.end()});

describe('GET /api/categories', () => {
    test('200: Returns the length of the Array', () =>{
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
            expect(msg).toBe('End-point Not Found');
        });
    });
});

describe.only('GET /api/reviews/:review_id', () => {
    test('200: Ensures that what is passed IS an Object', () =>{
        return request(app)
        .get('/api/reviews')
        .expect(200)
        .then(({body}) => {
            const reviews = body.reviews;
            expect(reviews).toBeInstanceOf(Object);
        });
    });
    test('200: Returns the length of the Object', () =>{
        return request(app)
        .get('/api/reviews')
        .expect(200)
        .then(({body}) => {
            const reviews = body.reviews;
            console.log(reviews)
            expect(reviews.length).toBe(13);
        });
    });
    test('200: Ensures that the Object formatting/type is correct', () =>{
        return request(app)
        .get('/api/reviews')
        .expect(200)
        .then(({body}) => {
            const reviews = body.reviews;
            reviews.forEach((review) => {
                expect.objectContaining({
                    title: expect.any(String),
                    designer: expect.any(String),
                    review_img_url: expect.any(String),
                    review_body: expect.any(String),
                    category: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number),
                });
            });
        });
    });
})
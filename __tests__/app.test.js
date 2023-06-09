const db = require('../db/connection');
const app = require('../app');
const request = require('supertest');
const data = require('../db/data/test-data/index');
const seed = require('../db/seeds/seed');
const sorted = require('jest-sorted');
const { afterAll } = require('@jest/globals');
const jsonEndpoints = require('../endpoints.json');

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
                expect(review).toMatchObject({
                    review_id: 2,
                    title: expect.any(String),
                    designer: expect.any(String),
                    owner: expect.any(String),
                    review_img_url: expect.any(String),
                    review_body: expect.any(String),
                    category: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number),
                })
            }
        )
    })
    test('200: Accepts the review with the given id WITH comment count', () => {
        return request(app)
        .get('/api/reviews/2')
        .then(({body}) => {
            const review = body.review;
                expect(review).toMatchObject({
                    review_id: 2,
                    title: expect.any(String),
                    designer: expect.any(String),
                    owner: expect.any(String),
                    review_img_url: expect.any(String),
                    review_body: expect.any(String),
                    category: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number),
                    comment_count: expect.any(Number),
                })
            }
        )
    })
    test('404: Returns "ID Not Found" if given an "ID" that isnt in the database', () =>{
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

describe('GET /api/reviews', () => {
    test('200: Ensures that what is passed IS an Object', () =>{ 
        return request(app)
        .get('/api/reviews')
        .expect(200)
        .then(({body}) => {
            const reviews = body.reviews;
            expect(reviews).toBeInstanceOf(Object);
    });
    });
    test('200: Returns a review with a comment_count', () =>{
        return request(app)
        .get('/api/reviews')
        .expect(200)
        .then(({body}) => {
            const reviews = body.reviews;
            expect(reviews.length).toBe(13);
            reviews.forEach((review) => {
                expect(review).toMatchObject({
                        owner: expect.any(String),
                        title: expect.any(String),
                        review_id: expect.any(Number),
                        designer: expect.any(String),
                        review_img_url: expect.any(String),
                        category: expect.any(String),
                        created_at: expect.any(String),
                        votes: expect.any(Number),
                        comment_count: expect.any(Number),
                 });   
            })
          expect(reviews).toBeSortedBy('created_at', {descending: true});
         });
    });   
 })

 describe('GET /api/reviews/:review_id/comments', () => {
    test('200: Returns an empty array of comments when passed a review_id with no comments', () =>{ 
        return request(app)
        .get('/api/reviews/1/comments')
        .expect(200)
        .then(({body}) => {
            const comments = body.comments;
            expect(comments).toEqual([]);
     });
    });
    test('200: Returns an array of comments from the given review_id', () =>{
        return request(app)
        .get('/api/reviews/3/comments')
        .expect(200)
        .then(({body}) => {
            const comments = body.comments;
            expect(comments.length).toBe(3);
            comments.forEach((comment) => {
                expect(comment).toMatchObject({
                    comment_id: expect.any(Number),
                    votes: expect.any(Number),
                    created_at: expect.any(String),
                    author: expect.any(String),
                    body: expect.any(String),
                    review_id: 3,
                 });   
            })
         expect(comments).toBeSortedBy('created_at', {descending: true});
         });
    });  
    test('404: Returns "ID Not Found" if given an "ID" that isnt in the database', () =>{
        return request(app)
        .get('/api/reviews/9000/comments')
        .expect(404)
        .then(({body}) => {
            expect(body.msg).toBe('ID Not Found');
        });
    }); 
    test('400: Returns "Invalid ID" if given an "ID" that is not a number', () =>{
        return request(app)
        .get('/api/reviews/nonum/comments')
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe('Invalid ID');
        });
    });
 })

 describe('POST /api/reviews/:review_id/comments', () => {
    test('201: adds a new comment and returns the information from that newly created comment', () =>{
        const newUserComment = {
            body: "Here is the wild comment",
            author: 'dav3rid',
        }
        return request(app)
        .post('/api/reviews/1/comments')
        .send(newUserComment)
        .expect(201)
        .then(({body}) => {
            const comments = body.comments;
                expect(comments).toEqual({
                    comment_id: expect.any(Number),
                    votes: 0,
                    author: 'dav3rid',
                    body: "Here is the wild comment",
                    review_id: 1,
                    created_at: expect.any(String),
             })
         });
    });  
    test('201: adds a new comment and returns the information from that newly created comment, ignoring unnecessary information', () =>{
        const newUserComment = {
            body: "Here is the wild comment",
            author: 'dav3rid',
            another: "thing",
            votes:"something"
        }
        return request(app)
        .post('/api/reviews/1/comments')
        .send(newUserComment)
        .expect(201)
        .then(({body}) => {
            const comments = body.comments;
                expect(comments).toEqual({
                    comment_id: expect.any(Number),
                    votes: 0,
                    author: 'dav3rid',
                    body: "Here is the wild comment",
                    review_id: 1,
                    created_at: expect.any(String),
             })
         });
    });  
    test('404: Returns "ID Not Found" if given an "ID" that isnt in the database', () =>{
        return request(app)
        .get('/api/reviews/9000/comments')
        .expect(404)
        .then(({body}) => {
            expect(body.msg).toBe('ID Not Found');
        });
    }); 
    test('400: Returns "Invalid ID" if given an "ID" that is Invalid', () =>{
        return request(app)
        .get('/api/reviews/notanum/comments')
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe('Invalid ID');
        });
    }); 
    it('400: POST responds with an error message when missing required information', () => {
        const newUserComment = {
            author: 'dav3rid',
        }
        return request(app)
            .post('/api/reviews/1/comments')
            .send(newUserComment)
            .expect(400)
            .then(({body}) => {
                expect(body.msg).toBe('Error: Missing required information');
            })
    })
    it('404: POST responds with an error message when missing required information', () => {
        const newUserComment = {
            author: 'notAnAuthor',
            body: "wrongComment",
        }
        return request(app)
            .post('/api/reviews/1/comments')
            .send(newUserComment)
            .expect(404)
            .then(({body}) => {
                expect(body.msg).toBe('Error: Information Not Valid');
            })
    })
    
 })
 describe('PATCH /api/reviews/:review_id', () => {
    test('200: Updates/PATCH vote count in the reviews database (plus)', () =>{
        const newVoteCount = {
            new_votes: 10,
        }
        return request(app)
        .patch('/api/reviews/2')
        .send(newVoteCount)
        .expect(200)
        .then(({body}) => {
            const review = body.review;
                expect(review).toMatchObject({
                    owner: expect.any(String),
                    title: expect.any(String),
                    review_id: expect.any(Number),
                    designer: expect.any(String),
                    review_img_url: expect.any(String),
                    category: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number),
             })
         });
    });  
    test('200: Updates/PATCH vote count in the reviews database (minus)', () =>{
        const newVoteCount = {
            new_votes: -2,
        }
        return request(app)
        .patch('/api/reviews/2')
        .send(newVoteCount)
        .expect(200)
        .then(({body}) => {
            const review = body.review;
                expect(review).toMatchObject({
                    owner: expect.any(String),
                    title: expect.any(String),
                    review_id: expect.any(Number),
                    designer: expect.any(String),
                    review_img_url: expect.any(String),
                    category: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number),
             })
         });
    });  
    test('200: Should stay the same when passed a newVote count of 0', () =>{
        const newVoteCount = {
            new_votes: 0,
        }
        return request(app)
        .patch('/api/reviews/2')
        .send(newVoteCount)
        .expect(200)
        .then(({body}) => {
            const review = body.review;
                expect(review).toMatchObject({
                    owner: expect.any(String),
                    title: expect.any(String),
                    review_id: expect.any(Number),
                    designer: expect.any(String),
                    review_img_url: expect.any(String),
                    category: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number),
             })
         });
    });  
    test('404: Returns "ID Not Found" if given an "ID" that isnt in the database', () =>{
        return request(app)
        .get('/api/reviews/9000')
        .expect(404)
        .then(({body}) => {
            expect(body.msg).toBe('ID Not Found');
        });
    }); 
    test('400: Returns "Invalid ID" if given an "ID" that is Invalid', () =>{
        return request(app)
        .get('/api/reviews/notanum')
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe('Invalid ID');
        });
    }); 
    it('400: POST responds with an error message when missing required information', () => {
        const newVoteCount = {
        }
        return request(app)
            .post('/api/reviews/1/comments')
            .send(newVoteCount)
            .expect(400)
            .then(({body}) => {
                expect(body.msg).toBe('Error: Missing required information');
            })
    })
 })

 describe('DELETE /api/comments/:comment_id', () => {
    test('204: DELETES the comment with the given comment id', () =>{
        return request(app)
        .delete('/api/comments/3')
        .expect(204)
    });  
    test('404: Returns "Comment Not Found" if given an "ID" that is Invalid', () =>{
        return request(app)
        .delete('/api/comments/31387')
        .expect(404)
        .then(({body}) => {
            expect(body.msg).toBe('Comment Not Found');
        });
    }); 
    test('400: Returns "Invalid ID" if given an "ID" that isnt in the database', () =>{
        return request(app)
        .delete('/api/comments/wnwadoi')
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe('Invalid ID');
        });
    }); 
 })


 describe('GET /api/users', () => {
    test('200: Ensures that what is passed IS an Object', () =>{ 
        return request(app)
        .get('/api/users')
        .expect(200)
        .then(({body}) => {
            const users = body.users;
            expect(users).toBeInstanceOf(Object);
    });
    });
    test('200: Returns an object with the following properties (username, name, avatar_url)', () =>{
        return request(app)
        .get('/api/users')
        .expect(200)
        .then(({body}) => {
            const users = body.users;
            expect(users.length).toBe(4);
            users.forEach((user) => {
                expect(user).toMatchObject({
                        username: expect.any(String),
                        name: expect.any(String),
                        avatar_url: expect.any(String),
                 });   
            })
         });
    });   
    test('404: Returns "End-point Not Found" when an invalid end-point is entered ', () =>{
        return request(app)
        .get('/api/users/wrongendpoint')
        .expect(404)
        .then(({body: {msg}}) => {
            expect(msg).toBe('End-point Not Found');
        });
    });
 })

 describe('GET /api/reviews (queries)', () => {
    test('200: Allows for sorting by a given category via a query', () =>{ 
        return request(app)
        .get('/api/reviews?category=dexterity')
        .expect(200)
        .then(({body}) => {
            const reviews = body.reviews;
            reviews.forEach((review) => {
                expect(review).toMatchObject({
                    owner: expect.any(String),
                    title: expect.any(String),
                    review_id: expect.any(Number),
                    designer: expect.any(String),
                    review_img_url: expect.any(String),
                    category: 'dexterity',
                    created_at: expect.any(String),
                    votes: expect.any(Number),
             });
         });
    });
    });
    test('200: Allows for sorting by a given category via a query, if that category exists but there are no reviews, return empty array', () =>{ 
        return request(app)
        .get("/api/reviews?category=children's games")
        .expect(200)
        .then(({body}) => {
            const reviews = body.reviews;
            console.log(reviews)
            reviews.forEach((review) => {
                expect(review).toEqual([]);
         });
    });
    });
    test('200: Allows for sorting of columns when given a valid column', () =>{ 
        return request(app)
        .get('/api/reviews?sort_by=votes')
        .expect(200)
        .then(({body}) => {
            const reviews = body.reviews;
            expect(reviews).toBeSortedBy('votes', {descending: true});
    });
    });
    test('200: Sort_by defaults to "date"', () =>{ 
        return request(app)
        .get('/api/reviews')
        .expect(200)
        .then(({body}) => {
            const reviews = body.reviews;
            expect(reviews).toBeSortedBy('created_at', {descending: true});
    });
    });
    test('200: order defaults to "DESC"', () =>{ 
        return request(app)
        .get('/api/reviews?sort_by=created_at')
        .expect(200)
        .then(({body}) => {
            const reviews = body.reviews;
            expect(reviews.length).toBe(13);
            expect(reviews).toBeSortedBy('created_at', {descending: true});
    });
    });
    test('200: order is ASC when given a query of ASC', () =>{ 
        return request(app)
        .get('/api/reviews?order=ASC')
        .expect(200)
        .then(({body}) => {
            const reviews = body.reviews;
            expect(reviews).toBeSortedBy('created_at', {descending: false});
    });
    });
    test('200: Allows for multiple queries to be taken at one time', () =>{ 
        return request(app)
        .get('/api/reviews?category=social deduction&sort_by=votes&order=ASC')
        .expect(200)
        .then(({body}) => {
            const reviews = body.reviews;
            expect(reviews.length).toBe(11);
            reviews.forEach((review) => {
                expect(review).toMatchObject({
                    owner: expect.any(String),
                    title: expect.any(String),
                    review_id: expect.any(Number),
                    designer: expect.any(String),
                    review_img_url: expect.any(String),
                    category: 'social deduction',
                    created_at: expect.any(String),
                    votes: expect.any(Number),
                });
            });
            expect(reviews).toBeSortedBy('votes', {descending: false});
    });
    });
    test('200: Allows for multiple queries to be taken at one time, defaults used', () =>{ 
        return request(app)
        .get('/api/reviews?category=social deduction&sort_by=created_at')
        .expect(200)
        .then(({body}) => {
            const reviews = body.reviews;
            reviews.forEach((review) => {
            expect(review).toMatchObject({
                owner: expect.any(String),
                title: expect.any(String),
                review_id: expect.any(Number),
                designer: expect.any(String),
                review_img_url: expect.any(String),
                category: 'social deduction',
                created_at: expect.any(String),
                votes: expect.any(Number),
            });
        });
            expect(reviews).toBeSortedBy('created_at', {descending: true});
    });
    });
    test('404: Responds with an error if category is Invalid', () =>{ 
        return request(app)
        .get('/api/reviews?category=notacategory')
        .expect(404)
        .then(({body}) => {
            expect(body.msg).toBe('Invalid Category');
    });
    });
    test('400: Responds with an error if sort_by is Invalid', () =>{ 
        return request(app)
        .get('/api/reviews?sort_by=notasortquery')
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe('Invalid Sort Query');
    });
    });
    test('400: Responds with an error if order is Invalid', () =>{ 
        return request(app)
        .get('/api/reviews?order=notanorder')
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe('Invalid Order');
    });
    });
})


describe('GET /api', () => {
    test('200: Allows for sorting by a given category via a query', () =>{ 
        return request(app)
        .get('/api')
        .expect(200)
        .then((response) => {
                expect(response.body).toEqual(jsonEndpoints);
         });
    });
 })

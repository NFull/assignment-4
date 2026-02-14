const request = require('supertest');
const app = require('../server'); 

describe('Book API', () => {
    test('should return all books', async () => {
        const response = await request(app).get('/books');
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(3);
    });

    test('should return book by ID', async () => {
        const response = await request(app).get('/books/1');
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', 1);
        expect(response.body).toHaveProperty('title');
    });

    test('should return book by ID', async () => {
        const response = await request(app).get('/books/999');
        
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    });

    test('should create a new book', async () => {
        const newBook = {
            title: "Beloved",
            author: "Toni Morrison",
            genre: "Fiction",
            copiesAvailable: 10
        };

        const response = await request(app)
            .post('/books')
            .send(newBook);
        
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.title).toBe('Beloved');
    });

    test('should update existing book', async () => {
        const updatedBook = {
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            genre: "Fiction",
            copiesAvailable: 3
        };

        const response = await request(app)
            .put('/books/1')
            .send(updatedBook);
        
        expect(response.status).toBe(200);
        expect(response.body.copiesAvailable).toBe(3);
    });

    test('should delete existing book', async () => {
        const response = await request(app).delete('/books/2');
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message');
    });
});
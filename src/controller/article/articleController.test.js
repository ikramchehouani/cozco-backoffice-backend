// const articleController = require('../controller/articleController');
// const Article = require('../model/articleModel');
// const httpMocks = require('node-mocks-http');

// // Mock des dépendances
// jest.mock('../model/articleModel');

// describe('ArticleController - getAllArticles', () => {
//     let req, res;

//     beforeEach(() => {
//         req = httpMocks.createRequest();
//         res = httpMocks.createResponse();
//     });

//     it('should return 200 and all articles', async () => {
//         Article.find.mockResolvedValue([{ title: 'Test Article' }]);

//         await articleController.getAllArticles(req, res);

//         expect(res.statusCode).toBe(200);
//         expect(res._getJSONData()).toEqual([{ title: 'Test Article' }]);
//     });

//     it('should return 500 if there is a server error', async () => {
//         Article.find.mockRejectedValue(new Error('Server error'));

//         await articleController.getAllArticles(req, res);

//         expect(res.statusCode).toBe(500);
//         expect(res._getJSONData()).toEqual({ message: 'Server error' });
//     });
// });

// describe('ArticleController - getArticle', () => {
//     let req, res;

//     beforeEach(() => {
//         req = httpMocks.createRequest();
//         res = httpMocks.createResponse();
//     });

//     it('should return 200 and the article if found', async () => {
//         Article.findById.mockResolvedValue({ title: 'Test Article' });

//         req.params.id = '1';

//         await articleController.getArticle(req, res);

//         expect(res.statusCode).toBe(200);
//         expect(res._getJSONData()).toEqual({ title: 'Test Article' });
//     });

//     it('should return 404 if article is not found', async () => {
//         Article.findById.mockResolvedValue(null);

//         req.params.id = '1';

//         await articleController.getArticle(req, res);

//         expect(res.statusCode).toBe(404);
//         expect(res._getJSONData()).toEqual({ message: 'Article not found' });
//     });

//     it('should return 500 if there is a server error', async () => {
//         Article.findById.mockRejectedValue(new Error('Server error'));

//         req.params.id = '1';

//         await articleController.getArticle(req, res);

//         expect(res.statusCode).toBe(500);
//         expect(res._getJSONData()).toEqual({ message: 'Server error' });
//     });

//     it('should return 400 if ID is invalid', async () => {
//         req.params.id = 'invalid-id';

//         await articleController.getArticle(req, res);

//         expect(res.statusCode).toBe(400);
//         expect(res._getJSONData()).toEqual({ message: 'Invalid ID format' });
//     });
// });

// describe('ArticleController - createArticle', () => {
//     let req, res;

//     beforeEach(() => {
//         req = httpMocks.createRequest();
//         res = httpMocks.createResponse();
//     });

//     it('should return 201 and create a new article', async () => {
//         Article.create.mockResolvedValue({ title: 'New Article' });

//         req.body = { title: 'New Article', description: 'Description', author: 'Author' };

//         await articleController.createArticle(req, res);

//         expect(res.statusCode).toBe(201);
//         expect(res._getJSONData()).toEqual({ message: 'Article created successfully', article: { title: 'New Article' } });
//     });

//     it('should return 400 if required fields are missing', async () => {
//         req.body = { description: 'Description', author: 'Author' }; // Missing title

//         await articleController.createArticle(req, res);

//         expect(res.statusCode).toBe(400);
//         expect(res._getJSONData()).toEqual({ message: 'Title is required' });
//     });

//     it('should return 500 if there is a server error', async () => {
//         Article.create.mockRejectedValue(new Error('Server error'));

//         req.body = { title: 'New Article', description: 'Description', author: 'Author' };

//         await articleController.createArticle(req, res);

//         expect(res.statusCode).toBe(500);
//         expect(res._getJSONData()).toEqual({ message: 'Server error' });
//     });
// });

// describe('ArticleController - updateArticle', () => {
//     let req, res;

//     beforeEach(() => {
//         req = httpMocks.createRequest();
//         res = httpMocks.createResponse();
//     });

//     it('should return 200 and update the article if found', async () => {
//         Article.findById.mockResolvedValue({ title: 'Old Title', save: jest.fn().mockResolvedValue({ title: 'Updated Title' }) });

//         req.params.id = '1';
//         req.body = { title: 'Updated Title' };

//         await articleController.updateArticle(req, res);

//         expect(res.statusCode).toBe(200);
//         expect(res._getJSONData()).toEqual({ message: 'Article updated successfully', article: { title: 'Updated Title' } });
//     });

//     it('should return 404 if article is not found', async () => {
//         Article.findById.mockResolvedValue(null);

//         req.params.id = '1';
//         req.body = { title: 'Updated Title' };

//         await articleController.updateArticle(req, res);

//         expect(res.statusCode).toBe(404);
//         expect(res._getJSONData()).toEqual({ message: 'Article not found' });
//     });

//     it('should return 400 if required fields are missing', async () => {
//         Article.findById.mockResolvedValue({ title: 'Old Title', save: jest.fn() });

//         req.params.id = '1';
//         req.body = { description: 'Updated Description' }; // Missing title

//         await articleController.updateArticle(req, res);

//         expect(res.statusCode).toBe(400);
//         expect(res._getJSONData()).toEqual({ message: 'Title is required' });
//     });

//     it('should return 500 if there is a server error', async () => {
//         Article.findById.mockRejectedValue(new Error('Server error'));

//         req.params.id = '1';
//         req.body = { title: 'Updated Title' };

//         await articleController.updateArticle(req, res);

//         expect(res.statusCode).toBe(500);
//         expect(res._getJSONData()).toEqual({ message: 'Server error' });
//     });
// });

// describe('ArticleController - deleteArticle', () => {
//     let req, res;

//     beforeEach(() => {
//         req = httpMocks.createRequest();
//         res = httpMocks.createResponse();
//     });

//     it('should return 200 and delete the article if found', async () => {
//         Article.findByIdAndDelete.mockResolvedValue({ title: 'Deleted Article' });

//         req.params.id = '1';

//         await articleController.deleteArticle(req, res);

//         expect(res.statusCode).toBe(200);
//         expect(res._getJSONData()).toEqual({ message: 'Article deleted successfully' });
//     });

//     it('should return 404 if article is not found', async () => {
//         Article.findByIdAndDelete.mockResolvedValue(null);

//         req.params.id = '1';

//         await articleController.deleteArticle(req, res);

//         expect(res.statusCode).toBe(404);
//         expect(res._getJSONData()).toEqual({ message: 'Article not found' });
//     });

//     it('should return 500 if there is a server error', async () => {
//         Article.findByIdAndDelete.mockRejectedValue(new Error('Server error'));

//         req.params.id = '1';

//         await articleController.deleteArticle(req, res);

//         expect(res.statusCode).toBe(500);
//         expect(res._getJSONData()).toEqual({ message: 'Server error' });
//     });

//     it('should return 400 if ID is invalid', async () => {
//         req.params.id = 'invalid-id';

//         await articleController.deleteArticle(req, res);

//         expect(res.statusCode).toBe(400);
//         expect(res._getJSONData()).toEqual({ message: 'Invalid ID format' });
//     });
// });

const authController = require('../controller/authController');
const User = require('../model/utilisateurModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const httpMocks = require('node-mocks-http');

// Mock des dépendances
jest.mock('../model/utilisateurModel');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('AuthController - Signup', () => {
    let req, res;

    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        process.env.SECRET_KEY = 'testsecret';
        process.env.PASSWORD = 'testpassword';
    });

    it('should return 400 if email already exists', async () => {
        User.findOne.mockResolvedValue(true);

        req.body = { email: 'test@test.com', firstName: 'Test', lastName: 'User', role: 'site' };

        await authController.signup(req, res);

        expect(res.statusCode).toBe(400);
        expect(res._getJSONData()).toEqual({ message: 'Email already exists' });
    });

    it('should create a new user and return 201', async () => {
        User.findOne.mockResolvedValue(false);
        User.create.mockResolvedValue({ email: 'test@test.com' });
        bcrypt.hash.mockResolvedValue('hashedpassword');

        req.body = { email: 'test@test.com', firstName: 'Test', lastName: 'User', role: 'site' };

        await authController.signup(req, res);

        expect(res.statusCode).toBe(201);
        expect(res._getJSONData()).toEqual({ message: 'User created successfully', user: { email: 'test@test.com' } });
    });

    it('should return 500 if there is a server error', async () => {
        User.findOne.mockRejectedValue(new Error('Server error'));

        req.body = { email: 'test@test.com', firstName: 'Test', lastName: 'User', role: 'site' };

        await authController.signup(req, res);

        expect(res.statusCode).toBe(500);
        expect(res._getJSONData()).toEqual({ message: 'Server error' });
    });
});

describe('AuthController - Signin', () => {
    let req, res;

    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        process.env.SECRET_KEY = 'testsecret';
    });

    it('should return 401 if email does not exist', async () => {
        User.findOne.mockResolvedValue(false);

        req.body = { email: 'test@test.com', password: 'password' };

        await authController.signin(req, res);

        expect(res.statusCode).toBe(401);
        expect(res._getJSONData()).toEqual({ message: 'Invalid email or password' });
    });

    it('should return 401 if password is invalid', async () => {
        User.findOne.mockResolvedValue({ password: 'hashedpassword' });
        bcrypt.compare.mockResolvedValue(false);

        req.body = { email: 'test@test.com', password: 'password' };

        await authController.signin(req, res);

        expect(res.statusCode).toBe(401);
        expect(res._getJSONData()).toEqual({ message: 'Invalid email or password' });
    });

    it('should return token if credentials are valid', async () => {
        const mockUser = { _id: '123', email: 'test@test.com', role: 'site', password: 'hashedpassword', mustChangePassword: false };
        User.findOne.mockResolvedValue(mockUser);
        bcrypt.compare.mockResolvedValue(true);
        jwt.sign.mockReturnValue('testtoken');

        req.body = { email: 'test@test.com', password: 'password' };

        await authController.signin(req, res);

        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toEqual({ token: 'testtoken', mustChangePassword: false });
    });

    it('should return 500 if there is a server error', async () => {
        User.findOne.mockRejectedValue(new Error('Server error'));

        req.body = { email: 'test@test.com', password: 'password' };

        await authController.signin(req, res);

        expect(res.statusCode).toBe(500);
        expect(res._getJSONData()).toEqual({ message: 'Server error' });
    });
});

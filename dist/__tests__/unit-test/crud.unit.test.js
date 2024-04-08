"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const crud_1 = require("../../utils/crud");
describe('addDocument', () => {
    it('should create a new document when valid data is provided', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockModel = {
            create: jest.fn().mockResolvedValue('new document'),
            findOneAndUpdate: jest.fn().mockResolvedValue('updated document'),
            deleteOne: jest.fn().mockResolvedValue('deleted document')
        };
        const data = { name: 'John Doe' };
        const result = yield (0, crud_1.addDocument)(mockModel)(data);
        expect(mockModel.create).toHaveBeenCalledWith(data);
        expect(result).toBe('new document');
    }));
});
describe('editDocument', () => {
    it('should edit a document when valid data with an id is provided', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockModel = {
            create: jest.fn().mockResolvedValue('new document'),
            findOneAndUpdate: jest.fn().mockResolvedValue('updated document'),
            deleteOne: jest.fn().mockResolvedValue('deleted document')
        };
        const data = { id: '123', name: 'Updated Name', age: 30 };
        const expectedQuery = { _id: data.id };
        const expectedUpdate = { $set: { name: 'Updated Name', age: 30 } };
        const editFunction = (0, crud_1.editDocument)(mockModel);
        yield editFunction(data);
        expect(mockModel.findOneAndUpdate).toHaveBeenCalledWith(expectedQuery, expectedUpdate);
    }));
});
describe('deleteDocument', () => {
    it('should delete a document when a valid id is provided', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockModel = {
            create: jest.fn().mockResolvedValue('new document'),
            findOneAndUpdate: jest.fn().mockResolvedValue('updated document'),
            deleteOne: jest.fn().mockResolvedValue('deleted document')
        };
        const id = '123';
        const expectedQuery = { _id: id };
        const deleteFunction = (0, crud_1.deleteDocument)(mockModel);
        yield deleteFunction(id);
        expect(mockModel.deleteOne).toHaveBeenCalledWith(expectedQuery);
    }));
});
describe('fetchAll', () => {
    it('should fetch all data and return it when successful', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockData = [{ id: '1', name: 'Data 1' }, { id: '2', name: 'Data 2' }];
        const mockedFn = jest.fn().mockResolvedValue(mockData);
        const req = {};
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const next = jest.fn();
        yield (0, crud_1.fetchAll)(mockedFn)(req, res, next);
        expect(mockedFn).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ code: 200, msg: 'Successfully fetched', data: mockData });
        expect(next).not.toHaveBeenCalled();
    }));
});

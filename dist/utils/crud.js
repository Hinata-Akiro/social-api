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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchOne = exports.fetchAll = exports.deleteDocument = exports.editDocument = exports.addDocument = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const caching_middleware_1 = require("../middleware/caching-middleware");
const addDocument = (Model) => (data) => __awaiter(void 0, void 0, void 0, function* () {
    return Model.create(data);
});
exports.addDocument = addDocument;
const editDocument = (Model) => (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = data, res = __rest(data, ["id"]);
    return Model.findOneAndUpdate({ _id: id }, { $set: res });
});
exports.editDocument = editDocument;
const deleteDocument = (Model) => (id) => __awaiter(void 0, void 0, void 0, function* () {
    return Model.deleteOne({ _id: id });
});
exports.deleteDocument = deleteDocument;
const fetchOne = (fn) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!id || !mongoose_1.default.Types.ObjectId.isValid(id)) {
            return next({ code: 400, msg: 'Invalid  ID' });
        }
        const data = yield fn(req.params.id);
        if (!data) {
            return next({ code: 404, msg: 'Data not found' });
        }
        const cacheKey = req.originalUrl;
        yield (0, caching_middleware_1.setToCache)(cacheKey, data, 600);
        return res.status(200).json({ code: 200, data: data });
    }
    catch (error) {
        return next({ code: 404, msg: error.message });
    }
});
exports.fetchOne = fetchOne;
const fetchAll = (fn) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield fn();
        const cacheKey = req.originalUrl;
        yield (0, caching_middleware_1.setToCache)(cacheKey, data, 600);
        return res.status(200).json({ code: 200, msg: "Successfully fetched", data: data });
    }
    catch (error) {
        return next({ code: 404, msg: error.message });
    }
});
exports.fetchAll = fetchAll;

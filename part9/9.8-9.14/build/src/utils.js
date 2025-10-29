"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewPatient = exports.NewPatientSchema = void 0;
const types_1 = require("./types");
const zod_1 = __importDefault(require("zod"));
exports.NewPatientSchema = zod_1.default.object({
    name: zod_1.default.string(),
    gender: zod_1.default.nativeEnum(types_1.Gender),
    dateOfBirth: zod_1.default.string().date(),
    occupation: zod_1.default.string(),
    ssn: zod_1.default.string()
});
const toNewPatient = (object) => {
    return exports.NewPatientSchema.parse(object);
};
exports.toNewPatient = toNewPatient;
exports.default = exports.toNewPatient;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pagination = void 0;
const pagination = (req) => {
    return {
        take: Number(req.query.take || 10),
        skip: Number(req.query.skip),
    };
};
exports.pagination = pagination;
//# sourceMappingURL=pagination.js.map
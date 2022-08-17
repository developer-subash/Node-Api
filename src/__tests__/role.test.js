const request = require("supertest");
const baseURL = "http://localhost:4000/api/v1/"
describe('Roles', () => {
    it("GET /roles", async () => {
        const response =   await request(baseURL).get("role");
        console.log("response", response.body);

        expect(response.body.data).not.toBe(null);
        expect(response.body.status).toBe('success');
        expect(response.statusCode).toBe(200);
        expect(response.body.error).not.toBeFalsy();
    });
});
import supertest from "supertest";

describe("Posts", () => {
  it("should return a list of posts", async () => {
    const { body, status } = await supertest(app).get("/posts");

    expect(status).toBe(200);
  });
});

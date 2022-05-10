describe("Posts", () => {
  it("should return a 200 status", async () => {
    const { status } = await global.testRequest.get("/posts");

    expect(status).toBe(200);
  });

  it("should return a list of posts", async () => {
    const { body } = await global.testRequest.get("/posts");

    expect(body).toEqual([{ id: 1, title: 'Post 1' }, { id: 2, title: 'Post 2' }]);
  });
});

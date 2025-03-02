import request from "supertest";
import app from "../index.js"; // Import your Express app
import Post from "../model/postSchema.model.js";

describe("Post API Tests", () => {
  // Clear the database before each test
  beforeEach(async () => {
    await Post.deleteMany({});
  });

  // Test for creating a post
  it("should create a new post", async () => {
    const res = await request(app)
      .post("/post/create")
      .send({
        title: "Test Post",
        article: "This is a test article",
        author: "Test Author",
        tags: ["test", "jest"],
        category: "Tech",
        publishedDate: "2023-10-01", // Add publishedDate
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.title).toEqual("Test Post");
    expect(res.body.publishedDate).toEqual("2023-10-01T00:00:00.000Z"); // Check publishedDate
  });

  // Test for fetching all posts
  it("should fetch all posts", async () => {
    // Create a test post
    await Post.create({
      title: "Test Post",
      article: "This is a test article",
      author: "Test Author",
      tags: ["test", "jest"],
      category: "Tech",
      publishedDate: "2023-10-01", // Add publishedDate
    });

    const res = await request(app).get("/post/getAllPosts");
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0].publishedDate).toEqual("2023-10-01T00:00:00.000Z"); // Check publishedDate
  });

  // Test for fetching a single post by ID
  it("should fetch a single post by ID", async () => {
    // Create a test post
    const post = await Post.create({
      title: "Test Post",
      article: "This is a test article",
      author: "Test Author",
      tags: ["test", "jest"],
      category: "Tech",
      publishedDate: "2023-10-01", // Add publishedDate
    });

    const res = await request(app).get(`/post/getPost/${post._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toEqual("Test Post");
    expect(res.body.publishedDate).toEqual("2023-10-01T00:00:00.000Z"); // Check publishedDate
  });

 it("should update a post", async () => {
   const post = await Post.create({
     title: "Test Post",
     article: "This is a test article",
     author: "Test Author",
     tags: ["test", "jest"],
     category: "Tech",
     publishedDate: "2023-10-01",
   });

   const res = await request(app)
     .put(`/post/update/${post._id}`)
     .send({ title: "Updated Title", publishedDate: "2023-10-02" }); // Include publishedDate
   expect(res.statusCode).toEqual(200);
   expect(res.body.title).toEqual("Updated Title");
   expect(res.body.publishedDate).toEqual("2023-10-02T00:00:00.000Z"); // Check updated publishedDate
 });

  // Test for deleting a post
  it("should delete a post", async () => {
    // Create a test post
    const post = await Post.create({
      title: "Test Post",
      article: "This is a test article",
      author: "Test Author",
      tags: ["test", "jest"],
      category: "Tech",
      publishedDate: "2023-10-01", // Add publishedDate
    });

    const res = await request(app).delete(`/post/delete/${post._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("Post deleted successfully");

    // Verify the post is deleted
    const deletedPost = await Post.findById(post._id);
    expect(deletedPost).toBeNull();
  });

  // Test for invalid post ID
  it("should return 404 for invalid post ID", async () => {
    const invalidId = "123456789012345678901234"; // Invalid ObjectId
    const res = await request(app).get(`/post/getPost/${invalidId}`);
    expect(res.statusCode).toEqual(404);
  });
});

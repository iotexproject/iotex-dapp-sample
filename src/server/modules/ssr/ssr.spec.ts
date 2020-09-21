import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { SSRFilter } from "./ssr.filter";
import request from "supertest";

describe("Template", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({}).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalFilters(new SSRFilter());
    await app.init();
  });

  it("should app started", (done) => {
    request(app.getHttpServer())
      .get("/")
      .expect(200)
      .end((err, res) => {
        expect(res.text).toContain('<div id="root">');
        done();
      });
  });

  afterAll(async () => {
    await app.close();
  });
});

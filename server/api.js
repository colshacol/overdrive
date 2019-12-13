import * as mysql from "./mysql";

export default async (app) => {
  const db = await mysql.connect();

  app.post("/api/authenticate", async (request, response) => {
    // ...
  });

  app.get("/api/v0/getParcels", async (request, response) => {
    try {
      const result = await db.query`select * from dbo.Parcel`;
      response.send({ parcels: result.recordset });
    } catch (error) {
      console.log("error:", error);
    }
  });

  app.get("/api/v0/getTitles", async (request, response) => {
    try {
      const result = await db.query`select * from dbo.Title`;
      response.send({ titles: result.recordset });
    } catch (error) {
      console.log("error:", error);
    }
  });
};

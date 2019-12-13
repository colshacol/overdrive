import sql from "mssql";

export const connect = async () => {
  await sql.connect("mssql://plmweb:Global3404@plmland.database.windows.net/landdev?encrypt=true");
  return sql;
};

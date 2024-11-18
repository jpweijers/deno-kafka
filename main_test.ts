import { assertEquals } from "@std/assert";
import { PORT, startServer, stopServer } from "./main.ts";

Deno.test("main", async (t) => {
  startServer();
  const conn = await Deno.connect({ port: PORT });

  await t.step("handle connection", async () => {
    const expected = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 7]);

    const readBuffer = new Uint8Array(8);
    const readBytes = await conn.read(readBuffer);
    const result = readBuffer.slice(0, readBytes ?? 0);

    assertEquals(result, expected);
  });

  conn.close();
  stopServer();
});

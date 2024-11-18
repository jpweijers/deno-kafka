export const PORT = 9092;

let listener: Deno.Listener;

export const startServer = async () => {
  listener = Deno.listen({ port: PORT });

  for await (const conn of listener) {
    await handleConnection(conn);
    conn.close();
  }
};

export const stopServer = () => {
  listener.close();
};

export const handleConnection = async (conn: Deno.Conn) => {
  const correlationId = 7;
  const response = new Uint8Array(8);
  response.set([0, 0, 0, 0, 0, 0, 0, correlationId]);
  await conn.write(response);
};

if (import.meta.main) {
  startServer();
}

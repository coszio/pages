const connections = {
  POSTS_DEV: "http://localhost:8787",
  POSTS_PROD: "https://workers.luis-cossio.workers.dev",
};

const path = connections.POSTS_PROD;

export {
  path,
  connections,
}
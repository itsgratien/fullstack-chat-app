export const environment = {
  webSocketUri: process.env.WS_URI || 'ws://localhost:4000/graphql',
  httpUri: process.env.HTTP_URI!,
};

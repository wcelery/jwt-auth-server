const db = {
  password: '000063upolo',
  hostname: 'localhost',
};

export const connectionString = `mongodb://wcelery:${db.password}@${db.hostname}/myFirstDatabase?ssl=true&replicaSet=atlas-1oaq54-shard-0&authSource=admin&retryWrites=true&w=majority`;

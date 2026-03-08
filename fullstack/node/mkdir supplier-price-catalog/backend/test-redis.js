import { createClient } from 'redis';

const client = createClient({ url: 'redis://localhost:6379' });

client.on('error', (err) => console.log('Redis Client Error', err));

await client.connect();
await client.set('test', 'Hello Redis');
const value = await client.get('test');
console.log('Value from Redis:', value);
await client.disconnect();
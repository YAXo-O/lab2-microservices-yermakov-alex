export default {
   cli: {
		entitiesDir: 'src/entity',
		migrationsDir: 'src/migration',
		subscribersDir: 'src/subscriber',
   },
   entities: [
		'src/entity/**/*.ts',
   ],
   logging: true,
   migrations: [
		'src/migration/**/*.ts',
   ],
   subscribers: [
		'src/subscriber/**/*.ts',
   ],
   synchronize: true,
   type: 'postgres',
   url: process.env.DATABASE_URL || 'postgres://dips:123456@localhost:5432/billing-consumptions',
};

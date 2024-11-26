use('cinema-online');

db.createUser({
  user: 'user',
  pwd: 'user',
  roles: [
    {
      role: 'dbOwner',
      db: 'cinema-online',
    },
  ],
});

db.createCollection('users');

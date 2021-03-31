let DATABASE_NAME = 'googleTranslatingSupportData';
//let DATABASE_NAME = 'test';
const DROP_AND_CREATE = false;
let server = null;
let promise = null;

if(DROP_AND_CREATE) {
  p = db.delete(DATABASE_NAME)
  .then(() => console.log('db deleted ok.', DATABASE_NAME))
  .catch((err) => console.log(err));
  schema = {
    searchTargets: {
      key: {
        keyPath: 'id',
        autoIncrement: true
      },
      indexes: { // Optionally add indexes
        searchTarget: {},
        updated: {}
      }
    }
  };
} else {
  p = Promise.resolve();
  schema = {};
}

p = p
.then(() =>
  db.open({
    server: DATABASE_NAME,
    version: 1,
    schema: schema
  })
);

p
.catch(function (err) {
  console.log('db open error.', err);
    if (err.type === 'blocked') {
        oldConnection.close();
        return err.resume;
    }
    // Handle other errors here
    throw err;
})
.then((s) => {
  server = s;
  console.log('db open.', DATABASE_NAME);
});


function deleteAll() {
  server.searchTargets.query().all().execute()
  .then(results => { console.log(results); return results; })
  .then(results => {
    results.forEach(result => {
      server.searchTargets.remove(result.id)
      .then((removed) => console.log('removed', removed));
    });
  });
}

function selectAll() {
  server.searchTargets.query().all().execute().then(results => console.log(results));
}

function dataInit() {
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(i => server.searchTargets.add({
    searchTarget: 'target' + i,
    age: i,
    created: Date.now()
  }));
}

//select * from searchTarges where 1=1
server.searchTargets.query('searchTarget').only('target1').execute().then(results => console.log(results));

//update searchTargets set
server.searchTargets.query('searchTarget').only('target1').execute()
.then(results => { console.log(results); return results })
.then(results => {
  results.forEach(result => {
    result.age = result.age*2;
    server.searchTargets.update(result)
    .then(updated => console.log('updated', updated));
  });
});

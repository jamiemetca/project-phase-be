const app = require('./app');
const PORT = process.env.PORT || require('./config').PORT;

app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log(`Listening on port ${PORT}`);
});

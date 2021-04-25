const app = require('express')();
const port = process.env.PORT || 4000;


require('./startup/cors')(app);
require('./startup/routes')(app);

app.listen(port, () => {
  console.log(`server successfully listening on port ${port}`);
});
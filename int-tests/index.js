const app = require('../src/app');
const request = require('supertest');

request(app)
  .post('/post')
  .send({'username':'payo', 'title':'Hello world.', 'content':'Good morning sunrise. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent varius, erat in sollicitudin consectetur, urna elit varius ante, a bibendum mi mi a dui. In ac dui tortor. Donec faucibus volutpat lectus, a porttitor felis interdum in. Nulla facilisi. In euismod quis risus sit amet sodales. Proin vehicula dapibus mi, quis commodo urna luctus sed. Mauris dapibus, odio a dignissim bibendum, urna risus pretium nunc, non mollis leo elit non nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse nec egestas urna. Duis ullamcorper placerat erat, sed convallis nisl. Sed nec urna nisi. Aliquam eleifend diam quis nibh bibendum ultricies. Sed ultricies, nisi et sollicitudin egestas, nunc risus auctor nisl, a placerat lectus dolor in purus.'}) //make sure that username payo has already exist on db
  .expect(200)
  .end((err, res) => {
    if(err) throw err;
    else console.log("success");
  });


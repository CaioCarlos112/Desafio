var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    const docs = await global.db.findAll();
    res.render('index', { title: 'Funcionários', docs });
  } catch (err) {
    next(err);
  }
})

router.get('/new', (req, res, next) => {
  res.render('new', { title: 'Novo Cadastro', doc: {"nome":"", "Valor":"", "Horas":""}, action: '/new' });
 });
 
router.post('/new', async (req, res, next) => {
  const nome = req.body.nome;
  const Valor = parseInt(req.body.Valor);
  const Horas = parseInt(req.body.Horas);
  try {
    const result = await global.db.insert({ nome, Valor, Horas });
    console.log(result);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
})

module.exports = router;

router.get('/edit/:id', async (req, res, next) => {
  const id = req.params.id;
 
  try {
    const doc = await global.db.findOne(id);
    res.render('new', { title: 'Edição de Funcionários', doc, action: '/edit/' + doc._id });
  } catch (err) {
    next(err);
  }
})

router.post('/edit/:id', async (req, res) => {
  const id = req.params.id;
  const nome = req.body.nome;
  const Valor = parseInt(req.body.Valor);
  const Horas = parswInt(req.body.Horas);
  try {
    const result = await global.db.update(id, { nome, Valor, Horas });
    console.log(result);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
})

router.get('/delete/:id', async (req, res) => {
  const id = req.params.id;
 
  try {
    const result = await global.db.deleteOne(id);
    console.log(result);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
})
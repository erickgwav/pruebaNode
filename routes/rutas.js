const express = require("express"); // Importar express
const router = express.Router();
const tiempo = require("../calculos");

router.get('/calculos/:segs', (req, res) => {
    const { segs } = req.params;
    let a = tiempo.minutos(segs);
    let b = tiempo.horas(segs);
    console.log(segs, a, b);
    res.send({
        segundos: segs,
        minutos: a.toFixed(2),
        horas: b.toFixed(2)
    });
});

router.get('/', (req, res) => {
    res.send({ message: "hola mundo soy Erick Eduardo González Esparza" });
});


module.exports = router;

const router = require('express').Router();
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
//const { datos } = require('./controllers/appController');

router.get('/mailDuda/:correo/:nombre/:descripcion', (req, res) => {
    const userEmail = req.params.correo;
    const nombre = req.params.nombre;
    const descripcion = req.params.descripcion;
    const mailAdmin = "cinefaction.mx@gmail.com"

    console.log("Correo: ",userEmail);
    console.log("Nombre: ",nombre);
    console.log("Descripcion: ",descripcion);
    
    let config = {
      service: "gmail",
      auth: {
        user: mailAdmin,
        pass: "jfkimvmmaqzutksk",
      },
    };
  
    let transporter = nodemailer.createTransport(config);
  
    let mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "CineFaction",
        link: "https://rbautista1292.github.io/MiniGina2Angular/inicio",
        copyright: 'Copyright © 2023 CineFaction. Todos los derechos reservados.'
      },
    });
  
    let response = {
      body: {
        name: "Admin",
        intro: `Duda de: ${nombre} - ${userEmail}`,
        action: {
          instructions: `${descripcion}`,
          button: {
            color: '#596bb0', // Optional action button color
            text: 'Ir al sitio',
            link: 'https://rbautista1292.github.io/MiniGina2Angular/inicio'
            }
        },
        outro: "",
      },
    };
  
    let mail = mailGenerator.generate(response);
  
    let message = {
      from: mailAdmin,
      to: mailAdmin,
      subject: "Duda de usuario",
      html: mail,
    };
  
    transporter
      .sendMail(message)
      .then(() => {
        res.send(req.params);
      })
      .catch((error) => {
        return res.status(500).json({
          error,
        });
      });
  
      
  });


  router.get('/mailCita/:correo/:usuario/:datos', (req, res) => {
    const userEmail = req.params.correo;
    const usuario = req.params.usuario;
    const datos = req.params.datos;
    const mailAdmin = "cinefaction.mx@gmail.com"

    console.log("Correo: ",userEmail);
    console.log("usuario: ",usuario);
    console.log("datos: ",datos);
    
    let config = {
      service: "gmail",
      auth: {
        user: mailAdmin,
        pass: "jfkimvmmaqzutksk",
      },
    };
  
    let transporter = nodemailer.createTransport(config);
  
    let mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "CineFaction",
        link: "https://rbautista1292.github.io/MiniGina2Angular/inicio",
        copyright: 'Copyright © 2023 CineFaction. Todos los derechos reservados.'
      },
    });
  
    let response = {
      body: {
        name: usuario,
        intro: "Se ha registrado su cita",
        table: {
            data: [
                {
                    Sala: `3`,
                    Pelicula: `Everything Everywhere All at Once`,
                    Fecha: `20/11/2045`,
                    Hora: `15:00`
                }
            ],
            columns: {
                // Optionally, customize the column widths
                customWidth: {
                    Sala: '10%',
                    Pelicula: '40%',
                    Fecha: '30%',
                    Hora: '20%'
                },
            }
        },
        action: {

          button: {
            color: '#596bb0', // Optional action button color
            text: 'Reservar otra sala',
            link: 'https://rbautista1292.github.io/MiniGina2Angular/catalogo'
            }
        },
        outro: "Gracias por reservar con nosotros",
      },
    };
  
    let mail = mailGenerator.generate(response);
  
    let message = {
      from: mailAdmin,
      to: userEmail,
      subject: "Registro de cita",
      html: mail,
    };
  
    transporter
      .sendMail(message)
      .then(() => {
        res.send(req.params);
      })
      .catch((error) => {
        return res.status(500).json({
          error,
        });
      });
  
      
  });

module.exports = router;

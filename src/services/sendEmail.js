require('dotenv').config();
var nodemailer = require('nodemailer');


const EnviarCorreo = async(destinatario, link)=>{

    //Requerimos el paquete
    

    //Creamos el objeto de transporte
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS_EMAIL
      }
    });

    var mensaje = `Link para actualizar la contraseña: ${link}`;


    var mailOptions = {
      from: `"Eider Pool" < ${process.env.EMAIL}>`,
      to: destinatario,
      subject: 'Cambio de contraseña',
      text: mensaje,
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email enviado: ' + info.response);
      }
    });


}


module.exports = {
  EnviarCorreo
}

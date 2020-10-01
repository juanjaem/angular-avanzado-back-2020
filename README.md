# BackEnd de la app *AdminPro*...
### ... del [curso avanzado de Angular](https://www.udemy.com/share/101rTgBUodc1dTRnw=/) de Fernando Herrera


 ### Entorno:
 - Windows 10/64
 - Node 12.18.3


### Despliege
1. `npm install` para instalar las dependencias de node
2. `npm run start:dev` para iniciar un servidor web local en el puerto `http://localhost:3000/`


### Despliegue en Heroku
1. Compilar la webApp de Angular con `ng build --prod`
2. Mover los archivos generados en `dist/adminpro/` a la carpeta del proyecto de backend `public/`
3. Desplegar al servidor utilizando *Heroku CLI*


### Endpoint de Heroku
https://git.heroku.com/juanjaem-adminpro-backend.git


### Notas
- Heroku resetea el servidor cada 24h, y borrará todas las imagenes subidas.
- Debido a que se trata de un curso, el código está sin pulir y muchas decisiones se han tomado con fines didácticos
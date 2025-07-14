✨ Gestión de eventos ✨ 

Soy un desarrollador web que ha recibido el encargo de desarrollar una Single Page
Application (SPA) dedicada a la gestión de eventos, diseñada para que un organizador de eventos
pueda gestionar una serie de eventos basados en la disponibilidad de lugares y asistentes.

📝 Descripción 📝

Este proyecto incluye la implementación de funcionalidades clave como la autenticación de usuarios, gestión de rutas protegidas, y persistencia de sesión, utilizando tecnologías modernas de
JavaScript, HTML5, y CSS. 

🛠️ Tecnologías usadas 🛠️

CSS Personalizado
JavaScript vanilla
HTML básico, solo para el muestreo de la data

💻 Instalación y uso local 💻

Para acceder al archivo

* Clona este repositorio con : git clone https://github.com/yxdth3/Gesti-n-de-eventos

* Navega al directorio del proyecto cd Gesti-n-de-eventos

* Instalación de dependencias =>
npm i (o npm install)
npm run start:api
npm start

* Para levantar el json-server solo corre en una terminal dentro del proyecto : json-server --watch db.json --port 3000

*Abrir index.html y correr con live server 

💻 Funcionalidades 💻
+ Registro e inicio de sesión con roles.
+ CRUD de eventos para administradores.
+ Inscripción a ceventos para visitantes.
+ Vistas depende a tipos de usuarios.
+ Rutas protegidas y redireccionamiento.


🚧 Estructura 🚧
```

├── Gestión de eventos/
│   ├── public/                    
        ├── js/
            ├── api.js             # Métodos del CRUD (con fetch)
            ├── app.js             # Inicializa las rutas y carga cada página
            ├── auth.js            # Autenticación 
            ├── router.js          # Administra las rutas
            ├── views.js  
        ├── style.css  
    ├── index.html                 # Lógica principal (inicio del SPA)
├── db.json                        # Archivo JSON
├── package-lock.json
└── package.json                    
```
📞 Contacto 📞

Nombre: Yiseth Gutiérrez Teléfono: 3206781487 Correo: gutierrezyiseth3@gmail.com GitHub: @yxdth3

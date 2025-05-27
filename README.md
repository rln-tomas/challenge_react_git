# Explorador de Usuarios de GitHub 👋

Esta es una aplicación móvil desarrollada con [Expo](https://expo.dev) y React Native que permite explorar perfiles de usuarios de GitHub, ver sus detalles y gestionar una lista de favoritos.
A su vez también en los detalles podemos acceder a sus perfiles en GitHub y a sus blogs si lo tienen disponible.

## Capturas de pantalla:

### Pantalla principal

<img src="screenshots/Simulator Screenshot - iPhone 16 - 2025-05-27 at 13.16.34.png" alt="Pantalla principal" width="300">
<img src="screenshots/Simulator Screenshot - iPhone 16 - 2025-05-27 at 13.17.13.png" alt="Pantalla principal - búsqueda" width="300">
<img src="screenshots/Simulator Screenshot - iPhone 16 - 2025-05-27 at 13.17.28.png" alt="Pantalla principal - resultados búsqueda" width="300">

### Sección de favoritos

<img src="screenshots/Simulator Screenshot - iPhone 16 - 2025-05-27 at 13.16.52.png" alt="Sección de favoritos" width="300">

### Detalle del usuario

<img src="screenshots/Simulator Screenshot - iPhone 16 - 2025-05-27 at 13.16.41.png" alt="Detalle del usuario" width="300">
<img src="screenshots/Simulator Screenshot - iPhone 16 - 2025-05-27 at 13.16.48.png" alt="Detalle del usuario - favorito" width="300">

## Tecnologías Utilizadas

- **Expo:** Framework para construir aplicaciones universales con React.
- **React Navigation:** Solución de enrutamiento y navegación. También se tiene en cuenta que `expo-router` utiliza React Navigation, pero para efectos prácticos se decidió utilizarlo directamente.
- **React Native Paper:** Biblioteca de componentes de UI basados en Material Design.
- **Context API de React:** Para la gestión del estado de los favoritos.
- **GitHub API:** Para obtener la información de los usuarios.

## Get started

1. Instalar dependencias:

   ```bash
   npm install
   ```

2. Iniciar la app:

   ```bash
   npx expo start
   ```

// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          HtLKwExDRaFD: "Welcome to our app",
          WnEKnSLxFgMf: "Article",
          PtGWeRNeXyZp: "Profile",
          MkLjQvBjAcTY: "This is the profile page.",
          JyKnEfNvQuWs: "Settings",
          RgVeFkVqTgNe: "User name",
          LkMwPtHwNxLp: "E-Mail",
          EjKsLyGfLkWp: "Reset password by email",
          WpGfRtVnLyKv: "Language",
          JmQsPrNzHyEp: "Trial period",
          GjHtRnMkVpLs: "{{count}} day(s)",
          KjTpFqJnBkSw: "Log out",
          KjTpFqJnBkSw3: "Test",
          VbNfGxLkRwMv: "Loading user data...",
          FwLpTyZjXvLs: "Spanish",
          JqNgWtPvLzGx: "English",
          QkPsYwVzBfHt: "Login",
          MtQxGyLpNtVw: "Password",
          ZrNxYfQwGbLt: "Create Account",
          KsLqPwGrVxFy: "Forgot Password?",
          RfGxBqWsJyKv: "Error in auth",
          LtPgNxGrLxVy: "There was an error trying to log in, try  again.",
          HsJkTrLvBnLk: "The password must be at least 8 characters long.",
          FkLnRtQwXzTv: "Passwords do not match.",
          JsNxPwRqLmBt: "Email is already registered. Use another email.",
          LjRtKqXsVwMn: "There was an error registering the user. Try again.",
          PgLrTqJsXzVm: "Create Account",
          JqPwFxTlRvNw: "Name",
          FrWpNtQjLzMv: "Email",
          LfNrTjPwXzQk: "Password",
          PqFsRvJmXtQl: "Hide",
          LmPsQwNrTvFx: "Show",
          XnLqTvFrRmNs: "Confirm Password",
          JsRwNqTwXlBt: "Register",
          LqKsTwFxRjXp: "Already have an account? Log In",
          AbCdEfGhIjKl: "Search...",
          AbCdEfGhIj1l: "← Back to list",
          MnOpQrStUvWx: "By:",
          AbCdEfGhIjKo: "Tips for Gastric Health and Wellness",
          ZxCvBnMqWkLp: "Welcome, {{userName}}!",
          AsDfGhJkLqWe: "Recently viewed",
          A1B2C3D4E5F7: "Category:",
          G7H8I9J0K1L2: "Reactive",
          M3N4O5P6Q7R8: "Sensitive",
          S9T0U1V2W3X4: "Safe",
          A1B2C3D4E5F6: "Reactive",
          G7H8I9J0K1L2: "Sensitive",
          M3N4O5P6Q7R8: "Safe",
          QwErTyUiOpAs: "Food List",
          ZxAsDfGhJkLm: "Add item",
          QwErTyUiOpLk: "Home",
          ZxCvBnMqWeRt: "Test",
          AsDfGhJkLqWe: "Wishlist",
          GhJkLmNpQrSt: "Lists",
          UiOpAsDfGhJk: "Articles",
          WxYzAbCdEfGh: "Wishlist",
          HiJkLmNoPqRs: "Test",
          TuVwXyZaBcDe: "Delete",
          AZDfGhJkLqWe: "Recently viewed",
          H1I2J3K4L5M6: "Test",
          W7X8Y9Z0A1B2: "Product",
          T3U4V5W6X7Y8: "Select number of days",
          M9N0O1P2Q3R4: "Are you sure that you want to do this test?",
          A5B6C7D8E9F0: "Continue",
          MnOpQrStUvWx1: "No data available",
          MnOpQrStUvWx2: "No time available",
          MnOpQrStUvWx3:"Finished test",
          MnOpQrStUvWx4: "Critic",
          MnOpQrStUvWx5: "Sensitive",
          MnOpQrStUvWx6: "Safe",
          MnOpQrStUvWx7: "Remaining time of the test",
          MnOpQrStUvWx8: "days",        // Plural
          MnOpQrStUvWx9: "day",         // Singular
          MnOpQrStUvWx10: "hours",      // Plural
          MnOpQrStUvWx11: "hour",       // Singular
          MnOpQrStUvWx12: "minutes",    // Plural
          MnOpQrStUvWx13: "minute",      // Singular
          MnOpQrStUvWxA: "No data available",
          MnOpQrStUvWxB: "History of tested products",
          MnOpQrStUvWxC: "Last time tested",
          MnOpQrStUvWxD: "Days selected for the test",
          MnOpQrStUvWx15: "Product not found.",
          MnOpQrStUvWx16: "Error loading product details.",
          MnOpQrStUvWx17: "Loading...",
          MnOpQrStUvWx18: "Brand",
          MnOpQrStUvWx19: "Barcode",
          MnOpQrStUvWx20: "Ingredients",
          MnOpQrStUvWx21: "Not available",
          MnOpQrStUvWx22: "Product ID", 
          MnOpQrStUvWx23: "Critic",
          MnOpQrStUvWx24: "Sensitive",
          MnOpQrStUvWx25: "Safe",
          MnOpQrStUvWx26: "Error loading user data.",
          MnOpQrStUvWx27: "Error saving notes.",
          MnOpQrStUvWx28: "Error saving sensitivity category.",
          MnOpQrStUvWx29: "Error adding to wishlist.",
          MnOpQrStUvWx30: "Reaction",
          MnOpQrStUvWx31: "Notes",
          MnOpQrStUvWx32: "Type here",
          MnOpQrStUvWx33: "Saving...",
          MnOpQrStUvWx34: "Save",
          MnOpQrStUvWx35: "Options",
          MnOpQrStUvWx36: "In Wishlist",
          MnOpQrStUvWx37: "Add to Wishlist",
          MnOpQrStUvWx38: "Start test",




          
          
          
          

          


          
          
    
          
        }
      },
      es: {
        translation: {
          HtLKwExDRaFD: "Bienvenido a nuestra aplicación",
          WnEKnSLxFgMf: "Artículo",
          PtGWeRNeXyZp: "Perfil",
          MkLjQvBjAcTY: "Esta es la página de perfil.",
          JyKnEfNvQuWs: "Configuración",
          RgVeFkVqTgNe: "Nombre de usuario",
          LkMwPtHwNxLp: "Correo electrónico",
          EjKsLyGfLkWp: "Restablecer contraseña por correo electrónico",
          WpGfRtVnLyKv: "Idioma",
          JmQsPrNzHyEp: "Periodo de prueba",
          GjHtRnMkVpLs: "{{count}} día(s)",
          KjTpFqJnBkSw: "Cerrar sesión",
          KjTpFqJnBkSw3: "Probar",
          VbNfGxLkRwMv: "Cargando datos del usuario...",
          FwLpTyZjXvLs: "Español",
          JqNgWtPvLzGx: "Inglés",
          QkPsYwVzBfHt: "Iniciar Sesión",
          MtQxGyLpNtVw: "Contraseña",
          ZrNxYfQwGbLt: "Crear Cuenta",
          KsLqPwGrVxFy: "¿Olvidaste tu contraseña?",
          RfGxBqWsJyKv: "Error en la autenticación",
          LtPgNxGrLxVy: "Hubo un error al intentar iniciar sesión. Inténtalo de nuevo.",
          HsJkTrLvBnLk: "La contraseña debe tener al menos 8 caracteres.",
          FkLnRtQwXzTv: "Las contraseñas no coinciden.",
          JsNxPwRqLmBt: "El correo ya está registrado. Usa otro correo.",
          LjRtKqXsVwMn: "Hubo un error al registrar el usuario. Inténtalo de nuevo.",
          PgLrTqJsXzVm: "Crear Cuenta",
          JqPwFxTlRvNw: "Nombre",
          FrWpNtQjLzMv: "Correo Electrónico",
          LfNrTjPwXzQk: "Contraseña",
          PqFsRvJmXtQl: "Ocultar",
          LmPsQwNrTvFx: "Mostrar",
          XnLqTvFrRmNs: "Confirmar Contraseña",
          JsRwNqTwXlBt: "Registrarse",
          LqKsTwFxRjXp: "¿Ya tienes una cuenta? Inicia Sesión",
          AbCdEfGhIjKl: "Buscar...",
          AbCdEfGhIj1l: "← Volver a la lista",
          MnOpQrStUvWx: "Por:",
          AbCdEfGhIjKo: "Tips para Salud y Bienestar Gástrico",
          ZxCvBnMqWkLp: "¡Bienvenido, {{userName}}!",
          AsDfGhJkLqWe: "Visto recientemente",
          A1B2C3D4E5F7: "Categoría:",
          G7H8I9J0K1L2: "Reactivo",
          M3N4O5P6Q7R8: "Sensible",
          S9T0U1V2W3X4: "Seguro",
          A1B2C3D4E5F6: "Reactivo",
          G7H8I9J0K1L2: "Sensible",
          M3N4O5P6Q7R8: "Seguro",
          QwErTyUiOpAs: "Lista de Alimentos",
          ZxAsDfGhJkLm: "Agregar item",
          QwErTyUiOpLk: "Inicio",
          ZxCvBnMqWeRt: "Pruebas",
          AsDfGhJkLqWe: "Lista de deseos",
          GhJkLmNpQrSt: "Listas",
          UiOpAsDfGhJk: "Artículos",
          WxYzAbCdEfGh: "Lista de deseos",
          HiJkLmNoPqRs: "Probar",
          TuVwXyZaBcDe: "Eliminar",
          AZDfGhJkLqWe: "Visto recientemente",
          H1I2J3K4L5M6: "Prueba",
          W7X8Y9Z0A1B2: "Producto",
          T3U4V5W6X7Y8: "Selecciona el número de días",
          M9N0O1P2Q3R4: "¿Estás seguro de que deseas hacer esta prueba?",
          A5B6C7D8E9F0: "Continuar",
          MnOpQrStUvWx1: "Nombre no disponible",
          MnOpQrStUvWx2: "Tiempo no disponible",
          MnOpQrStUvWx3:"Prueba finalizada",
          MnOpQrStUvWx4: "Crítico",
          MnOpQrStUvWx5: "Sensible",
          MnOpQrStUvWx6: "Seguro",
          MnOpQrStUvWx7: "Tiempo restante de la prueba",
          MnOpQrStUvWx8: "días",        // Plural
          MnOpQrStUvWx9: "día",         // Singular
          MnOpQrStUvWx10: "horas",      // Plural
          MnOpQrStUvWx11: "hora",       // Singular
          MnOpQrStUvWx12: "minutos",    // Plural
          MnOpQrStUvWx13: "minuto",      // Singular
          MnOpQrStUvWxA: "Nombre no disponible",
          MnOpQrStUvWxB: "Historial de pruebas de productos",
          MnOpQrStUvWxC: "Última vez probado",
          MnOpQrStUvWxD: "Días seleccionados para la prueba",
          MnOpQrStUvWx15: "Producto no encontrado.",
          MnOpQrStUvWx16: "Error al cargar detalles del producto.",
          MnOpQrStUvWx17: "Cargando...",
          MnOpQrStUvWx18: "Marca",
          MnOpQrStUvWx19: "Código de barras",
          MnOpQrStUvWx20: "Ingredientes",
          MnOpQrStUvWx21: "No disponible",
          MnOpQrStUvWx22: "ID del producto",
          MnOpQrStUvWx23: "Crítico",
          MnOpQrStUvWx24: "Sensible",
          MnOpQrStUvWx25: "Seguro",
          MnOpQrStUvWx26: "Error al cargar datos del usuario.",
          MnOpQrStUvWx27: "Error al guardar notas.",
          MnOpQrStUvWx28: "Error al guardar la categoría de sensibilidad.",
          MnOpQrStUvWx29: "Error al agregar a la lista de deseos.",
          MnOpQrStUvWx30: "Reacción",
          MnOpQrStUvWx31: "Notas",
          MnOpQrStUvWx32: "Escribe aquí",
          MnOpQrStUvWx33: "Guardando...",
          MnOpQrStUvWx34: "Guardar",
          MnOpQrStUvWx35: "Opciones",
          MnOpQrStUvWx36: "En la lista de deseos",
          MnOpQrStUvWx37: "Agregar a la lista de deseos",
          MnOpQrStUvWx38: "Iniciar prueba",



          
          

          
        }
      }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;

/**
 * Formatea errores de autenticación y red en mensajes amigables para el usuario en español.
 */
export function formatAuthError(error: Error | string | null | undefined): string {
  if (!error) return 'Ocurrió un error inesperado.';

  const message = typeof error === 'string' ? error : error.message || '';

  const lower = message.toLowerCase();

  // Errores de red / DNS / Conectividad
  if (
    lower.includes('unknownhostexception') ||
    lower.includes('unable to resolve host') ||
    lower.includes('no address associated with hostname') ||
    lower.includes('network request failed') ||
    lower.includes('fetch failed') ||
    lower.includes('failed to fetch')
  ) {
    return 'No se pudo conectar con el servidor de Sorae. Revisa tu conexión a internet o desactiva VPN / DNS privado en tu dispositivo.';
  }

  // Usuario ya registrado
  if (lower.includes('user already registered') || lower.includes('already exists')) {
    return 'Este correo electrónico ya está registrado. Intenta iniciar sesión.';
  }

  // Credenciales inválidas
  if (lower.includes('invalid login credentials') || lower.includes('invalid credentials')) {
    return 'Correo o contraseña incorrectos. Verifica tus datos.';
  }

  // Email no confirmado
  if (lower.includes('email not confirmed')) {
    return 'Por favor confirma tu correo electrónico antes de ingresar.';
  }

  // Contraseña muy corta
  if (lower.includes('password should be at least') || lower.includes('password is too short')) {
    return 'La contraseña debe contener al menos 6 caracteres.';
  }

  // Rate limit / Demasiadas solicitudes
  if (lower.includes('rate limit') || lower.includes('too many requests') || lower.includes('over_email_send_rate_limit')) {
    return 'Demasiados intentos seguidos. Por favor espera unos minutos e inténtalo de nuevo.';
  }

  // Invalid email
  if (lower.includes('invalid email') || lower.includes('valid email')) {
    return 'Por favor introduce un correo electrónico válido.';
  }

  return message;
}

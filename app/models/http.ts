declare module '@adonisjs/core/http' {
  interface Request {
    csrfToken: string
  }
}

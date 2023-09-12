class AuthInterface {
    login(credentials: { username: string; password: string }) {}
    refreshToken(token: string) {}
}

export = AuthInterface;

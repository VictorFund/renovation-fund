export const authConfig = {
    pages: {
        // когда результатом вызова authorized будет false - выполняется redirect на прописанный в signIn адрес
        signIn: "/dashboard/login",
    },
    providers: [],
    callbacks: {
        // создается token, с помощью которого потом обновится session
        async jwt({ token, user }) {
            if (user) {
                token.isAdmin = user.isAdmin;
            }
            return token;
        },
        //обновляет session, если есть token
        async session({ session, token }) {
            if (token) {
                session.user.isAdmin = token.isAdmin;
            }
            return session;
        },

        //когда результатом authorized будет return false - выполняется redirect - на signIn: "/dashboard" в pages (прописано выше)
        authorized({ auth, request }) {
            const isPrincipal = auth?.user?.email === process.env.NEXT_PUBLIC_OWNER
            const isAdmin = auth?.user?.isAdmin || auth?.user?.email === process.env.NEXT_PUBLIC_DEVELOPER
            const isAuthorised = auth?.user;

            const isOnPrincipalPages = request.nextUrl?.pathname.startsWith('/dashboard/users');
            const isOnAdminPages = request.nextUrl?.pathname.startsWith('/dashboard/news') || request.nextUrl?.pathname.startsWith('/dashboard/partnership') || request.nextUrl?.pathname.startsWith('/dashboard/projects') || request.nextUrl?.pathname.startsWith('/dashboard/team') || request.nextUrl?.pathname.startsWith('/dashboard/users')
            const isOnAuthPages = request.nextUrl?.pathname.endsWith('login') || request.nextUrl?.pathname.endsWith('register');
            const isOnMainDashboard = request.nextUrl?.pathname.endsWith('dashboard');


            //ONLY OWNER CAN REACH isOnPrincipalPages
            if (isOnPrincipalPages && !isPrincipal) {
                return false;
            }
            //ONLY ADMINS CAN REACH isOnAdminPages
            if (isOnAdminPages && !isAdmin) {
                return false;
            }
            // ONLY UNAUTHENTICATED CAN REACH LOGIN PAGE
            if (isOnAuthPages && isAuthorised) {
                return Response.redirect(new URL('/dashboard', request.nextUrl))
            }
            // ONLY AUTHENTICATED CAN REACH MAIN DASHBOARD PAGE
            if (isOnMainDashboard && !isAuthorised) {
                return Response.redirect(new URL('/dashboard/login', request.nextUrl))
            }

            return true;
        }
    }
}
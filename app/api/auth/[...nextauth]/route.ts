import NextAuth, { RequestInternal } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import SpotifyProvider from "next-auth/providers/spotify";
import { cookies } from 'next/headers';
import GithubProvider from "next-auth/providers/github";
import RedditProvider from "next-auth/providers/reddit";
import DiscordProvider from "next-auth/providers/discord";
import FacebookProvider from "next-auth/providers/facebook";

const handler = NextAuth({
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text", placeholder: "email@example.com" },
                password: { label: "Password", type: "password" },
                type: { label: "Type", type: "text", placeholder: "user_type" }
            },
            async authorize(credentials: any, req: any) {
                if (!credentials) return null;
                const { email, password, type } = credentials;
                if (!email || !password) {
                    return null;
                }

                const response = await fetch(`${process.env.SERVER_HOST}/session`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ user: { provider: "own", email: email, password: password, type: type } }),
                });
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data = await response.json();
                cookies().set({ name: 'session', value: data?.id_session, path: '/' });
                const user = { id: data?.id_session, name: email, provider: 'own', email: email };
                if (user) {
                    return user;
                } else {
                    return null;
                }
            },
        }),
        DiscordProvider({
            clientId: process.env.DISCORD_CL_ID || '',
            clientSecret: process.env.DISCORD_CL_SECRET || '',
            async profile(profile) {
                console.log("profile Discord ", profile);
                return {
                    provider: "discord",
                    ...profile,
                };
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
            authorization: {
                params: {
                    access_type: "offline",
                    response_type: "code",
                    scope: "openid email profile https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/gmail.readonly",
                },
            },
            async profile(profile) {
                return {
                    ...profile,
                    provider: "google",
                    id: profile.sub.toString(),
                };
            },
        }),
        SpotifyProvider({
            clientId: process.env.SPOTIFY_ID || '',
            clientSecret: process.env.SPOTIFY_SECRET || '',
            authorization: "https://accounts.spotify.com/authorize?scope=user-read-email&callback=http://localhost:8081/dashboard",
            async profile(profile) {
                return {
                    ...profile,
                    provider: "spotify",
                    name: profile.id.toString(),
                    photo: profile.images[0],
                };
            },
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || '',
            async profile(profile: any) {
                console.log("profile Github ", profile);
                return {
                    provider: "github",
                    ...profile,
                };
            },
        }),
        RedditProvider({
            clientId: process.env.REDDIT_ID || '',
            clientSecret: process.env.REDDIT_SECRET || '',
            async profile(profile) {
                console.log("profile Reddit ", profile);
                return {
                    provider: "reddit",
                    email: "inconnu",
                    ...profile,
                };
            },
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_ID || '',
            clientSecret: process.env.FACEBOOK_SECRET || '',
            async profile(profile) {
                console.log("profile Facebook ", profile);
                return {
                    provider: "facebook",
                    ...profile,
                };
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET || '',
    callbacks: {
        async signIn({ user, account, profile } : any) {
            if (user.provider === "own") return true;
            const session = cookies().get('session')?.value || user.session;
            const response = await fetch(`${process.env.SERVER_HOST}/session`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user, account, session }),
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            if (data.id_session) cookies().set({ name: 'session', value: data.id_session, path: '/' });
            user.session = data.id_session;
            return true;
        },
        async jwt({ token, account } : any) {
            if (account) {
                token.accessTokens = token.accessTokens || [];
                if (account.access_token) {
                    token.accessTokens.push({ provider: account.provider, token: account.access_token });
                }
            }
            return token;
        },
        async session({ session, token } : any) {
            return {
                ...session,
                accessTokens: token.accessTokens,
            };
        },
        async redirect({ url, baseUrl } : any) {
            if (url.startsWith("/")) return `${baseUrl}${url}`;
            else if (new URL(url).origin === baseUrl) return url;
            return url;
        },
    },
});

export { handler as GET, handler as POST };

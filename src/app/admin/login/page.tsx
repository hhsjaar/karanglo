"use client";

import { useActionState } from "react";
import { login } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const initialState = {
    message: "",
};

export default function AdminLoginPage() {
    const [state, formAction, isPending] = useActionState(login, initialState);

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900 px-4">
            <Card className="w-full max-w-sm shadow-lg">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
                    <CardDescription>
                        Masukan username dan password untuk masuk ke dashboard.
                    </CardDescription>
                </CardHeader>
                <form action={formAction}>
                    <CardContent className="space-y-4">
                        {state?.message && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>
                                    {state.message}
                                </AlertDescription>
                            </Alert>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                name="username"
                                type="text"
                                placeholder="admin"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" type="submit" disabled={isPending}>
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Memproses...
                                </>
                            ) : (
                                "Login Masuk"
                            )}
                        </Button>
                    </CardFooter>
                </form>
                <div className="pb-6 text-center text-xs text-muted-foreground">
                    &copy; 2024 Pemerintah Desa Karanglo
                </div>
            </Card>
        </div>
    );
}

'use client';

import * as React from 'react';
import { Alert } from '@/ui/alert';
import { AuthLayout } from '@/ui/auth-layout';
import { Button } from '@/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/ui/card';
import { Input } from '@/ui/input';

/** A complete presentation example. Connect submission to your app's auth flow. */
export function AuthExample() {
  const [submitted, setSubmitted] = React.useState(false);
  return (
    <AuthLayout>
      <div className="flex items-center justify-between text-sm">
        <a href="/examples" className="font-semibold text-primary underline-offset-4 hover:underline">
          internet-ui
        </a>
        <span className="text-muted-foreground">Authentication example</span>
      </div>
      <Card padding="lg">
        <CardHeader>
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>Sign in to your workspace.</CardDescription>
        </CardHeader>
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
          }}
        >
          <div className="space-y-2">
            <label htmlFor="example-email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="example-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="example-password" className="text-sm font-medium">
              Password
            </label>
            <Input id="example-password" name="password" type="password" autoComplete="current-password" required />
          </div>
          <Button type="submit" className="w-full">
            Sign in
          </Button>
          {submitted && (
            <Alert role="status">
              This example does not send credentials. Connect your authentication handler here.
            </Alert>
          )}
        </form>
      </Card>
      <p className="text-center text-xs leading-5 text-muted-foreground">
        Illustrative form. No account is created and no credentials are sent.
      </p>
    </AuthLayout>
  );
}

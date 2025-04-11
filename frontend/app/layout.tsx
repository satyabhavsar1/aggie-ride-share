"use client";

import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { UserProvider } from "./context/UserContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MantineProvider>
          <Notifications position="top-center" />
          <UserProvider>
          {children}
          </UserProvider>
        </MantineProvider>
      </body>
    </html>
  );
}

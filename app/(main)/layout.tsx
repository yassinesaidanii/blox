import {
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton,
    UserProfile,
  } from "@clerk/nextjs";
  import { ReactNode } from "react";
  import "@/app/globals.css";
  import Sidebar from "../components/Sidebar";
  
  export default function DashboardLayout({
    children,
  }: {
    children: ReactNode;
  }) {
    return (
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar/>
        {/* Main Content */}
        <main style={{ flex: 1, padding: "20px",}}>
          <SignedOut>
            <div>
              <h2>You are signed out</h2>
              <SignInButton />
            </div>
          </SignedOut>
          <SignedIn>
            {children}
          </SignedIn>
        </main>
      </div>
    );
  }
  
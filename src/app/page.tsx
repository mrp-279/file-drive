"use client";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "convex/react";


import Image from "next/image";
import { api } from "../../convex/_generated/api";
import { SignInButton, SignOutButton, SignedIn, SignedOut, useOrganization } from "@clerk/nextjs";


export default function Home() {
  const { organization } = useOrganization()
  const files = useQuery(api.files.getFiles,
    organization?.id ? { orgId: organization.id } : "skip"
  );
  const createFile = useMutation(api.files.createFile);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignedIn>
        <SignOutButton><Button>Sign Out</Button></SignOutButton>
      </SignedIn>
      <SignedOut>
        <SignInButton><Button>Sign In</Button></SignInButton>
      </SignedOut>

     
     { files?.map(file => {
      return <div key={file._id}>
        {file.name}
      </div>
     })}
    <Button onClick={() => {
      if (!organization) {
        return;
      }
      createFile({
        name: "hello world",
        orgId: organization.id
      });
    }}>Create File</Button> 
      
    </main>
  );
}

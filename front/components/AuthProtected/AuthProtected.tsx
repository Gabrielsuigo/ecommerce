"use client";

import { AuthContexts } from "@/contexts/authContexts";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

const AuthProtected = ({children}: {children: React.ReactNode}) =>{

    const router = useRouter();
    const context = useContext(AuthContexts);
    const user = context.user?.user;

    useEffect(() =>{
       if(!user){
           router.push("/login")
       }
       },[]);

   return <>{ children }</>
}

export default AuthProtected


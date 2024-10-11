'use client'

import { useState } from "react"
import { useRouter } from 'next/navigation';

const SignClient = () => {
     const router = useRouter();
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');

     return (
          <div>
               <h1>
                    
               </h1>
          </div>
     )
}
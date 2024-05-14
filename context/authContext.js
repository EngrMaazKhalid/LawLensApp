import { onAuthStateChanged } from "firebase/auth";
import { Children, createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import { set } from "firebase/database";
import { addDoc, setDoc } from "firebase/firestore";




export const AuthContext = createContext();
export const AuthContextProvider = ({children}) =>{
    const [user , setUser] = useState(null);
    const [isAuthenticated , setisAuthenticated ] = useState(undefined);

    useEffect(()=>{
        //onAuthChanged
        const unsub =onAuthStateChanged(auth , (user) => {
            if(user){
                
                setisAuthenticated(true);
                setUser(user);
            }else{
                setisAuthenticated(false);
                setUser(null);
            }
        })
    }, [])
    const login = async (email, password) =>{
        try{

        }
        catch{
            
        }
    }
    const logout = async () =>{
        try{

        }
        catch{

        }
    }
    const register = async (email, password) =>{
        try{
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log("response.user",response?.user);




            await setDoc(doc(db, "users", response?.user?.uid), {
                email,
                profileUrl: profileUrl,
                userId: response?.user?.uid,
            });
            return{ success: true, data: response?.user};

        }
        catch{
            return {success: false, data: e.message};
        }
    }

    return(
        <AuthContext.Provider value={{user,isAuthenticated, login, logout, register}}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth =() =>{
    const value =useContext(AuthContext);

    if (!value) {
        throw new Error('useAuth must be wrapped inside authContext Provider')

    }
    return value;
}
import { createContext, useState} from "react";

const UserContext = createContext([])

const UsersProvider = ({children}) => {
    const [users, setUsers] = useState([])
    return(
        <UserContext.Provider value={{users, setUsers}}>
            {children}
        </UserContext.Provider>
    )
}

export  {UserContext, UsersProvider}
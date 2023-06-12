
export const ADMIN = 'ADMIN'
export const USER = 'USER'

const ADD_USER = 'ADD_USER'
const GET_USERS = 'GET_USERS'
const EDIT_USER = 'EDIT_USER'

const initUsers = {
    users: [
        {
            name: 'Alex',
            password: '12345',
            role: [USER, ADMIN]
        },
        {
            name: 'Jone',
            password: '1234',
            role: [USER]
        },
    ]
}

export const usersReducer = (state=initUsers,action) => {
    switch (action.type) {
        case ADD_USER:
            return { ...state, users: [...state.users, action.payload] }
        case EDIT_USER:
            const { name, updatedUser } = action.payload
            const updatedUsers = state.users.map(user => {
                if (user.name === name) {
                  return { ...user, ...updatedUser };
                }
                return user;
              });
              return { ...state, users: updatedUsers };
        default:
            return state
    }
}


export const addUserAction = (payload) =>({type: ADD_USER, payload})
export const editUserAction = (name,updatedUser) =>({type: EDIT_USER, payload: {name, updatedUser}})
export const apiUrl = 'http://localhost:8000/api'

export const adminToken =() =>{
    const data = JSON.parse(localStorage.getItem('adminInfo'))
    return data.token;
}

export const userToken =() =>{
    const data = JSON.parse(localStorage.getItem('userInfo'))
    return data.token;
}

export const STRIPE_PUBLIC_KEY = 'pk_test_51TLgBdRsyaMIw7vjq5acx0dDjSSXasA8nApw7XomYbkldmUacP4sZDwQT6ponbGILFqbwIZHJoDV3495L58S4Gxr0030F6CTnG'
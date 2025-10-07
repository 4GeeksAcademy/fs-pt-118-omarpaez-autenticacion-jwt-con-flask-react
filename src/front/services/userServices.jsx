
const userServices = {}
const url = import.meta.env.VITE_BACKEND_URL
    userServices.register = async(formData)=>{
        try {
            const resp = await fetch(url+'/api/register', {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)        
            })
            if(!resp.ok) throw new Error('error al registrar usuario')
        const data = await resp.json()
        return data
        } catch (error) {
            console.log(error)
        }
    }

    userServices.login = async(formData)=>{
        try {
            const resp = await fetch(url+'/api/login', {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)        
            })
            const data = await resp.json()
            if(!resp.ok)  return data/*throw new Error('error al Iniciar sesion') */
        return data
        } catch (error) {
            console.log(error)
        }
    }

        userServices.private = async()=>{
        try {
            const resp = await fetch(url+'/api/private', {
                method:'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
                     
            })
            if(!resp.ok) throw new Error('error private')
        const data = await resp.json()
        return data
        } catch (error) {
            console.log(error)
        }
    }


export default userServices

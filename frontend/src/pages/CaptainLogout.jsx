import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const CaptainLogout = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        
        axios.get(`${import.meta.env.VITE_API_URL}/captains/logout`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.status === 200) {
                localStorage.removeItem('token')
                localStorage.removeItem('captain')
                navigate('/captain-login')
            }
        }).catch((error) => {
            console.error('Logout failed:', error)
            // Handle logout error
        })
    }, [navigate])

    return <div>Logging out...</div>
}

export default CaptainLogout


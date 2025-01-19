import { useState, useEffect } from 'react'

const CaptainDetails = () => {
    const [captain, setCaptain] = useState(null)

    useEffect(() => {
        const storedCaptain = localStorage.getItem('captain')
        if (storedCaptain) {
            setCaptain(JSON.parse(storedCaptain))
        }
    }, [])

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <div className='flex items-center justify-between mb-6'>
                <div>
                    {captain && <h4 className='text-2xl font-bold capitalize'>{`${captain.fullname.firstname} ${captain.fullname.lastname}`}</h4>}
                </div>
                <div>
                    <h4 className='text-xl font-semibold'>₹295.20</h4>
                    <p className='text-sm text-gray-600'>Earned</p>
                </div>
            </div>
            <div className='grid grid-cols-3 gap-4 bg-gray-100 rounded-xl p-4'>
                <div className='text-center'>
                    <h5 className='text-lg font-medium'>10.2</h5>
                    <p className='text-sm text-gray-600'>Hours Online</p>
                </div>
                <div className='text-center'>
                    <h5 className='text-lg font-medium'>25</h5>
                    <p className='text-sm text-gray-600'>Trips Completed</p>
                </div>
                <div className='text-center'>
                    <h5 className='text-lg font-medium'>4.8</h5>
                    <p className='text-sm text-gray-600'>Rating</p>
                </div>
            </div>
        </div>
    )
}

export default CaptainDetails


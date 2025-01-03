
export default function PrivateRoute({ children }) {

    if (!localStorage.getItem('token'))
        window.location.href = '/login'

    return (
        <div className=''>
            {children}
        </div>
    )
}

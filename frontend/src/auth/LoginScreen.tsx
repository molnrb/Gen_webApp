import { Button } from '../ui/Button'

export default function LoginScreen() {

    return (
        <div className="flex items-center justify-center w-full h-full">
            <div className="flex flex-col items-center gap-4">
                <h1 className="text-2xl">Login</h1>
                <Button variant="secondary" onClick={} className='flex items-center gap-2 rounded-none'>
                    <img src="ms-logo.svg" alt={'Login button'} className='w-6 h-6'></img>
                    {t('auth.loginBtnText')}
                </Button>
            </div>
        </div>
    )
}

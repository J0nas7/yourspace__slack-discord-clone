// External
import { useEffect, useState } from "react"

// Internal
import { Block, Text, Heading, Field } from "@/components"
import styles from '@/core-ui/Guest.module.scss'
import { useAuth } from "@/hooks"
import { selectIsLoggedIn, useTypedSelector } from "@/redux"

export default function Login() {
    const { login, isLoggedInTest, saveLoginSuccess, errorMsg, status, goHome } = useAuth()

    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')

    const [loginPending, setLoginPending] = useState(false)

    const doLogin = (e : any = '') => {
        if (typeof e.preventDefault === 'function') e.preventDefault()
        
        if (!loginPending) {
            setLoginPending(true)
            const loginDetails = { userEmail, userPassword }
            
            login(userEmail, userPassword)
            setLoginPending(false)
        }
    }

    const isLoggedIn = useTypedSelector(selectIsLoggedIn)

    useEffect(() => {
        if (isLoggedIn === true) {
            goHome()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn])

    useEffect(() => {
        isLoggedInTest()
    }, [])

    return (
        <Block className={styles.login}>
            <Heading title="Sign in to your account" />
            <Text className={styles.teaserTxt}>Your space to hangout and communicate</Text>

            <Block className={styles.guestForm}>
                {errorMsg && status === 'resolved' && (
                    <Text className={styles.error_notice} variant="p">{errorMsg}</Text>
                )}

                <form onSubmit={doLogin}>
                    <Field
                        type="text"
                        lbl="E-mail:"
                        value={userEmail}
                        onChange={(e: string) => setUserEmail(e)}
                        disabled={status === 'resolving'}
                        autoComplete="email"
                        className="login-field"
                    />
                    <Field
                        type="password"
                        lbl="Password:"
                        value={userPassword}
                        onChange={(e: string) => setUserPassword(e)}
                        disabled={status === 'resolving'}
                        className="login-field"
                    />
                    
                    <Text variant="p">
                        <button
                            className={'login-btn button ' + (loginPending ? styles.pending : '')}
                            onClick={doLogin}
                            disabled={status === 'resolving'}
                        >
                            <Text variant="span" className="btnTxt">Log on</Text>
                        </button>
                    </Text>
                </form>
            </Block>
        </Block>
    )
}
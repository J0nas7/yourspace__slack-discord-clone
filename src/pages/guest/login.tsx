// External
import { useEffect, useState } from "react"
import { Button } from "@mui/material"
import Link from "next/link"

// Internal
import { Block, Text, Heading, Field } from "@/components"
import { useAuth } from "@/hooks"
import { selectIsLoggedIn, useTypedSelector } from "@/redux"

export default function Login() {
    const { handleLoginSubmit, isLoggedInTest, saveLoginSuccess, errorMsg, status, goHome } = useAuth()

    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [showPassword,setShowPassword] = useState<boolean>(false)

    const [loginPending, setLoginPending] = useState(false)

    const doLogin = (e: any = '') => {
        if (typeof e.preventDefault === 'function') e.preventDefault()

        if (!loginPending) {
            setLoginPending(true)
            const loginDetails = { userEmail, userPassword }

            handleLoginSubmit(userEmail, userPassword)
            setLoginPending(false)
        }
    }

    const ifEnter = (e: any) => {
        if (e.key === 'Enter') doLogin()
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
        <Block className="login">
            <Heading title="Sign in to your account" />
            <Text className="teaser-text">Your space to hangout and communicate</Text>

            <Block className="guest-form">
                {errorMsg && status === 'resolved' && (
                    <Text className="error-notice" variant="p">{errorMsg}</Text>
                )}

                <form onSubmit={doLogin}>
                    <Field
                        type="text"
                        lbl="E-mail"
                        innerLabel={true}
                        value={userEmail}
                        onChange={(e: string) => setUserEmail(e)}
                        onKeyDown={(e: any) => { ifEnter(e) }}
                        disabled={status === 'resolving'}
                        autoComplete="username"
                        className="login-field"
                    />
                    <Field
                        type={showPassword ? 'text' : 'password'}
                        lbl="Password"
                        innerLabel={true}
                        value={userPassword}
                        onChange={(e: string) => setUserPassword(e)}
                        onKeyDown={(e: any) => {ifEnter(e)}}
                        endButton={() => {setShowPassword(!showPassword)}}
                        endContent={!showPassword ? 'Show' : 'Hide'}
                        disabled={status === 'resolving'}
                        autoComplete="password"
                        className="login-field"
                    />
                    <Text variant="p">
                        <Button
                            className={'login-btn button button-green ' + (loginPending || status === 'resolving' ? "pending" : "")}
                            onClick={doLogin}
                            disabled={status === 'resolving'}
                        >
                            <Text variant="span" className="button button-text">Log on</Text>
                        </Button>
                    </Text>
                </form>
                <Block className="clear-both"></Block>
            </Block>
            <Text variant="span" className="guest-link">
                <Link href="/guest/create" className="link-item">Need an account?</Link>
                <Link href="/guest/forgot" className="link-item">Forgot your password</Link>
            </Text>
            <Block className="clear-both" />
        </Block>
    )
}
// External
import { useEffect, useState } from "react"
import { Button } from "@mui/material"
import Link from "next/link"

// Internal
import { Block, Text, Heading, Field } from "@/components"
import { useAuth } from "@/hooks"
import { selectIsLoggedIn, useTypedSelector } from "@/redux"

export default function Login() {
    const { login, isLoggedInTest, saveLoginSuccess, errorMsg, status, goHome } = useAuth()

    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [showPassword,setShowPassword] = useState<boolean>(false)

    const [loginPending, setLoginPending] = useState(false)

    const doForgot = (e: any = '') => {
        if (typeof e.preventDefault === 'function') e.preventDefault()

        if (!loginPending) {
            setLoginPending(true)
            const loginDetails = { userEmail, userPassword }

            login(userEmail, userPassword)
            setLoginPending(false)
        }
    }

    const ifEnter = (e: any) => {
        if (e.key === 'Enter') doForgot()
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
            <Heading title="Recover your password" />
            <Text className="teaser-text">Recover the account to your space</Text>

            <Block className="guest-form">
                {errorMsg && status === 'resolved' && (
                    <Text className="error-notice" variant="p">{errorMsg}</Text>
                )}

                <form onSubmit={doForgot}>
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
                    <Text variant="p">
                        <Button
                            className={'login-btn button ' + (loginPending ? "pending" : "")}
                            onClick={doForgot}
                            disabled={status === 'resolving'}
                        >
                            <Text variant="span" className="button button-text">Log on</Text>
                        </Button>
                    </Text>
                </form>
                <Block className="clear-both"></Block>
            </Block>
            <Text variant="span" className="guest-link">
                <Link href="/guest/login" className="link-item">Remembered your password?</Link>
            </Text>
            <Block className="clear-both" />
        </Block>
    )
}
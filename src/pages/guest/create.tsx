// External
import { FormEvent, useEffect, useState } from "react"
import { Button } from "@mui/material"
import Link from "next/link"

// Internal
import { Block, Text, Heading, Field } from "@/components"
import { useAuth } from "@/hooks"
import { selectIsLoggedIn, useTypedSelector } from "@/redux"

export default function Create() {
    // Hooks
    const { createProfile, isLoggedInTest, saveLoginSuccess, errorMsg, status, goHome } = useAuth()

    // Internal variables
    const [userRealName, setUserRealName] = useState<string>('')
    const [userDisplayName, setUserDisplayName] = useState<string>('')
    const [userEmail, setUserEmail] = useState<string>('')
    const [userDD, setUserDD] = useState<string>('')
    const [userMM, setUserMM] = useState<string>('')
    const [userYYYY, setUserYYYY] = useState<string>('')

    const [userPassword, setUserPassword] = useState<string>('')
    const [userPassword2, setUserPassword2] = useState<string>('')
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const [createPending, setCreatePending] = useState(false)

    // Methods
    const handleCreate = (e?: FormEvent) => {
        e?.preventDefault()

        if (!createPending) {
            setCreatePending(true)
            createProfile(userRealName, userDisplayName, userEmail, userPassword, userPassword2, userDD, userMM, userYYYY)
            setCreatePending(false)
        }
    }

    const ifEnter = (e: React.KeyboardEvent) => (e.key === 'Enter') ? handleCreate() : 0

    const isLoggedIn = useTypedSelector(selectIsLoggedIn)

    useEffect(() => {
        if (isLoggedIn === true) {
            goHome()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn])

    return (
        <Block className="create">
            <Heading title="Create a new account" />
            <Text className="teaser-text">Join your space to hangout and communicate</Text>

            <Block className="guest-form">
                {errorMsg && status === 'resolved' && (
                    <Text className="error-notice" variant="p">{errorMsg}</Text>
                )}

                <form onSubmit={handleCreate}>
                    <Field
                        type="text"
                        lbl="Your name"
                        innerLabel={true}
                        value={userRealName}
                        onChange={(e: string) => setUserRealName(e)}
                        onKeyDown={
                            (event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => 
                            ifEnter(event)
                        }
                        disabled={status === 'resolving'}
                        className="login-field"
                        required={true}
                    />
                    <Field
                        type="text"
                        lbl="Display name"
                        innerLabel={true}
                        value={userDisplayName}
                        onChange={(e: string) => setUserDisplayName(e)}
                        onKeyDown={
                            (event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => 
                            ifEnter(event)
                        }
                        disabled={status === 'resolving'}
                        className="login-field"
                    />
                    <Field
                        type="text"
                        lbl="E-mail"
                        innerLabel={true}
                        value={userEmail}
                        onChange={(e: string) => setUserEmail(e)}
                        onKeyDown={
                            (event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => 
                            ifEnter(event)
                        }
                        disabled={status === 'resolving'}
                        className="login-field"
                    />
                    <Field
                        type={showPassword ? 'text' : 'password'}
                        lbl="Password"
                        innerLabel={true}
                        value={userPassword}
                        onChange={(e: string) => setUserPassword(e)}
                        onKeyDown={
                            (event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => 
                            ifEnter(event)
                        }
                        endButton={() => { setShowPassword(!showPassword) }}
                        endContent={!showPassword ? 'Show' : 'Hide'}
                        disabled={status === 'resolving'}
                        className="login-field"
                    />
                    <Field
                        type={showPassword ? 'text' : 'password'}
                        lbl="Repeat password"
                        innerLabel={true}
                        value={userPassword2}
                        onChange={(e: string) => setUserPassword2(e)}
                        onKeyDown={
                            (event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => 
                            ifEnter(event)
                        }
                        disabled={status === 'resolving'}
                        className="login-field"
                    />
                    <Block className="birthday-wrapper">
                        <Block className="birthday-inner">
                            <Field
                                type={'text'}
                                lbl="DD"
                                innerLabel={true}
                                value={userDD}
                                onChange={(e: string) => setUserDD(e)}
                                onKeyDown={
                                    (event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => 
                                    ifEnter(event)
                                }
                                disabled={status === 'resolving'}
                                className="login-field"
                            />
                            <Field
                                type={'text'}
                                lbl="MM"
                                innerLabel={true}
                                value={userMM}
                                onChange={(e: string) => setUserMM(e)}
                                onKeyDown={
                                    (event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => 
                                    ifEnter(event)
                                }
                                disabled={status === 'resolving'}
                                className="login-field"
                            />
                            <Field
                                type={'text'}
                                lbl="YYYY"
                                innerLabel={true}
                                value={userYYYY}
                                onChange={(e: string) => setUserYYYY(e)}
                                onKeyDown={
                                    (event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => 
                                    ifEnter(event)
                                }
                                disabled={status === 'resolving'}
                                className="login-field"
                            />
                        </Block>
                    </Block>
                    <Text variant="p" className="clear-both">
                        <Button
                            className={'create-btn button button-green ' + (createPending || status === 'resolving' ? "pending" : "")}
                            onClick={handleCreate}
                            disabled={status === 'resolving'}
                        >
                            <Text variant="span" className="button button-text">Create account</Text>
                        </Button>
                    </Text>
                </form>
                <Block className="clear-both"></Block>
            </Block>
            <Text variant="span" className="guest-link">
                <Link href="/guest/login" className="link-item">Already have an account?</Link>
            </Text>
            <Block className="clear-both" />
        </Block>
    )
}
// External
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { useRouter } from "next/navigation"

// Internal
import {
    Heading, Text, Block, Field,
    Message as MessageCard, Profile as ProfileCard, Space as SpaceCard
} from '../components'
import { SpaceDTO } from '../types'
import { PrivateLayoutMock } from './test-env'

// Mock useRouter:
jest.mock("next/navigation", () => ({
    useRouter() {
        return {
            prefetch: () => null
        }
    }
}))

test('Should render header and same text passed in to title prop', () => {
    render(<Heading title='My header' />)
    const headingContent = screen.getByText(/My header/i)
    const headingElement = screen.getByRole("heading", { level: 1, name: "My header" })
    const headingElements = screen.getAllByRole("heading")
    expect(headingElements.length).toBe(1)
    expect(headingContent).toBeInTheDocument()
    expect(headingElement).toBeInTheDocument()
})

test('(1) Should render an HTML tag with text passed as child', () => {
    render(<Text>Hello div</Text>)
    render(<Text variant='p'>Hello test</Text>)
    const divContent = screen.getByText("Hello div")
    const pContent = screen.getByText("Hello test")
    expect(divContent).toBeInTheDocument()
    expect(pContent).toBeInTheDocument()
})

test('(2) Should render an HTML tag with text passed as child', () => {
    render(<Block>Hello div2</Block>)
    render(<Block variant='span'>Hello test2</Block>)
    const divContent = screen.getByText("Hello div2")
    const pContent = screen.getByText("Hello test2")
    expect(divContent).toBeInTheDocument()
    expect(pContent).toBeInTheDocument()
})

test('Should render an input field', () => {
    render(<Field
        type="text"
        lbl="Demo"
        value={'demo'}
        onChange={(e: string) => null}
        disabled={false}
    />)
    const demoInput = screen.getByLabelText('Demo')
    const lblContent = screen.getByText("Demo")
    expect(lblContent).toBeInTheDocument()
    expect(demoInput).toBeInstanceOf(HTMLInputElement)
})

test('Should render a space name card with label', () => {
    const demoSpace: SpaceDTO = {
        Space_ID: 0,
        Space_Name: "Find space name",
    }
    render(
        <SpaceCard
            space={demoSpace}
            variant='name'
            withLabel={true}
        />
    )
    const spaceNameLink = screen.getByText("Find space name")
    expect(spaceNameLink).toHaveClass('with-label')
    expect(spaceNameLink).toBeInTheDocument()
})
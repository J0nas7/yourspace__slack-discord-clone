// External
import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

// Internal
import {
    Heading, Text, Block, Field,
    Message as MessageCard, Profile as ProfileCard, Space as SpaceCard
} from '../components'
import { SpaceDTO } from '../types'
import { PrivateLayoutMock } from './test-env'

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

test('Should render a small order summary card', () => {
    const demoSpace: SpaceDTO = {
        Space_ID: 0,
        Space_Name: "space-name",
    }
    render(
        <PrivateLayoutMock>
            <SpaceCard
                space={demoSpace}
                variant='name'
                withLabel={false}
            />
        </PrivateLayoutMock>
    )
    const orderIdContent = screen.queryByText(/321/i)
    const totalSaleContent = screen.getByText("Kr. 1234")
    const adrContent = screen.getByText("The front door")
    const areaContent = screen.getByText("At home")
    const deadlineContent = screen.getByText("ASAP")
    expect(orderIdContent).not.toBeInTheDocument()
    expect(totalSaleContent).toBeInTheDocument()
    expect(adrContent).toBeInTheDocument()
    expect(areaContent).toBeInTheDocument()
    expect(deadlineContent).toBeInTheDocument()
})
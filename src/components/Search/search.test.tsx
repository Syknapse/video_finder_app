import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Search, { ISearchProps } from './search'

const spyFunction = jest.fn()
const defaultProps: ISearchProps = {
  query: '',
  count: 10,
  time: 10,
  isLoading: false,
  handleSubmit: spyFunction,
  handleSearchChange: jest.fn,
  handleCountChange: jest.fn,
  handleTimeChange: jest.fn,
}

const renderSearch = (props: ISearchProps = defaultProps) => render(<Search {...props} />)

afterEach(cleanup)

it('Renders Search component', () => {
  renderSearch()
  expect(screen.getByTestId('search-form')).toBeInTheDocument()
})

it('Has search input', () => {
  renderSearch()
  const searchEl = screen.getByTestId('search-form')
  const searchInputEl = screen.getByTestId('search-input')
  expect(searchEl).toContainElement(searchInputEl)
})

it('Renders form with default values', () => {
  renderSearch()
  const searchEl = screen.getByTestId('search-form')
  expect(searchEl).toHaveFormValues({
    searchQuery: '',
    count: '10',
    time: '10',
  })
})

it('Disables all fieldset elements when component is loading', () => {
  renderSearch({ ...defaultProps, isLoading: true })
  const searchFieldSets = screen.getAllByTestId('search-fieldset')

  expect(searchFieldSets).toHaveLength(3)
  expect(searchFieldSets[0]).toHaveAttribute('disabled')
  expect(searchFieldSets[1]).toHaveAttribute('disabled')
  expect(searchFieldSets[2]).toHaveAttribute('disabled')
})

it('Fires onSubmit event when submit button is clicked', () => {
  renderSearch()
  spyFunction.mockImplementation(e => e.preventDefault())
  const submitButton = screen.getByTestId('search-submit')

  userEvent.click(submitButton)
  expect(spyFunction).toHaveBeenCalled()
})

import { CgSpinner } from 'react-icons/cg'
import clsx from 'clsx'

export interface SpinnerProps extends React.DetailedHTMLProps<React.HTMLAttributes<JSX.Element>, JSX.Element> {
  /** size spinner */
  size?: number | string
  className?: string
}

const Spinner = (props: SpinnerProps) => {
  const { size, className } = props

  const spinnerStyle = {
    height: size,
    width: size,
  }

  return <CgSpinner className={clsx(className, 'animate-spin')} style={spinnerStyle} />
}

Spinner.defaultProps = {
  size: 20,
}

export default Spinner

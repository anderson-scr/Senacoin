import React from 'react'

export const RowCheckbox = React.forwardRef(
  ({ indeterminate, onClickFunc, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <>
        <input className="form-check-input" onClick={onClickFunc} type="checkbox" ref={resolvedRef} {...rest} />
      </>
    )
  }
)
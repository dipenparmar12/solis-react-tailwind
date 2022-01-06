import React from 'react'
import classNames from 'classnames'
import WithFormik from '../FormicApp/WithFormik'
import ErrorFeedback from '@/components/atoms/ErrorFeedback'

/**
 *
 * @param {*} param0
 * @returns
 * @src https://tailwindcomponents.com/component/tailwind-file-upload
 * @src https://codepen.io/simonswiss/pen/bprJmw
 */
function ImageUpload({
  name,
  label,
  error,
  className,
  isRequired,
  placeholder,
  maxSize,
  minSize,
  onChange = () => {},
  getBase64 = (uri, file) => {},
  ...inputProps
}) {
  const [file, setFile] = React.useState({})
  const [selectedImageUri, setSelectedImageUri] = React.useState(null)

  React.useEffect(() => {
    onChange(file, selectedImageUri)
    getBase64(selectedImageUri, file)
  }, [file, onChange, selectedImageUri])

  const handleFileChange = React.useCallback(
    (e) => {
      e.preventDefault()
      e.stopPropagation()
      const uploadedFile = (e?.target?.files || e?.dataTransfer?.files)?.[0]
      if (uploadedFile) {
        setFile({
          file: uploadedFile,
          name: uploadedFile.name,
          size: uploadedFile.size,
          type: uploadedFile.type,
        })
        const reader = new FileReader()
        reader.addEventListener('load', () =>
          setSelectedImageUri(reader.result),
        )
        reader.readAsDataURL(uploadedFile)
      }
    },
    [setFile, setSelectedImageUri],
  )

  const handleRemoveImage = React.useCallback(() => {
    setFile({})
    setSelectedImageUri(null)
  }, [setFile, setSelectedImageUri])

  return (
    <div className={classNames('flex flex-col mt-2 ', className)}>
      <label
        className={classNames(
          'flex items-center mb-1 text-gray-600 dark:text-gray-300',
        )}
        htmlFor={name}
      >
        {label} {isRequired && <span className="pl-1 text-red-300"> *</span>}
      </label>

      <div>
        <label
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleFileChange}
          className={classNames([
            'relative flex flex-col items-center w-64 px-4 py-4 tracking-wide text-gray-600 bg-white border rounded-lg shadow-md cursor-pointer dark:text-gray-300 text-blue border-blue hover:bg-blue hover:text-gray-800',
            error &&
              'text-red-400  bg-red-100/80 hover:bg-red-100/80 active:bg-red-100/80 focus:bg-red-100/80',
          ])}
        >
          <input type="file" className="hidden" onChange={handleFileChange} />

          {selectedImageUri && (
            <div className="w-24 ">
              <img
                className="w-full h-full rounded-lg"
                src={selectedImageUri}
                alt={name}
              />
              <button
                className="absolute top-0 right-0 p-2 text-gray-400 rounded-lg hover:text-gray-700 "
                onClick={handleRemoveImage}
              >
                <svg
                  className="w-6 h-6 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
              </button>
            </div>
          )}

          {!selectedImageUri && (
            <>
              <svg
                className="w-7 h-7"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
              </svg>
              <span className="mt-2 leading-normal">{placeholder}</span>
            </>
          )}
        </label>
      </div>

      <ErrorFeedback error={error} />
    </div>
  )
}

export default ImageUpload

export const ImageUploadFormik = ({ ...props }, ...rest) => (
  <WithFormik inputAs={ImageUpload} {...props} /> // {...(rest || {})}
)

// const fileInit = {
//   file: null,
//   name: null,
//   size: null,
//   type: null,
// }
